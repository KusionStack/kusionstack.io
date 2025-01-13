---
title: 如何搜索
---
在本节中，我们将探索如何使用 Karpor 执行多集群资源搜索，本指南完全通过 Dashboard 进行。

Karpor 支持三种搜索方法：

- **通过 SQL 搜索**：使用 SQL 查询语言执行资源搜索。
- **通过 DSL 搜索**：通过 Karpor 的特定领域语言（DSL）进行资源搜索。
- **通过自然语言搜索**：使用自然语言进行资源搜索。

## 通过 SQL 搜索

Karpor 提供了一个方便的 SQL 查询功能，允许你使用熟悉的 SQL 语法搜索和过滤所有托管集群中的 Kubernetes 资源，并为多集群资源搜索提供了针对性的优化和增强。

SQL 是软件工程行业从业者容易获取的技能之一，理论上使得学习曲线相当低。因此，这种搜索方法是为你准备的！特别适合 Karpor 的初学者。

以下是使用 SQL 搜索的步骤：

1. **进入搜索页面**：Karpor 将首页设计为搜索的入口点，因此打开 Karpor 的 Web UI 立即呈现给你搜索页面。
   ![](/karpor/assets/search/search-home.png)
2. **编写 SQL 查询语句**：使用 SQL 语法编写你的查询语句，指定你希望搜索的集群名称、资源类型、条件和过滤器。此外，如果你输入关键词并按空格，搜索框将弹出带有下拉菜单的自动完成提示，建议你可以输入的下一个可能的关键词。
   ![](/karpor/assets/search/search-auto-complete.png)
3. **执行查询**：点击 `搜索` 按钮执行查询，并被发送到搜索结果页面。Karpor 将返回与 SQL 查询匹配的资源列表。
   ![](/karpor/assets/search/search-result.png)
4. **高级功能**：利用 Karpor 的内置高级 SQL 语法，如排序、全文搜索等，进一步细化你的搜索。详情请参阅：[搜索方法文档](../5-references/3-search-methods.md)。

## 通过 DSL 搜索

敬请期待。🚧

## 通过自然语言搜索

虽然 Karpor 目前提供的 SQL 搜索功能不需要额外的学习，因为很多工程师已经具备 SQL 知识，但显然最直观、学习门槛最低的搜索方式是使用用户的母语——自然语言。

因此，Karpor 中集成了自然语言搜索 Kubernetes 资源的功能。

以下是使用自然语言搜索的步骤：

1. **进入搜索页面**：Karpor 将首页设计为搜索的入口点，因此打开 Karpor 的 Web UI 立即呈现给你搜索页面。然后我们可以选择自然语言搜索。
   ![](/karpor/assets/search/search-home-natural-language.png)
2. **编写自然语言查询语句**：使用自然语言编写你的查询语句，指定你希望搜索的集群名称、资源类型、条件和过滤器。
   ![](/karpor/assets/search/search-by-natural-language.png)
3. **执行查询**：点击 `搜索` 按钮执行查询，并被发送到搜索结果页面。Karpor 将返回与自然语言查询匹配的资源列表。
   ![](/karpor/assets/search/search-by-natural-language-result.png)
4. **搜索提示**：对于不完整或者随意输入的自然语言，Karpor 会进行提示。
5. **二次搜索**：Karpor 对自然语言的搜索会转换为 SQL 语句，用户可以进行二次修改，重新搜索。
