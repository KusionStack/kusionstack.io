import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

# 数据库配置

您可以通过配置 `AppConfiguration` 模型中的 `Database` 配件来声明关系型数据库服务 (**Relational Database Service**)。Kusion 将基于您的配置代码自动地为您的应用产生使用数据库所需的资源，包括随机生成的密码和云服务商 (比如 **AWS** 和 **阿里云**) 提供的服务。此外，Kusion 会将数据库的 **连接地址**、**用户名**和**密码**等信息通过挂载 Kubernetes Secret 以环境变量的形式注入进您的应用容器中。您可以在自己的应用代码里使用相关环境变量来访问数据库。数据库相关环境变量的命名规范在[这里](docs/reference/model/naming-conventions.md#sensitive-database-information)有更详细的说明。

## 前置条件

请参考在 Kubernetes 和云上部署 WordPress 应用中的[前置条件](docs/user_docs/getting-started/usecases/deliver-the-wordpress-application-on-kubernetes-and-clouds.md#prerequisites)的相关说明。

下面的参考示例同时还需要您已经使用 `kusion init` 命令[初始化了项目](docs/user_docs/getting-started/usecases/deliver-the-wordpress-application-on-kubernetes-and-clouds.md#init-project)，这将在 Stack 目录下产生一份 [`kcl.mod`](docs/user_docs/guides/working-with-k8s/1-deploy-application.md#kclmod) 文件。

## 参考示例

下面为您展示了如何为您的应用配置由 AWS 或阿里云提供的关系型数据库服务。注意如果您的应用为访问数据库定义了单独的环境变量，您可以参考下面的示例通过 `$(KUSION_DB_HOST)`、`$(KUSION_DB_USERNAME)` 和 `$(KUSION_DB_PASSWORD)` 进行导入赋值。您可以在[这里](docs/reference/model/catalog_models/database/doc_database.md)找到更多关于数据库的配置项说明。

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

## 资源部署

在部署资源前，您需要配置 `AccessKey` 和 `SecretKey` 环境变量，如果您需要使用特定的云服务 Provider，还需指定 Provider 区域。

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

您可以使用 `kusion apply` 命令完成数据库资源的部署。

```shell
kusion apply
```

相应的输出类似于：

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

## 验证

我们现在可以通过登录到云厂商控制台界面查看我们刚刚创建的 RDS 实例来验证关系型数据库服务的部署。

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
