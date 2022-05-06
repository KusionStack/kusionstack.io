---
sidebar_position: 3
---

# Kubernetes

我们以 Kubernetes 官方的 Guestbook 为例子，展示 Kusion 工具对接 Kubernetes 的用法。Kubernetes 官方的例子在这里：

[https://github.com/kubernetes/examples/blob/master/guestbook/frontend-deployment.yaml](https://github.com/kubernetes/examples/blob/master/guestbook/frontend-deployment.yaml)

## 1. 安装依赖

- [安装 Kusion 工具](/docs/user_docs/getting-started/install)
- [克隆 Konfig 大库](https://github.com/KusionStack/konfig)

## 2. 初始化工程

第一步：进入 `Konfig/appops` 目录对应的命令行，输入 `kusion init` 命令初始化工程：

```
$ kusion init
Use the arrow keys to navigate: ↓ ↑ → ← 
? This command will initialize KCL file structure and base codes for a new project.Please choose a KCL schema type: 
  ▸ Server
```

选择工程的类型：目前只有一个 Server 类型，点击回车确定。然后输入工程的名字：

```
Use the arrow keys to navigate: ↓ ↑ → ← 
✔ Server
✔ project name: █emo
```

比如输入 `demo` 的名字然后回车确认。然后输入 stack 的名字（stack 是为了方便管理大量云原生应用而人为做的分类）：

```
Use the arrow keys to navigate: ↓ ↑ → ← 
✔ Server
project name: demo
stack name: █ev
```

然后选择默认集群的名字：

```
Use the arrow keys to navigate: ↓ ↑ → ← 
✔ Server
project name: demo
stack name: dev
✔ cluster name: █efault
cluster name: █efault
```

然后指定镜像：

```
Use the arrow keys to navigate: ↓ ↑ → ← 
✔ Server
project name: demo
stack name: dev
✔ cluster name: █efault
✔ image: █cr.io/google-samples/gb-frontend:v4
```

初始化完成后会产生一个 demo 目录，其中内容如下：

```
$ cd demo
$ tree .
.
├── README.md
├── base
│   └── base.k
├── dev
│   ├── ci-test
│   │   └── settings.yaml
│   ├── kcl.yaml
│   ├── main.k
│   └── stack.yaml
└── project.yaml

3 directories, 7 files
```

现在我们已经有一个完整的 Kusion 配置项目。

## 3. 理解代码内容

查看 base 目录的基线配置，其中 `base/base.k` 内容如下：

```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.container
import base.pkg.kusion_models.kube.templates.resource as res_tpl
import base.pkg.kusion_models.kube.frontend.service

# Application Configuration
appConfiguration: frontend.Server {
    # Main Container Configuration
    mainContainer = container.Main {
        name = "php-redis"
        env = [
            {
                name = "GET_HOSTS_FROM"
                value = "dns"
            }
        ]
        ports = [{containerPort = 80}]
    }
    selector = {
        "tier" = "frontend"
    }
    podMetadata.labels: {
        "tier" = "frontend"
    }
    schedulingStrategy.resource = res_tpl.medium
    services = [
        service.Service {
            name = "frontend-service"
            type = "NodePort"
            ports = [{port = 80}]
        }
    ]
}
```

其中包含主容器和应用的默认配置。基线配置参数相对相对，不过都是默认的配置，平时不需要经常修改。

`dev` 对应 stack 类型（常见的类型还有 gray 表示灰度、pre 表示预发、prod 表示正是版本等），这里表示开发状态的配置。 配置的入口在 `dev/main.k` 文件：

```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.templates.resource as res_tpl

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
appConfiguration: frontend.Server {
    image = "gcr.io/google-samples/gb-frontend:v4"
    schedulingStrategy.resource = res_tpl.tiny
}
```

`main.k` 中只需要填写和基线参数不一样的部分。比如 image 在基线的基础之后增加新的镜像路径，`schedulingStrategy.resource` 则是覆盖已有的基线配置。

另外，`project.yaml` 中记录了工程的名字 demo，`dev/stack.yaml` 中记录了当前目录的类型。

## 4. 认识 `apply` 命令

`kusion` 提供了一个 `apply` 子命令将当前 stack 中的一系列资源应用到运行时，它会根据 Konfig 堆栈中的 KCL 文件创建或更新或删除资源。 Kusion 默认会生成执行计划，并最终交给用户确认执行。

`apply` 命令的帮助信息如下：

```shell
$ kusion apply -h
Apply a series of resource changes within the stack.

 Create or update or delete resources according to the KCL files within a Konfig stack. By default, Kusion will generate
an execution plan and present it for your approval before taking any action.

 You can check the plan details and then decide if the actions should be taken or aborted.

Examples:
  # Apply with specifying work directory
  kusion apply -w /path/to/workdir
  
  # Apply with specifying arguments
  kusion apply -D name=test -D age=18
  
  # Apply with specifying setting file
  kusion apply -Y settings.yaml
  
  # Skip interactive approval of plan details before applying
  kusion apply --yes

Options:
  -D, --argument=[]: Specify the arguments to apply KCL. Example: kusion apply -D name=test -D age=18 | kusion apply
--argument name=test,age=18
  -d, --detail=false: Automatically show plan details after previewing it
      --operator='': Specify the operator. Example: kusion apply -operator dayuan.ldy
  -O, --overrides=[]: Specify the configuration override path and value
  -Y, --setting=[]: Specify the command line setting files. Example: kusion apply -Y settings.yaml
  -w, --workdir='': Specify the work directory.
  -y, --yes=false: Automatically approve and perform the update after previewing it

Usage:
  kusion apply [flags] [options]

Use "kusion apply options" for a list of global command-line options (applies to all commands).
```

## 5. 通过 `apply` 命令查看变更信息

在 `demo/dev` 目录下输入 `kusion apply` 命令查看执行计划：

```shell
$ kusion apply
 SUCCESS  Compiling in stack dev...

Stack: dev    Provider                Type              Name    Plan
      * ├─  kubernetes        v1:Namespace              demo  Create
      * ├─  kubernetes  apps/v1:Deployment           demodev  Create
      * └─  kubernetes          v1:Service  frontend-service  Create

Use the arrow keys to navigate: ↓ ↑ → ← 
? Do you want to apply these diffs?: 
  ▸ yes
    no
    details
```

在执行之前先切换到 `details` 选项回车查看详细信息：

```
✔ details
Use the arrow keys to navigate: ↓ ↑ → ← 
? Which diff detail do you want to see?: 
  ▸ all
    <kubernetes, v1:Namespace, demo> Create
    <kubernetes, v1:Service, frontend-service> Create
    <kubernetes, apps/v1:Deployment, demodev> Create
    cancel
```

可以查看新建的 Namespace、Service、Deployment 等资源。切换到 `all` 选项回车查看全部差异：

```
✔ details
✔ all

Provider: kubernetes
Type: apps/v1:Deployment
Name: demodev
Plan: Create
Diff: 
(root level)
± type change from <nil> to map
  - <nil>
  + id: 
    status: 
    attributes:
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: demodev
        namespace: demo
      spec:
        replicas: 1
        selector:
          matchLabels:
            app.kubernetes.io/env: dev
            app.kubernetes.io/instance: demo-dev
            app.kubernetes.io/name: demo
            cluster.x-k8s.io/cluster-name: default
            tier: frontend
        template:
          metadata:
            labels:
              app.kubernetes.io/env: dev
              app.kubernetes.io/instance: demo-dev
              app.kubernetes.io/name: demo
              cluster.x-k8s.io/cluster-name: default
              tier: frontend
          spec:
            containers:
            - env:
              - name: GET_HOSTS_FROM
                value: dns
              - name: APP_NAME
                value: demo
              - name: ENVIRONMENT
                value: dev
              - name: INSTANCE
                value: demo-dev
              - name: CLUSTER
                value: default
              image: gcr.io/google-samples/gb-frontend:v4
              name: php-redis
              ports:
              - containerPort: 80
                protocol: TCP
              resources:
                limits:
                  cpu: 100m
                  ephemeral-storage: 1Gi
                  memory: 100Mi
                requests:
                  cpu: 100m
                  ephemeral-storage: 1Gi
                  memory: 100Mi
    private: {}
    dependsOn: []

Provider: kubernetes
Type: v1:Namespace
Name: demo
Plan: Create
Diff: 
(root level)
± type change from <nil> to map
  - <nil>
  + id: 
    status: 
    attributes:
      apiVersion: v1
      kind: Namespace
      metadata:
        name: demo
    private: {}
    dependsOn: []

Provider: kubernetes
Type: v1:Service
Name: frontend-service
Plan: Create
Diff: 
(root level)
± type change from <nil> to map
  - <nil>
  + id: 
    status: 
    attributes:
      apiVersion: v1
      kind: Service
      metadata:
        name: frontend-service
        namespace: demo
      spec:
        ports:
        - port: 80
        selector:
          app.kubernetes.io/env: dev
          app.kubernetes.io/instance: demo-dev
          app.kubernetes.io/name: demo
          cluster.x-k8s.io/cluster-name: default
          tier: frontend
        type: NodePort
    private: {}
    dependsOn: []
```

## 6. 通过 `apply` 命令执行变更计划

在执行变更计划前需要确保本地可以链接到 Kubernetes 集群，如果是本地测试可以选择启动 Docker 自带的 Kubernetes 集群。

在 dev 目录下执行 `kusion apply` 命令，然后选择 yes 执行计划：

```
$ $ kusion apply
 SUCCESS  Compiling in stack dev...                                                                                                                        

Stack: dev    Provider                Type              Name    Plan
      * ├─  kubernetes        v1:Namespace              demo  Create
      * ├─  kubernetes  apps/v1:Deployment           demodev  Create
      * └─  kubernetes          v1:Service  frontend-service  Create

✔ yes
Start applying diffs......
 SUCCESS  Creating Namespace/demo
 SUCCESS  Creating Deployment/demodev
 SUCCESS  Creating Service/frontend-service
Creating Service/frontend-service [3/3] ██████████████████ 100% | 0s

Apply complete! Resources: 3 created, 0 updated, 0 deleted.
```

成功启动服务。

## 7. 查看服务信息

`kusion apply` 命令启动的服务在 demo 名字空间下，也就是执行 `kusion init` 命令时指定的参数，保存在 `demo/project.yaml` 文件中。

我们可以通过 Kubernetes 自带的 kubectl 命令查看下产生了哪些 deploy：

```
$ kubectl get --namespace demo deploy
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
demodev   1/1     1            1           12m
```

查看有哪些 pods：

```
$ kubectl get --namespace demo pods
NAME                       READY   STATUS    RESTARTS   AGE
demodev-6c85bfcc89-w67ns   1/1     Running   0          6m45s
```

查看有哪些 service：

```
$ kubectl get --namespace demo service
NAME               TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
frontend-service   NodePort   10.0.0.1         <none>        80:10080/TCP   10m
```

服务已经绑定到了宿主机器的 10080 端口，可以在浏览器打开 http://localhost:10080 查看：

![](./images/guestbook.png)

说明服务已经正常启动。
