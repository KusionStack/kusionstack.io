# ------------------------------------------------------------
# Copyright 2022 The KusionStack Authors
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Reference: https://github.com/dapr/cli/tree/master/install
# ------------------------------------------------------------
param (
    [string]$Version,
    [string]$KusionRoot = "$Env:SystemDrive\kusion",
    [string]$KusionReleaseBaseURL = ""
)

Write-Output ""
$ErrorActionPreference = 'stop'

#Escape space of KusionRoot path
$KusionRoot = $KusionRoot -replace ' ', '` '

# Constants
$KusionFileName = "kusion.exe"
$KusionFilePath = "${KusionRoot}\${KusionFileName}"

# GitHub Org and repo hosting Kusion CLI
$GitHubOrg = "KusionStack"
$GitHubRepo = "kusion"

# Set Github request authentication for basic authentication.
if ($Env:GITHUB_USER) {
    $basicAuth = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($Env:GITHUB_USER + ":" + $Env:GITHUB_TOKEN));
    $githubHeader = @{"Authorization" = "Basic $basicAuth" }
}
else {
    $githubHeader = @{}
}

if ((Get-ExecutionPolicy) -gt 'RemoteSigned' -or (Get-ExecutionPolicy) -eq 'ByPass') {
    Write-Output "PowerShell requires an execution policy of 'RemoteSigned'."
    Write-Output "To make this change please run:"
    Write-Output "'Set-ExecutionPolicy RemoteSigned -scope CurrentUser'"
    break
}

# Change security protocol to support TLS 1.2 / 1.1 / 1.0 - old powershell uses TLS 1.0 as a default protocol
[Net.ServicePointManager]::SecurityProtocol = "tls12, tls11, tls"

# Check if Kusion CLI is installed.
if (Test-Path $KusionFilePath -PathType Leaf) {
    Write-Warning "Kusion is detected - $KusionFilePath"
    Invoke-Expression "$KusionFilePath version"
    Write-Output "Reinstalling Kusion..."
}
else {
    Write-Output "Installing Kusion..."
}

# Create Kusion Directory
Write-Output "Creating $KusionRoot directory"
New-Item -ErrorAction Ignore -Path $KusionRoot -ItemType "directory"
if (!(Test-Path $KusionRoot -PathType Container)) {
    throw "Cannot create $KusionRoot, without admin rights"
}

# Get the list of release from GitHub
$releaseURL = $KusionReleaseBaseURL
if (!$releaseURL) {
    $releaseURL = "https://api.github.com/repos/${GitHubOrg}/${GitHubRepo}/releases"
}

$releases = Invoke-RestMethod -Headers $githubHeader -Uri $releaseURL -Method Get
if ($releases.Count -eq 0) {
    throw "No releases from github.com/KusionStack/kusion repo"
}

# get latest or specified version info from releases
function GetVersionInfo {
    param (
        [string]$Version,
        $Releases
    )
    # Filter windows binary and download archive
    if (!$Version) {
        $release = $Releases | Where-Object { $_.tag_name -notlike "*rc*" } | Select-Object -First 1
    }
    else {
        $release = $Releases | Where-Object { $_.tag_name -eq "v$Version" } | Select-Object -First 1
    }

    return $release
}

# get info about windows asset from release
function GetWindowsAsset {
    param (
        $Release
    )
    if ($CustomAssetFactory) {
        Write-Output "CustomAssetFactory dectected, try to invoke it"
        return $CustomAssetFactory.Invoke($Release)
    }
    else {
        $windowsAsset = $Release | Select-Object -ExpandProperty assets | Where-Object { $_.name -Like "*windows*.zip" }
        if (!$windowsAsset) {
            throw "Cannot find the windows Kusion CLI binary"
        }
        [hashtable]$return = @{}
        $return.url = $windowsAsset.url
        $return.name = $windowsAsset.name
        return $return
    }`
}

$release = GetVersionInfo -Version $Version -Releases $releases
if (!$release) {
    throw "Cannot find the specified Kusion CLI binary version"
}
$asset = GetWindowsAsset -Release $release
$zipFileUrl = $asset.url
$assetName = $asset.name

$zipFilePath = $KusionRoot + "\" + $assetName
Write-Output "Downloading $zipFileUrl ..."

$githubHeader.Accept = "application/octet-stream"
$oldProgressPreference = $progressPreference;
$progressPreference = 'SilentlyContinue';
Invoke-WebRequest -Headers $githubHeader -Uri $zipFileUrl -OutFile $zipFilePath
$progressPreference = $oldProgressPreference;
if (!(Test-Path $zipFilePath -PathType Leaf)) {
    throw "Failed to download Kusion binary - $zipFilePath"
}

# Extract Kusion CLI to $KusionRoot
Write-Output "Extracting $zipFilePath..."
Microsoft.Powershell.Archive\Expand-Archive -Force -Path $zipFilePath -DestinationPath $KusionRoot
if (!(Test-Path $KusionFilePath -PathType Leaf)) {
    throw "Failed to download Kusion archieve - $zipFilePath"
}

# Clean up zipfile
Write-Output "Clean up $zipFilePath..."
Remove-Item $zipFilePath -Force

# Add KusionRoot directory to User Path environment variable
Write-Output "Try to add $KusionRoot to User Path Environment variable..."
$UserPathEnvironmentVar = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($UserPathEnvironmentVar -like '*kusion*') {
    Write-Output "Skipping to add $KusionRoot to User Path - $UserPathEnvironmentVar"
}
else {
    [System.Environment]::SetEnvironmentVariable("PATH", $UserPathEnvironmentVar + ";$KusionRoot", "User")
    $UserPathEnvironmentVar = [Environment]::GetEnvironmentVariable("PATH", "User")
    Write-Output "Added $KusionRoot to User Path - $UserPathEnvironmentVar"
}

# Check the Kusion CLI version
Invoke-Expression "$KusionFilePath version"

Write-Output "`r`nKusion is installed successfully."
Write-Output "To get started with Kusion, please visit https://kusionstack.io."
