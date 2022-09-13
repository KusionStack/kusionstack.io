# From Kubernetes

## 1. Kubernetes OpenAPI Spec

从 Kubernetes 1.4 开始，引入了对 OpenAPI 规范（在捐赠给 Open API Initiative 之前称为 swagger 2.0）的 alpha 支持，API 描述遵循 [OpenAPI 规范 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md)，从 Kubernetes 1.5 开始，Kubernetes 能够直接从[源码自动地提取模型并生成 OpenAPI 规范](https://github.com/kubernetes/kube-openapi)，自动化地保证了规范和文档与操作/模型的更新完全同步。

此外，Kubernetes CRD 使用 [OpenAPI v3.0 validation](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#validation) 来描述（除内置属性 apiVersion、kind、metadata 之外的）自定义 schema，在 CR 的创建和更新阶段，APIServer 会使用这个 schema 对 CR 的内容进行校验。

## 2. KCL OpenAPI 支持

KCLOpenAPI 工具支持从 OpenAPI/CRD 定义提取并生成 KCL schema. 在[KCLOpenapi Spec](/docs/reference/cli/openapi/spec)中明确定义了 OpenAPI 规范与 KCL 语言之间的映射关系。

[安装 Kusion 工具包](/docs/user_docs/getting-started/install)的同时会默认安装 KCLOpenapi 工具，KCLOpenapi 工具的使用和示例可参见[KCLOpenAPI 工具](/docs/reference/cli/openapi)

## 3. 从 Kubernetes 模型迁移到 Kusion

Kubernetes 内置模型的完整 OpenAPI 定义存放在 [Kubernetes openapi-spec 文件](https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/swagger.json)。以该文件作为输入，KCLOpenapi 工具能够生成相应版本的全部模型 schema. 接下来以发布部署场景为例，演示从 Kubernetes 迁移到 Kusion 的流程。假设您的项目正在使用 [Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) 定义发布部署配置，迁移到 Kusion 只需要如下步骤：

### 1. 使用已有的 kusion_models 模型包

在 Konfig 的 kusion_models 目录中已经保存了一份经过良好抽象的模型 —— Server 模型，点此查看 [Server Schema](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/server.k)。至于存量的 Kubernetes 配置数据，Kusion 计划提供 kube2kcl 转换工具，将其转换为 KCL 描述的基于上述 Server 模型的配置实例，这一工具正在开发中，近期即可开放使用。完成配置模型和数据迁移之后，接下来只需要按照 [Kubernetes - 使用 Kusion 进行应用部署运维](/docs/user_docs/guides/working-with-k8s/)中的指引定义并部署项目即可。

### 2. 创建自定义的 models 前端模型

当已有的 kusion_models 模型包不足以满足业务需求时，您还可以设计自定义的前端模型包。在 Konfig 的 kusion_kubernetes 目录中已经保存了一份生成好的 Kubernetes 1.22 版本模型，您可在此基础上直接编写自定义前端模型。并且您可仿照 kusion_models 的模式，开发自定义脚本，完成配置数据的迁移。此后项目部署参考 [Kubernetes - 使用 Kusion 进行应用部署运维](/docs/user_docs/guides/working-with-k8s/) 指引即可。

#### 1. Kubernetes Deployment 转为 KCL Schema

在 Konfig 的 base/pkg/kusion_kubernetes 目录中，我们已经保存了一份生成的 [KCL 文件（Kubernetes 1.22 版本）](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/apps/v1/deployment.k)，并生成了对应的 模型文档。您可跳过该步骤，使用已生成的模型包，或者你可自行生成特定版本。

从 [Kubernetes 1.23 版本的 openapi-spec 文件](https://github.com/kubernetes/kubernetes/blob/release-1.23/api/openapi-spec/swagger.json)中，可以找到 apps/v1.Deployment 模型相关的定义，截取片段如下：

```json
{
    "definitions": {
        "io.k8s.api.apps.v1.Deployment": {
            "description": "Deployment enables declarative updates for Pods and ReplicaSets.",
            "properties": {
                "apiVersion": {
                    "description": "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
                    "type": "string"
                },
                "kind": {
                    "description": "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                    "type": "string"
                },
                "metadata": {
                    "$ref": "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
                    "description": "Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata"
                },
                "spec": {
                    "$ref": "#/definitions/io.k8s.api.apps.v1.DeploymentSpec",
                    "description": "Specification of the desired behavior of the Deployment."
                },
                "status": {
                    "$ref": "#/definitions/io.k8s.api.apps.v1.DeploymentStatus",
                    "description": "Most recently observed status of the Deployment."
                }
            },
            "type": "object",
            "x-kubernetes-group-version-kind": [
                {
                    "group": "apps",
                    "kind": "Deployment",
                    "version": "v1"
                }
            ]
        }
    },
    "info": {
        "title": "Kubernetes",
        "version": "unversioned"
    },
    "paths": {},
    "swagger": "2.0"
}
```

将以上述 spec 保存为 deployment.json，执行 ```kclopenapi generate model -f deployment.json```，将在当前工作空间生成所有相关的 KCL schema 文件，如 [KCL Deployment 文件（Kubernetes 1.22 版本）](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/apps/v1/deployment.k) 所示。

#### 2. 编写自定义前端模型

由于 Kubernetes 内置模型较为原子化和复杂，我们推荐以 Kubernetes 原生模型作为后端输出的模型，对其进一步抽象，而向用户暴露一份更为友好和简单的前端模型界面，具体您可参照 Konfig 仓库中 [kusion_models Server](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/server.k) 模型的设计方式进行。

#### 3. 批量迁移配置数据

对于存量的 Kubernetes 配置数据，您可以仿照 kube2Kcl 工具的做法，编写自定义的转换脚本，进行一键迁移。Kusion 后续将提供该脚本的编写脚手架和编写指南。

## 4. 从 Kubernetes CRD 迁移到 Kusion

如果您的项目中使用了 CRD，也可以采用类似的模式，生成 CRD 对应的 KCL schema，并基于该 schema 声明 CR。

* 从 CRD 生成 KCL Schema

    ```
    kclopenapi generate model --crd --skip-validation -f your_crd.yaml
    ```

* 使用 KCL 声明 CR

    使用 KCL 声明 CR 的模式与声明 Kubernetes 内置模型配置的模式相同，在此不做赘述。
