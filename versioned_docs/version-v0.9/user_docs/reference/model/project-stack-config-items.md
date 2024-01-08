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
prometheus:
  operatorMode: True
  monitorType: Service
```

The config items in `project.yaml` are explained below. 

- `name`: The name of the project. 
- `prometheus`: 
    - `operatorMode`: Decides whether Kusion runs Prometheus in **Operator** mode. Kusion will generate a **Custom Resource** if it is **true**, while generate some annotations if it is **false**. 
    - `monitorType`: The type of the monitored resource, which can be one of `Service` or `Pod`. 

### Backend Configuration

Kusion supports configuring the storage of state through the `backend` field in the `project.yaml` file. Detailed instructions can be found in [Backend Configuration](../cli/backend/backend-configuration.md)

## stack.yaml

Here is an example of `stack.yaml`. 

```yaml
# The stack basic info
name: dev
kubeConfig: /Users/username/.kube/config
```

The config items in `stack.yaml` are explained below. 

- `name`: The name of the stack, typically the environment of the project, e.g. `dev`, `pre` and `prod`. 
- `kubeConfig`: The kubeconfig file path for this stack. 

:::tip
The `kubeConfig` field in the `stack.yaml` file only supports **absolute path** and **relative path** with a dot (.) or double dots (..). Expansions for tilde (~) and $HOME are not supported yet. 
:::
