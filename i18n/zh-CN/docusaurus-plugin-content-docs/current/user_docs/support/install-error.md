---
sidebar_position: 1
---
# 安装问题

## 1. 找不到 `libintl.dylib`

这个问题是有些工具底层依赖了 Gettext 库，但是 macOS 默认没有这个库导致。可以尝试通过以下方式解决：

1. (非 macOS m1 跳过该步)对于 macOS m1 操作系统，确保你有一个 homebrew arm64e-version  安装在 /opt/homebrew, 否则通过如下命令安装 arm 版本的 brew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 添加到 path
export PATH=/opt/homebrew/bin:$PATH
```

2. `brew install gettext`
3. 确保 `/usr/local/opt/gettext/lib` 目录存在 `libintl.8.dylib`
4. 如果 brew 安装到其他目录下，可以通过拷贝等方式创建库到对应目录下

## 2. macOS 系统 SSL 相关错误

Openssl dylib 库找不到或 SSL module is not available 的问题

1. (非 macOS m1 跳过该步)对于 macOS m1 操作系统，确保你有一个 homebrew arm64e-version  安装在 /opt/homebrew, 否则通过如下命令安装 arm 版本的 brew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 添加到 path
export PATH=/opt/homebrew/bin:$PATH
```

2. 通过 brew 安装 openssl 1.1 版本

```
brew install openssl@1.1
```
