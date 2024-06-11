---
sidebar_label: Overview
id: overview
---

# Overview

A stack in Kusion is defined as a folder within the project directory that contains a `stack.yaml` file. Stacks provide a mechanism to isolate multiple sets of different configurations in the same project. It is also the smallest unit of operation that can be configured and deployed independently. 

The most common way to leverage stacks is to denote different phases of the software development lifecycle, such as `development`, `staging`, `production`, etc. For instance, in the case where the image and resource requirements for an application workload might be different across different phases in the SDLC, they can be represented by different stacks in the same project, namely `dev`, `stage` and `prod`.

To distinguish this from the deploy-time concept of a "target environment" - which Kusion defines as `workspaces`, **stack** is a development-time concept for application developers to manage different configurations. One way to illustrate the difference is that you can easily be deploying the `prod` stack to multiple target environments, for example, `aws-prod-us-east`, `aws-prod-us-east-2` and `azure-prod-westus`.

## High Level Schema

![High_Level_Schema](/img/docs/user_docs/concepts/high-level-schema.png)