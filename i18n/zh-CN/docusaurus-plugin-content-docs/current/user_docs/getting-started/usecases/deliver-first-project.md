---
sidebar_position: 1
---

# 在 Kubernetes 上交付你的第一个项目

本教程将演示如何只使用一个 Kusion 命令在 Kubernetes 上交付您的第一个单应用，单Stack的项目。

## 前置条件

在开始之前，我们需要做以下准备工作：

1、安装 Kusion 工具链

我们推荐使用 HomeBrew(Mac)，Scoop(Windows)，或者安装脚本安装Kusion。详情信息请参阅[下载和安装](/docs/user_docs/getting-started/install)。

2、可用的 Kubernetes 集群

必须要有一个 Kubernetes 集群，同时 Kubernetes 集群最好带有 [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) 命令行工具。
如果您还没有集群，您可以通过 [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) 构建一个您自己的集群。

## 初始化项目

我们可以使用在线模板初始化这个教程项目

```shell
kusion init --online
```

所有初始化模板如下：

```shell
~/playground$ kusion init --online
? Please choose a template:  [Use arrows to move, type to filter]
> code-city                  Code City metaphor for visualizing Go source code in 3D.
  deployment-multi-stack     A minimal kusion project of multiple stacks
  deployment-single-stack    A minimal kusion project of single stack
  wordpress                  A sample wordpress project
```

选择 `code-city` 并按 `Enter` 。 之后，我们将看到下面的提示，并使用默认值来配置这个项目和 Stack。

![](/img/docs/user_docs/getting-started/init-gocity.gif)

在此过程之后，我们可以使用此命令获取整个文件层次结构：

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
更多关于目录结构的细节请参见 [Concepts](/docs/user_docs/concepts/glossary).
:::

### 查看配置文件

我们来看一下`code-city/dev/main.k`下的配置文件：
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

`main.k` 配置文件包含了一个名为`gocity` 的 `AppConfiguration` 实例。它代表了一个应用，这个应用有一个`wl.Service`类型的工作负载，工作负载有一个副本，并且对外暴露4000端口。这份配置屏蔽了复杂的 Kubernetes 基础设施细节，比如 `Namespace`, `Deployment` 和 `Service` 等，只对外暴露以应用为中心和与基础设施无关的概念。

:::info
更多关于模型的详细信息请参见 [Catalog](https://github.com/KusionStack/catalog)
:::

## 交付

```shell
cd code-city/dev && kusion apply --watch
```

转到 `dev` 文件夹，我们将使用 `kusion apply --watch` 命令将此应用程序交付到 Kubernetes 集群中

![](/img/docs/user_docs/getting-started/apply.gif)

检查 `Deploy` 状态

```shell
kubectl -n gocity get deploy
```

预期输出如下所示：

```shell
~/playground/code-city/dev$ kubectl -n gocity get deploy
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
gocity-dev-gocity   1/1     1            1           3m37s
```

使用 `service` 转发该应用程序

```shell
kubectl port-forward -n gocity svc/gocity-dev-gocity-private 4000:4000
```

```shell
~/playground/code-city/dev$ kubectl port-forward -n gocity svc/gocity-dev-gocity-private 4000:4000
Forwarding from 127.0.0.1:4000 -> 4000
Forwarding from [::1]:4000 -> 4000
```

随后在你的浏览器中访问 [http://localhost:4000/#/github.com/KusionStack/kusion](http://localhost:4000/#/github.com/KusionStack/kusion)。

![](/img/docs/user_docs/getting-started/gocity.png)
