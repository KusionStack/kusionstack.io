---
sidebar_position: 2
---

# Installation

## Install with helm
KusionStack Operating requires **Kubernetes version >= 1.18**
```shell
# Firstly add charts repository if you haven't do this.
$ helm repo add kusionstack https://kusionstack.io/charts

# To update the kusionstack repo.
$ helm repo update kusionstack

# Install the latest version.
$ helm install operating kusionstack/operating 

# Upgrade to the latest version 
$ helm upgrade operating kusionstack/operating 

# Uninstall
$ helm uninstall operating
```


[Helm](https://github.com/helm/helm) is a tool for managing packages of pre-configured Kubernetes resources.
### Optional: chart parameters

The following table lists the configurable parameters of the chart and their default values.

| Parameter   | Description    | Default        |
|-------------|----------------|----------------|
| `namespace`  | namespace for Operating installation    | `kusionstack-system`         |
| `namespaceEnabled` | Whether to create the installation.namespace   | `true`  |
| `managerReplicas`| Replicas of Operating deployment | `3`   |
| `image.repo` | Repository for operating image | `kusionstack/operating`|
| `image.pullPolicy`| Image pull policy for operating-manager container | `IfNotPresent` |
| `image.tag`                  | Tag for operating-manager image    | `v0.1.0`  |
| `resources.limits.cpu`      | CPU resource limit of operating-manager container      | `500m` |
| `resources.limits.memory` | Memory resource limit of operating-manager container   | `128Mi` |
| `resources.requests.cpu`    | CPU resource request of operating-manager container    | `10m` |
| `resources.requests.memory` | Memory resource request of operating-manager container | `64Mi` | 