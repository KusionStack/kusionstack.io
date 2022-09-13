# Introduction to KusionStack

## What is KusionStack?

**KusionStack is an open-source cloud-native programmable technology stack!**

KusionStack is a highly flexible programmable technology stack to enable unified application delivery and operation, inspired by the word Fusion, which aims to help enterprises build an application-centric configuration management plane and DevOps ecosystem.

1. Fusion of hybrid scenarios of **private cloud**, **hybrid cloud**, and **multi-cloud** 
2. Fusion of hybrid platform technologies of **cloud-native** and a variety of other platform technologies
3. Fusion of enterprise-level demands of **multi-project**, **multi-team**, **multi-role**, **multi-tenant**, and **multi-environment**

Based on the concept of Platform as Code, developers can quickly unify the full configuration schemas, constraints, policies and configs across the application life cycle, work with the **hybrid technologies and cloud environment**, walk through the **end-to-end workflow** from programming to launch, and truly achieve **write once, deliver anywhere**.

![](/img/docs/user_docs/intro/kusion-stack-0.png)

KusionStack originated from the large-scale platform engineering practice within Ant Group and has been widely used in Ant Group's SaaS application delivery, computing and data infrastructure delivery, site construction, database operation and other operation scenarios, helping Ant Group to complete upgrades from the traditional operation model to the programmable and collaborative DevOps model.

## Why use KusionStack?

Cloud-native technology represented by Kubernetes is becoming the first-party technology for modern enterprises and cloud vendors and has formed a global community ecology. Kubernetes supports a final-state, data-oriented API definition mechanism, declarative, versioned, and resource-schema-oriented definition and extension mechanism, and a terminable and predictable server-side verification and simulation mechanism. These excellent designs naturally have consistent API access mechanisms, perfect resource definition and extension capabilities, and client-friendly verification and execution mechanisms, natively possessing the typical capabilities of traditional third-party API access technology. But from another point of view, modern applications will also rely on non-cloud-native PaaS and IaaS services for a long time, which makes the application delivery and operation in the enterprise rely on scattered and changing technologies and platforms, and complex and fragmented working interfaces and processes. In addition, Kubernetes is a platform for building platforms. For non-expert application developers, the technical complexity of Kubernetes itself and a growing number of resource-oriented user interfaces restrict the growth of a broader DevOps ecosystem openly and democratically within the enterprise. Finally, there is a lack of effective means on the platform side to open growing platform capabilities to application developers in a simple, unified and manageable manner, and reduce the cognitive burden of application developers through high app-oriented abstraction, enabling them to complete app delivery and operation in a self-service way.

At Ant Group, we have experienced all the above problems. We have built large-scale [Bare Metal](https://en.wikipedia.org/wiki/Bare-metal_server)](https://en.wikipedia.org/wiki/Bare-metal_server) Kubernetes clusters, a large-scale service mesh system based on [MOSN](https://github.com/mosn/mosn) sidecar, but also relies heavily on PaaS services such as middleware and some IaaS cloud services. In the field of operation, we have made many attempts to adapt to scale, complexity and rapid changes, such as using cloud-native tools to improve the classic ops platforms, such as adopting the Kubernetes community's native YAML-based DevOps solution, but none of them can meet the needs of internal application-centric, high-efficiency, low-awareness, and taking into account the open, flexible, scalable, and portable large-scale delivery and operation requirements.

![](/img/docs/user_docs/intro/kusion-stack-1.png)

KusionStack fusions platform developers, application developers and [SRE](https://en.wikipedia.org/wiki/Site_reliability_engineering) with the platform engineering concept, through a one-stop technology stack targeting "modeling on platforms, compile to cloud". KusionStack enables the platform developers to open platform capabilities simply and flexibly, allowing application developers to design app-centric abstraction, reduce the cognitive burden on infrastructure, and at the same time give them sufficient flexibility. Overall, KusionStack, like other as-Code technologies, provides the convenience of **versioned**, **auditable**, **reusable**, **replayable** and **sharable**, and at the same time KusionStack is committed to building **application-centric abstraction**, **consistent management tools and automation mechanisms** and **simpler end-to-end user experience and workflow**, and hopes to approach the state:

+ Fusion of **platform technologies**: Running on a variety of cloud-native and non-cloud-native technologies and services, the application operation life cycle is modeled and configured based on differentiated PaaS and IaaS APIs. And shipping with the container image, applications can be configured in one place and delivered anywhere.
+ Fusion of  **multiple roles**: Help the platform and application developers break the boundaries and move closer, through the engineering way of "platform developers produce the base models, and the application developers define their application model and configs", the division of labor and collaboration jointly form a DevOps system around application delivery.
+ Fusion of **workflow**: For diverse operation scenarios, based on scalable project structure and programming support, the typical end-to-end workflow includes the development phase: manual or automatic code modification, testing, commit, PR submission and review; CI phase: integration testing and deployment verification; CD phase: runtime-oriented preview, apply, observation, etc.
+ Fusion of **operation methods**: Adopting platform-based CI, CD, and CDRA capabilities to form an end-to-end GitOps solution, and also provide toolchains, service APIs, and GUI products, which can be supplied on demand and used flexibly, taking into account the needs of internal private clouds, external hybrid clouds, and multi-cloud scenarios, gradually replace fragmented products with a set of cohesive solutions.
+ Fusion of **technical concepts**: Create more possibilities on diverse platform technologies for diverse roles through open operation concepts, culture and open source technologies.

## Composition of KusionStack

KusionStack fusions the platform and the application developers through the platform engineering concept, technology and workflow to achieve a balance between platform capability openness and application self-service operation efficiency. KusionStack builds a programmable, extensible, and portable technology stack based on language ​​and toolchains. Its core components include:

+ [KCL](https://github.com/KusionStack/KCLVM): Configuration and policy programming language, protocols, toolchains and IDE plugins
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

## Kusion vs. X

KusionStack is a pure client-side programmable technology stack. Compared with other technologies, its characteristics can be summarized as:

+ **Application-centric**: Meet the abstraction and definition requirements of differentiated application models
+ **Pure client solution**: Lightweight, extensible, flexible, and portable
+ **Hybrid resources and cloud**: Provides resource abstraction and management functions on multi-runtime and multi-cloud
+ **Highly automatable**: Provide rich APIs, SDK, and extension mechanisms to meet the automation needs of developers and platforms

![](/img/docs/user_docs/intro/kusion-vs-x.png)

**vs. Terraform**

KusionStack is a cloud-native programmable technology stack, which aims to define an application-centric abstract interface and an end-to-end management mechanism.

KusionStack provides the ability to write configuration (config), type (schema), function (lambda), and policy (rule) as the core elements through the record and functional language KCL. KCL is a modern compiled static language. It adopts modern programming language design elements from Python and Golang, but does not have system functions such as native threads and IO. It can be applied in scenarios such as configuration, modeling, and policy with low noise and low side effects. And KCL is designed to provide cloud-native affinity language functions.

![](/img/docs/user_docs/intro/kcl.png)

KusionStack provides an operation engine and API layer that is completely decoupled from KCL, which is designed to work with hybrid resources. KusionStack has developed its resource management capabilities based on the Kubernetes API server, and supports 3-way diff-based preview, runtime dry-run and other necessary cloud-native management capabilities; for non-Kubernetes control planes (such as IaaS APIs) KusionStack integrates the Terraform toolchain to complete automated management, and treat Terraform as a resource runtime management engine.

![](/img/docs/user_docs/intro/kusion-engine.png)

Terraform is a programmable operation product widely used in cloud resource delivery scenarios. It uses the code block written in the dynamic interpreted language HCL as the entry to interpret to drive the engine and provider framework. With its well-designed and unique API access mechanism, it reduces the difficulty of using imperative APIs of cloud vendors and provides a good declarative operation experience with a concise workflow.

**vs. CD systems (eg KubeVela, ArgoCD)**

KusionStack is a client-side programmable technology stack. It provides management workflows for cloud-native and non-native resources through the Kusion engine and KusionCtl tools. Therefore, the Kusion engine can be regarded as a CD engine implementation in the push mode.

CD systems are usually sourced in some declarative format, and complete automated delivery and configuration drift reconciliation through Pull, Push, or a combination of the two. If you have adopted the CD system, KusionStack can be used with it, such as reconciling KCL definitions through ArgoCD, such as using KusionCtl with KubeVela, etc.

**vs. Helm**

KusionStack is a client-side programmable technology stack, which aims to define an application-oriented configuration interface through rich language-level programming abstraction capabilities and automated integration mechanisms and to apply and manage through the engine and toolchains.

The concept of Helm originates from the package management mechanism of the operating system. It is a package management tool based on templated YAML files and supports the execution and management of resources in the package. KusionStack naturally provides a superset of Helm capabilities, You can use KusionStack directly as an alternative. For users who have adopted Helm, the stack compilation results in KusionStack can be packaged and used in Helm format.

**vs. OAM**

KusionStack is a client-side programmable technology stack, which includes an out-of-the-box cloud-native application model based on OCI and other specifications. Developers can also design and implement differentiated cloud-native application models according to their own needs easily.

OAM is an open-source open application model specification. It is mainly used in the cloud-native CD control plane KubeVela. It is usually implemented by cloud-native technology CRD and operator and supports any custom resource as a payload. KusionStack can also become technical to implement the OAM model on the client and use it with the KubeVela control plane.

**vs. CrossPlane**

KusionStack is a client-side programmable technology stack that provides management functions for hybrid resources through Kusion Engine, which natively provides abstraction and management functions for Kubernetes API Server, and also supports non-Kubernetes services by integrating the Terraform toolchain, and provides unified resource abstraction with orchestration and management capabilities.

CrossPlane is an open-source cloud-native control plane framework. Based on the Kubernetes API extension mechanism, it connects imperative APIs into the Kubernetes API extension system in a unified paradigm and technical way and redefines and reconciles them in the native Kubernetes API Server mode. In contrast, KusionStack adopts the client-side approach in terms of API access and manages non-cloud-native resources by reusing Terraform capabilities, without forcing the redefinition within the Kubernetes API layer. Thanks to KusionStack's native support for work with the Kubernetes API, KusionStack works seamlessly with CrossPlane.

**vs. Kubernetes**

KusionStack is a client-side programmable technology stack, which aims to provide **abstract**, **management** methods and better **user experience** and **workflow** for various operational needs. KusionStack is used to programmatically and flexibly define and manage application delivery.

Kubernetes is a container scheduling and management runtime widely used around the world, an "operating system" for containers, and a platform for building platforms. On the Kubernetes API layer, KusionStack provides capabilities to help developers complete application delivery and operation more easily:

+ KCL: backward compatible with YAML specification, YAML can be used as a downstream static data format
+ KCL-OpenAPI tool: Native OpenAPI, CRD specification support, support for automatic generation of KCL schema code
+ Konfig repository: Provides base models based on Kubernetes, Prometheus and other cloud-native technologies, and also an out-of-the-box application model
+ Kusion: Provide Kubernetes-oriented login, RABC, sensitive information management, 3-way preview, apply, observe, destroy, etc

**vs. App PaaS**

Compared with application deployment and operation products or platforms, KusionStack is a client-side programmable technology stack, which provides technical components, automated support and recommended workflows. Based on solid practices within Ant Group, it can meet the demands of the enterprise-level application operation. KusionStack can be used as the basis of the application PaaS, in which the Konfig repository can become its programmable interface, operation business layer and external workspace.

## Development status

KusionStack is in the early days of open source, you can see the releases of [Kusion](https://github.com/KusionStack/kusion/releases) and [KCLVM](https://github.com/KusionStack/KCLVM/releases) here version, you can also join us via [Community](https://github.com/KusionStack/community).

## Next step

+ [Install using KusionCtl](/docs/user_docs/getting-started/install/kusionup)
+ Learn about [core concepts](/docs/user_docs/concepts/project-stack) and [technical architecture](/docs/user_docs/concepts/arch)
