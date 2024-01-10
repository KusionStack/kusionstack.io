---
sidebar_position: 8
---

# Application Monitoring

The `monitoring` attribute in the `AppConfiguration` instance is used to describe the specification for the collection of monitoring requirements for the application.

As of version 0.9.0, Kusion supports integration with Prometheus by managing scraping behaviors in the configuration file.

:::info

The `monitoring` attribute requires the target cluster to have installed Prometheus correctly, either as a Kubernetes operator or a server/agent.

More about how to set up Prometheus can be found in the [Prometheus User Guide for Kusion](../guides/observability/prometheus)
:::

## Import

In the examples below, we are using schemas defined in the `catalog` package. For more details on KCL package import, please refer to the [Configuration File Overview](../config-walkthrough/overview).

The `import` statements needed for the following walkthrough:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.monitoring as m
```

## Project-level configurations

In addition to the KCL configuration file, there are also project-level configurations that can be set in the `project.yaml` in hte project root directory.

By separating configurations that the developers are interested in and those that platform owners are interested in, we can reduce the cognitive complexity of the application configuration and achieve separation of concern.

In the context of `monitoring`, there are two flags you can set in `project.yaml` that will alter the behavior of Kusion.

:::info

If you have initialized the projects with `kusion init`, the `project.yaml` should be automatically created for you.
:::

### Operator mode

The `operatorMode` flag indicates to Kusion whether the Prometheus instance installed in the cluster runs as a Kubernetes operator or not. This determines the different kinds of resources Kusion manages.

To see more about different ways to run Prometheus in the Kubernetes cluster, please refer to the [design documentation](https://github.com/KusionStack/kusion/blob/main/docs/prometheus.md#prometheus-installation).

Most cloud vendors provide an out-of-the-box monitoring solutions for workloads running in a managed-Kubernetes cluster (EKS, AKS, etc), such as AWS CloudWatch, Azure Monitor, etc. These solutions mostly involve installing an agent (CloudWatch Agent, OMS Agent, etc) in the cluster and collecting the metrics to a centralized monitoring server. In those cases, you don't need to set `operatorMode` to `True`. It only needs to be set to `True` when you have an installation of the [Prometheus operator](https://github.com/prometheus-operator/prometheus-operator) running inside the Kubernetes cluster.

:::info

For differences between [Prometheus operator](https://github.com/prometheus-operator/prometheus-operator), [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) and the [community kube-prometheus-stack helm chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack), the details are documented [here](https://github.com/prometheus-operator/prometheus-operator#prometheus-operator-vs-kube-prometheus-vs-community-helm-chart).
:::

### Monitor types

The `monitorType` flag indicates the kind of monitor Kusion will create. It only applies when `operatorMode` is set to `True`. As of version 0.9.0, Kusion provides options to scrape metrics from either the application pods or its corresponding Kubernetes services. This determines the different kinds of resources Kusion manages when Prometheus runs as an operator in the target cluster.

A sample `project.yaml` with Prometheus settings:
```
# The project basic info
name: multi-stack-project
generator:
  type: AppConfiguration
prometheus:
  operatorMode: True
  monitorType: Service
```

To instruct Prometheus to scrape from pod targets instead:
```
# The project basic info
name: multi-stack-project
generator:
  type: AppConfiguration
prometheus:
  operatorMode: True
  monitorType: Pod
```

If the `prometheus` section is missing from the `project.yaml`, Kusion defaults `operatorMode` to false.

## Managing Scraping Configuration
To create scrape configuration for the application:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    monitoring: m.Prometheus{
        interval:       "30s"
        timeout:        "15s"
        path:           "/metrics"
        port:           "web"
        scheme:         "http"
    }
}
```

The example above will instruct the Prometheus job to scrape metrics from the `/metrics` endpoint of the application every 30 seconds.

To instruct Prometheus to scrape from `actuator/metrics` on port `9099` instead:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    monitoring: m.Prometheus{
        interval:       "10s"
        timeout:        "5s"
        path:           "/actuator/metrics"
        port:           "9099"
        scheme:         "http"
    }
}
```

More details about how the Prometheus integration works can be found in the [design documentation](https://github.com/KusionStack/kusion/blob/main/docs/prometheus).