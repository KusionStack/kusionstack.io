---
sidebar_position: 1
---

# KusionStack 助力用户更好地使用 KubeVela

## 前言

近年来，Kubernetes 已逐渐成为云原生技术底座的事实标准，统一了基础设施的资源编排与调度。然而，Kubernetes 并没有提供**从应用视角出发的运维模型**，这导致了较高的应用开发者认知成本，影响应用管理体验，并最终降低了研发效率。为了解决这一问题，相继出现了 **KubeVela 平台**和 **KusionStack 技术栈**。

KubeVela 是一个出色的应用交付服务端解决方案，可作为高可用的控制平面，集中管理规模化应用。作为 CNCF (Cloud Native Computing Foundation) 孵化项目，KubeVela 以其新颖的技术理念和高完成度吸引了大量用户与开发者的关注和参与。

KusionStack 是一个以应用为中心的交付及运维技术栈，通过将 KusionStack 作为应用配置编写和生效的客户端入口，可以实现配置模型抽象与复杂性屏蔽、配置字段类型检查和校验，以及对 Kubernetes 和云资源的统一编排。从而在**混合资源运维**、**团队协作**以及**风险校验**等方面给 KubeVela 用户提供更好的体验。

## KubeVela 简介

KubeVela 是一个开箱即用的现代化应用交付与管理平台，构建于 Kubernetes 集群、各家云平台以及各类 IoT 设备等基础设施之上，通过开放应用模型 (OAM) 这一模块化、可扩展、可移植的云原生应用抽象标准，实现对混合、多云环境的应用交付与管理。

![KubeVela usage example](/img/docs/user_docs/guides/kubevela/kubevela_usage_example.png)

KubeVela 将应用部署所需要的所有组件和各项运维操作描述为一个与基础设施无关的“部署计划”，作为一个控制面的应用交付引擎，KubeVela 主要以 Kubernetes CRD 控制器的形式集成安装到现有的 PaaS 平台体系中运行，用户可以通过编写 KubeVela Application 这个资源 YAML 实现应用的标准化交付，一个常见的 KubeVela Application 格式如下所示：

![KubeVela application example](/img/docs/user_docs/guides/kubevela/kubevela_application_example.png)

## KusionStack 简介

KusionStack 是一个开源的可编程云原生应用交付及运维技术栈，融合了平台方、应用开发者和 SRE 的相关诉求，致力于构建**以应用为中心**的抽象界面、一致的管理工具和自动化支持，以及更简单的使用体验和工作流程。KusionStack 的核心产品包括：

- Konfig: 应用配置代码及开箱即用的基础模型共享仓库，以及面向 GitOps 工作流程 (如 GitHub Actions) 的自定义 CI 套件；

- KCL: 面向应用开发者的配置策略专用编程语言，及其协议组、工具链与 IDE 插件；

- Kusion: 运维生效引擎、工具链、服务层，以及 IDE 工作空间和社区技术集成套件。

![KusionStack workflow example](/img/docs/user_docs/guides/kubevela/kusionstack_workflow_example.png)

## KusionStack 助力用户更好地使用 KubeVela

在规模化应用配置管理等企业级场景中，来自不同团队（基础设施、平台、业务）的不同角色（开发者、SRE）可能会同时有成百上千个应用的统一交付与差异化云资源的管理需求，此时将面临着如何更好地实现**多团队多角色协作**，以及如何**以应用为中心进行混合资源统一管理**的问题。

KusionStack 可以作为一种运维技术载体与 KubeVela 结合使用，帮助用户提升规模化场景下高效、安全地进行应用交付与管理的体验。

### 以应用为中心的统一资源管理

KubeVela 有着丰富的可扩展机制，支持用户创建 Terraform 类型的组件定义 (ComponentDefinition)，可通过在描述应用的 YAML 文件中声明 HCL 代码来实现对于多云混合环境的资源管理；**但在 YAML 中编写 HCL 代码会为用户带来较为割裂的使用体验**。

KusionStack 则使用了 KCL 进行应用依赖资源的统一描述，开发者可以**在一份配置文件中统一声明 Kubernetes 资源和 IaaS 云资源**（VPC、OSS、RDS 等）的运维意图，简化认知负担，改善运维体验。

![Unified Description of Application's K8s & IaaS Cloud Resource Configuration Example in a KCL File](/img/docs/user_docs/guides/kubevela/unified_description_in_kcl.png)

### 多团队多角色协作

KusionStack 与 KubeVela 都是面向关注点分离设计的系统，用户天然分为**开发者 (Developer)** 和**平台 (Platform)** 这两类角色，不同的角色可以仅关注自己负责的配置项，以提高研发与运维的效率。

不过，在规模化应用交付场景中，每个应用的 KubeVela Application YAML 文件和相关的 CRD 通常散落在各处，**难以统一管理与多方协作**。KusionStack 使用了 Konfig 大库的模式为规模化协作提供支持，团队内的所有用户可以在同一个 Git 仓库中进行应用配置代码的编写与审计，同时使用 KCL 进行统一的运维意图描述，从而可以提高协作效率。

KusionStack 还通过将繁杂的各类应用模型抽象封装为统一的前端 + 后端模型，来简化开发者侧配置代码的编写。前端模型是开发者编写配置代码的用户界面，包含平台侧暴露给用户的所有可配置属性，其中省略了一些重复可推导的配置项，仅抽象出必要的属性给用户进行交互；后端模型则是具体的模型实现，用于将前端模型属性生效，包含对前端模型实例的资源渲染、合规校验等逻辑片段，可以提高配置代码的健壮性和可复用性并且开发者无需感知。

![Developer & Platform Collaboration Example](/img/docs/user_docs/guides/kubevela/developer_and_platform_collab_example.png)

### 配置风险校验左移

KubeVela 用户在声明 KubeVela Application 时使用的是 YAML 纯文本，因此缺少对配置字段的类型、取值以及安全合规策略等客户端校验能力。

KusionStack 通过**策略代码化**的机制能更加方便地在 Application 配置编写时就发现潜在的问题，而不是等到 CR 下发时才报错，减小错误配置生效带来的风险。同时，Kusion 引擎还可以在配置生效前提供三路实时差异比对能力，用以预览配置的变更，从而提供一个更加安全的工作流程。

![KCL Code Validation Example](/img/docs/user_docs/guides/kubevela/shift_left_security_example.png)

![3-Way Real-time Diff Example](/img/docs/user_docs/guides/kubevela/3_way_diff_example.png)

## KubeVela 集成 KusionStack 方案

我们提出的 KubeVela 集成 KusionStack 的解决方案如下图所示。其中，KusionStack 将作为应用交付管理的客户端，提供应用配置模型的统一抽象与 Kubernetes 和云资源的统一编排，此外还提供了多团队多角色协作、配置代码风险校验等能力的支持；KubeVela 则作为管控面后端，负责 Kubernetes 资源的生效，Terraform 负责云资源的处理：

![Workflow of KubeVela Integrated with KusionStack](/img/docs/user_docs/guides/kubevela/integration_solution.png)

相应的工作流为：

- 用户使用 KCL 编写 Konfig 应用配置模型，其中可包含 Kubernetes 和 Terraform 等混合类型资源；

- 应用模型实例中的 Kubernetes 资源将被渲染为 KubeVela Application CR，Terraform 资源将被渲染为 Kusion Spec 格式的配置数据；

- 用户通过 Kusion 命令行工具将 KubeVela Application 实例交付至 KubeVela，将 Terraform 资源交付至 Terraform 完成资源的下发。

## 实践示例：WordPress 应用快速上云

下面是一个使用 KusionStack 结合 KubeVela 实现 WordPress 应用快速上云的部署示例。WordPress 是一个开源的内容管理系统（CMS），可用于创建和管理各种类型的网站，并管理多个用户和角色。在我们的实践示例中，WordPress 应用将依赖 AWS 关系型数据库服务 RDS (Relational Database Service)，以便为 WordPress 网站的文章、页面、评论以及用户等信息提供云端数据库解决方案。

### 前置条件

- [安装 Kusion 工具链](/docs/user_docs/getting-started/install)
- [安装 KubeVela](https://kubevela.io/)，如果选择无依赖独立安装可不必再重复安装 Kubernetes 集群或 Kind
- [部署 Kubernetes 集群](https://kubernetes.io/) 或 [Kind](https://kind.sigs.k8s.io/)
- 准备一个 AWS 账号，同时需要创建一个具备了 AmazonVPCFullAccess 和 AmazonRDSFullAccess 权限的用户，以使用其关系型数据库服务 (RDS)，该用户可以在 AWS 身份访问管理 (Identity and Access Management, IAM) 控制台中创建和管理

![aws iam account](/img/docs/user_docs/guides/kubevela/aws_iam_account.png)

我们还需要将该用户的 AccessKey 和 SecretKey 配置为环境变量：

```bash
export AWS_ACCESS_KEY_ID="AKIAQZDxxxx" # replace it with your AccessKey
export AWS_SECRET_ACCESS_KEY="oE/xxxx" # replace it with your SecretKey
```

### 查看项目结构与配置代码

#### Project Structure

首先，克隆 KusionStack 的 konfig 配置代码仓库并进入 konfig 目录：

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

在 appops/ 目录下查看 wordpress-kubevela 项目，由以下文件组成：

```shell
cd appops/wordpress-kubevela && tree
.
├── README.md                       // Documentation
├── base                            // Common configuration for all stacks
│   └── base.k                      // Common config code file for all stacks
├── dev                             // Stack directory
│   ├── ci-test                     // CI test directory, storing test scripts and data
│   │   ├── settings.yaml           // Configuration for test data and compiling
│   │   └── stdout.golden.yaml      // Expected Spec YAML, which can be updated using make
│   ├── kcl.yaml                    // Multi-file compilation configuration for current stack
│   ├── main.k                      // Config codes for Developer in current stack
│   ├── platform.k                  // Config codes for Platform in current stack
│   └── stack.yaml                  // Meta information of current stack
└── project.yaml                    // Meta information of current project

3 directories, 9 files
```

:::info
关于 konfig 项目目录结构的更多详细信息，请查看 [Konfig](/docs/user_docs/concepts/glossary) 基本概念
:::

#### 配置代码

我们所需要关注的配置代码文件主要包括 ***dev/main.k*** 和 ***dev/platform.k***

```python
# dev/main.k
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.storage

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
# And main.k is for the configurations in concern of application developers. 

# defination of wordpress application frontend model
wordpress: frontend.Server {
    # specify application image
    image = "wordpress:4.8-apache"

    # use cloud database for the storage of wordpress
    database = storage.DataBase {
        # choose aws_rds as the cloud database
        dataBaseType = "aws_rds"
        dataBaseAttr = storage.DBAttr {
            # choose the engine type and version of the database
            databaseEngine = "MySQL"
            databaseEngineVersion = "5.7"
            # create database account
            databaseAccountName = "root"
            databaseAccountPassword = option("db_password")
            # create internet access for the cloud database
            internetAccess = True
        }
    }

    # NOTE: this configuration is an example of adding an environment variable in the main container
    # uncommenting and re-deploying will add the environment variable "ENV_ADD_EXAMPLE" in the 
    # main container and the differnces will be shown by the command of "kusion apply"
    mainContainer: {
        env += [
            {
                name = "ENV_ADD_EXAMPLE"
                value = "wordpress-example"
            }
        ]
    }
}
```

```python
# dev/platform.k
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.storage
import base.pkg.kusion_models.kube.metadata
import base.pkg.kusion_clouds.aws_backend.aws_config

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
# And platform.k is for the configurations in concern of platform developers. 

_cloudResourceName = "{}-{}".format(metadata.__META_APP_NAME, metadata.__META_ENV_TYPE_NAME).lower()
_awsDependencyPrefix = "$kusion_path." + aws_config.awsProvider.namespace + ":" + aws_config.awsProvider.name + ":"

# defination of wordpress application frontend model
wordpress: frontend.Server {
    # add environment variable in main container with implicit alicloud resource dependency
    mainContainer: {
        env += [
            {
                name = "WORDPRESS_DB_HOST"
                value = _awsDependencyPrefix + aws_config.awsDBInstanceMeta.type + ":" + _cloudResourceName + ".address"
            }
        ]
    }

    # supplement database related configuration code on the platform side
    database: storage.DataBase {
        dataBaseAttr: storage.DBAttr {
            # specify instance type for aws or alicloud rds
            # for aws rds
            instanceType = "db.t3.micro" 

            # for alicloud rds
            # instanceType = "mysql.n2.serverless.1c" 

            # specify cloud charge type for alicloud rds
            # extraMap = {
            #     "cloudChargeType": "Serverless"
            # }
        }
    }
}
```

其中：

- dev/main.k 存放了 WordPress 应用在 dev 这个环境中 **Developer** 所需要关注的配置清单，除了应用容器镜像外，还为 frontend.Server.database 属性分配了一个 storage.DataBase 类型的实例，从而为 WordPress 应用的部署声明了一个以 MySQL 作为引擎的 AWS RDS 数据库；
- dev/platform.k 存放了 WordPress 应用在 dev 这个环境中 **Platform** 所需要关注的配置清单，此处主要是为 WordPress 应用容器指定了待连接的云数据库域名以及 RDS 实例类型，此外，我们还以在其中声明 RDS 收费类型等配置；

可以看到，我们对 AWS RDS 资源进行了抽象和封装，屏蔽了许多 Developer 无需感知的属性 (比如 RDS 背后 VPC 和 vSwitch 的网段)，Developer 和 Platform 在协作共建时也可以仅关注自己负责的配置代码。

### 部署 WordPress 应用

我们可以通过下面的命令行完成 WordPress 应用在 KubeVela 上的一键部署：

```shell
cd appops/wordpress-kubevela/dev && kusion apply --yes
```

![apply the wordpress application with aws rds](/img/docs/user_docs/guides/kubevela/kusion_apply.png)

等待所有资源均调和完成后，我们可以将本地端口 (例如 12345) 转发到集群中的 WordPress 前端服务端口 (80): 

```shell
kubectl port-forward -n wordpress-kubevela svc/wordpress 12345:80
```

![kubectl port-forward for wordpress](/img/docs/user_docs/guides/kubevela/port_forward.png)

### 验证 WordPress 应用服务

接下来我们验证一下刚刚部署的 WordPress 站点服务，及其所依赖的 RDS 资源的创建情况，我们在浏览器中访问刚刚配置的本地转发端口  [(http://localhost:12345)](http://localhost:12345) 即可开始 WordPress 站点的使用：

![wordpress site page](/img/docs/user_docs/getting-started/wordpress-site-page.png)

使用 velaux 或 vela top 查看 KubeVela Application 相关资源：

```shell
vela port-forward addon-velaux -n vela-system 8080:80
```

![velaux](/img/docs/user_docs/guides/kubevela/velaux.png)

```shell
vela top
```

![vela top](/img/docs/user_docs/guides/kubevela/vela_top.png)

此外，还可以登录 AWS 云服务控制台页面，查看我们刚刚创建的 RDS 资源实例：

![rds info](/img/docs/user_docs/guides/kubevela/rds_info.png)
![rds detailed](/img/docs/user_docs/guides/kubevela/rds_detailed.png)

### 修改 WordPress 应用配置

#### 配置合法性检查

在创建 RDS 资源时，对于不同类型的云服务厂商，我们可以声明相应的 RDS 实例类型，Konfig 后端模型已添加了对 RDS 实例类型的校验逻辑，因此，当我们不小心在 dev/platform.k 中修改 RDS 实例类型为一个无效的值时，Kusion 在生效前的编译过程中就将抛出相应的错误：

![KCL Assertion](/img/docs/user_docs/guides/kubevela/assert.png)

#### 配置修改生效

我们可以尝试通过修改 dev/main.k 中的配置代码，在主容器中添加一个环境变量，使用 kusion apply 重新使配置生效时，可以通过 Kusion 命令行工具三路实时差异比对 (3-way diff) 的能力查看到相应资源的变更预览 (注：为了展示效果，此处我们忽略 metadata.managedFields 这个字段的变更)：

```python
# dev/main.k
# ...

wordpress: frontend.Server {
    # Some unchanged codes are omitted
    # image = ...
    # database = storage.DataBase{...}
    
    # NOTE: this configuration is an example of adding an environment variable in the main container
    # uncommenting and re-deploying will add the environment variable "ENV_ADD_EXAMPLE" in the 
    # main container and the differnces will be shown by the command of "kusion apply"
    mainContainer: {
        env += [
            {
                name = "ENV_ADD_EXAMPLE"
                value = "wordpress-example"
            }
        ]
    }
}
```

```shell
kusion apply --ignore-fields "metadata.managedFields"
```

![kusion apply diff](/img/docs/user_docs/guides/kubevela/kusion_apply_diff.png)

### 删除 WordPress 应用

我们可以通过下面的命令完成 WordPress 应用及 RDS 相关资源的一键删除：

```shell
kusion destroy --yes
```

![kusion destroy](/img/docs/user_docs/guides/kubevela/kusion_destroy.png)

## 总结

本文介绍了 KusionStack 如何助力开发者和平台用户更好地使用 KubeVela 实现高效的应用交付管理。在我们提出的集成方案中，KusionStack 可以被视作混合应用资源模型的**统一抽象**、**编排层**，KubeVela 负责生效 Kubernetes 资源，Terraform 负责处理云资源。

从 WordPress 快速上云的实践示例中我们可以看到，KusionStack 可以为用户带来下面这些特性：

- **以应用为中心统一资源管理**: 使用 KCL 可以对应用所需的 Kubernetes、IaaS 云资源进行**抽象和封装**，屏蔽掉应用开发者无需感知的属性，从而可以更自由、灵活、高效地组织应用配置，一键拉起所有依赖，实现以应用为中心的运维；

- **多团队多角色协作**: 在 Konfig 大库中共同编写配置代码的协作模式下，**Developer** 和 **Platform** 能够各司其职，不同的角色可以仅关注自己负责的配置代码，从而提高应用研发与运维的协作效率；

- **配置风险校验左移**: 使用 KCL 编写应用配置代码可以在编写时就发现潜在的问题，减小错误配置生效带来的风险，同时，Kusion 还可以在配置生效前提供**三路实时差异比对**的能力，用以预览配置的变更，从而提供一个更加安全的工作流程。
