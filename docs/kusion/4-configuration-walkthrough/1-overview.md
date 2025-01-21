---
id: overview
---

# Configuration File Overview

Kusion consumes one or more declarative configuration files (written in KCL) that describe the application, and delivers intent to the target runtime including Kubernetes, clouds, or on-prem infrastructure.

This documentation series walks you through the odds and ends of managing such configuration files.

## Table of Content

- [Configuration File Overview](#configuration-file-overview)
  - [Table of Content](#table-of-content)
  - [Directory Structure](#directory-structure)
  - [AppConfiguration Model](#appconfiguration-model)
  - [Authoring Configuration Files](#authoring-configuration-files)
    - [Identifying KCL file](#identifying-kcl-file)
    - [KCL Schemas and KAM](#kcl-schemas-and-kam)
    - [Kusion Modules](#kusion-modules)
    - [Import Statements](#import-statements)
    - [Understanding kcl.mod](#understanding-kclmod)
    - [Building Blocks](#building-blocks)
    - [Instantiating an application](#instantiating-an-application)
    - [Using `kusion init`](#using-kusion-init)
    - [Using references](#using-references)

## Directory Structure

Kusion expects the configuration file to be placed in a certain directory structure because it might need some metadata (that is not stored in the application configuration itself) in order to proceed.

:::info

See [Project](../concepts/project/overview) and [Stack](../concepts/stack/overview) for more details about Project and Stack.
:::

A sample multi-stack directory structure looks like the following:
```
~/playground$ tree multi-stack-project/
multi-stack-project/
├── README.md
├── base
│   └── base.k
├── dev
│   ├── kcl.mod
│   ├── main.k
│   └── stack.yaml
├── prod
│   ├── kcl.mod
│   ├── main.k
│   └── stack.yaml
└── project.yaml
```

In general, the directory structure follows a hierarchy where the top-level is the project configurations, and the sub-directories represent stack-level configurations.

You may notice there is a `base` directory besides all the stacks. The `base` directory is not mandatory, but rather a place to store common configurations between different stacks. A common pattern we observed is to use stacks to represent different stages (dev, stage, prod, etc.) in the software development lifecycle, and/or different deployment targets (azure-eastus, aws-us-east-1, etc). A project can have as many stacks as needed.

In practice, the applications deployed into dev and prod might very likely end up with a similar set of configurations except a few fields such as the application image (dev might be on newer versions), resource requirements (prod might require more resources), etc.

As a general best practice, we recommend managing the common configurations in `base.k` as much as possible to minimize duplicate code. We will cover how override works in [Base and Override](base-override).

## AppConfiguration Model

`AppConfiguration` is the out-of-the-box model we build that describes an application. It serves as the declarative intent for a given application.

The schema for `AppConfiguration` is defined in the [KusionStack/kam](https://github.com/KusionStack/kam/blob/main/v1/app_configuration.k) repository. It is designed as a unified, application-centric model that encapsulates the comprehensive configuration details and in the meantime, hides the complexity of the infrastructure as much as possible.

`AppConfiguration` consists of multiple sub-components that each represent either the application workload itself, its dependencies (in the form of [Kusion Modules](../concepts/module/overview)), relevant workflows or operational expectations. We will deep dive into the details on how to author each of these elements in this upcoming documentation series.

For more details on the `AppConfiguration`, please refer to the [design documentation](../concepts/app-configuration).

## Authoring Configuration Files

[KCL](https://kcl-lang.io/) is the choice of configuration language consumed by Kusion. KCL is an open-source constraint-based record and functional language. KCL works well with a large number of complex configurations via modern programming language technology and practice, and is committed to provide better modularity, scalability, stability and extensibility.

### Identifying KCL file

KCL files are identified with `.k` suffix in the filename.

### KCL Schemas and KAM

Similar to most modern General Programming Languages (GPLs), KCL provide packages that are used to organize collections of related KCL source files into modular and re-usable units.

In the context of Kusion, we abstracted a core set of KCL Schemas (such as the aforementioned `AppConfiguration`, `Workload`, `Container`, etc)that represent the concepts that we believe that are relatively universal and developer-friendly, also known as [Kusion Application Model](https://github.com/KusionStack/kam), or KAM.

### Kusion Modules

To extend the capabilities beyond the core KAM model, we use a concept known as [Kusion Modules](../concepts/module/overview) to define components that could best abstract the capabilities during an application delivery. We provide a collection of official out-of-the-box Kusion Modules that represents the most common capabilities. They are maintained in [KusionStack's GitHub container registry](https://github.com/orgs/KusionStack/packages). When authoring an application configuration file, you can simply declare said Kusion Modules as dependencies and import them to declare ship-time capabilities that the application requires.

If the modules in the KusionStack container registry does not meet the needs of your applications, Kusion provides the necessary mechanisms to extend with custom-built Kusion Modules. You can always create and publish your own module, then import the new module in your application configuration written in KCL.

For the steps to develop your own module, please refer to the Module developer guide.

### Import Statements

An example of the import looks like the following:
```
### import from the official kam package
import kam.v1.app_configuration as ac

### import kusion modules
import service
import service.container as c
import monitoring as m
import network as n
```

Take `import kam.v1.app_configuration as ac` as an example, the `.v1.app_configuration` part after `import kam` represents the relative path of a specific schema to import. In this case, the `AppConfiguration` schema is defined under `v1/app_configuration` directory in the `kam` package.

### Understanding kcl.mod

Much similar to the concept of `go.mod`, Kusion uses `kcl.mod` as the source of truth to manage metadata (such as package name, dependencies, etc.) for the current package. Kusion will also auto-generate a `kcl.mod.lock` as the dependency lock file.

The most common usage for `kcl.mod` is to manage the dependency of your application configuration file. 

:::info

Please note this `kcl.mod` will be automatically generated if you are using `kusion init` to initialize a project with a template. You will only need to modify this file if you are modifying the project metadata outside the initialization process, such as upgrading the dependency version or adding a new dependency altogether, etc.
:::info

There are 3 sections in a `kcl.mod` file:
- `package`, representing the metadata for the current package.
- `dependencies`, describing the packages the current package depends on. Supports referencing either a git repository or an OCI artifact.
- `profile`, defining the behavior for Kusion. In the example below, it describes the list of files Kusion should look for when parsing the application configuration.

An example of `kcl.mod`:
```
[package]
name = "multi-stack-project"
edition = "0.5.0"
version = "0.1.0"

[dependencies]
monitoring = { oci = "oci://ghcr.io/kusionstack/monitoring", tag = "0.1.0" }
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.1.0" }
# Uncomment the line below to use your own modified module
# my-module = { oci = "oci://ghcr.io/my-repository/my-package", tag = "my-version" }

[profile]
entries = ["../base/base.k", "main.k"]
```

### Building Blocks

Configuration files consist of building blocks that are made of instances of schemas. An `AppConfiguration` instance consists of several child schemas, most of which are optional. The only mandatory one is the `workload` instance. We will take a closer look in the [workload walkthrough](workload). The order of the building blocks does NOT matter.

The major building blocks as of version `0.12.0`:
```
myapp: ac.AppConfiguration {
    workload: service.Service {
        containers: {
            "myapp": c.Container {}
            ...
        }
        secrets: {}
        ...
    }
    # optional dependencies, usually expressed in kusion modules
    accessories: {
        ...
    }
    ...
}
```

We will deep dive into each one of the building blocks in this documentation series.

### Instantiating an application

In Kusion's out-of-the-box experience, an application is identified with an instance of `AppConfiguration`. You may have more than one application in the same project or stack.

Here's an example of a configuration that can be consumed by Kusion (assuming it is placed inside the proper directory structure that includes project and stack configurations, with a `kcl.mod` present):

```
import kam.v1.app_configuration as ac
import service
import service.container as c
import network as n

gocity: ac.AppConfiguration {
    workload: service.Service {
        containers: {
            "gocity": c.Container {
                image = "howieyuen/gocity:latest"
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
            }
        }
        replicas: 1
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                    public: True
                }
            ]
        }
    }
}
```

Don't worry about what `workload` or `n.Network` stand for at the moment. We will deep dive into each one of them in this upcoming documentation series.

### Using `kusion init`

Kusion offers a `kusion init` sub-command which initializes a new project using a pre-built template, which saves you from the hassle of manually building the aforementioned directory structure that Kusion expects.

There is a built-in template `quickstart` in the Kusion binary that can be used offline. 

The pre-built templates are meant to help you get off the ground quickly with some simple out-of-the-box examples. You can refer to the [QuickStart documentation](../2-getting-started/2-getting-started-with-kusion-cli/1-deliver-quickstart.md) for some step-by-step tutorials.

### Using references

The reference documentation for the `kam` package and the official Kusion Modules is located in [Reference](../reference/modules/developer-schemas/app-configuration).

If you are using them out of the box, the reference documentation provides a comprehensive view for each schema involved, including all the attribute names and description, their types, default value if any, and whether a particular attribute is required or not. There will also be an example attached to each schema reference.

We will also deep dive into some common examples in the upcoming sections.