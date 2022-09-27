# KusionStack


## What is KusionStack?

**KusionStack is an open-source cloud-native programmable technology stack!**

KusionStack is a highly flexible programmable technology stack to enable unified application delivery and operation, inspired by the word Fusion, which aims to help enterprises build an application-centric configuration management plane and DevOps ecosystem.

1. Fusion of hybrid scenarios of **private cloud**, **hybrid cloud**, and **multi-cloud** 
2. Fusion of hybrid platform technologies of **cloud-native** and a variety of other platform technologies
3. Fusion of enterprise-level demands of **multi-project**, **multi-team**, **multi-role**, **multi-tenant**, and **multi-environment**

Based on the concept of Platform as Code, developers can quickly unify the full configuration schemas, constraints, policies and configs across the application life cycle, work with the **hybrid technologies and cloud environment**, go through the **end-to-end workflow** from programming to launching, and truly achieve **write once, deliver anywhere**.

![](/img/docs/user_docs/intro/kusion-stack-0.png)

KusionStack originated from the large-scale platform engineering practice within Ant Group and has been widely used in Ant Group's SaaS application delivery, computing and data infrastructure delivery, site construction, database operation and other operation scenarios, helping Ant Group to complete upgrades from the traditional operation model to the programmable and collaborative DevOps model.


## Why develop KusionStack？

Represented by Kubernetes, Cloud-native technology is becoming the first-party technology for modern enterprises and cloud vendors and has formed a global community ecology. Kubernetes supports an API definition mechanism that is final-state, data-oriented, a definition and extension mechanism which is declarative, versioned, resource-schema-oriented, and a server-side verification and simulation mechanism which is terminable and predictable. These excellent designs make it naturally have consistent API access mechanisms, perfect resource definition and extension capabilities, and client-friendly verification and execution mechanisms, natively possessing the typical capabilities of traditional third-party API access technology. But from another point of view, modern applications will also rely on non-cloud-native PaaS and IaaS services for a long time, which makes the application delivery and operation in the enterprise rely on scattered and changing technologies and platforms, and complex and fragmented working interfaces and processes. In addition, Kubernetes is a platform for building platforms. For non-expert application developers, the technical complexity of Kubernetes itself and a growing number of resource-oriented user interfaces restrict the construction of a broader DevOps ecosystem openly and democratically within the enterprise. Finally, there is a lack of effective means on the platform side to open growing platform capabilities to application developers in a simple, unified and manageable manner, and to reduce the cognitive burden of application developers through high app-oriented abstraction, enabling them to complete app delivery and operation in a self-service way.

At Ant Group, we have experienced all the above problems. We have built large-scale [Bare Metal](https://en.wikipedia.org/wiki/Bare-metal_server) Kubernetes clusters, a large-scale service mesh system based on [MOSN](https://github.com/mosn/mosn) sidecar, but also rely heavily on PaaS services such as middleware and some IaaS cloud services. In the field of operation, we have made many attempts to adapt to scale, complexity and rapid changes, such as using cloud-native tools to improve the classic ops platforms, such as adopting the Kubernetes community's native YAML-based DevOps solution, but none of them can meet the needs of internal application-centric, high-efficiency, low-awareness, and taking account of the open, flexible, scalable, and portable large-scale delivery and operation requirements.

![](/img/docs/user_docs/intro/kusion-stack-1.png)


## Why use KusionStack?

KusionStack fusions platform developers, application developers and [SRE](https://en.wikipedia.org/wiki/Site_reliability_engineering) with the platform engineering concept, through a one-stop technology stack targeting "modeling on platforms, compile to cloud". KusionStack enables the platform developers to open platform capabilities simply and flexibly, allowing application developers to design app-centric abstraction, reduce the cognitive burden on infrastructure, as well as give them sufficient flexibility. Overall, KusionStack, like other as-Code technologies, provides the convenience of **versioned**, **auditable**, **reusable**, **replayable** and **sharable**, and at the same time KusionStack is committed to building **application-centric abstraction**, **consistent management tools and automation mechanisms** as well as **simpler end-to-end user experience and workflow**, hoping to approach the state:

+ Fusion of **platform technologies**: With a variety of cloud-native and non-cloud-native technologies and services, the application operation life cycle is modeled and configured based on differentiated PaaS and IaaS APIs. Shipping with the container image, applications can be configured in one place and delivered anywhere.
+ Fusion of  **multiple roles**: Help the platform and application developers break the boundaries and go forward together with each other, through the engineering way of "platform developers produce the base models, and the application developers define their application model and configs", the division of labor and collaboration jointly form a DevOps system around application delivery.
+ Fusion of **workflow**: For diverse operation scenarios, based on scalable project structure and programming support, the typical end-to-end workflow includes the development phase: manual or automatic code modification, testing, commit, PR submission and review; CI phase: integration testing and deployment verification; CD phase: runtime-oriented preview, apply, observation, etc.
+ Fusion of **operation methods**: Adopt platform-based CI, CD, and CDRA capabilities to form an end-to-end GitOps solution, and also provide toolchains, service APIs, and GUI products, which can be supplied on demand and used flexibly, taking account of the needs of internal private clouds, external hybrid clouds and multi-cloud scenarios, gradually replace fragmented products with a set of cohesive solutions.
+ Fusion of **technical concepts**: Create more possibilities in terms of diverse platform technologies and roles through open operation concepts, culture and open source technologies.


## Composition of KusionStack

KusionStack fusions the platform and the application developers through the platform engineering concept, technology and workflow to achieve a balance between platform capability openness and application self-service operation efficiency. KusionStack builds a programmable, extensible, and portable technology stack based on language ​​and toolchains. Its core components include:

+ [KCL](https://github.com/KusionStack/KCLVM): Configuration and policy programming language for application developers, along with its protocols, toolchains and IDE plugins
+ [Kusion](https://github.com/KusionStack/kusion): Operation engine, toolchains, service, IDE workspace and community technology integration suite
+ [Konfig](https://github.com/KusionStack/konfig): Shared repository of application models and base models, and CI suite for GitOps workflows (such as GitHub Actions suite)

It can also be divided from the perspective of the language protocol layer, operation capability layer, and user interface layer, as shown in the following figure:

![](/img/docs/user_docs/intro/kusion-arch.png)


## KusionStack core features

**Flexible organization, modeling on demand**

KusionStack works in a pure client-side way, through the simple engineering way of directories and files, provides a scalable engineering structure based on **project** and **stack** design and supports flexible management of the on-demand organization. Developers can write **configuration (config)**, **type (schema)**, **function (lambda)** and **policy (rule)** through the record and functional language KCL. KusionStack provides an out-of-the-box cloud-native application model, allowing users to quickly start the journey of cloud-native delivery. In addition, KusionStack is not limited to a single, fixed model or standard. Developers can write base models and application models through KCL's modular language features, which helps the platform side quickly reveal capabilities through "building blocks", and application developers can define application models as needed. Finally, KusionStack meets the multi-tenant and multi-environment configuration writing requirements in the enterprise through isolated configuration blocks with rich auto merging strategies. KusionStack helps enterprises flexibly respond to complex scenarios and rapid changes.

**Write once, deliver anywhere**

KusionStack helps application developers centrally converge the full configuration around their application, and deliver the application to the private cloud, hybrid cloud, and multi-cloud environment through the simple method of "container image with KCL code". End users work with abstract application models, which are automatically interpreted by renders for different runtimes at different platforms and generate low-level resource models at compile time. At execution time, the Kusion engine applies and manages hybrid resources of various runtimes including Kubernetes and Terraform. The Kusion engine natively supports multi-cluster resource management and manages non-Kubernetes resources by integrating Terraform. Finally, KusionStack natively supports automation mechanisms such as command line execution, CI pipelines, service (to be open-source) APIs, and GUI product (to be open-source), and can meet any delivery needs through flexible automation solutions.

**Enterprise practice, ecological integration**

Relying on the accumulation of practice within Ant Group, KusionStack provides an end-to-end workflow from development to delivery on Platform APIs:

1. Platform integration: Self-generate KCL schema code through the [KCL-OpenAPI](https://github.com/KusionStack/kcl-openapi) tool
2. Dev assistance: Rapid development and testing through KCL IDE plug-ins, lint, vet, compile, test tools
3. CI pipelines: Accurate dependency analysis and automated integration test through KCL dep and test tools
4. CD execution: Use the KusionCtl tool to implement authentication, RBAC permission configuration, and the workflow of preview, apply, observe, and destroy

In addition, KCL provides CRUD APIs, multi-language SDK and a dynamic plugin expansion mechanism to meet the personalized automation needs in the enterprise. KusionStack will continue to improve the extensibility and integrate with more community technologies.


## KusionStack vs. X

KusionStack is a pure client-side cloud-native programmable technology stack, which aims to define an application-centric abstract interface and an end-to-end management mechanism. Compared with other technologies, its characteristics can be summarized as:

+ **Application-centric**: Meet the abstraction and definition requirements of differentiated application models
+ **Pure client solution**: Lightweight, extensible, flexible, and portable
+ **Hybrid resources and cloud**: Provides resource abstraction and management functions on multi-runtime and multi-cloud
+ **Highly automatable**: Provide rich APIs, SDK, and extension mechanisms to meet the automation needs of developers and platforms

![](/img/docs/user_docs/intro/kusion-vs-x.png)

KCL is a modern high-level domain language, which is a compiled, static and strongly typed language. It provides developers with the ability to write configuration (config), modeling abstraction (schema), business logic (lambda), and environmental policies (rule) as the core elements through recording and functional language design. 

KCL tries to provide runtime-independent programmability and does not natively provide system functions such as threads and IO, but supports functions for cloud-native operation scenarios, and tries to provide stable, secure, low-noise, low-side effect, easy-to-automate and easy-to-govern programming support for solving domain problems.

Unlike client runtime written in GPL, KCL programs usually run and generate low-level data and are integrated into the client-side runtime access tools (such as KusionCtl), which can provide a left-shifted stability guarantee by testing and validation of KCL code separately before pushing to runtime. KCL code can also be compiled into a wasm module, which could be integrated into the server runtime after full testing. 

![](/img/docs/user_docs/intro/kcl.png)

KusionStack provides an operation engine and API layer that is completely decoupled from KCL, which is designed to work with hybrid resources. Kusion Engine natively supports full usage of the Kubernetes API machinery, which supports 3-way runtime diff-based preview, runtime dry-run and other necessary Kubernetes management capabilities. For non-Kubernetes control planes (such as IaaS APIs) KusionStack integrates the Terraform toolchain to complete automated management and treats Terraform as a resource runtime provision tool.

![](/img/docs/user_docs/intro/kusion-engine.png)

**vs. Terraform**

Terraform is a programmable operation product widely used in cloud resource delivery scenarios. It uses the code block written in the dynamic interpreted language HCL as the entry to interpret and drive the engine and provider framework. With its well-designed and unique API access mechanism, it reduces the difficulty of using imperative APIs of various cloud vendors and provides a good declarative operation experience with a concise workflow. 

Compared with the declarative language for the ops team, KCL is designed for application developers with modern programming abilities around application models, business logic and environmental rules. KusionStack natively supports full usage of the Kubernetes API machinery capabilities without writing providers，and uses Terraform to manage non-Kubernetes resources. KusionStack is more suitable for large-scale scenarios, providing rich large-scale functionalities and faster automation performance.

**vs. Pulumi**

Pulumi is a programmable technology stack that combines a GPL(general purpose language) SDK and the Terraform technology framework. In terms of programming capabilities, Pulumi provides well-designed multi-language client SDKs written in GPL and fully implements a Terraform-like engine and Provider framework.

Based on the classic C/S model, Pulumi provides a development mechanism for client runtime. The client runtime directly accesses the server runtime, and transforms as well as reuses the Terraform providers ecosystem through the self-developed engine and provider framework. In contrast, KusionStack provides a runtime-independent development mechanism with a better client-side stability guarantee and Kubernetes API machinery affinity. Pulumi eliminates the cost of language learning, but the GPL is overkill, and noise, side effects, stability problems, security problems and governance costs are unavoidable problems, while KusionStack provides a domain-oriented language and technology stack, which has a certain learning cost but is more suitable for use in large-scale scenarios.

**vs. CD systems (eg KubeVela, ArgoCD)**

CD systems are usually sourced in some declarative format, and complete automated delivery and configuration drift reconciliation through Pull, Push, or the combination of Pull & Push. The Kusion engine can be regarded as a CD engine implementation in the push mode. If you have adopted the CD system, KusionStack can be used with it, such as reconciling KCL definitions through ArgoCD, or using KusionCtl with KubeVela, etc.

**vs. Helm**

The concept of Helm originates from the package management mechanism of the operating system. It is a package management tool based on templated YAML files and supports the execution and management of resources in the package. KusionStack naturally provides a superset of Helm capabilities, so that you can use KusionStack directly as an alternative. For users who have adopted Helm, the stack compilation results in KusionStack can be packaged and used in Helm format.

**vs. OAM**

OAM is an open-source open application model specification. It is mainly used in the cloud-native CD control plane KubeVela, and is usually implemented by cloud-native technology CRD and operator and supports any custom resource as a payload. KusionStack provides an out-of-the-box application model, and can also act as a technology carrier for implementing the OAM model definition on the client side as well as be used in combination with KubeVela.

**vs. CrossPlane**

CrossPlane is an open-source cloud-native control plane framework that redefines, reconciles, and manages imperative APIs with the extension and technical means of the Kubernetes API machinery specification, while in terms of API access, KusionStack adopts a client-side approach to provide unified resource abstraction, natively provides a working mechanism for Kubernetes API machinery, and manages non-Kubernetes resources by integrating and reusing Terraform capabilities. KusionStack does not force the redefinition in the Kubernetes API server and reduces the pressure on the Kubernetes API extension mechanism in large-scale scenarios. Since KusionStack natively supports full usage of the Kubernetes API machinery capabilities, it can be used seamlessly with CrossPlane.

**vs. Kubernetes**

Kubernetes is a container scheduling and management runtime widely used around the world, an "operating system" for containers, and a platform for building platforms. On the Kubernetes API layer, KusionStack aims to provide **abstract**, **management** methods, better **user experience** and **workflow** for various operational needs, and provides capabilities to help developers complete application delivery and operation more easily:

+ KCL: backward compatible with YAML specification, YAML can be used as a downstream static data format
+ KCL-OpenAPI tool: Native OpenAPI, CRD specification support, support for automatic generation of KCL schema code
+ Konfig repository: Provides base models based on Kubernetes, Prometheus and other cloud-native technologies, and also an out-of-the-box application model
+ Kusion: Provide Kubernetes-oriented login, RABC, sensitive information management, 3-way preview, apply, observe, destroy, etc

**vs. App PaaS**

Compared with application deployment and operation products or platforms, KusionStack is a client-side programmable technology stack, which provides technical components, automated support and recommended workflows. Based on solid practices within Ant Group, it can meet the demands of the enterprise-level application operation. KusionStack can be used as the basis of the application PaaS, in which the Konfig repository can become its programmable interface, business layer and external workspace.


## Development status

KusionStack is at an early stage of open source. You can check the release versions of [Kusion](https://github.com/KusionStack/kusion/releases) and [KCLVM](https://github.com/KusionStack/KCLVM/releases) here, and are also welcome to join us via [Community](https://github.com/KusionStack/community).


## Next step

+ [Install using KusionCtl](/docs/user_docs/getting-started/install/kusionup)
+ Learn about [core concepts](/docs/user_docs/concepts/konfig) and [technical architecture](/docs/user_docs/concepts/arch)
