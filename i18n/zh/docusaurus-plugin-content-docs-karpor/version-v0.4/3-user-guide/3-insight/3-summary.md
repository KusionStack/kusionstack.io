---
title: 概览
---

在本节中，我们将了解 Karpor 洞察页面上的`概览卡片`，它们用于快速查看和理解当前资源组或资源的关键指标。

在不同的资源组下，`概览卡片`显示的内容也可能有所不同。

如果你查看的是：

1. **资源组洞察页面**：
    1. **集群洞察页面**，概览卡片显示的是集群的**节点、Pod 数量、CPU、内存容量以及 Kubernetes 版本**。
       ![](/karpor/assets/insight/insight-summary-cluster.png)
    2. **资源种类洞察页面**，概览卡片显示的是**所属集群、GVK（Group Version Kind）信息，以及当前集群下该类型资源的数量**。
       ![](/karpor/assets/insight/insight-summary-kind.png)
    3. **命名空间洞察页面**，概览卡片显示的是**所属集群、命名空间，以及当前命名空间下最丰富的资源类型**。
       ![](/karpor/assets/insight/insight-summary-namespace.png)
    4. **自定义资源组洞察页面**，概览卡片显示的是**每个规则的关键值，以及当前资源组下的几个资源统计数据**。
       ![](/karpor/assets/insight/insight-summary-custom-resource-group.png)

2. **资源洞察页面**，概览卡片显示的是**当前资源的名称、GVK 信息、所属集群和命名空间**。
       ![](/karpor/assets/insight/insight-summary-resource.png)

⚠️ **注意**：无论你处于哪个资源组洞察页面，概览卡片总会显示一个健康评分，该评分基于实体的风险合规状态计算得出。