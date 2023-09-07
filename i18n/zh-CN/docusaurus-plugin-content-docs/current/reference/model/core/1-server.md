# Server

云原生应用运维模型（Server）严格来说属于 KusionStack 模型分层中的前端模型（Front-end Model），它被用来声明应用启动的参数配置，其中省略了启动一个云原生应用过程中一些重复的、可推导的配置，抽象出必要属性暴露给用户，具有用户友好的特性。
用户只需要像实例化一个类（Class）一样，传入必要参数构成一份应用的「配置」，经过 KCL 编译即可得到完整的部署 YAML，其中包含的 Kubernetes 资源包含 Deployment、Service 等；

## 1. 模型全景
### 1.1 模型定义

:::note
**注意**：模型开放的属性遵守最小化原则
:::

请查阅 [Server](/docs/reference/model/kusion_models/kube/frontend/doc_server) 模型定义。
### 1.2 最小示例

```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.container
import base.pkg.kusion_models.kube.templates.resource as res_tpl

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
appConfiguration: frontend.Server {
    image = "gcr.io/google-samples/gb-frontend:v4"
    schedulingStrategy = {
        # 调度策略，即资源要求
        resource = res_tpl.tiny
    }
    mainContainer = container.Main {
        # 主容器名称
        name = "php-redis"
        # 主容器环境变量
        env = [{name = "GET_HOSTS_FROM", value = "dns"}]
        # 主容器端口
        ports = [{containerPort = 80}]
    }
}
```
上面的代码示例，定义了一个名为 `appConfiguration` 的对象，它是模型 `Server` 的实例。
指定了 `image`、`schedulingStrategy` 和 `mainContainer` 三个字段，
并且后 2 个字段是其他 `schema` 的实例。
这段代码就定义了一个 Kubernetes 的 Deployment 对象的最小属性集，即镜像、调度策略和主容器信息。

### 1.3 完整示例

```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.container
import base.pkg.kusion_models.kube.templates.resource as res_tpl
import base.pkg.kusion_models.kube.frontend.service

# Application Configuration
appConfiguration: frontend.Server {
    # Main Container Configuration
    mainContainer: container.Main {
        # 主容器名称
        name = "php-redis"
        # 主容器环境变量
        env = [
            {
                name = "GET_HOSTS_FROM"
                value = "dns"
            }
        ]
        # 主容器端口
        ports = [
            {
                containerPort = 80
            }
        ]
    }
    # Server 标签选择器
    selector = {
        tier = "frontend"
    }
    # Pod 模版
    podMetadata = {
        # Pod 标签
        labels = {
            tier = "frontend"
        }
    }
    # 调度策略
    schedulingStrategy = {
        resource = res_tpl.medium
    }
    # 微服务
    services = [
        service.Service {
            # 微服务名称
            name = "frontend-service"
            # 微服务类型
            type = "NodePort"
            # 微服务端口映射
            ports = [
                {
                    port = 80
                }
            ]
        }
    ]
    image = "gcr.io/google-samples/gb-frontend:v4"
}
```
上面的代码在最小示例的基础上，添加了更多属性的声明。
指定了 Deployment 及其衍生出的 Pod 之间的标签选择关系（selector/label），
还指定了访问 Pod 的微服务，类型是 `NodePort`，映射到容器的端口是 `80`。

## 2. 对容器的定义

### 2.1 模型定义

请查阅 [Container](/docs/reference/model/kusion_models/kube/frontend/container/doc_container) 模型定义。
### 2.2 示例

```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.container
import base.pkg.kusion_models.kube.frontend.container.env as e
import base.pkg.kusion_models.kube.frontend.container.port as cp
import base.pkg.kusion_models.kube.frontend.container.probe as p

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
appConfiguration: frontend.Server {
    # Main container configuration
    mainContainer = container.Main {
        # 主容器名称，可选
        name = "main"
        # 主容器启动命令，可选
        command = ["/home/admin/server.sh"]
        # 主容器启动参数，可选
        args = ["start"]
        # 主容器环境变量，可选
        env = [
            e.Env {
                name = "app.version"
                value = "v1.0.0"
            }
        ]
        envFrom = [
            e.EnvFromSource {
                configMapRef = "my-configmap"
            }
        ]
        # 主容器端口，可选
        ports = [
            cp.ContainerPort {
                containerPort = 12201
                protocol = "TCP"
            }
        ]
        # 主容器存活探针，可选
        livenessProbe = p.Probe {
            # 探活连续失败阈值
            failureThreshold = 3
            # 首次探活延迟
            initialDelaySeconds = 30
            # 探活间隔
            periodSeconds = 5
            # 探活连续成功阈值
            successThreshold = 1
            # 探活超时时间
            timeoutSeconds = 10
            # 探活操作
            handler = p.Exec {
                command = ["/bin/sh", "-c", "echo livenessProbe"]
            }
        }
        # 主容器就绪探针，可选
        readinessProbe = p.Probe {
            failureThreshold = 3
            initialDelaySeconds = 30
            periodSeconds = 5
            successThreshold = 2
            timeoutSeconds = 10
            handler = p.Exec {
                command = ["/bin/sh", "-c", "echo readinessProbe"]
            }
        }
        # 主容器启动探针, 启动探针探测成功之后存活探测才开始工作，可选
        startupProbe = p.Probe {
            failureThreshold = 3
            initialDelaySeconds = 30
            periodSeconds = 5
            successThreshold = 2
            timeoutSeconds = 10
            handler = p.Exec {
                command = ["/bin/sh", "-c", "echo startupProbe"]
            }
        }
    }
}
```
上面的代码是把主容器的常用属性全都列了出来，可以指定主容器的名称、启动命令、静态环境变量、动态环境变量和探针。
我们一般不会直接使用主容器，就像 Kubernetes 中除了静态 Pod，一般不会直接创建 Pod 一样。

## 3. 资源规格

### 3.1 模型定义

请查阅 [Resource](/reference/model/kusion_models/kube/frontend/resource/doc_resource.md) 模型定义。
### 3.2 示例

```python
import base.pkg.kusion_models.kube.frontend.resource as res

res = res.Resource {
    # CPU
    cpu = 2
    # 内存
    memory = 2048Mi
    # 磁盘
    disk = 20Gi
}
```
上面的代码定义了 `res` 变量，它是将 Kubernetes 的三种常用资源：CPU、内存和磁盘，抽象成 `Resource` 模型的一个对象。

## 4. 调度策略

### 4.1 模型定义

请查阅 [Scheduling Strategy](/docs/reference/model/kusion_models/kube/frontend/strategy/doc_scheduling_strategy) 模型定义。

### 4.2 示例

```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.resource as res

appConfiguration: frontend.Server {
    # 调度策略，即资源请求
    schedulingStrategy.resource = res.Resource {
        cpu = 100m
        memory = 100Mi
        disk = 1Gi
    }
}
```
上面的代码是将 3.2 小节的资源规格对象赋值给了调度策略，明确了 `Server` 模型下发到集群后的资源调度请求。

## 5. Volume 挂载

对 Kubernetes 原生的 Volume 和 VolumeMount 进行了封装；

### 5.1 模型定义

请查阅 [Volume](/docs/reference/model/kusion_models/kube/frontend/volume/doc_volume) 模型定义。
### 5.2 示例

```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.volume as v

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
appConfiguration: frontend.Server {
    # 卷定义
    volumes = [
        v.Volume {
            # 卷名称
            name = "log-volume"
            # 卷类型
            volumeSource = v.EmptyDir{}
            # 挂载点
            mounts = [
                v.Mount{
                    container = "main"
                    path = "/home/admin/logs"
                }
            ]
        }
    ]
}
```
上面的代码定义了一个 `EmptyDir` 卷，在 `appConfiguration` 中指定了挂载的容器和挂载路径。