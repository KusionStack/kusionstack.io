---
id: deliver-quickstart
---

# Run Your First App on Kubernetes with Kusion Server

In this tutorial, we will walk through how to deploy a quickstart application on Kubernetes with Kusion. The demo application only contains the `Namespace`, `Deployment`, and `Service` resources necessary for a long-running service workload. 

## Prerequisites

Before we start to play with this example, we need to have the Kusion Server installed and run an accessible Kubernetes cluster. Here are some helpful documents: 

- Install [Kusion Server](../1-install-kusion.md). 
- Run a [Kubernetes](https://kubernetes.io) cluster. Some light and convenient options for Kubernetes local deployment include [k3s](https://docs.k3s.io/quick-start), [k3d](https://k3d.io/v5.4.4/#installation), and [MiniKube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node). 

## Initialize Backend, Source, and Workspace

We can start this tutorial with the initialization of `Backend`, `Source`, and `Workspace` on Kusion. 

First, create a `Backend` with local file system as Kusion's storage 👇 

![create local backend](/img/docs/user_docs/getting-started/create_local_backend.png)

Second, set the sample repository `konfig` we provided as the `Source` of application configuration codes 👇

![create konfig source](/img/docs/user_docs/getting-started/create_konfig_source.png)

Then, create a `Workspace` named `dev` which can correspond to the development environment of the application. After it is created, we can copy the following example configurations into the `workspace.yaml`. This configuration declares the `Kusion Modules` that can be used in the application config codes, and specifies the Kubernetes cluster associated with this `Workspace`. 

![create dev workspace](/img/docs/user_docs/getting-started/create_dev_workspace.png)

```yaml
# This is a sample of a `workspace.yaml` configuration, in which three Kusion Modules (kam, service, and network) and 
# their specified versions are declared, along with the Kubernetes cluster bound to this workspace. 
# Usually, applications deployed to this workspace can only use the Kusion Modules declared in the `workspace.yaml`. 
modules:
  kam:
    path: git://github.com/KusionStack/kam
    version: 0.2.2
    configs:
      default: {}
  service:
    path: oci://ghcr.io/kusionstack/service
    version: 0.2.1
    configs:
      default: {}
  network:
    path: oci://ghcr.io/kusionstack/network
    version: 0.3.0
    configs:
      default: {}
context:
  KUBECONFIG_PATH: /var/run/secrets/kubernetes.io/kubeconfigs/kubeconfig-0
```

![edit workspace yaml](/img/docs/user_docs/getting-started/edit_workspace_yaml.png)

We can check the available Kusion Modules declared in the workspace. The `kam`, `service`, and `network` modules declared in the example have been pre-registered when we installed Kusion. 

![available modules](/img/docs/user_docs/getting-started/available_modules.png)

![pre registered modules](/img/docs/user_docs/getting-started/pre_registered_modules.png)

:::info
More info about the concepts of `Backend`, `Source`, `Workspace`, and `Kusion Module` can be found [here](../../3-concepts/0-overview.md)
:::

## Initialize Project and Stack

Next, we can create our first `Project` and `Stack` with the `Source` of `konfig` repo. 

![create quickstart project](/img/docs/user_docs/getting-started/create_quickstart_project.png)

When creating a `Project`, the `path` field should be filled with the path of the project relative to the root directory of the `Source` repo. After the creation, click the project name to initiate a `Stack`. 

![create default stack](/img/docs/user_docs/getting-started/create_default_stack.png)

Similarly, the `path` field of `Stack` should also be filled with the path of the stack relative to the root directory of the `Source` repo. 

:::info
More info about the concepts of `Project` and `Stack` can be found [here](../../3-concepts/0-overview.md)
:::

### Review Configuration Files

Now let's have a glance at the configuration codes of `default` stack in `quickstart` project, the configuration code link is https://github.com/KusionStack/konfig/tree/main/example/quickstart/default. 

![konfig quickstart default](/img/docs/user_docs/getting-started/konfig_quickstart_default.png)

The codes in the configuration file `main.k` are shown below: 

```python
# The configuration codes in perspective of developers.
import kam.v1.app_configuration as ac
import service
import service.container as c
import network as n

# `main.k` declares the customized configuration codes for default stack. 
# 
# Please replace the ${APPLICATION_NAME} with the name of your application, and complete the 
# 'AppConfiguration' instance with your own workload and accessories.
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
[dependencies]
kam = { git = "git://github.com/KusionStack/kam", tag = "0.2.2" }
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.3.0" }
service = { oci = "oci://ghcr.io/kusionstack/service", tag = "0.2.1" }
```

:::info
More details about the application model and module dependency declaration can be found in [Kusion Module guide for app dev](../../3-concepts/3-module/3-app-dev-guide.md). 
:::

:::tip
The specific module versions we used in the above demonstration is only applicable for Kusion after **v0.14.0**. 
:::

## Application Delivery

After the initialization, we can start to run the application delivery. 

### Preview Changes

We can first preview the changes to the application resources that are going to be deployed to the `dev` workspace. 

![preview changes](/img/docs/user_docs/getting-started/preview_changes.png)

We can click the `Detail` button to view the `Preview` results. 

![preview results](/img/docs/user_docs/getting-started/preview_results.png)

:::info
During the first preview, the models and modules that the application depends on will be downloaded, so it may take some time (usually within one minute). You can take a break and have a cup of coffee. 
:::

### Apply Resources

Then we can create a `Run` operation of the type of `Apply` to conveniently deploy the previewed application resources to the Kubernetes cluster corresponding to the `dev` workspace. 

![create apply run](/img/docs/user_docs/getting-started/create_apply_run.png)

After successfully completing the `Apply`, we can check the application resource graph, which will display the topology of the application resources. 

![resource graph](/img/docs/user_docs/getting-started/resource_graph.png)

Next, we can expose the service of the application we just applied through port-forwarding Kubernetes Pod and verify it in the browser. 

![port forward](/img/docs/user_docs/getting-started/port_forward.png)

![application page without db](/img/docs/user_docs/getting-started/application_page_without_db.png)

Oops, it seems that the page indicates we are missing a database. But no worries, we will cover how to add a database configuration for our application in the [next post](2-deliver-quickstart-with-db.md). 

:::info
Kusion by default will create the Kubernetes resources of the application in the namespace the same as the project name. If you want to customize the namespace, please refer to [Project Namespace Extension](../../3-concepts/1-project/2-configuration.md#kubernetesnamespace) and [Stack Namespace Extension](../../3-concepts/2-stack/2-configuration.md#kubernetesnamespace). 
:::

## Delete Application

We can delete the quickstart demo workload and related accessory resources with the `Destroy` run: 

![destroy application](/img/docs/user_docs/getting-started/destroy_application.png)
