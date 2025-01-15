---
title: 安装
---

## 使用 Helm 安装

如果您拥有 Kubernetes 集群，Helm 是推荐的安装方法。

以下教程将指导您使用 Helm 安装 Karpor，这将在命名空间 `karpor` 中以 `karpor-release` 为 Release 名称安装 Chart。

### 先决条件

* Helm v3+
* Kubernetes 集群（最简单的方法是使用 `kind` 或 `minikube` 在本地部署 Kubernetes 集群）

### 远程安装

首先，将 Karpor chart 仓库添加到您的本地仓库。

```shell
helm repo add kusionstack https://kusionstack.github.io/charts
helm repo update
```

然后，您可以使用以下命令安装 Karpor 的最新版本。

```shell
helm install karpor-release kusionstack/karpor
```

![安装](./assets/2-installation/install.gif)

**注意**：直接安装此 Chart 意味着它将使用 Karpor 的 [默认模板值](https://github.com/KusionStack/charts/blob/master/charts/karpor/values.yaml)。

如果将其部署到生产集群中，或者您想要自定义 Chart 配置，如 `resources`、`replicas`、`port` 等，您可以通过 `--set` 参数覆盖默认值。

Karpor Chart 的所有可配置参数都详细说明在 [这里](#chart-参数)。

```shell
helm install karpor-release kusionstack/karpor --set server.replicas=3 --set syncer.port=7654
```

### 查看所有可用版本

您可以使用以下命令查看所有可安装的 Karpor Chart 版本。

```shell
helm repo update
helm search repo kusionstack/karpor --versions
```

### 升级到指定版本

您可以通过 `--version` 指定要升级的版本。

```shell
# 升级到最新版本
helm upgrade karpor-release kusionstack/karpor

# 升级到指定版本
helm upgrade karpor-release kusionstack/karpor --version 1.2.3
```

### 本地安装

如果您在生产中连接 [https://kusionstack.github.io/charts/](https://kusionstack.github.io/charts/) 有问题，您可能需要从 [这里](https://github.com/KusionStack/charts) 手动下载 Chart，并在本地使用它来安装或升级 Karpor 版本。

```shell
git clone https://github.com/KusionStack/charts.git
helm install karpor-release charts/karpor
helm upgrade karpor-release charts/karpor
```

### 卸载

卸载/删除命名空间 `karpor` 中的 `karpor-release` Helm Release：

```shell
helm uninstall karpor-release
```

### 中国镜像代理

如果你在中国、并且从官方 DockerHub 上拉取镜像时遇到困难，那么你可以使用第三方的镜像代理服务：

```shell
helm install karpor-release kusionstack/karpor --set registryProxy=docker.m.daocloud.io
```

**注意**: 以上只是一个样例，你可以根据需要替换 `registryProxy` 的值。

### 启用 AI 功能

如果您要安装带有AI功能的Karpor，包括自然语言搜索和AI分析，则应配置 `ai-auth-token` 和 `ai-base-url`，例如：

```shell
# 至少需要配置 server.ai.authToken 和 server.ai.baseUrl。
helm install karpor-release kusionstack/karpor \
--set server.ai.authToken=YOUR_AI_TOKEN \
--set server.ai.baseUrl=https://api.openai.com/v1
# server.ai.backend 的默认值是 `openai`，可以根据需要进行覆盖。如果你使用的后端与 OpenAI 兼容，则无需在此处进行任何更改。
helm install karpor-release kusionstack/karpor \
--set server.ai.authToken=YOUR_AI_TOKEN \
--set server.ai.baseUrl=https://api.openai.com/v1 \
--set server.ai.backend=huggingface
# server.ai.model 的默认值是 `gpt-3.5-turbo`，可以根据需要进行覆盖。
helm install karpor-release kusionstack/karpor \
--set server.ai.authToken=YOUR_AI_TOKEN \
--set server.ai.baseUrl=https://api.openai.com/v1 \
--set server.ai.model=gpt-4o
# server.ai.topP 和 server.ai.temperature 也可以手动修改。
helm install karpor-release kusionstack/karpor \
--set server.ai.authToken=YOUR_AI_TOKEN \
--set server.ai.baseUrl=https://api.openai.com/v1 \
--set server.ai.topP=0.5 \
--set server.ai.temperature=0.2
```

### Chart 参数

以下表格列出了 Chart 的所有可配置参数及其默认值。

#### 通用参数

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| namespace | string | `"karpor"` | 部署的目标命名空间 |
| namespaceEnabled | bool | `true` | 是否生成命名空间 |
| registryProxy | string | `""` | 镜像代理地址，配置后将作为所有组件镜像的前缀。 比如，`golang:latest` 将替换为 `<registryProxy>/golang:latest` |

#### 全局参数

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| global.image.imagePullPolicy | string | `"IfNotPresent"` | 应用于所有 Karpor 组件的镜像拉取策略 |

#### Karpor Server

Karpor Server 组件是主要的后端服务。它本身就是一个 `apiserver`，也提供 `/rest-api` 来服务 Web UI

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| server.image.repo | string | `"kusionstack/karpor"` | Karpor Server 镜像的仓库 |
| server.image.tag | string | `""` | Karpor Server 镜像的标签。如果未指定，则默认为 Chart 的 appVersion |
| server.name | string | `"karpor-server"` | Karpor Server 的组件名称 |
| server.port | int | `7443` | Karpor Server 的端口 |
| server.replicas | int | `1` | 要运行的 Karpor Server pod 的数量 |
| server.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | Karpor Server pod 的资源规格 |
| server.serviceType | string | `"ClusterIP"`                                                                                                                                | Karpor Server 的服务类型，可用的值为 ["ClusterIP"、"NodePort"、"LoadBalancer"] |

#### Karpor Syncer

Karpor Syncer 组件是独立的服务，用于实时同步集群资源。

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| syncer.image.repo | string | `"kusionstack/karpor"` | Karpor Syncer 镜像的仓库 |
| syncer.image.tag | string | `""` | Karpor Syncer 镜像的标签。如果未指定，则默认为 Chart 的 appVersion |
| syncer.name | string | `"karpor-syncer"` | karpor Syncer 的组件名称 |
| syncer.port | int | `7443` | karpor Syncer 的端口 |
| syncer.replicas | int | `1` | 要运行的 karpor Syncer pod 的数量 |
| syncer.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | karpor Syncer pod 的资源规格 |

#### ElasticSearch

ElasticSearch 组件用于存储同步的资源和用户数据。

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| elasticsearch.image.repo | string | `"docker.elastic.co/elasticsearch/elasticsearch"` | ElasticSearch 镜像的仓库 |
| elasticsearch.image.tag | string | `"8.6.2"` | ElasticSearch 镜像的特定标签 |
| elasticsearch.name | string | `"elasticsearch"` | ElasticSearch 的组件名称 |
| elasticsearch.port | int | `9200` | ElasticSearch 的端口 |
| elasticsearch.replicas | int | `1` | 要运行的 ElasticSearch pod 的数量 |
| elasticsearch.resources | object | `{"limits":{"cpu":"2","ephemeral-storage":"10Gi","memory":"4Gi"},"requests":{"cpu":"2","ephemeral-storage":"10Gi","memory":"4Gi"}}` | karpor elasticsearch pod 的资源规格 |

#### ETCD

ETCD 组件是 Karpor Server 作为 `apiserver` 背后的存储。

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| etcd.image.repo | string | `"quay.io/coreos/etcd"` | ETCD 镜像的仓库 |
| etcd.image.tag | string | `"v3.5.11"` | ETCD 镜像的标签 |
| etcd.name | string | `"etcd"` | ETCD 的组件名称 |
| etcd.persistence.accessModes[0] | string | `"ReadWriteOnce"` |  |
| etcd.persistence.size | string | `"10Gi"` |  |
| etcd.port | int | `2379` | ETCD 的端口 |
| etcd.replicas | int | `1` | 要运行的 etcd pod 的数量 |
| etcd.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | karpor etcd pod 的资源规格 |

#### Job

这是一个一次性 Kubernetes Job，用于生成根证书和一些前置工作。Karpor Server 和 Karpor Syncer 都需要依赖它完成才能正常启动。

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| job.image.repo | string | `"kusionstack/karpor"` | Job 镜像的仓库 |
| job.image.tag | string | `""` | Karpor 镜像的标签。如果未指定，则默认为 Chart 的 appVersion |
