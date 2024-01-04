---
sidebar_position: 4
---

# Workload

The `workload` attribute in the `AppConfiguration` instance is used to describe the specification for the application workload. The application workload generally represents the computing component for the application. It is the only required field when instantiating an `AppConfiguration`.

A `workload` maps to an `AppConfiguration` instance 1:1. If there are more than one workload, they should be considered different applications.

## Table of Content
- [Import](#import)
- [Types of workloads](#types-of-workloads)
- [Configure containers](#configure-containers)
    - [Application image](#application-image)
    - [Resource Requirements](#resource-requirements)
    - [Health Probes](#health-probes)
    - [Lifecycle Hooks](#lifecycle-hooks)
    - [Create Files](#create-files)
    - [Customize container initialization](#customize-container-initialization)
- [Configure Replicas](#configure-replicas)
- [Differences between Services and Jobs](#differences-between-services-and-jobs)
- [Workload References](#workload-references)

## Import

In the examples below, we are using schemas defined in the `catalog` package. For more details on KCL package import, please refer to the [Configuration File Overview](/docs/user_docs/config-walkthrough/overview.md).

The `import` statements needed for the following walkthrough:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.container.probe as p
import catalog.models.schema.v1.workload.container.lifecycle as lc
```

## Types of Workloads

There are currently two types of workloads defined in the `AppConfiguration` model:
- `Service`, representing a long-running, scalable workload type that should "never" go down and respond to short-lived latency-sensitive requests. This workload type is commonly used for web applications and services that expose APIs.
- `Job`, representing batch tasks that take from a few seconds to days to complete and then stop. These are commonly used for batch processing that is less sensitive to short-term performance fluctuations.

To instantiate a `Service`:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {}
}
```

To instantiate a `Job`:
```
myapp: ac.AppConfiguration {
    workload: wl.Job {}
}
```

Of course, the `AppConfiguration` instances above is not sufficient to describe an application. We still need to provide more details in the `workload` section.

## Configure containers

Kusion is built on top of cloud-native philosophies. One of which is that applications should run as loosely coupled microservices on abstract and self-contained software units, such as containers.

The `containers` attribute in a workload instance is used to define the behavior for the containers that run application workload. The `containers` attribute is a map, from the name of the container to the `catalog.models.schema.v1.workload.container.Container` Object which includes the container configurations.

:::info

The name of the container is in the context of the configuration file, so you could refer to it later. It's not referring to the name of the container in the Kubernetes cluster (or any other runtime).
:::

Everything defined in the `containers` attribute is considered an application container, as opposed to a sidecar container. Sidecar containers will be introduced in a different attribute in a future version.

In most of the cases, only one application container is needed. Ideally, we recommend mapping an `AppConfiguration` instance to a microservice in the microservice terminology.

We will walkthrough the details of configuring a container using an example of the `Service` type.

To add an application container:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {}
        }
    }
}
```

### Application image

The `image` attribute in the `Container` schema specifies the application image to run. This is the only required field in the `Container` schema.

To specify an application image:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v5"
            }
            # ...
        }
    }
}
```

### Resource Requirements

The `resources` attribute in the `Container` schema specifies the application resource requirements such as cpu and memory.

You can specify an upper limit (which maps to resource limits only) or a range as the resource requirements (which maps to resource requests and limits in Kubernetes).

To specify an upper bound (only resource limits):
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v5"
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
                # ...
            }
        }
    }
}
```

To specify a range (both resource requests and limits):
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v5"
                # Sets requests to cpu=250m and memory=256Mi
                # Sets limits to cpu=500m and memory=512Mi
                resources: {
                    "cpu": "250m-500m"
                    "memory": "256Mi-512Mi"
                }
                # ...
            }
        }
    }
}
```

### Health Probes

There are three types of `Probe` defined in a `Container`:
- `livenessProbe` - used to determine if the container is healthy and running
- `readinessProbe` - used to determine if the container is ready to accept traffic
- `startupProbe` - used to determine if the container has started properly. Liveness and readiness probes don't start until `startupProbe` succeeds. Commonly used for containers that takes a while to start

The probes are optional. You can only have one Probe of each kind for a given `Container`.

To configure a `Http` type `readinessProbe` that probes the health via HTTP request and a `Exec` type `livenessProbe` which executes a command:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v5"
                # ...
                # Configure an Http type readiness probe at /healthz
                readinessProbe: p.Probe {
                    probeHandler: p.Http {
                        url: "/healthz"
                    }
                    initialDelaySeconds: 10
                    timeoutSeconds: 5
                    periodSeconds: 15
                    successThreshold: 3
                    failureThreshold: 1
                }
                # Configure an Exec type liveness probe that executes probe.sh
                livenessProbe: p.Probe {
                    probeHandler: p.Exec {
                        command: ["probe.sh"]
                    }
                    initialDelaySeconds: 10
                }
            }
        }
    }
}
```

### Lifecycle Hooks

You can also configure lifecycle hooks that triggers in response to container lifecycle events such as liveness/startup probe failure, preemption, resource contention, etc.

There are two types that is currently supported:
- `PreStop` - triggers before the container is terminated.
- `PostStart` - triggers after the container is initialized.

```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v5"
                # ...
                # Configure lifecycle hooks
                lifecycle: lc.Lifecycle {
                    # Configures an Exec type pre-stop hook that executes preStop.sh
                    preStop: p.Exec {
                        command: ["preStop.sh"]
                    }
                    # Configures an Http type pre-stop hook at /post-start
                    postStart: p.Http {
                        url: "/post-start"
                    }
                }
            }
        }
    }
}
```

### Create Files

You can also create files on-demand during the container initialization.

To create a custom file and mount it to `/home/admin/my-file` when the container starts:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v5"
            }
            # ...
            # Creates a file during container startup
            files: {
                "/home/admin/my-file": c.FileSpec {
                    content: "some file contents"
                    mode: "0777"
                }
            }
        }
    }
}
```

### Customize container initialization

You can also customize the container entrypoint via `command`, `args`, and `workingDir`. These should **most likely not be required**. In most of the cases, the entrypoint details should be baked into the application image itself.

To customize the container entrypoint:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v5"
                # ...
                # This command will overwrite the entrypoint set in the image Dockerfile
                command: ["/usr/local/bin/my-init-script.sh"]
                # Extra arguments append to command defined above
                args: [
                    "--log-dir=/home/my-app/logs"
                    "--timeout=60s"
                ]
                # Run the command as defined above, in the directory "/tmp"
                workingDir: "/tmp"
            }
        }
    }
}
```

## Configure Replicas

The `replicas` field in the `workload` instance describes the number of identical copies to run at the same time. It is generally recommended to have multiple replicas in production environments to eliminate any single point of failure. In Kubernetes, this corresponds to the `spec.replicas` field in the relevant workload manifests.

To configure a workload to have a replica count of 3:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            # ...
        }
        replicas: 3
        # ...
    }
    # ...
}
```

Autoscaling will be supported in a future version of Kusion, at which point you will be able to specify a range of replicas.

## Differences between Services and Jobs

The two types of workloads, namely `Service` and `Job`, share a majority of the attributes with some minor differences.

### Exposure

A `Service` usually represents a long-running, scalable workload that responds to short-lived latency-sensitive requests and never go down. Hence a `Service` has an additional attribute that determines how it is exposed and can be accessed. A `Job` does NOT the option to be exposed. We will explore more in the [application networking walkthrough](/docs/user_docs/config-walkthrough/networking.md).

### Workload Implementations

Kusion also supports multiple kinds of Kubernetes workload implementations for a `Service` type workload. The current supported kinds are `Deployment`(default) and `CollaSet`, which is a workload type defined in the [KusionStack-operating toolkit](https://github.com/KusionStack/operating) under the KusionStack family. You can learn more about `CollaSet` [here](https://kusionstack.io/).

To specify a `CollaSet` kind `Service`:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        type: "CollaSet"
        # ...
    }
}
```

If `type` is not provided, Kusion defaults to use the Kubernetes `Deployment`.

### Job Schedule

A `Job` can be configured to run in a recurring manner. In this case, the job will have a cron-format schedule that represents its recurring schedule.

To configure a job to run at 21:00 every night:
```
myapp: wl.Job {
        containers: {
            # ...
        }
        schedule: "0 21 * * *"
    }
```

## Workload References

You can find workload references [here](/docs/user_docs/reference/model/catalog_models/workload/doc_service.md).

You can find workload schema source [here](https://github.com/KusionStack/catalog/tree/main/models/schema/v1/workload).