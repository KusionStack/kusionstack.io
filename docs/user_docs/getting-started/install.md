---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation Guide

KusionStack consists of "three major pieces", namely:

- Kusion: the engine of KusionStack for parsing users' intentions described in Konfig and making them effective in infrastructures.
- KCL: KCL（Kusion Configuration Language is an open-source constraint-based record and functional language.
- Konfig: Konfig is the mono repository of the infra configuration in KCL.

The first two are binary tools that need to be downloaded and installed, and the third is a Git repository. 
For binary tools, KusionStack provides two installation methods: one-click installation and manual installation. 
The one-click installation implements multi-version management through the `kusionup` tool.

## One-click installation

Firstly, install `kusionup`, you can choose different installation methods according to different operating systems and working environments.

### Install Kusionup

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

### Initialization

After `kusionup` is installed, execute the one-click initialization command to complete the installation of the latest version of kusion and the supporting KCL:

```bash
kusionup init --skip-prompt && source $HOME/.kusionup/env
```

:::info
More details of kusionup, please refer to [Kusionup Tools](/docs/reference/cli/kusionup/).
:::

## Manual Installation

### Install Kusion

```mdx-code-block
<Tabs>
<TabItem value="Go Install" >
```

```bash
go install github.com/KusionStack/kusion@latest
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Install KCL

```mdx-code-block
<Tabs>
<TabItem value="MacOS" >
```

```bash
curl -fsSL https://kcl-lang.io/script/install.sh | /bin/bash
```

```mdx-code-block
</TabItem>
<TabItem value="Linux">
```

```bash
wget -q https://kcl-lang.io/script/install.sh -O - | /bin/bash
```

```mdx-code-block
</TabItem>
<TabItem value="Windows">
```

```bash
powershell -Command "iwr -useb https://kcl-lang.io/script/install.ps1 | iex"
```

```mdx-code-block
</TabItem>
<TabItem value="Go Install">
```

```bash
go install kusionstack.io/kclvm-go/cmds/kcl-go@main && alias kcl='kcl-go kcl'
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::info
More details of KCL installation, please refer to [KCL Installation](https://kcl-lang.io/docs/user_docs/getting-started/install/).
:::

### Set Environment Variables

```mdx-code-block
<Tabs>
<TabItem value=".zshrc" >
```

```bash
mkdir -p $HOME/.kusionup/current
cat > ~/.zshrc <<EOF
export KUSION_PATH=$HOME/.kusionup/current
EOF
source ~/.zshrc
```

```mdx-code-block
</TabItem>
<TabItem value=".bash_profile">
```

```bash
mkdir -p $HOME/.kusionup/current
cat > ~/.bash_profile <<EOF
export KUSION_PATH=$HOME/.kusionup/current
EOF
source ~/.bash_profile
```

```mdx-code-block
</TabItem>
</Tabs>
```

## No Installation

If the upper installation doesn't support your environment, you can use the docker image of Kusion instead. First, prepare the [Docker](https://www.docker.com/) service and start it. Then use the `docker pull` command to get an available Kusion image.

```bash
docker pull kusionstack/kusion:latest
```

:::info
KusionStack image: https://hub.docker.com/r/kusionstack/kusion
:::

Next, run Kusion in an interactive mode:

```bash
docker run --rm -it kusionstack/kusion:latest bash
```
