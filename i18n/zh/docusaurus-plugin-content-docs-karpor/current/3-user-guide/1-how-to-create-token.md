---
title: 如何创建 token
---
在这篇文档中，你将了解如何使用 token 访问 Karpor dashboard。

Karpor-server 使用和 Kubernetes 相同的 RBAC 方法，也就是说，为了访问 Karpor，你需要在 karpor-server (不是使用 helm 安装 Karpor 的 Kubernetes 集群）上创建 ClusterRole，ServiceAccount，以及用于绑定两者的 ClusterRoleBinding。为了简化体验，我们内置了两种 ClsuterRole，分别是 karpor-admin 和 karpor-guest。karpor-admin 可以在 dashboard 进行所有操作，比如增删集群，添加资源组等，而 karpor-guest 只能在 dashboard 中进行查看。对 karpor 了解更多之后，你也可以根据需要自行创建更多的 ClusterRole，以对权限进行更精细的控制。

## 导出 Karpor kubeconfig

由于 karpor-server 也需要 kubeconfig 进行验证，我们需要导出将用于访问 karpor-server 的 kubeconfig。

```shell
# 以下操作在安装 Karpor 的 Kubernetes 集群中运行
kubectl get configmap karpor-kubeconfig -n karpor -o yaml
```

把这个这个 configmap 的 data 字段中导出到你本地的 kubeconfig。

## 将 karpor-server 的服务转发到本地

接下来，你需要将 karpor-server 的服务转发到本地。如果你使用了其他方法进行了转发，可以跳过这一步。这里使用简单的 port-forward 进行转发，打开另一个终端，运行：

```shell
# 以下操作在安装 Karpor 的 Kubernetes 集群中运行
kubectl -n karpor port-forward svc/karpor-server 7443:7443
```

## 为你的用户创建 ServiceAccount 和 ClusterRoleBinding

你可以用如下命令创建 karpor-admin 和 karpor-guest 两个 ServiceAccount 以及对应的 ClusterRoleBinding：

```shell
# 以下操作在 Karpor 集群中运行
kubectl create serviceaccount karpor-admin
kubectl create clusterrolebinding  karpor-admin --clusterrole=karpor-admin --serviceaccount=default:karpor-admin
kubectl create serviceaccount karpor-guest
kubectl create clusterrolebinding  karpor-guest --clusterrole=karpor-guest --serviceaccount=default:karpor-guest
```

## 为你的用户创建 token

默认情况下，token 的有效期是 1 个小时。如果你需要长期 token，可以指定在生成 token 时指定过期时间。比如：

```shell
# 以下操作在 Karpor 集群中运行
kubectl create token karpor-admin --duration=1000h
```

默认参数下， token 的最长有效期为 8760h（1 年）。如果你需要修改这个最长有效期，可以在 karpor-server 的启动参数中添加 `--service-account-max-token-expiration={MAX_EXPIRATION:h/m/s}`

## 开始安全地使用 Karpor

复制刚刚生成的 token，粘贴到 Karpor dashboard 的 token 输入框中， 点击登录。
在安全环境下开启你的 Karpor 之旅吧！
