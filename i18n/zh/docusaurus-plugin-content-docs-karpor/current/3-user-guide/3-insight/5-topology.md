---
title: 拓扑结构
---
## 拓扑结构

在本节中，我们将探索 Karpor 中的拓扑功能。拓扑视图将帮助你更直观地理解集群中各种资源之间的关系和依赖。以下是如何使用拓扑视图。

1. 按照 [检查任意资源组和资源](#%E6%A3%80%E6%9F%A5%E4%BB%BB%E4%BD%95%E8%B5%84%E6%BA%90%E7%BB%84%E5%92%8C%E8%B5%84%E6%BA%90) 的指引，导航至特定资源组 / 资源的洞察页面。
2. 在页面底部，你可以看到资源拓扑图。
   ![](/karpor/assets/insight/insight-topology.png)
3. 根据当前页面情况：
   1. 资源洞察页面：
      1. 该图将展示与当前资源相关的上游和下游资源。例如，如果当前资源是一个 Deployment（部署），拓扑图将展示 Deployment 下的 ReplicaSet（副本集）以及 ReplicaSet 下的 Pods（容器组）。
         ![](/karpor/assets/insight/insight-topology-example.png)
      2. 点击资源拓扑图中的一个节点，等同于点击特定资源的锚点，这将直接导航至该资源的洞察页面。
   2. 资源组洞察页面：
      1. 该图将直观显示当前资源组下各种资源类型的数量与关系。
      2. 点击资源拓扑图中的一个节点，等同于点击资源类型，下方列表将刷新显示当前资源组中特定类型下的所有资源。
         ![](/karpor/assets/insight/insight-linkage.png)
