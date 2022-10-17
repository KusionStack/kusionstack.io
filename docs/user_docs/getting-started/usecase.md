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

Select `code-city` and press `Enter`. After that, we will see hints below and use the default value to config this project and stack.

![](/img/docs/user_docs/getting-started/choose-template.gif)


The whole file hierarchy is shown below. More details about the directory structure can be found in 
[Konfig](/docs/user_docs/concepts/konfig).

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
    image = "howieyuen/gocity:latest"
}
```
`main.k` only contains 5 lines (including an empty line). Line 1 imports a pkg that contains the model `App` which is an abstract model representing the App we will deliver later. This model hides the complexity of Kubernetes `Deployment` and `Service` and only one field `image` is needed to make this App ready to use. 

More details about Konfig Models can be found in [Konfig](https://github.com/KusionStack/konfig)

## Delivery
Deliver this App into a Kubernetes cluster with one command `kusion apply`

![](/img/docs/user_docs/getting-started/apply.gif)

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
