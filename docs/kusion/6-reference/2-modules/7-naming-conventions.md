---
id: naming-conventions
sidebar_label: Naming Conventions
---

# Naming Conventions

## Kubernetes Resources

Kusion adheres to specific rules when generating the Kubernetes resources for users' applications. The table below lists some common Kubernetes resource naming conventions. 

| Resource | Concatenation Rule | Example ID |
| -------- | ------------------ | ---------- |
| Namespace | `project name` | v1:Namespace:wordpress |
| Deployment | `project name`-`stack name`-`app name` | apps/v1:Deployment:wordpress:wordpress-dev-wordpress |
| CronJob | `project name`-`stack name`-`app name` | batch/v1:CronJob:helloworld:helloworld-dev-helloworld |
| Service | `project name`-`stack name`-`app name`-`public`/`private` | v1:Service:helloworld:helloworld-dev-helloworld-public |

## Terraform Resources

Similarly, Kusion also adheres to specific naming conventions when generating the Terraform Resources. Some common resources are listed below. 

| Resource | Concatenation Rule | Example ID |
| -------- | ------------------ | ---------- |
| random_password | `app name`-`db` | hashicorp:random:random_password:wordpress-db |
| aws_security_group | `app name`-`db` | hashicorp:aws:aws_security_group:wordpress-db |
| aws_db_instance | `app name` | hashicorp:aws:aws_db_instance:wordpress |
| alicloud_db_instance | `app name` | aliyun:alicloud:alicloud_db_instance:wordpress |
| alicloud_db_connection | `app name` | aliyun:alicloud:alicloud_db_connection:wordpress |
| alicloud_rds_account | `app name` | aliyun:alicloud:alicloud_rds_account:wordpress |
