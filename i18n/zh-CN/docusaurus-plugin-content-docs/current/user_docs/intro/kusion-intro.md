# KusionStack 简介

## KusionStack 是什么？

**KusionStack 是开源的云原生可编程技术栈！**

KusionStack 是一个开源的、以应用为中心的可编程交付及运维技术栈，灵感源于融合（Fusion）一词，旨在帮助平台和应用程序开发人员以自助、快速、可靠和协作的方式进行研发和交付。

简单来说，KusionStack 旨在帮助研发者：

1. **编码**和**统一**现代应用程序交付过程中的应用配置、部署拓扑、工作流、策略
2. **组织**应用程序资源，并在整个交付过程中通过**身份**确保安全
3. 为**Kubernetes**、**云**和**自定义基础设施**精简应用交付工作流，并提供开发友好的体验

基于 **Platform as Code （平台服务即代码）**理念，研发者可以用统一的组织和操作界面定义应用交付生命周期，充分利用Kubernetes和云的混合能力，通过**端到端的交付工作流程**，真正实现**集中定义、随处交付**。

![](https://raw.githubusercontent.com/KusionStack/kusion/main/docs/workflow.png)

## KusionStack 可以做什么？

可以从两个视角来说明 KusionStack 的价值。

作为一款开箱即用的产品，KusionStack 可以帮助您：

+ 使用 Kubernetes 和云资源之上的以应用为中心的模型**配置**您的应用程序
+ 使用开发友好的工具和 IDE 产品将您的应用程序**交付**到 Kubernetes 和云上

作为一个工程技术栈，KusionStack 有助于：

+ 通过多角色**协作**并**构建**应用程序的抽象模型
+ 使用跨 **Kubernetes**和**云**的混合资源**编排**您的自动化工作流程
+ **集成**到您的本地或公共系统中

![](/img/docs/user_docs/intro/kusion-stack-1.png)

## KusionStack 特点

### 以应用为中心

应用是 KusionStack 的一等公民。KusionStack 提供了一个基于最佳实践的开箱即用的应用交付模型，并支持定制应用模型。KusionStack 通过简单的应用模型定义以及足够的自动化支持，帮助研发者快速稳定地进行应用交付。

### 灵活

基于持续丰富的模型生态，强大的引擎和丰富的可扩展机制，KusionStack 为承担运维工作的研发者提供了完整的灵活性。通过标准的 Project 和 Stack 结构，KusionStack 可以满足个人研发者、小型团队和大型团队的需求，并具有良好的可扩展性和可管理性。纯客户端的解决方案也确保了良好的可移植性，同时 KusionStack 具备丰富的 API 使其更容易集成和自动化。

### 可协作

除了具备代码化解决方案的一般优点外，KusionStack 希望通过平台团队和应用团队的协作来定义应用模型。通过责任分离，不同的角色可以基于他们的知识和责任专注于他们的工作。通过这种分工，平台团队可以更好地管理平台的差异和复杂性，应用程序研发者可以在较少的认知负荷下参与运维工作。

## KusionStack 组成

KusionStack 由一系列工具和产品组成。其中，Kusion 提供了强大的引擎和编排功能，Konfig 拥有应用程序交付模型和组件。您可以选择使用其中一种，也可以将它们组合使用。

+ [Kusion](https://github.com/KusionStack/kusion)：运维引擎、工具链、服务层，IDE 工作空间及社区技术集成套件
+ [catalog](https://github.com/KusionStack/catalog)：Kusion 基础模型及配套的 Generator 仓库

## KusionStack vs. X

![](/img/docs/user_docs/intro/kusion-vs-x.png)

### vs. Terraform

Terraform 是一种广泛应用在云资源交付场景的可编程运维产品，它帮助用户通过可编程资源块、状态管理和 API Providers 轻松访问不同的云 API。Terraform 以其特有的 API 接入机制降低了云厂商参差的命令式 API 的使用难度，结合简洁的工作流程，提供良好的声明式运维体验。

相比之下，KusionStack 试图帮助研发者使用抽象的应用程序交付模型，并使不同角色更容易协作构建和管理抽象。KusionStack 原生支持企业级需求的可扩展性、自动化和高性能。KusionStack 以 Kubernetes 优先的方式工作，并利用 Terraform 来管理非Kubernetes 资源。

### vs. CD 系统（如 KubeVela， ArgoCD）

CD 系统通常以某种定义方式为源头，通过 Pull，Push 或两者结合的方式完成自动化的集群部署交付和配置漂移调和。Kusion 引擎可以视为一种在 push 模式下工作的 CD 引擎。如果您已采纳了 CD 系统，KusionStack 可以与其配合使用，如通过 ArgoCD 调和生效 Kusion 模型，或者编写 OAM 模型并与 KubeVela 配合使用等。

### vs. Helm

Helm 理念源于操作系统的包管理机制，是一种基于模板化 YAML 的包管理机制，并支持对包内资源的生效和管理。KusionStack 提供了具有键值对建模的 Helm 能力的超集，因此研发者可以直接使用 KusionStack 作为可编程的替代方案，以避免编写文本模板的痛苦。对于已采纳 Helm 的用户，可以将 KusionStack 中 Stack 编译结果以 Helm 格式打包后使用。

### vs. App PaaS

相比于应用交付平台或产品，KusionStack 是一种客户端的可编程运维技术栈，不是完整的应用 PaaS。KusionStack 可以作为应用 PaaS 的一部分使用，也可以作为构建您的应用 PaaS 作为平台工程解决方案的基础。

## 开发状态

KusionStack 处于开源早期。我们将继续专注于提供更好、更可用的**应用程序交付模型**，支持**多集群**和更多的**云**，并原生提供**身份**和**资源**管理机制。

你可以在这里看到 [Kusion](https://github.com/KusionStack/kusion/releases) 的发布版本，也可以通过 [社区](https://github.com/KusionStack/community) 加入我们。

## 下一步

+ [安装指南](/docs/user_docs/getting-started/install)
+ 了解[核心概念](/docs/user_docs/concepts/glossary)和[技术架构](/docs/user_docs/concepts/arch)
