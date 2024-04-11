---
id: app-configuration
sidebar_label: AppConfiguration
---

# AppConfiguration

As a modern cloud-native application delivery toolchain, declarative intent-based actuation is the central idea of Kusion, and `AppConfiguration` model plays the role of describing the intent, which provides a simpler path for on-boarding developers to the platform without leaking low level details in runtime infrastructure and allows developers to fully focus on the application logic itself.

The `AppConfiguration` model consolidates all the necessary components and their dependent accessories for the application deployment, along with any workflow, policy and operational requirements into one standardized, infrastructure-independent declarative specification. This declarative specification represents the intuitive user intent for the application, which drives a standardized and efficient application delivery and operation process in a hybrid environment.

![appconfig.png](/img/docs/concept/appconfig.png)

AppConfiguration consists of five core concepts, namely `Components`, `Topologies`, `Pipeline`, `PolicySets`, and `Dependency`. We will walk through these concepts one by one.

#### Component

`Components` defines the foundation of any application configuration. Generally speaking, we believe that a comprehensive application description should at least consist of a core deployable workload that is frequently iterated and a collection of any other core services that the workload depends on, such as databases, caches or any other cloud services.

Components are conceptually split into two categories, `Workload` and `Accessories`. The former revolves around the configuration for the computing resource. The latter represents any third-party runtime capabilities and operational requirements that the application needs. Each AppConfiguration consists of exactly one workload and any number of accessories.

Simply put, we can define `Components` with the following expression:

`Components = Workload + Accessories`

The concept of `Components` and `Accessories` itself is implicit when [authoring the configuration files](../configuration-walkthrough/overview). You can define the workload and any type of accessories (such as database or monitoring) directly under the AppConfiguration model.

From a collaboration perspective, platform developers and SREs are responsible for continuously adding any new schema (as abstractions for the underlying infrastructure) and implementations that can be used out-of-the-box. Application developers SREs should be able to leverage the corresponding schemas to cover the evolving application needs. This helps software organizations achieve separation of concern, so that different roles can focus on the subject matter they are an expert of.

#### Pipeline

In most of the cases, the platform is capable of providing a consistent application delivery process that can meet most application needs. In the case that an application warrants any customization in the delivery workflow, the `Pipeline` section in AppConfiguration provides an approach to extend the workflow as needed. 

A typical delivery workflow is made of several stages, each corresponds to some logic that needs to be executed, such as manual approval, data transfer, coordinated multi-cluster release, notification, etc. Implementation-wise, the execution of each stage should be carried out with a plugin, developed and managed by the platform owners.

#### Topologies

In reality, what we have observed for production-grade applications is that they usually need to be deployed to a wide range of different targets including different clouds, regions, availability zones or runtimes for availability/cost/regulation/performance or disaster recovery related reasons. The `Topologies` section in AppConfiguration highlights the different deployment targets in the application delivery and provides a single pane of glass that overlooks the entire deployment topology.

#### PolicySets

The `PolicySets` section is responsible for defining the set of rules and procedures that should be followed in the application delivery process. They generally represent the guidelines with the purpose of minimizing any technical, security or compliance risks. Some examples include release strategies, risk management policies, and self-healing strategies. The collections of policies are expected to be managed as a joint effort from all the stakeholders, including platform owners, infrastructure owners, and security and compliance stakeholders. Some policy sets (usually security and compliance related) are expected to be mandatory. Some can be switched on and off by the application owner (self-healing strategy for instance) depending on their specific needs.

#### Dependency

In a production-scale environment, there are usually intricate dependencies between multiple applications. The `Dependency` section is responsible for describing the dependencies between multiple applications.
