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

## Chart 参数

以下表格列出了 Chart 的所有可配置参数及其默认值。

### General Parameters

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| namespace | string | `"karpor"` | Which namespace to be deployed. |
| namespaceEnabled | bool | `true` | Whether to generate namespace. |
| registryProxy | string | `""` | Image registry proxy will be the prefix as all component image. |

### Global Parameters

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| global.image.imagePullPolicy | string | `"IfNotPresent"` | Image pull policy to be applied to all Karpor components. |

### Karpor Server

The Karpor Server Component is main backend server. It itself is an `apiserver`, which also provides `/rest-api` to serve Dashboard.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| server.ai | object | `{"authToken":"","backend":"openai","baseUrl":"","model":"gpt-3.5-turbo","temperature":1,"topP":1}` | AI configuration section. The AI analysis feature requires that [authToken, baseUrl] be assigned values. |
| server.ai.authToken | string | `""` | Authentication token for accessing the AI service. |
| server.ai.backend | string | `"openai"` | Backend service or platform that the AI model is hosted on. Available options: <br/>- `"openai"`: OpenAI API (default)<br/>- `"azureopenai"`: Azure OpenAI Service<br/>- `"huggingface"`: Hugging Face API<br/> If the backend you are using is compatible with OpenAI, then there is no need to make any changes here. |
| server.ai.baseUrl | string | `""` | Base URL of the AI service. e.g., "https://api.openai.com/v1". |
| server.ai.model | string | `"gpt-3.5-turbo"` | Name or identifier of the AI model to be used. e.g., "gpt-3.5-turbo". |
| server.ai.temperature | float | `1` | Temperature parameter for the AI model. This controls the randomness of the output, where a higher value (e.g., 1.0) makes the output more random, and a lower value (e.g., 0.0) makes it more deterministic. |
| server.ai.topP | float | `1` | Top-p (nucleus sampling) parameter for the AI model. This controls Controls the probability mass to consider for sampling, where a higher value leads to greater diversity in the generated content (typically ranging from 0 to 1) |
| server.enableRbac | bool | `false` | Enable RBAC authorization if set to true. |
| server.image.repo | string | `"kusionstack/karpor"` | Repository for Karpor server image. |
| server.image.tag | string | `""` | Tag for Karpor server image. Defaults to the chart's appVersion if not specified. |
| server.name | string | `"karpor-server"` | Component name for karpor server. |
| server.port | int | `7443` | Port for karpor server. |
| server.replicas | int | `1` | The number of karpor server pods to run. |
| server.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | Resource limits and requests for the karpor server pods. |
| server.serviceType | string | `"ClusterIP"` | Service type for the karpor server. The available type values list as ["ClusterIP"、"NodePort"、"LoadBalancer"]. |

### Karpor Syncer

The Karpor Syncer Component is independent server to synchronize cluster resources in real-time.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| syncer.image.repo | string | `"kusionstack/karpor"` | Repository for Karpor syncer image. |
| syncer.image.tag | string | `""` | Tag for Karpor syncer image. Defaults to the chart's appVersion if not specified. |
| syncer.name | string | `"karpor-syncer"` | Component name for Karpor syncer. |
| syncer.port | int | `7443` | Port for Karpor syncer. |
| syncer.replicas | int | `1` | The number of karpor syncer pods to run. |
| syncer.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | Resource limits and requests for the karpor syncer pods. |

### ElasticSearch

The ElasticSearch Component to store the synchronized resources and user data.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| elasticsearch.image.repo | string | `"docker.elastic.co/elasticsearch/elasticsearch"` | Repository for ElasticSearch image. |
| elasticsearch.image.tag | string | `"8.6.2"` | Specific tag for ElasticSearch image. |
| elasticsearch.name | string | `"elasticsearch"` | Component name for ElasticSearch. |
| elasticsearch.port | int | `9200` | Port for ElasticSearch. |
| elasticsearch.replicas | int | `1` | The number of ElasticSearch pods to run. |
| elasticsearch.resources | object | `{"limits":{"cpu":"2","ephemeral-storage":"10Gi","memory":"4Gi"},"requests":{"cpu":"2","ephemeral-storage":"10Gi","memory":"4Gi"}}` | Resource limits and requests for the karpor elasticsearch pods. |

### ETCD

The ETCD Component is the storage of Karpor Server as `apiserver`.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| etcd.image.repo | string | `"quay.io/coreos/etcd"` | Repository for ETCD image. |
| etcd.image.tag | string | `"v3.5.11"` | Specific tag for ETCD image. |
| etcd.name | string | `"etcd"` | Component name for ETCD. |
| etcd.persistence.accessModes | list | `["ReadWriteOnce"]` | Volume access mode, ReadWriteOnce means single node read-write access |
| etcd.persistence.size | string | `"10Gi"` | Size of etcd persistent volume |
| etcd.port | int | `2379` | Port for ETCD. |
| etcd.replicas | int | `1` | The number of etcd pods to run. |
| etcd.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | Resource limits and requests for the karpor etcd pods. |

### Job

This one-time job is used to generate root certificates and some preliminary work.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| job.image.repo | string | `"kusionstack/karpor"` | Repository for the Job image. |
| job.image.tag | string | `""` | Tag for Karpor image. Defaults to the chart's appVersion if not specified. |



