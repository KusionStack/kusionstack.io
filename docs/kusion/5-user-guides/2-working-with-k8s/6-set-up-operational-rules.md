# Set up Operational Rules

You can set up operational rules in the `AppConfiguration` model via the `opsRule` field and corresponding platform configurations in the workspace directory. The `opsRule` is the collection of operational rule requirements for the application that are used as a preemptive measure to police and stop any unwanted changes.

## Prerequisites

Please refer to the [prerequisites](deploy-application#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](deploy-application#initializing) using the `kusion workspace create` and `kusion init` command, which will create a workspace and also generate a [`kcl.mod` file](deploy-application#kclmod) under the stack directory.

## Managing workspace configuration

In the first guide in this series, we introduced a step to [initialize a workspace](deploy-application#initializing-workspace-configuration) with an empty configuration. The same empty configuration will still work in this guide, no changes are required there.

However, if you (or the platform team) would like to set default values for the opsRule to standardize the behavior of applications, you can do so by updating the `~/dev.yaml`:
```yaml
modules:
    opsRule:
        default:
            maxUnavailable: "40%"
```

Please note that the `maxUnavailable` in the workspace configuration only works as a default value and will be overridden by the value set in the application configuration.

The workspace configuration need to be updated with the command:
```bash
kusion workspace update dev -f ~/dev.yaml
```

:::info
If the platform engineers have set the default workload to [Kusion Operation](https://github.com/KusionStack/operating) and installed the Kusion Operation controllers properly, the `opsRules` module will generate a [PodTransitionRule](https://www.kusionstack.io/docs/operating/manuals/podtransitionrule) instead of updating the `maxUnavailable` value in the deployment
:::

## Example

### AppConfiguration

 Add the `opsRule` snippet to the `AppConfiguration` in `dev/main.k`

```py
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.trait as t

helloworld: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "helloworld": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v4"
                resources: {
                    "cpu": "500m"
                    "memory": "512M"
                }
            }
        }
        replicas: 2
    }
    # config the maxUnavailable rule
    opsRule = t.OpsRule {
        maxUnavailable: "30%"
    }
}
```

## Applying

Re-run steps in [Applying](deploy-application#applying), resource scaling is completed.

```
$ kusion apply
✔︎  Generating Intent in the Stack dev...                                                                                                                                                                                                                                         
Stack: dev  ID                                                       Action
* ├─     v1:Namespace:helloworld                                  UnChanged
* ├─     v1:Service:helloworld:helloworld-dev-helloworld-private  UnChanged
* └─     apps/v1:Deployment:helloworld:helloworld-dev-helloworld  Update


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  UnChanged v1:Namespace:helloworld, skip                                                                                                                                                                                                                               
 SUCCESS  UnChanged v1:Service:helloworld:helloworld-dev-helloworld-private, skip                                                                                                                                                                                               
 SUCCESS  Update apps/v1:Deployment:helloworld:helloworld-dev-helloworld success                                                                                                                                                                                                
Update apps/v1:Deployment:helloworld:helloworld-dev-helloworld success [3/3] █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 0 created, 1 updated, 0 deleted.
```

## Validation

We can verify the application deployment strategy now has the updated attributes `maxUnavailable: 30%` in the container configuration:

```shell
kubectl get deployment -n helloworld -o yaml
...
apiVersion: apps/v1
    kind: Deployment
...
  spec:
    strategy:
      rollingUpdate:
        maxUnavailable: 30%
      type: RollingUpdate

...
```