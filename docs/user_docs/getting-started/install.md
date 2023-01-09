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
For binary tools, KusionStack provides a one-click installation for everybody.

## One-click installation

The preferred method for installing on Mac and Linux is to use the brew package manager.
You can also run `go install` if your environment is available for golang.

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

KCL is embedded in Kusion, so you don't need to install it again. If you are interested in other versions of KCL, please refer to [KCL Installation](https://kcl-lang.io/docs/user_docs/getting-started/install/).

:::tip
If you need a multi-version management tool for Kusion and KCL, please refer to [Kusionup Tools](/docs/reference/cli/kusionup/).
:::
## No Installation

If the upper installation doesn't support your environment, you can use the docker image of Kusion instead. First, prepare the [Docker](https://www.docker.com/) service and start it. Then use the `docker pull` command to get an available Kusion image.

```bash
docker pull kusionstack/kusion:latest
```

:::tip
Kusion image repository: https://hub.docker.com/r/kusionstack/kusion
:::

Next, run Kusion in an interactive mode:

```bash
docker run --rm -it kusionstack/kusion:latest bash
```
