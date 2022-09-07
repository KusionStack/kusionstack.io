# KusionStack 简介

## KusionStack 是什么？

**KusionStack 是开源的云原生可编程技术栈！**

KusionStack 是一个可编程、高灵活性的一站式应用交付及运维技术栈，灵感源于融合（Fusion）一词，旨在帮助企业构建的应用运维配置管理平面及 DevOps 生态。

1. 融合**专有云**，**混合云**，**多云**的混合场景
2. 融合以**云原生技术**为主，同时采用**多种平台技术**的混合平台技术选型
3. 融合**多项目**、**多团队**、**多角色**、**多租户**、**多环境**的企业级诉求

基于 Platform as Code （平台服务即代码）理念，研发者可以快速收敛围绕**应用运维生命周期**的全量配置结构、定义、约束和策略，面向**混合技术体系和云环境**，完成从应用运维研发到上线的**端到端工作流程**，真正做到**一处编写，随处交付**。

![](/img/docs/user_docs/intro/kusion-stack-0.png)

KusionStack 源于蚂蚁集团内部的规模化工程化运维实践，已广泛应用在蚂蚁 SaaS 应用多云交付运维，计算及数据基础设施交付，建站运维，数据库运维等多个业务领域，助力蚂蚁完成从传统运维管理模式到协同开放的可编程 DevOps 运维模式的转型。


## 为什么使用 KusionStack？

以 Kubernetes 为代表的云原生技术正成为现代企业及云厂商的一方技术，已形成面向全球的社区生态。Kubernetes API 支持面向终态、数据化（as Data）的定义方式，声明式、版本化、面向资源的可扩展 API，可终止、可预测的服务端模拟验证机制，这些优秀的设计使其天然具有一致的接入方式，完善的资源定义和扩展方式，以及客户端友好的验证、执行机制，原生具备了传统三方 API 接入层技术产品的典型能力。但从另一个角度看，现代应用也将同时长期依赖未云原生化的 PaaS、IaaS 层服务，这使得企业内应用交付运维依赖分散变化的技术和平台，复杂割裂的工作界面和流程。此外，Kubernetes 是一种用于构建平台的平台技术，面向大量的非专家型应用研发者，Kubernetes 自身的技术复杂性和大量面向资源的使用界面制约了在企业内部以开放、民主方式建设更为广泛的 DevOps 生态。最后，平台侧缺少有效手段让持续增长的平台能力简单、一致、可控地开放给应用研发者，通过面向业务的高抽象度降低研发者参与运维工作的认知负担，使其自助完成业务交付运维的研发及操作。

在蚂蚁我们经历了以上这些问题，我们构建了基于[裸金属](https://en.wikipedia.org/wiki/Bare-metal_server)的超大规模 Kubernetes 集群，基于 [MOSN](https://github.com/mosn/mosn) sidecar 的规模化 mesh 体系，同时也大量依赖中间件等 PaaS 服务及部分 IaaS 云服务。在运维侧，我们做了很多尝试来适应规模、复杂性和快速变化，如加入云原生元素改良经典运维平台，如采纳 Kubernetes 社区原生的 YAML-based DevOps 运维方案，但都无法满足内部以应用为中心的高效率、低感知，并兼顾开放性、灵活、可扩展、可移植的规模化交付运维需求。


![](/img/docs/user_docs/intro/kusion-stack-1.png)


KusionStack 通过 engineering（工程化）的理念融合平台方，研发者和 [SRE](https://en.wikipedia.org/wiki/Site_reliability_engineering)，通过以 “modeling on platforms, compile to cloud” 为目标的一站式技术栈，让平台方简单灵活的开放平台能力，让应用研发者以应用为中心设计交付运维抽象，降低研发者在参与运维过程中对基础设施的认知负担，同时又赋予研发者充分的灵活性。总的来说，KusionStack 与其他代码化技术一样提供了**版本化**、**可重用**、**可重复**的便利，同时 KusionStack 致力于构建**以应用为中心的抽象界面**，**一致的管理工具及自动化支持**和**更简单的端到端使用体验和工作流程**，并希望趋近这样的理性状态：

+ 融合**平台技术**：面向大量云原生及非云原生平台技术及服务，在差异化的 Platform API、IaaS API 层之上形成应用运维生命周期配置定义，并结合镜像机制，使得应用可以一处编写，随处交付
+ 融合**多种角色**：助力企业内的各平台团队、应用研发团队打破边界，各自向前，通过“平台方生产基础模型，应用方定义应用模型及配置”的工程化方式分工协同，共同形成围绕应用价值交付的 Devops 体系
+ 融合**工作流程**：面向多样化的运维场景，基于可扩展的编程模式和工程结构，典型的端到端工作流程包括研发阶段，手动或自动的代码修改、测试、提交、PR 及 review；CI阶段，集成测试和部署验证；CD阶段，面向运行时的预览、执行、观察等
+ 融合**运维方式**：结合平台化的 CI、CD、CDRA 支持形成端到端的 GitOps 运维方式，并提供工具链、服务层、GUI 产品形成梯度运维方案，按需供给，灵活取用，兼顾内部专有云及外部混合云、多云场景需求，以弹性运维方案逐渐汰换割裂的 "烟囱" 式产品
+ 融合**技术理念**：通过开放的运维理念、文化及开源技术，面向多样化的技术和角色创造更多可能性

## KusionStack 的组成

KusionStack 通过 engineering（工程化）的理念，技术和工作流程融合平台方和应用方，以达到平台能力开放和自助运维效率的平衡。KusionStack 以专用语言和工具链为原点，构建了可编程、可扩展、可移植的运维技术栈，其核心组件包括：

+ [KCL](https://github.com/KusionStack/KCLVM)：配置策略专用编程语言，协议组，工具链及 IDE 插件
+ [Kusion](https://github.com/KusionStack/kusion)：运维引擎、工具链、服务层，IDE 工作空间及社区技术集成套件
+ [Konfig](https://github.com/KusionStack/konfig)：应用模型及基础模型共享仓库，及面向 GitOps 工作流程（如 GitHub Actions）的自定义 CI 套件

也可以从语言协议层、运维能力层、用户界面层的视角进行划分，如下图所示：

![](/img/docs/user_docs/intro/kusion-arch.png)


## KusionStack 核心特征

**灵活组织，按需建模**

KusionStack 采用纯客户端的工作方式，通过目录、文件的简单工程方式，基于 **project**、**stack** 设计的可扩展工程结构，支持按需组织的灵活管理方式。研发者可以通过记录及函数语言 KCL 编写**配置（config）**、**类型（schema）**、**函数（lambda）**及**规则（rule）**。KusionStack 提供了开箱即用的云原生应用模型，支持用户快速开始云原生交付运维之旅。此外，KusionStack 不局限于的单一、固定模型或标准，研发者可以通过 KCL 模块化的语言特性编写模型组件和应用模型，通过 “搭积木” 的方式帮助平台方快速透出平台能力，应用方按需定义应用模型。最后，KusionStack 通过独立的配置块编写结合丰富的自动合并策略满足企业内多租户、多环境的配置编写需求，灵活应对复杂场景和快速变化。

**一处编写，随处交付**

KusionStack 帮助应用研发者集中收敛围绕应用的全量配置定义，通过 "容器镜像 + KCL 代码" 的方式将应用交付到专有云、混合云、多云环境。在编译时，终端用户面向抽象的应用模型工作，应用模型由面向不同运行时不同平台的 renders 解释并生成对应的低维度资源模型。在执行时，通过 Kusion 运维引擎管理含 Kubernetes, Terraform 在内的多种运行时的 hybrid-resource。Kusion 运维引擎原生支持多集群的 Kubernetes 资源管理，通过集成 Terraform 管理 non-Kubernetes 资源。最后，KusionStack 原生支持命令行执行、GitOps 工作流、服务（待开源）调用、GUI 产品（待开源）等自动化机制，通过灵活的自动化方案满足任意交付需求。

**企业实践，生态集成**

依托蚂蚁内部的实践积累，KusionStack 提供了面向 Platform API 从研发到交付运维的端到端工作流程：

1. 平台集成：通过 [KCL-OpenAPI](https://github.com/KusionStack/kcl-openapi) 工具自助生成 KCL schema 代码
2. 研发辅助：通过 KCL IDE 插件，lint，vet，compile，test 工具快速研发、测试
3. CI 流程：通过 KCL dep，test 工具实现精确依赖分析及自动化集成测试验证
4. CD 执行：通过 KusionCtl 工具实现身份验证、RBAC 权限配置，变更预览、生效、观察、销毁的执行流程

此外，KCL 提供了 CRUD API，多语言 SDK 及 plugin 动态扩展机制，以满足企业内个性化自动化需求。KusionStack 将持续提升运维工具及引擎的扩展性，并与更多的社区技术集成。


## Kusion vs. X

KusionStack 是一个纯客户端的可编程技术栈，相比其他技术，其特点可以总结为:

+ **以应用为中心**: 满足差异化应用模型抽象、定义需求
+ **纯客户端方案**: 轻量级、可扩展、灵活、可移植，前置于运行时工作，提供左移的稳定性保证
+ **混合资源及云环境**: 提供面向多运行时多云的资源抽象与管理功能
+ **高度可自动化**: 提供丰富的 API、SDK、扩展机制满足面向研发者和平台的自动化需求

![](/img/docs/user_docs/intro/kusion-vs-x.png)

**vs. Terraform**

KusionStack 是一种云原生亲和的一站式可编程运维技术栈，旨在定义以应用为中心的抽象界面及端到端的管理机制。

KusionStack 通过记录及函数语言 KCL 提供配置（config）、类型（schema）、函数（lambda）、规则（rule）为核心元素的编写能力。KCL 是一种现代编译型静态语言，采纳 Python、Golang 等现代编程语言设计元素，但没有原生线程、IO 等系统功能，可以低噪音、低副作用的应用在配置、建模、策略编写等场景，并提供云原生亲和的语言功能。

![](/img/docs/user_docs/intro/kcl.png)

KusionStack 提供与 KCL 完全解耦的运维引擎及 API 层，其面向混合资源工作。KusionStack 自研了基于面向 Kubernetes API server 的资源管理能力，支持基于 3-way diff 的 preview，运行时 dry-run 等必要的云原生管理能力；对于非 Kubernetes 控制面的服务（如 IaaS APIs）KusionStack 通过集成 Terraform 工具链完成自动化管理，将 Terraform 视为一种资源运行时管理引擎。

![](/img/docs/user_docs/intro/kusion-engine.png)

Terraform 是一种广泛应用在云资源交付场景的可编程运维产品，以动态解释型语言 HCL 编写的配置块为入口，解释并驱动运维引擎及 Provider 框架工作，以其特有的 API 接入机制降低了云厂商参差的命令式 API 的使用难度，结合简洁的工作流程，提供良好的声明式运维体验。


**vs. CD 系统（如 KubeVela， ArgoCD）**

KusionStack 是一种客户端的可编程运维技术栈，通过 Kusion 引擎及 KusionCtl 工具提供对云原生及非原生资源的管理工作流，提供 Push 方式的交付运维支持，因此也可以把 Kusion 引擎视为一种 Push 方式的 CD 技术实现。

CD 系统通常以某种声明式格式为源头，通过 Pull，Push 或两者结合的方式完成自动化的集群部署交付和配置漂移调和。如果您已采纳了 CD 系统，KusionStack 可以与其配合使用，如通过 ArgoCD 调和生效 KCL 定义，如将 KusionCtl 与 KubeVela 配合使用等。

**vs. Helm**

KusionStack 是一种客户端的可编程运维技术栈，旨在通过丰富的语言级编程抽象能力和自动化集成机制定义面向应用的配置界面，并通过运维引擎及工具链生效、管理。

Helm 理念源于操作系统的包管理机制，是一种基于模板化 YAML 的包管理机制，并支持对包内资源的生效和管理。KusionStack 提供了 Helm 能力的超集，对于已采纳 Helm 的用户，可以将 KusionStack 中 Stack 编译结果以 Helm 格式打包后使用。

**vs. OAM**

KusionStack 是一种客户端的可编程运维技术栈，其中包括基于 OCI 等规范提供了开箱即用的代码化的云原生应用模型，研发者也可以根据自身需求设计实现差异化的云原生应用模型。

OAM 是一种开源开放的应用模型规范，主要应用在云原生 CD 控制面 KubeVela，以云原生技术 CRD，operator 为载体，并支持以 payload 方式承载任意自定义资源。KusionStack 亦可以成为一种技术载体在客户端完成 OAM 模型定义，并与 KubeVela 结合使用。

**vs. CrossPlane**

KusionStack 是一种客户端的可编程运维技术栈，通过 Kusion Engine 提供面向混合资源的管理功能。Kusion Engine 原生提供了面向 Kubernetes API Server 的抽象及管理功能，并通过集成 Terraform 工具链支持非 Kubernetes 服务，并向上提供统一的资源抽象及面向资源的编排管理能力。

CrossPlane 是一种开源云原生控制面框架，基于 Kubernetes API 扩展机制，以统一的范式和技术方式将命令式 API 接入并纳管到 Kubernetes API 扩展体系，以原生 Kubernetes API Server 方式做重定义和调和。相比而言，在 API 接入方式上 KusionStack 采用了客户端的方式，通过集成并复用 Terraform 能力完成对非原生资源的管理，不强求 Kubernetes API 层面的重定义。由于 KusionStack 原生支持配合 Kubernetes API Server 使用，KusionStack 可以与 CrossPlane 无缝集成配合工作。

**vs. Kubernetes**

KusionStack 是一种客户端的可编程运维技术栈，旨在为多种运行提供**抽象**，**管理**方式和更好的**使用体验**和**工作流程**，以可编程方式灵活定义并管理应用交付运维。

Kubernetes 是一种在世界范围内广泛采用的容器调度与管理运行时，一种面向容器集群的“操作系统”，一种用于构建平台的平台。面向 Kubernetes API，KusionStack 提供了诸多能力帮助研发者更简单的完成应用交付运维：

+ KCL：向下兼容 YAML 规范，可将 YAML 作为 KCL 的一种下游静态数据格式
+ KCL-OpenAPI 工具：原生 OpenAPI，CRD 规范支持，支持自动生成 KCL schema 代码
+ Konfig 仓库：提供基于 Kubernetes，prometheus API 的等常用模型，并提供面向应用的模型库
+ Kusion：提供面向 Kubernetes 的登录、RABC、敏感信息管理、3-way 预览、执行、观察、销毁等常用工作流支持

**vs. App PaaS**

相比于应用部署运维平台或产品，KusionStack 是一种客户端的可编程运维技术栈，提供了技术组件，自动化支持和推荐的工作流程，基于在蚂蚁内部的大量实践满足企业级的开放运维诉求。KusionStack 可以成为应用运维平台的基础技术，其中 Konfig 仓库可以成为其可编程界面，业务层载体和外置的工作空间。


## 开发状态

KusionStack 处于开源早期，你可以在这里看到 [Kusion](https://github.com/KusionStack/kusion/releases) 和 [KCLVM](https://github.com/KusionStack/KCLVM/releases) 的发布版本，也可以通过 [社区](https://github.com/KusionStack/community) 加入我们。


## 下一步

+ [安装使用 KusionCtl](/docs/user_docs/getting-started/install/kusionup)
+ 了解[核心概念](/docs/user_docs/concepts/project-stack)和[技术架构](/docs/user_docs/concepts/arch)