# Overview

A Kusion module is a reusable building block designed by platform engineers to standardize application deployments and enable application developers to self-service. It consists of two parts:

- App developer-friendly schema: It is a [KCL schema](https://kcl-lang.io/docs/user_docs/guides/schema-definition/). Fields in this schema are recommended to be understandable to application developers and workspace-agnostic. For example, a database Kusion module schema only contains fields like database engine type and database version.
- Kusion module generator: It is a piece of logic that generates the [Spec](../6-specs.md) with an instantiated schema mentioned above, along with platform configurations managed in [workspaces](../4-workspace/1-overview.md). As the most fundamental building block, Kusion module provides the necessary abstraction to the developers by hiding the complexity of infrastructures. A database Kusion module not only represents a cloud RDS, but it also contains logic to configure other resources such as security groups and IAM policies. Additionally, it seamlessly injects the database host address, username, and password into the workload's environment variables. The generator logic can be very complex in some situations so we recommend implementing it in a GPL like [go](https://go.dev/).

Here are some explanations of the Kusion Module:

1. It represents an independent unit that provides a specific capability to the application with clear business semantics.
2. It may consist of one or multiple infrastructure resources (K8s/Terraform resources), but it is not merely a collection of unrelated resources. For instance, a database, monitoring capabilities, and network access are typical Kusion Modules.
3. Modules should not have dependencies or be nested within each other.
4. AppConfig is not a Module.
5. Kusion Module is a superset of [KPM](https://www.kcl-lang.io/docs/user_docs/guides/package-management/quick-start). It leverages the KPM to manage KCL schemas in the Kusion module.

![kusion-module](/img/docs/concept/kusion-module.png)