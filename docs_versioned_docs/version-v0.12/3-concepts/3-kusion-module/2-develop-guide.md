# Platform Engineer Develop Guide

## Prerequisites

To follow this guide, you will need:

- Go 1.22 or higher installed and configured
- Kusion v0.12 or higher installed locally

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

1. **Define the module name and version** 
   - For go files. Rename the module name in the `go.mod` and related files to your Kusion module name.
   ```yaml
    module kawsome
    go 1.22
    require (
        ...
    )
   ```
   - For KCL files. Rename package name and version in the `kcl.mod`
   ```toml
    [package]
    name = "kawesome"
    version = 0.1.0
   ```

    We assume the module named is `kawesome` and the version is `0.1.0` in this guide.

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

... ...

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
"""

# The exposed port of Workload, which will be generated into Kubernetes Service. 
service:                    Service

# The sensitive random string, which will be generated into Terraform random_password. 
randomPassword:             RandomPassword
```

3. **Implement the [gRPC proto](https://github.com/KusionStack/kusion/blob/main/pkg/modules/proto/module.proto) generate interface.** The `generate` interface consumes the application developer's config described in the [`AppConfiguration`](../app-configuration) and the platform engineer's config described in the [`workspace`](../workspace) to generate all infrastructure resources represented by this module.

```go
func (k *Kawesome) Generate(_ context.Context, request *module.GeneratorRequest) (*module.GeneratorResponse, error) {
    // generate your infrastructure resoruces
}

// Patcher primarily contains patches for fields associated with Workloads, and additionally offers the capability to patch other resources.
type Patcher struct {
	// Environments represent the environment variables patched to all containers in the workload.
	Environments []v1.EnvVar `json:"environments,omitempty" yaml:"environments,omitempty"`
	// Labels represent the labels patched to the workload.
	Labels map[string]string `json:"labels,omitempty" yaml:"labels,omitempty"`
	// PodLabels represent the labels patched to the pods.
	PodLabels map[string]string `json:"podLabels,omitempty" yaml:"podLabels,omitempty"`
	// Annotations represent the annotations patched to the workload.
	Annotations map[string]string `json:"annotations,omitempty" yaml:"annotations,omitempty"`
	// PodAnnotations represent the annotations patched to the pods.
	PodAnnotations map[string]string `json:"podAnnotations,omitempty" yaml:"podAnnotations,omitempty"`
	// JSONPatchers represents patchers that can be patched to an arbitrary resource.
	// The key of this map represents the ResourceId of the resource to be patched.
	JSONPatchers map[string]JSONPatcher `json:"jsonPatcher,omitempty" yaml:"jsonPatcher,omitempty"`
}
```

The `GeneratorRequest` contains the application developer's config, platform engineer's config, workload config and related metadata a module could need to generate infrastructure resources.
In the `GeneratorResponse`, there are two fields, `Resources` and `Patchers`. The `Resource` represents resources that should operated by Kusion and they will be appended into the [Spec](../spec). The `Patchers` are used to patch the workload and other resources.

## Publish

Publish the Kusion module to an OCI registry with the command `kusion mod push`.

Publish a stable version
```shell
kusion mod push /path/to/my-module oci://<domain>/<org> --creds <YOUR_TOKEN>
```

Publish a module of a specific OS arch
```shell
kusion mod push /path/to/my-module oci://<domain>/<org> --os-arch==darwin/arm64 --creds <YOUR_TOKEN>
```

Publish a pre-release version
```shell
kusion mod push /path/to/my-module oci://<domain>/<org> --latest=false --creds <YOUR_TOKEN>
```

:::info
The OCI URL format is `oci://<domain>/<org>` and please ensure that your token has permissions to write to the registry.
:::

More details can be found in the `kusion mod push` reference doc.

## Register to the workspace

```yaml
modules: 
  kawesome: 
    path: oci://ghcr.io/kusionstack/kawesome
    version: 0.2.0
    configs: 
      default: 
        service: 
          labels: 
            kusionstack.io/module-name: kawesome
          annotations: 
            kusionstack.io/module-version: 0.2.0
```

Register module platform configuration in the `workspace.yaml` to standardize the module's behavior. App developers can list all available modules registered in the workspace.