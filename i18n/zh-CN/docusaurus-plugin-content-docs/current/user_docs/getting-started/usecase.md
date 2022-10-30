---
sidebar_position: 2
---

# Use Cases
This tutorial will demonstrate how to deliver an App with a Loadbalancer in one Kusion command.

## Prerequisites

- [Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes](https://kubernetes.io/) or [Kind](https://kind.sigs.k8s.io/)

## Init Project 

Firstly, let's clone the Konfig repo and enter the root directory:

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

After this step, we can init this tutorial project with online templates
```shell
kusion init --online
```

All init templates are listed as follows:

```shell
➜  konfig git:(main) ✗ kusion init --online
? Please choose a template:  [Use arrows to move, type to filter]
> code-city                  Code City metaphor for visualizing Go source code in 3D.
  deployment-multi-stack     A minimal kusion project of multi stacks
  deployment-single-stack    A minimal kusion project of single stack
```

Select `code-city` and press `Enter`. After that, we will see hints below and use the default value to config this project and stack.

![](/img/docs/user_docs/getting-started/choose-template.gif)


After this process, we can get the whole file hierarchy with this command
```shell
cd code-city && tree
```

```shell
➜  konfig git:(main) ✗ cd code-city && tree
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
 More details about the directory structure can be found in 
[Konfig](/docs/user_docs/concepts/konfig).

### Review Config Files

```python
# main.k
import base.pkg.kusion_models.kube.frontend

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
appConfiguration: frontend.Server {
    image = "howieyuen/gocity:latest"
}
```
`main.k` only contains 4 lines. Line 1 imports a pkg that contains the model `Server` which is an abstract model representing the App we will deliver later. This model hides the complexity of Kubernetes `Deployment` and `Service` and only one field `image` is needed to make this App ready to use. 

More details about Konfig Models can be found in [Konfig](https://github.com/KusionStack/konfig)

## Delivery
```shell
cd dev && kusion apply --watch
```
Go to the `dev` folder and we will deliver this App into a Kubernetes cluster with one command `kusion apply --watch`

![](/img/docs/user_docs/getting-started/apply.gif)

Check `Deploy` status
```shell
kubectl -ncode-city get deploy
```
The expected output is shown as follows:

```shell
➜  dev git:(main) ✗ kubectl -ncode-city get deploy
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
code-citydev   1/1     1            1           1m
```

Port-forward our App with the `service`
```shell
kubectl port-forward -ncode-city svc/gocity 4000:4000
```
```shell
➜  dev git:(main) ✗ kubectl port-forward -ncode-city svc/gocity 4000:4000
Forwarding from 127.0.0.1:4000 -> 4000
Forwarding from [::1]:4000 -> 4000
```

Visit [http://localhost:4000/#/github.com/KusionStack/kusion](http://localhost:4000/#/github.com/KusionStack/kusion) in your browser and enjoy.

![](/img/docs/user_docs/getting-started/gocity.png)
