---
title: Installation
---

## Install with helm

Karpor can be simply installed by helm v3.5+, which is a simple command-line tool and you can get it from [here](https://helm.sh/docs/intro/install/).

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

If you have problem with connecting to https://kusionstack.github.io/charts/ in production, you may need to manually download the chart from [here](https://github.com/KusionStack/charts) and use it to install or upgrade locally.

```shell
git clone https://github.com/KusionStack/charts.git
helm install/upgrade karpor charts/karpor
```

## Uninstall

To uninstall karpor if it is installed with helm charts:

```shell
helm uninstall karpor
```
