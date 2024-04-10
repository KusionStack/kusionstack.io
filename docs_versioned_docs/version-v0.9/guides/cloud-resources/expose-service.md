# Expose Application Service Deployed on CSP Kubernetes

Deploying application on the Kuberentes provided by CSP (Cloud Service Provider) is convenient and reliable, which is adopted by many individuals and enterprises. Kusion has a good integration with CSP Kuberentes service. You can deploy your application to the Kubernetes cluster, and expose the service in a quite easy way. 

This tutorial demonstrates how to expose service of the application deployed on CSP Kubernetes. In this article, *[exposing the service of nginx](https://github.com/KusionStack/konfig/blob/main/example/nginx/dev/main.k) (referred to "the example" in the below)*  is given as an example.

## Prerequisites

Create a Kubernetes cluster, the following CSP Kubernetes services are supported.

- [Alibaba Cloud Container Service for Kubernetes (ACK)](https://www.alibabacloud.com/product/kubernetes)
- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks).

After creating the cluster, get the kube-config and export it, so that Kusion can access the cluster.

```bash
export KUBE_CONFIG="<kube-config file>"
```

## Expose Service Publicly

If you want the application can be accessed from outside the cluster, you should expose the service publicly. Follow the steps below, you will simply hit the goal.

### Write Configuration Code

```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.network as n

nginx: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            nginx: c.Container {
                image = "nginx:1.25.2"
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
            }
        }
        replicas: 1
        ports: [
            n.Port {
                type: "aliyun"
                port: 80
                protocol: "TCP"
                public: True
            }
        ]
    }
}
```

The code shown above describes how to expose service publicly of the example on ACK. Kusion use schema `Port` to describe the network configuration, the primary fields of Port are as follows:

- type: the CSP providing Kubernetes service, support `aliyun` and `aws`
- port: port number to expose service
- protocol: protocol to expose service, support `TCP` and  `UDP`
- public: whether to public the service

To public the service, you should assign the `type` (aliyun for ACK, aws for EKS), and set `public` as True. Besides, schema `Service` should be used to describe the workload configuration.

That's all what you need to configure! Next, preview and apply the configuration, the application will get deployed and exposed publicly.

:::info
Kusion uses Load Balancer (LB) provided by the CSP to expose service publicly. For more detailed network configuration, please refer to [Application Networking](../../config-walkthrough/networking)
:::

### Preview and Apply

Execute `kusion preview` under the stack path, you will get what will be created in the real infrastructure. The picture below gives the preview result of the example. A Namespace, Service and Deployment will be created, which meets the expectation. The service name has a suffix `public`, which shows it can be accessed publicly.

![preview-public](/img/docs/user_docs/cloud-resources/expose-service/preview-public.png)

Then, execute `kusion apply --yes` to do the real deploying job. Just a command and a few minutes, you have accomplished deploying application and expose it publicly.

![apply-public](/img/docs/user_docs/cloud-resources/expose-service/apply-public.png)

### Verify Accessibility

In the example, the kubernetes Namespace whose name is nginx, and a Service and Deployment under the Namespace should be created. Use `kubectl get` to check, the Service whose type is `LoadBalancer` and Deployment are created indeed. And the Service has `EXTERNAL-IP` 106.5.190.109, which means it can be accessed from outside the cluster.

![k8s-resource-public](/img/docs/user_docs/cloud-resources/expose-service/k8s-resource-public.png)

Visit the `EXTERNAL-IP` via browser, the correct result is returned, which illustrates the servie get publicly exposed successfully.

![result-public](/img/docs/user_docs/cloud-resources/expose-service/result-public.png)

## Expose Service Inside Cluster

If you only need the application can be accessed inside the cluster, just configure `Public` as False in schema `Port`.

```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.network as n

nginx: ac.AppConfiguration {
    workload: wl.Service {
        ...
        ports: [
            n.Port {
                ...
                public: False
            }
        ]
    }
}
```

Execute `kusion apply --yes`, the generated Service has suffix `private`.

![apply-private](/img/docs/user_docs/cloud-resources/expose-service/apply-private.png)

And the Service type is `ClusterIP`, only has `CLUSTER_IP` and no `EXTERNAL_IP`, which means it cannot get accessed from outside the cluster. 

![k8s-resource-private](/img/docs/user_docs/cloud-resources/expose-service/k8s-resource-private.png)

## Summary
This tutorial demonstrates how to expose service of the application deployed on the CSP Kubernetes. By configuring schema Port, Kusion enables you expose service simply and efficiently.
