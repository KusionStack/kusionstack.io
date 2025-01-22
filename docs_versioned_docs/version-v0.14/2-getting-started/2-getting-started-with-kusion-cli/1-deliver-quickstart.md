---
id: deliver-quickstart
---

# Run Your First App on Kubernetes with Kusion CLI

In this tutorial, we will walk through how to deploy a quickstart application on Kubernetes with Kusion. The demo application can interact with a locally deployed MySQL database, which is declared as an accessory in the config codes and will be automatically created and managed by Kusion. 

## Prerequisites

Before we start to play with this example, we need to have the Kusion CLI installed and run an accessible Kubernetes cluster. Here are some helpful documents: 

- Install [Kusion CLI](../1-install-kusion.md). 
- Run a [Kubernetes](https://kubernetes.io) cluster. Some light and convenient options for Kubernetes local deployment include [k3s](https://docs.k3s.io/quick-start), [k3d](https://k3d.io/v5.4.4/#installation), and [MiniKube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node). 

## Initialize Project

We can start by initializing this tutorial project with `kusion init` cmd. 

```shell
# Create a new directory and navigate into it. 
mkdir quickstart && cd quickstart

# Initialize the demo project with the name of the current directory. 
kusion init
```

The created project structure looks like below: 

```shell
tree
.
├── default
│   ├── kcl.mod
│   ├── main.k
│   └── stack.yaml
└── project.yaml

2 directories, 4 files
```

:::info
More details about the project and stack structure can be found in [Project](../../3-concepts/1-project/1-overview.md) and [Stack](../../3-concepts/2-stack/1-overview.md). 
:::

### Review Configuration Files

Now let's have a glance at the configuration codes of `default` stack: 

```shell
cat default/main.k
```

```python
import kam.v1.app_configuration as ac
import service
import service.container as c
import network as n

# main.k declares the customized configuration codes for default stack.
quickstart: ac.AppConfiguration {
    workload: service.Service {
        containers: {
            quickstart: c.Container {
                image: "kusionstack/kusion-quickstart:latest"
            }
        }
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 8080
                }
            ]
        }
    }
}
```

The configuration file `main.k`, usually written by the **App Developers**, declares the customized configuration codes for `default` stack, including an `AppConfiguration` instance with the name of `quickstart`. The `quickstart` application consists of a `Workload` with the type of `service.Service`, which runs a container named `quickstart` using the image of `kusionstack/kusion-quickstart:latest`. 

Besides, it declares a **Kusion Module** with the type of `network.Network`, exposing `8080` port to be accessed for the long-running service. 

The `AppConfiguration` model can hide the major complexity of Kubernetes resources such as `Namespace`, `Deployment`, and `Service` which will be created and managed by Kusion, providing the concepts that are **application-centric** and **infrastructure-agnostic** for a more developer-friendly experience. 

:::info
More details about the `AppConfiguration` model and built-in Kusion Module can be found in [kam](https://github.com/KusionStack/kam) and [catalog](https://github.com/KusionStack/catalog). 
:::

The declaration of the dependency packages can be found in `default/kcl.mod`: 

```shell
cat default/kcl.mod
```

```shell
[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.2.0" }
service = {oci = "oci://ghcr.io/kusionstack/service", tag = "0.1.0" }
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.2.0" }
```

:::info
More details about the application model and module dependency declaration can be found in [Kusion Module guide for app dev](../../3-concepts/3-module/3-app-dev-guide.md). 
:::

:::tip
The specific module versions we used in the above demonstration is only applicable for Kusion CLI after **v0.12.0**. 
:::

## Application Delivery

Use the following command to deliver the quickstart application in `default` stack on your accessible Kubernetes cluster, while watching the resource creation and automatically port-forwarding the specified port (8080) from local to the Kubernetes Service of the application. We can check the details of the resource preview results before we confirm to apply the diffs. 

```shell
cd default && kusion apply --port-forward 8080
```

![](/img/docs/user_docs/getting-started/kusion_apply_quickstart_0.12.gif)

:::info
During the first apply, the models and modules that the application depends on will be downloaded, so it may take some time (usually within one minute). You can take a break and have a cup of coffee. 
:::

:::info
Kusion by default will create the Kubernetes resources of the application in the namespace the same as the project name. If you want to customize the namespace, please refer to [Project Namespace Extension](../../3-concepts/1-project/2-configuration.md#kubernetesnamespace) and [Stack Namespace Extension](../../3-concepts/2-stack/2-configuration.md#kubernetesnamespace). 
:::

Now we can visit [http://localhost:8080](http://localhost:8080) in our browser and play with the demo application! 

![](/img/docs/user_docs/getting-started/quickstart_page.png)

## Add MySQL Accessory

As you can see, the demo application page indicates that the MySQL database is not ready yet. Hence, we will now add a MySQL database as an accessory for the workload. 

We can add the Kusion-provided built-in dependency in the `default/kcl.mod`, so that we can use the `MySQL` module in the configuration codes. 

```shell
[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.2.0" }
service = {oci = "oci://ghcr.io/kusionstack/service", tag = "0.1.0" }
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.2.0" }
mysql = { oci = "oci://ghcr.io/kusionstack/mysql", tag = "0.2.0" }
```

We can update the `default/main.k` with the following configuration codes: 

```python
import kam.v1.app_configuration as ac
import service
import service.container as c
import network as n
import mysql

# main.k declares the customized configuration codes for default stack. 
quickstart: ac.AppConfiguration {
    workload: service.Service {
        containers: {
            quickstart: c.Container {
                image: "kusionstack/kusion-quickstart:latest"
                env: {
                    "DB_HOST": "$(KUSION_DB_HOST_QUICKSTART_DEFAULT_QUICKSTART_MYSQL)"
                    "DB_USERNAME": "$(KUSION_DB_USERNAME_QUICKSTART_DEFAULT_QUICKSTART_MYSQL)"
                    "DB_PASSWORD": "$(KUSION_DB_PASSWORD_QUICKSTART_DEFAULT_QUICKSTART_MYSQL)"
                }
            }
        }
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 8080
                }
            ]
        }
        "mysql": mysql.MySQL {
            type: "local"
            version: "8.0"
        }
    }
}
```

The configuration codes above declare a local `mysql.MySQL` with the engine version of `8.0` as an accessory for the application workload. The necessary Kubernetes resources for deploying and using the local MySQL database will be generated and users can get the `host`, `username` and `password` of the database through the [MySQL Credentials And Connectivity](../../6-reference/2-modules/1-developer-schemas/database/mysql.md#credentials-and-connectivity) of Kusion in application containers. 

:::info
For more information about the naming convention of Kusion built-in MySQL module, you can refer to [Module Naming Convention](../../6-reference/2-modules/3-naming-conventions.md). 
:::

After that, we can re-apply the application, and we can set the `--watch=false` to skip watching the resources to be reconciled: 

```shell
kusion apply --port-forward 8080 --watch=false
```

![](/img/docs/user_docs/getting-started/kusion_re_apply_quickstart_0.12.gif)

:::info
You may wait another minute to download the MySQL Module. 
:::

Let's visit [http://localhost:8080](http://localhost:8080) in our browser, and we can find that the application has successfully connected to the MySQL database. The connection information is also printed on the page. 

![](/img/docs/user_docs/getting-started/quickstart_page_with_mysql.png)

Now please feel free to enjoy the demo application!

![](/img/docs/user_docs/getting-started/quickstart_mysql_validation.gif)

## Delete Application

We can delete the quickstart demo workload and related accessory resources with the following cmd: 

```shell
kusion destroy --yes
```

![](/img/docs/user_docs/getting-started/kusion_destroy_quickstart.gif)
