---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 安装指南

KusionStack 包含“三大件”，分别是：

- Kusion：KusionStack 的引擎，用于解析 Konfig 中描述的用户意图并使其在基础架构中生效。
- KCL：KCL（Kusion Configuration Language）是一种开源的基于约束的记录和功能语言。
- Konfig：Konfig 是用 KCL 语言编写的基础设施配置的核心代码仓库。

前两者，是二进制工具，需要下载安装，第三个是 Git 仓库。对于二进制工具，KusionStack 提供了两种安装方式：
一键安装和手动安装。其中一键安装通过 `kusionup` 工具实现多版本管理。

## 一键安装

首先安装 `kusionup`，可根据不同操作系统和工作环境，选择不同的安装方式。

### 安装 kusionup

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

### 初始化

`kusionup` 安装完成后，执行一键初始化命令，即可完成 kusion 的 latest 版本以及配套的 KCL 的安装：

```bash
kusionup init --skip-prompt && source $HOME/.kusionup/env
```

:::info
有关 kusionup 的相关说明，请看 [Kusionup Tools](/docs/reference/cli/kusionup/)。
:::

## 手动安装

### 安装 Kusion

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

### 安装 KCL

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
有关 KCL 安装的细节, 请看[这里](https://kcl-lang.io/docs/user_docs/getting-started/install/)。
:::

### 设置环境变量

```mdx-code-block
<Tabs>
<TabItem value=".zshrc" >
```

```bash
cat > ~/.zshrc <<EOF
mkdir -p $HOME/.kusionup/current
export KUSION_PATH=$HOME/.kusionup/current
EOF
source ~/.zshrc
```

```mdx-code-block
</TabItem>
<TabItem value=".bash_profile">
```

```bash
cat > ~/.bash_profile <<EOF
mkdir -p $HOME/.kusionup/current
export KUSION_PATH=$HOME/.kusionup/current
EOF
source ~/.bash_profile
```

```mdx-code-block
</TabItem>
</Tabs>
```

## 免安装

如果上面的安装方式不支持你的环境，你可以选择 Kusion 镜像作为替代。
首选，准备好 [Docker](https://www.docker.com/) 服务并启动，
然后执行 `docker pull` 命令，拉取一个可用的 Kusion 镜像。

```bash
docker pull kusionstack/kusion:latest
```

:::info
KusionStack image: https://hub.docker.com/r/kusionstack/kusion
:::

接下来，以交互式方式启动 Kusion 镜像：

```bash
docker run --rm -it kusionstack/kusion:latest bash
```
