---
sidebar_position: 1
sidebar_label: Overview
title: Overview
slug: /
---

# Introduction to Kusion

Welcome to Kusion! This introduction section covers what Kusion is, the problem Kusion aims to solve, and how Kusion compares to other software. If you just want to dive into using Kusion, feel free to skip ahead to the [Getting Started](kusion/getting-started/install-kusion) section.

## What is Kusion?

Kusion is a modern application delivery and management toolchain that enables developers to specify desired intent in a declarative way and then using a consistent workflow to drive continuous deployment through application lifecycle. Inspired by the phrase **Fusion on Kubernetes**, Kusion aims to help application and platform developers to develop and deliver in a self-serviceable, fast, reliable, and collaborative way.


![](/img/docs/user_docs/intro/kusion.png)


## Why Kusion?

Developers should be able to deploy and run their applications and services end to end. **"You build it, you run it", the original promise of DevOps.**

But the modern day for most software organizations this promise quickly become unrelalistic since the increasingly complex cloud-native toolchains, while cloud native technologies made huge improvements in areas such as scalability, availability and operability, it also brings downside - the growing burden on developers, which leads to the rise of [Platform Engineering](https://platformengineering.org/).

Another challenge we saw is that a series of [antipatterns](https://web.devopstopologies.com/#anti-types) emerge when regular software organizations tries to implement true DevOps. Without well proven reference architecture and supporting tools, it's much more difficult to accomplish the original promise.

On one hand, **Kusion was build to minimize developer's cognitive load**. With application-centric configuration model, you don't need to deal with tedious infrastructure and configuration management tooling, all you need to be familiar with is [AppConfigation](kusion/config-walkthrough/overview). This approach shields developers from the configurational complexity of Kubernetes but still enable standardization by design.

On the other hand, **Kusion defines a new way of how different engineering teams collaboration**. With the separation of concerns, different roles could focus on their work based on their knowledge and responsibility. Through such a division of labor, the platform team can better manage the differences and complexities of the platform, and app developers could participate in ops work with less cognitive load.

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

**Kusion is an early project.** The end goal of Kusion is to boost [Internal Developer Platform](https://internaldeveloperplatform.org/) revolution and we are iterating on Kusion quickly to strive towards this goal. For any help or feedback, please contract us in [Slack](https://github.com/KusionStack/community/discussions/categories/meeting) or [issues](https://github.com/KusionStack/kusion/issues).
