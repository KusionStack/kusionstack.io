---
title: 如何创建 token
---
在这篇文档中，你将了解如何使用 token 访问 Karpor dashboard。

[Hub cluster](../2-concepts/3-glossary.md#hub-cluster) 采用了与 Kubernetes 相同的基于角色的访问控制（RBAC）机制。这意味着，要访问 hub cluster，用户需要在 hub cluster 上创建 ClusterRole、ServiceAccount，以及相应的 ClusterRoleBinding 来将两者绑定。为了提升用户体验，我们预设了两种 ClusterRole：karpor-admin 和 karpor-guest。karpor-admin 角色拥有在面板上执行所有操作的权限，包括但不限于添加或删除集群、创建资源组等；而 karpor-guest 角色则仅限于在面板上进行查看操作。随着对 Karpor 的深入了解，用户可以根据自身需求，创建额外的 ClusterRole，实现更细致的权限管理。

## 导出 Hub Cluster 的 kubeconfig

由于 hub cluster 需要 kubeconfig 进行验证，可以通过以下命令一键导出用于访问 hub cluster 的 kubeconfig。
```shell
# 以下操作在安装 Karpor 的 Kubernetes 集群中运行
kubectl get configmap karpor-kubeconfig -n karpor -o go-template='{{.data.config}}'
```

**注意**：请确保本地机器可访问 hub cluster 的 kubeconfig 中的 server 地址。如在本地集群部署 karpor，需将 karpor-server 服务转发至本地端口 7443，并将 server 地址改为 `https://127.0.0.1:7443`。

## 将 hub cluster 的服务转发到本地

在本节中，我们假设你将 karpor 部署在了本地集群。

如上节所说，为了在本地访问 hub cluster，你需要将 karpor-server 的服务转发到本地。如果你使用了其他方法进行了转发，可以跳过这一步。这里使用简单的 port-forward 进行转发，打开另一个终端，运行：

```shell
# 以下操作在安装 Karpor 的 Kubernetes 集群中运行
kubectl -n karpor port-forward svc/karpor-server 7443:7443
```

## 为你的用户创建 ServiceAccount 和 ClusterRoleBinding

你可以用如下命令在 hub cluster 中创建 karpor-admin 和 karpor-guest 以及对应 clusterrolebinding:

```shell
# 以下操作在 hub cluster 中运行
# 创建 karpor-admin 并绑定到 clusterrole
export KUBECONFIG=<Hub Cluster KUBECONFIG>
kubectl create serviceaccount karpor-admin
kubectl create clusterrolebinding karpor-admin --clusterrole=karpor-admin --serviceaccount=default:karpor-admin
# 创建 karpor-guest 并绑定到 clusterrole
kubectl create serviceaccount karpor-guest
kubectl create clusterrolebinding karpor-guest --clusterrole=karpor-guest --serviceaccount=default:karpor-guest
```

## 为你的用户创建 token

默认情况下，token 的有效期是 1 个小时。如果你需要长期 token，可以指定在生成 token 时指定过期时间。比如：

```shell
# 以下操作在 hub 集群中运行
export KUBECONFIG=<Hub cluster KUBECONFIG>
kubectl create token karpor-admin --duration=1000h
```

默认参数下， token 的最长有效期为 8760h（1 年）。如果你需要修改这个最长有效期，可以在 karpor-server 的启动参数中添加 `--service-account-max-token-expiration={MAX_EXPIRATION:h/m/s}`

## 开始安全地使用 Karpor

复制刚刚生成的 token，粘贴到 Karpor dashboard 的 token 输入框中， 点击登录。

在安全环境下开启你的 Karpor 之旅吧！

