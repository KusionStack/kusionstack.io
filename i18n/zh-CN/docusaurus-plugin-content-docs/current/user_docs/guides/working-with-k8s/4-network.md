# 配置网络

Server 模型中的 services 属性用于声明应用的网络配置，有关网络的抽象定义，可以查看 KCL Model 中 [base.pkg.kusion_models.kube.frontend.service](/docs/reference/model/documentation//kusion_models/kube/frontend/service/service.md#service-1) 模块的文档。

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-server.md#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)

## 2. 网络配置样例

在样例代码的 dev/main.k 或者 base/base.k 中添加 Service 配置：

```py
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.service

appConfiguration: frontend.Server {
    # 添加 Service 配置
    services = [
        service.Service {
            name = "app"
            type = "NodePort"
            ports = [
                {
                    "port" = 80
                }
            ]
        }
    ]
}
```

上述代码是样例配置，可以根据 [Service](/docs/reference/model/documentation//kusion_models/kube/frontend/service/service.md#service-1) 模型定义和实际情况添加自定义配置。

## 3. 配置生效

再次执行【[配置生效](./1-deploy-server.md#4-%E9%85%8D%E7%BD%AE%E7%94%9F%E6%95%88)】的步骤即可部署新的 Service 配置：

```
$ kusion apply
SUCCESS  Compiling in stack dev...

Stack: dev    Provider                Type              Name    Plan
      * ├─  kubernetes        v1:Namespace              demo  UnChange
      * ├─  kubernetes          v1:Service      demo-service  Update
      * └─  kubernetes  apps/v1:Deployment           demodev  UnChange

✔ yes
SUCCESS  Updating v1:Service
Updating v1:Service [1/1] ████████████████████████████████ 100% | 0s
```
