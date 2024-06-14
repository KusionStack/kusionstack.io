# postgres

## Module PostgreSQL

PostgreSQL describes the attributes to locally deploy or create a cloud provider managed postgres database instance for the workload. 

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**cloud**<br />Cloud specifies the type of the cloud vendor. |"aws" \| "alicloud"|Undefined|**required**|
|**username**<br />Username specifies the operation account for the postgres database. |str|"root"|optional|
|**category**<br />Category specifies the edition of the postgres instance provided by the cloud vendor. |str|"Basic"|optional|
|**securityIPs**<br />SecurityIPs specifies the list of IP addresses allowed to access the postgres instance provided by the cloud vendor. |[str]|["0.0.0.0/0"]|optional|
|**privateRouting**<br />PrivateRouting specifies whether the host address of the cloud postgres instance for the workload to connect with is via public network or private network of the cloud vendor. |bool|true|optional|
|**size**<br />Size specifies the allocated storage size of the postgres instance. |int|10|optional|
|**subnetID**<br />SubnetID specifies the virtual subnet ID associated with the VPC that the cloud postgres instance will be created in. |str|Undefined|optional|
|**databaseName**<br />databaseName specifies the database name. |str|Undefined|optional|

### Examples

```yaml
# PostgreSQL workspace configs for AWS RDS
modules: 
  postgres: 
    path: oci://ghcr.io/kusionstack/postgres
    version: 0.2.0
    configs: 
      default: 
        cloud: aws
        size: 20
        instanceType: db.t3.micro
        securityIPs: 
          - 0.0.0.0/0
        databaseName: "my-postgres"
```

```yaml
# PostgreSQL workspace configs for Alicloud RDS
modules: 
  postgres: 
    path: oci://ghcr.io/kusionstack/postgres
    version: 0.2.0
    configs: 
      default:
        cloud: alicloud
        size: 20
        instanceType: pg.n2.serverless.1c
        category: serverless_basic
        privateRouting: false
        subnetID: [your-subnet-id]
        securityIPs: 
          - 0.0.0.0/0
        databaseName: "my-postgres"
```