---
id: configuration
sidebar_label: Project Configuration
---

# Project Configuration

Users can add config items of the project in `project.yaml`, such as the project name, generator type, Prometheus monitoring, etc.

Here is an example of `project.yaml`.

```yaml
# The project basic info
name: helloworld
generator:
  type: AppConfiguration
prometheus:
  operatorMode: True
  monitorType: Service
```

The config items in `project.yaml` are explained below.

- **name**: The name of the project
- **generator**:
    - `type`: The type of the module generator, supports `AppConfiguration` and `KCL`, default is `AppConfiguration`. If using the schema AppConfiguration, set type as AppConfiguration
- **prometheus**:
    - **operatorMode**: Decides whether Kusion runs Prometheus in `Operator` mode. Kusion will generate a `Custom Resource` if it is true, while generate some annotations if it is false
    - **monitorType**: The type of the monitored resource, which can be one of `Service` or `Pod`
