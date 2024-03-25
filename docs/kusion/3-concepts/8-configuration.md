---
id: configuration
sidebar_label: Configuration
---

# Configuration

Kusion can be configured with some global settings, which are separate from the AppConfiguration written by the application developers and the workspace configurations written by the platform engineers. 

The configurations are only relevant to the Kusion itself, and can be managed by command `kusion config`. The configuration items are specified, which are in the hierarchical format with full stop for segmentation, such as `backends.current`. For now, only the backend configurations are included.

The configuration is stored in the file `${KUSION_HOME}/config.yaml`. For sensitive data, such as password, access key id and secret, setting them in the configuration file is not recommended, using the corresponding environment variables is safer.  

## Configuration Management

Kusion provides the command `kusion config`, and its sub-commands `get`, `list`, `set`, `unset` to manage the configuration. The usages are shown as below:

### Get a Specified Configuration Item

Use `kusion config get` to get the value of a specified configuration item, only the registered item can be obtained correctly. The example is as below.

```shell
# get a configuration item
kusion config get backends.current
```

### List the Configuration Items

Use `kusion config list` to list all the Kusion configurations, where the result is in the YAML format. The example is as below.

```shell
# list all the Kusion configurations
kusion config list
```

### Set a Specified Configuration Item

Use `kusion config set` to set the value of a specified configuration item, where the type of the value of is also determinate. Kusion supports `string`, `int`, `bool`, `array` and `map` as the value type, which should be conveyed in the following format through CLI.

- `string`: the original format, such as `local-dev`, `oss-pre`;
- `int`: convert to string, such as `3306`, `80`;
- `bool`: convert to string, only support `true` and `false`;
- `array`: convert to string with JSON marshal, such as `'["mysql","oss"]'`. To preserve the format, enclosing the string content in single quotes is a good idea, or there may be unexpected errors;
- `map`: convert to string with JSON marshal, such as `'{"path":"\etc"}'`.

Besides the type, some configuration items have more setting requirements. The configuration item dependency may exist, that is, a configuration item must be set after another item. And there may exist more restrictions for the configuration values themselves. For example, the valid keys for the map type value, the data range for the int type value. For detailed configuration item information, please refer to the following content of this article.

The example of setting configuration item is as blow.

```shell
# set a configuration item of type string
kusion config set backends.pre.type mysql

# set a configuration item of type int
kusion config set backends.pre.configs.port 3306

# set a configuration item of type map
kusion config set backends.prod `{"configs":{"bucket":"kusion"},"type":"s3"}`
```

### Unset a Specified Configuration Item

Use `kusion config unset` to unset a specified configuration item. Be attention, some items have dependencies, which must be unset in a correct order. The example is as below.

```shell
# unset a specified configuration item
kusion config unset backends.pre
```

## Backend Configurations

The backend configurations define the place to store Workspace, Spec and State files. Multiple backends and current backend are supported to set.

### Available Configuration Items

- **backends.current**: type `string`, the current used backend name. It can be set as the configured backend name. If not set, the default local backend will be used.
- **backends.{$name}**: type `map`, a total backend configuration, contains type and config items, whose format is as below. It can be unset when the backend is not the current.
```yaml
{
  "type": "${backend_type}", # type string, required, support local, mysql, oss, s3.
  "configs": ${backend_configs} # type map, optional for type local, required for the others, the specific keys depend on the type, refer to the description of backends.{$name}.configs.
}
```
- **backends.{$name}.type**: type `string`, the backend type, support `local`, `mysql`, `s3` and `oss`. It can be unset when the backend is not the current, and the corresponding `backends.{$name}.configs` are empty.
- **backends.{$name}.configs**: type `map`, the backend config items, whose format depends on the backend type and is as below. It must be set after `backends.{$name}.type`.
```yaml
# type local
{
  "path": "${local_path}" # type string, optional, the directory to store the files. If not set, use the default path ${KUSION_HOME}.
}

# type mysql
  {
    "dbName": "${mysql_db_name}", # type string, required, the database name.
    "user": "${mysql_user}", # type string, required, the database user.
    "password": "${mysql_password}", # type string, optional, the database password, which can be also obtained by environment variable KUSION_BACKEND_MYSQL_PASSWORD.
    "host": "${mysql_host}", # type string, required, the database host.
    "port": "${mysql_port}" # type string, optional, the database port. If not set, use the default port 3306.
  }

# type oss
  {
    "endpoint": "${oss_endpoint}", # type string, required, the oss endpoint.
    "accessKeyID": "${oss_access_key_id}", # type string, optional, the oss access key id, which can be also obtained by environment variable OSS_ACCESS_KEY_ID.
    "accessKeySecret": "${oss_access_key_secret}", # type string, optional, the oss access key secret, which can be also obtained by environment variable OSS_ACCESS_KEY_SECRET
    "bucket": "${oss_bucket}", # type string, required, the oss bucket.
    "prefix": "${oss_prefix}" # type string, optional, the prefix to store the files.
  }

  # type s3
  {
    "region": "${s3_region}", # type string, optional, the aws region, which can be also obtained by environment variables AWS_REGION and AWS_DEFAULT_REGION.
    "endpoint": "${s3_endpoint}", # type string, optional, the aws endpoint.   
    "accessKeyID": "${s3_access_key_id}", # type string, optional, the aws access key id, which can be also obtained by environment variable AWS_ACCESS_KEY_ID.
    "accessKeySecret": "${s3_access_key_secret}", # type string, optional, the aws access key secret, which can be also obtained by environment variable AWS_SECRET_ACCESS_KEY
    "bucket": "${s3_bucket}", # type string, required, the s3 bucket.
    "prefix": "${s3_prefix}" # type string, optional, the prefix to store the files.
  }
```
- **backends.{$name}.configs.path**: type `string`, the path of local type backend. It must be set after `backends.{$name}.type` and which must be `local`. 
- **backends.{$name}.configs.dbName**: type `string`, the database name of mysql type backend. It must be set after `backends.{$name}.type` and which must be `mysql`.
- **backends.{$name}.configs.user**: type `string`, the database user of mysql type backend. It must be set after `backends.{$name}.type` and which must be `mysql`. 
- **backends.{$name}.configs.password**: type `string`, the database password of mysql type backend. It must be set after `backends.{$name}.type` and which must be `mysql`. It can be also obtained by environment variable `KUSION_BACKEND_MYSQL_PASSWORD`.
- **backends.{$name}.configs.host**: type `string`, the database host of mysql type backend. It must be set after `backends.{$name}.type` and which must be `mysql`. 
- **backends.{$name}.configs.port**: type `int`, the database port of mysql type backend. It must be set after `backends.{$name}.type` and which must be `mysql`. If not set, the default value `3306` will be used.
- **backends.{$name}.configs.endpoint**: type `string`, the endpoint of oss or s3 type backend. It must be set after `backends.{$name}.type` and which must be `oss` or `s3`. 
- **backends.{$name}.configs.accessKeyID**: type `string`, the access key id of oss or s3 type backend. It must be set after `backends.{$name}.type` and which must be `oss` or `s3`. For `oss`, it can be also obtained by environment variable `OSS_ACCESS_KEY_ID`; while for s3, it is `AWS_ACCESS_KEY_ID`.
- **backends.{$name}.configs.accessKeySecret**: type `string`, the access key secret of oss or s3 type backend. It must be set after `backends.{$name}.type` and which must be `oss` or `s3`. For `oss`, it can be also obtained by environment variable `OSS_ACCESS_KEY_SECRET`; while for s3, it is `AWS_SECRET_ACCESS_KEY`.
- **backends.{$name}.configs.bucket**: type `string`, the bucket of oss or s3 type backend. It must be set after `backends.{$name}.type` and which must be `oss` or `s3`. 
- **backends.{$name}.configs.prefix**: type `string`, the prefix to store the files of oss or s3 type backend. It must be set after `backends.{$name}.type` and which must be `oss` or `s3`. 
- **backends.{$name}.configs.region**: type `string`, the aws region of s3 type backend. It must be set after `backends.{$name}.type` and which must be `s3`. It can be also obtained by environment variables `AWS_REGION` and `AWS_DEFAULT_REGION`, where the former is priority.
