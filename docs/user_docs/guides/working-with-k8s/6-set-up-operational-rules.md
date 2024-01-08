# Set up operational rules

You can set up operational rules in the `AppConfiguration` model via the `opsRule` field and corresponding platform configurations in the workspace directory. The `opsRule` is the collection of operational rule requirements for the application that are used as a preemptive measure to police and stop any unwanted changes.

## Prerequisites

Please refer to the [prerequisites](1-deploy-application.md#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](1-deploy-application.md#initializing) using the `kusion init` command, which will generate a [`kcl.mod`](1-deploy-application.md#kclmod) file under the project directory.

## Example

### App Configuration

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

### Platform configuration

For platform engineers, you can also set default values of the opsRule in the `~/.kusion/workspace/dev.yaml` to standardize the behavior of applications. The `maxUnavailable` in the platform configuration will be overridden by the value set in the application configuration.

:::info
If the platform engineers have set the default workload to [Kusion Operation](https://github.com/KusionStack/operating) and installed the Kusion Operation controllers properly, the `opsRules` module will generate a [PodTransitionRule](https://www.kusionstack.io/docs/operating/manuals/podtransitionrule) instead of updating the `maxUnavailable` value in the deployment
:::

```yaml
modules:
    opsRule:
        default:
            maxUnavailable: "40%"
```

## Applying

Re-run steps in [Applying](1-deploy-application.md#applying), resource scaling is completed.

```
$ kusion apply
✔︎  Generating Spec in the Stack dev...                                                                                                                                                                                                                                         
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