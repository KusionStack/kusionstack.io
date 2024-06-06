---
title: 检查任何资源组和资源
---
在这部分内容中，我们将通过清晰的步骤和实例详细解释如何使用 Karpor 来检查任何资源组或资源。

如果你不熟悉相关概念，可以参考 [术语表](../../2-concepts/3-glossary.md) 章节。

## 检查具体资源

1. 搜索你感兴趣的资源：
   ![](/karpor/assets/search/search-home.png)
2. 在搜索结果页，所有通过条件筛选的资源将会被列出：
   ![](/karpor/assets/search/search-result.png)
3. 点击任意资源名称，即可跳转到该资源的洞察页面：
   ![](/karpor/assets/insight/insight-home.png)

## 检查具体资源组

你可能已经注意到，在每一个搜索结果条目中，资源的 `Cluster`、`Kind`、`Namespace` 等标签都列了出来。请注意，这些标签是**超链接**，我们称之为 "**锚点**"。它们代表了指向特定资源组或资源的链接。通过点击这些**锚点**，你可以快速跳转到该资源组或资源的洞察页面。

![](/karpor/assets/search/search-result.png)

## 在资源组 / 资源间灵活切换

实际上，除了前述搜索结果中的标签外，在任何页面上看到的任何资源 / 资源组名称，都可以作为**锚点**重定向，就像是时空虫洞，允许你在任何维度之间来回穿梭，直到找到你正在搜索的资源。搜索和锚点都是加速检索的手段，它们是 Karpor 作为 Kubernetes 探索器的关键特性。

![](/karpor/assets/insight/insight-breadcrumbs.png)
