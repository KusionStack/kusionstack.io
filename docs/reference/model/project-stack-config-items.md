---
id: project-stack-config-items
sidebar_label: Project & Stack Config Items
---
# Project & Stack Config Items

In **project.yaml** and **stack.yaml**, users can add config items for their applications such as the project or stack names, generator types, Prometheus monitoring, etc. Below, we will provide the explanations for both config file. 

## project.yaml

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

- `name`: The name of the project. 
- `generator`: 
    - `type`: The type of the generator to generate the resource Spec of the application, which can be one of `KCL` or `AppConfiguration`. 
    `KCL` is the default option when this field is empty. 
- `prometheus`: 
    - `operatorMode`: Decides whether Kusion runs Prometheus in **Operator** mode. Kusion will generate a **Custom Resource** if it is **true**, while generate some annotations if it is **false**. 
    - `monitorType`: The type of the monitored resource, which can be one of `Service` or `Pod`. 

## stack.yaml

Here is an example of `stack.yaml`. 

```yaml
# The stack basic info
name: dev
```

The config items in `stack.yaml` are explained below. 

- `name`: The name of the stack, typically the environment of the project, e.g. `dev`, `pre` and `prod`. 