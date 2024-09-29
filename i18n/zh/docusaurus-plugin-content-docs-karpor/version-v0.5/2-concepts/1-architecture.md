---
title: 架构
---
![](assets/1-architecture/architecture.png)

## 组件

- `Dashboard`：Karpor 的 Web UI 界面。
- `Server`：Karpor 的核心后端服务。
- `Syncer`：用于实时同步集群资源的独立服务。
- `Storage`：用于存储已同步的资源和用户数据的存储后端。

## Karpor 的工作原理

1. 安装后，用户可以将感兴趣的集群注册到 Karpor 中。
2. Syncer 组件会自动将已注册集群中的资源实时同步到 Storage 中，同时会确保资源的实时变化也会自动同步到 Storage 中。
3. 当用户需要查找特定资源时，只需在 Dashboard 的搜索框中输入查询语句。Dashboard 会与 Server 的搜索接口交互，Server 内的搜索模块将解析这些语句，并在 Storage 中查找相应的资源，然后将搜索结果返回给 Dashboard。
4. 点击搜索结果后，用户将被引导至资源洞察页面。Dashboard 调用 Server 的洞察接口，其中 Server 的洞察模块对资源进行静态扫描，生成问题报告，并定位其相关资源，以绘制包含所有父资源和子资源的资源拓扑图。
5. 洞察页面同样适用于资源组，比如洞察特定 Group-Version-Kind 的资源组、单个命名空间，或是用户自定义的资源组。

## 下一步

- 学习 Karpor 的 [术语表](../concepts/glossary)。
- 查看 [用户指南](../user-guide/multi-cluster-management) 以了解更多关于你能够通过 Karpor 实现的内容。
