---
sidebar_position: 2
---

# Installation

## Install with helm
KusionStack Kuperator requires **Kubernetes version >= 1.18**
```shell
# Firstly add charts repository if you haven't do this.
$ helm repo add kusionstack https://kusionstack.github.io/charts

# To update the kusionstack repo.
$ helm repo update kusionstack

# Install the latest version.
$ helm install kuperator kusionstack/kuperator 
```


[Helm](https://github.com/helm/helm) is a tool for managing packages of pre-configured Kubernetes resources.
### Optional: chart parameters

The following table lists the configurable parameters of the chart and their default values.

| Parameter   | Description    | Default        |
|-------------|----------------|----------------|
| `namespace`  | namespace for Kuperator installation    | `kusionstack-system`         |
| `namespaceEnabled` | Whether to create the installation.namespace   | `true`  |
| `managerReplicas`| Replicas of Kuperator deployment | `3`   |
| `image.repo` | Repository for kuperator image | `kusionstack/kuperator`|
| `image.pullPolicy`| Image pull policy for kuperator-manager container | `IfNotPresent` |
| `image.tag`                  | Tag for kuperator-manager image    | `v0.1.0`  |
| `resources.limits.cpu`      | CPU resource limit of kuperator-manager container      | `500m` |
| `resources.limits.memory` | Memory resource limit of kuperator-manager container   | `128Mi` |
| `resources.requests.cpu`    | CPU resource request of kuperator-manager container    | `10m` |
| `resources.requests.memory` | Memory resource request of kuperator-manager container | `64Mi` |

### Upgrade

Run following command to upgrade KusionStack Kuperator to the latest version.

```shell
# Upgrade to the latest version 
$ helm upgrade kuperator kusionstack/kuperator 
```

### Uninstall

Run following command to uninstall KusionStack Kuperator.

```shell
# Uninstall
$ helm uninstall kuperator
```