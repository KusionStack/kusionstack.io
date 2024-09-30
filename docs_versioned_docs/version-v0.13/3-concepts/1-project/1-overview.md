---
sidebar_label: Overview
id: overview
---

# Overview

A project in Kusion is defined as a folder that contains a `project.yaml` file and is generally recommended to be linked to a Git repository. Typically, the mapping between a project and a repository is 1:1, however, it is possible to have multiple projects connected to a single repository — for example, in the case of a monorepo. A project consists of one or more applications.

The purpose of the project is to bundle application configurations there are relevant. Specifically, it organizes logical configurations for internal components to orchestrate the application and assembles these configurations to suit different roles, such as developers and SREs, thereby covering the entire lifecycle of application development.

From the perspective of the application development lifecycle, the configurations delineated by the project is decoupled from the application code. It takes an immutable image as input, allowing users to perform operations and maintain the application within an independent configuration codebase.