---
sidebar_position: 2
---

# Kusion 的 Docker 镜像

如果环境无法安装本地执行版本，可以选择 KusionStack 的 Docker 版本。首先在本地安装好 [Docker](https://www.docker.com/) 环境，并启动 Docker 服务。然后通过 `docker info` 命令验证本地的 Docker 服务已经正常启动。

## 1. 拉取最新版本

通过以下命令拉取最新的版本：

```shell
$ docker pull reg.docker.alibaba-inc.com/kusion/kusion
Using default tag: latest
latest: Pulling from kusion/kusion
524b0c1e57f8: Pull complete 
d99fc7c79d4b: Pull complete 
9406162ca122: Pull complete 
bb2ee4fcf3ac: Pull complete 
82970db0f263: Pull complete 
e6eb88a9aaf8: Pull complete 
Digest: sha256:9be5662e2bdd709db6c5249d719c1599f6a064dfc1b8fbc2e51248d800937163
Status: Downloaded newer image for reg.docker.alibaba-inc.com/kusion/kusion:latest
reg.docker.alibaba-inc.com/kusion/kusion:latest
$
```

然后通过以下命令查看 KCL 版本号：

```shell
$ docker run --rm -it reg.docker.alibaba-inc.com/kusion/kusion kcl --version
kclvm version is 0.3.5; checksum: dcd883b0c414e9f250612051f1a34d48
$
```

## 2. 拉取指定版本

查看发布日志，查看相应的版本号。通过以下命令拉取kusion镜像（Kusion镜像中包含KCL命令行工具）：

```shell
$ docker pull reg.docker.alibaba-inc.com/kusion/kusion
...
```

然后通过以下命令查看 KCL 版本号：

```shell
$ docker run --rm -it reg.docker.alibaba-inc.com/kusion/kusion:v0.3.4-b72d3fc8 kcl --version
kclvm version is 0.3.4
$
```

## 3. 执行 KCL 代码

如果要验证执行 KCL 程序，可以先在当前目录创建一个 `hello.k` 文件，内容如下：

```python
hello = "world"
```

然后通过以下命令执行 `hello.k` 文件：

```shell
$ docker run --rm -it -v `pwd`:/root/hello.k reg.docker.alibaba-inc.com/kusion/kusion kcl /root/hello.k
hello: world
$
```

程序输出的YAML格式的 `hello: world` 数据，说明Docker环境的KCL已经可以正常工作了。

