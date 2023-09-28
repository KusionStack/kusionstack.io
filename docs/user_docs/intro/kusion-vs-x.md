---
sidebar_position: 2
---

# Kusion vs. Other Software

It can be difficult to understand how different software compare to each other. Is one a replacement for the other? Are they complementary? etc. In this section, we compare Kusion to other software.

**vs. Terraform**

Terraform is a programmable operation product widely used in cloud resource delivery scenarios. It helps operators access different cloud APIs easily with programmable resource blocks, state management, and API providers. Terraform reduces the difficulty of using imperative APIs of various cloud vendors and provides a good declarative operation experience with a concise workflow.

In contrast, Kusion attempts to help developers work with an abstract app delivery model and also makes it easier for different roles to collaborate to build and manage the abstraction. Kusion natively supports scalability, automation, and high performance for enterprise-level requirements. Kusion works in a Kubernetes-first way and leverages Terraform to manage non-Kubernetes resources.

**vs. CD systems (eg KubeVela, ArgoCD)**

CD systems are usually sourced in some declarative format and complete automated delivery and configuration drift reconciliation through Pull, Push, or the combination of Pull & Push. The Kusion engine can be regarded as a CD engine implementation in the push mode. If you have adopted a CD system, Kusion can be integrated with it, such as reconciling Kusion models through ArgoCD or writing codify OAM model and running with KubeVela, etc.

**vs. Helm**

The concept of Helm originates from the package management mechanism of the operating system. It is a package management tool based on templated YAML files and supports the execution and management of resources in the package. Kusion naturally provides a superset of Helm capabilities with the modeled key-value pairs, so that developers can use Kusion directly as a programable alternative to avoid the pain of writing text templates. For users who have adopted Helm, the stack compilation results in Kusion can be packaged and used in Helm format.

**vs. App PaaS**

Compared with application delivery products or platforms, Kusion is a client-side programmable technology stack, which is not a complete App PaaS. Kusion can be used as part of App PaaS, or as the basis for building your App PaaS as a platform engineering solution.
