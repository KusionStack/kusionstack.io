---
sidebar_position: 4
---

# Windows/X64 Platform

Windows 是最流行的桌面系统，有着庞大的用户群体，但是默认缺少完整的开发环境。如果需要在 Windows 下构建 KusionStack 工具，首先需要安装开发环境。

假设是 Windows/X64 环境，首先安装以下命令：

1. 安装 VC2019，确保，默认的 C++ 工具都已经安装好
   - https://visualstudio.microsoft.com/zh-hans/downloads/
1. 安装 Rust 和 cargo
   - https://forge.rust-lang.org/infra/other-installation-methods.html
   - 安装 x86_64-pc-windows-msvc 版本，配套 MSVC 编译器（待确认）
1. 安装 Go1.16+，必要时可以根据网络环境配置代理服务
   - https://go.dev/dl/
1. 安装 TDM-GCC-x64 工具
   - https://jmeubank.github.io/tdm-gcc/download/
1. 安装 LLVM-12.0.1-win64
   - https://github.com/PLC-lang/llvm-package-windows/releases/tag/v12.0.1
   - 设置 `LLVM_SYS_120_PREFIX` 和 `LLVM_SYS_70_PREFIX` 环境变量为安装的目录
1. 打开 VS2019-x64 命令行

## 1. 构建 KCLVM

KCLVM 是 Kusion 中 KCL 配置语言的实现，通过以下命令克隆 KCLVM 代码到一个新的目录，地址：`git@github.com:KusionStack/KCLVM.git`。

然后在 VS2019-x64 命令行环境切换到 `KCLVM` 目录执行 `cargo build` 测试 Rust 等环境。

然后在 VS2019-x64 命令行环境切换到 `.\Scripts\build-windows` 目录，执行 `build.bat` 批处理脚本进行构建。输出的文件在 `.\Scripts\build-windows\_output\kclvm-windows` 目录。

构建成功后通过以下命令测试 KCL 命令：

```
_output\kclvm-windows\kclvm.exe -m kclvm ..\..\hello.k
_output\kclvm-windows\kcl-go.exe run     ..\..\hello.k
_output\kclvm-windows\kcl.exe            ..\..\hello.k
```

一切正常就说明构建成功了。

## 2. 构建 kclvm-go 和 kcl-go

kclvm-go 是基于 KCLVM 命令包装的 Go 语言 SDK，上层的 Kusion 命令也是通过 `kclvm-go` 使用 KCLVM 的功能。`kcl-go` 是基于 `kclvm-go` SDK，采用 Go 语言实现了一个命令行工具，其中包含 KCL 语言的 Playground 和单元测试等功能。

首先将 `kclvm.exe` 命令所在目录添加到 `PATH` 环境变量，然后重新登陆系统通过 `where kclvm` 命令检查是否可以找到 kclvm 命令。

然后克隆 kclvm-go 仓库，地址为：`git@github.com:KusionStack/kclvm-go.git`。然后进入 `kclvm-go` 命令执行以下命令：

- `go run ./examples/hello`
- `go run ./cmds/kcl-go`

测试程序正常运行说明 `kclvm-go` 的构建已经成功了。

也可以通过 `go run ./cmds/kcl-go run hello.k` 命令行执行 `kclvm-go/hello.k`，输出以下结果：

```yaml
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

克隆 Kusion 仓库：`git@github.com:KusionStack/kusion.git`

然后进入 kusion 目录执行 `go run ./cmd/kusionctl` 命令。正常情况可以看到 kusion 命令的帮助信息。

## 4. KCLOpenapi

KCLOpenapi 是 KCL 语言版本的 OpenAPI 工具，仓库地址：`git@github.com:aKusionStack/kcl-openapi.git`。

KCLOpenapi 是纯 Go 语言实现的工具，按照正常的 Go 程序构建流行即可。

可以通过 `go run ./cmd/swagger -h` 查看命令的帮助信息。


## 5. 其它

KCLVM、KusionCtl 是本地开发需要经常构建的仓库，目前因为开发资源和时间的原因导致开发文档还不够完善，希望社区同学多多反馈共同参与完善。此外还有 VSCode 插件等外围工具的构建，用户可以参考仓库内部实现代码和文档操作。
