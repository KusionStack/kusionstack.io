---
sidebar_position: 1
---

# Repo Struct

## 1. 主要仓库

Kusion 的顶级仓库包含 Kusion 主仓库、Konfig 模型仓库、文档仓库等、IDE 扩展仓库、KCLVM 相关仓库等，关系如下图：

![](/img/docs/develop/repos/repo-dag-01.png)

- Kusion 主库：https://github.com/KusionStack/kusion
- Kusion 网站仓库：https://github.com/KusionStack/kusionstack.io
- Kusion 模型库：https://github.com/KusionStack/konfig
- KCLVM 主库：https://github.com/KusionStack/KCLVM
- IDE 扩展仓库：https://github.com/KusionStack/vscode-kcl

## 2. 文档仓库


文档相关的仓库关系如下：

![](/img/docs/develop/repos/repo-dag-docs.png)

文档主要包含网址的文档、相关的案例代码文档、语言规范文档和 Kusion 模型库自带的文档等。

- 文档主仓库：https://github.com/KusionStack/kusionstack.io
- 电子书：https://github.com/KusionStack/kusion-in-action-book

## 3. KCLVM 仓库

其中 KCLVM 相关仓库是 KCL 配置语言、规范、工具等实现的仓库，其展开的子仓库关系如下：

![](/img/docs/develop/repos/repo-dag-02.png)

最上面提供 KCLVM 实现的多语言绑定接口，目前主要提供 Go、Python 等绑定，后续计划提供 Java、NodeJS 等更多的语言绑定。中间部分是 KCL 语言的实现和语言规范部分。此外、还有 KCL 语言的插件和配套的 IDE 插件等。

- KCLVM 主库：https://github.com/KusionStack/KCLVM
- kclvm-go：https://github.com/KusionStack/kclvm-go
- KCL 插件：https://github.com/KusionStack/kcl-plugin
