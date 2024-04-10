# Deploy Application

This guide shows you how to use Kusion CLIs to complete the deployment of an application running in Kubernetes.
We call the abstraction of application operation and maintenance configuration as `AppConfiguration`, and its instance as `Application`.
It is essentially a configuration model that describes an application. The complete definition can be seen [here](../../reference/modules/catalog-models/app-configuration).

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
See [Download and Install](../../getting-started/install-kusion) for more details.

2、Running Kubernetes cluster

There must be a running Kubernetes cluster and a [kubectl](https://Kubernetes.io/docs/tasks/tools/#kubectl) command line tool.
If you don't have a cluster yet, you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) to start one of your own.

## Initializing

This guide is to deploy an app using Kusion, relying on the Kusion CLI and an existing a Kubernetes cluster.

## Initializing workspace configuration

In version 0.10.0, we have introduced the new concept of [workspaces](../../concepts/workspace), which is a logical layer whose configurations represent an opinionated set of defaults, often appointed by the platform team. In most cases workspaces are represented with an "environment" in traditional SDLC terms. These workspaces provide a means to separate the concerns between the application developers who wish to focus on business logic, and a group of platform engineers who wish to standardize the applications on the platform.

Driven by the discipline of Platform Engineering, management of the workspaces, including create/updating/deleting workspaces and their configurations should be done by dedicated platform engineers in a large software organizations to facilitate a more mature and scalable collaboration pattern.

:::tip

More on the collaboration pattern can be found in the [design doc](https://github.com/KusionStack/kusion/blob/main/docs/design/collaboration/collaboration_paradigm.md).
:::

However, if that does NOT apply to your scenario, e.g. if you work in a smaller org without platform engineers or if you are an individual developer, we wish Kusion can still be a value tool to have when delivering an application. In this guide, we are NOT distinctively highlighting the different roles or what the best practices entails (the design doc above has all that) but rather the steps needed to get Kusion tool to work.

As of version 0.10.0, workspace configurations in Kusion are managed on the local filesystem and their values are sourced from YAML files. Remotely-managed workspaces will be supported in future versions.

To initialize the workspace configuration:

```bash
~/playground$ touch ~/dev.yaml
~/playground$ kusion workspace create dev -f ~/dev.yaml
create workspace dev successfully
```

To verify the workspace has been created properly:
```
~/playground$ kusion workspace list
- dev
~/playground$ kusion workspace show dev
{}
```

Note that `show` command tells us the workspace configuration is currently empty, which is expected because we created the `dev` workspace with an empty YAML file. An empty workspace configuration will suffice in some cases, where no platform configurations are needed.

We will progressively add more workspace configurations throughout this user guide.

## Initializing application configuration

Now that workspaces are properly initialized, we can begin by initializing the application configuration:

```bash
kusion init
```

The `kusion init` command will prompt you to enter required parameters, such as project name, project description, image address, etc.
You can keep pressing _Enter_ all the way to use the default values.

The output is similar to:

```
✔ single-stack-sample    A minimal kusion project of single stack
This command will walk you through creating a new kusion project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

Project Config:
✔ Project Name: simple-service
✔ AppName: helloworld
✔ ProjectName: simple-service
Stack Config: dev
✔ Image: gcr.io/google-samples/gb-frontend:v4
Created project 'simple-service'
```

Now, we have successfully initialized a project `simple-service` using the `single-stack-sample` template, which contains a `dev` stack. 

- `AppName` represents the name of the sample application, which is recorded in the generated `main.k` as the name of the `AppConfiguration` instance.
- `ProjectName` and `Project Name` represent the name of the sample project, which is used as the generated folder name and then recorded in the generated `project.yaml`.
- `Image` represents the image address of the application container.

:::info
See [Project](../../concepts/project/overview) and [Stack](../../concepts/stack/overview) for more details about Project and Stack.
:::

The directory structure is as follows:

```
simple-service/
├── README.md
├── dev
│   ├── kcl.mod
│   ├── kcl.mod.lock
│   ├── main.k
│   └── stack.yaml
└── project.yaml

2 directories, 6 files
```

The project directory has the following files that are automatically generated:
- `README.md` contains the generated README from a template.
- `project.yaml` represents project-level configurations.
- `dev` directory stores the customized stack configuration:
  - `dev/main.k` stores configurations in the `dev` stack.
  - `dev/stack.yaml` stores stack-level configurations.
  - `dev/kcl.mod` stores stack-level dependencies.
  - `dev/kcl.mod.lock` stores version-sensitive dependencies.

In general, the `.k` files are the KCL source code that represents the application configuration, and the `.yaml` is the static configuration file that describes behavior at the project or stack level.

### kcl.mod
There should be a `kcl.mod` file generated automatically under the project directory. The `kcl.mod` file describes the dependency for the current project or stack. By default, it should contain a reference to the official [`catalog` repository](https://github.com/KusionStack/catalog) which holds some common model definitions that fits best practices. You can also create your own models library and reference that.

## Building

At this point, the project has been initialized with the Kusion built-in template.
The configuration is written in KCL, not JSON/YAML which Kubernetes recognizes, so it needs to be built to get the final output.

Enter stack dir `simple-service/dev` and build:

```bash
cd simple-service/dev && kusion build
```

The output is printed to `stdout` by default. You can save it to a file using the `-o/--output` flag when running `kusion build`.

The output of `kusion build` is the [intent](../../concepts/intent) format.

:::tip

For instructions on the kusion command line tool, execute `kusion -h`, or refer to the tool's online [documentation](../../reference/commands).
:::

## Applying

Build is now completed. We can apply the configuration as the next step. In the output from `kusion build`, you can see 3 resources:

- a Namespace named `simple-service`
- a Deployment named `simple-service-dev-helloworld` in the `simple-service` namespace
- a Service named `simple-service-dev-helloworld-private` in the `simple-service` namespace

Execute command:

```bash
kusion apply
```

The output is similar to:

```
 ✔︎  Generating Intent in the Stack dev...                                                                                                                                                                                                     
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
