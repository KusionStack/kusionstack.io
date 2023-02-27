---
sidebar_position: 1
---

# 安装指南

## Homebrew (MacOS & Linux)

在 Mac 和 Linux 上安装的首选方法是使用 brew 包管理器。

你可以使用以下命令安装最新的 Kusion CLI：

```bash
brew install KusionStack/tap/kusion
```

你也可以按照下面的二进制安装。

## Curl|sh (MacOS & Linux)

如果你没有 homebrew，也可以使用这个单行命令安装 CLI：

```bash
curl https://kusionstack.io/scripts/install.sh | sh
```

## Scoop (Windows)

你可以使用下面的命令安装 Kusion CLI 的最新版本：

```bash
scoop add bucket KusionStack https://github.com/KusionStack/scoop-bucket.git
scoop install KusionStack/kusion
``` 

## Powershell (Windows)

使用管理员权限在 powershell 中运行以下命令：

```bash
powershell -Command "iwr -useb https://kusionstack.io/scripts/install.ps1 | iex"
```

## Docker 镜像

如果上面的安装方式不支持你的环境，你可以选择 Kusion 镜像作为替代。

首先，拉取最新镜像：

```bash
docker pull kusionstack/kusion:latest
```

接下来，以交互式方式启动 Kusion 镜像：

```bash
docker run --rm -it kusionstack/kusion:latest bash
```
