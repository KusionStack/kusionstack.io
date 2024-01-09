# Backend Configuration

The backend configuration defines the place where Kusion stores its `state` data file. By default, Kusion uses the `local` type of backend to store the state on the local disk, while for team collaboration projects, the state can be stored on a `remote` type of backend, such as `database`, `oss` and `s3` to allow multiple users access it. 

## Configuring State Backend

Kusion configures the storage of state through command line parameters or the `backend` field in the `project.yaml` file. 

### Command Line Parameters

Users can specify the type of backend with the option `--backend-type`, and configure the detailed information with `--backend-config` or `-C`, for instance: 

```shell
kusion apply --backend-type local --backend-config path=kusion_state.json
```

```shell
kusion destroy --backend-type local --backend-config path=kusion_state.json
```

### Configuration File

Users can configure the storage of the state with the `backend` field in the `project.yaml` file: 

```yaml
# project.yaml
backend: 
    storageType: local
    config: 
        path: kusion_state.json
```

In this case, `storageType` is used to declare the type of storage for the state backend, and `config` is used to declare the required parameters for the corresponding storage type. 

### Configuration Combination

When both of the `config` field in the `project.yaml` and the `--backend-config` option in the command line are configured, Kusion will merge the entire configuration, combining both the `project.yaml` file and the command line options. When there comes a conflict between the options in the `project.yaml` file and the command line, the options in the **command line** will take precedence. This way, users can pass the sensitive information like `accessKeyID` and `accessKeySecret` to Kusion through command line parameters. 

## Available Backend

- local
- oss
- s3
- db

### Default Backend

When neither the `project.yaml` file nor the command line parameters declare the backend configuration, Kusion by default uses the [local](#local). 

### local

The `local` storage type stores the `state` on the local file system, which is suitable for local operations while not ideal for multi-user collaboration. 

Here is an example: 

```yaml
# project.yaml
backend: 
    storageType: local
    config: 
        path: kusion_state.json
```

* storageType - local, using local file system to store the state
* path - `optional` specify the local file path to store the state

### oss

The `oss` storage type stores the `state` on the **Alicloud Object Storage Service (OSS)**. 

Here is an example: 

```yaml
# project.yaml
backend:
    storageType: oss
    config: 
        endpoint: oss-cn-beijing.aliyuncs.com
        bucket: kusion-oss
```
```shell
kusion apply -C accessKeyID=******* -C accessKeySecret=*******
```
```shell
kusion destroy -C accessKeyID=******* -C accessKeySecret=*******
```

* storageType - oss, using alicloud oss as the storage backend for state
* endpoint - `required` specify the access endpoint for alicloud oss bucket
* bucket - `required` specify the name of the alicloud oss bucket
* accessKeyID - `required` specify the alicloud account accessKeyID
* accessKeySecret - `required` specify the alicloud account accessKeySecret

### s3

The `s3` storage type stores the `state` on the **AWS Simple Storage Service (S3)**. 

Here is an example: 

```yaml
# project.yaml
backend: 
    storageType: s3
    config: 
        endpoint: s3.us-east-1.amazonaws.com
        bucket: kusion-s3
        region: us-east-1
```
```shell
kusion apply -C accessKeyID=******* -C accessKeySecret=*******
```
```shell
kusion destroy -C accessKeyID=******* -C accessKeySecret=*******
```

* storageType - s3, using aws s3 as the storage backend for state
* endpoint - `required` specify the access endpoint for aws s3 bucket
* bucket - `required` specify the name of the aws s3 bucket
* accessKeyID - `required` specify the aws account accessKeyID
* accessKeySecret - `required` specify the aws account accessKeySecret

### db

The `db` storage type stores the `state` into a **database**. 

Here is an example: 

```yaml
# project.yaml
backend: 
    storageType: db
    config: 
        dbHost: 127.0.0.1
        dbName: kusion-db
        dbPort: 3306
```
```shell
kusion apply -C dbUser=******* -C dbPassword=*******
```

* storageType - db, using database as the storage backend for state
* dbHost - `required` the access address for the database
* dbName - `required` the name of the database
* dbPort - `required` the port of the database
* dbUser - `required` the user name of the database
* dbPassword - `required` the password of the database

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
