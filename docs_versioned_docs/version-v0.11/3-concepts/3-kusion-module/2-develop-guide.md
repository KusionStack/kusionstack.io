# Platform Engineer Develop Guide

## Prerequisites

To follow this guide, you will need:

- Go 1.22 or higher installed and configured
- Kusion v0.11.0 or higher installed locally

## Workflow

As a platform engineer, the workflow of developing a Kusion module looks like this:

1. Communicate with app developers and identify the fields that should exposed to them in the dev-orient schema
2. Identify module input parameters that should be configured by platform engineers in the [workspace](../workspace)
3. Define the app dev-orient schema
4. Develop the module by implementing gRPC interfaces

The first two steps primarily involve communication with the application development team, and the specific details are not included in this tutorial. This tutorial begins with the subsequent two steps.

## Set up a developing environment

Developing a Kusion module includes defining a KCL schema and developing a module binary in golang. We will provide a scaffold repository and a new command `kusion mod init` to help developers set up the developing environment easily.

After executing the command

```shell
kusion mod init <your-module-name>
```

Kusion will download a [scaffold repository](https://github.com/KusionStack/kusion-module-scaffolding) and rename this project with your module name. The scaffold contains code templates and all files needed for developing a Kusion module.

## Developing

The scaffold repository directory structure is shown below:

```shell
$ tree kawesome/
.
├── example
│   ├── dev
│   │   ├── example_workspace.yaml
│   │   ├── kcl.mod
│   │   ├── main.k
│   │   └── stack.yaml
│   └── project.yaml
├── kawesome.k
├── kcl.mod
└── src
    ├── Makefile
    ├── go.mod
    ├── go.sum
    ├── kawesome_generator.go
    └── kawesome_generator_test.go
```

When developing a Kusion module with the scaffold repository, you could follow the steps below:

1. **Define module name.** Rename `go.mod` module and related files to your Kusion module name. We assume the module named is `kawesome` in this guide.
2. **Define the dev-orient schemas**. They would be initialized by app developers. In this scaffold repository, we've defined a schema named Kawesome in `kawesome.k` that consists of two resources `Service` and `RandomPassword` and they will be generated into a Kubernetes Service and a Terraform RandomPassword later.

```python
schema Kawesome: 
""" Kawesome is a sample module schema consisting of Service
and RandomPassword

Attributes
----------
service: Service, default is Undefined, required. 
    The exposed port of Workload, which will be generated into Kubernetes Service. 
randomPassword: RandomPassword, default is Undefined, required. 
    The sensitive random string, which will be generated into Terraform random_password. 

Examples
--------
import kawesome as ks

accessories: {
    "kusionstack/kawesome@v0.1.0": ks.Kawesome {
        service: ks.Service {
            port: 8080
        }
        randomPassword: ks.RandomPassword {
            length: 20
        }
    }
}
"""

# The exposed port of Workload, which will be generated into Kubernetes Service. 
service:                    Service

# The sensitive random string, which will be generated into Terraform random_password. 
randomPassword:             RandomPassword
```

3. **Implement the gRPC generate interface.** The `generate` interface consumes the application developer's config described in the [`AppConfiguration`](../app-configuration) and the platform engineer's config described in the [`workspace`](../workspace) to generate all infrastructure resources represented by this module.

```go
func (k *Kawesome) Generate(_ context.Context, request *module.GeneratorRequest) (*module.GeneratorResponse, error){
    // generate your infrastructure resoruces
}

// Patcher contains fields should be patched into the workload corresponding fields
type Patcher struct {
    // Environments represent the environment variables patched to all containers in the workload.
    Environments []v1.EnvVar `json:"environments" yaml:"environments"`
    // Labels represent the labels patched to both the workload and pod.
    Labels map[string]string `json:"labels" yaml:"labels"`
    // Annotations represent the annotations patched to both the workload and pod.
    Annotations map[string]string `json:"annotations" yaml:"annotations"`
}
```

The `GeneratorRequest` contains the application developer's config, platform engineer's config, workload config and related metadata a module could need to generate infrastructure resources.
In the `GeneratorResponse`, there are two fields, `Resources` and `Patchers`. The `Resource` represents resources that should operated by Kusion and they will be appended into the [Spec](../spec). The `Patchers` are used to patch other resources. In this version, Kusion will parse them and patch workload corresponding fields.

## Publish

Publish the Kusion module to an OCI registry with the command `kusion mod push`.

Publish a stable version
```shell
kusion mod push /path/to/your-module oci://ghcr.io/kusionstack/kawesome --version=1.0.0 --latest=true --creds <YOUR_TOKEN>
```

Publish a pre-release version
```shell
kusion mod push /path/to/your-module oci://ghcr.io/kusionstack/kawesome --version=1.0.0-rc.1 --latest=false --creds <YOUR_TOKEN>
```

:::info
Please ensure that your token has the appropriate permissions to write to the registry.
:::

More details can be found in the `kusion mod push` reference doc.

## Initialize the workspace

```yaml
modules: 
  kusionstack/kawesome@0.1.0: 
    default: 
      service: 
        labels: 
          kusionstack.io/module-name: kawesome
```

Initialize module platform configuration in the `workspace.yaml` to standardize the module's behavior. Please notice the key of this module should match this format: `namespace/moduleName@version`