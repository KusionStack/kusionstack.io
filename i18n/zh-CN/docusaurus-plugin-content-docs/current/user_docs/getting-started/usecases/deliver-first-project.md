---
sidebar_position: 1
---

# 在 Kubernetes 上交付你的第一个项目

本教程将演示如何只使用一个 Kusion 命令在 Kubernetes 上交付您的第一个项目（带有负载均衡器的应用程序）。

## 前置条件

- [Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes](https://kubernetes.io/) 或者 [Kind](https://kind.sigs.k8s.io/)

## 初始化项目

首先，让我们克隆 Konfig 仓库并进入根目录：

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

在这一步之后，我们可以使用在线模板初始化这个教程项目

```shell
kusion init --online
```

所有初始化模板如下：

```shell
➜  konfig git:(main) ✗ kusion init --online
? Please choose a template:  [Use arrows to move, type to filter]
> code-city                  Code City metaphor for visualizing Go source code in 3D.
  deployment-multi-stack     A minimal kusion project of multi stacks
  deployment-single-stack    A minimal kusion project of single stack
```

选择 `code-city` 并按 `Enter` 。 之后，我们将看到下面的提示，并使用默认值来配置这个项目和 Stack。

![](/img/docs/user_docs/getting-started/choose-template.gif)

在此过程之后，我们可以使用此命令获取整个文件层次结构：

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

:::info
 更多关于目录结构的细节请参见 [Konfig](/docs/user_docs/concepts/konfig).
:::

### 查看配置文件

```python
# main.k
import base.pkg.kusion_models.kube.frontend

# 堆栈中的应用程序配置将被覆盖 base 中具有相同属性的配置。
appConfiguration: frontend.Server {
    image = "howieyuen/gocity:latest"
}
```

`main.k` 只包含 4 行。 第 1 行导入一个包含模型 `Server` 的 包，它是一个抽象模型，表示我们稍后将交付的应用程序。这种模型隐藏了 Kubernetes `Deployment` 和 `Service` 的复杂性，只需要一个字段 `image` 就可以让这个 App 准备好被使用。

:::info
更多关于 Konfig 模型的详细信息请参见 [Konfig](https://github.com/KusionStack/konfig)
:::

## 交付

```shell
cd dev && kusion apply --watch
```

转到 `dev` 文件夹，我们将使用 `kusion apply --watch` 命令将此应用程序交付到 Kubernetes 集群中

![](/img/docs/user_docs/getting-started/apply.gif)

检查 `Deploy` 状态

```shell
kubectl -ncode-city get deploy
```

预期输出如下所示：

```shell
➜  dev git:(main) ✗ kubectl -ncode-city get deploy
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
code-citydev   1/1     1            1           1m
```

使用 `service` 转发该应用程序

```shell
kubectl port-forward -ncode-city svc/gocity 4000:4000
```

```shell
➜  dev git:(main) ✗ kubectl port-forward -ncode-city svc/gocity 4000:4000
Forwarding from 127.0.0.1:4000 -> 4000
Forwarding from [::1]:4000 -> 4000
```

随后在你的浏览器中访问 [http://localhost:4000/#/github.com/KusionStack/kusion](http://localhost:4000/#/github.com/KusionStack/kusion)。

![](/img/docs/user_docs/getting-started/gocity.png)
