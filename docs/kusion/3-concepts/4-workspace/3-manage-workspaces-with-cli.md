# Managing Workspace With CLI

The subcommands of `kusion workspace` are used to manage Workspaces, including `create`, `show`, `list`, `switch`, `update` and `delete`. Beause the Workspace configurations are stored persistently, the current or a specified Backend will be used. For more information of Backend, please refer to [Backend](../7-backend/1-overview.md).

Kusion will create a `default` Workspace with empty configuration in every Backend automatically, and set it as the current. When first using Kusion, or no configuration of Workspace, the `default` Workspace will be used.  

## Creating Workspace

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

## Listing Workspace

Use `kusion workspace list` to get all the workspace names.

The example is shown as below. In order to simplify, The following examples will not give using specified backend, which is supported by `--backend` flag.

```shell
# list all the workspace names
kusion workspace list
```

## Switching Workspace

In order not to specify the Workspace name for each Kusion operation command, `kusion workspace switch ${name}` is provided to switch the current Workspace. Then when executing `kusion generate`, the current Workspace will be used. The to-switch Workspace must be created.

The example is shown as below.

```shell
# switch workspace
kusion workspace switch dev
```

## Showing Workspace

Use `kusion workspace show ${name}` to get the Workspace configuration. If the `name` is not specified, the configuration of current Workspace will get returned.

The example is shown as below.

```shell
# show a specified workspace configuration
kusion workspace show dev

# show the current workspace configuration
kusion workspace show
```

## Updating Workspace

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

## Deleting Workspace

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
