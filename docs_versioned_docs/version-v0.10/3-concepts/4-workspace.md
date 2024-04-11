# Workspace

## Definition

A workspace is a logical concept that represents a target environment for deploying a stack. It contains platform configurations, including a set of configurations, Kubeconfig, and provider authentication information, all of which can be reused by multiple stacks. We recommend organizing workspaces by SDLC (Software Development Life Cycle) phases or by cloud vendors. For example, workspaces could be named `dev`, `staging`, and `prod`, or according to cloud vendors such as `AWS`, `Azure`, and `Alibaba Cloud`.

For clarity, workspace data is categorized into two types: configuration and secret. The configuration data is non-sensitive and is stored locally in YAML files, including module inputs, runtime configurations, and backend configurations. The secret data is sensitive and should be stored as workspace variables. For example, when using AWS, users must set the correct workspace variables for `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

If a set of data items serves the same target and contains one or more sensitive data items, then the entire set should be managed using environment variables. This approach ensures a consistent and seamless user experience.

Each stack must be associated with a single workspace, and **the stack's name must be the same as the workspace it will be deployed to**.

![workspace-project-stack](/img/docs/concept/workspace-project-stack.png)

:::info
In product design, Kusion does not support deploying to multiple clouds or multiple regions within a single workspace. While users can technically define a module that provisions resources across multiple clouds or regions, Kusion does not recommend this practice and will not provide technical support for such configurations. If a platform team needs to manage resources across multiple clouds or regions, they should create separate workspaces.
:::

## Structure

The configuration of a workspace is stored in a single YAML file, which consists of three components: `modules`, `runtimes`, and `backends`.

A `module` configuration comprises default configs and several patchers, where the name of each patcher must not be **default**. Configurations in the `default` block will be applied to all applications in this workspace and configurations in the patcher block will only be applied to projects in the `projectSelector`. Values in patchers will override default configs with the same field name.
For the default configuration or a specific patcher, field keys must be the same as module input field names defined by the module. Module configurations can be found in the [Kusion Modules](../reference/modules)

The `runtime` configuration currently supports Kubernetes and Terraform, where the former includes the field `kubeConfig` to specify the path of Kube Config, and the latter contains data for Terraform providers, which vary across different providers. For Terraform providers, sensitive data should be stored in environment variables.

The `backend` configuration currently supports local, oss, s3, database, and http. This defines the backend for state, intent, and other Kusion data that may require storage in the future. This format requires that all Kusion data share the same backend. As with sensitive data in the runtime configuration, these details should also be stored in environment variables. Backend configurations can be found in the [Backend Configuration](backend-configuration)

An example is shown as below:

```yaml
# Module input, each with the format standard：
# # <ModuleName>:
# #   default: # default configurations, applied to all projects
# #     <ModuleInput_Field1>: <value1>
# #     <ModuleInput_Field2>: <value2>
# #     ...
# #   <patcherName>: #patcher configurations, applied to the projects assigned in projectSelector
# #     <ModuleInput_Field1>: <value1_Override>
# #     ...
# #     projectSelector:
# #     - <projectName1>
# #     ...
modules:
  database:
    default:
      provider: aws
      size: 20
      instanceClass: db.t3.micro
      securityIPs:
      - 10.0.0.0/18
    smallClass:
      size: 50
      instanceClass: db.t3.small
      projectSelector:
      - foo
      - bar
    largeClass:
      instanceClass: db.t3.large
      projectSelector:
      - baz
    
# A set of runtime configs, each with the format standard:
# # <RuntimeName>:
# #   <RuntimeConfig_Field1>: <value1>
# #   <RuntimeConfig_Field2>: <value2>
# #   ...
runtimes:
  kubernetes:
    kubeConfig: /etc/kubeconfig.yaml
  terraform:
    aws:
      version: 1.0.4
      source: hashicorp/aws
      region: us-east-1
      
# A set of backend configs, each with the following format standard:
# # <BackendName>:
# #   <BackendConfig_Field1>: <value1>
# #   <BackendConfig_Field2>: <value2>
# #   ...
backends:
  s3: 
    bucket: kusion
    region: us-east-1
```

## Workflow

1. Write the `workspace.yaml` with the format shown above and fulfill all necessary fields.
2. Create a workspace with `kusion worksapce create <name> -f <workspaceFilePath>`
   A new workspace configuration file named `<name>.yaml` will be created under the path `$KUSION_PATH/.workspace`, and the validation will be done before the creation.
3. Update a workspace with `kusion worksapce update <name> -f <workspaceFilePath>`
   The workspace will be updated with the latest values.
4. Delete a workspace with `kusion workspace delete <name>` if you don't need it anymore.

More workspace commands can be found in the [reference](../reference/commands/kusion-workspace).