---
id: overview
---

# Overview

In this article, we will provide an overview of the core concepts of Kusion from the perspective of the Kusion workflow. 

![kusion workflow](/img/docs/concept/kusion_workflow.png)

The workflow of Kusion is illustrated in the diagram above, which consists of three steps. 

The first step is **Write**, where the platform engineers build the [Kusion Modules](./3-module/1-overview.md) and initialize a [Workspace](./4-workspace.md). And the application developers declare their operational intent in [AppConfiguration](./5-appconfiguration.md) under a specific [Project](./1-project/1-overview.md) and [Stack](./2-stack/1-overview.md) path. 

The second step is the **Build** process, which results in the creation of the **SSoT** (Single Source of Truth), also known as the [Spec](./6-spec.md) of the current operational task. If you need version management of the SSoT, we recommend you manage the `Spec` with a VCS (Version Control System) tool like **Git**. 

The third step is **Apply**, which makes the `Spec` effective. Kusion parses the operational intent based on the `Spec` produced in the previous step. Before applying the `Spec`, Kusion will execute the `Preview` command (you can also execute this command manually) which will use a three-way diff algorithm to preview changes and prompt users to make sure all changes meet their expectations. And the `Apply` command will then actualize the operation intent onto various infrastructure platforms, currently supporting **Kubernetes**, **Terraform**, and **On-Prem** infrastructures. A [Release](./9-release.md) file will be created in the [Storage Backend](./7-backend.md) to record an operation. The `Destroy` command will delete the resources recorded in the `Release` file of a project in a specific workspace. 

A more detailed demonstration of the Kusion engine can be seen below. 

![kusion engine](/img/docs/concept/kusion_engine.png)