---
id: configuration
sidebar_label: Project file reference
---

# Kusion project file reference

Every Kusion project has a project file, `project.yaml`, which specifies metadata about your project, such as the project name and project description. The project file must begin with lowercase `project` and have an extension of either `.yaml` or `.yml`.

## Attributes

| Name          | Required        | Description   | Options       |
|:------------- |:--------------- |:------------- |:------------- |
| `name`        | required        | Name of the project containing alphanumeric characters, hyphens, underscores. | None         |
| `description` | optional        | A brief description of the project.  | None           |
| `extensions`  | optional        | List of extensions on the project. | [See blow](#extensions)          |

### Extensions

Extensions allow you to customize how resources are generated or customized as part of release.

#### kubernetesNamespace

The Kubernetes namespace extension allows you to customize namespace within your application generate Kubernetes resources. 

| Key  | Required | Description | Example |
|:------|:--------:|:-------------|:---------|
| kind | y | The kind of extension being used. Must be 'kubernetesNamespace' | `kubernetesNamespace` |
| namespace | y | The namespace where all application-scoped resources generate Kubernetes objects. | `default` |
