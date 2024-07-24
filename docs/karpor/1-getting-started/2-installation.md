---
title: Installation
---
## Install with helm

If you have a kubernetes cluster, helm is the recommended installation method.

The following tutorial will guide you to install Karpor using Helm, which will install the chart with the release name `karpor-release` in namespace `karpor`.

### Prerequisites

* Helm v3+
* A Kubernetes Cluster (The simplest way is to deploy a kubernetes cluster locally using `kind` or `minikube`)

### Remote Installation

First, add the karpor chart repo to your local repository.

```shell
helm repo add kusionstack https://kusionstack.github.io/charts
helm repo update
```

Then you can use the following command to install the latest version of Karpor.

```shell
helm install karpor-release kusionstack/karpor
```

**Note** that installing this chart directly means it will use the [default template values](https://github.com/KusionStack/charts/blob/master/charts/karpor/values.yaml) for Karpor.

You may have to set your specific configurations if it is deployed into a production cluster, or you want to customize the chart configuration, such as `resources`, `replicas`, `port` etc.

All configurable parameters of the Karpor chart are detailed [here](#chart-configuration).

```shell
helm install karpor-release kusionstack/karpor --set server.replicas=3 --set syncer.port=7654
```

![Install](./assets/2-installation/install.gif)


### Search all available versions

You can use the following command to view all installable chart versions.

```shell
helm repo update
helm search repo kusionstack/karpor --versions
```

### Upgrade specified version 

You can specify the version to be upgraded through the `--version`.

```shell
# Upgrade to the latest version.
helm upgrade karpor-release kusionstack/karpor

# Upgrade to the specified version.
helm upgrade karpor-release kusionstack/karpor --version 1.2.3
```

### Local Installation

If you have problem connecting to [https://kusionstack.github.io/charts/](https://kusionstack.github.io/charts/) in production, you may need to manually download the chart from [here](https://github.com/KusionStack/charts) and use it to install or upgrade locally.

```shell
git clone https://github.com/KusionStack/charts.git
helm install karpor-release charts/karpor
helm upgrade karpor-release charts/karpor
```

### Uninstall

To uninstall karpor:

```shell
helm uninstall karpor-release
```

### Chart Configuration

The following table lists the configurable parameters of the chart and their default values.

#### General Parameters

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| namespace | string | `"karpor"` | Which namespace to be deployed. |
| namespaceEnabled | bool | `true` | Whether to generate namespace. |
| registryProxy | string | `""` | Image registry proxy will be the prefix as all component image. |

#### Global Parameters

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| global.image.imagePullPolicy | string | `"IfNotPresent"` | Image pull policy to be applied to all Karpor components. |

#### Karpor Server

The Karpor Server Component is main backend server. It itself is an `apiserver`, which also provides `/rest-api` to serve Dashboard.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| server.image.repo | string | `"kusionstack/karpor"` | Repository for Karpor server image. |
| server.image.tag | string | `""` | Tag for Karpor server image. Defaults to the chart's appVersion if not specified. |
| server.name | string | `"karpor-server"` | Component name for karpor server. |
| server.port | int | `7443` | Port for karpor server. |
| server.replicas | int | `1` | The number of karpor server pods to run. |
| server.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | Resource limits and requests for the karpor server pods. |

#### Karpor Syncer

The Karpor Syncer Component is independent server to synchronize cluster resources in real-time.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| syncer.image.repo | string | `"kusionstack/karpor"` | Repository for Karpor syncer image. |
| syncer.image.tag | string | `""` | Tag for Karpor syncer image. Defaults to the chart's appVersion if not specified. |
| syncer.name | string | `"karpor-syncer"` | Component name for Karpor syncer. |
| syncer.port | int | `7443` | Port for Karpor syncer. |
| syncer.replicas | int | `1` | The number of karpor syncer pods to run. |
| syncer.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | Resource limits and requests for the karpor syncer pods. |

#### ElasticSearch

The ElasticSearch Component to store the synchronized resources and user data.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| elasticsearch.image.repo | string | `"docker.elastic.co/elasticsearch/elasticsearch"` | Repository for ElasticSearch image. |
| elasticsearch.image.tag | string | `"8.6.2"` | Specific tag for ElasticSearch image. |
| elasticsearch.name | string | `"elasticsearch"` | Component name for ElasticSearch. |
| elasticsearch.port | int | `9200` | Port for ElasticSearch. |
| elasticsearch.replicas | int | `1` | The number of ElasticSearch pods to run. |
| elasticsearch.resources | object | `{"limits":{"cpu":"2","ephemeral-storage":"10Gi","memory":"4Gi"},"requests":{"cpu":"2","ephemeral-storage":"10Gi","memory":"4Gi"}}` | Resource limits and requests for the karpor elasticsearch pods. |

#### ETCD

The ETCD Component is the storage of Karpor Server as `apiserver`.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| etcd.image.repo | string | `"quay.io/coreos/etcd"` | Repository for ETCD image. |
| etcd.image.tag | string | `"v3.5.11"` | Specific tag for ETCD image. |
| etcd.name | string | `"etcd"` | Component name for ETCD. |
| etcd.port | int | `2379` | Port for ETCD. |
| etcd.replicas | int | `1` | The number of etcd pods to run. |
| etcd.resources | object | `{"limits":{"cpu":"500m","ephemeral-storage":"10Gi","memory":"1Gi"},"requests":{"cpu":"250m","ephemeral-storage":"2Gi","memory":"256Mi"}}` | Resource limits and requests for the karpor etcd pods. |

#### Job

This one-time job is used to generate root certificates and some preliminary work.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| job.image.repo | string | `"golang"` | Repository for the Job image. |
| job.image.tag | string | `"1.19"` | Specific tag for the Job image. |

