# Enable Monitoring

This guide shows you how to use the KCL language and its corresponding CLI tool Kusion to complete the monitoring and deployment of a Kubernetes application Prometheus.
The demo sample is mainly composed of the following components:

- Namespace
- Deployment
- PodMonitor

:::tip

This guide requires you to have a basic understanding of Kubernetes and Prometheus.
If you are not familiar with the relevant concepts, please refer to the links below:

- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Prometheus Introduction](https://prometheus.io/docs/introduction/overview/)
:::

## Prerequisites

Before starting, in addition to referring [here](/docs/user_docs/guides/working-with-k8s/deploy-server#prerequisites),
the following preparations need to be completed:

- Deploy Prometheus Operator in your cluster

Follow the steps in [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) to deploy the Prometheus Operator in your cluster

## Example

Enable monitoring by setting `enableMonitoring` to `True`, and add the business container port number configuration `8080`

```py
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.container
import base.pkg.kusion_models.kube.frontend.container.env as e
import base.pkg.kusion_models.kube.frontend.container.port as cp
import base.pkg.kusion_models.kube.frontend.container.probe as p

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
appConfiguration: frontend.Server {
    # Main container configuration
    mainContainer: container.Main {
        name = "prometheus-example-app"
        ports = [
            cp.ContainerPort {
                name = "web"
                containerPort = 8080
            }
        ]
    }
    enableMonitoring = True
}
```

## Applying

Run the following command:

```bash
kusion apply
```

The output is similar to:

```
 SUCCESS  Compiling in stack prod...                                                                                                  

Stack: prod    Provider                                 Type                           Name    Plan
       * ├─  kubernetes                         v1:Namespace      prometheus-example-app[0]  Create
       * ├─  kubernetes  monitoring.coreos.com/v1:PodMonitor  prometheus-example-appprod[0]  Create
       * └─  kubernetes                   apps/v1:Deployment  prometheus-example-appprod[0]  Create
```

## Validate Result

We can see that in addition to deploying k8s `Deployment` and `Namespace` resources,
`PodMonitor` is also deployed to configure Prometheus to monitor target pods.
After the resources are created, you can use the following commands to check the Prometheus monitoring panel.

```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
```

Finally, access the monitoring panel via [http://localhost:9090](http://localhost:9090) and see the monitoring metrics of the application.
