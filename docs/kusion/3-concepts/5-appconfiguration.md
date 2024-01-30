---
id: app-configuration
sidebar_label: AppConfiguration
---

# AppConfiguration

As a modern cloud-native application delivery toolchain, declarative intent-based actuation is the central idea of Kusion, and `AppConfiguration` model plays the role of describing the intent, which provides a simpler path for on-boarding developers to the platform without leaking low level details in runtime infrastructure and allows developers to fully focus on the application logic itself.

The `AppConfiguration` model consolidates workload and their dependent accessories for the application deployment, along with any pipeline and operational requirements into one standardized, infrastructure-independent declarative specification. This declarative specification represents the intuitive user intent for the application, which drives a standardized and efficient application delivery and operation process in a hybrid environment.

![appconfig.png](/img/docs/concept/appconfig.png)

AppConfiguration consists of four core concepts, namely `Workload`, `Accessory`, `Pipeline`, and `Dependency`. We will walk through these concepts one by one.

#### Workload

Workload is a representation of the business logic that runs in the cluster. Common workload types include long-running services that should “never” go down and batch jobs that take from a few seconds to a few days to complete. A valid AppConfiguration instance must include at least one Workload, which is made of one or more containers, along with their configurations, such as the container image, environment variables, and resource requirements.

In most cases, a Workload is a backend service or the frontend of an Application. For example, in a micro-service architecture, each service would be represented by a distinct Workload. This allows developers to manage and deploy their code in a more organized and efficient manner.

#### Accessory

Using the analogy of a car, workload is the core engine of application, but only having the engine isn’t enough for the application to function properly. In most cases there must be other supporting parts for the workload to operate as intended. For those supporting parts we call them Accessory. Accessory refers to various runtime capabilities and operational requirements provided by the underlying infrastructure, such as database, network load-balancer, storage and so on.

From the perspective of team collaboration, the platform team should be responsible for creating and maintaining various accessory definitions, providing reusable building blocks out-of-the-box. Application developers just need to leverage the existing accessories to cover the evolving application needs. This helps software organizations achieve separation of concern, so that different roles can focus on the subject matter they are an expert of.

#### Pipeline

Running reliable applications requires reliable delivery pipelines. By default, Kusion provides a relatively fixed built-in application delivery pipeline, which should be sufficient for most use cases. However, as the application scale and complexity grows, so does the need for a customizable delivery pipeline. Developers wish for more fine-tuned control and customization over the workflow to delivery their applications. That’s why we introduced the Pipeline section in AppConfiguration model.

A customized delivery pipeline is made of several steps, each corresponds to an operation that needs to be executed, such as running certain tests after a deployment, scanning artifacts for vulnerabilities prior to a deployment, and so on. Implementation-wise, the execution of each step should be carried out in the form of a plugin, developed and managed by the platform owners.

#### Topologies

Application dependencies refer to the external services or other software that an application relies on in order to function properly. These dependencies may be required in order to provide certain functionality or to use certain features in the application.

Similar to declaring a dependency from an application to an accessory, AppConfiguration lets you declare the dependencies between different applications in the same way.
