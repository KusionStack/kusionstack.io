# Application Monitoring

You could also specify the collection of monitoring requirements for the application. That can be achieved via a `monitoring` module (or bring-your-own-module) in the `accessories` field in `AppConfiguration` to achieve that.

As of version 0.11.0, Kusion supports integration with Prometheus by managing scraping behaviors in the configuration file.

:::info

For the monitoring configuration to work (more specifically, consumed by Prometheus), this requires the target cluster to have installed Prometheus correctly, either as a Kubernetes operator or a server/agent.

More about how to set up Prometheus can be found in the [Prometheus User Guide for Kusion](../user-guides/observability/prometheus)
:::

## Import

In the examples below, we are using schemas defined in the `kam` package and the `monitoring` Kusion Module. For more details on KCL package and module import, please refer to the [Configuration File Overview](overview).

The `import` statements needed for the following walkthrough:
```
import kam.v1.app_configuration as ac
import kam.v1.workload as wl
import monitoring as m
```

## Workspace configurations

In addition to the KCL configuration file, there are also workspace-level configurations that should be set first. In an ideal scenario, this step is done by the platform engineers. 

In the event that they do not exist for you or your organization, e.g. if you are an individual developer, you can either do it yourself or use the [default values](#default-values) provided by the KusionStack team. The steps to do this yourself can be found in the [Prometheus User Guide for Kusion](../user-guides/observability/prometheus#setting-up-workspace-configs).

:::info

For more details on how workspaces work, please refer to the [workspace concept](../3-concepts/4-workspace.md)
:::

By separating configurations that the developers are interested in and those that platform owners are interested in, we can reduce the cognitive complexity of the application configuration and achieve separation of concern.

You can append the following YAML file to your own workspace configurations and update the corresponding workspace with command `kusion workspace update`. 

```yaml
modules:
  kusionstack/monitoring@v0.1.0:
    default:
      interval: 30s
        monitorType: Pod
        operatorMode: true
        scheme: http
        timeout: 15s
```

## Managing Scraping Configuration
To manage scrape configuration for the application:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    # Add the monitoring configuration backed by Prometheus
    accessories: {
        "monitoring": m.Prometheus {
            path:           "/metrics"
            port:           "web"
        }
    }
}
```

The example above will instruct the Prometheus job to scrape metrics from the `/metrics` endpoint of the application on the port named `web`.

To instruct Prometheus to scrape from `/actuator/metrics` on port `9099` instead:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    # Add the monitoring configuration backed by Prometheus
    accessories: {
        "monitoring": m.Prometheus {
            path:           "/actuator/metrics"
            port:           "9099"
        }
    }
}
```

Note that numbered ports only work when your Prometheus is not running as an operator. 

Neither `path` and `port` are required fields if Prometheus runs as an operator. If omitted, `path` defaults to `/metrics`, and `port` defaults to the container port or service port, depending on which resource is being monitored. If Prometheus does not run as an operator, both fields are required.

Scraping scheme, interval and timeout are considered platform-managed configurations and are therefore managed as part of the [workspace configurations](../user-guides/observability/prometheus#setting-up-workspace-configs).

More details about how the Prometheus integration works can be found in the [design documentation](https://github.com/KusionStack/kusion/blob/main/docs/prometheus.md).

## Default values

If no workspace configurations are found, the default values provided by the KusionStack team are:
- Scraping interval defaults to 30 seconds
- Scraping timeout defaults to 15 seconds
- Scraping scheme defaults to http
- Defaults to NOT running as an operator

If any of the default values does not meet your need, you can change them by [setting up the workspace configuration](../user-guides/observability/prometheus#setting-up-workspace-configs).