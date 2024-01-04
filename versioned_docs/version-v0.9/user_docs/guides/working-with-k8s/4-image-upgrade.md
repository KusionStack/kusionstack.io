# Upgrade Image

You can declare the application's container image via `image` field of the `Container` schema.

For the full `Container` schema reference, please see [here](/docs/user_docs/reference/model/catalog_models/workload/doc_service.md#schema-container) for more details.

## Pre-requisite
Please refer to the [prerequisites](1-deploy-application.md#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](1-deploy-application.md#initializing) using the `kusion init` command, which will generate a [`kcl.mod` file](1-deploy-application.md#kclmod) under the project directory.

## Example

Update the image value in `dev/main.k`:
```py
import catalog.models.schema.v1 as ac

helloworld: ac.AppConfiguration {
    workload.containers.nginx: {
        # dev stack has different image
        # set image to your want
        # before: 
        # image = "gcr.io/google-samples/gb-frontend:v4"
        # after: 
        image = "gcr.io/google-samples/gb-frontend:v5"
    }
}
```

Everything else in `main.k` stay the same.

## Applying

Re-run steps in [Applying](/docs/user_docs/guides/working-with-k8s/1-deploy-application.md#applying), update image is completed.

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
We can verify the application container (in the deployment template) now has the updated image (v5) as defined in the container configuration:
```
kubectl get deployment -n helloworld -o yaml
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