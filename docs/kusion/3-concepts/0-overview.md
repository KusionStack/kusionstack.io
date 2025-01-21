---
id: overview
---

# Overview

## Platform Orchestrator

![platform orchestrator](/img/docs/concept/platform-orchestrator.png)

A Platform Orchestrator is a system designed to capture and "orchestrate" intents from different configurations coming from different roles, and connecting them with different infrastructures. It serves as the glue for different intents throughout the software development lifecycle, from deployment to monitoring and operations, ensuring that users' intentions can seamlessly integrate and flow across different environments and infrastructures.

## Kusion Workflow

In this section, we will provide an overview of the core concepts of Kusion from the perspective of the Kusion workflow. 

![kusion workflow](/img/docs/concept/kusion_workflow.png)

The workflow of Kusion is illustrated in the diagram above, which consists of three steps. 

The first step is **Write**, where the platform engineers build the [Kusion Modules](./3-module/1-overview.md) and initialize a [Workspace](./4-workspace/1-overview.md). And the application developers declare their operational intent in [AppConfiguration](./5-appconfiguration.md) under a specific [Project](./1-project/1-overview.md) and [Stack](./2-stack/1-overview.md) path. 

The second step is the **Generate** process, which results in the creation of the **SSoT** (Single Source of Truth), also known as the [Spec](./6-spec.md) of the current operation. Kusion stores and version controls the Spec as part of a [Release](./8-release.md).

The third step is **Apply**, which makes the `Spec` effective. Kusion parses the operational intent based on the `Spec` produced in the previous step. Before applying the `Spec`, Kusion will execute the `Preview` command (you can also execute this command manually) which will use a three-way diff algorithm to preview changes and prompt users to make sure all changes meet their expectations. And the `Apply` command will then actualize the operation intent onto various infrastructure platforms, currently supporting **Kubernetes**, **Terraform**, and **On-Prem** infrastructures. A [Release](./8-release.md) file will be created in the [Storage Backend](./7-backend/1-overview.md) to record an operation. The `Destroy` command will delete the resources recorded in the `Release` file of a project in a specific workspace. 

A more detailed demonstration of the Kusion engine can be seen below. 

![kusion engine](/img/docs/concept/kusion_engine.png)