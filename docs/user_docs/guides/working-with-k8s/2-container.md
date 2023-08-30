# Configure Main Container

The attribute `mainContainer` of `the Server` model is used to declare the main container configuration of the application.
For the abstract definition of the main container, please see [here](/docs/reference/model/documentation//kusion_models/kube/frontend/container/container.md#main) for more details.

## Prerequisites

Please refer to the [prerequisites](/docs/user_docs/guides/working-with-k8s/deploy-server#prerequisites) in the guide for deploying an application.

## Example

```py
appConfiguration: frontend.Server {
    # main container
    mainContainer = container.Main {
        # container name
        name = "main"
        # container envs
        env = [
            {
                name = "HOST_NAME"
                value = "example.com"
            }
        ]
        # container ports
        ports = [
            { containerPort = 80 }
        ]
    }
}
```
