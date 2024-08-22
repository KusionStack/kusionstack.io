---
title: 多集群管理
---
多集群管理是将集群注册进 Karpor 的入口，使能在大量集群间进行搜索和洞察。

## 注册集群

1. 点击 <kbd>集群管理</kbd> 标签页。
2. 点击 <kbd>注册集群</kbd> 按钮。
   ![](/karpor/assets/cluster-mng/cluster-mng-empty.png)
3. 添加集群名字。集群名称必须唯一且一旦创建不能更改。
4. 上传该集群的 kubeconfig 文件（一个具有读权限的文件就足够了）。
5. 点击 <kbd>验证并提交</kbd> 按钮。
   ![](/karpor/assets/cluster-mng/cluster-mng-register-new-cluster.png)
6. 一旦验证通过，集群将会被添加到 <kbd>集群管理</kbd> 页面。
   ![](/karpor/assets/cluster-mng/cluster-mng-register-success.png)

### 注册 eks 集群

如果你想注册 eks 集群，那么需要对 kubeconfig 进行一些额外的操作：

1. 导出 eks 集群的 kubeconfig。例如，通过如下 aws 命令可以获得指定集群的 kubeconfig:

```shell
aws eks --region <YOUR REGION> update-kubeconfig  --name <YOUR CLUSTER NAME> --kubeconfig=<OUTPUT FILENAME>
```

2. 在导出的 kubeconfig 文件中的 `users/exec` 中添加 `env`、`interactiveMode` 和 `provideClusterInfo` 字段。可以参考以下的 kubeconfig 结构：

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: CA
    server: SERVER
  name: CLUSTER
contexts:
- context:
    cluster: CLUSTER
    user: USER
  name: CONTEXT
current-context: CONTEXT
kind: Config
preferences: {}
users:
- name: USER
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      args:
      - --region
      - ap-southeast-1
      - eks
      - get-token
      - --cluster-name
      - mycluster3
      - --output
      - json
      command: aws
      ### 以下字段需要补充到 kubeconfig 中
      env:
      - name: AWS_ACCESS_KEY_ID
        value: <YOUR AWS_ACCESS_KEY_ID>
      - name: AWS_SECRET_ACCESS_KEY
        value: <YOUR AWS_SECRET_ACCESS_KEY>
      - name: AWS_DEFAULT_REGION
        value: <AWS_DEFAULT_REGION>
      - name: AWS_DEFAULT_OUTPUT
        value: json
      interactiveMode: IfAvailable
      provideClusterInfo: false
```

3. 在 [注册集群](#%E6%B3%A8%E5%86%8C%E9%9B%86%E7%BE%A4) 中使用修改后的 kubeconfig。

## 编辑集群

<kbd>编辑</kbd> 按钮允许修改 <kbd>显示名称</kbd> 和 <kbd>描述</kbd>，从而改变仪表盘中集群名称和描述的显示方式。

![](/karpor/assets/cluster-mng/cluster-mng-edit-cluster.png)

## 轮换证书

当 kubeconfig 过期时，你可以通过点击 <kbd>轮换证书</kbd> 来更新证书。
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-1.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-2.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-3.png)

## 移除集群

通过 <kbd>删除</kbd> 按钮方便地移除已注册的集群。
![](/karpor/assets/cluster-mng/cluster-mng-delete-cluster.png)
