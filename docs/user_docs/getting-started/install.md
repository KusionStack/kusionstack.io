---
sidebar_position: 1
sidebar_label: Installation
---

# Installation Guide

## Homebrew (MacOS & Linux)

The preferred method for installing on Mac and Linux is to use the brew package manager.

You can install the latest Kusion CLI with the following:

```bash
brew install KusionStack/tap/kusion
```

You can also follow the binary installation below.

## Curl|sh install (MacOS & Linux)

If you don't have homebrew, you can install the CLI with this one-liner:

```bash
curl https://kusionstack.io/scripts/install.sh | sh
```

## Scoop (Windows)

You can install the latest Kusion CLI with the following:

```bash
scoop bucket add KusionStack https://github.com/KusionStack/scoop-bucket.git
scoop install KusionStack/kusion
``` 

## Powershell (Windows)

Run the following command in *powershell* with administrator privilege:

```bash
powershell -Command "iwr -useb https://kusionstack.io/scripts/install.ps1 | iex"
```

## Docker Image

If the upper installation doesn't support your environment, you can use the docker image of Kusion instead.

First, pull the latest image:

```bash
docker pull kusionstack/kusion:latest
```

Next, run Kusion in an interactive mode:

```bash
docker run --rm -it kusionstack/kusion:latest bash
```
