---
title: Install Kusion Server
---

## Install with Helm

If you have a Kubernetes cluster, Helm is the recommended installation method.

The following tutorial will guide you to install Kusion using Helm, which will install the chart with the release name `kusion-release` in namespace `kusion`.

### Prerequisites

* Helm v3+
* A Kubernetes Cluster (The simplest way is to deploy a Kubernetes cluster locally using `kind` or `minikube`)

### Installation Options

> **Important:** Kusion requires a valid kubeconfig configuration to function properly. You can provide it via:
> - Installation script (recommended)
> - Custom values.yaml file
> - Helm --set parameter

> **Note:** Default kubeconfig path is `/var/run/secrets/kubernetes.io/kubeconfigs/`
> To use a different path, set `kubeconfig.kubeConfigVolumeMountPath` to your desired path.

You have several options to install Kusion:

#### 1. Using the installation script (recommended)

Download the [installation script](https://github.com/KusionStack/charts/blob/master/scripts/install-kusion.sh) from the KusionStack charts repository.

```shell
curl -O https://raw.githubusercontent.com/KusionStack/charts/master/scripts/install-kusion.sh
chmod +x install-kusion.sh
```

Run the installation script with your kubeconfig files:

```shell
./install-kusion.sh <kubeconfig_key1=kubeconfig_path1> <kubeconfig_key2=kubeconfig_path2> ...
```

**Parameters:**

- **kubeconfig_key**: The key for the kubeconfig file. It should be unique and not contain spaces.

- **kubeconfig_path**: The path to the kubeconfig file.

#### 2. Remote installation with Helm

First, add the `kusionstack` chart repo to your local repository:

```shell
helm repo add kusionstack https://kusionstack.github.io/charts
helm repo update
```

Then install with your encoded kubeconfig:

```shell
# Base64 encode your kubeconfig files
KUBECONFIG_CONTENT0=$(cat /path/to/your/kubeconfig-0 | base64 | tr -d '\n')
KUBECONFIG_CONTENT1=$(cat /path/to/your/kubeconfig-1 | base64 | tr -d '\n')

# Install with kubeconfig
helm install kusion-release kusionstack/kusion \
--set kubeconfig.kubeConfigs.kubeconfig-0="$KUBECONFIG_CONTENT0" \
--set kubeconfig.kubeConfigs.kubeconfig-1="$KUBECONFIG_CONTENT1"
```

You may have to set your specific configurations if it is deployed into a production cluster, or you want to customize the chart configuration, such as `database`, `replicas`, `port` etc.

```shell
# Install with kubeconfig and optional configurations
helm install kusion-release kusionstack/kusion \
--set kubeconfig.kubeConfigs.kubeconfig-0="$KUBECONFIG_CONTENT0" \
--set kubeconfig.kubeConfigs.kubeconfig-1="$KUBECONFIG_CONTENT1" \
--set server.port=8080 \
--set server.replicas=3 \
--set mysql.enabled=true \
```

> All configurable parameters of the Kusion chart are detailed [here](#chart-parameters).

### Search all available versions

You can use the following command to view all installable chart versions.

```shell
helm repo update
helm search repo kusionstack/kusion --versions
```

### Upgrade specified version

You can specify the version to be upgraded through the `--version`.

```shell
# Upgrade to the latest version.
helm upgrade kusion-release kusionstack/kusion

# Upgrade to the specified version.
helm upgrade kusion-release kusionstack/kusion --version 1.2.3
```

### Local Installation

If you have problem connecting to [https://kusionstack.github.io/charts/](https://kusionstack.github.io/charts/) in production, you may need to manually download the chart from [here](https://github.com/KusionStack/charts) and use it to install or upgrade locally.

```shell
git clone https://github.com/KusionStack/charts.git
```

Edit the [default template values](https://github.com/KusionStack/charts/blob/master/charts/kusion/values.yaml) file to set your own kubeconfig and other configurations.
> For more information about the KubeConfig configuration, please refer to the [KubeConfig](#kubeconfig) section.

Then install the chart:

```shell
helm install kusion-release charts/kusion
```

### Uninstall

To uninstall/delete the `kusion-release` Helm release in namespace `kusion`:

```shell
helm uninstall kusion-release
```

### Image Registry Proxy for China

If you are in China and have problem to pull image from official DockerHub, you can use the registry proxy:

```shell
helm install kusion-release kusionstack/kusion --set registryProxy=docker.m.daocloud.io
```

**NOTE**: The above is just an example, you can replace the value of `registryProxy` as needed. You also need to provide your own kubeconfig in values.yaml or set it through the --set parameter.

## Chart Parameters

The following table lists the configurable parameters of the chart and their default values.

### General Parameters

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| namespace | string | `"kusion"` | Which namespace to be deployed |
| namespaceEnabled | bool | `true` | Whether to generate namespace |
| registryProxy | string | `""` | Image registry proxy will be the prefix as all component images |

### Global Parameters

| Key | Type | Default | Description |
|-----|------|---------|-------------|

### Kusion Server

The Kusion Server Component is the main backend server that provides the core functionality and REST APIs.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| server.args.authEnabled | bool | `false` | Whether to enable authentication |
| server.args.authKeyType | string | `"RSA"` | Authentication key type |
| server.args.authWhitelist | list | `[]` | Authentication whitelist |
| server.args.autoMigrate | bool | `true` | Whether to enable automatic migration |
| server.args.dbHost | string | `""` | Database host |
| server.args.dbName | string | `""` | Database name |
| server.args.dbPassword | string | `""` | Database password |
| server.args.dbPort | int | `3306` | Database port |
| server.args.dbUser | string | `""` | Database user |
| server.args.defaultSourceRemote | string | `""` | Default source URL |
| server.args.logFilePath | string | `"/logs/kusion.log"` | Logging |
| server.args.maxAsyncBuffer | int | `100` | Maximum number of buffer zones during concurrent async executions including generate, preview, apply and destroy |
| server.args.maxAsyncConcurrent | int | `1` | Maximum number of concurrent async executions including generate, preview, apply and destroy |
| server.args.maxConcurrent | int | `10` | Maximum number of concurrent executions including preview, apply and destroy |
| server.args.migrateFile | string | `""` | Migration file path |
| server.env | list | `[]` | Additional environment variables for the server |
| server.image.imagePullPolicy | string | `"IfNotPresent"` | Image pull policy |
| server.image.repo | string | `"kusionstack/kusion"` | Repository for Kusion server image |
| server.image.tag | string | `""` | Tag for Kusion server image. Defaults to the chart's appVersion if not specified |
| server.name | string | `"kusion-server"` | Component name for kusion server |
| server.port | int | `80` | Port for kusion server |
| server.replicas | int | `1` | The number of kusion server pods to run |
| server.resources | object | `{"limits":{"cpu":"500m","memory":"1Gi"},"requests":{"cpu":"250m","memory":"256Mi"}}` | Resource limits and requests for the kusion server pods |
| server.serviceType | string | `"ClusterIP"` | Service type for the kusion server. The available type values list as ["ClusterIP"、"NodePort"、"LoadBalancer"]. |

### MySQL Database

The MySQL database is used to store Kusion's persistent data.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| mysql.database | string | `"kusion"` | MySQL database name |
| mysql.enabled | bool | `true` | Whether to enable MySQL deployment |
| mysql.image.imagePullPolicy | string | `"IfNotPresent"` | Image pull policy |
| mysql.image.repo | string | `"mysql"` | Repository for MySQL image |
| mysql.image.tag | string | `"8.0"` | Specific tag for MySQL image |
| mysql.name | string | `"mysql"` | Component name for MySQL |
| mysql.password | string | `""` | MySQL password |
| mysql.persistence.accessModes | list | `["ReadWriteOnce"]` | Access modes for MySQL PVC |
| mysql.persistence.size | string | `"10Gi"` | Size of MySQL persistent volume |
| mysql.persistence.storageClass | string | `""` | Storage class for MySQL PVC |
| mysql.port | int | `3306` | Port for MySQL |
| mysql.replicas | int | `1` | The number of MySQL pods to run |
| mysql.resources | object | `{"limits":{"cpu":"1000m","memory":"1Gi"},"requests":{"cpu":"250m","memory":"512Mi"}}` | Resource limits and requests for MySQL pods |
| mysql.rootPassword | string | `""` | MySQL root password |
| mysql.user | string | `"kusion"` | MySQL user |

### KubeConfig

The KubeConfig is used to store the KubeConfig files for the Kusion Server.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| kubeconfig.kubeConfigVolumeMountPath | string | `"/var/run/secrets/kubernetes.io/kubeconfigs/"` | Volume mount path for KubeConfig files |
| kubeconfig.kubeConfigs | object | `{}` | KubeConfig contents map |

**NOTE**: The KubeConfig contents map is a key-value pair, where the key is the key of the KubeConfig file and the value is the contents of the KubeConfig file.

```yaml
# Example structure:
  kubeConfigs:
    kubeconfig-0: |
        Please fill in your KubeConfig contents here.
    kubeconfig-1: |
        Please fill in your KubeConfig contents here.
```
