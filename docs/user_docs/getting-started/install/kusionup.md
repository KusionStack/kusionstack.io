---
sidebar_position: 1
---

# Kusionup 安装

推荐通过 kusionup 工具安装 Kusion，这是一个优雅的 kusion 多版本管理工具，你可以通过它：

- 一键安装任何版本的 kusion
- 灵活切换不同版本的 kusion
- 自定义本地 kusion 版本

## 1. 安装 Kusionup

通过以下命令一键安装 `kusionup`：

```bash
curl -s "http://kusion-public.oss-cn-hzfinance.aliyuncs.com/cli/kusionup/scripts/install_kusionup.sh" | bash && source $HOME/.kusionup/env
```

该脚本执行后会创建 `$HOME/.kusionup` 目录，该目录下会包含：

- `$HOME/.kusionup/bin` 目录用于放置 `kusionup` 二进制工具
- `$HOME/.kusionup/env` 文件用于声明 `kusionup` 和 `kusion` 技术栈所需要的环境变量
- `$HOME/.kusionup/current` 软链接用于标识当前激活的 `kusion` 版本
- `$HOME/.kusionup/$VERSION` 目录代表不同的 `kusion` 版本目录，比如默认安装的最新版本 `$HOME/.kusionup/latest`

**💡 自定义默认安装版本**：
上述脚本会默认安装最新的 kusion 版本（`latest`），如果想**自定义默认安装版本**，可以运行下述命令（将最后的 `latest` 替换为你想要默认安装的版本号就就行）：

```bash
curl -s "http://kusion-public.oss-cn-hzfinance.aliyuncs.com/cli/kusionup/scripts/install_kusionup.sh" | bash -s -- --skip-install && source $HOME/.kusionup/env && kusionup reinstall latest
```

**💡 安装失败问题排查**：

**❓ 问题 1**：M1 Mac Openssl dylib 库找不到或 SSL module is not available 的问题

1. 确保你有一个 homebrew arm64e-version  安装在 /opt/homebrew, 否则通过如下命令安装 arm 版本的 brew

```python
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 添加到 path
export PATH=/opt/homebrew/bin:$PATH
```

2. 通过 brew 安装 openssl 1.1 版本

```python
brew install openssl@1.1
```

**❓ 问题 2**：mac KCLVM gettext dylib 找不到的问题
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/317257/1646538731635-b1e290a5-465d-4838-b8d1-7f22cb48e267.png#clientId=uc50abf48-5ee8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=200&id=ub5ce78d1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=400&originWidth=1158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=238920&status=done&style=none&taskId=ue75303e6-140d-450f-84de-464da45a473&title=&width=579)

- 使用 which 命令找到自己 gettext 的位置 (假设为/Users/yueyi/tools/homebrew/bin/gettext)

```python
which gettext
```

- 使用 otool -L 命令获得 libintl.8.dylib 的位置

```python
C02Y90Q4JHD2:bin yueyi$ otool -L /Users/yueyi/tools/homebrew/bin/gettext
/Users/yueyi/tools/homebrew/bin/gettext:
  /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation (compatibility version 150.0.0, current version 1675.129.0)
  /Users/yueyi/tools/homebrew/Cellar/gettext/0.21/lib/libintl.8.dylib (compatibility version 11.0.0, current version 11.0.0)
  /usr/lib/libiconv.2.dylib (compatibility version 7.0.0, current version 7.0.0)
  /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1281.100.1)
```

- 将  `/Users/yueyi/tools/homebrew/Cellar/gettext/0.21/lib/libintl.8.dylib` 拷贝到 `usr/local/opt/gettext/lib/libintl.8.dylib`

## 2. 管理 Kusion 版本

执行完安装脚本后，默认已经安装好了 `kusionup` 和一个默认的 `kusion` 版本，你可以通过执行 `kusionup` 查看已安装的所有版本：

```bash
$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
  ▸ latest
```

执行 `kusionup ls-ver` 列出来自内置安装源中的**所有可安装的 **`**kusion**`** 版本**：

```bash
$ kusionup ls-ver
latest
v0.3.16
v0.3.15
v0.3.14
```

执行 `kusionup install $VERSION` 安装指定版本：

```shell
# 这里假设安装开源 kusion 的最新版本 ↓
$ kusionup install latest
Downloaded   0.0% (     2426 / 139988826 bytes) ...
Downloaded  11.4% ( 16003466 / 139988826 bytes) ...
Downloaded  21.0% ( 29433014 / 139988826 bytes) ...
Downloaded  32.2% ( 45077686 / 139988826 bytes) ...
Downloaded  41.9% ( 58642898 / 139988826 bytes) ...
Downloaded  51.2% ( 71647010 / 139988826 bytes) ...
Downloaded  61.6% ( 86258486 / 139988826 bytes) ...
Downloaded  71.2% ( 99667706 / 139988826 bytes) ...
Downloaded  81.5% (114078806 / 139988826 bytes) ...
Downloaded  91.5% (128134166 / 139988826 bytes) ...
Downloaded 100.0% (139988826 / 139988826 bytes)
INFO[0055] Unpacking /root/.kusionup/kusion@latest/kusion-linux.tgz ...
INFO[0061] Success: latest downloaded in /root/.kusionup/kusion@latest
INFO[0061] Default Kusion is set to 'latest'

$ kusion version
releaseVersion: v0.3.21
......
```

执行 `kusionup show` 查看目前正在使用的 kusion 版本：

```bash
$ kusionup show
|    VERSION    | ACTIVE |
|---------------|--------|
|    latest     |   *    |
|    v0.3.20    |        |
```

执行 `kusionup remove $VERSION` 删除指定版本：

```bash
# 这里假设删除 kusion 的最新版本 ↓
$ kusionup remove latest
INFO[0000] Removing latest

$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
  ▸ v0.3.20  # 已经没有 latest 的选项了
```

## 3. Kusionup 帮助文档

```bash
$ kusionup -h
The Kusion installer

Usage:
  kusionup [flags]
  kusionup [command]

Available Commands:
  default     Set the default Kusion version
  help        Help about any command
  install     Install Kusion with a version
  ls-ver      List Kusion versions to install
  remove      Remove Kusion with a version
  show        Show installed Kusion
  version     Show kusionup version

Flags:
  -h, --help      help for kusionup
  -v, --verbose   Verbose

Use "kusionup [command] --help" for more information about a command.
```

## 4. Kusionup Tips

**将本地任何 kusion 版本加入到 kusionup 切换列表中？**

该方法可以将本地的任何一个版本的 `.kusion` 目录加入到 `kusionup` 的切换列表中，可用于调试，使用更加灵活。

```bash
# 假设本地有个调试版本的 kusion 放在 $HOME/.kusion 目录中
# 执行下面的命令后可以将它加入到 kusionup 切换列表中

$ mv $HOME/.kusion $HOME/.kusionup/kusion-debug

# 接下来就可以通过 kusionup 切换到 debug 版本了
$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
    latest
  ▸ debug
```

**注意**：`.kusionup` 下的 `kusion` 目录必须以 `kusion-` 为前缀，后缀是版本号；

## 5. VS Code 插件

为了提高 IDE 开发 KCL 的效率，Kusion 为 VS Code 在线版和本地版本提供了插件支持。在线版本可以从 https://vscode.dev 地址打开，然后安装“KCL for vscode.dev 插件”，效果如下:

![](./images/ide-vscode.png)

本地 VS Code 可以安装完整的 [KCL 插件](https://marketplace.visualstudio.com/items?itemName=kcl.kcl-vscode-extension)，提供了高亮、自动补全（部分：关键字补全等）、跳转、悬停、大纲等功能。插件虽然不是 Kusion 必须的部分，但是可以提高效率推荐安装。
