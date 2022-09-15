---
sidebar_position: 4
---

# KCL

[KCL](https://github.com/KusionStack/KCLVM) 是一个开源的基于约束的记录及函数语言。KCL 通过成熟的编程语言技术和实践来改进对大量繁杂配置的编写，致力于构建围绕配置的更好的模块化、扩展性和稳定性，更简单的逻辑编写，以及更快的自动化集成和良好的生态延展性。

## 特性

![](/img/docs/user_docs/intro/kcl.png)

+ **简单易用**：源于 Python、Golang 等高级语言，采纳函数式编程语言特性，低副作用
+ **设计良好**：独立的 Spec 驱动的语法、语义、运行时和系统库设计
+ **快速建模**：以 [Schema](https://kusionstack.io/docs/reference/lang/lang/tour#schema) 为中心的配置类型及模块化抽象
+ **功能完备**：基于 [Config](https://kusionstack.io/docs/reference/lang/lang/codelab/simple)、[Schema](https://kusionstack.io/docs/reference/lang/lang/tour/#schema)、[Lambda](https://kusionstack.io/docs/reference/lang/lang/tour/#function)、[Rule](https://kusionstack.io/docs/reference/lang/lang/tour/#rule) 的配置及其模型、逻辑和策略编写
+ **可靠稳定**：依赖[静态类型系统](https://kusionstack.io/docs/reference/lang/lang/tour/#type-system)、[约束](https://kusionstack.io/docs/reference/lang/lang/tour/#validation)和[自定义规则](https://kusionstack.io/docs/reference/lang/lang/tour#rule)的配置稳定性
+ **强可扩展**：通过独立配置块[自动合并机制](https://kusionstack.io/docs/reference/lang/lang/tour/#-operators-1)保证配置编写的高可扩展性
+ **易自动化**：[CRUD APIs](https://kusionstack.io/docs/reference/lang/lang/tour/#kcl-cli-variable-override)，[多语言 SDK](https://kusionstack.io/docs/reference/lang/xlang-api/overview)，[语言插件](https://github.com/KusionStack/kcl-plugin) 构成的梯度自动化方案
+ **极致性能**：使用 Rust & C，[LLVM](https://llvm.org/) 实现，支持编译到本地代码和 [WASM](https://webassembly.org/) 的高性能编译时和运行时
+ **API 亲和**：原生支持 [OpenAPI](https://github.com/KusionStack/kcl-openapi)、 Kubernetes CRD， Kubernetes YAML 等 API 生态规范
+ **开发友好**：[语言工具](https://kusionstack.io/docs/reference/cli/kcl/) (Format，Lint，Test，Vet，Doc 等)、 [IDE 插件](https://github.com/KusionStack/vscode-kcl) 构建良好的研发体验
+ **安全可控**：面向领域，不原生提供线程、IO 等系统级功能，低噪音，低安全风险，易维护，易治理
+ **生产可用**：广泛应用在蚂蚁集团平台工程及自动化的生产环境实践中

## 场景

您可以将 KCL 用于

+ 生成静态配置数据如 JSON, YAML 等
+ 使用 schema 对配置数据进行建模并减少配置数据中的样板文件
+ 为配置数据定义带有规则约束的 schema 并对数据进行自动验证
+ 无副作用地组织、简化、统一和管理庞大的配置
+ 通过分块编写配置数据可扩展地管理庞大的配置
+ 与 [Kusion Stack](https://kusionstack.io) 一起，用作平台工程语言来交付现代应用程序
