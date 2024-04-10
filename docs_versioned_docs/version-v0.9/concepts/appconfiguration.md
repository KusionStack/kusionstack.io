---
sidebar_position: 4
sidebar_label: AppConfiguration
---

# Declarative Application Configuration Model - AppConfiguration

## Abstract

Kusion consumes the declarative configuration that describes the application, and delivers intent to the target runtime including Kubernetes, clouds, or on-prem infrastructure. In order to do that, we need a declarative model that can best describe the intent for a given application.

This design document elaborates on the core design considerations and a high-level architecture of the next-generation declarative application configuration model. The AppConfiguration model is expected to continuously iterate over time, with the purpose to better encapsulate the application configuration needs declaratively in its full lifecycle and reduce cognitive complexity as much as possible for the developers.

AppConfiguration consists of multiple elements that each represents a significant portion in the application lifecycle, either the application workload itself, its dependencies, relevant deployment workflows or operational expectations.

## Motivation

In AntGroup, we have heavily invested in the efforts to enable application delivery on a massive scale. What we have observed in the past few years is a trend of continuous evolution of infrastructure complexity over time, as a result of the increasing business needs.

We are motivated to find a new paradigm that highlights collaborations between different parts of the software organizations and enables self-service ability as much as possible to get to a mature level of standardization and efficiency in application delivery.

The centerpiece of this paradigm is a consistent, comprehensive and declarative application model that captures the application needs in an intuitive and self-explanatory way.

This paradigm will also require a core workflow that KusionStack advocates, an effort of retrofitting that workflow based on different organizational needs, a golden path that represents industry best practices, and a shift in organizational culture. We won't go into those details in this document.

## Design

### Core Principles

#### Developer First

The AppConfiguration model serves as the interface for the application developers. The model design should favor the perspective of application developers, rather than platform or infrastructure developers. The primary purpose of a unified and abstract application delivery model is to be able to define an application with concepts and semantics that are intuitive and easy for developers to understand, without the need for any advanced knowledge on infrastructure. The goal is to reduce the cognitive burden of application developers by hiding the increasing complexity of the underlying infrastructure, be it different clouds, runtimes, or product offerings.

Developers should be able to describe an application as simple as "I want a database of type X and version Y to go along my application".

#### Application-Centric

In practice, the end-to-end delivery of a production-grade application typically involves more than provisioning the computing resource and bootstrapping the workload. It also includes managing a variety of dependent resources the application workload depends on, such as networking, storage, database, middleware, monitoring and alerting, etc.

AppConfiguration proposes an application-centric approach, where the dependencies of an application can be kept together along with any operational (Day2) expectations. Everything the application needs to be production-available is captured inside a single, declarative source of truth centered around the AppConfiguration model. AppConfiguration should serve as the consistent and comprehensive abstraction of the application needs through its entire lifecycle.

#### Platform Agnostic

AppConfiguration should avoid locking into any specific tooling, technology stack or infrastructure providers. Kusion is built with the philosophy that benefits from an open and diverse ecosystem, where any infrastructure provider can be included in the form of plugins.

The design of AppConfiguration should emphasize separation of concern between the roles that write application business logic and those that manage platform level configurations. In the context of using public cloud, the AppConfiguration model should support multi-cloud deployment out-of-the-box. The configurations should be "Write Once Deploy Everywhere".

### Model Architecture

The AppConfiguration model consolidates all the necessary components and their dependent accessories for the application deployment, along with any workflow, policy and operational requirements into one standardized, infrastructure-independent declarative specification. This declarative specification represents the intuitive user intent for the application, which drives a standardized and efficient application delivery and operation process in a hybrid environment. This enables application developers the ability to self-service based on concepts and semantics that are intuitive and self-explanatory.

![appconfig.png](/img/docs/concept/appconfig.png)

AppConfiguration consists of five core concepts, namely `Components`, `Topologies`, `Pipeline`, `PolicySets`, and `Dependency`. We will walk through these concepts one by one.

### Core Concepts

#### Component

`Components` defines the foundation of any application configuration. Generally speaking, we believe that a comprehensive application description should at least consist of a core deployable workload that is frequently iterated and a collection of any other core services that the workload depends on, such as databases, caches or any other cloud services.

Components are conceptually split into two categories, `Workload` and `Accessories`. The former revolves around the configuration for the computing resource. The latter represents any third-party runtime capabilities and operational requirements that the application needs. Each AppConfiguration consists of exactly one workload and any number of accessories.

Simply put, we can define `Components` with the following expression:

`Components = Workload + Accessories`

The concept of `Components` and `Accessories` itself is implicit when [authoring the configuration files](../config-walkthrough/overview). You can define the workload and any type of accessories (such as database or monitoring) directly under the AppConfiguration model.

From a collaboration perspective, platform developers and SREs are responsible for continuously adding any new schema (as abstractions for the underlying infrastructure) and implementations that can be used out-of-the-box. Application developers SREs should be able to leverage the corresponding schemas to cover the evolving application needs. This helps software organizations achieve separation of concern, so that different roles can focus on the subject matter they are an expert of.

#### Pipeline

In most of the cases, the platform is capable of providing a consistent application delivery process that can meet most application needs. In the case that an application warrants any customization in the delivery workflow, the `Pipeline` section in AppConfiguration provides an approach to extend the workflow as needed. 

A typical delivery workflow is made of several stages, each corresponds to some logic that needs to be executed, such as manual approval, data transfer, coordinated multi-cluster release, notification, etc. Implementation-wise, the execution of each stage should be carried out with a plugin, developed and managed by the platform owners.

#### Topologies

In reality, what we have observed for production-grade applications is that they usually need to be deployed to a wide range of different targets including different clouds, regions, availability zones or runtimes for availability/cost/regulation/performance or disaster recovery related reasons. The `Topologies` section in AppConfiguration highlights the different deployment targets in the application delivery and provides a single pane of glass that overlooks the entire deployment topology.

#### PolicySets

The `PolicySets` section is responsible for defining the set of rules and procedures that should be followed in the application delivery process. They generally represent the guidelines with the purpose of minimizing any technical, security or compliance risks. Some of examples include release strategies, risk management policies, and self-healing strategies. The collections of policies are expected to be managed as a joint effort from all the stakeholders, including platform owners, infrastructure owners, and security and compliance stakeholders. Some policy sets (usually security and compliance related) are expected to be mandatory. Some can be switched on and off by the application owner (self-healing strategy for instance) depending on their specific needs.

#### Dependency

In a production-scale environment, there are usually intricate dependencies between multiple applications. The `Dependency` section is responsible for describing the dependencies between multiple applications.

## References

1. Score - https://docs.score.dev/docs/overview/
2. Acornfile - https://docs.acorn.io/authoring/overview
3. KubeVela - https://kubevela.io/docs/getting-started/core-concept
