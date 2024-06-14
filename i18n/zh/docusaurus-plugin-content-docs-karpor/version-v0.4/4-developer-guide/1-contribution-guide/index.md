# 贡献指南

贡献指南介绍了如何参与社区发展和向社区贡献。

为了帮助我们为所有人建立安全和积极的社区体验，我们要求所有的参与者遵守 CNCF 社区 [行为准则](https://github.com/cncf/foundation/blob/main/code-of-conduct-languages/zh.md)。

## 开始贡献之前

### 找到一个贡献点

有多种方式对 Karpor 贡献，包括代码和非代码贡献，我们对任何人对社区的任何方式的努力都非常感谢。

这里是一些示例：

* 贡献代码仓库和文档。
* 报告和分类 issue。
* 在你的地区组织会议和用户群组。
* 回答 Karpor 相关问题帮助别人。

并且：

- 如果你不知道如何开始，我们准备了一份 [新手任务清单 | Community tasks 🎖︎](https://github.com/KusionStack/karpor/issues/463)，或者你可以通过 issue 跟踪器过滤 [help wanted | 需要帮助](https://github.com/KusionStack/karpor/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) 或 [good first issue | 新手任务](https://github.com/KusionStack/karpor/issues?q=is%3Aopen+is%3Aissue++label%3A%22good+first+issue%22) 标签. 你可以从任何感兴趣的 issue 开始。
- 如果你有任何问题，欢迎 [提交 Issue](https://github.com/KusionStack/karpor/issues/new/choose) 或者 [发帖讨论](https://github.com/KusionStack/karpor/discussions/new/choose)，我们会尽快回答。

### 如何进行非代码贡献

我们认为对社区存续和未来发展而言，非代码贡献和代码贡献同样重要。

- 参考 [非代码贡献指南](./non-code-contribute) 获取更多细节

### 如何进行代码贡献

不确定从哪里开始向 Karpor 代码库贡献？可以从浏览带有 `good first issue` 或 `help wanted` 标签的 issue 开始。

- [Good first issue | 新手任务](https://github.com/KusionStack/karpor/labels/good%20first%20issue) 通常很容易解决的任务。
- [Help wantet | 需要帮助](https://github.com/KusionStack/karpor/labels/help%20wanted) 和复杂程度无关， 我们希望能够在社区解决的问题。
- 参考 [代码贡献指南](./code-contribute) 获取更多细节。

学习 [代码规约](../conventions/code-conventions) 和 [测试规约](../conventions/test-conventions)，并了解在写代码时要注意的地方。

然后阅读 [发布流程与节奏指南](../conventions/release-process)，了解你的代码什么时候会发布。

## 贡献一个拉取请求（Pull Request）

在打开或者认领 issue 之后，你可以通过提交一个拉取请求（Pull Request）为 karpor 进行代码或非代码贡献。这里是你应该遵循的一些步骤：

### Fork 仓库

Karpor 遵循主干开发模式，也就是说，用于发布的代码维护在 main 分支。

那么，为了开发 Karpor，你需要从 [karpor](https://github.com/KusionStack/karpor) Fork 一个项目到你自己的工作空间，然后检出一个新的分支用于开发代码。

### 开发代码和非代码

现在你可以开始解决 issue 。为了维护 Karpor 的代码质量，提交 PR 之后，一些必要的检查会被触发。

开发结束之后，你需要 commit 代码然后将代码 push 到你 fork 出的仓库。由于 PR 的标题将作为 commit message，你的 PR 标题需要符合 [commit 规约](../2-conventions/4-commit-conventions.md)。

以下是一些简单的解释：

PR 的标题需要按照以下结构组织：

```
<类型>[可选 范围]: <主题>

[可选 正文]
```

要求中的类型可以帮助更好地确认这次提交的范围，基于 [Angular 指南](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)。

我们使用小写的 `<类型>`，以避免在大小写敏感的问题上浪费时间。`<类型>` 可以是以下之一：

```
feat: 新特性
fix: 漏洞修复
docs: 仅文档改动
build: 关于构建系统和外部依赖的改动
style: 不影响代码含义的改动（如空行、格式、缺少分号等）
refactor: 不属于漏洞修复或者增加特性的代码改动
perf: 提升性能的代码改动
test: 增加缺少的测试用例或者修正现有的测试用例
chore: 构建过程或辅助工具和库（如文档生成）的修改
```

### 打开一个拉取请求（Pull Request）

[打开一个拉取请求（Pull Request）](https://github.com/KusionStack/karpor/pulls)：打开一个从你 fork 的仓库的开发分支到 karpor main 分支的拉取请求（Pull Request）。你需要清楚地描述你的 PR 做了什么，并且链接到一个 issue。除此之外，PR 的标题应该按照前面提到的 commit 规约，并且长度在 5-256 个字符之间，不允许使用 `WIP` 和 `[WIP]` 前缀。

### 签署贡献者许可协议（Contributor License Agreement，CLA）

如果这是你的第一个 PR ，你需要签署我们的 [CLA（贡献者许可协议）](https://github.com/KusionStack/.github/blob/main/CLA.md)。 你唯一需要做的事情的是在当前 PR 按以下格式发表评论：

`I have read the CLA Document and I hereby sign the CLA`

如果你的 CLA 签署失败了，可能有以下原因：

* 评论的格式必须与上面完全一致，例如不能有额外的空格、空行等。
* git commit 的作者和 Karpor PR 的作者必须一致。

### PR 检查

为了维持 karpor 项目的可靠性，以下检查将会自动触发：

* 单元测试
* Golang 代码风格检查
* Commit 风格检查
* PR 标题检查
* 代码许可证检查
* Markdown 格式检查

请确保你的 PR 通过这些检查。

## 成为社区成员

如果你对成为社区成员感兴趣或者想了解更多关于治理的内容，请查看 [角色](./3-roles.md) 获取更多细节。

在 Karpor 的世界中享受编码和协作吧！
