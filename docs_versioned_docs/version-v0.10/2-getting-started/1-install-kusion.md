import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install Kusion

You can install the latest Kusion CLI on MacOS and Linux. Choose the one you prefer from the methods below.

<Tabs>
<TabItem value="Homebrew" >

The recommended method for installing on MacOS and Linux is to use the brew package manager.

**Install Kusion**

```bash
# tap formula repository Kusionstack/tap
brew tap KusionStack/tap

# install Kusion 
brew install KusionStack/tap/kusion
```

**Update Kusion**

```bash
# update formulae from remote
brew update

# update Kusion
brew upgrade KusionStack/tap/kusion
```

**Uninstall Kusion**

```bash
# uninstall Kusion
brew uninstall KusionStack/tap/kusion
```

```mdx-code-block
</TabItem>
<TabItem value="curl | sh">
```

**Install Kusion**

```bash
# install Kusion, default latest version
curl https://www.kusionstack.io/scripts/install.sh | sh
```

**Install the Specified Version of Kusion**

You can also install the specified version of Kusion by appointing the version as shell script parameter, where the version is the [available tag](https://github.com/KusionStack/kusion/tags) trimming prefix "v", such as 0.10.0, 0.9.0, etc. In general, you don't need to specify Kusion version, just use the command above to install the latest version.

```bash
# install Kusion of specified version 0.10.0
curl https://www.kusionstack.io/scripts/install.sh | sh -s 0.10.0
```

**Uninstall Kusion**

```bash
# uninstall Kusion
curl https://www.kusionstack.io/scripts/uninstall.sh | sh
```

```mdx-code-block
</TabItem>
</Tabs>
```
