import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kusionup Tools

[Kusionup](https://github.com/KusionStack/kusionup) is a multi-version management tool for Kusion and KCL. It is heavily inspired by [goup](https://github.com/owenthereal/goup).

After `kusionup init` is finished, a `$HOME/.kusionup` directory will be created, and contains these files:

- `$HOME/.kusionup/bin` is a directory that contains the `kusionup` binary file
- `$HOME/.kusionup/env` is a file that declares environment variables used by `kusionup` and `kusion` tools
- `$HOME/.kusionup/current` is a soft link to the currently active `kusion` tools
- `$HOME/.kusionup/$VERSION` are directories of different versions of `kusion` tools. For example, the latest version will be installed by default to the `$HOME/.kusionup/latest` directory

## Installation

```mdx-code-block
<Tabs>
<TabItem value="MacOS" >
```

```bash
brew install KusionStack/tap/kusionup
```

```mdx-code-block
</TabItem>
<TabItem value="Linux">
```

```bash
curl -sSf https://raw.githubusercontent.com/KusionStack/kusionup/main/scripts/install.sh | bash
```

```mdx-code-block
</TabItem>
<TabItem value="Go Install">
```

```bash
go install github.com/KusionStack/kusionup@latest
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Initialization

After `kusionup` is installed, execute the one-click initialization command to complete the installation of the latest version of Kusion and the supporting KCL:

```bash
kusionup init --skip-prompt && source $HOME/.kusionup/env
```

## Install the specified version

The command `kusionup init --skip-prompt` will install the latest version of `kusion` and the supporting KCL. 
And if you want to customize it and install a specific version(take github@v0.7.0 as an example) directly, please run the following command:

```bash
kusionup install github@v0.7.0
```

## Version Management

During the initialization of `kusionup`, the latest version of `kusion` is installed. Then you can check and navigate through all the installed versions of `kusion`:

```bash
kusionup
```

The output is similar to:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Select a version:
  ▸ latest
```

Also, you can list all the available versions of `kusion`:

```bash
kusionup ls-ver
```

The output is similar to:

```bash
cdn@latest
cdn@v0.4.2
cdn@v0.4.1
github@latest
github@v0.4.2
github@v0.4.1
```

To install a specific version of `kusion`, you can run `kusionup install $VERSION`:

```bash
kusionup install cdn@latest
```

The output is similar to:

```bash
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
```

Run `kusionup show` to check all the installed versions and spot the active version:

```bash
kusionup show
```

The output is similar to:

```bash
|    VERSION    | ACTIVE |
|---------------|--------|
|  cdn@latest   |   *    |
|  cdn@v0.4.1   |        |
```

You can run `kusionup uninstall $VERSION` to uninstall a specific version of `kusion`:

```bash
kusionup uninstall cdn@latest
```

The output is similar to:

```bash
INFO[0000] Removing cdn@latest
```

Finally, there is no latest version:

```bash
kusionup show
```

The output is similar to:

```bash
|    VERSION    | ACTIVE |
|---------------|--------|
|  cdn@v0.4.1   |   *    |
```

## Tips and Trouble Shooting

**1. How to add a custom version of `kusion` to the `kusionup` toggle list?**

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

:::tip
The subdirectories under the `.kusionup` must be named with a "kusion-" prefix and with a version number as a suffix.
:::

**2. Mac M1 openssl `dylib` library cannot be found or SSL module is not available**

Make sure you have arm64e-version homebrew installed at `/opt/homebrew`. If not, you can first install it:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# add to path environment
export PATH=/opt/homebrew/bin:$PATH
```

Install `openssl@1.1` with `brew`

```bash
brew install openssl@1.1
```

**3. Mac KCLVM `gettext` dylib cannot be found**

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/317257/1646538731635-b1e290a5-465d-4838-b8d1-7f22cb48e267.png#clientId=uc50abf48-5ee8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=200&id=ub5ce78d1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=400&originWidth=1158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=238920&status=done&style=none&taskId=ue75303e6-140d-450f-84de-464da45a473&title=&width=579)

Use the `which` command to find the location of your `gettext`:

```bash
which gettext
```

The output is similar to:

```bash
/Users/UserName/tools/homebrew/bin/gettext
```

Use the `otool -L` command to get the location of `libintl.8.dylib`:

```bash
otool -L /Users/yueyi/tools/homebrew/bin/gettext
```

The output is similar to:

```python
/Users/yueyi/tools/homebrew/bin/gettext:
  /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation (compatibility version 150.0.0, current version 1675.129.0)
  /Users/yueyi/tools/homebrew/Cellar/gettext/0.21/lib/libintl.8.dylib (compatibility version 11.0.0, current version 11.0.0)
  /usr/lib/libiconv.2.dylib (compatibility version 7.0.0, current version 7.0.0)
  /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1281.100.1)
```

Copy to the target location:

```bash
cp /Users/yueyi/tools/homebrew/Cellar/gettext/0.21/lib/libintl.8.dylib /usr/local/opt/gettext/lib/libintl.8.dylib
```