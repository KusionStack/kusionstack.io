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
extensions:
- kind: kubernetesNamespace
  namespace: my-namespace
- kind: kubernetesMetadata
  labels:
    my-label: hello
  annotations:
    my-annotation: world
```

The config items in `project.yaml` are explained below.

- **name**: The name of the project.
- **extensions**: The extensions field of the project, including project-level namespace override, labels and annotations.
  - **kind**: The kind of extension to overlay. Possible values are `kubernetesNamespace` and `kubernetesMetadata`.
  - **namespace**: Overrides the target Kubernetes workspace at project level.
  - **labels**: Add additional labels to all Kubernetes resources under this project.
  - **annotations**: Add additional annotations to all Kubernetes resources under this project.
