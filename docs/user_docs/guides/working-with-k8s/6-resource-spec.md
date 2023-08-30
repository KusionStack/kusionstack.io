# Configure Resource Specification

The attribute `schedulingStrategy` of the `Server` model is used to declare the resource spec of an application's business container.
About the definition of resource spec, please see [here](/docs/reference/model/documentation//kusion_models/kube/frontend/resource/resource.md#resource-1) for more details.

## Prerequisites

Please refer to the [prerequisites](/docs/user_docs/guides/working-with-k8s/deploy-server#prerequisites) in the guide for deploying an application.

## Example

Re-assign the `schedulingStrategy.resource` value.

There are two ways to modify the resource spec, one is to modify the values of `cpu` and `memory` in the resource expression:

```py
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.resource as res

appConfiguration: frontend.Server {
    # modify the values of cpu and memory in the resource expression
    # before: schedulingStrategy.resource = "cpu=100m,memory=100Mi,disk=1Gi"
    # after(scale up): 
    schedulingStrategy.resource = res.Resource {
        cpu = 500m
        memory = 500Mi
        disk = 1Gi
    }
}
```

The other is to use the preset resource value to replace the original value to expand the application:

```py
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.templates.resource as res_tpl

appConfiguration: frontend.Server {
    # use the preset resource value
    # before: schedulingStrategy.resource = "cpu=100m,memory=100Mi,disk=1Gi"
    # after(scale up): 
    schedulingStrategy.resource = res_tpl.large
}
```

The code above is a sample configuration, you can add custom configurations according to the actual situation:

```py
import base.pkg.kusion_models.kube.frontend.resource as res

schema SchedulingStrategy:
    """ SchedulingStrategy represents scheduling strategy.

    Attributes
    ----------
    resource: str | res.Resource, default is "1<cpu<2,1Gi<memory<2Gi,disk=20Gi", required.
        A Pod-level attribute.
        Main container resource.
    """
    resource: str | res.Resource = "1<cpu<2,1Gi<memory<2Gi,disk=20Gi"
```

## Applying

Re-run steps in [Applying](/docs/user_docs/guides/working-with-k8s/deploy-server#applying), resource scaling is completed.

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
