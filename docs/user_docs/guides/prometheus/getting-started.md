---
sidebar_position: 1
---

# Getting Started

The Prometheus Operator’s goal is to make running Prometheus on top of Kubernetes as easy as possible while preserving Kubernetes-native configuration options.

This guide will show you how to set up an Alertmanager cluster integrating with a Prometheus instance.

## Prerequisites

To follow this guide, you need to complete the following steps:

1、Install Kusion

We recommend using the official installation tool _kusionup_ which supports multi-version management.
See [Download and Install](/docs/user_docs/getting-started/install) for more details.

2、Clone Konfig repo

In this guide, we need some KCL models that [Konfig](https://github.com/KusionStack/konfig.git) offers.
For more details on KCL language, please refer to [Tour of KCL](/docs/reference/lang/lang/tour).

3、Running Kubernetes cluster

There must be a running Kubernetes cluster and a [kubectl](https://Kubernetes.io/docs/tasks/tools/#kubectl) command line tool.
If you don't have a cluster yet, you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) to start one of your own.

4、Install Prometheus Operator

Install Prometheus Operator is quite simple, you only need to run:

```bash
kubectl create -f bundle.yaml
```

For more details, please check [Prometheus Operator Quickstart](https://github.com/prometheus-operator/prometheus-operator#quickstart).

## Full Configuration

There is a project named `prometheus-install` in Konfig mono repo, which contains the full configuration of setting up Prometheus and Alertmanager:

- an Alertmanager cluster 
- an AlertmanagerConfig object
- an Alertmanager Service
- a Prometheus cluster 
- Required RBAC
- a Prometheus Service

If you can't wait to experience one-click deployment, please jump to the [One-click Deployment](#one-click-deployment) section.

### Configure Alertmanager

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

2. Setting up an Alertmanager cluster with 3 replicas, reference the AlertmanagerConfig object:

```py
_alertmanager: monitoringv1.Alertmanager{
    metadata = {
        name = "example"
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
        name = "alertmanager-example"
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

### Configure Prometheus

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
        name = "example"
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
                "prometheus" = "example"
            }
        }
        serviceMonitorSelector = {
            matchLabels = {
                "prometheus" = "example"
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

Prometheus Admin API allows access to delete series for a certain time range, clean up tombstones, capture snapshots, etc.
More information about the admin API can be found in [Prometheus official documentation](https://prometheus.io/docs/prometheus/latest/querying/api/#tsdb-admin-apis).

:::tip
For complete congfiugration, please check source code file: [`prometheus-install/prod/main.k`](https://github.com/KusionStack/konfig/blob/main/base/examples/monitoring/prometheus-install/prod/main.k).
:::

## One-click Deployment

Now you can deploy them with one click. Firstly, enter the stack dir of project `prometheus-install` in the konfig repo:

```bash
cd base/examples/monitoring/prometheus-install/prod
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

Choose `yes` to start deploying. After finishing deploying, run the following command, which will forward local port `30900` to k8s service port `9090`:

```bash
kubectl port-forward svc/prometheus-example 30900:9090
```

Now, you can open the Prometheus web interface, [http://127.0.0.1:30900](http://127.0.0.1:30900/), and go to the "Status > Runtime & Build Information" page and check that Prometheus has discovered 3 Alertmanager instances.

![](/img/docs/user_docs/guides/prometheus/alertmanager.jpg)
