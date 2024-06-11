---
id: set-up-operational-rules
---

# Set up Operational Rules

You can set up operational rules in the `AppConfiguration` model with the `opsrule` accessory and corresponding platform configurations in the workspace directory. The `opsrule` is the collection of operational rule requirements for the application that are used as a preemptive measure to police and stop any unwanted changes.

## Prerequisites

Please refer to the [prerequisites](deploy-application#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](deploy-application#initializing) using the `kusion workspace create` and `kusion init` command, which will create a workspace and also generate a [`kcl.mod` file](deploy-application#kclmod) under the stack directory.

## Managing Workspace Configuration

In the first guide in this series, we introduced a step to [initialize a workspace](deploy-application#initializing-workspace-configuration) with an empty configuration. The same empty configuration will still work in this guide, no changes are required there.

However, if you (or the platform team) would like to set default values for the opsrule to standardize the behavior of applications, you can do so by updating the `~/dev.yaml`. 
Note that the platform engineers should set the default workload to [Kusion Operation CollaSet](https://github.com/KusionStack/operating) and installed the Kusion Operation controllers properly, the `opsrules` module will generate a [PodTransitionRule](https://www.kusionstack.io/docs/operating/manuals/podtransitionrule) instead of updating the `maxUnavailable` value in the deployment:

```yaml
modules:
  service:
    default:
      type: CollaSet
  kusionstack/opsrule@0.1.0:
    default:
      maxUnavailable: 30%
```

Please note that the `maxUnavailable` in the workspace configuration only works as a default value and will be overridden by the value set in the application configuration.

The workspace configuration need to be updated with the command:

```bash
kusion workspace update dev -f ~/dev.yaml
```

## Example

Add the `opsrule` module dependency to `kcl.mod`: 

```shell
[package]
name = "simple-service"
version = "0.1.0"

[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.2.0" }
service = { oci = "oci://ghcr.io/kusionstack/service", tag = "0.1.0" }
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.2.0" }
opsrule = { oci = "oci://ghcr.io/kusionstack/opsrule", tag = "0.1.0" }

[profile]
entries = ["main.k"]
```

Add the `opsrule` snippet to the `AppConfiguration` in `simple-service/dev/main.k`:

```py
import kam.v1.app_configuration as ac
import service
import service.container as c
import opsrule

helloworld: ac.AppConfiguration {
    workload: service.Service {
        ...
    }
    # Configure the maxUnavailable rule
    accessories: {
        "opsrule": opsrule.OpsRule {
            "maxUnavailable": 50%
        }
    }
}
```

## Applying

Re-run steps in [Applying](deploy-application#applying), resource scaling is completed.

## Validation

We can verify the application deployment strategy now has the updated attributes `maxUnavailable: 50%` in the container configuration. 
