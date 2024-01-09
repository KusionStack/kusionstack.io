# Expose Service

You can determine how to expose your service in the `AppConfiguration` model via the `ports` field (under the `workload` schemas). The `ports` field defines a list of all the `Port`s you want to expose for the application (and their corresponding listening ports on the container, if they don't match the service ports), so that it can be consumed by other applications.

Unless explicitly defined, each of the ports exposed is by default exposed privately as a `ClusterIP` type service. You can expose a port publicly by specifying the `exposeInternet` field in the `Port` schema. At the moment, the implementation for publicly access is done via Load Balancer type service backed by cloud providers. Ingress will be supported in a future version of kusion.

For the `Port` schema reference, please see [here](../../reference/model/catalog_models/workload/doc_service#schema-port) for more details.

## Prerequisites

Please refer to the [prerequisites](deploy-application#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](deploy-application#initializing) using the `kusion init` command, which will generate a [`kcl.mod` file](deploy-application#kclmod) under the project directory.

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
                port: 8080
                targetPort: 80
            }
        ]
    }
}
```

The code above changes the service port to expose from `80` in the last guide to `8080`, but still targeting the container port `80` because that's what the application is listening on.

## Applying

Re-run steps in [Applying](deploy-application#applying), new service configuration can be applied.

```
$ kusion apply
 ✔︎  Generating Spec in the Stack dev...                         
Stack: dev  ID                                                       Action
* ├─     v1:Namespace:helloworld                                  UnChanged
* ├─     v1:Service:helloworld:helloworld-dev-helloworld-private  Update
* └─     apps/v1:Deployment:helloworld:helloworld-dev-helloworld  UnChanged


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  UnChanged v1:Namespace:helloworld, skip                                                                                                                                                                                                                               
 SUCCESS  Update v1:Service:helloworld:helloworld-dev-helloworld-private success                                                                                                                                                                                                
 SUCCESS  UnChanged apps/v1:Deployment:helloworld:helloworld-dev-helloworld, skip                                                                                                                                                                                               
UnChanged apps/v1:Deployment:helloworld:helloworld-dev-helloworld, skip [3/3] ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 0 created, 1 updated, 0 deleted.
```

## Validation
We can verify the Kubernetes service now has the updated attributes (mapping service port 8080 to container port 80) as defined in the `ports` configuration:
```
kubectl get svc -n helloworld -o yaml
...
  spec:
    ...
    ports:
    - name: helloworld-dev-helloworld-private-8080-tcp
      port: 8080
      protocol: TCP
      targetPort: 80
...
```

Exposing service port 8080:
```
kubectl port-forward svc/helloworld-dev-helloworld-private -n helloworld 30000:8080
```

Open browser and visit [http://127.0.0.1:30000](http://127.0.0.1:30000), the application should be up and running：

![app-preview](/img/docs/user_docs/guides/working-with-k8s/app-preview.png)