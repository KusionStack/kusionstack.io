# Resource

Server 模型中的 schedulingStrategy.resource 属性用于声明应用的业务容器的资源规格，有关资源规格的定义，可以查看 KCL Model 中 [base.pkg.kusion_models.kube.frontend.resource](/docs/reference/model/kusion_models/kube/frontend/resource/doc_resource) 模块的文档。

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-server.md#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)

## 2. 扩缩容配置样例

通过编辑 schedulingStrategy.resource 的值来设置业务容器的资源规格。

有两个方法修改资源规格，一种是修改 resource 表达式中 cpu、memory 的值：

```py
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.resource as res

appConfiguration: frontend.Server {
    # 修改 resource 表达式中 cpu、memory 的值
    # 原值：schedulingStrategy.resource = "cpu=100m,memory=100Mi,disk=1Gi"
    # 新的值（应用扩容）：
    schedulingStrategy.resource = res.Resource {
        cpu = 500m
        memory = 500Mi
        disk = 1Gi
    }
}
```

另一种是使用预置的 resource 值替代原值来进行应用扩容：

```py
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.templates.resource as res_tpl

appConfiguration: frontend.Server {
    # 使用预置的 resource 值替代原值来进行应用扩容：
    # 原值：schedulingStrategy.resource = "cpu=100m,memory=100Mi,disk=1Gi"
    # 新的值（应用扩容）：
    schedulingStrategy.resource = res_tpl.large
}
```

上述代码是样例配置，可以根据 SchedulingStrategy 模型定义和实际情况添加自定义配置：

```py
import base.pkg.kusion_models.kube.frontend.resource as res

schema SchedulingStrategy:
    """ SchedulingStrategy represents scheduling strategy.

    Attributes
    ----------
    resource: str | res.Resource, default is "1<cpu<2,1Gi<memory<2Gi,disk=20Gi", required.
        A Pod-level attribute.
        Main container resource.
    """
    resource: str | res.Resource = "1<cpu<2,1Gi<memory<2Gi,disk=20Gi"
```

## 3. 配置生效

再次执行【[配置生效](./1-deploy-server.md#4-%E9%85%8D%E7%BD%AE%E7%94%9F%E6%95%88)】的步骤即可进行资源扩容：

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
