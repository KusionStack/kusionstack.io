---
sidebar_position: 1
---

# Recording and Alerting

This guide will show you how to set up an Alertmanager cluster integrating with a Prometheus instance based on Prometheus Operator, and use PromethuesRules to record metrics and push alerts.

## Introduction

Prometheus is an open-source system monitoring and alerting toolkit. It collects and stores its metrics as time series data, i.e. metrics information is stored with the timestamp at which it was recorded, alongside optional key-value pairs called labels.

This diagram illustrates the architecture of Prometheus and some of its ecosystem components:

![](/img/docs/user_docs/guides/prometheus/structure.png)

Prometheus scrapes metrics from instrumented jobs, either directly or via an intermediary push gateway for short-lived jobs. It stores all scraped samples locally and runs rules over this data to either aggregate and record new time series from existing data or generate alerts. Grafana or other API consumers can be used to visualize the collected data.

## Prerequisites

To follow this guide, you need to complete the following steps:

1、Install Kusion

We recommend using the official installation tool _kusionup_ which supports multi-version management.
See [Download and Install](/docs/user_docs/getting-started/install) for more details.

2、Clone Konfig repo

In this guide, we need some KCL models that [Konfig](https://github.com/KusionStack/konfig.git) offers.
For more details on KCL language, please refer to [Tour of KCL](https://kcl-lang.io/).

3、Running Kubernetes cluster

There must be a running Kubernetes cluster and a [kubectl](https://Kubernetes.io/docs/tasks/tools/#kubectl) command line tool.
If you don't have a cluster yet, you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) to start one of your own.

4、Install Prometheus Operator

Install Prometheus Operator is quite simple, you only need to run:

```bash
kubectl create -f bundle.yaml
```

For more details, please check [Prometheus Operator Quickstart](https://github.com/prometheus-operator/prometheus-operator#quickstart).

## Setup

There is a project named `prometheus-install` in Konfig mono repo, which contains the full configuration of setting up Prometheus and Alertmanager:

- an Alertmanager cluster 
- an AlertmanagerConfig object
- an Alertmanager Service
- a Prometheus cluster 
- required RBAC
- a Prometheus Service


:::info
If you can't wait to experience one-click setup, please jump to the [One-click Setup](#one-click-setup) section.
:::

### Setup Alertmanager

By default, the Alertmanager instances will start with a minimal configuration which isn’t useful since it doesn’t send any notification when receiving alerts.

You have 3 options to provide the [Alertmanager configuration](https://prometheus.io/docs/alerting/configuration/):

1. You can use a native Alertmanager configuration file stored in a Kubernetes secret.
2. You can use `spec.alertmanagerConfiguration` to reference an AlertmanagerConfig object in the same namespace which defines the main Alertmanager configuration.
3. You can define `spec.alertmanagerConfigSelector` and `spec.alertmanagerConfigNamespaceSelector` to tell the operator which AlertmanagerConfigs objects should be selected and merged with the main Alertmanager configuration.

:::tip
Option 2 is chosen in the [`prometheus-install`](https://github.com/KusionStack/konfig/tree/main/base/examples/monitoring/prometheus-install) project. 
:::

1. The following code snippet is AlertmanagerConfig, which will send notifications to a fictitious webhook service:

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

2. Setting up an Alertmanager cluster with 3 replicas, reference the AlertmanagerConfig object:

```py
_alertmanager: monitoringv1.Alertmanager{
    metadata = {
        name = "main"
        namespace = "default"
    }
    spec = {
        replicas = 3
        # using AlertmanagerConfig for global configuration
        alertmanagerConfiguration = {
            name = _alertmanager_config.metadata.name
        }
    }
}
```

3. Expose Alertmanager service for integrating with Prometheus instances.
Creating a Kubernetes Service listening target port `9093`:

```py
_alertmanager_svc: corev1.Service{
    metadata = {
        name = "alertmanager"
        namespace = _common_namespace
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
For complete configuration, please check source code file: [`prometheus-install/prod/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-install/prod/main.k).
:::

This Alertmanager cluster is now fully functional and highly available, but no alerts are fired against it. Because you have not set up Prometheus yet.

### Setup Prometheus

Before you set up Prometheus, you must first create the RBAC rules for the Prometheus service account beforehand.

1. ClusterRole:

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
For full configuration of RBAC rules，please check source code file: [`prometheus-install/base/base.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-install/base/base.k).
:::

2. Setting up a Prometheus object with 2 replicas which will send alerts to the Alertmanager cluster:

```py
_prometheus: monitoringv1.Prometheus{
    metadata = {
        name = "main"
        namespace = "default"
    }
    spec = {
        # specify service account, default sa has no permissions
        serviceAccountName = "prometheus"
        replicas = 2
        # ruleSelector is nil meaning that the operator picks up no rule
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
        # intergating with alert manager by its service
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

3. Lastly, for easy validation, expose the Prometheus admin API.
Creating a Kubernetes service listening target port `9090`:

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

Prometheus Admin API allows access to delete series for a certain time range, clean up tombstones, capture snapshots, etc.
More information about the admin API can be found in [Prometheus official documentation](https://prometheus.io/docs/prometheus/latest/querying/api/#tsdb-admin-apis).

:::tip
For complete configuration, please check source code file: [`prometheus-install/prod/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-install/prod/main.k).
:::

### One-click Setup

Now you can deploy them with one click. Firstly, enter the stack dir of project `prometheus-install` in the konfig repo:

```bash
cd konfig/base/examples/monitoring/prometheus-install/prod
```

Then, run `kusion apply`:

```bash
kusion apply
```

The output is similar to:

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

Choose `yes` to start deploying. After finishing deploying, run the following command, which will forward local port `30900` to k8s service port `9090`:

```bash
kubectl port-forward svc/prometheus-example 30900:9090
```

Now, you can open the Prometheus web interface, [http://127.0.0.1:30900](http://127.0.0.1:30900/), and go to the "Status > Runtime & Build Information" page and check that Prometheus has discovered 3 Alertmanager instances.

![](/img/docs/user_docs/guides/prometheus/alertmanager.jpg)

## PrometheusRule

The PrometheusRule custom resource definition (CRD) declaratively defines desired Prometheus rules to be consumed by Prometheus instances, including alerting and recording rules. These rules are reconciled by the Operator and dynamically loaded without requiring any restart of Prometheus Rules.

### Recording Rules

Recording rules allow you to precompute frequently needed or computationally expensive expressions and save their result as a new set of time series. Querying the precomputed result will then often be much faster than executing the original expression every time it is needed. This is especially useful for dashboards, which need to query the same expression repeatedly every time they refresh.

The following code snippet takes the node information as an example to the recording rules:

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

`_sum_of_node_memory` records the sum of node available memory in bytes. 

`_node_cpu` calculates the average rate of increase of node CPU every 5 minutes.

:::tip
For complete configuration, please check source code file: [`prometheus-rules/record/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-rules/record/main.k).
:::

Now, you can create the recording rule above.

1、Enter the `record` directory of project `prometheus-rules`:

```bash
cd konfig/base/examples/monitoring/prometheus-rules/record
```

2、Apply these rules:

```bash
kusion apply --yes
```

3、Check the Prometheus instance has loaded these rules:

```bash
kubectl port-forward svc/prometheus-example 30900:9090
```

Now, you can open the Prometheus web interface, [http://127.0.0.1:30900](http://127.0.0.1:30900/), and go to the "Status > Rules" page and check that Prometheus has loaded `node.rules`:

![](/img/docs/user_docs/guides/prometheus/node-rules.jpg)

#### Further Reading

If you want to see the generating line graph from the [Recording Rules](#recording-rules) section, you need to deploy a `node-exporter` server in the default namespace. 

:::info
How to install node-exporter? Please check here: [`node-exporter.yaml`](https://github.com/KusionStack/examples/blob/main/prometheus/node-exporter.yaml)
:::

Then, you will see, the sum of node memory in bytes：

![](/img/docs/user_docs/guides/prometheus/node-memory.jpg)

and the average rate of increase of node CPU every 5 minutes:

![](/img/docs/user_docs/guides/prometheus/node-cpu.jpg)

### Alerting Rules

Alerting rules allow you to define alert conditions based on Prometheus expression language expressions and to send notifications about firing alerts to an external service. Whenever the alert expression results in one or more vector elements at a given point in time, the alert counts as active for these elements' label sets.

The following code snippet is an example of alerting rules:

```py
_alerts: monitoringv1.PrometheusRule {
    metadata = {
        name = "alert"
        namespace = "default"
        labels: {
            "prometheus": "main",
            "role": "alert-rules",
        }
    }
    spec = {
        groups = [
            {
                name = "alert.rules"
                rules = [
                    {
                        alert: "WebhookAlert"
                        # vector(s scalar) returns the scalar s as a vector with no labels.
                        expr: "vector(1)"
                    }
                ]
            }
        ]
    }
}
```

Using internal function `vector(1)` will always return a vector 1, which means always triggering an alert.

:::tip
For complete configuration, please check source code file: [`prometheus-rules/alert/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-rules/alert/main.k).
:::

Now, you can apply the alerting rules:

1、Enter the stack `alert` of project `prometheus-rules`:

```bash
cd konfig/base/examples/monitoring/prometheus-rules/alert
```

2、Apply these rules:

```bash
kusion apply --yes
```

3、Check the Prometheus instance has loaded these rules:

Since you have already done the port forward step, you just need to refresh the "Status > Rules" page and check that Prometheus has loaded `alert.rules`:

![](/img/docs/user_docs/guides/prometheus/alert-rules.jpg)

4、Check the Alertmanager has received the alert successfully:

```bash
kubectl port-forward svc/alertmanager-example 30903:9093
```

Now, you can open the Alertmanager web interface, [http://127.0.0.1:30903](http://127.0.0.1:30903/) and see the example alert:

![](/img/docs/user_docs/guides/prometheus/alert.jpg)

