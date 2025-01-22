---
id: overview
title: Overview
slug: /
---

# Overview

Welcome to Kusion! This introduction section covers what Kusion is, the Kusion workflow, and how Kusion compares to other software. If you just want to dive into using Kusion, feel free to skip ahead to the [Getting Started](getting-started/install-kusion) section.

## What is Kusion?

Kusion is an intent-driven [Platform Orchestrator](https://internaldeveloperplatform.org/platform-orchestrators/), which sits at the core of an [Internal Developer Platform (IDP)](https://internaldeveloperplatform.org/what-is-an-internal-developer-platform/). With Kusion you can enable app-centric development, your developers only need to write a single application specification - [AppConfiguration](https://www.kusionstack.io/docs/concepts/app-configuration). [AppConfiguration](https://www.kusionstack.io/docs/concepts/app-configuration) defines the workload and all resource dependencies without needing to supply environment-specific values, Kusion ensures it provides everything needed for the application to run.

Kusion helps app developers who are responsible for creating applications and the platform engineers responsible for maintaining the infrastructure the applications run on. These roles may overlap or align differently in your organization, but Kusion is intended to ease the workload for any practitioner responsible for either set of tasks.

![arch](https://raw.githubusercontent.com/KusionStack/kusion/main/docs/overview.jpg)


## How does Kusion work?

As a Platform Orchestrator, Kusion enables you to address challenges often associated with Day 0 and Day 1. Both platform engineers and application engineers can benefit from Kusion.

There are two key workflows for Kusion:

1. **Day 0 - Set up the modules and workspaces:** Platform engineers create shared modules for deploying applications and their underlying infrastructure, and workspace definitions for target landing zone. These standardized, shared modules codify the requirements from stakeholders across the organization including security, compliance, and finance.

	Kusion modules abstract the complexity of underlying infrastructure tooling, enabling app developers to deploy their applications using a self-service model.
	
	<div align="center">

	![workflow](https://raw.githubusercontent.com/KusionStack/kusion/main/docs/platform_workflow.jpg)
	</div>
	
2. **Day 1 - Set up the application:** Application developers leverage the workspaces and modules created by the platform engineers to deploy applications and their supporting infrastructure. The platform team maintains the workspaces and modules, which allows application developers to focus on building applications using a repeatable process on standardized infrastructure.

	<div align="center">

	![workflow](https://raw.githubusercontent.com/KusionStack/kusion/main/docs/app_workflow.jpg)
	</div>

## Kusion Highlights

* **Platform as Code**

	Specify desired application intent through declarative configuration code, drive continuous deployment with any CI/CD systems or GitOps to match that intent. No ad-hoc scripts, no hard maintain custom workflows, just declarative configuration code.

* **Dynamic Configuration Management**

	Enable platform teams to set baseline-templates, control how and where to deploy application workloads and provision accessory resources. While still enabling application developers freedom via workload-centric specification and deployment. 

* **Security & Compliance Built In**

	Enforce security and infrastructure best practices with out-of-box [base models](https://github.com/KusionStack/catalog), create security and compliance guardrails for any Kusion deploy with third-party Policy as Code tools. All accessory resource secrets are automatically injected into Workloads.

* **Lightweight and Open Model Ecosystem**

	Pure client-side solution ensures good portability and the rich APIs make it easier to integrate and automate. Large growing model ecosystem covers all stages in  application lifecycle, with extensive connections to various infrastructure capabilities. 

:::tip

**Kusion is an early project.** The end goal of Kusion is to boost [Internal Developer Platform](https://internaldeveloperplatform.org/) revolution, and we are iterating on Kusion quickly to strive towards this goal. For any help or feedback, please contact us in [Slack](https://github.com/KusionStack/community/discussions/categories/meeting) or [issues](https://github.com/KusionStack/kusion/issues).
