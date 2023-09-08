---
id: naming-conventions
sidebar_label: 命名规则
---
# 命名规则

## Kubernetes 资源

Kusion 在为用户的应用生成 Kubernetes 资源时遵循特定的命名规则，下表列出了一些常见的 Kubernetes 资源命名规范。

| 资源 | 拼接规则 | 示例资源 ID |
| --- | ------- | ---------- |
| Namespace | `project name` | v1:Namespace:wordpress |
| Deployment | `project name`-`stack name`-`app name` | apps/v1:Deployment:wordpress:wordpress-dev-wordpress |
| CronJob | `project name`-`stack name`-`app name` | batch/v1:CronJob:helloworld:helloworld-dev-helloworld |
| Service | `project name`-`stack name`-`app name`-`public`/`private` | v1:Service:helloworld:helloworld-dev-helloworld-public |

## Terraform 资源

类似地，Kusion 在生成 Terraform 资源时也遵循特定的命名规则，下表列出了一些常见的 Terraform 资源命名规范。

| 资源 | 拼接规则 | 示例资源 ID |
| --- | ------- | ---------- |
| random_password | `app name`-`db` | hashicorp:random:random_password:wordpress-db |
| aws_security_group | `app name`-`db` | hashicorp:aws:aws_security_group:wordpress-db |
| aws_db_instance | `app name` | hashicorp:aws:aws_db_instance:wordpress |
| alicloud_db_instance | `app name` | aliyun:alicloud:alicloud_db_instance:wordpress |
| alicloud_db_connection | `app name` | aliyun:alicloud:alicloud_db_connection:wordpress |
| alicloud_rds_account | `app name` | aliyun:alicloud:alicloud_rds_account:wordpress |

## Apply 选项

在 Apply 应用之前，用户可能需要导入一些环境变量来指定云资源的 Provider 信息，下表列出了相关的环境变量。

| 环境变量 | 说明 | 示例 |
| ------- | --- | ---- |
| AWS_PROVIDER_REGION | AWS Provider 生效资源所在区域 | us-east-1 |
| AWS_ACCESS_KEY_ID | AWS Provider 生效资源使用的 Access Key |  |
| AWS_SECRET_ACCESS_KEY | AWS Provider 生效资源使用的 Secret Key |  |
| ALICLOUD_PROVIDER_REGION | 阿里云 Provider 生效资源所在区域 | cn-beijing |
| ALICLOUD_ACCESS_KEY | 阿里云 Provider 生效资源使用的 Access Key |  |
| ALICLOUD_SECRET_KEY | 阿里云 Provider 生效资源使用的 Secret Key |  |

## 魔术变量

### 概念说明

**魔术变量**是 Kusion 预置的变量，代表了基础元数据，或由 Kusion 自动生成并注入到应用容器中的环境变量，通常可用于使用数据库等配件。

### 魔术变量列表

#### 数据库敏感信息

对于数据库实例的**连接地址**、**用户名**和**密码**等敏感信息，Kusion 将通过环境变量自动将它们注入到用户的应用容器中，相关环境变量如下表所示。

| 环境变量名 | 说明 |
| --------- | --- |
| KUSION_DB_HOST | 数据库实例的连接地址 |
| KUSION_DB_USERNAME | 数据库实例用户名 |
| KUSION_DB_PASSWORD | 数据库实例密码 |
