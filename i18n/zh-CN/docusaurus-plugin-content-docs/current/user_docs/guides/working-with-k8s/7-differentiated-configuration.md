# 差异化配置

应用的 KCL 配置代码中可以通过添加 if-else 语句搭配魔术变量设置需要的差异化配置，比如根据实际部署的集群名称设置不同的 labels。

## 1. 准备工作

可参考：[部署应用服务/准备工作](./1-deploy-server.md#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)

## 2. 差异化配置样例

`base/bask.k` 中 Pod Label 的配置：

```py
appConfiguration: frontend.Server {
    podMetadata.labels = {
        if __META_CLUSTER_NAME in ["minikube", "kind"]:
            cluster = __META_CLUSTER_NAME
        else:
            cluster = "other"
    }
}
```

通过以上 KCL 代码，我们根据配置大库（Konfig）中的魔术变量判断实际部署时的集群名称来选择性的为应用容器中注入标签，来做到被第三方服务识别或者其他目的。
