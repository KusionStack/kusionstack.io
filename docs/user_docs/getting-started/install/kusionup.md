---
sidebar_position: 1
---

# Install by Kusionup

It is recommended to install `kusion` through the `kusionup` tool, which is an elegant tool for managing multiple versions of `kusion`, you can use it to:

- Install any version of `kusion` with one click
- Flexibly switch between different versions of `kusion`
- Customize your local `kusion` version

## 1. Install Kusionup and Latest Kusion

The following script will install the `kusionup` tool and the latest version of `kusion` tools with one-click:

```bash
brew install KusionStack/tap/kusionup && kusionup init --skip-prompt && source $HOME/.kusionup/env
```

And you can later upgrade `kusionup` with `brew`：

```bash
brew update
brew upgrade KusionStack/tap/kusionup
```

The installation script creates a `$HOME/.kusionup` directory and contains these files:

- `$HOME/.kusionup/bin` is a directory that contains the `kusionup` binary file
- `$HOME/.kusionup/env` is a file that declares environment variables used by `kusionup` and `kusion` tools
- `$HOME/.kusionup/current` is a soft link to the currently active `kusion` tools
- `$HOME/.kusionup/$VERSION` are directories of different versions of `kusion` tools. For example, the latest version will be installed by default to the `$HOME/.kusionup/latest` directory

**💡 Install the custom version**：

The above installation script by default installs the latest `kusion` tools. And if you want to customize it and install a specific version(github@v0.7.0 as an example) directly, please try the following command:

```bash
brew install KusionStack/tap/kusionup && kusionup init --skip-install && source $HOME/.kusionup/env && kusionup reinstall github@v0.7.0
```

**💡 Installation failure troubleshooting:


**❓ Issue 1**：M1 Mac openssl `dylib` library cannot be found or SSL module is not available

1. Make sure you have arm64e-version homebrew installed at `/opt/homebrew`. If not, you can first install it:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# add to path environment
export PATH=/opt/homebrew/bin:$PATH
```

2. Install `openssl@1.1` with `brew`

```bash
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

## 2. Manage Multiple Versions of Kusion

During the `kusionup` installation the default version of `kusion` is installed. Then you can check and navigate through all the installed versions of `kusion`:

```bash
$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
  ▸ latest
```

Also, you can list all the available versions of `kusion`:

```bash
$ kusionup ls-ver
cdn@latest
cdn@v0.4.2
cdn@v0.4.1
github@latest
github@v0.4.2
github@v0.4.1
```

To install a specific version of ``kusion`, you can use `kusionup install $VERSION`:

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

Use `kusionup show` command to take a view of all the installed versions and spot the active version:

```bash
$ kusionup show
|    VERSION    | ACTIVE |
|---------------|--------|
|  cdn@latest   |   *    |
|  cdn@v0.4.1   |        |
```

You can also `kusionup remove $VERSION` to uninstall a specific version of `kusion`:

```bash
# try remove the latest version
$ kusionup remove latest
INFO[0000] Removing latest

$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
  ▸ cdn@v0.4.1  # there is no latest version
```

## 3. Kusionup Command Usage Reference

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

**How to add a custom version of `kusion` to the `kusionup` toggle list?**

You might need to add a local version of `kusion` for debugging and this can be done by following commands:

```bash
# place your debug version of kusion tools to the kusion-debug directory
$ cp -r <directory_contianing_your_customized_kusion> $HOME/.kusionup/kusion-debug

# switch to the debug version
$ kusionup
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
    cdn@latest
  ▸ debug
```

**Note:** the subdirectories under the `.kusionup` must be named with a "kusion-" prefix and with a version number as a suffix

## 5. Install the VS Code Extension

To improve the KCL development on VS Code, there are VS Code
 extensions for both VS Code Web IDE and VS Code.

The [VS Code Web IDE](https://vscode.dev) can be reached through the browser, and you can search and install the [KCL for vscode.dev](https://marketplace.visualstudio.com/items?itemName=kcl.kcl-vscode-web-extension) in the VS Code Extension tab. And here's the syntax highlighting view you'll get: 

![](/img/docs/user_docs/getting-started/install/ide-vscode.png)

The KCL extension for the local VS Code IDE provides more rich language support for the KCL language such as highlighting, auto-completion, quick info hover and code navigation, etc. Although the extension is not a must-required part of Kusion, it is recommended to install it to improve coding efficiency.

