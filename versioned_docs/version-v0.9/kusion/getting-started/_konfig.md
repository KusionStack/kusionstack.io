---
sidebar_position: 9
---

# Kusion 模型库

**Kusion 模型库**也叫做 `Kusion Model`，是 KusionStack 中预置的、用 KCL 描述的配置模型，它提供给用户开箱即用、高度抽象的配置接口，模型库最初朴素的出发点就是改善 YAML 用户的效率和体验，我们希望通过将代码更繁杂的模型抽象封装到统一的模型中，从而简化用户侧配置代码的编写。

Konfig 仓库地址：https://github.com/KusionStack/konfig

![](/img/docs/user_docs/getting-started/konfig-arch-01.png)

## 1. 目录结构

先克隆 Kusion 模型库：`git clone git@github.com:KusionStack/Konfig.git`。

Konfig 配置大库整体结构如下：

```bash
.
├── Makefile            # 通过 Makefile 封装常用命令
├── README.md           # 配置大库说明
├── appops              # 应用运维目录，用来放置所有应用的 KCL 运维配置
│   ├── clickhouse-operator
│   ├── code-city
│   ├── guestbook
│   ├── http-echo
│   └── nginx-example
├── base                # Kusion Model 模型库
│   ├── examples        # Kusion Model 样例代码
│   │   ├── monitoring  # 监控配置样例
│   │   ├── native      # Kubernetes 资源配置样例
│   │   └── server      # 云原生应用运维配置模型样例
│   └── pkg
│       ├── kusion_kubernetes   # Kubernetes 底层模型库
│       ├── kusion_models       # 核心模型库
│       └── kusion_prometheus   # Prometheus 底层模型库
├── hack                # 放置一些脚本
└── kcl.mod             # 大库配置文件，通常用来标识大库根目录位置以及大库所需依赖
```

## 2. 测试 Konfig 代码

在安装完成 Kusion 工具之后，在 Konfig 根目录执行 `make check-all` 测试大库全部应用（参考 [Konfig](/docs/user_docs/concepts/konfig)），或者执行 `make check-http-echo` 测试 `appops/http-echo` 应用。

如果需要单独测试 `appops/http-echo` 应用的 dev 版本，可以进入 `appops/http-echo/dev` 目录执行 `kusion compile` 命令（或者通过更底层的 `kcl -Y kcl.yaml ./ci-test/settings.yaml` 命令），输出的文件在 `appops/http-echo/dev/ci-test/stdout.golden.yaml` 文件。

## 3. 添加应用

在 [快速开始/Usecases](/docs/user_docs/getting-started/deliver-wordpress.md) 我们已经展示如何快速添加一个应用（参考 [Konfig](/docs/user_docs/concepts/konfig)）。

## 4. Konfig 架构图

之所以用一个大的仓库管理全部的 IaC 配置代码，是由于不同代码包的研发主体不同，会引发出包管理和版本管理的问题，从而导致平台侧需要支持类似编译平台的能力。采用大库模式下，业务配置代码、基础配置代码在一个大库中，因此代码间的版本依赖管理比较简单，平台侧处理也比较简单，定位唯一代码库的目录及文件即可，代码互通，统一管理，便于查找、修改、维护（大库模式也是 Google 等头部互联网公司内部实践的模式）。

下面是 Konfig 的架构图：

![](/img/docs/user_docs/getting-started/konfig-arch-01.png)

核心模型内部通过前端模型和后端模型两层抽象简化前端用户的配置代码，底层模型则是通过 KCL OpenAPI 工具自动生成。

模型的更详细文档可参考 [参考手册/Kusion 模型库](/docs/user_docs/reference/model)。
