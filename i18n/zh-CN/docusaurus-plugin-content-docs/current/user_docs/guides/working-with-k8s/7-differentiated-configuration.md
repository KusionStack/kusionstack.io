# 差异化配置

您可以通过 Project 和 Stack 的结构，管理不同环境中的差异化配置。您可以使用 Stack 目录下的`main.k`管理不同stack中的差异配置，同时使用 Project 目录下的`base/base.k`管理通用的配置。

:::tip

关于 Project 和 Stack 的更多信息可以查看[Project&Stack文档](/user_docs/concepts/glossary.md).
:::

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-application.md#1-准备工作)

下文中案例需要您已经正确使用`kusion init`[初始化项目](1-deploy-application.md#2-初始化)。初始化会自动生成一个`kcl.mod`文件位于当前的配置栈(Stack)下。

## 2. 差异化配置样例

`helloworld/base/base.k`中的通用配置:
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
                env: {
                    "env1": "VALUE"
                    "env2": "VALUE2"
                }
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
                # 配置一个HTTP就绪探针
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

`helloworld/dev/main.k`中的`dev` Stack的配置:
```py
import catalog.models.schema.v1 as ac

# dev/main.k 声明了 Dev Stack 级别的差异配置
helloworld: ac.AppConfiguration {
    workload.containers.helloworld: {
        # Dev Stack 的容器镜像,资源规格和副本数不同于基础配置
        image = "gcr.io/google-samples/gb-frontend:v5"
        resources = {
            "cpu": "250m"
            "memory": "256Mi"
        }
        replicas = 3
    }
}
```

以上的`dev/main.k`会和`base/base.k`合并，生成最终的配置。如果一个字段的值同时出现在了这两份配置中, `dev/main.k`中的 Stack 配置会覆盖`base/base.k`中的应用基础配置。