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

前两者，是二进制工具，需要下载安装，第三个是 Git 仓库。对于二进制工具，KusionStack 提供了一键安装。

## 一键安装

对于 Mac 和 Linux 用户，推荐使用 brew 包管理器；对于 Go 环境用户，也可以使用 `go install`。

```mdx-code-block
<Tabs>
<TabItem value="MacOS&Linux" >
```

```bash
brew install KusionStack/tap/kusion
```

```mdx-code-block
</TabItem>
<TabItem value="Go Install">
```

```bash
go install github.com/KusionStack/kusion@latest
```

```mdx-code-block
</TabItem>
</Tabs>
```

KCL 已经嵌入在 Kusion 中，因此你不需要额外再安装它。如果你对 KCL 的其他版本有兴趣，请阅读 [KCL 安装指南](https://kcl-lang.io/docs/user_docs/getting-started/install/)。

:::tip
如果你需要 Kusion 和 KCL 的多版本管理工具，请阅读 [Kusionup 工具](/docs/reference/cli/kusionup/)介绍。
:::

## 免安装

如果上面的安装方式不支持你的环境，你可以选择 Kusion 镜像作为替代。
首选，准备好 [Docker](https://www.docker.com/) 服务并启动，
然后执行 `docker pull` 命令，拉取一个可用的 Kusion 镜像。

```bash
docker pull kusionstack/kusion:latest
```

:::info
Kusion 镜像仓库: https://hub.docker.com/r/kusionstack/kusion
:::

接下来，以交互式方式启动 Kusion 镜像：

```bash
docker run --rm -it kusionstack/kusion:latest bash
```
