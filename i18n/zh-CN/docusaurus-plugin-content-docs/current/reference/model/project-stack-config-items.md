---
id: project-stack-config-items
sidebar_label: Project 与 Stack 配置项
---
# Project 与 Stack 配置项

在 **project.yaml** 和 **stack.yaml** 中，用户可以为他们的应用添加相关配置项，比如：project 或 stack 名称、Generator 类型、Prometheus 监控等等。

## project.yaml

下面是一份示例 `project.yaml` 文件。

```yaml
# project 基本信息
name: helloworld
generator:
  type: AppConfiguration
prometheus:
  operatorMode: True
  monitorType: Service
```

`project.yaml` 中的相关配置项说明如下。

- `name`: project 名称
- `generator`: 
    - `type`: 生成应用资源 Spec 的 Generator 类型，可选值为 `KCL` 或 `AppConfiguration`。当该字段为空时，默认为 `KCL`。
- `prometheus`: 
    - `operatorMode`: 用于决定 Kusion 是否以 **Operator** 模式运行 Prometheus 监控。如果该字段为 **true**，Kusion 将通过生成 **Custom Resource** 使用 Prometheus，如果该字段为 **false**，则会通过生成 annotation 使用 Prometheus。
    - `monitorType`: 监控资源的类型，可选值为 `Service` 或 `Pod`。

## stack.yaml

下面是一份示例 `stack.yaml` 文件。

```yaml
# stack 基本信息
name: dev
```

`stack.yaml` 中的相关配置项说明如下。

- `name`: stack 名称，通常是指 project 所处环境，如：**开发**、**预发**和生产。
