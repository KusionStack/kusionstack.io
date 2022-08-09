---
sidebar_position: 2
---

# Project & Stack

为了应对规模化运维面临的配置、团队多维度爆炸的挑战，Kusion 采用业界通用的思路通过引入 Project & Stack 一层抽象来规范和简化化配置代码的管理。它们是 Kusion 抽象的项目组织结构，项目采用 Project 概念抽象，其中对应多个 Stack 为可以独立部署、单独配置的最小 KCL 程序单元。二者关系如下图：

![](/img/docs/user_docs/concepts/project-stack.png)

其中的 Base 比较特殊，对应 Project 中通用的基线配置，用于不同的 Stack 共享（并非独立部署单元）。

## 1. Project

任何一个直接包含 project.yaml 的文件夹被称为一个 Project，project.yaml 用于说明该 project 的元数据信息。一个 Project 由一个或多个互相关联的 Stack 组成。Project 往往具有明确的业务语意，用户可以把一个应用映射成一个 Project，也可以把一种运维场景映射为一个 Project，比如建站运维等。一个 Project 必然属于一个租户。

## 2. Stack

Stack 是一组可以独立部署、单独配置的 KCL 程序，是可以部署为一组基础设施实体的最小配置单元。一个 Stack 的所有专用配置文件需要位于同一文件夹内，该文件夹需要位于其所属 Project 的路径下，并且直接包含 stack.yaml。stack.yaml 用于说明该 Stack 的元数据信息，并且可以作为识别一个 Stack 的标识。Stack 往往表示 CI/CD 流程中的不同阶段，如 dev、gray、prod 等，或者表示一个大项目中不同的小项目。Kusion 提供 Stack 级别的权限控制。

## 3. Project 和 Stack 的关系

一个 Project 包含一个或多个 Stack，而一个 Stack 必须属于一个 Project 并且只能属于一个 Project。用户可以根据自身需求解释 Project 和 Stack 的含义，灵活地组织两者之间的结构和关系。在跨团队协作、云原生的场景下，我们提供了如下 3 种 Project 和 Stack 关系组织的最佳实践：

1. Enviroment 模式：Project 以一个整体存在，Stack 表示 Project 的不同环境，比如 dev、pre 和 prod 等，这些环境通常与 CI/CD 流程中的不同阶段相对应。Stack 具有 Project 需要的全部配置，只是对应部署的环境不同。
2. Micro-Project 模式：与微服务类似，Project 由多个较小的 Project 组成，比如一个 Project 需要的基础设施可能包括 Kubernetes 对象、数据库实体、监控实体等，这些基础设施实体均可作为一个较小的 Project 进行单独配置。我们将这些的较小的 Project 称为 Micro-Project，并通过 Stack 进行表示。Stack 仅具有 Project 需要的部分配置。
3. Hybrid 模式：Hybrid 模式是 Enviroment 模式与 Micro-Project 模式的组合，Stack 不仅可以表示 Project 部署的不同环境，也可以表示 Micro-Project。一般而言，具有 Micro-Project 特性的 Stack 可以和某个具有 Enviroment 特性的 Stack 共同提供 Project 在该环境下的全部配置。具有 Micro-Project 特性的 Stack 往往需要在 Project 的不同环境间进行复用。具有 Enviroment 特性的 Stack 可能也不包含 Project 的需要全部配置。

**Tip：** 在 Hybrid 模式中，具有 Micro-Project 特性的 Stack 和 base 文件夹均可提供不同环境中的通用能力，两者存在如下两点不同。1、具有 Micro-Project 特性的 Stack 可以进行编译、部署成一个基础设施实体，而 base 无法和一个基础设施实体进行对应；2、具有 Micro-Project 特性的 Stack 表示一个较小 Project 的配置，而 base 表示多个环境和 Micro-Project 的通用配置。总的来说，只需记住具有 Micro-Project 特性的 Stack 仍是一个 Stack，具备 Stack 的特性；而 base 文件夹只是通用 KCL 程序的集合，并不具备 Stack 的特性。

## 4. Project 和 Stack 的工程结构

用户可以灵活地组织 Project 和 Stack 的工程结构，只需遵循如下 2 个规则：

1. Stack 目录必须位于 Project 目录下，但不要求 Stack 目录是 Project 目录的下一层；
2. Project 之间和 Stack 之间不可嵌套，即不允许一个 Project 目录下有另一个 Project 目录，一个 Stack 目录下有另一个 Stack 目录。

我们推荐用户把 Project 和 Stack 名称作为对应的文件夹名称，但这不是必须的。用户可以根据自身需求对 Project 和 Stack 进行分类，组织对应的目录结构。一种常见的目录结构遵循 [康威定律](https://zh.wikipedia.org/wiki/%E5%BA%B7%E5%A8%81%E5%AE%9A%E5%BE%8B)：`Project_Type/Orgnization_Name/Project_Name/Stack_Name` 项目的类型、组织结构的类型和代码保存相似的映射关系。

## 5. 例子：Nginx

以 Konfig 中自带的 [appops/nginx-example](https://github.com/KusionStack/konfig/tree/master/appops/nginx-example) 为例，下面是对应的目录和文件结构：

```bash
appops/nginx-example
├── README.md       # Project 介绍文件
├── base            # 各环境通用配置
│   └── base.k      # 通用 KCL 配置
├── dev             # 环境特有配置
│   ├── ci-test     # 测试目录
│   │   ├── settings.yaml       # 测试数据
│   │   └── stdout.golden.yaml  # 测试期望结果
│   ├── kcl.yaml    # 多文件编译配置，是 KCL 编译的入口
│   ├── main.k      # 当前环境 KCL 配置
│   └── stack.yaml  # Stack 配置文件
└── project.yaml    # Project 配置文件
```

根目录中有 `project.yaml` 文件表示对应一个 Project，然后 `dev/stack.yaml` 表示对应 Stack，base 目录对应基线配置（不是一个 Stack）。`dev/ci-test` 是测试相关配置和数据，`kcl.yaml` 和 `main.k` 是应用的 KCL 配置程序代码。

