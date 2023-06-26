---
sidebar_position: 1
---

# 记录与告警

本指南将向你展示如何基于 Prometheus Operator 一键部署 Alertmanager 集群并集成 Prometheus，并使用 PrometheusRules 记录指标数据和推送告警。

## 介绍

Prometheus 是一个开源系统监控和警报工具包。它将其指标收集并存储为时间序列数据，即指标信息与记录它的时间戳一起存储，以及称为标签的可选键值对。

下图说明了 Prometheus 的架构及其一些生态系统组件：

![](/img/docs/user_docs/guides/prometheus/structure.png)

Prometheus 从检测作业中直接或通过中间推送网关从短期作业中抓取指标。它在本地存储所有抓取的样本，并对这些数据运行规则，以从现有数据聚合和记录新的时间序列或生成警报。Grafana 或其他 API 使用者可用于可视化收集的数据。

## 准备开始

在开始之前，我们需要做以下准备工作：

1、安装 Kusion 工具链

我们推荐使用 kusion 的官方安装工具 `kusionup`，可实现 kusion 多版本管理等关键能力。详情信息请参阅[下载和安装](/docs/user_docs/getting-started/install)。

2、下载开源 Konfig 大库

在本篇指南中，需要用到部分已经抽象实现的 KCL 模型，有关 KCL 语言的介绍，可以参考 [Tour of KCL](https://kcl-lang.io/)。

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

## 组件部署

在 konfig 大库的 `prometheus-install` 项目中，保存了设置 Prometheus 和 Alertmanager 的完整的配置：

- Alertmanager 集群
- AlertmanagerConfig
- Alertmanager 服务
- Prometheus 集群
- Prometheus 依赖的 RBAC
- Prometheus 服务

:::info
想要体验快速部署结果，可直接跳到[一键部署](#一键部署)小节。
:::

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
        name = "main"
        namespace = _common_namespace
        labels = {
            "alertmanagerConfig" = "main"
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
        name = "main"
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
        name = "alertmanager"
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

此 Alertmanager 集群现在功能齐全且高可用，但不会针对它触发任何报警。这是因为你还没有设置 Prometheus 应用。

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

2. 创建 Prometheus，它将向 Alertmanger 集群发送报警：

```py
_prometheus: monitoringv1.Prometheus{
    metadata = {
        name = "main"
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
                "prometheus" = "main"
            }
        }
        serviceMonitorSelector = {
            matchLabels = {
                "prometheus" = "main"
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
        name = "prometheus"
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

### 一键部署

目前已经完成所有监控报警相关配置，现在开始一键部署。首先进入 `prometheus-install` stack 目录：

```bash
cd konfig/base/examples/monitoring/prometheus-install/prod
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
 * ├─        monitoring.coreos.com/v1:Alertmanager:default:main                        Create
 * ├─        monitoring.coreos.com/v1alpha1:AlertmanagerConfig:default:main            Create
 * ├─        monitoring.coreos.com/v1:Prometheus:default:main                          Create
 * ├─        rbac.authorization.k8s.io/v1:ClusterRoleBinding:default:prometheus        Create
 * ├─        v1:ServiceAccount:default:prometheus                                      Create
 * ├─        v1:Service:default:alertmanager                                           Create
 * └─        v1:Service:default:prometheus                                             Create

? Do you want to apply these diffs?  [Use arrows to move, type to filter]
  yes
> details
  no
```

选择 `yes`，开始部署。部署完成后，执行下面的命令，将本地端口 `30900` 转发到 k8s Service 端口 `9090`：

```bash
kubectl port-forward svc/prometheus-example 30900:9090
```

现在，你可以打开 [http://127.0.0.1:30900](http://127.0.0.1:30900/)，访问 Prometheus 界面，进入 “Status > Runtime & Build Information” 页面，检查 Prometheus 是否发现了 3 个 Alertmanager 示例：

![](/img/docs/user_docs/guides/prometheus/alertmanager.jpg)

## PrometheusRule

自定义资源定义 (CRD) `PrometheusRule` 声明式定义 Prometheus 实例使用的所需 Prometheus 规则，包括记录规则和报警规则。这些规则由 Operator 协调并动态加载，无需重新启动 Prometheus。

### 记录规则

记录规则可以预先计算经常需要或计算量大的表达式，并将其结果保存为一组新的时间序列。查询预先计算的结果通常比每次需要时执行原始表达式要快得多。这对于仪表板特别有用，仪表板每次刷新时都需要重复查询相同的表达式。

下面的代码片段，是以节点信息为例的记录规则：

```py
_sum_of_node_memory = """\
sum(
  node_memory_MemAvailable_bytes{job="node-exporter"} or
  (
    node_memory_Buffers_bytes{job="node-exporter"} +
    node_memory_Cached_bytes{job="node-exporter"} +
    node_memory_MemFree_bytes{job="node-exporter"} +
    node_memory_Slab_bytes{job="node-exporter"}
  )
) by (cluster)
"""

_node_cpu = """\
sum(rate(node_cpu_seconds_total{job="node-exporter",mode!="idle",mode!="iowait",mode!="steal"}[5m])) /
count(sum(node_cpu_seconds_total{job="node-exporter"}) by (cluster, instance, cpu))
"""
```

`_sum_of_node_memory` 记录节点可用内存总量，以 byte 为单位。

`_node_cpu` 计算每 5 分钟节点 CPU 的平均增长率。

:::tip
详细配置, 请查看源码文件: [`prometheus-rules/record/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-rules/record/main.k).
:::

现在，你可以创建上面的记录规则。

1、进入 `prometheus-rules` 项目的 `record` 目录：

```bash
cd konfig/base/examples/monitoring/prometheus-rules/record
```

2、创建规则：

```bash
kusion apply --yes
```

3、检查 Prometheus 已加载规则：

```bash
kubectl port-forward svc/prometheus-example 30900:9090
```

现在，你可以打开 [http://127.0.0.1:30900](http://127.0.0.1:30900/)，访问 Prometheus 界面，进入 “Status > Rules” 页面，检查 Prometheus 是否已加载 `node.rules`：

![](/img/docs/user_docs/guides/prometheus/node-rules.jpg)

#### 拓展阅读

如果你想看到[记录规则](#记录规则)小节所生成的折线图，你需要在 `default` 命名空间部署 `node-exporter` 服务。

:::info
如何安装 node-exporter? 请查看这里: [`node-exporter.yaml`](https://github.com/KusionStack/examples/blob/main/prometheus/node-exporter.yaml)
:::

那么，你将会看到，节点可用内存的折线图：

![](/img/docs/user_docs/guides/prometheus/node-memory.jpg)

和节点 CPU 每 5 分钟平均增长率的折线图：

![](/img/docs/user_docs/guides/prometheus/node-cpu.jpg)


### 报警规则

报警规则可以根据 Prometheus 表达式语言表达式定义报警条件，并将有关触发报警的通知发送到外部服务。每当报警表达式在给定时间点产生一个或多个矢量元素时，对于这些元素的标签集，报警就会被视为已激活。

下面的代码片段是报警规则的示例：

```py
_alerts: monitoringv1.PrometheusRule {
    metadata = {
        name = "example-alert"
        namespace = "default"
        labels: {
            "prometheus": "example",
            "role": "alert-rules",
        }
    }
    spec = {
        groups = [
            {
                name = "alert.rules"
                rules = [
                    {
                        alert: "ExampleAlert"
                        # vector() 函数将标量作为没有标签的向量返回。
                        expr: "vector(1)"
                    }
                ]
            }
        ]
    }
}
```

示例报警的表达式使用内部函数 `vertor()`，它将总是返回向量 1，即总是会触发报警。

:::tip
详细配置, 请查看源码文件: [`prometheus-rules/alert/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-rules/alert/main.k).
:::

现在，你可以创建报警规则：

1、进入 `prometheus-rules` 项目的 `alert` 目录：

```bash
cd konfig/base/examples/monitoring/prometheus-rules/alert
```

2、创建规则：

```bash
kusion apply --yes
```

3、检查 Prometheus 已加载规则：

由于你已经完成了端口转发的步骤，因此只需要刷新 “Status > Rules” 页面，检查 Prometheus 是否已加载 `alert.rules`：

![](/img/docs/user_docs/guides/prometheus/alert-rules.jpg)

4、检查 Alertmanager 成功接收报警：

```bash
kubectl port-forward svc/alertmanager-example 30903:9093
```

现在，你可以打开 [http://127.0.0.1:30903](http://127.0.0.1:30903/)，访问 Alertmanager 界面，发现示例报警：

![](/img/docs/user_docs/guides/prometheus/alert.jpg)

