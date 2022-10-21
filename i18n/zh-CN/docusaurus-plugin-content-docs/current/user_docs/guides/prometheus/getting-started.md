---
sidebar_position: 1
---

# 快速开始

Prometheus Operator 的目标是尽可能简单地在 Kubernetes 上运行 Prometheus，同时保留 Kubernetes 原生配置选项。

本指南将向你展示如何一键 Alertmanager 集群并集成 Prometheus 实例。

## 前提条件

在开始之前，我们需要做以下准备工作：

1、安装 Kusion 工具链

我们推荐使用 kusion 的官方安装工具 `kusionup`，可实现 kusion 多版本管理等关键能力。详情信息请参阅[下载和安装](/docs/user_docs/getting-started/install)。

2、下载开源 Konfig 大库

在本篇指南中，需要用到部分已经抽象实现的 KCL 模型，有关 KCL 语言的介绍，可以参考 [Tour of KCL](/reference/lang/lang/tour.md)。

仓库地址： [https://github.com/KusionStack/konfig.git](https://github.com/KusionStack/konfig.git)

3、可用的 Kubernetes 集群

必须要有一个 Kubernetes 集群，同时 Kubernetes 集群最好带有 [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) 命令行工具。
如果你还没有集群，你可以通过 [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) 构建一个你自己的集群。

4、安装 Prometheus Operator

Prometheus Operator 安装很简单，只需：

```bash
kubectl create -f bundle.yaml
```

详见 Prometheus Operator [快速开始](https://github.com/prometheus-operator/prometheus-operator#quickstart)。

## 配置详情

在 konfig 大库的 `prometheus-install` 项目中，保存了设置 Prometheus 和 Alertmanager 的完整的配置：

- Alertmanager 集群
- AlertmanagerConfig
- Alertmanager 服务
- Prometheus 集群
- Prometheus 依赖的 RBAC
- Prometheus 服务

想要体验快速部署结果，可直接跳到[一键部署](#一键部署)小节。

### 配置 Alertmanager

Alertmanager 默认启动是按照最低配置，这并没什么用处，因为它在接收报警时不会发送任何通知。

你有 3 种方式来提供 [Alertmanager 配置](https://prometheus.io/docs/alerting/configuration/)：

1. 使用存储在 Kubernetes 密钥中的本机 Alertmanager 配置文件。
2. 使用 `spec.alertmanagerConfiguration` 在定义主 Alertmanager 配置的同一命名空间中引用 AlertmanagerConfig 对象。
3. 定义 `spec.alertmanagerConfigSelector` 和 `spec.alertmanagerConfigNamespaceSelector` 告诉 Operator 应该选择哪些 AlertmanagerConfigs 对象并将其与主 Alertmanager 配置合并。

:::tip
在 [`prometheus-install`](https://github.com/KusionStack/konfig/tree/main/base/examples/monitoring/prometheus-install) 项目中使用的第二种方式。
:::

1. 以下是 AlertmanagerConfig 配置，Alertmanager 将通知发送到虚构的 webhook 服务：

```py
_alertmanager_config: monitoringv1alpha1.AlertmanagerConfig{
    metadata = {
        name = "config-example"
        namespace = _common_namespace
        labels = {
            "alertmanagerConfig" = "example"
        }
    }
    spec = {
        route = {
            groupBy = ["job"]
            groupWait = "30s"
            groupInterval = "5m"
            repeatInterval = "12h"
            receiver = "webhook"
        }
        receivers = [
            {
                name = "webhook"
                webhookConfigs = [
                    {
                        url = "http://example.com/"
                    }
                ]
            }
        ]
    }
}
```

2. 设置 3 个副本的 Alertmanager 集群，并引用 AlertmanagerConfig 对象：

```py
_alertmanager: monitoringv1.Alertmanager{
    metadata = {
        name = "example"
        namespace = "default"
    }
    spec = {
        replicas = 3
        # 使用 AlertmanagerConfig 作为全局配置
        alertmanagerConfiguration = {
            name = _alertmanager_config.metadata.name
        }
    }
}
```

3. 公开 Alertmanager 服务，用于被后续的 Prometheus 实例集成。
创建 Kubernetes Service，监听目标端口 `9093`：

```py
_alertmanager_svc: corev1.Service{
    metadata = {
        name = "alertmanager-example"
        namespace = "default"
    }
    spec = {
        selector = {
            "alertmanager" = _alertmanager.metadata.name
        }
        ports = [
            {
                name = "web"
                port = 9093
                targetPort = "web"
            }
            {
                name = "reloader-web"
                port = 8080
                targetPort = "reloader-web"
            }
        ]
        sessionAffinity = "ClientIP"
    }
}
```

:::tip
详细配置，请查看源码文件: [`prometheus-install/prod/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-install/prod/main.k)。
:::

此 Alertmanager 集群现在功能齐全且高可用，但不会针对它触发任何警报。这是因为你还没有设置 Prometheus 应用。

### 配置 Prometheus

在创建 Prometheus 之前，必须先为 Prometheus 服务帐户创建 RBAC 规则。

1. Prometheus ClusterRole 配置：

```py
_prometheus_clusterrole: rbac.ClusterRole {
    metadata = {
        name = "prometheus"
        namespace = "default"
    }
    rules = [
        {
            apiGroups = [""]
            resources = ["nodes", "nodes/metrics", "services", "endpoints", "pods"]
            verbs = ["get", "list", "watch"]
        }
        {
            apiGroups = [""]
            resources = ["configmaps"]
            verbs = ["get"]
        }
        {
            apiGroups = ["networking.k8s.io"]
            resources = ["ingresses"]
            verbs = ["get", "list", "watch"]
        }
        {
            nonResourceURLs = ["/metrics"]
            verbs = ["get"]
        }
    ]
}
```

:::tip
RBAC 的完整配置，请查看源码文件：[`prometheus-install/base/base.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-install/base/base.k)。
:::

2. 创建 Prometheus，它将向 Alertmanger 集群发送警报：

```py
_prometheus: monitoringv1.Prometheus{
    metadata = {
        name = "example"
        namespace = "default"
    }
    spec = {
        # 指定 ServiceAccount
        serviceAccountName = "prometheus"
        replicas = 2
        # ruleSelector 为空，表示不选择任何 PrometheusRule。
        ruleSelector = {
            matchLabels = {
                "role" = "alert-rules"
                "prometheus" = "example"
            }
        }
        serviceMonitorSelector = {
            matchLabels = {
                "prometheus" = "example"
            }
        }
        # 通过 Alertmanager 的公开的 Service，配置 Alertmanager
        alerting = {
            alertmanagers = [
                {
                    name = _alertmanager_svc.metadata.name
                    namespace = _alertmanager_svc.metadata.namespace
                    port = _alertmanager_svc.spec.ports[0].name
                }
            ]
        }
    }
}
```

3. 最后，为了方便验证，顺便公开 Prometheus Admin API。
创建 Kubernetes Service，监听目标端口 `9090`：

```py
_prometheus_svc: corev1.Service{
    metadata = {
        name = "prometheus-example"
        namespace = "default"
    }
    spec = {
        selector = {
            "prometheus" = _prometheus.metadata.name
        }
        ports = [
            {
                name = "web"
                port = 9090
                targetPort = "web"
            }
            {
                name = "reloader-web"
                port = 8080
                targetPort = "reloader-web"
            }
        ]
        sessionAffinity = "ClientIP"
    }
}
```

Prometheus admin API 允许访问删除某个时间范围内的系列、清理墓碑、捕获快照等。
有关 admin API 的更多信息可以在 [Prometheus 官方文档](https://prometheus.io/docs/prometheus/latest/querying/api/#tsdb-admin-apis)中找到。

:::tip
详细配置，请查看源码文件: [`prometheus-install/prod/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-install/prod/main.k)。
:::

## 一键部署

目前已经完成所有监控报警相关配置，现在开始一键部署。首先进入 `prometheus-install` stack 目录：

```bash
cd base/examples/monitoring/prometheus-install/prod
```

再执行 `kusion apply`:

```bash
kusion apply
```

输出类似于：

```
✔︎  Compiling in stack prod...                                                                                                                            

Stack: prod  ID                                                                        Action  
 * ├─        rbac.authorization.k8s.io/v1:ClusterRole:default:prometheus               Create
 * ├─        monitoring.coreos.com/v1:Alertmanager:default:example                     Create  
 * ├─        monitoring.coreos.com/v1alpha1:AlertmanagerConfig:default:config-example  Create
 * ├─        monitoring.coreos.com/v1:Prometheus:default:example                       Create
 * ├─        rbac.authorization.k8s.io/v1:ClusterRoleBinding:default:prometheus        Create
 * ├─        v1:ServiceAccount:default:prometheus                                      Create
 * ├─        v1:Service:default:alertmanager-example                                   Create
 * └─        v1:Service:default:prometheus-example                                     Create

? Do you want to apply these diffs?  [Use arrows to move, type to filter]
  yes
> details
  no
```

选择 `yes`，开始部署。部署完成后，执行下面的命令，将本地端口 `30900` 转发到 k8s Service 端口 `9090`：

```bash
kubectl port-forward svc/prometheus-example 30900:9090
```

然后打开 [http://127.0.0.1:30900](http://127.0.0.1:30900/)，访问 Prometheus 界面，进入 “Status > Runtime & Build Information” 页面，检查 Prometheus 是否发现了 3 个 Alertmanager 示例：

![](/img/docs/user_docs/guides/prometheus/alertmanager.jpg)
