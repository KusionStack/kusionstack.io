---
id: configuration
sidebar_label: Stack Configuration
---

# Stack Configuration

Users can add config items of the stack in `stack.yaml`, such as the stack name, etc.

Here is an example of `stack.yaml`.

```yaml
# The stack basic info
name: dev
extensions:
- kind: kubernetesNamespace
  namespace: my-dev-namespace
- kind: kubernetesMetadata
  labels:
    my-label: hello-dev
  annotations:
    my-annotation: world-dev
```

The config items in `stack.yaml` are explained below.

- **name**: The name of the stack, should be same as the workspace name, such as `dev`, `pre` and `prod`.
- **extensions**: The extensions field of the stack, including stack-level namespace override, labels and annotations.
  - **kind**: The kind of extension to overlay. Possible values are `kubernetesNamespace` and `kubernetesMetadata`.
  - **namespace**: Overrides the target Kubernetes workspace at stack level.
  - **labels**: Add additional labels to all Kubernetes resources under this stack.
  - **annotations**: Add additional annotations to all Kubernetes resources under this stack.
