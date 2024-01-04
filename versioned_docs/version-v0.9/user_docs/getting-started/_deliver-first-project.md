---
sidebar_position: 1
---

# Deliver Your First Project on Kubernetes

This tutorial will demonstrate how to deliver a simple single-app, single-stack project on Kubernetes in one Kusion command.

## Prerequisites

Before we start, we need to complete the following steps:

1、Install Kusion

We recommend using HomeBrew(Mac), Scoop(Windows), or an installation shell script to manage Kusion installation.
See [Download and Install](/docs/user_docs/getting-started/install) for more details.

2、Running Kubernetes cluster

There must be a running Kubernetes cluster and a [kubectl](https://Kubernetes.io/docs/tasks/tools/#kubectl) command line tool.
If you don't have a cluster yet, you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) to start one of your own.

## Init Project

We can start by initializing this tutorial project with online templates:

```shell
kusion init --online
```

All init templates are listed as follows:

```shell
~/playground$ kusion init --online
? Please choose a template:  [Use arrows to move, type to filter]
> code-city                  Code City metaphor for visualizing Go source code in 3D.
  deployment-multi-stack     A minimal kusion project of multiple stacks
  deployment-single-stack    A minimal kusion project of single stack
  wordpress                  A sample wordpress project
```

Select `code-city` and press `Enter`. After that, we will see hints below and use the default value to config this project and stack.

![](/img/docs/user_docs/getting-started/init-gocity.gif)

The directory structure looks like the following:

```shell
cd code-city && tree
```

```shell
~/playground$ tree code-city/
code-city/
├── dev
│   ├── kcl.mod
│   ├── kcl.mod.lock
│   ├── main.k
│   └── stack.yaml
└── project.yaml

2 directories, 5 files
```

:::info
More details about the directory structure can be found in 
[Concepts](/docs/user_docs/concepts/glossary).
:::

### Review Config Files

Let's take a look at the configuration files located at `code-city/dev/main.k`:
```python
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

The configuration file `main.k` includes an `AppConfiguration` with the name `gocity`. The `gocity` application includes a workload of type `wl.Service`, which runs on 1 replica and exposes port 4000 to be accessed. This model hides the major complexity of Kubernetes resources such as `Namespace`,`Deployment` and `Service`, while providing the concepts that are application-centric and infrastructure-agnostic.

:::info
More details about the Models can be found in [Catalog](https://github.com/KusionStack/catalog)
:::

## Delivery

```shell
cd code-city/dev && kusion apply --watch
```

Go to the `dev` folder and we will deliver this App into a Kubernetes cluster with one command `kusion apply --watch`

![](/img/docs/user_docs/getting-started/apply.gif)

Check `Deploy` status

```shell
kubectl -n gocity get deploy
```

The expected output is shown as follows:

```shell
~/playground/code-city/dev$ kubectl -n gocity get deploy
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
gocity-dev-gocity   1/1     1            1           3m37s
```

Port-forward our App with the `service`

```shell
kubectl port-forward -n gocity svc/gocity-dev-gocity-private 4000:4000
```

```shell
~/playground/code-city/dev$ kubectl port-forward -n gocity svc/gocity-dev-gocity-private 4000:4000
Forwarding from 127.0.0.1:4000 -> 4000
Forwarding from [::1]:4000 -> 4000
```

Visit [http://localhost:4000/#/github.com/KusionStack/kusion](http://localhost:4000/#/github.com/KusionStack/kusion) in your browser and enjoy.

![](/img/docs/user_docs/getting-started/gocity.png)
