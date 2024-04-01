---
id: workspace
sidebar_label: Workspace
---

# Workspace

Workspace is a logical concept, which represents a target environment to deploy a Stack. A Workspace is composed of a series of platform configuration, which can be reused by multiple stacks. When executing the command `kusion generate`, Kusion will interweave the AppConfiguration and the Workspace configuration to generate the Spec, which contains the whole information to apply the resources required by the Stack. The relationship of the Project, Stack and Workspace is shown as below. Summarizing their relationship in one sentence: a Project in a Workspace is a Stack.

![workspace-project-stack](/img/docs/concept/workspace-project-stack.png)

Workspace is designed for the team collaboration scenario, and to realize the separation of concerns.  We recommend organizing Workspaces by SDLC (Software Development Life Cycle) phases, or cloud vendors, or the combination of the two.

The configuration of Workspace is organized by a determinate format, and written in YAML. The subcommands of `kusion workspace` are provided to manage the Workspace. When using `kusion workspace`, the Workspace configuration will be saved as YAML file in local file system. To avoid the possible risks, the environment variables are provided to set the sensitive configuration.

## Workspace Configuration

The configuration of a Workspace is stored in a single YAML file, which consists of `modules` and `runtimes`. An example of Workspace configuration is shown as below.

```yaml
# The platform configuration for Modules or KAMs.
# For each Module or KAM, the configuration format is as below. 
# # ${module_identifier} or ${KAM_name}:
# #   default: # default configuration, applied to all projects
# #     ${field1}: ${value1}
# #     #{field2}: ${value2}
# #     ...
# #   ${patcher_name}: #patcher configuration, applied to the projects assigned in projectSelector
# #     ${field1}: ${value1_override}
# #     ...
# #     projectSelector:
# #     - ${project1_name}
# #     - ${project2_name}
# #     ...
modules:
   kusionstack/mysql@0.1.0:
      default:
         cloud: alicloud
         size: 20
         instanceType: mysql.n2.serverless.1c
         category: serverless_basic
         privateRouting: false
         subnetID: ${mysql_subnet_id}
         databaseName: kusion
      largeSize:
        size: 50
        projectSelector:
        - foo
        - bar
    
# The configuration of Runtimes, support Kubernetes and Terraform.
# For each Runtime, the configuration format is as below.
# # ${runtime_name}:
# #   ${field1}: ${value1}
# #   ${field2}: ${value2}
# #   ...
runtimes:
  kubernetes:
    kubeConfig: /etc/kubeconfig.yaml
  terraform:
    aws:
      version: 1.0.4
      source: hashicorp/aws
      region: us-east-1
```

### modules

The `modules` are the platform-part configurations of Modules and KAMs, where the identifier of them are `${namespace}/${module_name}@${module_tag}` and `${kam_name}`. For each Module or KAM configuration, it is composed of a `default` and several `patcher` blocks. The `default` block contains the universal configuration of the Workspace, and can be applied to all Stacks in the Workspace, which is composed of the values of the Module's or KAM's fields. The `patcher` block contains the exclusive configuration for certain Stacks, which includes not only the fields' values, but also the applied Projects.

The `patcher` block is designed to increase the flexibility for platform engineers managing Workspaces. Cause the Workspace should map to the real physical environment, in the actual production practice, it's almost impossible that all the Stacks share the same platform configuration, although we want them the same. 

The values of the same fields in `patcher` will override the `default`, and one field in multiple patchers is forbidden to assign to the same Project. That is, if there are more than one `patcher` declaring the same field with different values, the applied Projects are prohibited to overlap. And, The name of `patcher` must not be `default`.

In the `patcher`, the applied Projects are assigned by the field `ProjectSelector`, which is an array of the Project names. The `ProjectSelector` is provided rather than something may like `StackSelector`, which specifies the applied Stacks. Here are the reasons. Explaining from the perspective of using Workspace, the mapping of Workspace and Stack is specified by the Kusion operation commands' users. While explaining from the perspective of the relationship among Project, Stack and Workspace, Workspace is designed for the reuse of platform-level configuration among multiple Projects. When a Project "encounters" a Workspace, it becomes a "Stack instance", which can be applied to a series of real resources. If using something like `StackSelector`, the reuse would not get realized, and Workspace would also lose its relevance. For more information of the relationship, please refer to [Project](project/overview) and [Stack](stack/overview). 

Different Module and KAM has different name, fields, and corresponding format and restrictions. When writing the configuration, check the corresponding Module's or KAM's description, and make sure all the requisite Modules and KAMs have correctly configured. Please refer to [Kuiosn Module](kusion-module/overview) and find more information. The example above gives a sample of the Module `mysql`.

### runtimes

The `runtimes` are the interface that Kusion interacts with the real infrastructure, which are only configured by the platform engineers in Workspace. Kusion supports the runtimes `Kubernetes` and `Terraform` for now.

For `Kubernetes` runtime, the path of the KubeConfig file is provided to configure, which is specified by the filed `kubeConfig`. Besides, the environment variable `KUBECONFIG` is also supported with higher priority. If both not set, the default path `$HOME/.kube/config` will be used. For the example above, the `kubeConfig` is set in the Worksapce configuration.

The `Terraform` runtime is composed of multiple Terraform providers' configurations, where the key is the provider name, and the values varies across different providers. For the configuration fields, Kusion keeps the same with Terraform, including the supported environment variables. Please refer to [Terraform Registry](https://registry.terraform.io/) and find more information. For the example above, a sample of aws runtime configuration is given, while the `access_key` and `access_secret` is not set in the Workspace file, and expected setting by the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

## Managing Workspace

The subcommands of `kusion workspace` are used to manage Workspaces, including `create`, `show`, `list`, `switch`, `update` and `delete`. Cause the Workspace configurations are stored persistently, the current or a specified Backend will be used. For more information of Backend, please refer to [Backend](backend).

Kusion will create a `default` Workspace with empty configuration in every Backend automatically, and set it as the current. When first using Kusion, or no configuration of Workspace, the `default` Workspace will be used.  

### Creating Workspace

Use `kusion workspace create ${name} -f ${configuration_file_path}` to create a new Workspace with the configuration in a YAML file. The Workspace is identified by the `name`, and must be a new one, while the configuration must be written in a YAML file with correct format. 

The command above will create the Workspace in current Backend. If to create a Workspace in another backend, please use flag `--backend` to specify. The Workspace names in a Backend must be different, but allow the same in different Backends.

In some scenarios, when a Workspace is created, it is expected to be the current. For simplification, the flag `--current` is provided to set the Workspace current alongside the creation.

Be attention, creating `default` Workspace is not allowed, because it's created by Kusion automatically.

The example is shown as below.

```shell
# create a workspace in current backend
kusion workspace create dev -f dev.yaml

# create a workspace in current backend ans set it as current
kusion workspace create dev -f dev.yaml --current

# create a workspace in specified backend
kusion workspace create dev -f dev.yaml --backend oss-pre
```

The Workspaces to create are decided by the platform engineers. We recommend that they are organized by the following rules:

- **SDLC phases**, such as `dev`, `pre`, `prod`;
- **cloud vendors**, such as `aws`, `alicloud`;
- combination of the two above, such as `dev-aws`, `prod-alicloud`.

In design, Kusion does not support deploying Stack to multiple clouds or regions within a single Workspace. While users can technically define a Module that provisions resources across multiple clouds or regions, Kusion does not recommend this practice, and will not provide technical support for such configuration. If the platform engineers need to manage resources across multiple clouds or regions, they should create separate Workspaces.

### Listing Workspace

Use `kusion workspace list` to get all the workspace names.

The example is shown as below. In order to simplify, The following examples will not give using specified backend, which is supported by `--backend` flag.

```shell
# list all the workspace names
kusion workspace list
```

### Switching Workspace

In order not to specify the Workspace name for each Kusion operation command, `kusion workspace switch ${name}` is provided to switch the current Workspace. Then when executing `kusion generate`, the current Workspace will be used. The to-switch Workspace must be created.

The example is shown as below.

```shell
# switch workspace
kusion workspace switch dev
```

### Showing Workspace

Use `kusion workspace show ${name}` to get the Workspace configuration. If the `name` is not specified, the configuration of current Workspace will get returned.

The example is shown as below.

```shell
# show a specified workspace configuration
kusion workspace show dev

# show the current workspace configuration
kusion workspace show
```

### Updating Workspace

When the Workspace needs to update, use `kusion workspace update ${name} -f ${configuration_file_path}` to update with the new configuration file. The whole updated configuration is asked to provide, and the Workspace must be created. Get the Workspace configuration first, then refresh the configuration and execute the command, which are the recommended steps. If the `name` is not specified, the current Workspace will be used.

Updating the `default` Workspace is allowed. And the flag `--current` is also supported to set it as the current.

The example is shown as below.

```shell
# update a specified workspace
kusion worksapce update dev -f dev_new.yaml

# update a specified workspace and set it as current
kusion worksapce update dev -f dev_new.yaml --current

# update the current workspace
kusion workspace update -f dev_new.yaml
```

### Deleting Workspace

When a Workspace is not in use anymore, use `kusion workspace delete ${name}` to delete a Workspace. If the `name` is not specified, the current Workspace will get deleted, and the `default` Workspace will be set as the current Workspace. Therefore, deleting the `default` Workspace is not allowed. 

The example is shown as below.

```shell
# delete a specified workspace
kusion worksapce delete dev 

# delete the current workspace
kusion workspace delete
```

## Using Workspace

Workspace is used in the command `kusion generate`, the following steps help smooth the operation process.

1. Write the Workspace configuration file with the format shown above, and fulfill all the necessary fields;
2. Create the workspace with `kusion worksapce create`, then Kusion perceives the Workspace. The flag `--current` can be used to set it as the current.
3. Execute `kusion generate` in a Stack to generate the whole Spec, the AppConfiguration and Workspace configuration get rendered automatically, and can be applied to the real infrastructure. If the appointed Workspace or Backend is asked, the flags `--workspace` and `--backend` will help achieve that. 
4. If the Workspace needs to update, delete, switch, etc. Use the above commands to achieve that.
