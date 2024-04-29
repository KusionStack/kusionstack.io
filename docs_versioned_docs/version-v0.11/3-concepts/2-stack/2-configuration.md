---
id: configuration
sidebar_label: Stack file reference
---

# Kusion stack file reference

Every Kusion project's stack has a stack file, `stack.yaml`, which specifies metadata about your stack, such as the stack name and stack description. The stack file must begin with lowercase `stack` and have an extension of either `.yaml` or `.yml`.

## Attributes

| Name          | Required        | Description   | Options       |
|:------------- |:--------------- |:------------- |:------------- |
| `name`        | required        | Name of the stack containing alphanumeric characters, hyphens, underscores. | None         |
| `description` | optional        | A brief description of the stack.  | None           |
| `extensions`  | optional        | List of extensions on the stack. | [See blow](#extensions)          |

### Extensions

Extensions allow you to customize how resources are generated or customized as part of release.

#### kubernetesNamespace

The Kubernetes namespace extension allows you to customize namespace within your application generate Kubernetes resources. 

| Key  | Required | Description | Example |
|:------|:--------:|:-------------|:---------|
| kind | y | The kind of extension being used. Must be 'kubernetesNamespace' | `kubernetesNamespace` |
| namespace | y | The namespace where all application-scoped resources generate Kubernetes objects. | `default` |