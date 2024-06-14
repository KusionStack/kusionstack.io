---
title: Commit 规约
---
## Commit 信息结构

Karpor 遵循 [规范化 commit](https://www.conventionalcommits.org/en/v1.0.0/)。

Commit 信息应当组织为以下结构：

```
<类型>[可选 范围]: <主题>

[可选 正文]
```

## 示例

带范围的 Commit 信息：

```
feat(lang): add polish language
```

不带正文的 Commit 信息：

```
docs: correct spelling of CHANGELOG
```

带多个正文段落的 Commit 信息：

```
fix: correct minor typos in code

see the issue for details

on typos fixed.

reviewed-by: Z
refs #133
```

## `<类型>`(必须)

必须填写的类型有助于更容易确定这次提交的范围，基于 [Angular 指南](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)。

我们在 `<类型>` 使用小写，以避免花费时间在大小写敏感问题上。`<类型>` 可以是以下之一：

- **feat**：新特性
- **fix**：漏洞修复
- **docs**：仅文档改动
- **build**：关于构建系统和外部依赖的改动
- **style**：不影响代码含义的改动（如空行、格式、缺少分号等）
- **refactor**：不属于漏洞修复或者增加特性的代码改动
- **perf**：提升性能的代码改动
- **test**： 增加缺少的测试用例或者修正现有的测试用例
- **chore**： 构建过程或辅助工具和库（如文档生成）的修改

## `<范围>`(可选)

范围是可选的，可以包含在括号中为类型提供更多的上下文信息。可以指定这次 commit 的任何内容。Github issue 也是有效的范围，例如 `fix(ui)`、`feat(api)`、`fix(#233)` 等。

当改动影响多个范围时，可以使用 `*`。

## `<主题>`(必须)

主题必须紧跟在类型/范围前缀后面的冒号和空格。它是代码更改的简明摘要，例如 `fix: array parsing issue when multiple spaces were contained in string`，而不是 `fix: bug`。

## `<正文>`(可选)

在简短的主题后可以添加较长的正文，提供有关代码更改的更多上下文信息。正文必须位于描述之后一行。
