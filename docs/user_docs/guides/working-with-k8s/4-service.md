# Expose Service

The attribute `services` of the `Server` model is used to declare your app's network configuration.
For the abstract definition of `service`, please see [here](/docs/reference/model/documentation//kusion_models/kube/frontend/service/service.md#service-1) for more details.

## Prerequisites

Please refer to the [prerequisites](/docs/user_docs/guides/working-with-k8s/deploy-server#prerequisites) in the guide for deploying an application.

## Example

Add the Service configuration in `dev/main.k` or `base/base.k` of the sample code:

```py
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.service

appConfiguration: frontend.Server {
    # 添加 Service 配置
    services = [
        service.Service {
            name = "app"
            type = "NodePort"
            ports = [
                {
                    "port" = 80
                }
            ]
        }
    ]
}
```

The code above is a sample configuration, you can add custom configuration according to the actual situation.

## Applying

Re-run steps in [Applying](/docs/user_docs/guides/working-with-k8s/deploy-server#applying), new service configuration can be applied.

```
$ kusion apply
SUCCESS  Compiling in stack dev...

Stack: dev    Provider                Type              Name    Plan
      * ├─  kubernetes        v1:Namespace              demo  UnChange
      * ├─  kubernetes          v1:Service      demo-service  Update
      * └─  kubernetes  apps/v1:Deployment           demodev  UnChange

✔ yes
SUCCESS  Updating v1:Service
Updating v1:Service [1/1] ████████████████████████████████ 100% | 0s
```
