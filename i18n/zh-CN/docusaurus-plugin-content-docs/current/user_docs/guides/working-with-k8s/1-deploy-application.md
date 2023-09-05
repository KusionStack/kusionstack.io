# 部署应用

本篇指南向您展示，如何使用 Kusion命令行工具，完成一个运行在 Kubernetes 中应用的部署。我们将组织配置的单位叫做应用（Application），描述应用交付和运维细节的配置集合叫做应用配置（AppConfiguration），它本质上是通过 KCL 定义的应用模型。完整的 AppConfiguration 模型定义可见：[AppConfiguration](/docs/reference/model/catalog_models/doc_app_configuration.md)

要将一个运行在 Kubernetes 中的应用完全部署起来，一般需要下发多个 Kubernetes 资源，本次演示的样例涉及以下 Kubernetes 资源：

- 命名空间（Namespace）
- 无状态工作负载（Deployment）
- 服务（Service）

> 这篇指南假设您已熟悉Kubernetes的一些基本概念。如果不熟悉，可以前往 Kubernetes 官方网站，查看相关说明：

- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/)

## 1. 准备工作

在开始之前，我们需要做以下准备工作：

1、安装 Kusion 工具链

我们推荐使用 HomeBrew(Mac)，Scoop(Windows)，或者安装脚本安装Kusion。详情信息请参阅[下载和安装](/docs/user_docs/getting-started/install)。

2、可用的 Kubernetes 集群

必须要有一个 Kubernetes 集群，同时 Kubernetes 集群最好带有 [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) 命令行工具。
如果您还没有集群，您可以通过 [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) 构建一个您自己的集群。

## 2. 初始化

本指南是以Kusion CLI的方式部署应用服务，依赖 kusion 命令行工具和一个 Kubernetes 集群。

初始化 KCL 项目：

```bash
kusion init
```

`kusion init` 命令会提示您输入可能需要的参数，例如项目名称，应用名称，镜像地址等；也可以一路点击 *回车* 使用默认值。输出类似于：

```
✔ single-stack-sample    A minimal kusion project of single stack
This command will walk you through creating a new kusion project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

Project Config:
✔ Project Name: helloworld
✔ AppName: helloworld
✔ ProjectName: helloworld
Stack Config: dev
✔ Image: gcr.io/google-samples/gb-frontend:v4

Created project 'helloworld'
```

到此，我们就成功地使用`single-stack-sample`模版初始化了一个项目：helloworld，包含一个 Project 和一个 Stack。
- `AppName` 代表了示例应用名称,会被写入自动生成的配置文件`main.k`作为`AppConfiguration`实例的名字.
- `ProjectName` and `Project Name` 代表了示例项目的名称，会被用作自动生成的目录名，并且录入`project.yaml`。
- `Image` 代表了示例应用的镜像地址。

:::tip

有关 Project 和 Stack 的设计说明，请参阅 [Project&Stack](/user_docs/concepts/glossary.md)。
:::

该项目的目录结构如下：

```
helloworld
  ├── README.md
  ├── dev
  │   ├── main.k
  │   ├── kcl.mod
  │   ├── kcl.mod.lock
  │   └── stack.yaml
  └── project.yaml

1 directory, 6 files
```

项目目录包含一系列自动生成的文件：
- `README.md` 包括了从模版生成的README。
- `project.yaml` 代表了项目(Project)级别的配置。
- `dev` 目录代表一个配置栈(Stack)，包括了配置栈(Stack)级别的通用配置。
  - `dev/main.k` 包含了当前配置栈(Stack)中的应用配置。
  - `dev/stack.yaml` 包含了当前配置栈(Stack)级别的通用配置。
  - `dev/kcl.mod` 包含了当前配置栈(Stack)的依赖，默认包含了对模型仓库的依赖。
  - `dev/kcl.mod.lock` 是用来固定依赖版本的文件。

整体来说，`.k` 文件是代表应用级别，应用配置的 KCL 源码。`.yaml` 是项目或者配置栈级别的配置文件。

### kcl.mod
`kusion init`过程中会自动生成一个`kcl.mod`文件，这个文件中描述了当前项目或者配置栈的依赖。默认情况下，文件中会包含一个对[`Catalog`仓库](https://github.com/KusionStack/catalog)或者OCI制品的依赖。`Catalog`仓库是Kusion的模型仓库，当中包含了一些常用的和符合最佳实践的模型定义。当它无法满足您的自动化需求时，您也可以创建自己的模型仓库并在`kcl.mod`中引用它。

## 3. 配置编译

到此，我们已经借助 `kusion` 提供的内置模板，完成了项目的配置初始化。

项目的编程语言是 KCL，不是 Kubernetes 认识的 JSON/YAML，因此还需要经过编译得到最终输出。

首先进入到项目的 Stack 目录（`helloworld/dev`）并执行编译：

```bash
cd helloworld/dev && kusion compile
```

输出默认到stdout。您可以在命令中加入`-o/--output`以输出到一个文件。

`kusion compile` 的输出默认是一种叫 Spec 的数据结构。

:::tip

有关 kusion 命令行工具的说明，执行 `kusion -h`，或者参考工具的在线文档 [Overview of Kusion CLI](/docs/reference/cli/kusion/index)。
:::

## 4. 配置生效

完成编译，现在开始下发配置。通过查看 `kusion compile` 的输出，可以看到 3 个资源：

- 一个 name 为 helloworld 的 `Namespace`
- 一个在 helloworld 命名空间中，name 为 helloworld-dev-helloworld 的 `Deployment`
- 一个在 helloworld 命名空间中，name 为 helloworld-dev-helloworld-private 的 `Service`

执行命令：

```bash
kusion apply
```

输出类似于：

```
SUCCESS  Compiling in stack dev...

Stack: dev  ID                                                       Action
* ├─     v1:Namespace:helloworld                                  Create
* ├─     v1:Service:helloworld:helloworld-dev-helloworld-private  Create
* └─     apps/v1:Deployment:helloworld:helloworld-dev-helloworld  Create


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  Create v1:Namespace:helloworld success                                                                                                                                                                                                                                
 SUCCESS  Create v1:Service:helloworld:helloworld-dev-helloworld-private success                                                                                                                                                                                                
 SUCCESS  Create apps/v1:Deployment:helloworld:helloworld-dev-helloworld success                                                                                                                                                                                                
Create apps/v1:Deployment:helloworld:helloworld-dev-helloworld success [3/3] █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 3 created, 0 updated, 0 deleted.
```

以上就完成了配置生效，可以使用 `kubectl` 工具检查资源的实际状态。

1、 检查命名空间

```bash
kubectl get ns
```

输出类似于：

```
NAME                   STATUS   AGE
default                Active   117d
helloworld             Active   63s
kube-system            Active   117d
...
```

2、检查 Deployment

```bash
kubectl get deploy -n helloworld
```

输出类似于：

```
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
helloworld-dev-helloworld   2/2     2            2           111s
```

3、检查 Service

```bash
kubectl get svc -n helloworld
```

输出类似于：

```
NAME                                TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
helloworld-dev-helloworld-private   ClusterIP   10.111.183.0   <none>        80/TCP   2m6s
```

4、检查应用

使用 `kubectl` 工具，将本机端口 `30000` 映射到 Service 端口 `80`

```bash
kubectl port-forward svc/helloworld-dev-helloworld-private -n helloworld 30000:80
```

打开浏览器访问 [http://127.0.0.1:30000](http://127.0.0.1:30000)：
![app-preview](../../../../../../../static/img/docs/user_docs/guides/working-with-k8s/app-preview.png)
