# Configure Containers

You can manage container-level configurations in the `AppConfiguration` model via the `containers` field (under the `workload` schemas). By default, everything defined in the `containers` field will be treated as application containers. Sidecar containers will be supported in a future version of kusion.

For the full `Container` schema reference, please see [here](../../reference/modules/catalog-models/workload/service#schema-container) for more details.

## Pre-requisite

Please refer to the [prerequisites](deploy-application#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](deploy-application#initializing) using the `kusion workspace create` and `kusion init` command, which will create a workspace and also generate a [`kcl.mod` file](deploy-application#kclmod) under the stack directory.

## Managing Workspace Configuration

In the last guide, we introduced a step to [initialize a workspace](deploy-application#initializing-workspace-configuration) with an empty configuration. The same empty configuration will still work in this guide, no changes are required there.

However, if you (or the platform team) would like to set default values for the workloads to standardize the behavior of applications in the `dev` workspace, you can do so by updating the `~/dev.yaml`:
```yaml
modules:
  service:
    default:
      replicas: 3
      labels:
        label-key: label-value
      annotations:
        annotation-key: annotation-value
      type: CollaSet
```

Please note that the `replicas` in the workspace configuration only works as a default value and will be overridden by the value set in the application configuration.

The workspace configuration need to be updated with the command:
```bash
kusion workspace update dev -f ~/dev.yaml
```

For a full reference of what can be configured in the workspace level, please see the [workspace reference](../../reference/modules/workspace-configs/workload/service).

## Example
`simple-service/dev/main.k`:
```py
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.container.probe as p
import catalog.models.schema.v1.workload.network as n

helloworld: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "helloworld": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v4"
                env: {
                    "env1": "VALUE"
                    "env2": "VALUE2"
                }
                resources: {
                    "cpu": "500m"
                    "memory": "512M"
                }
                # Configure an HTTP readiness probe
                readinessProbe: p.Probe {
                    probeHandler: p.Http {
                        url: "http://localhost:80"
                    }
                    initialDelaySeconds: 10
                }
            }
        }
        replicas: 2
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
}
```

## Apply

Re-run steps in [Applying](deploy-application#applying), new container configuration can be applied.

```
$ kusion apply
  ✔︎  Generating Intent in the Stack dev...                                                                                                                                                                                                     
Stack: dev  ID                                                               Action
* ├─     v1:Namespace:simple-service                                      UnChanged
* ├─     v1:Service:simple-service:simple-service-dev-helloworld-private  UnChanged
* └─     apps/v1:Deployment:simple-service:simple-service-dev-helloworld  Update


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  UnChanged v1:Namespace:simple-service, skip                                                                                                                                                                                         
 SUCCESS  UnChanged v1:Service:simple-service:simple-service-dev-helloworld-private, skip                                                                                                                                                     
 SUCCESS  Update apps/v1:Deployment:simple-service:simple-service-dev-helloworld success                                                                                                                                                      
Update apps/v1:Deployment:simple-service:simple-service-dev-helloworld success [3/3] ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 0 created, 1 updated, 0 deleted.
```

## Validation

We can verify the container (in the deployment template) now has the updated attributes as defined in the container configuration:
```
$ kubectl get deployment -n simple-service -o yaml
...
    template:
      ...
      spec:
        containers:
        - env:
          - name: env1
            value: VALUE
          - name: env2
            value: VALUE2
          image: gcr.io/google-samples/gb-frontend:v4
          imagePullPolicy: IfNotPresent
          name: helloworld
          readinessProbe:
            failureThreshold: 3
            httpGet:
              host: localhost
              path: /
              port: 80
              scheme: HTTP
            initialDelaySeconds: 10
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 1
          resources:
            limits:
              cpu: 500m
              memory: 512M
...
```