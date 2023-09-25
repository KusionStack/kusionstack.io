# Configure Resource Specification

You can manage container-level resource specification in the `AppConfiguration` model via the `resources` field (under the `Container` schema).

For the full `Container` schema reference, please see [here](/docs/user_docs/reference/model/catalog_models/workload/doc_service.md#schema-container) for more details.

## Prerequisites

Please refer to the [prerequisites](1-deploy-application.md#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](1-deploy-application.md#initializing) using the `kusion init` command, which will generate a [`kcl.mod` file](1-deploy-application.md#kclmod) under the project directory.

## Example
Update the resources value in `dev/main.k`:
```py
import catalog.models.schema.v1 as ac

helloworld: ac.AppConfiguration {
    workload.containers.helloworld: {
        # dev stack has different resource requirements
        # set resources to your want
        # before:
        # resources: {
        #     "cpu": "500m"
        #     "memory": "512M"
        # }
        # after: 
        resources: {
            "cpu": "250m"
            "memory": "256Mi"
        }
    }
}
```

Everything else in `main.k` stay the same.

## Applying

Re-run steps in [Applying](/docs/user_docs/guides/working-with-k8s/deploy-application#applying), resource scaling is completed.

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
We can verify the application container (in the deployment template) now has the updated resources attributes (cpu:250m, memory:256Mi) as defined in the container configuration:
```
kubectl get deployment -n helloworld -o yaml
...
    template:
      ...
      spec:
        containers:
        - env:
          ...
          image: gcr.io/google-samples/gb-frontend:v4
          ...
          resources:
            limits:
              cpu: 250m
              memory: 256Mi
...
```