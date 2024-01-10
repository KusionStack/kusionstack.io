---
sidebar_position: 1
---

# Configuration File Overview

Kusion consumes one or more declarative configuration files (written in KCL) that describe the application, and delivers intent to the target runtime including Kubernetes, clouds, or on-prem infrastructure.

This documentation series walks you through the odds and ends of managing such configuration files.

## Table of Content
- [Directory Structure](#directory-structure)
- [AppConfiguration Model](#appconfiguration-model)
- [Authoring Configuration Files](#authoring-configuration-files)
    - [Identifying KCL file](#identifying-kcl-file)
    - [KCL Packages and imports](#kcl-packages-and-import)
    - [Understanding kcl.mod](#understanding-kclmod)
    - [Building blocks](#building-blocks)
    - [Instantiate an application](#instantiating-an-application)
    - [Using kusion init](#using-kusion-init)
    - [Using references](#using-references)

## Directory Structure

Kusion expects the configuration file to be placed in a certain directory structure because it might need some metadata (that is not stored in the application configuration itself) in order to proceed.

:::info

See [Glossary](../concepts/glossary) for more details about Project and Stack.
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
│   ├── kcl.mod.lock
│   ├── main.k
│   └── stack.yaml
├── prod
│   ├── kcl.mod
│   ├── kcl.mod.lock
│   ├── main.k
│   └── stack.yaml
└── project.yaml
```

In general, the directory structure follows a hierarchy where the top-level is the project configurations, and the sub-directories represent stack-level configurations.

You may notice there is a `base` directory besides all the stacks. The `base` directory is not mandatory, but rather a place to store common configurations between different stacks. A common pattern we observed is to use stacks to represent different stages (dev, stage, prod, etc.) in the software development lifecycle, and/or different deployment targets (azure-eastus, aws-us-east-1, etc). A project can have as many stacks as needed.

In practice, the applications deployed into dev and prod might very likely end up with a similar set of configurations except a few fields such as the application image (dev might be on newer versions), resource requirements (prod might require more resources), etc.

As a general best practice, we recommend managing the common configurations in `base.k` as much as possible to minimize duplicate code. We will cover how override works in [Base and Override](base_override).

## AppConfiguration Model

`AppConfiguration` is the out-of-the-box model we build that describes an application. It serves as the declarative intent for a given application.

The schema for `AppConfiguration` is defined in the [KusionStack/catalog](https://github.com/KusionStack/catalog) repository. It is designed as a unified, application-centric model that encapsulates the comprehensive configuration details and in the meantime, hides the complexity of the infrastructure as much as possible.

`AppConfiguration` consists of multiple sub-components that each represent either the application workload itself, its dependencies, relevant workflows or operational expectations. We will deep dive into the details on how to author each of these elements in this upcoming documentation series.

For more details on the `AppConfiguration`, please refer to the [design documentation - WIP](https://github.com/KusionStack/kusion/pull/420/files).

## Authoring Configuration Files

[KCL](https://kcl-lang.io/) is the choice of configuration language consumed by Kusion. KCL is an open source constraint-based record and functional language. KCL works well with a large number of complex configurations via modern programming language technology and practice, and is committed to provide better modularity, scalability, stability and extensibility.

### Identifying KCL file

KCL files are identified with `.k` suffix in the filename.

### KCL Packages and Import

Similar to most modern General Programming Languages (GPLs), KCL packages are used to organize collections of related KCL source files into modular and re-usable units.

In the context of Kusion, we use KCL packages to define models that could best abstract the behavior of an application. Specifically, we provide an official out-of-the-box KCL package(will keep iterating) with the name [catalog](https://github.com/KusionStack/catalog). When authoring an application configuration file, you can simply import the [catalog](https://github.com/KusionStack/catalog) package in the source code and use all the schemas (including AppConfiguration) defined in the `catalog` package.

Similarly, if the schemas in the [catalog](https://github.com/KusionStack/catalog) package does not meet your needs, you can always fork it and make modifications, then import the modified package; or create a brand new package altogether and import it.

The Kusion ecosystem can be easily expanded in this manner.

An example of the import looks like the following:
```
### import from the official catalog package
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c

### import my own modified package
import my_own_catalog.models.schema.v1 as moc
import my_other_package.schema.v1.redis as myredis
```

Take `import catalog.models.schema.v1.workload as wl` as an example, the `.models.schema.v1.workload` part after `import catalog` represents the relative path of a specific schema to import. In this case, the `workload` schemas is defined under `models/schema/v1/workload` directory in the `catalog` package.

### Understanding kcl.mod

Much similar to the concept of `go.mod`, Kusion uses `kcl.mod` as the source of truth to manage metadata (such as package name, dependencies, etc.) for the current package. Kusion will also auto-generate a `kcl.mod.lock` as the dependency lock file.

The most common usage for `kcl.mod` is to manage the dependency of your application configurations. 

:::info

Please note this `kcl.mod` will be automatically generated if you are using `kusion init` to initialize a project with a template. You will only need to modify this file if you are modifying the project metadata outside the initialization process, such as upgrading the dependency version or adding a new dependency altogether, etc.
:::info

There are 3 sections in a `kcl.mod` file:
- `package`, representing the metadata for the current package.
- `dependencies`, describing the packages the current package depend on. Supports  referencing either a git repository or an OCI artifact.
- `profile`, defining the behavior for Kusion. In the example below, it describes the list of files Kusion should look for when parsing the application configuration.

An example of `kcl.mod`:
```
[package]
name = "multi-stack-project"
edition = "0.5.0"
version = "0.1.0"

[dependencies]
catalog = { git = "https://github.com/KusionStack/catalog.git", tag = "0.1.0" }
# Uncomment the line below to use your own modified package
# my-package = ghcr.io/kcl-lang/my-package

[profile]
entries = ["../base/base.k", "main.k"]
```

### Building Blocks

Configuration files consist of building blocks that are made of instances of schemas. An `AppConfiguration` instance consists of several child schemas, most of which are optional. The only mandatory one is the `workload` instance. We will take a closer look in the [workload walkthrough](workload). The order of the building blocks does NOT matter.

The major building blocks as of version `0.9.0`:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {}
            ...
        }
        ports: []
        secrets: {}
    }
    database: d.Database{}
    monitoring: m.Prometheus{}
    opsRule: t.OpsRule {}
    ...
}
```

We will deep dive into each one of the building blocks in this documentation series.

### Instantiating an application

In Kusion's out-of-the-box experience, an application is identified with an instance of `AppConfiguration`. You may have more than one application in the same project or stack.

Here's an example of a configuration that can be consumed by Kusion (assuming it is placed inside the proper directory structure that includes project and stack configurations, with a `kcl.mod` present):

```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.network as n
import catalog.models.schema.v1.workload.container as c

gocity: ac.AppConfiguration {
    workload: wl.Service {
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
        ports: [
            n.Port {
                port: 4000
            }
        ]
    }
}
```

Don't worry about what `workload` or `ports` stand for at the moment. We will deep dive into each one of them in this upcoming documentation series.

### Using `kusion init`

Kusion offers a `kusion init` sub-command which initializes a new project using some pre-built templates, which saves you from the hassle to manually build the aforementioned directory structure that Kusion expects.

There is a built-in template `single-stack-sample` in the kusion binary that can be used offline. 

We also maintain a [kusion-templates repository](https://github.com/KusionStack/kusion-templates) that hosts a list of more comprehensive project scaffolds. You can access them via `kusion init --online` command which requires connectivity to `github.com`.

The pre-built templates are meant to help you get off the ground quickly with some simple out-of-the-box examples. You can refer to the [QuickStart documentation](../getting-started/deliver-wordpress) for some step-by-step tutorials.

### Using references

The reference documentation for the `catalog` package is located in [Reference](../reference/model/catalog_models/doc_app_configuration).

If you are using the `catalog` package out of the box, the reference documentation provides a comprehensive view for each schema involved, including all the attribute names and description, their types, default value if any, and whether a particular attribute is required or not. There will also be an example attached to each schema reference.

We will also deep dive into some common examples in the upcoming sections.