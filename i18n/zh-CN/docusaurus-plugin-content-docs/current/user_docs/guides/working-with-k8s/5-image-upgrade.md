# 镜像升级

Server 模型中的 image 属性用于声明应用的业务容器镜像，有关镜像的定义，可以查看 KCL Model 中 [base.pkg.kusion_models.kube.frontend.server](/docs/reference/model/kusion_models/kube/frontend/doc_server) 模块的文档。

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-server.md#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)

## 2. 镜像升级

编辑 dev/main.k 中的 image 的值:

```py
import base.pkg.kusion_models.kube.frontend

appConfiguration: frontend.Server {
    # 修改 image 的值为要升级的版本
    # 修改前：image = "gcr.io/google-samples/gb-frontend:v4"
    # 修改后：
    image = "gcr.io/google-samples/gb-frontend:v5"
}
```

## 3. 配置生效

再次执行【[配置生效](./1-deploy-server.md#4-%E9%85%8D%E7%BD%AE%E7%94%9F%E6%95%88)】的步骤即可升级应用的镜像：

```
$ kusion apply
SUCCESS  Compiling in stack dev...

Stack: dev    Provider                Type              Name    Plan
      * ├─  kubernetes        v1:Namespace              demo  UnChange
      * ├─  kubernetes          v1:Service      demo-service  UnChange
      * └─  kubernetes  apps/v1:Deployment           demodev  Update

✔ yes
SUCCESS  Updating apps/v1:Deployment
Updating apps/v1:Deployment [1/1] ████████████████████████████████ 100% | 0s
```
