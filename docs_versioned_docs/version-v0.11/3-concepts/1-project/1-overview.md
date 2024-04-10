---
sidebar_label: Overview
id: overview
---

# Overview

A project in Kusion is defined as any folder that contains a project.yaml file and is linked to a Git repository. Typically, the mapping between a project and a repository is 1:1, however, it is possible to have multiple projects connected to a single repository—for example, in the case of a monorepo. A project consists of one or more applications.

The purpose of the project is to bundle application configurations and refer to a Git repository. Specifically, it organizes logical configurations for internal components to orchestrate the application and assembles these configurations to suit different roles, such as developers and SREs, thereby covering the entire life cycle of application development.

From the perspective of the application development life cycle, the configuration delineated by the project is decoupled from the application code. It takes an immutable image as input, allowing users to perform operations and maintain the application within an independent configuration codebase.