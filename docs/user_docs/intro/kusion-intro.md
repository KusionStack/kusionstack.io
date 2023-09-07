# KusionStack


## What is KusionStack?

**KusionStack is an open-source cloud-native programmable technology stack!**

KusionStack is an open-source programmable engineering stack to facilitate app-centric development and unified operation, inspired by the phrase 'Fusion on the Kubernetes'. The main motivation is to help platform and app developers to develop and deliver in a self-serviceable, fast, reliable, and collaborative way.

To put it simply, KusionStack aims to help developers:

1. **Codify** and **unify** configurations, topologies, workflows and policies around a modern app delivery
2. **Organize** application's resources and ensure secure access by **identities** throughout the entire delivery process
3. Streamline app delivers workflow to **Kubernetes**, **Cloud** and **On-premises** with a dev-friendly experience

Based on the concept of **Platform as Code**, developers could define the app delivery life cycle with a unified organization and operation interface, fully leverage the hybrid capability of Kubernetes, cloud and on-premises, go through the end-to-end delivery workflow, and truly achieve the **centralized definition, arbitrary delivery**.

![](https://raw.githubusercontent.com/KusionStack/kusion/main/docs/workflow.png)


## What can be done with KusionStack?

We have two perspectives to perceive the value of KusionStack.

As an out-of-box product, KusionStack helps to:
+ **Config** your app with an app-centric model above Kubernetes and cloud resources
+ **Deliver** your app with dev-friendly tools and IDE products to Kubernetes and clouds

As an engineering stack, KusionStack helps to:
+ **Build** your apps' abstraction models with the **collaboration** of multiple roles 
+ **Orchestrate** your automation workflow with **hybrid** resources across Kubernetes and clouds
+ **Integrate** into your homegrown or public systems

![](/img/docs/user_docs/intro/kusion-stack-1.png)


## KusionStack Highlights

**App-centric**
App is the first-class citizen of KusionStack. KusionStack provides an out-of-the-box **app delivery model** based on best practices and also supports customizing your application models. With the simple application model definition, KusionStack provides sufficient automation support to help developers turn the blueprint into reality.

**Flexible**
Based on the increasing model ecosystem, the powerful engine and a variety of extensible mechanisms, KusionStack provides full flexibility for developers undertaking ops work. KusionStack can meet the needs of individual developers, small teams and large groups with good scalability and manageability through the standard **project** and **stack** structures. The pure client-side solution also ensures good portability and the rich APIs make it easier to integrate and automate.

**Collaborative**
In addition to the general advantages of as-code solutions, KusionStack hopes to help to define the application model with the platform team and application team collaboratively. With the **separation of concerns**, different roles could focus on their work based on their knowledge and responsibility. Through such a division of labor, the platform team can better manage the differences and complexities of the platform, and app developers could participate in ops work with less cognitive load.


## KusionStack Composition

KusionStack consists of a series of tools and products. Among them, Kusion turns blueprints into reality with powerful engines and orchestration capabilities, and Konfig holds app delivery models and components. You can choose to use one of them or use them in combination.

+ [Kusion](https://github.com/KusionStack/kusion): Operation engine, toolchains, service, IDE workspace
+ [catalog](https://github.com/KusionStack/cata): Catalog of shared Kusion Models and Generators

## KusionStack vs. X

KusionStack is a pure client-side programmable technology stack, which aims to define an app-centric delivery model and an end-to-end automation workflow.

![](/img/docs/user_docs/intro/kusion-vs-x.png)

**vs. Terraform**

Terraform is a programmable operation product widely used in cloud resource delivery scenarios. It helps operators access different cloud APIs easily with programmable resource blocks, state management, and API providers. Terraform reduces the difficulty of using imperative APIs of various cloud vendors and provides a good declarative operation experience with a concise workflow.

In contrast, KusionStack attempts to help developers work with an abstract app delivery model and also makes it easier for different roles to collaborate to build and manage the abstraction. KusionStack natively supports scalability, automation, and high performance for enterprise-level requirements. KusionStack works in a Kubernetes-first way and leverages Terraform to manage non-Kubernetes resources.

**vs. CD systems (eg KubeVela, ArgoCD)**

CD systems are usually sourced in some declarative format and complete automated delivery and configuration drift reconciliation through Pull, Push, or the combination of Pull & Push. The Kusion engine can be regarded as a CD engine implementation in the push mode. If you have adopted a CD system, KusionStack can be integrated with it, such as reconciling Kusion models through ArgoCD or writing codify OAM model and running with KubeVela, etc.

**vs. Helm**

The concept of Helm originates from the package management mechanism of the operating system. It is a package management tool based on templated YAML files and supports the execution and management of resources in the package. KusionStack naturally provides a superset of Helm capabilities with the modeled key-value pairs, so that developers can use KusionStack directly as a programable alternative to avoid the pain of writing text templates. For users who have adopted Helm, the stack compilation results in KusionStack can be packaged and used in Helm format.

**vs. App PaaS**

Compared with application delivery products or platforms, KusionStack is a client-side programmable technology stack, which is not a complete App PaaS. KusionStack's products can be used as part of App PaaS, or as the basis for building your App PaaS as a platform engineering solution.


## Development status

KusionStack is at an early stage of open source. We will continue to focus on providing a better and more usable **application delivery model**, supporting **multiple clusters** and more **clouds**, and natively providing **identity** and **resource** management mechanisms.

You can check out the release versions of [Kusion](https://github.com/KusionStack/kusion/releases) and are also welcome to join us via [Community](https://github.com/KusionStack/community).


## Next step

+ [Installation](/docs/user_docs/getting-started/install)
+ Learn about [core concepts](/docs/user_docs/concepts/glossary) and [technical architecture](/docs/user_docs/concepts/arch)
