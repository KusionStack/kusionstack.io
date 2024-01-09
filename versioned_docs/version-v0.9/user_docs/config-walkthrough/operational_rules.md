---
sidebar_position: 9
---

# Operational Rules

The `opsRule` attribute in the `AppConfiguration` instance is used to describe the specification for the collection of operational rule requirements for the application. Operational rules are used as a preemptive measure to police and stop any unwanted changes.

:::info

The `opsRules` attribute requires the target cluster to have installed the [KusionStack-operating](https://github.com/KusionStack/operating) controllers properly.
:::

## Import

In the examples below, we are using schemas defined in the `catalog` package. For more details on KCL package import, please refer to the [Configuration File Overview](../config-walkthrough/overview).

The `import` statements needed for the following walkthrough:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import models.schema.v1.trait as t
```

## Max Unavailable Replicas

Currently, `OpsRule` supports setting a `maxUnavailable` parameter, which specifies the maximum number of pods that can be rendered unavailable at any time. It can be either a fraction of the total pods for the current application or a fixed number. This operational rule is particularly helpful against unexpected changes or deletes to the workloads. It can also prevents too many workloads from going down during an application upgrade.

More rules will be available in future versions of Kusion.

To set `maxUnavailable` to a percentage of pods:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            # ...
        }
    }
    opsRule: t.OpsRule {
        maxUnavailable: "30%"
    }
}
```

To set `maxUnavailable` to a fixed number of pods:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    opsRule: t.OpsRule {
        maxUnavailable: 2
    }
}
```