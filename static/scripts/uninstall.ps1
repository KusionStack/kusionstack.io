# ------------------------------------------------------------
# Copyright 2024 The KusionStack Authors
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------

param (
    [string]$KusionRoot = "$Env:USERPROFILE\.kusion"
)

#Escape space of KusionRoot path
$KusionRoot = $KusionRoot -replace ' ', '` '
$KusionPath = "${KusionRoot}\bin"

$ErrorActionPreference = 'stop'

if ((Get-ExecutionPolicy) -gt 'RemoteSigned' -or (Get-ExecutionPolicy) -eq 'ByPass') {
    Write-Output "PowerShell requires an execution policy of 'RemoteSigned'."
    Write-Output "To make this change please run:"
    Write-Output "'Set-ExecutionPolicy RemoteSigned -scope CurrentUser'"
    exit
}

try {
    # Remove $KusionRoot
    Write-Output("Removing $KusionRoot...")
    if (Test-Path $KusionRoot) {
        Remove-Item -Path $KusionRoot -Force -Recurse
    }
    if (Test-Path $KusionRoot) {
        throw "Failed to Remove $KusionRoot."
    }

    # Remove environment variables
    Write-Output("Removing kusion related environment variables...")
    $userPathEnvironmentVar = [System.Environment]::GetEnvironmentVariable("PATH", "User")
    $userPaths = $UserPathEnvironmentVar.Split(';')
    if ($userPaths -contains $KusionPath) {
        $userPaths = $userPaths | Where-Object {$_ -notlike "*$KusionPath*"}
        $newUserPath = $userPaths -join ";"
        [System.Environment]::SetEnvironmentVariable("PATH", $newUserPath, "User")
    }
    [System.Environment]::SetEnvironmentVariable("KUSION_HOME", $null, "User")

} catch {
    Write-Output "$_"
    Write-Output "`r`nFailed to uninstall kusion. Please go to https://kusionstack.io for more support." 
    exit
}

Write-Output "Uninstall Kusion succeeded. Hope you can use kusion again, visit https://kusionstack.io for more information."
