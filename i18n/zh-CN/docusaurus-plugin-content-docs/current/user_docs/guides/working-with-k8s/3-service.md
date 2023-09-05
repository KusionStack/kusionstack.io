# 配置网络

您可以通过`AppConfiguration`模型中的`ports`字段来管理如何暴露服务的配置。`ports`字段定义了一个列表，其中包括了每一个您想暴露在外的端口（以及它们对应的容器端口），以被其他应用消费。

除非显式地指定，否则每一个暴露的端口只会通过一个`ClusterIP`类型的Service在内网暴露。您可以通过`Port`模型中的`exposeInternet`字段指定一个公网暴露的端口。当前，公网暴露通过`LoadBalancer`类型的Service，由云服务商提供的负载均衡实现。

有关端口暴露的完整定义，可以查看[有关网络的模型文档](/docs/reference/model/catalog_models/workload/doc_service.md#schema-port)。

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-application.md#1-准备工作)

下文中案例需要您已经正确使用`kusion init`[初始化项目](1-deploy-application.md#2-初始化)。初始化会自动生成一个`kcl.mod`文件位于当前的配置栈(Stack)下。

## 2. 网络配置样例

`helloworld/dev/main.k`:
```py
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.container.probe as p
import catalog.models.schema.v1.workload.network as n

helloworld: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "helloworld": c.Container {
                image: "gcr.io/google-samples/gb-frontend:v4"
                env: {
                    "env1": "VALUE"
                    "env2": "VALUE2"
                }
                resources: {
                    "cpu": "500m"
                    "memory": "512M"
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

上述代码是样例配置，将暴露的端口从上一篇指南的80改成8080，但是依旧映射到容器的80端口上，因为应用在容器内监听的是80端口。

## 3. 配置生效

再次执行【[配置生效](./1-deploy-application.md#4-配置生效)】的步骤即可部署新的 Service 配置：

```
$ kusion apply
 ✔︎  Generating Spec in the Stack dev...                         
Stack: dev  ID                                                       Action
* ├─     v1:Namespace:helloworld                                  UnChanged
* ├─     v1:Service:helloworld:helloworld-dev-helloworld-private  Update
* └─     apps/v1:Deployment:helloworld:helloworld-dev-helloworld  UnChanged


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  UnChanged v1:Namespace:helloworld, skip                                                                                                                                                                                                                               
 SUCCESS  Update v1:Service:helloworld:helloworld-dev-helloworld-private success                                                                                                                                                                                                
 SUCCESS  UnChanged apps/v1:Deployment:helloworld:helloworld-dev-helloworld, skip                                                                                                                                                                                               
UnChanged apps/v1:Deployment:helloworld:helloworld-dev-helloworld, skip [3/3] ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 0 created, 1 updated, 0 deleted.
```

## 4. 配置验证

我们可以通过`kubectl`验证新的服务配置已被下发：
```
kubectl get svc -n helloworld -o yaml
...
  spec:
    ...
    ports:
    - name: helloworld-dev-helloworld-private-8080-tcp
      port: 8080
      protocol: TCP
      targetPort: 80
...
```

转发服务端口8080到本机:
```
kubectl port-forward svc/helloworld-dev-helloworld-private -n helloworld 30000:8080
```

本地打开浏览器访问[http://127.0.0.1:30000](http://127.0.0.1:30000), 应用应当正在运行：

![app-preview](../../../../../../../static/img/docs/user_docs/guides/working-with-k8s/app-preview.png)