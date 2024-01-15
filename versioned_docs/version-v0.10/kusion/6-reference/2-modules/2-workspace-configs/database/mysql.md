# mysql

## Module MySQL

MySQL describes the attributes to locally deploy or create a cloud provider managed mysql database instance for the workload. 

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**cloud**<br />Cloud specifies the type of the cloud vendor. |"aws" \| "alicloud"|Undefined|**required**|
|**username**<br />Username specifies the operation account for the mysql database. |str|"root"|optional|
|**category**<br />Category specifies the edition of the mysql instance provided by the cloud vendor. |str|"Basic"|optional|
|**securityIPs**<br />SecurityIPs specifies the list of IP addresses allowed to access the mysql instance provided by the cloud vendor. |[str]|["0.0.0.0/0"]|optional|
|**privateRouting**<br />PrivateRouting specifies whether the host address of the cloud mysql instance for the workload to connect with is via public network or private network of the cloud vendor. |bool|true|optional|
|**size**<br />Size specifies the allocated storage size of the mysql instance. |int|10|optional|
|**subnetID**<br />SubnetID specifies the virtual subnet ID associated with the VPC that the cloud mysql instance will be created in. |str|Undefined|optional|
|**suffix**<br />Suffix specifies the suffix of the database name. |str|Undefined|optional|

### Examples

```yaml
runtimes: 
  terraform: 
    random: 
      version: 3.5.1
      source: hashicorp/random
    aws: 
      version: 5.0.1
      source: hashicorp/aws
      region: us-east-1

# MySQL workspace configs for AWS RDS
modules: 
  mysql: 
    default: 
      cloud: aws
      size: 20
      instanceType: db.t3.micro
      privateRouting: false
      suffix: "-mysql"
```

```yaml
runtimes: 
  terraform: 
    random: 
      version: 3.5.1
      source: hashicorp/random
    alicloud: 
      version: 1.209.1
      source: aliyun/alicloud
      region: cn-beijing

# MySQL workspace configs for Alicloud RDS
modules: 
  mysql: 
    default: 
      cloud: alicloud
      size: 20
      instanceType: mysql.n2.serverless.1c
      category: serverless_basic
      privateRouting: false
      subnetID: [your-subnet-id]
      suffix: "-mysql"
```