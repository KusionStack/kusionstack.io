import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deliver the WordPress Application with Cloud RDS

This tutorial will demonstrate how to deploy a WordPress application with Kusion, which relies on both Kubernetes and IaaS resources provided by cloud vendors. We can learn how to declare the Relational Database Service (RDS) to provide a cloud-based database solution for our application from this article. 

## Prerequisites

- [Install Kusion](../../getting-started/install-kusion)
- [Deploy Kubernetes](https://kubernetes.io/) or [Kind](https://kind.sigs.k8s.io/) or [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/)
- [Install Terraform](https://www.terraform.io/)
- Prepare a cloud service account and create a user with `VPCFullAccess` and `RDSFullAccess` permissions to use the Relational Database Service (RDS). This kind of user can be created and managed in the Identity and Access Management (IAM) console
- The environment that executes `kusion` need to have connectivity to terraform registry to download the terraform providers

Additionally, we also need to configure the obtained AccessKey and SecretKey as environment variables, along with the region if you are using certain cloud provider: 

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

## Init Project

We can start by initializing this tutorial project with online templates: 

```shell
kusion init --online
```

All init templates are listed as follows:

```shell
➜  kusion_playground kusion init --online
? Please choose a template: wordpress-cloud-rds        A sample wordpress project with cloud rds
This command will walk you through creating a new kusion project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

Project Config:
? Project Name: wordpress-cloud-rds
? AppName: wordpress
? ProjectName: wordpress
Stack Config: dev
? Image: wordpress:6.3
Created project 'wordpress-cloud-rds'
```

Select `wordpress-cloud-rds` and press `Enter`. After that, we will see hints below and use the default value to config this project and stack.


![](/img/docs/user_docs/getting-started/init-wordpress-with-rds.gif)

The directory structure looks like the following:

```shell
➜  kusion_playground tree wordpress-cloud-rds
wordpress-cloud-rds
├── dev
│   ├── kcl.mod
│   ├── kcl.mod.lock
│   ├── main.k
│   ├── platform.k
│   └── stack.yaml
└── project.yaml

1 directory, 6 files
```

:::info
More details about the directory structure can be found in 
[Concepts](../../concepts/glossary).
:::

### Review Config Files

Let's take a look at the configuration files located in `wordpress-cloud-rds/dev`.

`dev/main.k`
```python
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.trait as t
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.container.probe as p
import catalog.models.schema.v1.workload.secret as sec
import catalog.models.schema.v1.workload.network as n
import catalog.models.schema.v1.monitoring as m
import catalog.models.schema.v1.accessories.database as db

# main.k declares reusable configurations for dev stacks.
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            wordpress: c.Container {
                image = "wordpress:6.3"
                env: {
                    "WORDPRESS_DB_HOST": "$(KUSION_DB_HOST)"
                    "WORDPRESS_DB_USER": "$(KUSION_DB_USERNAME)"
                    "WORDPRESS_DB_PASSWORD": "$(KUSION_DB_PASSWORD)"
                    "WORDPRESS_DB_NAME": "mysql"
                }
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
            }
        }
        replicas: 1
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
    database: db.Database {
        type: "aws"
        engine: "MySQL"
        version: "8.0"
        size: 20
        instanceType: "db.t3.micro"
    }
}
```

`dev/platform.k`
```python
import catalog.models.schema.v1 as ac

# platform.k declares customized configurations
wordpress: ac.AppConfiguration {
    database: {
        privateRouting = False

        # SubnetID defines the virtual subnet ID associated with the VPC that the rds
        # instance will be created in. The rds instance won't be created in user's own VPC
        # but in default VPC of cloud vendor, if this field is not provided.
        # subnetID = [your-subnet-id]

        # category = "serverless_basic"
    }
}
```

The template project defaults to use `AWS` RDS instance for the WordPress application. If you would like to try creating the `Alicloud` RDS instance, you could modify the `dev/main.k` and `dev/platform.k` to the following and replace the `[your-subnet-id]` in `dev/platform.k` with the `vSwitchID` to provision the database in. 

`dev/main.k`
```python
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.trait as t
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c
import catalog.models.schema.v1.workload.container.probe as p
import catalog.models.schema.v1.workload.secret as sec
import catalog.models.schema.v1.workload.network as n
import catalog.models.schema.v1.monitoring as m
import catalog.models.schema.v1.accessories.database as db

# main.k declares reusable configurations for dev stacks.
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            wordpress: c.Container {
                image = "wordpress:6.3"
                env: {
                    "WORDPRESS_DB_HOST": "$(KUSION_DB_HOST)"
                    "WORDPRESS_DB_USER": "$(KUSION_DB_USERNAME)"
                    "WORDPRESS_DB_PASSWORD": "$(KUSION_DB_PASSWORD)"
                    "WORDPRESS_DB_NAME": "mysql"
                }
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
            }
        }
        replicas: 1
        ports: [
            n.Port {
                port: 80
            }
        ]
    }
    database: db.Database {
        type: "alicloud"
        engine: "MySQL"
        version: "8.0"
        size: 20
        instanceType: "mysql.n2.serverless.1c"
    }
}
```

`dev/platform.k`
```python
import catalog.models.schema.v1 as ac

# platform.k declares customized configurations
wordpress: ac.AppConfiguration {
    database: {
        privateRouting = False

        # SubnetID defines the virtual subnet ID associated with the VPC that the rds
        # instance will be created in. The rds instance won't be created in user's own VPC
        # but in default VPC of cloud vendor, if this field is not provided.
        subnetID = [your-subnet-id]

        category = "serverless_basic"
    }
}
```

The configuration code files you need to pay attention are mainly `dev/main.k` and `dev/platform.k`. Specifically: 

- `dev/main.k` contains configurations for the **Development team** to fill out on how the application should run in the dev environment. In addition to declaring its application container attributes such as image, environment variables, resource requirements, its network attributes such as opening the port 80 to provide service, it also declares that it needs an RDS instance.
- `dev/platform.k` contains config codes for **Platform team** to fill out for the WordPress application deployment in the dev environment on AliCloud. Here, the main purpose is to specify the details on the cloud database (such as how network access is managed, what category of service to get from the cloud vendor) for it to be connected from the WordPress application container.

As shown above, benefiting from the advanced features of KCL concerning variable, function, and schema definition, we can abstract and encapsulate the RDS resources, which shields many properties that the Developer does not need to be aware of. The developer only needs to fill in a few necessary fields in the AppConfiguration instance to complete the declaration of RDS resources, so that the application configuration can be organized more flexibly and efficiently. 

:::info
More details about Catalog models can be found in [Catalog](https://github.com/KusionStack/catalog)
:::

## Deliver WordPress Application

You can complete the delivery of the WordPress application using the following command line: 

```shell
cd wordpress-cloud-rds && kusion apply --yes
```

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

After all the resources reconciled, we can port-forward our local port (e.g. 12345) to the WordPress frontend service port (80) in the cluster:

```shell
kubectl port-forward -n wordpress svc/wordpress-dev-wordpress-private 12345:80
```

![kubectl port-forward for wordpress](/img/docs/user_docs/getting-started/wordpress-port-forward.png)

## Verify WordPress Application

Next, we will verify the WordPress site service we just delivered, along with the creation of the RDS instance it depends on. We can start using the WordPress site by accessing the link of local-forwarded port [(http://localhost:12345)](http://localhost:12345) we just configured in the browser. 

![wordpress site page](/img/docs/user_docs/getting-started/wordpress-site-page.png)

In addition, we can also log in to the cloud service console page to view the RDS instance we just created.

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

## Delete WordPress Application

You can delete the WordPress application and related RDS resources using the following command line. 

```shell
kusion destroy --yes
```

<Tabs>
<TabItem value="AWS" >

![kusion destroy wordpress with aws rds](/img/docs/user_docs/getting-started/kusion-destroy-wordpress-with-aws-rds.png)

```mdx-code-block
</TabItem>
<TabItem value="Alicloud">
```

![kusion destroy wordpress with alicloud rds](/img/docs/user_docs/getting-started/kusion-destroy-wordpress.png)

```mdx-code-block
</TabItem>
</Tabs>