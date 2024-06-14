---
id: workspace
sidebar_label: Workspace
---

# Workspace

Workspace is a logical concept that maps to an actual target environment to deploy a stack to. In today's context, this _usually_ represents a Kubernetes cluster for the application workload and an optional cloud account to provision infrastructure resources that the workload depends on (A database, for example). Aside from the deployment destination, workspaces are also designed to be associated with a series of platform configurations that are used by all the stacks deployed to said workspace.

When executing the command `kusion generate`, Kusion will "match" the AppConfiguration and the approriate workspace configuration to dynamically generate the `Spec`, which contains the complete manifest to describe the resources in the stack. The relationship of the Project, Stack and Workspace is shown as below. Notice that all three ways to organize stacks are valid.

![project-stack-workspace](/img/docs/concept/project-stack-workspace.png)

Workspace is designed to address separation of concerns. As opposed to the development-time concept of a "stack", a workspace is a deploy-time concept that represents a deployment target, a.k.a an actual runtime environment. Workspaces should be entirely managed by Platform Engineers to alleviate the burden on developers to understand environment-specific details.

To dig a little deeper, a workspace represents the need for a distinct set of "platform opinions". That includes things that application developer either don't want to or shouldn't need to worry about, such as which Kubernetes cluster to deploy to, the credentials to deploy to said clusters, and other infrastructure details like what database instance to provision.

Workspace is intended to be flexible so you can map them as your see fit to the boundaries that are relevant to your use case. For example, you can map a workspace to a cloud region (aws-us-east-1), provided that regional isolation is sufficient for you (this is an extreme case). Alternatively, a workspace can be map to the combination of a cloud region and an SDLC phase (aws-dev-us-east-1), provided that it represents the right boundary from a platform perspective.

The workspace configuration is in a deterministic format and currently written in YAML. The subcommands of `kusion workspace` are provided to manage the workspaces. When using `kusion workspace`, the workspace configuration will be saved as YAML file in local file system. To avoid the possible risks, the environment variables are provided to hold the sensitive data such as Access Keys and Secret keys.

## Workspace Configuration

The configuration of a Workspace is stored in a single YAML file, which consists of `modules`. An example of Workspace configuration is shown as below.

```yaml
# The platform configuration for Modules or KAMs.
# For each Module or KAM, the configuration format is as below. 
# # ${module_identifier} or ${KAM_name}:
# #   path: oci://ghcr.io/kusionstack/module-name # url of the module artifact
# #   version: 0.2.0 # version of the module
# #   configs: 
# #     default: # default configuration, applied to all projects
# #       ${field1}: ${value1}
# #       #{field2}: ${value2}
# #       ...
# #     ${patcher_name}: #patcher configuration, applied to the projects assigned in projectSelector
# #       ${field1}: ${value1_override}
# #       ...
# #       projectSelector:
# #       - ${project1_name}
# #       - ${project2_name}
# #       ...
modules:
   mysql: 
    path: oci://ghcr.io/kusionstack/mysql
    version: 0.2.0
    configs:
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
```

### modules

The `modules` are the platform-part configurations of Modules and KAMs, where the identifier of them are `${namespace}/${module_name}@${module_tag}` and `${kam_name}`. For each Module or KAM configuration, it is composed of a `default` and several `patcher` blocks. The `default` block contains the universal configuration of the Workspace, and can be applied to all Stacks in the Workspace, which is composed of the values of the Module's or KAM's fields. The `patcher` block contains the exclusive configuration for certain Stacks, which includes not only the fields' values, but also the applied Projects.

The `patcher` block is designed to increase the flexibility for platform engineers managing Workspaces. Cause the Workspace should map to the real physical environment, in the actual production practice, it's almost impossible that all the Stacks share the same platform configuration, although we want them the same. 

The values of the same fields in `patcher` will override the `default`, and one field in multiple patchers is forbidden to assign to the same Project. That is, if there are more than one `patcher` declaring the same field with different values, the applied Projects are prohibited to overlap. And, The name of `patcher` must not be `default`.

In the `patcher`, the applied Projects are assigned by the field `ProjectSelector`, which is an array of the Project names. The `ProjectSelector` is provided rather than something may like `StackSelector`, which specifies the applied Stacks. Here are the reasons. Explaining from the perspective of using Workspace, the mapping of Workspace and Stack is specified by the Kusion operation commands' users. While explaining from the perspective of the relationship among Project, Stack and Workspace, Workspace is designed for the reuse of platform-level configuration among multiple Projects. When a Project "encounters" a Workspace, it becomes a "Stack instance", which can be applied to a series of real resources. If using something like `StackSelector`, the reuse would not get realized, and Workspace would also lose its relevance. For more information of the relationship, please refer to [Project](project/overview) and [Stack](stack/overview). 

Different Module and KAM has different name, fields, and corresponding format and restrictions. When writing the configuration, check the corresponding Module's or KAM's description, and make sure all the requisite Modules and KAMs have correctly configured. Please refer to [Kuiosn Module](kusion-module/overview) and find more information. The example above gives a sample of the Module `mysql`.

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
kusion workspace update dev -f dev_new.yaml

# update a specified workspace and set it as current
kusion workspace update dev -f dev_new.yaml --current

# update the current workspace
kusion workspace update -f dev_new.yaml
```

### Deleting Workspace

When a Workspace is not in use anymore, use `kusion workspace delete ${name}` to delete a Workspace. If the `name` is not specified, the current Workspace will get deleted, and the `default` Workspace will be set as the current Workspace. Therefore, deleting the `default` Workspace is not allowed. 

The example is shown as below.

```shell
# delete a specified workspace
kusion workspace delete dev 

# delete the current workspace
kusion workspace delete
```

## Using Workspace

Workspace is used in the command `kusion generate`, the following steps help smooth the operation process.

1. Write the Workspace configuration file with the format shown above, and fulfill all the necessary fields;
2. Create the workspace with `kusion workspace create`, then Kusion perceives the Workspace. The flag `--current` can be used to set it as the current.
3. Execute `kusion generate` in a Stack to generate the whole Spec, the AppConfiguration and Workspace configuration get rendered automatically, and can be applied to the real infrastructure. If the appointed Workspace or Backend is asked, the flags `--workspace` and `--backend` will help achieve that. 
4. If the Workspace needs to update, delete, switch, etc. Use the above commands to achieve that.
