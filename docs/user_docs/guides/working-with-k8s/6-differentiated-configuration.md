# Differentiated Configurations

When describing an application, you can set different, stack-specific values in `main.k` in the stack directory, while keeping the common configuration in `base/base.k` in the project directory.

:::tip

About Project and Stack, please see [Project&Stack](/user_docs/concepts/glossary.md) for more details.
:::

## Pre-requisite
Please refer to the [prerequisites](1-deploy-application.md#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](1-deploy-application.md#initializing) using the `kusion init` command, which will generate a [`kcl.mod` file](1-deploy-application.md#kclmod) under the project directory.

## Example
Base config in the `helloworld/base/base.k`:
```py
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.network as n
import catalog.models.schema.v1.workload.container.probe as p

helloworld: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "helloworld": c.Container {
                image: "nginx"
                # Two environment variables will be set
                env: {
                    "env1": "VALUE"
                    "env2": "VALUE2"
                }
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
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
In the `dev` stack config in the `helloworld/dev/main.k`:
```py
import catalog.models.schema.v1 as ac

# main.k declares customized configurations for dev stack.
helloworld: ac.AppConfiguration {
    workload.containers.helloworld: {
        # dev stack has different app configuration
        image = "gcr.io/google-samples/gb-frontend:v5"
        resources = {
            "cpu": "250m"
            "memory": "256Mi"
        }
    }
    workload.replicas = 3
}
```

This will be merged with the `helloworld` AppConfiguration in `base.k` and override the common configuration defined in `base.k`, such as `image`, `resources` and `replicas`.
