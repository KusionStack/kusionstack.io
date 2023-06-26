---
sidebar_position: 2
---

# KCL

[Kusion Configuration Language (KCL)](https://github.com/KusionStack/KCLVM) is an open source constraint-based record and functional language. KCL improves the writing of a large number of complex configurations through mature programming language technology and practice, and is committed to building better modularity, scalability and stability around configuration, simpler logic writing, fast automation and good ecological extensionality.

## Features

![](/img/docs/user_docs/intro/kcl.png)

+ **Easy-to-use**: Originated from high-level languages ​​such as Python and Golang, incorporating functional language features with low side effects.
+ **Well-designed**: Independent Spec-driven syntax, semantics, runtime and system modules design.
+ **Quick modeling**: [Schema](https://kcl-lang.io/docs/reference/lang/tour/#schema)-centric configuration types and modular abstraction.
+ **Rich capabilities**: Configuration with type, logic and policy based on [Config](https://kusionstack.io/docs/reference/lang/lang/codelab/simple), [Schema](https://kcl-lang.io/docs/reference/lang/tour/#schema), [Lambda](https://kcl-lang.io/docs/reference/lang/tour/#function), [Rule](https://kcl-lang.io/docs/reference/lang/tour/#rule).
+ **Stability**: Configuration stability built on [static type system](https://kcl-lang.io/docs/reference/lang/tour/#type-system), [constraints](https://kcl-lang.io/docs/reference/lang/tour/#validation), and [rules](https://kcl-lang.io/docs/reference/lang/tour/#rule).
+ **Scalability**: High scalability through [automatic merge mechanism](https://kcl-lang.io/docs/reference/lang/tour/#operators) of isolated config blocks.
+ **Fast automation**: Gradient automation scheme of [CRUD APIs](https://kcl-lang.io/docs/reference/lang/tour/#kcl-cli-variable-override), [multilingual SDKs](https://kusionstack.io/docs/reference/lang/xlang-api/overview), [language plugin](https://github.com/KusionStack/kcl-plugin)
+ **High performance**: High compile time and runtime performance using Rust & C and [LLVM](https://llvm.org/), and support compilation to native code and [WASM](https://webassembly.org/).
+ **API affinity**: Native support API ecological specifications such as [OpenAPI](https://github.com/KusionStack/kcl-openapi), Kubernetes CRD, Kubernetes YAML spec.
+ **Development friendly**: Friendly development experiences with rich [language tools](https://kusionstack.io/docs/reference/cli/kcl/) (Format, Lint, Test, Vet, Doc, etc.) and [IDE plugins](https://github.com/KusionStack/vscode-kcl).
+ **Safety & maintainable**: Domain-oriented, no system-level functions such as native threads and IO, low noise and security risk, easy maintenance and governance.
+ **Production-ready**: Widely used in production practice of platform engineering and automation at Ant Group.

## What is it for?

You can use KCL to

+ Generate low-level static configuration data like JSON, YAML, etc.
+ Reduce boilerplate in configuration data with the schema modeling.
+ Define schemas with rule constraints for configuration data and validate them automatically.
+ Organize, simplify, unify and manage large configurations without side effects.
+ Manage large configurations scalably with isolated configuration blocks.
+ Used as a platform engineering lang to deliver modern app with KusionStack.
