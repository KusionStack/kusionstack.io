# Kusion Module

A Kusion module is a reusable building block designed by platform engineers to standardize application deployments and enable app developers to self-service. It consists of two parts:

- App developer-oriented schema: It is a [KCL schema](https://kcl-lang.io/docs/user_docs/guides/schema-definition/). Fields in this schema are recommended to be understandable to application developers and workspace-agnostic. For example, a database Kusion module schema only contains fields like database engine type and database version.
- Kusion module generator: It is a piece of logic that generates the Intent with an instantiated schema mentioned above, along with platform configurations ([workspace](workspace)). As a building block, Kusion module hides the complexity of infrastructures. A database Kusion module not only represents a cloud RDS, but it also contains logic to configure other resources such as security groups and IAM policies. Additionally, it seamlessly injects the database host address, username, and password into the workload's environment variables. The generator logic can be very complex in some situations so we recommend implementing it in a GPL like [go](https://go.dev/).

![kusion-module](/img/docs/concept/kusion-module.png)