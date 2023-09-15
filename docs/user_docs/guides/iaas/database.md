import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Database

You can declare the use of **relational database service** by configuring the `database` accessory in `AppConfiguration`. Kusion will automatically generate the resources needed for your application to use the database based on your configuration code, including random password and services provided by cloud vendors like **AWS** and **Alicloud**. Moreover, Kusion will inject the information of database **host address**, **username** and **password** into the application container as environment variables with Kubernetes Secret. You can access the corresponding database in your application code through the relevant environment variables. The naming conventions of the environment variables are more detailed explained [here](docs/reference/model/naming-conventions.md#sensitive-database-information)

## Prerequisites

Please refer to the [prerequisites](docs/user_docs/getting-started/usecases/deliver-the-wordpress-application-on-kubernetes-and-clouds.md#prerequisites) in the guide for delivering the WordPress application on Kubernetes and clouds. 

The example below also requires you to have [initialized the project](docs/user_docs/getting-started/usecases/deliver-the-wordpress-application-on-kubernetes-and-clouds.md#init-project) using the `kusion init` command, which will generate a [`kcl.mod`](docs/user_docs/guides/working-with-k8s/1-deploy-application.md#kclmod) file under the stack directory. 

## Example

Below shows you how to configure relational database service for your application provided by AWS or Alicloud. Note that if your application defines its own environment variables for accessing the database, you can export them with `$(KUSION_DB_HOST)`, `$(KUSION_DB_USERNAME)` and `$(KUSION_DB_PASSWORD)`, just like the example shown below. You can find more information about the attributes of database accessory [here](docs/reference/model/catalog_models/database/doc_database.md). 

<Tabs>
<TabItem value="AWS" >

```python
import models.schema.v1 as ac
import models.schema.v1.trait as t
import models.schema.v1.workload as wl
import models.schema.v1.workload.container as c
import models.schema.v1.workload.container.probe as p
import models.schema.v1.workload.secret as sec
import models.schema.v1.workload.network as n
import models.schema.v1.monitoring as m
import models.schema.v1.accessories.database as db

# base.k declares reusable configurations for all stacks.
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "wordpress": c.Container {
                image: "wordpress:4.8-apache"
                env: {
                    "WORDPRESS_DB_HOST": "$(KUSION_DB_HOST)"
                    "WORDPRESS_DB_PASSWORD": "$(KUSION_DB_PASSWORD)"
                }
                resources: {
                    "cpu": "1"
                    "memory": "2Gi"
                }
            }
        }
        replicas: 2
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
    database: db.Database {
        type: "aws"
        engine: "mysql"
        version: "5.7"
        instanceType: "db.t3.micro"
    }
}
```

```mdx-code-block
</TabItem>
<TabItem value="Alicloud">
```
```python
import models.schema.v1 as ac
import models.schema.v1.trait as t
import models.schema.v1.workload as wl
import models.schema.v1.workload.container as c
import models.schema.v1.workload.container.probe as p
import models.schema.v1.workload.secret as sec
import models.schema.v1.workload.network as n
import models.schema.v1.monitoring as m
import models.schema.v1.accessories.database as db

# base.k declares reusable configurations for all stacks.
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "wordpress": c.Container {
                image: "wordpress:4.8-apache"
                env: {
                    "WORDPRESS_DB_HOST": "$(KUSION_DB_HOST)"
                    "WORDPRESS_DB_PASSWORD": "$(KUSION_DB_PASSWORD)"
                }
                resources: {
                    "cpu": "1"
                    "memory": "2Gi"
                }
            }
        }
        replicas: 2
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
    database: db.Database {
        type: "alicloud"
        engine: "MySQL"
        version: "5.7"
        size: 20
        instanceType: "mysql.n2.serverless.1c"
        category: "serverless_basic"
        privateRouting: False

        # SubnetID defines the virtual subnet ID associated with the VPC that the rds 
        # instance will be created in. The rds instance won't be created in user's own VPC 
        # if this field is not provided. 
        subnetID: "your_subnet_id"
    }
}
```
```mdx-code-block
</TabItem>
</Tabs>
```

## Applying

Before applying the resources, you need to configure the `AccessKey` and `SecretKey` as environment variables, along with the region if you are using certain cloud provider. 

<Tabs>
<TabItem value="AWS" >

```bash
export AWS_ACCESS_KEY_ID="AKIAQZDxxxx" # replace it with your AccessKey
export AWS_SECRET_ACCESS_KEY="oE/xxxx" # replace it with your SecretKey
export AWS_PROVIDER_REGION="xx-xxxx-x" # replace it with your AWS Region
```

![aws iam account](/img/docs/user_docs/getting-started/aws-iam-account.png)

```mdx-code-block
</TabItem>
<TabItem value="Alicloud">
```

```bash
export ALICLOUD_ACCESS_KEY="LTAI5txxx" # replace it with your AccessKey
export ALICLOUD_SECRET_KEY="nxuowIxxx" # replace it with your SecretKey
export ALICLOUD_PROVIDER_REGION="xx-xxxxxxx" # replace it with your AliCloud Region
```

![alicloud iam account](/img/docs/user_docs/getting-started/set-rds-access.png)

```mdx-code-block
</TabItem>
</Tabs>
```

You can use `kusion apply` to apply the database resources.

```shell
kusion apply
```

The output is similar to: 

<Tabs>
<TabItem value="AWS" >

![apply the wordpress application with aws rds](/img/docs/user_docs/getting-started/apply-wordpress-application-with-aws-rds.png)

```mdx-code-block
</TabItem>
<TabItem value="Alicloud">
```

![apply the wordpress application with alicloud rds](/img/docs/user_docs/getting-started/apply-wordpress-application.png)

```mdx-code-block
</TabItem>
</Tabs>
```

## Validation

We can now verify the relational database service through logging into the cloud console page to view the RDS instance we just created. 

<Tabs>
<TabItem value="AWS" >

![aws rds instance](/img/docs/user_docs/getting-started/aws-rds-instance.png)
![aws rds instance detailed information](/img/docs/user_docs/getting-started/aws-rds-instance-detail.png)

```mdx-code-block
</TabItem>
<TabItem value="Alicloud">
```

![alicloud rds instance](/img/docs/user_docs/getting-started/alicloud-rds-instance.png)

```mdx-code-block
</TabItem>
</Tabs>
```
