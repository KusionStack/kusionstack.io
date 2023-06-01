---
sidebar_position: 1
---

# 通过 GitHub Actions 保证 Konfig 配置代码质量

在多人协作的场景下，Konfig 大库中的应用配置代码往往由来自不同团队的 Developer 和 Platform 共同完成，配置代码的正确性需要通过可靠的机制保证。[GitHub Actions](https://docs.github.com/en/actions) 作为一种 CI/CD 的平台，可以自动执行构建、测试、部署等流水线。通过自定义 [GitHub Actions 工作流](https://docs.github.com/en/actions/using-workflows/about-workflows)，您可以保证 Konfig 大库中用于生产的配置代码的正确性与可靠性。

KusionStack提供了多种工具与Github Actions集成，本教程对集成的方法进行介绍。

## 创建您的 Konfig 大库

KusionStack 提供了官方的应用配置代码仓库—— [KusionStack/konfig](https://github.com/KusionStack/konfig)，主要包括：

- **基础模型**，如 [Server](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/server.k)，位于 `/base` 目录下；
- **示例的应用配置代码**，如 [Wordpress](https://github.com/KusionStack/konfig/tree/main/appops/wordpress)、[Guestbook](https://github.com/KusionStack/konfig/tree/main/appops/guestbook)，位于 `/appops` 目录下；
- **配置代码管理工具**，如[工程结构校验](https://github.com/KusionStack/konfig/blob/main/hack/verify-project-structure.py)、[代码正确性测试](https://github.com/KusionStack/konfig/blob/main/hack/test_konfig.py)、[lint 风格检查](https://github.com/KusionStack/konfig/blob/main/hack/lint_check.py)，位于 `/hack` 目录下。

Fork KusionStack/konfig，创建您的 Konfig 大库，维护您自己的应用配置代码。

:::info
基础模型与管理工具的增强，KusionStack/konfig 期待您的[贡献](https://github.com/KusionStack/konfig#contribution-guidelines)。
:::

## 创建您的 GitHub Actions 工作流

KusionStack/konfig 提供了 GitHub Actions 工作流 [main.yml](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml)，触发条件是 main 分支上的 push 或 pull request 请求。main.yml 包括多个 job，保证了 main 分支上配置代码的可靠性。
接下来，本教程将对这些 Github Actions job 的含义和功能进行介绍，并结合[增加应用 Wordpress 环境变量](https://github.com/KusionStack/konfig/pull/113)这一示例（后简称为“示例”），进行说明。

![wordpress-workflow](/img/docs/user_docs/guides/github-actions/wordpress-workflow.png)

### 变更影响面分析

Konfig 大库中维护着两种类型的代码，分别为**应用配置**和**基础模型**。若修改前者代码，那么只会影响对应的应用；若修改后者代码，那么会影响所有依赖这些代码的应用。若您希望保证每次变更后所有应用配置的正确性，首先需要获得这次变更影响的所有应用，然后再对变更的应用进行正确性校验。
[diff](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L10) 和 [deps](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L20) 两个 job 完美地完成了变更影响面分析。主要执行逻辑如下：

- 通过 `git diff` 命令获取此次变更的文件列表；
- 基于变更的文件列表，通过 `kusion deps` 命令获取变更文件影响的 project 和 stack 列表。

[示例](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234827063?pr=113)变更了 `/appops/wordpress/dev/main.k` 文件，影响的 project 和 stack 分别为 `appops/wordpress` 和 `appops/wordpress/dev`，结果符合我们的预期。

![deps](/img/docs/user_docs/guides/github-actions/deps.png)

### 工程结构校验

Konfig 大库应当遵循[正确的工程结构](https://github.com/KusionStack/konfig#directory-structure), job [structure-check](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L121) 对变更应用的工程结构进行合法性检查，检查项如下：

- project 目录下必须有 `project.yaml` 和 `OWNERS` 文件；
- stack 目录下必须有 `stack.yaml`、`main.k`、`ci-test/settings.yaml` 和 `ci-test/stdout.golden.yaml` 文件；
- project.yaml 中 `name` 字段必填；
- stack.yaml 中 `name` 字段必填且必须与目录名保持一致。

工程结构校验的成功意味着目录结构的正确性，structure-check 会生成 [pytest](https://docs.pytest.org/en/7.3.x/) 测试报告 `structure-check-report`，您可以从 [Artifacts](https://docs.github.com/en/actions/managing-workflow-runs/downloading-workflow-artifacts) 界面获取到它。
[示例](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234834632)通过了工程结构校验。可以从测试报告中清晰地看出，它对此次变更的应用 `appops/wordpress` 进行了检查，检查结果为通过。

![structure-check](/img/docs/user_docs/guides/github-actions/structure-check.png)

### 代码正确性测试

除了需要遵循合法的工程结构，配置代码的变更还必须有正确的语法和语义，并且符合 Developer 或 Platform 的预期。stack 路径下的 `ci-test` 目录保证了配置代码的正确性，工作流程如下：

- Developer 或 Platform 在本地完成配置代码开发，执行 `make check-${changedProject}` 或 `make check-all`（即，对变更的 stack 执行 `kusion compile` 命令），更 `ci-test/stdout.golden.yaml` 文件。Developer 和 Platform 需要确认 `ci-test/stdout.golden.yaml` 中的变更符合预期，保证配置的正确性；
- push 或 pull request 触发工作流，main.yml 中的 [test](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L144) 对所有变更的 stack 执行 `kusion compile` 命令，生成新的编译结果，并与 `ci-test/stdout.golden.yaml` 进行对比。若对比结果一致，则说明配置代码的变更符合预期，确定其正确性；若失败或对比结果不一致，则说明语法错误或者不符合 Developer 或 Platform 的预期，正确性检测失败。

test 会生成测试报告 `test-report`，您可以从 Artifacts 界面获取。

[示例](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234834490)通过了代码正确性测试。测试报告中给出了测试的 stack 列表 `appops/wordpress/dev`，以及对应的结果 Passed.

![test](/img/docs/user_docs/guides/github-actions/test.png)

### Lint 风格检查

为保证 Konfig 大库的易维护性与可拓展性，main.yml 提供了 job [lint](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L89)，对于变更的应用配置进行 lint 风格检查。job lint 基于 [kcl lint](https://kusionstack.io/docs/reference/cli/kcl/lint/) 指令搭建，会进行 import 合规性等进行检查。

与上面的 job 类似，job lint 也会生成测试报告 `link-report`.

[示例](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234834286)通过了 lint 风格检查，报告内容如下。

![lint](/img/docs/user_docs/guides/github-actions/lint.png)

## 总结
本教程演示了 Konfig 大库如何与 GitHub Actions 进行集成，在多人协作的场景下，进行大库质量的保证，使您可以高效、可靠地进行应用配置的管理。
