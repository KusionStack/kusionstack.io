# Container

Server 模型中的 mainContainer 属性用于声明应用的业务容器配置，有关业务容器的抽象定义，可以查看 KCL Model 中 [base.pkg.kusion_models.kube.frontend.container](/docs/reference/model/kusion_models/kube/frontend/container/doc_container) 模块的文档。

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-server.md#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)

## 2. 业务容器配置样例

```py
appConfiguration: frontend.Server {
    # 业务容器配置
    mainContainer = container.Main {
        # 业务容器名称
        name = "main"
        # 环境变量
        env = [
            {
                name = "HOST_NAME"
                value = "example.com"
            }
        ]
        # 端口号配置
        ports = [
            { containerPort = 80 }
        ]
    }
}
```
