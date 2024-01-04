# Configure Containers

You can manage container-level configurations in the `AppConfiguration` model via the `containers` field (under the `workload` schemas). By default, everything defined in the `containers` field will be treated as application containers. Sidecar containers will be supported in a future version of kusion.

For the full `Container` schema reference, please see [here](/docs/user_docs/reference/model/catalog_models/workload/doc_service.md#schema-container) for more details.

## Pre-requisite
Please refer to the [prerequisites](1-deploy-application.md#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](1-deploy-application.md#initializing) using the `kusion init` command, which will generate a [`kcl.mod` file](1-deploy-application.md#kclmod) under the stack directory.

## Example
`helloworld/dev/main.k`:
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

Re-run steps in [Applying](/docs/user_docs/guides/working-with-k8s/1-deploy-application.md#applying), new container configuration can be applied.

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

We can verify the container (in the deployment template) now has the updated attributes as defined in the container configuration:
```
$ kubectl get deployment -n helloworld -o yaml
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