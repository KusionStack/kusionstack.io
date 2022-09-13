---
sidebar_position: 2
---

# Kusion 的 Docker 镜像

如果环境无法安装本地执行版本，可以选择 KusionStack 的 Docker 版本。首先在本地安装好 [Docker](https://www.docker.com/) 环境，并启动 Docker 服务。然后通过 `docker info` 命令验证本地的 Docker 服务已经正常启动。

Kusion 镜像的网址: https://hub.docker.com/r/kusionstack/kusion

## 1. 拉取最新版本

通过以下命令拉取最新的版本：

```shell
$ docker pull kusionstack/kusion
Using default tag: latest
latest: Pulling from kusion/kusion
...
kusionstack/kusion:latest
$
```

然后通过以下命令查看 KCL 版本号：

```shell
$ docker run --rm -it kusionstack/kusion kcl --version
kclvm version is 0.4.1; checksum: ***
$
```

## 2. 拉取指定版本

查看[镜像版本号列表](https://hub.docker.com/r/kusionstack/kusion/tags)，或者通过以下命令拉取 kusion 最新镜像（Kusion镜像中包含KCL命令行工具）：

```shell
$ docker pull kusionstack/kusion
...
```

然后通过以下命令查看 KCL 版本号：

```shell
$ docker run --rm -it kusionstack/kusion:v0.4.1 kcl --version
kclvm version is 0.4.1
$
```

## 3. 执行 KCL 代码

如果要验证执行 KCL 程序，可以先在当前目录创建一个 `hello.k` 文件，内容如下：

```python
hello = "world"
```

然后通过以下命令执行 `hello.k` 文件：

```shell
$ docker run --rm -it -v `pwd`:/root/hello.k kusionstack/kusion kcl /root/hello.k
hello: world
$
```

程序输出的YAML格式的 `hello: world` 数据，说明Docker环境的KCL已经可以正常工作了。

