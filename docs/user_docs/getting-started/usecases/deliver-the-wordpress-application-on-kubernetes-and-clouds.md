---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deliver the WordPress application on Kubernetes and clouds

This tutorial will demonstrate how to deploy a WordPress application using KusionStack, which relies on both Kubernetes and IaaS resources provided by cloud vendors. Unlike the code-city application we previously deployed on Kubernetes, the WordPress application will also rely on RDS (Relational Database Service) to provide a cloud-based database solution for WordPress website content, such as articles, comments, users, and other information. 

<!-- ## Full Demonstration Video

The following video will show you a complete demonstration of how to deploy a WordPress application and related Alicloud RDS resources with the Kusion command-line tool.

[![kusionstack-delivery-wordpress-application](/img/docs/user_docs/getting-started/wordpress-video-cover.png)](https://www.youtube.com/watch?v=QHzKKsoKLQ0 "kusionstack-delivery-wordpress-application") -->

## Prerequisites

- [Install Kusion](/docs/user_docs/getting-started/install)
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
~/playground$ kusion init --online
? Please choose a template:  [Use arrows to move, type to filter]
> code-city                  Code City metaphor for visualizing Go source code in 3D.
  deployment-multi-stack     A minimal kusion project of multiple stacks
  deployment-single-stack    A minimal kusion project of single stack
  wordpress                  A sample wordpress project
```

Select `wordpress` and press `Enter`. After that, we will see hints below and use the default value to config this project and stack.

![](/img/docs/user_docs/getting-started/init-wordpress.gif)

The directory structure looks like the following:

```shell
~/playground$ tree wordpress
wordpress
├── dev
│   ├── kcl.mod
│   ├── kcl.mod.lock
│   ├── main.k
│   ├── platform.k
│   └── stack.yaml
└── project.yaml

2 directories, 6 files
```

:::info
More details about the directory structure can be found in 
[Concepts](/docs/user_docs/concepts/glossary).
:::

### Review Config Files

Let's take a look at the configuration files located in `wordpress/dev`.

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

wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            wordpress: c.Container {
                image = "wordpress:4.8-apache"
                env: {
                    "WORDPRESS_DB_HOST": "secret://wordpress-db/hostAddress"
                    "WORDPRESS_DB_PASSWORD": "secret://wordpress-db/password"
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
        version: "5.7"
        size: 20
        instanceType: "mysql.n2.serverless.1c"
    }
}
```

`dev/platform.k`
```
import catalog.models.schema.v1 as ac

# platform.k declares customized configurations for a given platform
wordpress: ac.AppConfiguration {
    database: {
        category = "serverless_basic"
        # SubnetID defines the virtual subnet ID associated with the VPC that the rds
        # instance will be created in. The rds instance won't be created in user's own VPC
        # if this field is not provided.
        subnetID = "{your-subnet-goes-here}"
        securityIPs = ["0.0.0.0/0"]
        privateRouting = False
    }
}
```
In `dev/platform.k`, you need to replace `{your-subnet-goes-here}` with the subnetID to provision the database in.

If you would like to try creating the `AWS` RDS instance, you could modify the `dev/platform.k` to the following:
```
import catalog.models.schema.v1 as ac

# platform.k declares customized configurations for a given platform
wordpress: ac.AppConfiguration {
    database: {
        type = "aws"
        # This instance type is AWS specific
        instanceType = "db.t3.micro"
        category = "serverless_basic"
        securityIPs = ["0.0.0.0/0"]
        privateRouting = False
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
cd wordpress/dev && kusion apply --yes
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

## Modify WordPress Application

<!-- ### Compliance Check of Config Code Modification

Using KCL to write application config codes naturally has the ability to perform type-checking on configuration items. Validation logic can also be implemented through keywords like `assert` and `check`, making it more convenient to discover potential issues during the writing of application config codes and reduce the risk of delivering the application with the wrong configuration. 

When creating an RDS resource, for different types of cloud service vendors, we can declare the corresponding RDS instance type, and the Catalog model has added the validation logic for the RDS instance type through the `assert` keyword, so when we accidentally modify the RDS instance type to an invalid value, Kusion will throw a corresponding error during the compilation process before applying the resource. 

![KCL Assertion Failure](/img/docs/user_docs/getting-started/assert-rds-instance-type.png) -->

### Apply Config Code Modification

As shown below, you can try to modify the config codes in the file `dev/main.k` to add an environment variable in the container of the WordPress application. When using `kusion apply` to apply the config code modification, you can preview the resource changes with the capability of 3-way real-time diff of Kusion (note that we ignore the change of `metadata.managedFields` field in the following example for better demonstration). 

```python
# dev/main.k
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            wordpress: c.Container {
                # Some unchanged codes are omitted
                # image = ...
                env: {
                    "WORDPRESS_DB_HOST": "secret://wordpress-db/hostAddress"
                    "WORDPRESS_DB_PASSWORD": "secret://wordpress-db/password"
                    "ENV_ADD_EXAMPLE": "wordpress-example"
                }
                ...
            }
        }
        ...
    }
    ...
}
```

```shell
kusion apply --watch --ignore-fields "metadata.managedFields"
```

![kusion 3-way diff](/img/docs/user_docs/getting-started/kusion-3-way-diff.png)

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

## Summary

This tutorial demonstrates how to use KusionStack to deploy a WordPress application that depends on both Kubernetes and RDS resources. During the process of writing and applying WordPress config codes, we can see that with the combination of KCL configuration and policy language, Catalog models library, and Kusion execution engine, KusionStack has the advantages listed below: 

1. **Hybrid resource orchestration**: using KCL to write application config codes make it easy to orchestrate and manage different types of resources in a unified way. In the example of delivering a WordPress application with both Kubernetes and IaaS resources provided by cloud vendors, all the necessary dependencies can be declared in a single KCL code file, enabling the one-click deployment of the entire application and achieving application-centric operations. 

2. **Application schema abstraction**: using KCL’s advanced features such as built-in variables, functions, and schema definition can easily abstract and encapsulate the dependent resources of the application, shielding developers from configuration attributes they don’t need to be aware of. The developer only needs to fill in a few necessary fields in the frontend model instance to declare the required resources, which makes it possible to organize application configuration more flexibly and efficiently. 

3. **Multi-team and multi-role collaboration**: under the cooperation of defining models in the model repository and writing configurations, Developers and Platforms from different teams can perform their roles, only focusing on their own respective configuration items, thereby improving the collaboration efficiency of application development and operation. 

4. **Shift left compliance check**: using KCL to write application config codes naturally has the ability to perform type checking on configuration items. Additionally, keywords like `assert` and `check` can be used to implement configuration validation logic, making it more convenient to identify potential issues during the writing of application config codes and reducing the risk of delivering the application with the wrong configuration. Furthermore, Kusion can provide the 3-way real-time diff before the application is applied, allowing users to preview the configuration changes and thus providing a safer workflow. 
