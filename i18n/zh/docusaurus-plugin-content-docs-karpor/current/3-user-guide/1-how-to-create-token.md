---
title: 如何创建 Token
---
在这篇文档中，你将了解如何使用 token 访问 Karpor dashboard。

[Hub Cluster](../2-concepts/3-glossary.md#hub-cluster) 采用了与 Kubernetes 相同的基于角色的访问控制（RBAC）机制。这意味着，要访问 Hub Cluster，用户需要在 Hub Cluster 上创建 ClusterRole、ServiceAccount，以及相应的 ClusterRoleBinding 来将两者绑定。为了提升用户体验，我们预设了两种 ClusterRole：karpor-admin 和 karpor-guest。karpor-admin 角色拥有在面板上执行所有操作的权限，包括但不限于添加或删除集群、创建资源组等；而 karpor-guest 角色则仅限于在面板上进行查看操作。随着对 Karpor 的深入了解，用户可以根据自身需求，创建额外的 ClusterRole，实现更细致的权限管理。

## 导出 Hub Cluster 的 KubeConfig

由于 Hub Cluster 需要 kubeconfig 进行验证，可以通过以下命令一键导出用于访问 Hub Cluster 的 kubeconfig。
```shell
# 以下操作在安装 Karpor 的 Kubernetes 集群中运行
kubectl get configmap karpor-kubeconfig -n karpor -o go-template='{{.data.config}}' > $HOME/.kube/karpor-hub-cluster.kubeconfig
```

**注意**：确保本地可访问 Hub Cluster kubeconfig 中的 server 地址。默认为集群内部地址（https://karpor-server.karpor.svc:7443），本地无法直接连接。如在本地部署 Karpor，需将 karpor-server 服务转发至本地 7443 端口，并将 server 地址改为 `https://127.0.0.1:7443`。

执行以下命令可将 Hub Cluster 证书中的访问地址一键改为本地地址（Windows 用户需手动替换）:
```shell
sed -i '' 's/karpor-server.karpor.svc/127.0.0.1/g' $HOME/.kube/karpor-hub-cluster.kubeconfig
```

## 将 Hub Cluster 的服务转发到本地

在本节中，我们假设你将 Karpor 部署在了本地集群（比如用 kind 或者 minikube 创建的集群）。

如上节所说，为了在本地访问 Hub Cluster，你需要将 karpor-server 的服务转发到本地。如果你使用了其他方法进行了转发，可以跳过这一步。这里使用简单的 port-forward 进行转发，打开另一个终端，运行：

```shell
# 以下操作在安装 Karpor 的 Kubernetes 集群中运行
kubectl -n karpor port-forward svc/karpor-server 7443:7443
```

## 为你的用户创建 ServiceAccount 和 ClusterRoleBinding

本节将指导你如何在 Hub Cluster 中创建 karpor-admin 和 karpor-guest 用户，并为它们分配相应的 ClusterRoleBinding。以下是具体的操作步骤：

首先，指定 kubectl 连接的目标集群为 Hub Cluster：
```shell
export KUBECONFIG=$HOME/.kube/karpor-hub-cluster.kubeconfig
```

然后，我们将创建两个常用的身份：管理员（karpor-admin）和访客（karpor-guest）。这个过程包括创建 ServiceAccount 并将其绑定到相应的 ClusterRole：

```shell
kubectl create serviceaccount karpor-admin
kubectl create clusterrolebinding karpor-admin --clusterrole=karpor-admin --serviceaccount=default:karpor-admin
kubectl create serviceaccount karpor-guest
kubectl create clusterrolebinding karpor-guest --clusterrole=karpor-guest --serviceaccount=default:karpor-guest
```

## 为你的用户创建 Token

以下操作需在 Hub Cluster 中执行，请确保已正确设置 kubectl 连接到 Hub Cluster：
```shell
export KUBECONFIG=$HOME/.kube/karpor-hub-cluster.kubeconfig
```

默认情况下，token 的有效期为 1 小时。如果你需要长期使用的 token，可以在生成时指定更长的过期时间。例如：
```shell
kubectl create token karpor-admin --duration=1000h
```

默认参数下， token 的最长有效期为 8760h（1 年）。如果你需要修改这个最长有效期，可以在 karpor-server 的启动参数中添加 `--service-account-max-token-expiration={MAX_EXPIRATION:h/m/s}`。

**注意**：创建 token 需要 v1.25.0 或更高版本的 kubectl 。

## 开始安全地使用 Karpor

复制刚刚生成的 token，粘贴到 Karpor dashboard 的 token 输入框中， 点击登录。

在安全环境下开启你的 Karpor 之旅吧！

