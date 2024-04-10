---
id: deliver-wordpress
---

# Deliver the WordPress Application on Kubernetes

In this tutorial we will walk through how to deploy a WordPress application on Kubernetes with Kusion. The WordPress application will interact with a locally deployed MySQL, which is declared as a database accessory in the config codes and will be automatically created and managed by Kusion. 

## Prerequisites

Before we start to play with this example, we need to have the Kusion CLI installed and run a Kubernetes cluster. Here are some helpful documentations: 

- Install [Kusion](./1-install-kusion.md) CLI
- Install [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) CLI and run a [Kubernetes](https://kubernetes.io/) cluster. Some light and convenient options for local deployment include [k3s](https://docs.k3s.io/quick-start), [k3d](https://k3d.io/v5.4.4/#installation), and [MiniKube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/). 

## Init Workspace

To deploy the WordPress application, we need to first initiate a `Workspace` for the targeted stack (we are using `dev` here). Please copy the following example YAML file to your local `workspace.yaml`. 

`workspace.yaml`
```yaml
# example workspace configs for local mysql database
runtimes: 
  kubernetes: 
    kubeConfig: /etc/kubeconfig.yaml # Please replace with your own kubeconfig file path

modules: 
  mysql: 
    default: 
      suffix: "-mysql" # The suffix of the MySQL database name
```

You can replace the `runtimes.kubernetes.kubeConfig` field with your own kubeconfig file path in `workspace.yaml` and execute the following command line to initiate the workspace configuration for `dev` stack. 

```shell
kusion workspace create dev -f workspace.yaml
```

You can use the following command lines to list and show the workspace configurations for `dev` stack. 

```shell
kusion workspace list

kusion workspace show dev
```

The `workspace.yaml` is a sample configuration file for workspace management, including `Kubernetes` runtime config and `MySQL` module config. Workspace configurations are usually declared by **Platform Engineers** and will take effect through the corresponding stack. 

:::info
More details about the configuration of Workspace can be found in [Workspace Management](https://github.com/KusionStack/kusion/blob/main/docs/design/workspace_management/workspace_management.md). 
:::

## Init Project

We can start by initializing this tutorial project with online templates: 

```shell
kusion init --online
```

All init templates are listed as follows: 

```shell
➜  kusion_playground kusion init --online
? Please choose a template: wordpress-local-db         A sample wordpress project with local database
This command will walk you through creating a new kusion project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

Project Config:
? ProjectName: wordpress-local-db
? AppName: wordpress
Stack Config: dev
? Image: wordpress:6.3
Created project 'wordpress-local-db'
```

Please select `wordpress-local-db` and press `Enter`, after which we will see the hints below and use the default values to configure this project and stack. 

![](/img/docs/user_docs/getting-started/init-wordpress-local-db.gif)

The directory structure looks like the following: 

```shell
cd wordpress-local-db/dev && tree
```

```shell
➜  kusion_playground cd wordpress-local-db/dev && tree
.
├── kcl.mod
├── main.k
└── stack.yaml

1 directory, 3 files
```

:::info
More details about the directory structure can be found in [Project](../3-concepts/1-project/1-overview.md) and [Stack](../3-concepts/2-stack/1-overview.md). 
:::

### Review Configuration Files

Now let's have a glance at the configuration file of `dev/main.k`: 

```python
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.network as n
import catalog.models.schema.v1.accessories.mysql

# main.k declares customized configurations for dev stack.
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
            }
        }
        replicas: 1
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
    database: {
        wordpress: mysql.MySQL {
            type: "local"
            version: "8.0"
        }
    }
}
```

The configuration file `main.k`, usually written by the **App Developers**, declares customized configurations for `dev` stack, which includes an `AppConfiguration` with the name of `wordpress`. And the `wordpress` application includes a workload of type `workload.Service`, which runs on 1 replica and exposes `80` port to be accessed. Besides, it declares a local `mysql.MySQL` as the database accessory with the engine version of `8.0` for the application. The necessary Kubernetes resources for deploying and using the local database will be generated, and users can get the `host`, `username` and `paasword` of the database through the [mysql credentials and connectivity](../6-reference/2-modules/1-catalog-models/database/mysql.md#credentials-and-connectivity) of Kusion in application containers. 

This model hides the major complexity of Kubernetes resources such as `Namespace`, `Deployment` and `Service`, providing the concepts that are application-centric and infrastructure-agnostic. 

:::info
More details about the Models can be found in [Catalog](https://github.com/KusionStack/catalog)
:::

:::info
The collaboration paradigm between App Developers and Platform Engineers with Kusion can be found in [Collaboration Paradigm](https://github.com/KusionStack/kusion/blob/main/docs/design/collaboration/collaboration_paradigm.md)
:::

## Application Delivery

```shell
kusion apply --watch
```

We will deliver the WordPress application in the `wordpress-local-db/dev` folder into the Kubernetes cluster with one command `kusion apply --watch`. 

![](/img/docs/user_docs/getting-started/apply-wordpress-local-db.gif)

Check `Deployment` status. 

```shell
kubectl -n wordpress-local-db get deployment
```

The expected output is shown as follows: 

```shell
➜  dev kubectl -n wordpress-local-db get deployment
NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
wordpress-local-db-dev-wordpress   1/1     1            1           2m56s
wordpress-mysql                    1/1     1            1           2m56s
```

In the above two resources, `wordpress-local-db-dev-wordpress` corresponds to the Kubernetes `Deployment` of the WordPress application, while `wordpress-mysql` corresponds to the `Deployment` of the local MySQL database. 

Port-forward our WordPress with the `Service`. 

```shell
kubectl port-forward -n wordpress-local-db service/wordpress-local-db-dev-wordpress-private 12345:80
```

```shell
➜  dev kubectl port-forward -n wordpress-local-db service/wordpress-local-db-dev-wordpress-private 12345:80
Forwarding from 127.0.0.1:12345 -> 80
Forwarding from [::1]:12345 -> 80

```

Now we can visit [http://localhost:12345](http://localhost:12345) in our browser and enjoy!

![](/img/docs/user_docs/getting-started/wordpress-site-page.png)

## Delete WordPress Application

We can delete the WordPress application and related database resources using the following command line: 

```shell
kusion destroy --yes
```

![](/img/docs/user_docs/getting-started/destroy-wordpress-local-db.gif)
