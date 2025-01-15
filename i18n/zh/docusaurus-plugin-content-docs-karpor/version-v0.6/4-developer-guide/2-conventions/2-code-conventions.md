---
title: 代码规约
---
在这部分，你将会了解 Karpor 项目中所有类型的代码规约。不必一次把这些规则全部了解，确保你在编写代码前阅读对应的部分就可以了。

- [Go 代码规约](#go-%E4%BB%A3%E7%A0%81%E8%A7%84%E7%BA%A6)
- [Bash 或脚本规约](#bash-%E6%88%96%E8%84%9A%E6%9C%AC%E8%A7%84%E7%BA%A6)
- [目录和文件规约](#%E7%9B%AE%E5%BD%95%E5%92%8C%E6%96%87%E4%BB%B6%E8%A7%84%E7%BA%A6)
- [Linting 和格式化](#linting-%E5%92%8C%E6%A0%BC%E5%BC%8F%E5%8C%96)

## Go 代码规约

- [Go 代码评审评论](https://go.dev/wiki/CodeReviewComments)
- [高效的 Go](https://golang.org/doc/effective_go.html)
- 了解并且避免 [Go 地雷](https://gist.github.com/lavalamp/4bd23295a9f32706a48f)
- 为你的代码编写注释.

  - [Go's 注释规约](https://go.dev/blog/godoc)
  - 如果代码评阅者询问你代码为什么要这么实现，这可能说明你应当为你的代码编写注释。
- 命令行标志应该用双连接号 `--`，而不是下划线
- 接口

  - 根据 RFC3986，URL 是大小写敏感的。Karpor 使用“短横线命名（`kebab-case`）”作为 URL。
    - 例如：`POST /rest-api/v1/resource-group-rule`
- 命名

  - 为接口选择名称时请考虑包名称，避免冗余。

    - 例如： `storage.Interface` 优于 `storage.StorageInterface`。
  - 不要在包名称中使用大写字符、下划线和破折号。
  - 选择包名称时，请考虑父目录名称。

    - 所有 `pkg/manager/cluster/foo.go` 应该命名为 `package cluster`
      而不是 `package clustermanager`。
    - 除非有充分理由，`package foo` 行应该与 .go 文件所在目录的名称相同。
    - 为了避免歧义，导入包时可以指定别名。
  - 锁应该被称为 `lock`，并且永远不应该被嵌入（总是以 `lock sync.Mutex` 的形式明确声明）。当存在多个锁时，应该遵循 Go 的命名约定给每个锁一个 buts 的名称 - `stateLock`，`mapLock` 等。

## Bash 或脚本规约

- [Shell 样式指南](https://google.github.io/styleguide/shell.xml)
- 确保构建、发布、测试和集群管理脚本可以在 macOS 上运行

## 目录和文件规约

- 避免软件包无序扩展。为新的包找到合适的子目录。

  - 没有更合适放置位置的新包应该放在 `pkg/util` 下的子目录。
- 避免使用通用包。使用名为 `util` 的包让人疑惑。相反地，应当根据你期望的功能推导出包名
  例如，处理等待操作的使用功能位于 `wait` 包中，包括类似 Poll 这样的功能，所以完整名称是 `wait.Poll`
- 所有的文件名都应该是小写
- Go 源码文件名和目录名中使用 `_`，而不是 `-`

  - 包目录名通常应当尽量避免使用分隔符（当包目录名含多个单词时，它们通常应该被放在嵌套的子目录）
- 文档的文件名和目录名中应该使用 `-`，而不是 `_`
- 用于说明系统特性的示例应该位于 `/docs/user-guide` 或 `/docs/admin`， 取决于它是主要面向部署应用的用户还是集群管理员。实际的应用示例应位于 `/example` 中

  - 示例还应该展示 [配置和使用系统的最佳实践](https://kubernetes.io/docs/concepts/configuration/overview/)
- 第三方代码

  - 普通的第三方依赖 Go 代码 由 [go modules](https://github.com/golang/go/wiki/Modules) 管理
  - 其他的第三方代码应该放在 `/third_party` 目录下

    - fork 的第三方 Go 代码放在 `/third_party/forked` 目录下
    - fork 的_golang stdlib_ 代码放在 `/third_party/forked/golang` 目录下
  - 第三方代码必须包含许可证
  - 这也包括修改过的第三方代码和引用

## Linting 和格式化

为了确保 Go 代码库之间的一致性，我们要求所有代码通过多个 linter 检查。

要运行所有的 linter，请使用 `lint` 作为 Makefile 目标：

```shell
make lint
```

该命令将清理代码并进行一些 lint 检查。检查结束后请记得检查所有变更。
