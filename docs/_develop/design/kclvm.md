---
sidebar_position: 99
---

# KCLVM Architecture

![](/img/docs/develop/design/kcl-tech-arch.png)

The implementation of `KCLVM` compiler is driven by many specifications (mainly including KCL language specification, KCL multilingual integration specification, and KCL OpenAPI specification). Besides, KCL is a compiled language, maintaining the same three-stage architecture as the regular programming language compiler, and using LLVM-IR as the intermediate link between KCL and Native/WASM code.

KCL has the following three core stages:

* Translation KCL code to LLVM-IR. By parsing the KCL code and traversing the KCL AST, the corresponding LLVM-IR code is generated according to the KCL language specification.
* KCL runtime library integration. KCL runtime library provides runtime KCL value calculation, memory, context management, built-in library and plug-in library support.
* User mode and system mode code linking and execution. Link user mode code and system mode code into a dynamic link library, and finally execute the compiled KCL code through the unified runner module.

In addition, KCL provides enhanced support for the semantic resolver and plugins:

* Resolver
  * **Static type inference and checking**. Type inference and checking can be performed at compile time to avoid the overhead of type check at runtime, which can be used as the basis for IDE plug-in and semantic API support (such as schema model query, dependency analysis, etc.)
  * **Configuration graph unification**. By building and merging the configuration data dependency graph during the compilation process, the final configuration data can be obtained through only a few calculations during the runtime.
  * **Semantic dependency graph**. Through the built-in semantic dependency graph, KCL can complete the dependency analysis when the configuration changes, which can improve the end-to-end compilation performance by performing incremental compilation.
  * **Schema-centric OOP**. KCL language only retains the syntax of single inheritance, but the schema can mix and reuse the same code fragments through the features such as `mixin` and `protocol`.
* Plugin. We can use Python/Go to write plugin libraries, which mainly include some domain capabilities, such as accessing networks or databases.
