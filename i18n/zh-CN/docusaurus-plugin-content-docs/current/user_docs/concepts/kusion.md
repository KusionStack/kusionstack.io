---
sidebar_position: 2
---

# Kusion 

Kusion 是 [KusionStack](https://github.com/KusionStack) 的平台工程引擎，可以解析用户使用 [Catalog](https://github.com/KusionStack/catalog) 中的 Kusion 模型描述的运维意图，对 Kubernetes、IaaS 云资源和自定义基础设施进行运维


<p align="center">
<img src="https://raw.githubusercontent.com/KusionStack/kusion/main/docs/arch.png" width="50%" height="50%"/>
</p>

它包含三部分: `Operation Engine（操作引擎）`、`Runtimes（运行时）`和 `State（状态）`，我们将在下面对每个组件进行描述。

## 操作引擎

操作引擎是整个 Kusion 引擎的入口，负责 Kusion 的基本操作，如 preview（预览）、apply（应用）、destroy（销毁）等。该部分的主要工作流程是解析操作意图（Spec）中描述的资源，根据操作命令确定应该修改哪个资源，并将此操作生效到真实的基础设施资源上。在这个工作流程中，还涉及到运行时和状态。

## 运行时

运行时是实际基础设施和 Kusion 之间的接口。所有对基础设施资源的操作都应该委托给一个运行时，运行时将具体操作命令生效到实际的基础设施上。另一方面，任何实现了运行时接口的基础设施都可以被 Kusion 管理。

## 状态
状态是对操作结果的记录。它是 Kusion 管理的资源和实际基础设施资源之间的映射关系。状态通常用于 `apply` 和 `preview` 命令里三路合并/对比中的一路数据源。

状态可以存储在多种存储介质中，例如文件系统、对象存储服务（OSS）、数据库、HTTP服务器等。

## Kusion 是如何工作的
让我们以`preview`操作为例，演示这三个部分如何在实际操作中相互协作：

1. 操作引擎解析操作意图（Spec）中的资源，并将它们转换成一个DAG（有向无环图）。
2. 遍历这个DAG：
   1. 通过运行时获取实际基础设施中的最新状态。
   2. 从状态存储介质中获取上次的操作状态。
3. 合并/比对三个状态：操作意图（Spec）中描述的期望状态、运行时获取的实时状态，状态中记录的上次状态，并将差异结果返回到控制台。