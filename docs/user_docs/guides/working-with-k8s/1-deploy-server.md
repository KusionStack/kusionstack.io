# Deploy Server

This guide shows you how to use the KCL language and Kusion CLIs to complete the deployment of an application running in Kubernetes.
We call the abstraction of application operation and maintenance configuration as `Server`, and its instance as `Application`.
It is essentially an operation and maintenance model defined by [KCL](https://kcl-lang.io/),
and the complete definition can be seen [here](/docs/reference/model/kusion_models/kube/frontend/doc_server).

In actual production, the application online generally needs to update several k8s resources:

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

We recommend using the official installation tool _kusionup_ which supports multi-version management.
See [Download and Install](/docs/user_docs/getting-started/install) for more details.

2、Clone Konfig repo

In this guide, we need some KCL models that [Konfig](https://github.com/KusionStack/konfig.git) offers.
For more details on KCL language, please refer to [Tour of KCL](https://kcl-lang.io/).

3、Running Kubernetes cluster

There must be a running Kubernetes cluster and a [kubectl](https://Kubernetes.io/docs/tasks/tools/#kubectl) command line tool.
If you don't have a cluster yet, you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) to start one of your own.

## Initializing

This guide is to deploy an app by KCL and Kusion, relying on Kusion tools, Konfig library and Kubernetes cluster.

Open Konfig repo, enter the `appops` directory, and initialize the KCL project:

```bash
cd appops && kusion init
```

The `kusion init` command will prompt you to enter required parameters, such as project name, project description, image address, etc.
You can keep pressing _Enter_ all the way to use the default values.

The output is similar to:

```
✔ deployment-single-stack    A minimal kusion project of single stack
This command will walk you through creating a new kusion project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

✔ project name: deployment-single-stack
✔ project description: A minimal kusion project of single stack
✔ Stack: dev
✔ ClusterName: kubernetes-dev
✔ Image: gcr.io/google-samples/gb-frontend:v4
Created project 'deployment-single-stack'
```

Now, we have successfully initialized a KCL project `deployment-single-stack`, which contains a `dev` stack.
`project name` and `project description` are provided by KCL template, and another three fields require users to fill in. 
`Stack` represents the name of a configuration set, which is used to isolate with other stacks.
`ClusterName` represents the cluster name, it will be recorded into `metadata.annotations`.
`Image` represents the image address of the app's main container.

:::info

See [Project&Stack](/user_docs/concepts/konfig.md) for more details about Project and Stack.
:::

The directory structure is as follows:

```
deployment-single-stack
├── README.md
├── base
│   └── base.k
├── dev
│   ├── ci-test
│   │   └── settings.yaml
│   ├── kcl.yaml
│   ├── main.k
│   └── stack.yaml
├── kusion.yaml
└── project.yaml

3 directories, 8 files
```

It can be seen that the project has three levels of directories, and each level has its design significance.

First level:
- `project.yaml` represents project-level properties.
- `kusion.yaml` is the template configuration file, which is not relevant to the operation of this guide.

Second level:
- `base` directory stores common configurations for all stacks.
- `dev` directory stores the customized configuration:
  - `dev/kcl.yaml` stores static compilation configuration.
  - `dev/main.k` stores specific configurations of `dev` stack.
  - `dev/stack.yaml` stores stack information.

Third level:
- `dev/ci-test` directory stores the dynamic compilation configuration and final output.

By default, the compilation output goes to the `stdout.golden.yaml` file in this directory.
In general, the `.k` file is the KCL source code, and the `.yaml` is the configuration file.

## Compiling

At this point, the development of the project has been completed with the help of the built-in template provided by Kusion.
The programming language of the project is KCL, not JSON/YAML which Kubernetes recognizes, so it needs to be compiled to get the final output.

Enter stack dir `deployment-single-stack/dev` and compile:

```bash
cd deployment-single-stack/dev && kusion compile
```

The output is saved in the `deployment-single-stack/dev/ci-test/stdout.golden.yaml` file by default.

:::tip

For instructions on the kusion command line tool, execute `kusion -h`, or refer to the tool's online [documentation](/docs/reference/cli/kusionctl/overview)。
:::

## Applying

Compilation is completed, and now apply the configuration. At the `stdout.golden.yaml` file, you can see 3 resources:

- a Deployment named `deployment-single-stackdev`
- a Namespace named `deployment-single-stack`
- a Service named `frontend-service`

The content of this file can be directly accepted by Kubernetes.
You can run `kusion apply` or `kubectl apply -f stdout.golden.yaml` to directly apply the configuration.

:::tip

It is recommended to use the Kusion CLI, the compilation output in this example is the complete YAML declaration, 
but not all KCL project compilation results are the same.
:::

Execute command:

```bash
kusion apply
```

The output is similar to:

```
SUCCESS  Compiling in stack dev...

Stack: dev    Provider                Type                           Name    Plan
      * ├─  kubernetes        v1:Namespace     deployment-single-stack[0]  Create
      * ├─  kubernetes  apps/v1:Deployment  deployment-single-stackdev[0]  Create
      * └─  kubernetes          v1:Service            frontend-service[0]  Create

✔ yes
Start applying diffs......
 SUCCESS  Creating Namespace/deployment-single-stack     
 SUCCESS  Creating Deployment/deployment-single-stackdev
 SUCCESS  Creating Service/frontend-service
Creating Service/frontend-service [3/3] ███████████████████████████████████████████ 100% | 0s

Apply complete! Resources: 3 created, 0 updated, 0 deleted.
```

After the configuration applying successfully, you can use the `kubectl` to check the actual status of these resources.

1、 Check Namespace

```bash
kubectl get ns
```

The output is similar to:

```
NAME                      STATUS        AGE
argocd                    Active        59d
default                   Active        72d
deployment-single-stack   Active        10m
```

2、Check Deployment

```bash
kubectl get deploy -n deployment-single-stack
```

The output is similar to:

```
NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment-single-stackdev   1/1     1            1           11m
```

3、Check Service

```bash
kubectl get svc -n deployment-single-stack
```

The output is similar to:

```
NAME               TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
frontend-service   NodePort   10.0.0.0       <none>        80:10001/TCP   11m
```

4、Validate app

Using the `kubecl` tool, forward native port `30000` to the service port `80`.

```bash
kubectl port-forward svc/frontend-service -n deployment-single-stack-xx 30000:80
```

Open browser and visit [http://127.0.0.1:30000](http://127.0.0.1:30000)：

![](/img/docs/user_docs/guides/working-with-k8s/app-preview.jpg)
