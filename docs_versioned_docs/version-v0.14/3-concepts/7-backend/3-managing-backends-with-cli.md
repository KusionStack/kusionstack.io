# Managing backends with Kusion CLI

The command `kusion config` is used to configure the backend configuration. Configuring a whole backend or an individual config item are both supported. For the sensitive data, the environment variables are supported, and with higher priority.

Furthermore, Kusion CLI provides the operation of setting current backend. Thus, the trouble of specifying backend can be saved when executing operation commands and managing `workspace`. 

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

Use the command `kusion config get ${key}` to get a whole backend configuration or a specified backend config item. The `key` is same as setting and unsetting operation, the whole list can be found in the [Configuration](../11-cli-configuration.md).

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
