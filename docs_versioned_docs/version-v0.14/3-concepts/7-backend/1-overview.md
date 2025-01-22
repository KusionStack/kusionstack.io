# Overview

Backend is Kusion's storage, which defines the place to store Workspace and Release related files. By default, Kusion uses the `local` type of backend to store on the local disk. In the case of team collaboration, the Workspace and Release can be stored on a remote backend, such as an `AliCloud OSS Bucket` or an `AWS S3 bucket`, to enable simutaneous access from users.

## Available Backend Types

There are four available backend types: `local`, `oss`, `s3` and `google`.

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

### google cloud storage

The `google` type backend uses the Google Cloud Storage as storage. The supported config items are as below.
- **bucket**: `type string`, `required`, specify the name of the google cloud storage bucket.
- **credentials**: `type string`, `required`, specify the content of the `credentials.json` file required to access the aforementioned bucket.

```yaml
{
    "type":"google",
    "configs":{
        "bucket":"kusion-kcp-gcp-backend",
        "credentials":${content-from-credentials.json}
    }
}
```

The supported environment variables are as below.

```bash
export GOOGLE_CLOUD_CREDENTIALS="${content-from-credentials.json}" # configure credentials.json
```