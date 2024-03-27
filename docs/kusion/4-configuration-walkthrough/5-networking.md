---
id: networking
---

# Application Networking

In addition to configuring application's [container specifications](workload#configure-containers), you can also configure its networking behaviors, including how to expose the application and how it can be accessed. You can specify a `network` module in the `accessories` field in `AppConfiguration` to achieve that.

In future versions, this will also include ingress-based routing strategy and DNS configurations.

## Import

In the examples below, we are using schemas defined in the `kam` package and the `network` Kusion Module. For more details on KCL package and module import, please refer to the [Configuration File Overview](overview).

The `import` statements needed for the following walkthrough:
```
import kam.v1.app_configuration as ac
import kam.v1.workload as wl
import network.network as n
```

The `kcl.mod` must contain reference to the network module:
```
#...

[dependencies]
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.1.0" }

#...
```

## Private vs Public Access

Private network access means the service can only be access from within the target cluster.

Public access is implemented using public load balancers on the cloud. This generally requires a Kubernetes cluster that is running on the cloud with a vendor-specific service controller.

Any ports defined default to private access unless explicitly specified.

To expose port 80 to be accessed privately:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                }
            ]
        }
    }
}
```

To expose port 80 to be accessed publicly:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                    public: True
                }
            ]
        }
    }
}
```

:::info
The CSP (Cloud Service Provider) used to provide load balancers is defined by platform engineers in workspace.
:::

## Mapping ports

To expose a port `80` that maps to a different port `8088` on the container:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                    targetPort: 8088
                }
            ]
        }
    }
}
```

## Exposing multiple ports

You can also expose multiple ports and configure them separately. 

To expose port 80 to be accessed publicly, and port 9099 for private access (to be scraped by Prometheus, for example):
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                    public: True
                }
                n.Port {
                    port: 9099
                }
            ]
        }
    }
}
```

## Choosing protocol

To expose a port using the `UDP` protocol:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                    targetPort: 8088
                    protocol: "UDP"
                }
            ]
        }
    }
}
```