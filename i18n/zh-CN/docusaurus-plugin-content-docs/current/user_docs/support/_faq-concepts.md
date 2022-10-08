---
sidebar_position: 1
---

# 概念 & 定义

## 1. Kusion

F**usion** Cloud Native on **K**ubernetes. Kusion 一词来源于 fusion（意为融合） + kubernetes，是基于云原生基础设施，通过定义云原生可编程接入层，提供包括配置语言、模型界面、自动化工具、最佳实践在内的一整套解决方案，连通云原生基础设施与业务应用，连接定义和使用基础设施的各个团队，串联应用生命周期的研发、测试、集成、发布各个阶段，服务于云原生自动化系统建设，加速云原生落地。我们平时提到 Kusion，一般是对这一整套解决方案的统称；而 Kusion 生态工具链则包含了 kcl 命令行工具、KusionCtl 命令行工具、KCL IDE 插件等贯穿 Kusion 解决方案各个部分的自动化工具。


## 2. 大写的 KCL 语言

**K**usion **C**onfiguration **L**anguage. 是由云原生工程化系统团队设计和研发的**专用于配置定义、校验的动态强类型配置语言**，重点服务于配置（configuration）& 策略（policy programing）场景，以服务云原生配置系统为设计目标，但作为一种配置语言不限于云原生领域。KCL 吸收了声明式、OOP 编程范式的理念设计，针对云原生配置场景进行了大量优化和功能增强。KCL 最初受 Python3 脚本语言启发，依托 Python 的语言生态，目前已经发展为独立的面向配置策略的语言。

## 3. 小写的 kcl 命令

[kcl](/docs/reference/cli/kcl/overview) 命令行工具。一般使用全大写字母的 KCL 代指 KCL 语言，而用全小写的 kcl 代指能将 KCL 代码编译为低层次数据输出（如 YAML, JSON 等）的 kcl 命令行工具。

## 4. KCLVM

**V**irtual **M**achine to parse and compile KCL。指开发 kcl 命令行工具的工程项目，也是 kcl 命令行工具的代码仓库名称，KCLVM 使用 Python、Rust 等多种语言混合开发。

## 5. KusionCtl

Kusion Kubernetes Client。[KusionCtl](/docs/reference/cli/kusionctl/overview) 命令行工具旨在简化用户对 K8S 的使用，内置支持对 KCL 的编译、通过登录功能原生支持 Identity 能力，支持多集群访问，提供资源状态汇总及相应的白屏展示、对用户变更模型及其关联模型的变更追踪、链路可视化、live 对比、关键资源可视化、异常定位等功能。

## 6. Konfig

**K**usion **C**onfig. Konfig 是一个 KCL 代码仓库，其中组织了蚂蚁域内各应用的基础设施配置。依据团队协同的层次，Konfig 仓库划分为"基础配置代码"和"业务配置代码"两部分，采用主干开发、分支发布的分支策略。
