---
id: deploy-application
---

# Deploy Application

This guide shows you how to use Kusion CLIs to complete the deployment of an application running in Kubernetes.
We call the abstraction of application operation and maintenance configuration as `AppConfiguration`, and its instance as `Application`.
It is essentially a configuration model that describes an application. The complete definition can be seen [here](../../../6-reference/2-modules/1-developer-schemas/app-configuration.md).

In production, the application generally includes minimally several k8s resources:

- Namespace
- Deployment
- Service

:::tip
This guide requires you to have a basic understanding of Kubernetes.
If you are not familiar with the relevant concepts, please refer to the links below:

- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/)
:::

## Prerequisites

Before we start, we need to complete the following steps:

1、Install Kusion

We recommend using HomeBrew(Mac), Scoop(Windows), or an installation shell script to download and install Kusion.
See [Download and Install](../../../2-getting-started/1-install-kusion.md) for more details.

2、Running Kubernetes cluster

There must be a running and accessible Kubernetes cluster and a [kubectl](https://Kubernetes.io/docs/tasks/tools/#kubectl) command line tool.
If you don't have a cluster yet, you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) to start one of your own.

## Initializing

This guide is to deploy an app using Kusion, relying on the Kusion CLI and an existing Kubernetes cluster.

### Initializing workspace configuration

In version 0.10.0, we have introduced the new concept of [workspaces](../../../3-concepts/4-workspace), which is a logical layer whose configurations represent an opinionated set of defaults, often appointed by the platform team. In most cases workspaces are represented with an "environment" in traditional SDLC terms. These workspaces provide a means to separate the concerns between the **application developers** who wish to focus on business logic, and a group of **platform engineers** who wish to standardize the applications on the platform.

Driven by the discipline of Platform Engineering, management of the workspaces, including create/updating/deleting workspaces and their configurations should be done by dedicated platform engineers in a large software organizations to facilitate a more mature and scalable collaboration pattern.

:::tip
More on the collaboration pattern can be found in the [design doc](https://github.com/KusionStack/kusion/blob/main/docs/design/collaboration/collaboration_paradigm.md).
:::

However, if that does NOT apply to your scenario, e.g. if you work in a smaller org without platform engineers or if you are an individual developer, we wish Kusion can still be a value tool to have when delivering an application. In this guide, we are NOT distinctively highlighting the different roles or what the best practices entails (the design doc above has all that) but rather the steps needed to get Kusion tool to work.

As of version 0.11.0, workspace configurations in Kusion can not only be managed on the local filesystem in the form of YAML files, but the remotely-managed workspaces have been supported as well.

To initialize the workspace configuration:

```bash
~/playground$ touch ~/dev.yaml
~/playground$ kusion workspace create dev -f ~/dev.yaml
create workspace dev successfully
```

To verify the workspace has been created properly:

```
~/playground$ kusion workspace list
- default
- dev
~/playground$ kusion workspace show dev
{}
```

Note that `show` command tells us the workspace configuration is currently empty, which is expected because we created the `dev` workspace with an empty YAML file. An empty workspace configuration will suffice in some cases, where no platform configurations are needed.

Kusion by default uses the `default` workspace, thus we need to switch to the `dev` workspace we have just created. 

```bash
~/playground$ kusion workspace switch dev
```

We will progressively add more workspace configurations throughout this user guide.

### Initializing application configuration

Now that workspaces are properly initialized, we can begin by initializing the application configuration:

```bash
# Create a new directory and navigate into it. 
mkdir simple-service && cd simple-service

# Initialize the demo project with the name of the current directory. 
kusion init
```

The directory structure is as follows:

```shell
simple-service/
.
├── dev
│   ├── kcl.mod
│   ├── main.k
│   └── stack.yaml
└── project.yaml

2 directories, 4 files
```

The project directory has the following files that are automatically generated:
- `project.yaml` represents project-level configurations.
- `dev` directory stores the customized stack configuration:
  - `dev/main.k` stores configurations in the `dev` stack.
  - `dev/stack.yaml` stores stack-level configurations.
  - `dev/kcl.mod` stores stack-level dependencies.

In general, the `.k` files are the KCL source code that represents the application configuration, and the `.yaml` is the static configuration file that describes behavior at the project or stack level.

:::info
See [Project](../../../3-concepts/1-project/1-overview.md) and [Stack](../../../3-concepts/2-stack/1-overview.md) for more details about Project and Stack.
:::

The `kusion init` command will create a demo quickstart application, we may update the `dev/kcl.mod` and `dev/main.k` later. 

#### kcl.mod
There should be a `kcl.mod` file generated automatically under the project directory. The `kcl.mod` file describes the dependency for the current project or stack. By default, it should contain a reference to the official [`kam` repository](https://github.com/KusionStack/kam) which holds the Kusion `AppConfiguration` and related workload model definitions that fits best practices. You can also create your own models library and reference that.

You can change the package name in `kcl.mod` to `simple-service`: 

`dev/kcl.mod`
```shell
[package]
name = "simple-service"
version = "0.1.0"

[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.2.0" }
service = { oci = "oci://ghcr.io/kusionstack/service", tag = "0.1.0" }
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.2.0" }

[profile]
entries = ["main.k"]
```

#### main.k
The configuration file `main.k`, usually written by the application developers, declare customized configurations for a specific stack, including an `Application` instance of `AppConfiguration` model. 

You can update the `main.k` as follows: 

```python
import kam.v1.app_configuration as ac
import service
import service.container as c
import network as n

helloworld: ac.AppConfiguration {
    workload: service.Service {
        containers: {
            "helloworld": c.Container {
                image = "kusionstack/kusion-quickstart:latest"
            }
        }
        replicas: 2
    }
    accessories: {
        "network": n.Network {
            ports: [
              n.Port {
                  port: 80
              }
            ]
        }
    }
}
```

## Previewing

At this point, the project has been completely initialized.
The configuration is written in KCL, not JSON/YAML which Kubernetes recognizes, so it needs to be built to get the final output. And we can use the `kusion preview` cmd to preview the Kubernetes resources intended to deliver. 

Enter stack dir `simple-service/dev` and preview:

```bash
cd simple-service/dev && kusion preview
```

:::tip
For instructions on the kusion command line tool, execute `kusion -h`, or refer to the tool's online [documentation](../../../6-reference/1-commands/index.md).
:::

## Applying

Preview is now completed. We can apply the configuration as the next step. In the output from `kusion preview`, you can see 3 resources:

- a Namespace named `simple-service`
- a Deployment named `simple-service-dev-helloworld` in the `simple-service` namespace
- a Service named `simple-service-dev-helloworld-private` in the `simple-service` namespace

Execute command:

```bash
kusion apply
```

The output is similar to:

```
 ✔︎  Generating Spec in the Stack dev...                                                                                                                                                                                                     
Stack: dev  ID                                                               Action
* ├─     v1:Namespace:simple-service                                      Create
* ├─     v1:Service:simple-service:simple-service-dev-helloworld-private  Create
* └─     apps/v1:Deployment:simple-service:simple-service-dev-helloworld  Create


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  Create v1:Namespace:simple-service success                                                                                                                                                                                          
 SUCCESS  Create v1:Service:simple-service:simple-service-dev-helloworld-private success                                                                                                                                                      
 SUCCESS  Create apps/v1:Deployment:simple-service:simple-service-dev-helloworld success                                                                                                                                                      
Create apps/v1:Deployment:simple-service:simple-service-dev-helloworld success [3/3] ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 3 created, 0 updated, 0 deleted.
```

After the configuration applying successfully, you can use the `kubectl` to check the actual status of these resources.

1、 Check Namespace

```bash
kubectl get ns
```

The output is similar to:

```
NAME                   STATUS   AGE
default                Active   117d
simple-service         Active   38s
kube-system            Active   117d
...
```

2、Check Deployment

```bash
kubectl get deploy -n simple-service
```

The output is similar to:

```
NAME                            READY   UP-TO-DATE   AVAILABLE   AGE
simple-service-dev-helloworld   1/1     1            1           59s
```

3、Check Service

```bash
kubectl get svc -n simple-service
```

The output is similar to:

```
NAME                                    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
simple-service-dev-helloworld-private   ClusterIP   10.98.89.104   <none>        80/TCP    79s
```

4、Validate app

Using the `kubectl` tool, forward native port `30000` to the service port `80`.

```bash
kubectl port-forward svc/simple-service-dev-helloworld-private -n simple-service 30000:80
```

Open browser and visit [http://127.0.0.1:30000](http://127.0.0.1:30000)：

![app-preview](/img/docs/user_docs/guides/working-with-k8s/app-preview.png)
