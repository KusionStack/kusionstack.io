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
    [string]$Version,
    [string]$KusionRoot = "$Env:USERPROFILE\.kusion",
    [string]$KusionReleaseBaseURL = ""
)

# GitHub org and repo hosting Kusion CLI
$GitHubOrg = "KusionStack"
$GitHubRepo = "kusion"

# Escape space of KusionRoot path
$KusionRoot = $KusionRoot -replace ' ', '` '

# Kusion related path
$KusionFileName = "kusion.exe"
$KusionPath = "${KusionRoot}\bin"
$KusionFilePath = "${KusionPath}\${KusionFileName}"

# Temp directory for kusion installation  
$KusionTmpDir = ""

#Escape space of KusionRoot path
$KusionRoot = $KusionRoot -replace ' ', '` '

$ErrorActionPreference = 'stop'

if ((Get-ExecutionPolicy) -gt 'RemoteSigned' -or (Get-ExecutionPolicy) -eq 'ByPass') {
    Write-Output "PowerShell requires an execution policy of 'RemoteSigned'."
    Write-Output "To make this change please run:"
    Write-Output "'Set-ExecutionPolicy RemoteSigned -scope CurrentUser'"
    exit
}

try {
    # Set Github request authentication for basic authentication.
    if ($Env:GITHUB_USER) {
        $basicAuth = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($Env:GITHUB_USER + ":" + $Env:GITHUB_TOKEN));
        $githubHeader = @{"Authorization" = "Basic $basicAuth" }
    }
    else {
        $githubHeader = @{}
    }

    # Change security protocol to support TLS 1.2 / 1.1 / 1.0 - old powershell uses TLS 1.0 as a default protocol
    [Net.ServicePointManager]::SecurityProtocol = "tls12, tls11, tls"

    # Check if Kusion CLI is installed.
    if (Test-Path $KusionFilePath -PathType Leaf) {
        Write-Output "Kusion is detected - $KusionFilePath"
        Invoke-Expression "$KusionFilePath version"
        Write-Output "`r`nReinstalling Kusion..."
    }
    else {
        Write-Output "Installing Kusion..."
    }

    # Create kusion related directory
    Write-Output "Creating $KusionRoot directory..."
    New-Item -ErrorAction Ignore -Path $KusionPath -ItemType "directory" | Out-Null
    if (!(Test-Path $KusionPath -PathType Container)) {
        throw "Cannot create $KusionPath, without admin right."
    }
    $tempDirName = [System.IO.Path]::GetRandomFileName()
    $KusionTmpDir = Join-Path $KusionRoot $tempDirName
    New-Item -Path $KusionTmpDir -ItemType "directory" | Out-Null
    if (!(Test-Path $KusionTmpDir -PathType Container)) {
        throw "Cannot create $KusionTmpDir, without admin right."
    }

    # Get the list of release from GitHub
    $releaseURL = $KusionReleaseBaseURL
    if (!$releaseURL) {
        $releaseURL = "https://api.github.com/repos/${GitHubOrg}/${GitHubRepo}/releases"
    }
    $releases = Invoke-RestMethod -Headers $githubHeader -Uri $releaseURL -Method Get
    if ($releases.Count -eq 0) {
        throw "No releases from github.com/KusionStack/kusion repo."
    }

    # Get latest or specified version info from releases
    function GetVersionInfo {
        param (
            [string]$Version,
            $Releases
        )
        # Filter windows binary and download archive
        if (!$Version) {
            $release = $Releases | Where-Object { $_.tag_name -match '^v\d+\.\d+\.\d+$' } | Select-Object -First 1
        }
        else {
            $release = $Releases | Where-Object { $_.tag_name -eq "v$Version" } | Select-Object -First 1
        }

        return $release
    }

    # Get info about windows asset from release
    function GetWindowsAsset {
        param (
            $Release
        )
        if ($CustomAssetFactory) {
            Write-Output "CustomAssetFactory detected, try to invoke it."
            return $CustomAssetFactory.Invoke($Release)
        }
        else {
            $windowsAsset = $Release | Select-Object -ExpandProperty assets | Where-Object { $_.name -Like "*windows*.zip" }
            if (!$windowsAsset) {
                throw "Cannot find the windows Kusion CLI binary."
            }
            [hashtable]$return = @{}
            $return.url = $windowsAsset.url
            $return.name = $windowsAsset.name
            return $return
        }`
    }

    # Download kusion windows asset
    $release = GetVersionInfo -Version $Version -Releases $releases
    if (!$release) {
        throw "Cannot find the specified Kusion CLI binary version."
    }
    $asset = GetWindowsAsset -Release $release
    $zipFileUrl = $asset.url
    $assetName = $asset.name

    $zipFilePath = Join-Path $KusionTmpDir $assetName
    Write-Output "Downloading $zipFileUrl..."

    $githubHeader.Accept = "application/octet-stream"
    $oldProgressPreference = $progressPreference;
    $progressPreference = 'SilentlyContinue';
    Invoke-WebRequest -Headers $githubHeader -Uri $zipFileUrl -OutFile $zipFilePath
    $progressPreference = $oldProgressPreference;
    if (!(Test-Path $zipFilePath -PathType Leaf)) {
        throw "Failed to download Kusion binary."
    }

    # Extract kusion binary to $KusionTmpDir
    Write-Output "Extracting $zipFilePath..."
    Microsoft.Powershell.Archive\Expand-Archive -Force -Path $zipFilePath -DestinationPath $KusionTmpDir
    $kusionTmpFile = Join-Path $kusionTmpDir $KusionFileName
    if (!(Test-Path $kusionTmpFile -PathType Leaf)) {
        throw "Failed to extract $zipFilePath."
    }
    Move-Item -Path $zipFilePath -Force

    # Move kusion binary and related files to $KusionRoot
    Write-Output "Moving kusion binary from $KusionTmpDir..."
    Get-ChildItem -Path $KusionTmpDir | Move-Item -Destination $KusionRoot -Force
    $kusioneExtractFile = Join-Path $KusionRoot $KusionFileName
    Move-Item -Path $kusioneExtractFile -Destination $KusionFilePath -Force
    if (!(Test-Path $KusionFilePath -PathType Leaf)) {
        throw "Failed to move Kusion binary."
    }
        
    # Add KusionPath directory to User Path environment variable
    $userPathEnvironmentVar = [System.Environment]::GetEnvironmentVariable("PATH", "User")
    $userPaths = $UserPathEnvironmentVar.Split(';')
    if ($userPaths -contains $KusionPath) {
        Write-Output "Skipped to add $KusionPath to user path."
    } else {
        [System.Environment]::SetEnvironmentVariable("PATH", $UserPathEnvironmentVar + ";$KusionPath", "User")
        Write-Output "Added $KusionPath to user path."
    }
    # SET KUSION_HOME environment variable
    [System.Environment]::SetEnvironmentVariable("KUSION_HOME", "$KusionRoot", "User")
    
} catch {
    Write-Output "$_"
    Write-Output "`r`nFailed to install kusion. Please go to https://kusionstack.io for more support." 
    exit
} finally {
    if(Test-Path $KusionTmpDir) {
        Remove-Item -Path $KusionTmpDir -Force -Recurse
    }
}

Write-Output "`r`nInstall Kusion into $KusionRoot successfully."
Invoke-Expression "$KusionFilePath version"
Write-Output "`r`nOpen a new terminal, and start using kusion! For more information on how to start, please visit https://kusionstack.io."
