---
sidebar_position: 2
---

# Use Cases
This tutorial will demonstrate how to deliver an App with a Loadbalancer in one Kusion command.

## Prerequisites

- [Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes](https://kubernetes.io/) or [Kind](https://kind.sigs.k8s.io/)

## Init Project 
Let's init this tutorial project with `kusion init --online`
```shell
➜  examples git:(main) ✗ kusion init --online
? Please choose a template:  [Use arrows to move, type to filter]
> code-city                  Code City metaphor for visualizing Go source code in 3D.
  deployment-multi-stack     A minimal kusion project of multi stacks
  deployment-single-stack    A minimal kusion project of single stack
```

Select `code-city` and press `Enter`. After that we will see hints below and use the default value to config this project and stack.


```shell
? Please choose a template: code-city                  Code City metaphor for visualizing Go source code in 3D.
This command will walk you through creating a new kusion project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

Project Config:
? Project Name: code-city
? AppName: gocity
? ContainerPort: 4000
? ServicePort: 4000
Stack Config: dev
? Image: yuanhao1223/gocity:latest
Created project 'code-city'
```


Let's go into this directory and check this project.

```shell
➜  examples git:(main) ✗ cd code-city
➜  code-city git:(main) ✗ tree
.
├── base
│   └── base.k
├── dev
│   ├── ci-test
│   │   └── settings.yaml
│   ├── kcl.yaml
│   ├── main.k
│   └── stack.yaml
└── project.yaml

3 directories, 6 files
```
### Review Config Files

```python
# main.k
import .pkg

app = pkg.App {
    image = "yuanhao1223/gocity:latest"
}
```
`main.k` only contains 5 lines (include an empty line). Line 1 imports a pkg that contains the model `App` which is an abstract model represents the App we will deliver later. This model hides the complexity of Kubernetes `Deployment` and `Service` and onely one field `image` is needed to make this App ready to use. 

More details about Konfig Models can be found in [Konfig](https://github.com/KusionStack/konfig)

## Delivery
Deliver this App into a Kubernetes cluster with one command `kusion apply`

```shell
➜  code-city-demo git:(main) ✗ cd dev && kusion apply main.k
 ✔︎  Compiling in stack dev...

Stack: dev  ID                                 Action
 * ├─       apps/v1:Deployment:default:gocity  Create
 * └─       v1:Service:default:gocity          Create

? Do you want to apply these diffs?  [Use arrows to move, type to filter]
> yes
  details
  no

? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  Create v1:Service:default:gocity success
 SUCCESS  Create apps/v1:Deployment:default:gocity success
Create apps/v1:Deployment:default:gocity success [2/2] ███████████████ 100% | 0s

Apply complete! Resources: 2 created, 0 updated, 0 deleted.
```

Check `Deploy` status.
```shell
➜  examples git:(main) ✗ kubectl get deploy
NAME     READY   UP-TO-DATE   AVAILABLE   AGE
gocity   1/1     1            1           1m
```

Port-forward our App
```shell
➜  examples git:(main) ✗ kubectl port-forward svc/gocity 4000:4000
Forwarding from 127.0.0.1:4000 -> 4000
Forwarding from [::1]:4000 -> 4000
```

Visit [http://localhost:4000/#/github.com/KusionStack/kusion](http://localhost:4000/#/github.com/KusionStack/kusion) in your browser and enjoy.

![](/img/docs/user_docs/getting-started/gocity.png)
