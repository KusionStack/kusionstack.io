---
title: 快速开始
---
## 前提条件

* 确保已安装 [kubectl](https://kubernetes.io/docs/tasks/tools/)。
* 确保已安装 [helm](https://helm.sh/docs/intro/install/)。
* 如果你没有现成的集群，你仍然需要一个 [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation/)。

## 创建集群（可选）

首先，如果你没有现成的集群，可以使用 `kind` 工具在本地环境中创建一个 Kubernetes 集群。按照以下步骤操作：

1. 创建集群。你可以使用以下命令创建名为 `demo-cluster` 的集群：
   ```shell
   kind create cluster --name demo-cluster
   ```

   这将在你的本地 Docker 环境中创建一个新的 Kubernetes 集群。稍等片刻，直到集群创建完成。
2. 通过执行以下命令验证集群是否正常运行：
   ```shell
   kubectl cluster-info
   ```

   如果一切设置正确，你将看到你的 Kubernetes 集群信息。

## 安装

要安装 Karpor，请在终端中执行以下命令：

```shell
helm repo add kusionstack https://kusionstack.github.io/charts 
helm repo update
helm install karpor kusionstack/karpor
```

更多的安装详情，请参考 [安装文档](2-installation.md)。

![安装](./assets/2-installation/install.gif)

## 访问 Karpor Web 界面

1. 运行以下命令来访问运行在集群中的 Karpor 服务：
   ```shell
   kubectl -n karpor port-forward service/karpor-server 7443:7443
   ```

   执行这条命令后，如果你访问本地机器上的 7443 端口，流量会被转发到 Kubernetes 集群中 karpor-server 服务的 7443 端口。
2. 打开浏览器并输入以下 URL：
   ```shell
   https://127.0.0.1:7443 
   ```

这将打开 Karpor 的 Web 界面。👇

![在浏览器中打开](./assets/2-installation/open-in-browser.gif)

祝贺你！🎉 你已成功安装 Karpor。现在你可以开始使用 Karpor 探索和洞察多集群中的资源。

## 创建访问令牌

在注册集群之前，你需要创建一个访问令牌来登录 Karpor Web 界面。以下是创建令牌的简要步骤：

1. 导出 Hub Cluster 的 KubeConfig:

```shell
kubectl get configmap karpor-kubeconfig -n karpor -o go-template='{{.data.config}}' > $HOME/.kube/karpor-hub-cluster.kubeconfig
```

2. 创建 ServiceAccount 和 ClusterRoleBinding:

```shell
export KUBECONFIG=$HOME/.kube/karpor-hub-cluster.kubeconfig
kubectl create serviceaccount karpor-admin
kubectl create clusterrolebinding karpor-admin --clusterrole=karpor-admin --serviceaccount=default:karpor-admin
```

3. 创建令牌:

```shell
kubectl create token karpor-admin --duration=1000h
```

复制生成的令牌,稍后将用于登录 Karpor Web 界面。

有关创建令牌的详细说明,请参阅 [如何创建 Token](../3-user-guide/1-how-to-create-token.md) 文档。

## 注册集群

要向 Karpor 注册新集群，请按照以下步骤操作：

1. 使用上一步创建的令牌登录 Karpor Web 界面。
2. 打开 Karpor Web 界面中的 <kbd>集群管理</kbd> 部分。
3. 点击 <kbd>接入集群</kbd> 按钮。
4. 按照界面上的说明完成集群注册过程。

5. 在注册集群时，请注意以下事项：

   - 集群名称必须唯一且一旦创建不能更改。
   - 确保上传的集群证书中的 server 地址（目标集群地址）与 Karpor 之间有网络连通性。
   - 如果你在本地集群中部署了 Karpor，并希望注册该本地集群，则需要将集群证书中的 server 地址修改为集群内部地址 `https://kubernetes.default.svc.cluster.local:443`，以确保 Karpor 能够直接访问目标集群。
   - 如果要注册 EKS 集群，需要对 kubeconfig 进行额外的配置，包括添加 `env`、`interactiveMode` 和 `provideClusterInfo` 字段。详细步骤请参考 [多集群管理](../3-user-guide/2-multi-cluster-management.md) 文档中的 "注册 EKS 集群" 部分。

6. 完成上述步骤后，点击 <kbd>验证并提交</kbd> 按钮。

以下是 `注册集群` 页面的示例：

![](/karpor/assets/cluster-mng/cluster-mng-register-new-cluster.png)

有关注册过程的更详细解释，请参阅 [多集群管理](../3-user-guide/2-multi-cluster-management.md) 指南。

## 搜索资源

Karpor 提供了一个强大的搜索功能，允许你快速跨集群查找资源。要使用此功能：

1. 打开 Karpor Web 界面中的 <kbd>搜索</kbd> 页面。
2. 输入你要查找的资源的搜索条件。

以下是 `搜索` 页面的示例：

![](/karpor/assets/search/search-auto-complete.png)
![](/karpor/assets/search/search-result.png)

要了解更多关于搜索功能以及如何有效使用它们的说明，请查看 [搜索方法](../5-references/3-search-methods.md) 指南。

## 资源洞察

通过点击搜索结果，你可以进入到资源的**洞察**页面，在这里你可以查看资源风险报告、健康分、资源关系拓扑图等经过我们提炼的信息。

以下是 `洞察` 页面的示例：

![](/karpor/assets/insight/insight-home.png)
![](/karpor/assets/insight/insight-single-issue.png)
![](/karpor/assets/insight/insight-topology.png)

## 结论

请注意，本指南仅提供 Karpor 的快速入门，你可能需要参考其他文档和资源来深入地了解每个功能。

## 下一步

- 了解 Karpor 的 [架构](../concepts/architecture) 和 [术语表](../concepts/glossary)。
- 查看 [用户指南](../user-guide/multi-cluster-management) 以了解 Karpor 的更多功能。
