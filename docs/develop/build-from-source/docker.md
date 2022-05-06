---
sidebar_position: 1
---

# Docker 和 Ubuntu 环境

KusionStack 主要工具由 Golang、Rust、Python、C/C++ 等语言混合开发，同时还需要依赖 Git、Makefile 等工具。为了方便配置开发环境，我们提供了基于 ubuntu:20.04 的 Dockerfile 配置文件：https://github.com/KusionStack/KCLVM/blob/main/Dockerfile 。用户可以基于该自行构建镜像，也可以通过 `docker pull reg.docker.alibaba-inc.com/kusion/kclvmx-builder-ubuntu` 命令拉取镜像。

如果是本地的 Ubuntu 环境，可以参考 Dockerfile 文件的命令安装依赖环境。

注意：
1. 本地除了 Docker 之外，还需要有 Bash 和 GMake 等工具
2. macOS m1 系统对 Docker 的支持还有待完善，构建时可能遇到阻塞等问题

## 1. 构建 KCLVM

KCLVM 是 Kusion 中 KCL 配置语言的实现，通过以下命令克隆 KCLVM 代码到一个新的目录：

```
$ git clone git@github.com:KusionStack/KCLVM.git
```

然后在命令行环境切换到 KCLVM 代码根目录，执行以下命令：

```
$ make sh-in-docker
root@ubuntu:~/kclvm# pwd
/root/kclvm
```

以上命令会将宿主机器当前的 KCLVM 目录映射到容器中的 `/root/kclvm` 目录，同时进入 Bash 环境。

然后通过 `run.sh` 脚本构建 CPython：

```
root@ubuntu:~/kclvm# ./run.sh 
1) build          3) build-kclvm    5) test           7) lint-check     9) release-arm64
2) build-cpython  4) update-kclvm   6) format         8) release
Please select the action: 2
...
```

选择 2 进行 CPython 构建，构建时间几十分钟不等。构建的结果在 `/root/kclvm/_build/dist/ubuntu/cpython` 目录，CPython 只需要构建一次。

然后是构建 KCLVM 的 Python 和 Rust 版本，同时安装依赖的包（包括依赖的插件等）：

```
root@ubuntu:~/kclvm# ./run.sh 
1) build          3) build-kclvm    5) test           7) lint-check     9) release-arm64
2) build-cpython  4) update-kclvm   6) format         8) release
Please select the action: 3
...
```

构建结果在 `/root/kclvm/_build/dist/ubuntu/kclvm` 目录，其中插件在 `plugins` 子目录，二进制程序在 `bin` 子目录。将 `/root/kclvm/_build/dist/ubuntu/kclvm/bin` 目录添加到 `PATH` 环境变量，然后输入 `which kcl` 或 `kcl -h` 测试 KCL 命令行。

然后编译执行 `/root/kclvm/hello.k` 配置程序：

```
root@ubuntu:~/kclvm# kcl hello.k
name: kcl
age: 1
two: 2
x0:
  name: kcl
  age: 1
x1:
  name: kcl
  age: 101
```

一切正常就说明构建成功了。

## 2. 构建 kclvm-go 和 kcl-go

kclvm-go 是基于 KCLVM 命令包装的 Go 语言 SDK，上层的 Kusion 命令也是通过 `kclvm-go` 使用 KCLVM 的功能。`kcl-go` 是基于 `kclvm-go` SDK，采用 Go 语言实现了一个命令行工具，其中包含 KCL 语言的 Playground 和单元测试等功能。

在 Docker 镜像中已经安装了 Go 版本，可以通过以下命令查看。

```
root@ubuntu:~/kclvm# go version
go version go1.16.3 linux/amd64
```

克隆 `kclvm-go` 仓库：

```
root@ubuntu:~/kclvm# cd
root@ubuntu:~# git clone git@github.com:KusionStack/kclvm-go.git
```

然后执行 `kclvm-go/examples/hello/main.go`：

```
root@ubuntu:~# cd kclvm-go
root@ubuntu:~/kclvm-go# go run ./examples/hello
age: 1
name: kcl
two: 2
x0:
    age: 1
    name: kcl
x1:
    age: 101
    name: kcl
```

测试程序正常运行说明 `kclvm-go` 的构建已经成功了。现在可以执行更复杂的 `kcl-go` 命令：

```
root@ubuntu:~/kclvm-go# go run ./cmds/kcl-go
NAME:
   kcl-go - K Configuration Language Virtual Machine

USAGE:
   kcl-go
   kcl-go [global options] command [command options] [arguments...]

   kcl-go kcl -h
   kcl-go -h
...
```

也可以通过 `kcl-go` 命令行执行 `kclvm-go/hello.k`：

```
root@ubuntu:~/kclvm-go# go run ./cmds/kcl-go run hello.k
age: 1
name: kcl
two: 2
x0:
    age: 1
    name: kcl
x1:
    age: 101
    name: kcl
```

或者通过 `go run ./cmds/kcl-go play` 启动 Playground 服务，然后浏览器打开 http://127.0.0.1:2021 页面测试。

## 3. 构建 Kusion 命令

Kusion 是更上层的工具集合，其核心命令是采用 Go 语言实现，底层和 KCLVM 的交互是通过 `kclvm-go` 包完成。

克隆 Kusion 仓库：

```
root@ubuntu:~/kclvm# cd
root@ubuntu:~# git clone git@github.com:KusionStack/kusion.git
```

然后执行 `kusion/cmds/kusionctl` 程序：

```
root@ubuntu:~/kusion# go run ./cmd/kusionctl
kusion 作为云原生可编程技术栈，通过代码管理 kubernetes 集群。
...
```

正常情况可以看到 kusion 命令的帮助信息。

## 4. KCLOpenapi

KCLOpenapi 是 KCL 语言版本的 OpenAPI 工具，完整采用 Go 语言实现。因此可以在任何一个安装了 Go 1.16+ 的环境编译。

```
$ git clone git@github.com:KusionStack/kcl-openapi.git
$ cd kcl-openapi
$ go run ./cmd/swagger -h
Usage:
  swagger [OPTIONS] <generate | validate>

Swagger tries to support you as best as possible when building APIs.

It aims to represent the contract of your API with a language agnostic
description of your application in json or yaml.
...
```

正常可以看到帮助信息。

## 5. 其它

KCLVM、KusionCtl 是本地开发需要经常构建的仓库，目前因为开发资源和时间的原因导致开发文档还不够完善，希望社区同学多多反馈共同参与完善。此外还有 VSCode 插件等外围工具的构建，用户可以参考仓库内部实现代码和文档操作。
