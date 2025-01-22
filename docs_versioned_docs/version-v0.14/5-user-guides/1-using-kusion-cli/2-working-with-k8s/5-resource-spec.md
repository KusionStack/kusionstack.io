---
id: resource-spec
---

# Configure Resource Specification

You can manage container-level resource specification in the `AppConfiguration` model via the `resources` field (under the `Container` schema).

For the full `Container` schema reference, please see [here](../../../6-reference/2-modules/1-developer-schemas/workload/service.md#schema-container) for more details.

## Prerequisites

Please refer to the [prerequisites](1-deploy-application.md#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](1-deploy-application.md#initializing) using the `kusion workspace create` and `kusion init` command, which will create a workspace and also generate a [`kcl.mod` file](1-deploy-application.md#kclmod) under the stack directory.

## Managing Workspace Configuration

In the first guide in this series, we introduced a step to [initialize a workspace](1-deploy-application.md#initializing-workspace-configuration) with an empty configuration. The same empty configuration will still work in this guide, no changes are required there.

## Example

Update the resources value in `simple-service/dev/main.k`:

```py
import kam.v1.app_configuration as ac

helloworld: ac.AppConfiguration {
    workload.containers.helloworld: {
        ...
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
        ...
    }
}
```

Everything else in `main.k` stay the same.

## Applying

Re-run steps in [Applying](1-deploy-application.md#applying), resource scaling is completed.

```
$ kusion apply
 ✔︎  Generating Spec in the Stack dev...                                                                                                                                                                                                     
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

We can verify the application container (in the deployment template) now has the updated resources attributes (cpu:250m, memory:256Mi) as defined in the container configuration:

```
kubectl get deployment -n simple-service -o yaml
...
    template:
      ...
      spec:
        containers:
        - env:
          ...
          image: gcr.io/google-samples/gb-frontend:v5
          ...
          resources:
            limits:
              cpu: 250m
              memory: 256Mi
...
```