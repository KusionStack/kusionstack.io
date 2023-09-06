# 应用扩缩容

您可以通过`Container`模型中的`resources`字段修改应用业务容器的规格。

有关业务容器的完整定义，可以查看[有关容器的模型文档](/docs/reference/model/catalog_models/workload/doc_service.md#schema-container)。

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-application.md#1-准备工作)

下文中案例需要您已经正确使用`kusion init`[初始化项目](1-deploy-application.md#2-初始化)。初始化会自动生成一个`kcl.mod`文件位于当前的配置栈(Stack)下。

## 2. 扩缩容配置样例

编辑 `dev/main.k` 中的 resources 的值:
```py
import catalog.models.schema.v1 as ac

helloworld: ac.AppConfiguration {
    workload.containers.helloworld: {
        # 之前:
        # resources: {
        #     "cpu": "500m"
        #     "memory": "512M"
        # }
        # 之后: 
        resources: {
            "cpu": "250m"
            "memory": "256Mi"
        }
    }
}
```

`main.k`中其他值不变。

## 3. 配置生效

再次执行【[配置生效](./1-deploy-application.md#4-配置生效)】的步骤即可进行资源扩容：

```
$ kusion apply
✔︎  Generating Spec in the Stack dev...                                                                                                                                                                                                                                         
Stack: dev  ID                                                       Action
* ├─     v1:Namespace:helloworld                                  UnChanged
* ├─     v1:Service:helloworld:helloworld-dev-helloworld-private  UnChanged
* └─     apps/v1:Deployment:helloworld:helloworld-dev-helloworld  Update


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  UnChanged v1:Namespace:helloworld, skip                                                                                                                                                                                                                               
 SUCCESS  UnChanged v1:Service:helloworld:helloworld-dev-helloworld-private, skip                                                                                                                                                                                               
 SUCCESS  Update apps/v1:Deployment:helloworld:helloworld-dev-helloworld success                                                                                                                                                                                                
Update apps/v1:Deployment:helloworld:helloworld-dev-helloworld success [3/3] █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 0 created, 1 updated, 0 deleted.
```

## 4. 配置验证
我们可以通过`kubectl`验证新的容器规格已被更新：
```
kubectl get deployment -n helloworld -o yaml
...
    template:
      ...
      spec:
        containers:
        - env:
          ...
          image: gcr.io/google-samples/gb-frontend:v4
          ...
          resources:
            limits:
              cpu: 250m
              memory: 256Mi
...
```