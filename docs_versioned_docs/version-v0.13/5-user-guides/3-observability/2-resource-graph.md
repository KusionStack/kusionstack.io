---
id: resource-graph
---

# Resource Graph

Kusion provides a powerful feature to visualize the relationships and dependencies between kusion `resources` using a resource graph. This feature offers several key benefits:

- Comprehensive Visualization: The resource graph offers a clear, visual representation of your entire infrastructure, allowing you to see all resources and their interconnections at a glance. It includes detailed information about each cloud resource, such as its type, name, and unique identifiers, making it easier to locate and manage resources in your cloud environment.

- Dependency Tracking: It helps you understand how resources are linked, making it easier to identify potential impacts when making changes to your infrastructure.

- Troubleshooting Aid: When issues arise during the `apply` operation, the resource graph becomes an invaluable tool for pinpointing the source of problems. It provides a clear visual representation of resource relationships and their current status. This comprehensive view significantly reduces debugging time and enhances your ability to maintain a stable and efficient infrastructure.

- Visual Documentation: The resource graph provides a clear, up-to-date visual representation of your infrastructure. It automatically updates as changes occur,providing a clear and current representation of your resource
landscape. It improves team understanding and communication about the infrastructure setup.

This feature empowers you to gain a comprehensive and intuitive understanding of your infrastructure's architecture, enabling more efficient troubleshooting and decision-making.

## Prerequisites

Please refer to the [Deliver the WordPress Application with Cloud RDS](../1-cloud-resources/1-database.md) in the guide for deploying an application.

This guide will assume that you have already deployed an application following the guide.

## Display Resource Graph

To display a resource graph, you need to run the following command with project name specified:

```bash
kusion resource graph --project wordpress-rds-cloud
```

The output will be a resource graph in the terminal:

```shell
Displaying resource graph in the project wordpress-rds-cloud...

Workspace: demo

Workload Resources:
ID                                                      Kind                           Name                           CloudResourceID                Status
apps/v1:Deployment:wordpress-rds-cloud:wordpress-rds-cl Kubernetes:apps/v1:Deployment  wordpress-rds-cloud/wordpress-                                Apply succeeded | Reconciled
oud-dev-wordpress                                                                      rds-cloud-dev-wordpress

Dependency Resources:
ID                                                      Kind                           Name                           CloudResourceID                Status
v1:Secret:wordpress-rds-cloud:wordpress-mysql-mysql     Kubernetes:v1:Secret           wordpress-rds-cloud/wordpress-                                Apply succeeded | Reconciled
                                                                                       mysql-mysql
v1:Service:wordpress-rds-cloud:wordpress-rds-cloud-dev- Kubernetes:v1:Service          wordpress-rds-cloud/wordpress-                                Apply succeeded | Reconciled
wordpress-private                                                                      rds-cloud-dev-wordpress-privat
                                                                                       e
v1:Namespace:wordpress-rds-cloud                        Kubernetes:v1:Namespace        wordpress-rds-cloud                                           Apply succeeded | Reconciled

Other Resources:
ID                                                      Kind                           Name                           CloudResourceID                Status
aliyun:alicloud:alicloud_db_connection:wordpress-mysql  alicloud:alicloud_db_connectio wordpress-mysql                rm-2zer0f93xy490fdzq:rm-2zer0f Apply succeeded | Reconciled
                                                        n                                                             93xy490fdzqtf
aliyun:alicloud:alicloud_db_instance:wordpress-mysql    alicloud:alicloud_db_instance  wordpress-mysql                rm-2zer0f93xy490fdzq           Apply succeeded | Reconciled
aliyun:alicloud:alicloud_rds_account:wordpress-mysql    alicloud:alicloud_rds_account  wordpress-mysql                rm-2zer0f93xy490fdzq:root      Apply succeeded | Reconciled
hashicorp:random:random_password:wordpress-mysql-mysql  custom:random_password                                                                       Apply succeeded
```

The resource graph output provides a comprehensive overview of the resources in your project. Let's break down each field:

- ID: This is a unique identifier for each resource.

- Kind: This field indicates the type of resource.

- Name: This is the name of the resource within its namespace or scope.

- CloudResourceID: For cloud resources, this field shows the unique identifier assigned by the cloud provider. For Kubernetes resources, this field is often empty.

- Status: This field shows the current state of the resource. Common statuses include:
  - "Apply succeeded | Reconciled": The resource has been successfully created and is in sync with the desired state.
  - "Apply succeeded | Reconcile failed": The resource has been successfully created, but the resource is not in sync with the desired state.
  - "Apply succeeded": The `apply` operation has completed, but the resource might not in sync with the desired state.
  - "Apply failed": The `apply` operation has failed.

The graph is divided into three sections:

1. Workload Resources: These are the main application components, such as Kubernetes Deployments.

2. Dependency Resources: These are resources that the workload depends on, such as Kubernetes Secrets, Services, and Namespaces.

3. Other Resources: This section includes additional resources, often cloud provider-specific, such as database instances and connections.

This graph gives you a clear view of all the resources in your project, their types, names, cloud identifiers (if applicable), and current status. It's particularly useful for understanding the structure of your application and its dependencies, as well as for troubleshooting and ensuring all resources are in the expected state.
