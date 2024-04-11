---
id: base-override
---

# Base and Override

In practice, what we have observed for production-grade applications is that they usually need to be deployed to a wide range of different targets, be it different environments in the SDLC, or different clouds, regions or runtimes for cost/regulation/performance or disaster recovery related reasons.

In that context, we advocate for a pattern where you can leverage some Kusion and KCL features to minimize the amount of duplicate configurations, by separating the common base application configuration and environment-specific ones.

:::info

The file names in the below examples don't matter as long as they are called out and appear in the correct order in the `entries` field (the field is a list) in `kcl.mod`. The files with common configurations should appear first in the list and stack-specific ones last. The latter one takes precedence.

The configurations also don't have be placed into a single `.k` file. For complex projects, they can be broken down into smaller organized `.k` files for better readability. 
:::

Base configuration defined in `base/base.k`:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.network as n
import catalog.models.schema.v1.workload.container as c

myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "<no value>"
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
            }
        }
        replicas: 1
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
}
```

Environment-specific configuration defined in `dev/main.k`:
```
import catalog.models.schema.v1 as ac

# main.k declares customized configurations for dev stack.
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                # dev stack has different app configuration from the base
                image = "gcr.io/google-samples/gb-frontend:v5"
                resources = {
                    "cpu": "250m"
                    "memory": "256Mi"
                }
            }
        }
        replicas = 2
    }
}
```

Alternatively, you could locate a specific property (in this case below, the `Container` object) in the `AppConfiguration` object using the dot selector shorthand(such as `workload.containers.myapp` or `workload.replicas` below):
```
import catalog.models.schema.v1 as ac

# main.k declares customized configurations for dev stack.
myapp: ac.AppConfiguration {
    workload.replicas = 2
    workload.containers.myapp: {
        # dev stack has different app configuration
        image = "gcr.io/google-samples/gb-frontend:v5"
        resources = {
            "cpu": "250m"
            "memory": "256Mi"
        }
    }
}
```
This is especially useful when the application configuration is complex but the override is relatively straightforward.

The two examples above are equivalent when overriding the base.