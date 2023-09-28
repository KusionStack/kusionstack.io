---
sidebar_position: 2
---

import TOCInline from '@theme/TOCInline';

# Glossary

This page lists and defines technical terms that are widely used across KusionStack. Words such as `Project`, `Stack`, etc. can be overloaded in the technical community, so this page attempts to clarify their meaning in the context of KusionStack.

<TOCInline
  // Only show h2 and h4 headings
  toc={toc.filter((node) => node.level === 2 || node.level === 4)}
  minHeadingLevel={2}
  // Show h4 headings in addition to the default h2 and h3 headings
  maxHeadingLevel={4}
/>

## Project

A project in Kusion is any folder which contains a `project.yaml` file and is linked to a Git repository. Usually the mapping between project and repository is 1:1, also you can have multiple projects connected to a single repository (for example, a monorepo). And a project is composed of one or more applications.

The purpose of the "project" is to bundle application configurations and a refer to Git repository. Specifically, it includes logical configurations for internal pieces to orchestrate the application, and it bundles these configurations in a way to fit different roles, e.g. developer, SRE, to cover the whole life-cycle of application development.

From the perspective of the application development life cycle, the configuration described by the project is decoupled from the application code, takes the immutable image as input, and users could conduct the operation, and maintenance of the application in an independent configuration code base.

## Stack

A stack in Kusion is any folder which contains a `stack.yaml` file under belonging project directory. Stack provides a mechanism to isolate multiple deploys of same application, it's the target workspace that an application will be deployed to, also the the smallest operation unit that can be configured and deployed independently. Stacks are commonly used to denote different phases of software development lifecycle e.g. development, staging, and production.

A project can have as many stacks as you need. By default, Kusion creates a default stack for you when you start a new project using the kusion init command.

Stacks let's you chose on which cluster your applications will be deployed to.

## Application

An application in Kusion is declared using the `AppConfiguration` schema and represents a basic unit that is deployed. 

You can create multiple applications within a single project so they can share common configurations. This can be useful if you have several applications that are closely related, such as a backend system for content management and a frontend system for content delivery and display.

## High Level Schema

![High_Level_Schema](/img/docs/user_docs/concepts/high-level-schema.png)




