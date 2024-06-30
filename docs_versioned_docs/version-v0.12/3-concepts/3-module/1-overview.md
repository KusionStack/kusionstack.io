# Overview

A Kusion module is comprised of a set of configuration schemas based on Domain-Specific Language (DSL), e.g. KCL, along with an associated Golang program which is utilized to translate the configuration code into our unified Spec data format. Kusion modules are generally created and managed by the Platform Team.

Kusion modules enables **separation of concerns** between platform teams and application developers through [Dynamic Configuration Management](https://internaldeveloperplatform.org/core-components/application-configuration-management/). Application developers describe their app and dependent resources (Mongo Database, Redies Cache, etc.) through these declarative configuration schemas, and platform teams codify their opinions about when and how these resources should be deployed and configured (lightweight containers, Azure resources, AWS resources, etc.). When an application developer deploys their application and its resources, Kusion modules automatically deploy the backing infrastructure and connect it to the developer’s resources. 

Kusion modules are distributed as OCI artifacts that can be cryptographically signed and verified. Modules are versioned using strict semantic versioning, the version of a module is used as the OCI artifact tag.

To learn more about modules, please see the module documentation.

![kusion-module](/img/docs/concept/kusion-module.png)