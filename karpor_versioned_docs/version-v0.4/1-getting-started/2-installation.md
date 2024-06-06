---
title: Installation
---
## Prerequisites

* Ensure there is Kubernetes cluster available to install Karpor. For local installations, you can use Minikube or Kind.

## Install with helm

Karpor can be installed easily with helm v3.5+, which is a simple command-line tool and you can get it from [here](https://helm.sh/docs/intro/install/).

```shell
helm repo add kusionstack https://kusionstack.github.io/charts
helm repo update
helm install karpor kusionstack/karpor
```

![Install](./assets/2-installation/install.gif)

## Upgrade with helm

```shell
helm repo add kusionstack https://kusionstack.github.io/charts
helm repo update

# Upgrade to the latest version.
helm upgrade karpor kusionstack/karpor

# Upgrade to the specified version.
helm upgrade karpor kusionstack/karpor --version 1.2.3
```

## Install/Upgrade locally with helm

If you have problem connecting to [https://kusionstack.github.io/charts/](https://kusionstack.github.io/charts/) in production, you may need to manually download the chart from [here](https://github.com/KusionStack/charts) and use it to install or upgrade locally.

```shell
git clone https://github.com/KusionStack/charts.git
helm install/upgrade karpor charts/karpor
```

## Uninstall

To uninstall karpor:

```shell
helm uninstall karpor
```
