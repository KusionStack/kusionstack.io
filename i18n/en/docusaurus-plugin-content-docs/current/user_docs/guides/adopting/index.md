# Begin Kusion

对于全新的项目来说，您只需要从头开始采用 Kusion 技术栈编写和管理基础设施配置即可，我们提供了针对不同运行时的[用户指南](../../guides/guides.md)文档引导您这一过程。 然而，对于已经建设了基础设施的项目，可能已有存量的配置模型和数据，对此，Kusion 也提供了一些自动化工具帮助您快速迁移：

对于 kubernetes 用户，Kusion 提供了 OpenAPI 到 KCL 模型代码的转换工具，以直接复用 Kubernetes 已有的上百个核心模型。 对于 istio 用户，以及 Kubernetes 内置模型无法支持的情况， Kusion 还支持将 CRD 自动生成为 KCL 模型代码。
