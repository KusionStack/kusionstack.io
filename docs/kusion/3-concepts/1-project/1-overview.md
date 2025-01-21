---
sidebar_label: Overview
id: overview
---

# Overview

Projects, [Stacks](../2-stack/1-overview.md), [Modules](../3-module/1-overview.md) and [Workspaces](../4-workspace/1-overview.md) are the most pivotal concepts when using Kusion.

A project in Kusion is defined as a folder that contains a `project.yaml` file and is generally recommended to be stored to a Git repository. There are generally no constraints on where this folder may reside. In some cases it can be stored in a large monorepo that manages configurations for multiple applications. It could also be stored either in a separate repo or alongside the application code. A project can logically consist of one or more applications.

The purpose of the project is to bundle application configurations that are relevant. Specifically, it contains configurations for internal components that makes up the application and orchestrates these configurations to suit different roles, such as developers and SREs, thereby covering the entire lifecycle of application deployment.

From the perspective of the application development lifecycle, the configurations delineated by the project is decoupled from the application code. It takes an immutable application image as input, allowing users to perform operations and maintain the application within an independent configuration codebase.