# Application Developer User Guide

## Choose modules you need

For all KusionStack built-in modules, you can find all available versions and documents in the [reference](../../6-reference/2-modules/index.md)

## Import and initialize modules

### Add dependencies

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

Before importing modules in your AppConfiguration, you should add them to the dependencies part of the `kcl.mod` file.

``` toml
[package]
name = "example"

[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.1.0" }
kawesome = { oci = "oci://ghcr.io/kusionstack/kawesome", tag = "0.1.0" }

[profile]
entries = ["main.k"]
```

The kam dependency represents the [Kusion Application Module](https://github.com/KusionStack/kam.git) which contains the AppConfiguration and other basic modules. The `kawesome` is the Kusion module we are going to use in the AppConfiguration.

### Initialize modules

```python
import kam.v1.app_configuration as ac
import kam.v1.workload as wl
import kam.v1.workload.container as c
import kawesome.kawesome as ks

kawesome: ac.AppConfiguration {
    # Declare the workload configurations. 
    workload: wl.Service {
        containers: {
            kawesome: c.Container {
                image: "hashicorp/http-echo"
            }
        }
    }
    # Declare the kawesome module configurations. 
    accessories: {
        "kawesome": ks.Kawesome {
            service: ks.Service{
                port: 5678
            }
        }
    }
}
```

Initialize the `kawesome` module in the `accessories` block of the AppConfiguration. The key of the `accessories` item represents the module name and the value represents the actual module you required.

## Preview the result

Execute the preview command to validate the result.

```shell
kusion preview
```

```shell
 ✔︎  Generating Spec in the Stack dev...                                                                                                                                                                                           
Stack: dev                                                                   
ID                                                                           Action
hashicorp:random:random_password:example-dev-kawesome                        Create
v1:Namespace:example                                                         Create
v1:Service:example:example-dev-kawesome                                      Create
apps.kusionstack.io/v1alpha1:PodTransitionRule:example:example-dev-kawesome  Create
apps.kusionstack.io/v1alpha1:CollaSet:example:example-dev-kawesome           Create


? Which diff detail do you want to see?  [Use arrows to move, type to filter]
> all
  hashicorp:random:random_password:example-dev-kawesome Create
  v1:Namespace:example Create
  v1:Service:example:example-dev-kawesome Create
  apps.kusionstack.io/v1alpha1:PodTransitionRule:example:example-dev-kawesome Create
  apps.kusionstack.io/v1alpha1:CollaSet:example:example-dev-kawesome Create
  cancel

```