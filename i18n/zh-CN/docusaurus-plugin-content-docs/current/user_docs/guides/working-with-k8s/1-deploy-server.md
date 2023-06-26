# 部署应用

本篇指南向你展示，如何使用 KCL 语言与其相对应的 CLI 工具 Kusion，完成一个运行在 Kubernetes 中的 Long-Running 应用的部署，我们将组织配置的单位叫做应用（Application），描述应用部署和运维细节的配置集合叫做应用服务（Server），它本质上是通过 KCL 定义的运维模型，完整的 Server 模型定义可见：[server](/docs/reference/model/kusion_models/kube/frontend/doc_server)

要将一个运行在 Kubernetes 中的应用完全部署起来，一般需要下发多个 Kubernetes 资源，本次演示的样例涉及以下 Kubernetes 资源：

- 命名空间（Namespace）
- 无状态工作负载（Deployment）
- 服务（Service）

> 不清楚相关概念的，可以前往 Kubernetes 官方网站，查看相关说明：

- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/)

## 1. 准备工作

在开始之前，我们需要做以下准备工作：

1、安装 Kusion 工具链

我们推荐使用 kusion 的官方安装工具 `kusionup`，可实现 kusion 多版本管理等关键能力。详情信息请参阅[下载和安装](/docs/user_docs/getting-started/install)。

2、下载开源 Konfig 大库

在本篇指南中，需要用到部分已经抽象实现的 KCL 模型，有关 KCL 语言的介绍，可以参考 [Tour of KCL](https://kcl-lang.io/)。

仓库地址： [https://github.com/KusionStack/konfig.git](https://github.com/KusionStack/konfig.git)

3、可用的 Kubernetes 集群

必须要有一个 Kubernetes 集群，同时 Kubernetes 集群最好带有 [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) 命令行工具。
如果你还没有集群，你可以通过 [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) 构建一个你自己的集群。

## 2. 初始化

本指南是以 KCL 和 Kusion 的方式部署应用服务，依赖 kusion 工具、Konfig 大库和 Kubernetes 集群。

打开 Konfig 大库项目，进入 `appops` 目录，初始化 KCL 项目：

```bash
cd appops && kusion init
```

`kusion init` 命令会提示你输入可能需要的参数，例如项目名称、项目描述，镜像地址等；也可以一路点击 *回车* 使用默认值。输出类似于：

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

到此，我们就成功初始化一个 KCL 项目：deployment-single-stack，该代码包含一个 Project 和一个 Stack。
其中，`project name` 和 `project description` 是每个模板都需要设置的属性，目的是为了模板共享。
剩余三个字段，是模板中需要用户填入的三个属性，`Stack` 表示配置栈的名称，可以理解为配置的隔离标识；
`ClusterName` 是指集群名称，在本例中暂未使用；`Image` 表示应用的业务容器的镜像地址。

> 有关 Project 和 Stack 的设计说明，请参阅 [Project&Stack](/user_docs/concepts/konfig.md)。

该项目的目录结构如下：

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

可以看到，目录共分成三层，每层目录都有各自的设计意义。
根目录下 `project.yaml` 表示项目级别的属性；`kusion.yaml` 是模板的配置文件，与本指南的操作内容无关。
`base` 目录存放的是公共配置；`dev` 目录存放的是定制化配置，`kcl.yaml` 是静态编译配置，指定了编译文件，
`main.k` 是定制化配置的具体代码，`stack.yaml` 存放的是是配置栈的描述信息；
`dev/ci-test` 目录存放的是动态编译配置和最终输出，默认情况下，编译输出到该目录下的 `stdout.golden.yaml` 文件。
整体来说，`.k` 文件是 KCL 源码，`.yaml` 是配置文件。

## 3. 配置编译

到此，已经借助 kusion 提供的内置模板，完成了项目的开发。
项目的编程语言是 KCL，不是 Kubernetes 认识的 JSON/YAML，因此还需要编译得到最终输出。

首先进入到项目的 Stack 目录（`deployment-single-stack/dev`）并执行编译：

```bash
cd deployment-single-stack/dev && kusion compile
```

输出默认保存在 `deployment-single-stack/dev/ci-test/stdout.golden.yaml` 文件中。

> 有关 kusion 命令行工具的说明，执行 `kusion -h`，或者参考工具的在线文档 [Overview of Kusion CLI](/docs/reference/cli/kusionctl/overview)。

## 4. 配置生效

完成编译，现在开始下发配置。通过查看 `stdout.golden.yaml` 文件，可以看到 3 个资源：

- 一个 name 为 deployment-single-stackdev 的 Deployment
- 一个 name 为 deployment-single-stack 的 Namespace
- 一个 name 为 frontend-service 的 Service

该文件的内容已经是 Kubernetes 能够识别的配置，可以使用 `kubectl apply -f stdout.golden.yaml` 直接下发配置，
也可以使用 `kusion apply` 完成配置编译并下发（该命令包含了配置编译）。

> 推荐使用 kusion 工具，本例中的编译输出是完整的 YAML 声明，但不是所有的 KCL 项目编译结果都是如此。

执行命令：

```bash
kusion apply
```

输出类似于：

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

以上就完成了配置生效，可以使用 `kubectl` 工具检查资源的实际状态。

1、 检查 Namespace

```bash
kubectl get ns
```

输出类似于：

```
NAME                      STATUS        AGE
argocd                    Active        59d
default                   Active        72d
deployment-single-stack   Active        10m
```

2、检查 Deployment

```bash
kubectl get deploy -n deployment-single-stack
```

输出类似于：

```
NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment-single-stackdev   1/1     1            1           11m
```

3、检查 Service

```bash
kubectl get svc -n deployment-single-stack
```

输出类似于：

```
NAME               TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
frontend-service   NodePort   10.0.0.0       <none>        80:10001/TCP   11m
```

4、检查应用

使用 `kubecl` 工具，将本机端口 `30000` 映射到 Service 端口 `80`

```bash
kubectl port-forward svc/frontend-service -n deployment-single-stack-xx 30000:80
```

打开浏览器访问 [http://127.0.0.1:30000](http://127.0.0.1:30000)：
![](/img/docs/user_docs/guides/working-with-k8s/app-preview.jpg)
