---
id: concept
sidebar_label: 基本概念
---
# Kusion 模型库基本概念

## 1. Kusion 模型库 (Kusion Model)

**Kusion 模型库**也叫做 `Kusion Model`，是 KusionStack 中预置的、使用 KCL 描述的配置模型，它提供给用户开箱即用、高度抽象的配置界面，模型库最初朴素的出发点就是改善 YAML 用户的效率和体验，我们希望通过将代码更繁杂的模型抽象封装到统一的模型中，从而简化用户侧配置代码的编写。

⚡️ **Kusion 模型库**由以下部分组成：

- **核心模型库**：
  - **前端模型**：前端模型即「用户界面」，包含平台侧暴露给用户的所有可配置属性，其中省略了一些重复的、可推导的配置，抽象出必要属性暴露给用户，具有用户友好的特性，比如 `server.k`。
  - **后端模型**：后端模型是「模型实现」，是让前端模型属性生效的模型，主要包含前端模型实例的渲染逻辑，后端模型中可借助 KCL 编写校验、逻辑判断、代码片段复用等代码，提高配置代码复用性和健壮性，对用户不感知，比如 `server_backend.k`
- **底层模型**：是不包含任何实现逻辑和抽象的模型，往往由工具转换生成，无需修改，和真正生效的 YAML 属性一一对应，底层模型需要经过进一步抽象，一般不直接被用户使用。比如，`kusion_kubernetes` 是 Kubernetes 场景的底层模型库；

## 2. 前端模型

**前端模型** 即「用户界面」，包含平台侧暴露给用户的所有可配置属性，其中省略了一些重复的、可推导的配置，抽象出必要属性暴露给用户，具有用户友好的特性。用户只需要像实例化一个类（Class）一样，传入必要参数构成一份应用的「配置清单」，经过工具链编译即可得到完整的 Kubernetes Manifests，其中包含 Deployment、Service 等 Kubernetes 资源；
一个简单的前端模型样例如下：

```bash
schema Server:
    # Application workload type, default to 'Deployment'
    workloadType: "Deployment" | "StatefulSet" = "Deployment"

    # Application replicas
    replicas: int = option("replicas") or 1

    # Main container image
    image: str = option("image")
    # Main container resource
    schedulingStrategy: strategy.SchedulingStrategy = strategy.SchedulingStrategy{}

    # Main container configuration
    mainContainer: container.Main
    # Sidecar container configurations
    sidecarContainers?: [s.Sidecar]
    # Init container configurations
    initContainers?: [s.Sidecar]

    # Workload configuration
    labels?: {str:str}
    annotations?: {str:str}
    selector?: {str:str}
    podMetadata?: apis.ObjectMeta
    volumes?: [volume.Volume]

    # Other configurations
    needNamespace?: bool = True

    configMaps?: [configmap.ConfigMap]
    secrets?: [secret.Secret]
    services?: [service.Service]
```

## 3. 后端模型

**后端模型** 是「模型实现」，是让前端模型属性生效的模型，主要包含前端模型实例的渲染逻辑，后端模型中可借助 KCL 编写校验、逻辑判断、代码片段复用等代码，提高配置代码复用性和健壮性，对用户不感知；
一个简单的后端模型定义如下：

```bash
schema ServerBackend[inputData]:
    mixin [
        ......
    ]

    # Validations
    assert ac.__META_APP_NAME, "app name must be specified and can't be empty or None or Undefined"
    ......

    # Varaible
    _workload_name: str = "{}{}".format(metadata.__META_APP_NAME, metadata.__META_ENV_TYPE_NAME).lower()

    # result
    kubernetes: {str: []} {
        Deployment = [
            v1alpha1.Deployment {
                name = _cafedName
                ......
            }
        ]
    }
```

## 4. 底层模型

**底层模型** 是不包含任何实现逻辑和抽象的模型，往往由工具转换生成，无需修改，和真正生效的 YAML 属性一一对应，底层模型需要经过进一步抽象，一般不直接被用户使用。比如，`kusion_kubernetes` 是 Kubernetes 场景的底层模型库；

常用的底层模型库有：

* Kubernetes 底层模型库（kusion_kubernetes）
* Prometheus 底层模型库（kusion_prometheus）

## 5. Mixin

**Mixin** 是 KCL 提供的一种复用代码片段的方式，后端模型只需要通过下述方式引用，就可以复用 Mixin 中的逻辑：

```bash
import sigma.base.pkg.kusion_models.mixins

schema ServerBackend[inputData]:
    mixin [
        ......
        mixins.SchedulingStrategyMixin,
        ......
    ]
```

## 6. FAQ

### ❓ 为什么要区分前端模型和后端模型？

区分前端模型和后端模型的直接目的是将「用户界面」和「模型实现」进行分离；
