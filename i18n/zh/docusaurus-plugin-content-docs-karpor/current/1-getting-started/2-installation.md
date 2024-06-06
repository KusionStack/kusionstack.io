---
title: 安装
---
## 前提条件

* 确保有一个可用的 Kubernetes 集群来安装 Karpor。对于本地安装，你可以使用 Minikube 或 Kind。

## 使用 Helm 安装

Karpor 可以通过 Helm v3.5+ 轻松安装，它是一个简单的命令行工具，你可以从 [这里](https://helm.sh/docs/intro/install/) 获取。

```shell
helm repo add kusionstack https://kusionstack.github.io/charts 
helm repo update
helm install karpor kusionstack/karpor
```

![安装](./assets/2-installation/install.gif)

## 使用 Helm 升级

```shell
helm repo add kusionstack https://kusionstack.github.io/charts 
helm repo update

# 升级到最新版本
helm upgrade karpor kusionstack/karpor

# 升级到指定版本
helm upgrade karpor kusionstack/karpor --version 1.2.3
```

## 本地使用 Helm 安装/升级

如果你在生产环境中连接到 [https://kusionstack.github.io/charts/](https://kusionstack.github.io/charts/) 有问题，你可能需要从 [这里](https://github.com/KusionStack/charts) 手动下载 chart，并使用它来本地安装或升级。

```shell
git clone https://github.com/KusionStack/charts.git 
helm install/upgrade karpor charts/karpor
```

## 卸载

执行以下命令卸载 karpor：

```shell
helm uninstall karpor
```
