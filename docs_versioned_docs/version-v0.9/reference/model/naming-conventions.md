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

## Apply Options

Before applying the project, users may need to export some environment variables to specify the Provider information for provisioning cloud resources. The relevant environment variables are listed in the table below. 

| Environment Variable | Explanation | Example |
| -------------------- | ----------- | ------- |
| AWS_PROVIDER_REGION | The region where the aws provider provisions the resources | us-east-1 |
| AWS_ACCESS_KEY_ID | The access key for the aws provider to provision the resources |  |
| AWS_SECRET_ACCESS_KEY | The secret key for the aws provider to provision the resources |  |
| ALICLOUD_PROVIDER_REGION | The region where the alicloud provider provisions the resources | cn-beijing |
| ALICLOUD_ACCESS_KEY | The access key for the alicloud provider to provision the resources |  |
| ALICLOUD_SECRET_KEY | The secret key for the alicloud provider to provision the resources |  |

## Magic Variables

### Concept Explanation

**Magic variables** are preconfigured variables representing fundamental metadata or environment variables automatically generated and injected into the application container by Kusion, which are typically used for accessories such as databases. 

### List of Magic Variables

#### Sensitive Database Information

For sensitive information such as the **host address**, **username** and **password** for the database instance, Kusion will automatically inject them into the application container for users through environment variables. The relevant environment variables are listed in the table below. 

| Name | Explanation |
| ---- | ----------- |
| KUSION_DB_HOST | Host address for accessing the database instance |
| KUSION_DB_USERNAME | Account username for accessing the database instance |
| KUSION_DB_PASSWORD | Account password for accessing the database instance |
