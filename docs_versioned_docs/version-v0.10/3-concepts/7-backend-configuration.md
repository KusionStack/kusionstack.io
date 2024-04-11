---
id: backend-configuration
sidebar_label: Backend Configuration
---

# Backend Configuration

The backend configuration defines the place where Kusion stores its `state` data file. By default, Kusion uses the `local` type of backend to store the state on the local disk. While for team collaboration projects, the state can be stored on a remote backend, such as `mysql`, `oss` and `s3` to allow multiple users access it. 

## Configuring State Backend

There are three ways to configure the backend:

- workspace configuration file
- environment variables
- command line parameters

### Workspace Configuration File

Users can configure the storage of the state with the `backends` block in the workspace file, where a map with the backend type as the key and the corresponding config items as the value to declare the backend configuration. Be attention, only one kind of backend type is allowed, more than one backend types are illegal.

The following gives an example of the backend configuration of `mysql`.

```yaml
backends:
  mysql:
    dbName: <your-db-name> 
    user: <your-user>
    password: <your-password>
    host: <your-host>
    port: <your-port>
```

### Environment Variables

For the sensitive information, Kusion supports configuring them by environment variables. Not all the configuration items are enabled, and the items differ from backend type. For example, users can configure mysql password by environment variable `KUSION_BACKEND_MYSQL_PASSWORD`.


### Command Line Parameters

Users can specify the type of backend with the option `--backend-type`, and configure the detailed information with `--backend-config` or `-C`, for instance: 

```shell
kusion apply --backend-type mysql -C dbName=<your-db-name> -C user=<your-user> -C password=<your-password> -C host=<your-host> -C port=<your-port>
```

### Configuration Combination

When more than one configuration methods are in use, Kusion will merge them to generate the whole backend configuration. Workspace configuration file, environment variables, command line parameter: the priority of these three configuration methods increases gradually. If there is no conflict of backend type, the latter will overlay the former by configuration items. If there is conflict of backend type, which only occurs between workspace configuration file and command line parameters, use the backend type specified by command line, and the configuration items from workspace are deprecated.

## Available Backend

- local
- mysql
- oss
- s3

### local

The `local` storage type stores the `state` on the local file system, which is suitable for local operations while not ideal for multi-user collaboration. 

There is no configuration items for `local` backend. When neither the workspace configuration file nor the command line parameters declare the backend configuration, Kusion by default uses the `local`.

### mysql

The `mysql` storage type stores the `state` into a **mysql database**.

```yaml
# workspace configuration file
backends:
  mysql:
    dbName: <your-db-name>
    user: <your-user>
    password: <your-password>
    host: <your-host>
    port: <your-port>
```

```bash
# environment variables
export KUSION_BACKEND_MYSQL_PASSWORD=<your-password>
```

```shell
# command line parameters
kusion apply --backend-type mysql -C dbName=<your-db-name> -C user=<your-user> -C password=<your-password> -C host=<your-host> -C port=<your-port>
```

* dbName - `required` the name of the database
* user - `required` the username of the database
* password - `required` the password of the database, support declaring by environment variable `KUSION_BACKEND_MYSQL_PASSWORD`
* host - `required` the access address for the database
* port - `required` the port of the database

Note that the table name in the database used by Kusion is **state**. Below is an example SQL statement for creating this table:

```sql
CREATE TABLE `state` (
   `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
   `tenant` varchar(100) DEFAULT NULL COMMENT 'tenant',
   `project` varchar(100) NOT NULL COMMENT 'project',
   `kusion_version` varchar(50) DEFAULT NULL COMMENT 'kusion version',
   `version` int(10) unsigned NOT NULL COMMENT 'current state format version，may upgrade in the future',
   `serial` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT 'modification times for state，can be used in concurrent control',
   `operator` varchar(100) DEFAULT NULL COMMENT 'last modifier',
   `resources` longtext DEFAULT NULL COMMENT 'state of the resources，json array',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'creation time',
   `modified_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
   `stack` varchar(100) DEFAULT NULL COMMENT 'stack',
   `cluster` varchar(100) DEFAULT NULL COMMENT 'logical isolation in a stack，usually clustername__cellname',
   PRIMARY KEY (`id`),
   UNIQUE KEY `uk_state_latest` (`tenant`, `project`, `stack`, `serial`, `cluster`),
   KEY `idx_tenant` (`tenant`),
   KEY `idx_project` (`project`),
   KEY `idx_kusion_version` (`kusion_version`),
   KEY `idx_version` (`version`),
   KEY `idx_create_time` (`create_time`),
   KEY `idx_modified_time` (`modified_time`),
   KEY `idx_stack` (`stack`),
   KEY `idx_cluster` (`cluster`)
);
```

### oss

The `oss` storage type stores the `state` on the **Alicloud Object Storage Service (OSS)**.

```yaml
# workspace configuration file
backends:
  oss:
    endpoint: <your-endpoint>
    bucket: <your-bucket>
    accessKeyID: <your-access-key-ID>
    access-key-secret: <your-access-key-secret>
```

```bash
# environment variables
export OSS_ACCESS_KEY_ID=<your-access-key-ID>
export OSS_ACCESS_KEY_SECRET=<your-access-key-secret>
```

```shell
# command line parameters
kusion apply --backend-type oss -C endpoint=<your-endpoint> -C bucket=<your-bucket> -C accessKeyID=<your-access-key-ID> -C accessKeySecret=<your-access-key-secret>
```

* endpoint - `required` specify the access endpoint for alicloud oss bucket
* bucket - `required` specify the name of the alicloud oss bucket
* accessKeyID - `required` specify the alicloud account accessKeyID, support declaring by environment variable `OSS_ACCESS_KEY_ID`
* accessKeySecret - `required` specify the alicloud account accessKeySecret, support declaring by environment variable `OSS_ACCESS_KEY_SECRET`

### s3

The `s3` storage type stores the `state` on the **AWS Simple Storage Service (S3)**.

```yaml
# workspace configuration file
backend: 
  s3:
    endpoint: <your-endpoint>
    bucket: <your-bucket>
    accessKeyID: <your-access-key-ID>
    access-key-secret: <your-access-key-secret>
    region: <your-region>
```

```bash
# environment variables
export AWS_ACCESS_KEY_ID=<your-access-key-ID>
export AWS_SECRET_ACCESS_KEY=<your-access-key-secret>
export AWS_REGION=<your-region>
```

```shell
# command line parameters
kusion apply --backend-type s3 -C endpoint=<your-endpoint> -C bucket=<your-bucket> -C accessKeyID=<your-access-key-ID> -C accessKeySecret=<your-access-key-secret> -C region=<your-region>
```

* endpoint - `optional` specify the access endpoint for aws s3 bucket
* bucket - `required` specify the name of the aws s3 bucket
* accessKeyID - `required` specify the aws account accessKeyID, support declaring by environment variable `AWS_ACCESS_KEY_ID`
* accessKeySecret - `required` specify the aws account accessKeySecret, support declaring by environment variable `AWS_SECRET_ACCESS_KEY`
* region - `required` specify the region of  aws s3 bucket, support declaring by environment variable `AWS_DEFAULT_REGION` or `AWS_REGION`
