# Upgrade Image

The attribute `image` of the `Server` model is used to declare your app's business container image.
For the definition of `image`, please see [here](/docs/reference/model/documentation//kusion_models/kube/frontend/frontend.md#server) for more details.

## Prerequisites

Please refer to the [prerequisites](/docs/user_docs/guides/working-with-k8s/deploy-server#prerequisites) in the guide for deploying an application.

## Example

Re-assign the image value in `dev/main.k`:

```py
import base.pkg.kusion_models.kube.frontend

appConfiguration: frontend.Server {
    # set image to your want
    # before: image = "gcr.io/google-samples/gb-frontend:v4"
    # after: 
    image = "gcr.io/google-samples/gb-frontend:v5"
}
```

## Applying

Re-run steps in [Applying](/docs/user_docs/guides/working-with-k8s/deploy-server#applying), update image is completed.

```
$ kusion apply
SUCCESS  Compiling in stack dev...

Stack: dev    Provider                Type              Name    Plan
      * ├─  kubernetes        v1:Namespace              demo  UnChange
      * ├─  kubernetes          v1:Service      demo-service  UnChange
      * └─  kubernetes  apps/v1:Deployment           demodev  Update

✔ yes
SUCCESS  Updating apps/v1:Deployment
Updating apps/v1:Deployment [1/1] ████████████████████████████████ 100% | 0s
```
