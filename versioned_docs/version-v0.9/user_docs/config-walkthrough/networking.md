---
sidebar_position: 5
---

# Application Networking

In addition to configuring application's [container specifications](workload#configure-containers), you can also configure its networking behaviors, including how to expose the application and how it can be accessed.

In future versions, this will also include ingress-based routing strategy and DNS configurations.

## Import

In the examples below, we are using schemas defined in the `catalog` package. For more details on KCL package import, please refer to the [Configuration File Overview](overview).

The `import` statements needed for the following walkthrough:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.network as n
```

## Private vs Public Access

Private network access means the service can only be access from within the target cluster.

Public access is implemented using public load balancers on the cloud as of v0.9.0. This generally requires a Kubernetes cluster that is running on the cloud with a vendor-specific service controller.

Any ports defined default to private access unless explicitly specified.

To expose port 80 to be accessed privately:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
}
```

To expose port 80 to be accessed publicly on AWS using an AWS Load Balancer:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        ports: [
            n.Port {
                type: "aws"
                port: 80
                public: True
            }
        ]
    }
}
```

## Mapping ports

To expose a port `80` that maps to a different port `8088` on the container:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        ports: [
            n.Port {
                port: 80
                targetPort: 8088
            }
        ]
    }
}
```

## Exposing multiple ports

You can also expose multiple ports and configure them separately. 

To expose port 80 to be accessed publicly on an AliCloud load balancer, and port 9099 for private access (to be scraped by Prometheus, for example):
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        ports: [
            n.Port {
                type: "aliyun"
                port: 80
                public: True
            }
            n.Port {
                port: 9099
            }
        ]
    }
}
```

## Choosing protocol

To expose a port using the `UDP` protocol:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        ports: [
            n.Port {
                port: 80
                targetPort: 8088
                protocol: "UDP"
            }
        ]
    }
}
```