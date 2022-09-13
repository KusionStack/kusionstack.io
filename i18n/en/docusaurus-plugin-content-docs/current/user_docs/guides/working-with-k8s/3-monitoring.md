# Monitoring

本篇指南向你展示，如何使用 KCL 语言与其相对应的 CLI 工具 Kusion，完成一个 Kubernetes 应用 Prometheus 监控部署。本次演示的样例主要由以下组件构成：

- 命名空间（Namespace）
- 无状态应用（Deployment）
- Pod 监控（PodMonitor）

> 本指南要求你对 Kubernetes 和 Prometheus 有基本的了解。不清楚相关概念的，可以前往 Kubernetes 和 Prometheus 官方网站，查看相关说明：

- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Prometheus Introduction](https://prometheus.io/docs/introduction/overview/)

## 1. 准备开始

在开始之前，除了参考 [部署应用服务/准备工作](./1-deploy-server.md#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C) 的准备工作，还需要完成如下准备：

- 在 Kubernetes 集中部署 Prometheus Operator

根据 [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) 中的提示步骤在您的集群当中部署 Prometheus Operator

## 2. 监控配置样例

通过将 `enableMonitoring` 设置为 `True` 使能配置，并添加业务容器端口号配置 `8080`

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

## 3. 配置生效

执行命令：

```bash
kusion apply
```

输出类似于：

```
 SUCCESS  Compiling in stack prod...                                                                                                  

Stack: prod    Provider                                 Type                           Name    Plan
       * ├─  kubernetes                         v1:Namespace      prometheus-example-app[0]  Create
       * ├─  kubernetes  monitoring.coreos.com/v1:PodMonitor  prometheus-example-appprod[0]  Create
       * └─  kubernetes                   apps/v1:Deployment  prometheus-example-appprod[0]  Create
```

## 4. 查看监控面板

可以看到，除了部署 kubernetes `Deployment` 和 `Namespace` 资源外，还额外部署了 `PodMonitor` 资源用于配置 Prometheus 监听应用 Pod，当资源都创建完成时，可以通过如下命令查看 Prometheus 监控面板。

```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
```

最后通过 http://localhost:9090 访问监控面板并查看应用程序的监控指标。
