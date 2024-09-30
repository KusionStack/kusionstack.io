---
id: operational-rules
---

# Operational Rules

You could also specify the collection of operational rule requirements for the application. That can be achieved via a `opsrule` module (or bring-your-own-module) in the `accessories` field in `AppConfiguration` to achieve that. Operational rules are used as a preemptive measure to police and stop any unwanted changes.

## Import

In the examples below, we are using schemas defined in the `kam` package and the `opsrule` Kusion Module. For more details on KCL package and module import, please refer to the [Configuration File Overview](overview).

The `import` statements needed for the following walkthrough:
```
import kam.v1.app_configuration as ac
import kam.v1.workload as wl
import opsrule as o
```

## Max Unavailable Replicas

Currently, the `opsrule` module supports setting a `maxUnavailable` parameter, which specifies the maximum number of pods that can be rendered unavailable at any time. It can be either a fraction of the total pods for the current application or a fixed number. This operational rule is particularly helpful against unexpected changes or deletes to the workloads. It can also prevent too many workloads from going down during an application upgrade.

More rules will be available in future versions of Kusion.

To set `maxUnavailable` to a percentage of pods:
```
myapp: ac.AppConfiguration {
    workload: service.Service {
        containers: {
            # ...
        }
    }
    accessories: {
        "opsRule": o.OpsRule {
            maxUnavailable: "30%"
        }
    }
}
```

To set `maxUnavailable` to a fixed number of pods:
```
myapp: ac.AppConfiguration {
    workload: service.Service {
        # ...
    }
    accessories: {
        "opsRule": o.OpsRule {
            maxUnavailable: 2
        }
    }
}
```