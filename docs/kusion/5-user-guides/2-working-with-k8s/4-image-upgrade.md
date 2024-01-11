# Upgrade Image

You can declare the application's container image via `image` field of the `Container` schema.

For the full `Container` schema reference, please see [here](../../reference/modules/catalog-models/workload/service#schema-container) for more details.

## Pre-requisite
Please refer to the [prerequisites](deploy-application#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](deploy-application#initializing) using the `kusion workspace create` and `kusion init` command, which will create a workspace and also generate a [`kcl.mod` file](deploy-application#kclmod) under the stack directory.

## Managing Workspace Configuration

In the first guide in this series, we introduced a step to [initialize a workspace](deploy-application#initializing-workspace-configuration) with an empty configuration. The same empty configuration will still work in this guide, no changes are required there.

## Example

Update the image value in `simple-service/dev/main.k`:
```py
import catalog.models.schema.v1 as ac

helloworld: ac.AppConfiguration {
    workload.containers.nginx: {
        ...
        # before: 
        # image = "gcr.io/google-samples/gb-frontend:v4"
        # after: 
        image = "gcr.io/google-samples/gb-frontend:v5"
        ...
    }
}
```

Everything else in `main.k` stay the same.

## Applying

Re-run steps in [Applying](deploy-application#applying), update image is completed.

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
We can verify the application container (in the deployment template) now has the updated image (v5) as defined in the container configuration:
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
...
```