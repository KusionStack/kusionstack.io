---
sidebar_position: 1
---

# Kusionup

It is recommended to install Kusion through the kusionup tool, which is an elegant kusion multi-version management tool, you can use it:

- Install any version of kusion with one click
- Flexible switching between different versions of kusion
- Customize local kusion version

## 1. Install Kusionup

One-click installation with the following command `kusionup`:

```bash
brew install KusionStack/tap/kusionup && kusionup init --skip-prompt && source $HOME/.kusionup/env
```

Upgrade `kusionup`：

```bash
brew update
brew upgrade KusionStack/tap/kusionup
```

The script will crate a `$HOME/.kusionup` directory, which will contain:

- `$HOME/.kusionup/bin` directory include the `kusionup` binary file
- `$HOME/.kusionup/env` file is used to declare `kusionup` and kusion environment variables required by the technology stack
- `$HOME/.kusionup/current` soft link is used to identify the currently active kusion version
- `$HOME/.kusionup/$VERSION` directories represent different kusion version directories, such as the latest version installed by default `$HOME/.kusionup/latest`

**💡 Install the custom version**：

The above script will install the latest kusion version ( latest) by default. If you want to customize the default installation version , use the following command:

```bash
brew install KusionStack/tap/kusionup && kusionup init --skip-install && source $HOME/.kusionup/env && kusionup reinstall latest
```

**💡 Installation failure troubleshooting:


**❓ Issue 1**：M1 Mac Openssl `dylib` library cannot be found or SSL module is not available

1. Make sure you have a homebrew arm64e-version installed in `/opt/homebrew`, otherwise to install the arm version of `brew` with the following command

```python
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# add to path environment
export PATH=/opt/homebrew/bin:$PATH
```

2. Use brew to install `openssl@1.1`

```python
brew install openssl@1.1
```

**❓ Issue 2**: mac KCLVM `gettext` dylib cannot be found

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/317257/1646538731635-b1e290a5-465d-4838-b8d1-7f22cb48e267.png#clientId=uc50abf48-5ee8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=200&id=ub5ce78d1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=400&originWidth=1158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=238920&status=done&style=none&taskId=ue75303e6-140d-450f-84de-464da45a473&title=&width=579)

- Use the `which` command to find the location of your own `gettext` (assuming `/Users/UserName/tools/homebrew/bin/gettext`)

```python
which gettext
```

- Use the `otool -L` command to get the location of `libintl.8.dylib`

```python
C02Y90Q4JHD2:bin yueyi$ otool -L /Users/yueyi/tools/homebrew/bin/gettext
/Users/yueyi/tools/homebrew/bin/gettext:
  /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation (compatibility version 150.0.0, current version 1675.129.0)
  /Users/yueyi/tools/homebrew/Cellar/gettext/0.21/lib/libintl.8.dylib (compatibility version 11.0.0, current version 11.0.0)
  /usr/lib/libiconv.2.dylib (compatibility version 7.0.0, current version 7.0.0)
  /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1281.100.1)
```

- Copy `/Users/yueyi/tools/homebrew/Cellar/gettext/0.21/lib/libintl.8.dylib` to `/usr/local/opt/gettext/lib/libintl.8.dylib`

## 2. Manage Multi Kusion Versions

After executing the installation script, `kusionup` and a default kusion version is installed. Use kusionup to check the all installed version:


```bash
$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
  ▸ latest
```

Execute to `kusionup ls-ver' to list all installable **kusion**versions from the built-in installation sources :

```bash
$ kusionup ls-ver
cdn@latest
cdn@v0.4.2
cdn@v0.4.1
github@latest
github@v0.4.2
github@v0.4.1
```

Execute to `kusionup install $VERSION` to install specified version:

```shell
# choose the cdn to speed up installation
$ kusionup install cdn@latest
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
releaseVersion: v0.4.1
......
```

Execute to `kusionup show` to see the current kusion version:

```bash
$ kusionup show
|    VERSION    | ACTIVE |
|---------------|--------|
|  cdn@latest   |   *    |
|  cdn@v0.4.1   |        |
```

Execute to `kusionup remove $VERSION` to delete specified version:

```bash
# try remove the latest version
$ kusionup remove latest
INFO[0000] Removing latest

$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
  ▸ cdn@v0.4.1  # there is no latest version
```

## 3. Kusionup Help

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

**How to add custom kusion version to the kusionup toggle list?**

We can use the following method to add any local version which may be used for debugging.

```bash
# install a debug version
$ mv $HOME/.kusion $HOME/.kusionup/kusion-debug

# switch to the debug version
$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
    cdn@latest
  ▸ debug
```

**Note:** In `.kusionup` `.kusionup`, the subdirectory name must start with "kusion-" and the suffix is ​​the version number;

## 5. VS Code Extension

In order to improve the efficiency of IDE development of KCL, Kusion provides plug-n support for VS Code online and native environment.
The online version can be opened from https://vscode.dev address, and then install "KCL for vscode.dev plugin", the effect is as follows:

![](/img/docs/user_docs/getting-started/install/ide-vscode.png)

Native VS Code can install a complete KCL plugin , providing features such as highlighting, auto-completion (keyword completion, etc.), jump, hover, outline, etc. Although the plugin is not a necessary part of Kusion, it is recommended to install it to improve efficiency.

