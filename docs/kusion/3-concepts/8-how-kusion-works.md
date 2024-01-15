---
id: how-kusion-works
sidebar_label: How Kusion Works?
---

# How Kusion Works?

Kusion is the platform engineering engine of [KusionStack](https://github.com/KusionStack). It delivers intentions described with Kusion Modules defined in [Catalog](https://github.com/KusionStack/catalog) to Kubernetes, Clouds and On-Prem infrastructures.

![arch](https://raw.githubusercontent.com/KusionStack/kusion/main/docs/workflow.png)

## Overview

The workflow of KusionStack is illustrated in the diagram above, and it consists of three steps. The first step is `Write`, where platform engineers provide Kusion Modules and application developers write AppConfigurations based on the Kusion Modules to describe their operational intent.

The second step is the `Build` process, which results in the creation of the SSoT (Single Source of Truth), also known as the [Intent](intent) of the current operational task. If you need version management of the SSoT, we recommend you manage the Intent with a VCS (Version Control System) tool like git.

The third step is `Apply` which makes the Intent effective. Kusion parses the operational intent based on the Intent produced in the previous step. Before applying the intent, Kusion will execute the Preview command (you can also execute this command manually) which will use a three-way diff algorithm to preview changes and prompt users to make sure all changes meet expectations; the Apply command will then actualize the operational intent onto various infrastructure platforms. Currently, it supports three runtimes: Terraform, Kubernetes, and on-prem infrastructures.

As a user of Kusion, if you prefer not to be conscious of so many steps, you can simply use `kusion apply`, and Kusion will automatically execute all the aforementioned steps for you.

## Platform Developer’s Workflow

### Design Kusion Modules

[Kusion Module](kusion-module) is a reusable building block designed by platform engineers and contains two components: an application developer-oriented schema and a Kusion module generator. When platform engineers have developed a Kusion module, they can push it to a [catalog](https://github.com/KusionStack/catalog) repository to make it into a KCL package.

Given a database Kusion module as an example, the schema definition is shown below and the generator logic can be found [here](https://github.com/KusionStack/kusion/blob/main/pkg/modules/generators/accessories/database_generator.go).

```python
schema MySQL: 
    """ MySQL describes the attributes to locally deploy or create a cloud provider
    managed mysql database instance for the workload. 

    Attributes
    ----------
    type: "local" | "cloud", defaults to Undefined, required. 
        Type defines whether the mysql database is deployed locally or provided by 
        cloud vendor. 
    version: str, defaults to Undefined, required. 
        Version defines the mysql version to use. 

    Examples
    --------
    Instantiate a local mysql database with version of 5.7. 

    import models.schema.v1.accessories.mysql

    mysql: mysql.MySQL {
        type: "local"
        version: "5.7"
    }
    """

    # The deployment mode of the mysql database. 
    type:       "local" | "cloud"

    # The mysql database version to use. 
    version:    str
```
  
### Instantiate and Set Up Workspaces

Each [workspace](workspace) includes a corresponding Platform config file maintained by platform engineers.
Platform engineers should instantiate all workspaces and fulfill all fields with platform default values. Kusion will merge the workspace configuration with AppConfiguration in the Stack of the same name. An example is as follows.

```yaml
runtimes: 
   # your kubeconfig file path
  kubernetes:
    kubeConfig: /etc/kubeconfig.yaml
   # metadat of used terraform providers
  terraform: 
    random: 
      version: 3.5.1
      source: hashicorp/random
    aws: 
      version: 5.0.1
      source: hashicorp/aws
      region: us-east-1

modules: 
  # platform configuration of AWS RDS MySQL
  mysql: 
    default: 
      cloud: aws
      size: 20
      instanceType: db.t3.micro
      privateRouting: false
      suffix: "-mysql"
```

The `mysql` block represents a Kusion module. The fields inside are parts of the inputs for the Kusion module generator. For more details about the workspace, please refer to the [workspace](workspace) section.

## Application Developer’s Workflow

### Instantiate AppConfiguration and Apply

Application developers choose Kusion modules they need and instantiate them in the AppConfiguration to describe their operation intentions. We have built some built-in Kusion modules in the repository [Catalog](https://github.com/KusionStack/catalog) and we warmly welcome you to join us in building this ecosystem together.

`main.k` is the **only** configuration maintained by application developers and schemas in this file are defined from the application developer's perspective to reduce their cognitive load. An example is as follows.

```pthyon
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.network as n
import catalog.models.schema.v1.accessories.mysql

# main.k declares customized configurations for dev stacks.
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            wordpress: c.Container {
                image: "wordpress:6.3"
                env: {
                    "WORDPRESS_DB_HOST": "$(KUSION_DB_HOST_WORDPRESS_MYSQL)"
                    "WORDPRESS_DB_USER": "$(KUSION_DB_USERNAME_WORDPRESS_MYSQL)"
                    "WORDPRESS_DB_PASSWORD": "$(KUSION_DB_PASSWORD_WORDPRESS_MYSQL)"
                    "WORDPRESS_DB_NAME": "mysql"
                }
                ......
            }
        }
        ......
    }
    database: {
        wordpress: mysql.MySQL {
            type: "cloud"
            version: "8.0"
        }
    }
}
```

`workload` and `database` are both Kusion modules provided by platform engineers and Kusion will convert them into actual infrastructure API calls eventually.

Finally, application developers can deliver their operational intent to infrastructures with one command `kusion apply`.
