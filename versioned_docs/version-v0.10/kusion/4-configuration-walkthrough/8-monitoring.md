# Application Monitoring

The `monitoring` attribute in the `AppConfiguration` instance is used to describe the specification for the collection of monitoring requirements for the application.

As of version 0.10.0, Kusion supports integration with Prometheus by managing scraping behaviors in the configuration file.

:::info

The `monitoring` attribute requires the target cluster to have installed Prometheus correctly, either as a Kubernetes operator or a server/agent.

More about how to set up Prometheus can be found in the [Prometheus User Guide for Kusion](../user-guides/observability/prometheus)
:::

## Import

In the examples below, we are using schemas defined in the `catalog` package. For more details on KCL package import, please refer to the [Configuration File Overview](overview).

The `import` statements needed for the following walkthrough:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.monitoring as m
```

## Workspace configurations

In addition to the KCL configuration file, there are also workspace-level configurations that should be set first. In an ideal scenario, this step is done by the platform engineers. 

In the event that they do not exist for you or your organization, e.g. if you are an individual developer, you can either do it yourself or use the [default values](#default-values) provided by the KusionStack team. The steps to do this yourself can be found in the [Prometheus User Guide for Kusion](../user-guides/observability/prometheus#setting-up-workspace-configs).

:::info

For more details on how workspaces work, please refer to the [workspace concept](../3-concepts/4-workspace.md)
:::

By separating configurations that the developers are interested in and those that platform owners are interested in, we can reduce the cognitive complexity of the application configuration and achieve separation of concern.

## Managing Scraping Configuration
To manage scrape configuration for the application:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    monitoring: m.Prometheus{
        path:           "/metrics"
        port:           "web"
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
    monitoring: m.Prometheus{
        path:           "/actuator/metrics"
        port:           "9099"
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