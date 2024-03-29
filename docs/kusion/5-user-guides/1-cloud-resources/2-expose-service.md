---
id: expose-service
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Expose Application Service Deployed on CSP Kubernetes

Deploying applications on the Kubernetes provided by CSP (Cloud Service Provider) is convenient and reliable, which is adopted by many enterprises. Kusion has a good integration with CSP Kubernetes service. You can deploy your application to the Kubernetes cluster, and expose the service in a quite easy way. 

This tutorial demonstrates how to expose service of the application deployed on CSP Kubernetes. And the responsibilities of platform engineers and application developers are also clearly defined. 

## Prerequisites

Create a Kubernetes cluster provided by CSP, and complete the corresponding configurations for `KUBECONFIG`. The following CSP Kubernetes services are supported: 

- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks)
- [Alibaba Cloud Container Service for Kubernetes (ACK)](https://www.alibabacloud.com/product/kubernetes)

## Expose Service Publicly

If you want the application to be accessed from outside the cluster, you should expose the service publicly. Follow the steps below, you will simply hit the goal.

### Set up Workspace

Create the workspace as the target where the application will be deployed to. The workspace is usually set up by **Platform Engineers**, which contains platform-standard and application-agnostic configurations. The workspace configurations are organized through a YAML file.

<Tabs>
<TabItem value="AWS" >

```yaml
modules:
  kusionstack/network@0.1.0: 
    default: 
      port: 
        type: aws
```

```mdx-code-block
</TabItem>
<TabItem value="Alicloud">
```

```yaml
modules:
  kusionstack/network@0.1.0: 
    default: 
      port: 
        type: alicloud
        annotations:
            service.beta.kubernetes.io/alibaba-cloud-loadbalancer-spec: slb.s1.small
```

```mdx-code-block
</TabItem>
</Tabs>
```

The YAML shown above gives an example of the workspace configuration to expose service on **EKS** and **ACK**. The block `port` contains the workspace configuration of Kusion module `network`, which has the following fields:

- type: the CSP providing Kubernetes service, support `alicloud` and `aws`
- annotations: annotations attached to the service, should be a map
- labels: labels attached to the service, should be a map

Then, create the workspace with the configuration file. The following command creates a workspace named `dev` with configuration file `workspace.yaml`.

```bash
kusion workspace create dev -f workspace.yaml
```

After that, we can switch to the `dev` workspace with the following cmd: 

```shell
kusion workspace switch dev
```

If you already create and use the configuration of `dev` workspace, you can append the MySQL module configs to your workspace YAML file and use the following command line to update the workspace configuration. 

```shell
kusion workspace update dev -f workspace.yaml
```

We can use the following command lines to show the current workspace configurations for `dev` workspace. 

```shell
kusion workspace show
```


### Init Project

After creating workspace, you should write application configuration code, which only contains simple and application-centric configurations. This step is usually accomplished by application developers.

We can start by initializing this tutorial project with `kusion init` cmd: 

```shell
# Create a new directory and nevigate into it. 
mkdir nginx && cd nginx

# Initialize the demo project with the name of the current directory. 
kusion init
```

The created project structure looks like below: 

```shell
tree
.
├── dev
│   ├── kcl.mod
│   ├── main.k
│   └── stack.yaml
└── project.yaml

2 directories, 4 files
```

:::info
More details about the directory structure can be found in [Project](../../3-concepts/1-project/1-overview.md) and [Stack](../../3-concepts/2-stack/1-overview.md). 
:::

### Update And Review Configuration Codes

The initiated configuration codes are for the demo quickstart application, we should replace the `dev/kcl.mod` and `dev/main.k` with the below codes: 

`dev/kcl.mod`
```shell
[package]
name = "nginx"
version = "0.1.0"

[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.1.0" }
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.1.0" }

[profile]
entries = ["main.k"]
```

`dev/main.k`
```python
import kam.v1.app_configuration as ac
import kam.v1.workload as wl
import kam.v1.workload.container as c
import network as n

# main.k declares customized configurations for dev stacks.
nginx: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            nginx: c.Container {
                image: "nginx:1.25.2"
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
            }
        }
        replicas: 1
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                    protocol: "TCP"
                    public: True
                }
            ]
        }
    }
}
```

The code shown above describes how to expose service publicly. Kusion use schema `Port` to describe the network configuration, the primary fields of Port are as follows:

- port: port number to expose service
- protocol: protocol to expose service, support `TCP` and  `UDP`
- public: whether to public the service

To public the service, you should set `public` as True. Besides, schema `Service` should be used to describe the workload configuration.

That's all what an application developer needs to configure! Next, preview and apply the configuration, the application will get deployed and exposed publicly.

:::info
Kusion uses Load Balancer (LB) provided by the CSP to expose service publicly. For more detailed network configuration, please refer to [Application Networking](https://www.kusionstack.io/docs/kusion/configuration-walkthrough/networking)
:::

:::info
During the first preview and apply, the models and modules as well as the Terraform CLI (if not exists) that the application depends on will be downloaded, so it may take some time (usually within two minutes). You can take a break and have a cup of coffee. 
:::

### Preview and Apply

Execute `kusion preview` under the stack path, you will get what will be created in the real infrastructure. The picture below gives the preview result of the example. A Namespace, Service and Deployment will be created, which meets the expectation. The service name has a suffix `public`, which shows it can be accessed publicly.

![preview-public](/img/docs/user_docs/cloud-resources/expose-service/preview-public.png)

Then, execute `kusion apply --yes` to do the real deploying job. Just a command and a few minutes, you have accomplished deploying application and expose it publicly.

![apply-public](/img/docs/user_docs/cloud-resources/expose-service/apply-public.png)

### Verify Accessibility

In the example above, the kubernetes Namespace whose name is nginx, and a `Service` and `Deployment` under the Namespace should be created. Use `kubectl get` to check, the Service whose type is `LoadBalancer` and Deployment are created indeed. And the Service has `EXTERNAL-IP` 106.5.190.109, which means it can be accessed from outside the cluster.

![k8s-resource-public](/img/docs/user_docs/cloud-resources/expose-service/k8s-resource-public.png)

Visit the `EXTERNAL-IP` via browser, the correct result is returned, which illustrates the servie getting publicly exposed successfully.

![result-public](/img/docs/user_docs/cloud-resources/expose-service/result-public.png)

## Expose Service Inside Cluster

If you only need the application to be accessed inside the cluster, just configure `Public` as `False` in schema `Port`. There is no need to change the workspace, which means an application developer can easily change a service exposure range, without the involvement of platform engineers.

```python
import kam.v1.app_configuration as ac
import kam.v1.workload as wl
import kam.v1.workload.container as c
import network as n

# main.k declares customized configurations for dev stacks.
nginx: ac.AppConfiguration {
    workload: wl.Service {
        ...
    }
    accessories: {
        "network": n.Network {
            ports: [
                n.Port {
                    port: 80
                    protocol: "TCP"
                    public: False
                }
            ]
        }
    }
}
```

Execute `kusion apply --yes`, the generated Service has suffix `private`.

![apply-private](/img/docs/user_docs/cloud-resources/expose-service/apply-private.png)

And the Service type is `ClusterIP`, only has `CLUSTER_IP` and no `EXTERNAL_IP`, which means it cannot get accessed from outside the cluster. 

![k8s-resource-private](/img/docs/user_docs/cloud-resources/expose-service/k8s-resource-private.png)

## Summary
This tutorial demonstrates how to expose service of the application deployed on the CSP Kubernetes. By platform engineers' setup of workspace, and application developers' configuration of schema `Port` of Kusion module `network`, Kusion enables you expose service simply and efficiently.
