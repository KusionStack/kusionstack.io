# Mapping

In [Project & stack](/docs/user_docs/concepts/konfig#project--stack) section, we have already introduced the basics of `Project` and `Stack`.
A configuration library consists of Project, and the further logical isolation under Project is Stack. Each Project contains one or more Stack.
Project and Stack can choose the mapping relationship based on user needs.
For example, users can map an application to a Project, or map an operation and maintenance scenario to a Project,
such as site construction and operation and maintenance.
In this section, several best practices for mapping relationships are detailed.

## Cloud Native: Applications and Clusters

In the application-centric operation and maintenance system, applications are the core object of DevOps operation and maintenance.
In cloud-native scenarios, applications are usually deployed in Kubernetes clusters,
So you can map `Project` to applications and `Stack` to clusters.
An application's configuration is distinct within different clusters, the differentiated configuration is stored in each stack directory,
and the common configuration of all clusters is stored in the base directory.

| Concept | Mapping TO  |
| ------- | ----------- |
| Project | Application |
| Stack   | Cluster     |

## Single-tenancy: Applications and Environments

An application usually needs to be deployed to multiple environments, such as dev, test, and prod.
In a single-tenant scenario, a recommended practice is to map `Project` to applications and `Stack` to environments.

| Concept | Mapping To  |
| ------- | ----------- |
| Project | Application |
| Stack   | Environment |

## Multi-tenancy: Applications and Environments

In an application-centric operation and maintenance system in a multi-tenant scenario,
we recommend appending tenant information to the app's name.
The application name is unique among different tenants, that is,
`Project` is mapped to the unique application, `Project Name` is the unique name of all apps,
and `Stack` is mapped to the environment configuration of the unique app.

| Concept | Mapping To  |
| ------- | ----------- |
| Project | Application+Tenant |
| Stack   | Environment |
