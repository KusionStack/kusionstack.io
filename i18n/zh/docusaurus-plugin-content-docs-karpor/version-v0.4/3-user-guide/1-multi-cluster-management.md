---
title: 多集群管理
---
多集群管理是将集群注册进 Karpor 的入口，使能在大量集群间进行搜索和洞察。

## 注册集群

1. 点击 <kbd>集群管理</kbd> 标签页。
2. 点击 <kbd>注册集群</kbd> 按钮。
   ![](/karpor/assets/cluster-mng/cluster-mng-empty.png)
3. 添加集群名字。集群名称必须唯一且一旦创建不能更改。
4. 上传该集群的 KubeConfig 文件（一个具有读权限的文件就足够了）。
5. 点击 <kbd>验证并提交</kbd> 按钮。
   ![](/karpor/assets/cluster-mng/cluster-mng-register-new-cluster.png)
6. 一旦验证通过，集群将会被添加到 <kbd>集群管理</kbd> 页面。
   ![](/karpor/assets/cluster-mng/cluster-mng-register-success.png)

## 编辑集群

<kbd>编辑</kbd> 按钮允许修改 <kbd>显示名称</kbd> 和 <kbd>描述</kbd>，从而改变仪表盘中集群名称和描述的显示方式。

![](/karpor/assets/cluster-mng/cluster-mng-edit-cluster.png)

## 轮换证书

当 KubeConfig 过期时，你可以通过点击 <kbd>轮换证书</kbd> 来更新证书。
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-1.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-2.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-3.png)

## 移除集群

通过 <kbd>删除</kbd> 按钮方便地移除已注册的集群。
![](/karpor/assets/cluster-mng/cluster-mng-delete-cluster.png)
