# Application Developer User Guide

## Prerequisites

To follow this guide, you will need:

- Kusion v0.12 or higher installed locally

## Workflow

As an application developer, the workflow of using a Kusion module looks like this:

1. Browse available modules registered by platform engineers in the workspace
2. Add modules you need to your Stack
3. Initialize modules
4. Apply the AppConfiguration

## Browse available modules

For all KusionStack built-in modules, you can find all available modules and documents in the [reference](../../6-reference/2-modules/index.md)

Since the platform engineers have already registered the available modules in the workspace, app developers can execute `kusion mod list` to list the available modules.

```shell
kusion mod list --workspace dev

Name      Version  URL
kawesome  0.2.0    oci://ghcr.io/kusionstack/kawesome
```

## Add modules to your Stack

Taking `kawesome` as an example, the directory structure is shown below:

```shell
example
├── dev
│   ├── example_workspace.yaml
│   ├── kcl.mod
│   ├── main.k
│   └── stack.yaml
└── project.yaml
```

Select the module you need from the result of `kusion mod list` and execute `kusion mod add kawesome` to add `kawesome` into your Stack.

Once you have added the `kawesome` module, the `kcl.mod` file will be updated to look like this.

``` toml
[package]
name = "example"

[dependencies]
kawesome = { oci = "oci://ghcr.io/kusionstack/kawesome", tag = "0.2.0" }
service = {oci = "oci://ghcr.io/kusionstack/service", tag = "0.1.0" }
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.2.0" }

[profile]
entries = ["main.k"]
```

- The `kam` dependency represents the [Kusion Application Module](https://github.com/KusionStack/kam.git) which contains the AppConfiguration.
- The `service` dependency represents the service workload module.
- The `kawesome` is the Kusion module we are going to use in the AppConfiguration.

## Initialize modules

```python
# The configuration codes in perspective of developers. 
import kam.v1.app_configuration as ac
import service
import service.container as c
import kawesome.v1.kawesome

kawesome: ac.AppConfiguration {
    # Declare the workload configurations. 
    workload: service.Service {
        containers: {
            kawesome: c.Container {
                image: "hashicorp/http-echo"
                env: {
                    "ECHO_TEXT": "$(KUSION_KAWESOME_RANDOM_PASSWORD)"
                }
            }
        }
        replicas: 1
    }
    # Declare the kawesome module configurations. 
    accessories: {
        "kawesome": kawesome.Kawesome {
            service: kawesome.Service{
                port: 5678
            }
            randomPassword: kawesome.RandomPassword {
                length: 20
            }
        }
    }
}
```

Initialize the `kawesome` module in the `accessories` block of the AppConfiguration. The key of the `accessories` item represents the module name and the value represents the actual module you required.

## Apply the result

Execute the preview command to validate the result.

```shell
kusion apply
 ✔︎  Generating Spec in the Stack dev...
Stack: dev
ID                                                     Action
hashicorp:random:random_password:example-dev-kawesome  Create
v1:Namespace:example                                   Create
v1:Service:example:example-dev-kawesome                Create
apps/v1:Deployment:example:example-dev-kawesome        Create


Do you want to apply these diffs?:
  > details
Which diff detail do you want to see?:
> all
  hashicorp:random:random_password:example-dev-kawesome Create
  v1:Namespace:example Create
  v1:Service:example:example-dev-kawesome Create
  apps/v1:Deployment:example:example-dev-kawesome Create
```