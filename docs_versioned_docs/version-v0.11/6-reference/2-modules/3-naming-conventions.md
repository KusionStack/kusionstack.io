---
id: naming-conventions
sidebar_label: Resource Naming Conventions
---

# Resource Naming Conventions

Kusion will automatically create Kubernetes or Terraform resources for the applications, many of which do not require users' awareness. This document will introduce the naming conventions for these related resources. 

## Kubernetes Resources

Kusion adheres to specific rules when generating the Kubernetes resources for users' applications. The table below lists some common Kubernetes resource naming conventions. Note that `Namespace` can now be specified by users. 

| Resource | Concatenation Rule | Example ID |
| -------- | ------------------ | ---------- |
| Namespace | `<PROJECT_NAME>` | v1:Namespace:wordpress-local-db |
| Deployment | `<PROJECT_NAME>`-`<STACK_NAME>`-`<APP_NAME>` | apps/v1:Deployment:wordpress-local-db:wordpress-local-db-dev-wordpress |
| CronJob | `<PROJECT_NAME>`-`<STACK_NAME>`-`<APP_NAME>` | batch/v1:CronJob:helloworld:helloworld-dev-helloworld |
| Service | `<PROJECT_NAME>`-`<STACK_NAME>`-`<APP_NAME>`-`<public> or <private>` | v1:Service:helloworld:helloworld-dev-helloworld-public |

## Terraform Resources

Similarly, Kusion also adheres to specific naming conventions when generating the Terraform Resources. Some common resources are listed below. 

| Resource | Concatenation Rule | Example ID |
| -------- | ------------------ | ---------- |
| random_password | `<DATABASE_NAME>`-`<DATABASE_TYPE>` | hashicorp:random:random_password:wordpress-db-mysql |
| aws_security_group | `<DATABASE_NAME>`-`<DATABASE_TYPE>` | hashicorp:aws:aws_security_group:wordpress-db-mysql |
| aws_db_instance | `<DATABASE_NAME>` | hashicorp:aws:aws_db_instance:wordpress-db |
| alicloud_db_instance | `<DATABASE_NAME>` | aliyun:alicloud:alicloud_db_instance:wordpress-db |
| alicloud_db_connection | `<DATABASE_NAME>` | aliyun:alicloud:alicloud_db_connection:wordpress |
| alicloud_rds_account | `<DATABASE_NAME>` | aliyun:alicloud:alicloud_rds_account:wordpress |

The `<DATABASE_NAME>` is composed of two parts, one of which is the `key` of database declared in `AppConfiguration` and the other is the `suffix` declared in `workspace` configuration. Kusion will concatenate the database key and suffix, convert them to uppercase, and replace `-` with `_`. And the `<DATABASE_TYPE>` supported now includes `mysql` and `postgres`. 
