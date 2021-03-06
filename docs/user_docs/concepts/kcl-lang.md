---
sidebar_position: 4
---

# KCL 配置策略语言

KCL 是 Kusion 项目针对规模化运维的云原生场景新设计的配置策略语言。它的最初设计思路是通过成熟的编程语言理论和实践来改进对大量繁杂的 YAML 配置数据的管理，通过声明式的语法结合静态类型等特性来简化和校验配置的开发和运维工作。

## 1. 语言特色

KCL 关键特性如下图所示：

![](/img/docs/user_docs/concepts/kcl-capability-01.png)

- 简单
  - 源于 Python、Golang，融入函数语言特性
  - 吸收语句、表达式、条件、循环等集成语言元素
  - 类型、数据分离，Schema 声明配置定义，字典声明配置实例
- 稳定
  - 强不可变约束
  - 编译时类型推导、类型检查
  - Rule 策略定义：以属性为中心的约束表达式、根据约束查询结果
  - 可测试：assert、print、test tools
- 协同编写
  - 配置合并：编译时配置依赖图代换
  - 配置属性运算符：满足配置覆盖、合并、添加和删除等需求
- 工程化
  - Schema 单继承+可插拔式、声明式模型组装：Mixin+Protocol
  - 工具+API 粒度的配置自动化“增删改查”
  - 丰富的内置函数+系统库
  - 顶层数据动态数据导入
  - 插件系统：复用通用编程语言生态
  - 代码组织：Module + Package
  - OpenAPI Model 支持：Swagger 与 Schema 双向转换，CRD 转换为 Schema
  - IaD 亲和：对齐 K8S YAML 标准
- 高性能
  - 配合 LLVM 优化器、支持编译到本地代码和 WASM 等格式并高效执行

## 2. 语言 & 协议

Kusion 可编程协议栈的最底层是语言 & 协议，让用户可以通过编程的方式描述资源和状态、通过 OpenAPI 的规范和其他数据互通、通过插件和多语言扩展规范和其他高级语言交互。下面是语言 & 协议 内部的结构关系图：

![](/img/docs/user_docs/concepts/iac-arch-lang.png)

左边淡红色一列分别是 OpenAPI、KCL 和多语言支持的规范，中间青色一行是根据 KCL 语言规范的 KCLVM 实现和插件扩展。通过规范加 KCLVM 实现的 T 型结构，围绕 KCL 配置策略语言实现 KCL 配置和其他配置数据以及系统进行交互。

