---
id: backend
sidebar_label: Backend
---

# Backend

Backend is Kusion's storage, which defines the place to store Workspace and Release. By default, Kusion uses the `local` type of backend to store on the local disk. While in the scenario of team collaboration, the Workspace and Release can be stored on a remote backend, such as `oss` and `s3`, to allow multiple users' access. 

The command `kusion config` is used to configure the backend configuration. Configuring a whole backend or an individual config item are both supported. For the sensitive data, the environment variables are supported, and with higher priority.

Furthermore, Kusion provides the operation of setting current backend. Thus, the trouble of specifying backend can be saved when executing operation commands and managing `workspace`. 

## Available Backend Types

There are three available backend types: `local`, `oss`, `s3`.

### local

The `local` type backend uses local file system as storage, which is suitable for local operations, but not ideal for multi-user collaboration. The supported config items are as below.

- **path**: `type string`, `optional`, specify the directory to store the Workspace and Release files. The subdirectories `workspaces` and `releases` are used to store the corresponding files separately. It's recommended to use an empty or a Kusion exclusive directory as the local backend path. If not set, the default path `${KUSION_HOME}` is in use.

The whole local type backend configuration is as below.

```yaml
{
  "type": "local",
  "configs": {
    "path": "${local_path}" # type string, optional, the directory to store files.
  }
}
```

### oss

The `oss` type backend uses the Alicloud Object Storage Service (OSS) as storage. The supported config items are as below.

- **endpoint**: `type string`, `required`, specify the access endpoint for alicloud oss bucket. 
- **accessKeyID**: `type string`, `required`, specify the alicloud account accessKeyID, support declaring by environment variable `OSS_ACCESS_KEY_ID`.
- **accessKeySecret**: `type string`, `required`, specify the alicloud account accessKeySecret, support declaring by environment variable `OSS_ACCESS_KEY_SECRET`.
- **bucket**: `type string`, `required`, specify the name of the alicloud oss bucket.
- **prefix**: `type string`, `optional`, constitute the prefix to store the Workspace and Release files, whose prefixes are `${prefix}/workspaces` and `${prefix}/releases` respectively. Using prefix can create a "dedicated space" for the Kusion data, which is beneficial for the management and reuse of the bucket. If not set, there is no prefix, the files are stored in the root path of the bucket if analogy to a file system.

Noted that `accessKeyID` and `accessKeySecret` are required for the whole configuration combined by the configuration managed by the command `kusion config` and the environment variables. For the `kusion config` alone, they are not obligatory. And for the safety reason, using environment variables is the recommended way.

The whole oss type backend configuration is as below.

```yaml
{
  "type": "oss",
  "configs": {
    "endpoint": "${oss_endpoint}", # type string, required, the oss endpoint.
    "accessKeyID": "${oss_access_key_id}", # type string, ooptional for the command "kusion config", the oss access key id.
    "accessKeySecret": "${oss_access_key_secret}", # type string, optional for the command "kusion config", the oss access key secret.
    "bucket": "${oss_bucket}", # type string, required, the oss bucket.
    "prefix": "${oss_prefix}" # type string, optional, the prefix to store the files.
  }
}
```

The supported environment variables are as below.

```bash
export OSS_ACCESS_KEY_ID="${oss-access-key-id}" # configure accessKeyID
export OSS_ACCESS_KEY_SECRET="${oss-access-key-secret}" # configure accessKeySecret
```

### s3

The `s3` type backend uses the AWS Simple Storage Service (S3) as storage. The supported config items are as below.

- **region**: `type string`, `required`, specify the region of aws s3 bucket, support declaring by environment variable `AWS_DEFAULT_REGION` or `AWS_REGION`, where the latter has higher priority.
- **endpoint**: `type string`, `optional`, specify the access endpoint for aws s3 bucket.
- **accessKeyID**: `type string`, `required`, specify the aws account accessKeyID, support declaring by environment variable `AWS_ACCESS_KEY_ID`.
- **accessKeySecret**: `type string`, `required`, specify the aws account.accessKeySecret, support declaring by environment variable `AWS_SECRET_ACCESS_KEY`.
- **bucket**: `type string`, `required`, specify the name of the aws s3 bucket.
- **prefix**: `type string`, `optional`, constitute the prefix to store the Workspace and Release files, whose prefixes are `${prefix}/workspaces` and `${prefix}/releases` respectively.

Noted that `region`, `accessKeyID` and `accessKeySecret` are optional for the `kusion config` command.

The whole s3 type backend configuration is as below.

```yaml
{
  "type": "s3",
  "configs": {
    "region": "${s3_region}", # type string, optional for the command "kusion config", the aws region.
    "endpoint": "${s3_endpoint}", # type string, optional, the aws endpoint.   
    "accessKeyID": "${s3_access_key_id}", # type string, optional for the command "kusion config", the aws access key id.
    "accessKeySecret": "${s3_access_key_secret}", # type string, optional for the command "kusion config", the aws access key secret.
    "bucket": "${s3_bucket}", # type string, required, the s3 bucket.
    "prefix": "${s3_prefix}" # type string, optional, the prefix to store the files.
  }
}
```

The supported environment variables are as below.

```bash
export AWS_DEFAULT_REGION="${s3_region}" # configure region, lower priority than AWS_REGION
export AWS_REGION="${s3_region}" # configure region, higher priority than AWS_DEFAULT_REGION
export AWS_ACCESS_KEY_ID="${s3_access_key_id}" # configure accessKeyID
export AWS_SECRET_ACCESS_KEY="${s3_access_key_secret}" # configure accessKeySecret
```


## Setting a Backend

When there is a new backend or the backend configuration needs to update, use the command `kusion config set ${key} ${value}` to set a backend. A backend is identified by a unique name, and its whole configuration is made up of the backend type and its corresponding config items. 

Be attention, do not confuse backend with backend type. For example, a backend named `s3_prod` uses `s3` as its storage, the `s3_prod` is the backend, while the `s3` is the backend type.

There are four configuration modes:

- setting a whole backend
- setting a backend type 
- setting a whole set of backend config items
- setting a backend config item

A unique backend name is required to do the configuration. Take `s3` type backend with name `s3_prod` for an example to explain how these modes work.

### Setting a Whole Backend

The key to configure a whole backend is `backends.${name}`, whose value must be the JSON marshal result in a specified format, which is determined by the backend type. Enclosing the value in single quotation marks is a good choice, which can keep the format correct. 

```shell
# set a whole backend
kusion config set backends.s3_prod '{"type":"s3","configs":{"bucket":"kusion"}}'
```

### Setting a Backend Type

The key to set a backend type is `backends.${name}.type`, whose value must be `local`, `oss` or `s3`.

```shell
# set a backend type
kusion config set backends.s3_prod.type s3
```

### Setting a Whole Set of Backend Config Items

The key to set a whole set of backend config items is `backends.${name}.configs`, whose value must be the JSON marshal result in a specified format, which is determined by the backend type. The backend config must be set after the backend type, and corresponds to the backend type.

```shell
# set a whole backend config
kusion config set backends.s3_prod.configs '{"bucket":"kusion"}'
```

### Setting a Backend Config Item

The key to set a backend config item is `backends.${name}.configs.${item}`. The item name and value type both depend on the backend type. Like the whole backend config, the config item must be valid and set after the backend type.

```shell
# set a backend config item
kusion config set backends.s3_prod.configs.bucket kusion
```

When executing `kusion config set`, the configuration will be stored in a local file. For security reason, the environment variables are supported to configure some config items, such as `password`, `accessKeyID`, `accessKeySecret`. Using environment variables rather than `kusion config` set to set sensitive data is the best practice. If both configured, the environment variables have higher priority. For details about the supported environment variables, please see above.

Kusion has a default backend with `local` type and the path is `$KUSION_HOME`, whose name is exactly `default`. The `default` backend is forbidden to modification, that is setting or unsetting the default backend is not allowed. Besides, the keyword `current` is also used by Kusion itself, please do not use it as the backend name.

## Unsetting a Backend

When a backend is not in use, or the configuration is out of date, use the command `kusion config unset ${key}` to unset a backend or a specified config item. Same as the setting, there are also four modes of unsetting.

- unsetting a whole backend
- unsetting a backend type
- unsetting a whole set of backend config items
- unsetting a backend config item

When unsetting a whole backend, the backend must not be the current backend. When unsetting the backend type, the config items must be empty and the backend not be the current.

Unsetting the `default` backend is forbidden.

## Setting the Current Backend

In order not to specify backend for every operation command. Kusion provides the mechanism of setting current backend, then the current workspace will be use by default. This is very useful when you execute a series of Kusion operation commands, for they usually use the same backend.

Use the command `kusion config set backends.current ${name}` to set the current backend, where the `name` must be the already set backend.

```shell
# set the current workspace
kusion config set backends.current s3_prod
```

Setting the current backend to `default` is legal. Actually, if there is no backend related configuration, the current backend is the `default` backend.

## Getting Backend Configuration

Use the command `kusion config get ${key}` to get a whole backend configuration or a specified backend config item. The `key` is same as setting and unsetting operation, the whole list can be found in the [Configuration](configuration).

```shell
# get a whole backend
kusion config get backends.s3_prod

# get a specified config item
kusion config get backends.s3_prod.configs.bucekt
```

Besides, the command `kusion config list` can also be used, which returns the whole kusion configuration, while the backend configuration is included.

```shell
# get the whole Kusion configuration 
kusion config list
```

## Using Backend

The backend is used to store Workspace and Release. Thus, the following commands use the backend, shown as below.

- subcommands of `kusion workspace`: use to store the Workspace;
- `kusion apply`, `kusion destroy`: use to store the Release;

For all the commands above, the flag `--backend` is provided to specify the backend, or using the current backend. When using backend, you usually need to specify the sensitive data by environment variables. The example is shown below.

```shell
# set environment variables of sensitive and other necessary data
export AWS_REGION="${s3_region}"
export AWS_ACCESS_KEY_ID="${s3_access_key_id}"
export AWS_SECRET_ACCESS_KEY="${s3_access_key_secret}"

# use current backend
kusion apply

# use a specified backend
kusion apply --backend s3_prod
```
