---
title: 代码贡献指南
---
在本代码贡献指南，你将会了解下列内容：

- [如何在本地运行 Karpor](#%E5%A6%82%E4%BD%95%E5%9C%A8%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C-karpor)
- [如何创建拉取请求（pull request）](#%E5%88%9B%E5%BB%BA%E6%8B%89%E5%8F%96%E8%AF%B7%E6%B1%82pull-request)
- [代码审查指导规则](#%E4%BB%A3%E7%A0%81%E5%AE%A1%E6%9F%A5)
- [Pull request 格式指南](#pull-request-%E6%A0%BC%E5%BC%8F%E6%8C%87%E5%8D%97)
- [更新文档和网站](#%E6%9B%B4%E6%96%B0%E6%96%87%E6%A1%A3%E5%92%8C%E7%BD%91%E7%AB%99)

## 如何在本地运行 Karpor

本指南将会帮助你开始 Karpor 开发。

### 前提条件

* Golang 版本 1.22+

<details>
  <summary>安装 Golang</summary>

1. 从 [官方网站](https://go.dev/dl/) 安装 golang 1.22+。解压二进制文件并放置到某个位置，假设该位置是 home 目录下的 `~/go/`，下面是一个示例命令，你应当选择适合你系统的正确二进制文件。

```
wget https://go.dev/dl/go1.20.2.linux-amd64.tar.gz
tar xzf go1.20.2.linux-amd64.tar.gz
```

如果你想在本地开发环境维护多个 golang 版本，你可以下载包并解压到某个位置，比如 `~/go/go1.22.1`，然后根据下面的命令相应地改变路径。

1. 为 Golang 设置环境变量

```
export PATH=~/go/bin/:$PATH
export GOROOT=~/go/
export GOPATH=~/gopath/
```

如果 `gopath` 目录不存在，可以使用 `mkdir ~/gopath` 创建。这些命令将会把 go 二进制文件所在的目录添加到 `PATH` 环境变量 (让其成为 go 命令的优先选择）并且设置 `GOROOT` 环境到该 go 目录。如果将这些行添加到你的 `~/.bashrc` or `~/.zshrc` 文件，你就不用每次打开新的终端时设置这些环境变量。

1. (可选) 在一些地区，例如中国大陆，连接到默认的 go 仓库可能会很慢；你可以配置 GOPROXY 来加速下载过程。

```
go env -w GOPROXY=https://goproxy.cn,direct
```

</details>

* Kubernetes 版本 v1.20+ ，且配置文件保存在 `~/.kube/config`。
* golangci-lint 版本 v1.52.2+， 通过运行 `make lint` 可以自动安装，如果自动安装失败，你可以手动安装。

<details>
  <summary>手动安装 golangci-lint</summary>

你可以根据 [安装指南](https://golangci-lint.run/welcome/install)手动安装，或者使用以下命令：

```
cd ~/go/ && curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.52.2
```

</details>

### 构建

- 克隆项目

```shell
git clone git@github.com:KusionStack/karpor.git
```

- 本地构建

执行 `make build-all` 将会为所有平台创建可执行文件；如果你只想为特定平台构建，执行 `make build-${PlatformName}`，例如 `make build-darwin`。查看所有可用命令，执行 `make help`。

### 测试

为了保证代码质量，编写测试代码是必不可少的，你可以在项目根目录运行以下命令执行单元测试：

```shell
make test
```

如果你需要生成额外的覆盖率报告，执行：

```shell
make cover
```

接下来你可以执行下列命令，来从浏览器中阅读测试覆盖率报告：

```shell
make cover-html
```

## 创建拉取请求（Pull Request）

我们很高兴你考虑为 Karpor 项目作出贡献！

本文档将会指导你完成 [创建拉取请求](./index.md#contribute-a-pull-request) 的过程。

### 在你开始之前

我们知道你对于创建第一个 pull request 非常兴奋。在我们开始之前，请确保你的代码符合相关的 [代码规约](../2-conventions/2-code-conventions.md)。

### 你的第一个 Pull Request

在提交你的 PR 之前，运行下面的命令并确保它们都成功了：

```
make test
make lint
```

如果这是你第一次向 Github 上的开源项目贡献，请确保你已经阅读了 [创建拉取请求](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)。

为了提高你的 pull request 被接受的机会，请确保你的 pull rquest 符合以下指导规则：

- 标题和描述与实现相符。
- pull request 中的所有 commit 都符合 [格式指南](#Formatting-guidelines)。
- pull request 会关闭一个相关 issue。
- pull request 包含了必要的测试，以验证预期行为。
- 如果你的 pull request 有冲突，请将你的分支 rebase 到 main 分支。

如果 pull request 修复了一个漏洞：

- pull request 的描述中必须包含 `Closes #<issue number>` 或 `Fixes #<issue number>`。
- 为了避免回归问题，pull request 必须包含验证该漏洞被修复的测试。

## 代码审查

一旦你创建了一个 pull requset，下一步就是让其他人审查你的改动。代码审查对审查者和 pull request 作者都是很好的学习机会。

如果你觉得某个特定的人应当审查你的 pull request，你可以在描述或评论中标记他们。
通过输入 `@` 符号和其用户名来标记用户。

我们建议你阅读 [如何进行代码审查](https://google.github.io/eng-practices/review/reviewer/) 来了解更多关于代码审查的知识。

## Pull request 格式指南

精心编写的 pull request 可以最大程度地缩短你的更改被接受的时间。这些指南将帮助你为 pull requset 编写条理清晰的提交消息和说明。

### Commit 信息格式

了解更多：[Commit 规约](../2-conventions/4-commit-conventions.md)

### Pull Request 标题

在接受 pull request 时，Karpor 团队会将所有的 commit 合并为一个。

Pull request 的标题将会成为合并后的 commit 信息的描述。

我们仍然鼓励贡献者撰写详细的 commit 信息，因为它们将会作为 git commit 正文的一部分。

我们在生成发布更新日志时将会使用 pull request 的标题。因此，我们会努力使标题尽可能具有信息量。

确保你的 pull request 标题使用与 commit 信息相同的格式。如果不遵循该格式，我们将会在该 pull request 添加 `title-needs-formatting` 标签。

### 通过所有 CI 检查

在合并之前，所有的测试 CI 都应该通过：

- 覆盖率不应该下降。当前，pull request 的覆盖率应当至少为 60%。
- Karpor 使用 **CLA** 作为贡献者协议。它要求你在第一次合并 pull request 之前签署。

## 更新文档和网站

如果你的 pull request 被合并了，而且它引入了新的特性或增强，你需要更新文档并且提交 pull requset 到 [kusionstack.io](https://github.com/KusionStack/kusionstack.io) 仓库。

根据下面的文档了解如何编写文档：

- [kusionstack.io 开发者指南](https://github.com/KusionStack/kusionstack.io/blob/main/README.md)

太棒了，你已经完成了代码贡献的整个生命周期！
