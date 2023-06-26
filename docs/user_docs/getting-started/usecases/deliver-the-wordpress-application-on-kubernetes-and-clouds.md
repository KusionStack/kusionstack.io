---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deliver the WordPress application on Kubernetes and clouds

This tutorial will demonstrate how to deploy a WordPress application using KusionStack, which relies on both Kubernetes and IaaS resources provided by cloud vendors. Unlike the code-city application we previously deployed on Kubernetes, the WordPress application will also rely on RDS (Relational Database Service) to provide a cloud-based database solution for WordPress website content, such as articles, comments, users, and other information. 

## Full Demonstration Video

The following video will show you a complete demonstration of how to deploy a WordPress application and related Alicloud RDS resources with the Kusion command-line tool.

[![kusionstack-delivery-wordpress-application](/img/docs/user_docs/getting-started/wordpress-video-cover.png)](https://www.youtube.com/watch?v=QHzKKsoKLQ0 "kusionstack-delivery-wordpress-application")

## Prerequisites

- [Install Kusion](/docs/user_docs/getting-started/install)
- [Deploy Kubernetes](https://kubernetes.io/) or [Kind](https://kind.sigs.k8s.io/)
- [Install Terraform](https://www.terraform.io/)
- Prepare a cloud service account and create a user with `VPCFullAccess` and `RDSFullAccess` permissions to use the Relational Database Service (RDS). This kind of user can be created and managed in the Identity and Access Management (IAM) console

Additionally, we also need to configure the obtained AccessKey and SecretKey as environment variables: 

<Tabs>
<TabItem value="AWS" >

```bash
export AWS_ACCESS_KEY_ID="AKIAQZDxxxx" # replace it with your AccessKey
export AWS_SECRET_ACCESS_KEY="oE/xxxx" # replace it with your SecretKey
```

![aws iam account](/img/docs/user_docs/getting-started/aws-iam-account.png)

```mdx-code-block
</TabItem>
<TabItem value="Alicloud">
```

```bash
export ALICLOUD_ACCESS_KEY="LTAI5txxx" # replace it with your AccessKey
export ALICLOUD_SECRET_KEY="nxuowIxxx" # replace it with your SecretKey
```

![alicloud iam account](/img/docs/user_docs/getting-started/set-rds-access.png)

```mdx-code-block
</TabItem>
</Tabs>

:::info
Alternatively, Kusion provides a **Secret as Code** solution for handling the AccessKey and SecretKey mentioned above.
:::

## Review Project Structure and Config Codes

### Project Structure

Firstly, let's clone the Konfig repo and enter the root directory: 

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

Then we can locate the `wordpress` project under the `appops/` directory, which is composed of the following files: 

```shell
cd appops/wordpress && tree
.
├── README.md                       // Documentation
├── base                            // Common configuration for all stacks
│   └── base.k                      // Common config code file for all stacks
├── dev                             // Stack directory
│   ├── ci-test                     // CI test directory, storing test scripts and data
│   │   ├── settings.yaml           // Configuration for test data and compiling
│   │   └── stdout.golden.yaml      // Expected Spec YAML, which can be updated using make
│   ├── kcl.yaml                    // Multi-file compilation configuration for current stack
│   ├── main.k                      // Config codes for Developer in current stack
│   ├── platform.k                  // Config codes for Platform in current stack
│   └── stack.yaml                  // Meta information of current stack
└── project.yaml                    // Meta information of current project

3 directories, 9 files
```

:::info
More details about the directory structure can be found in [Konfig](/docs/user_docs/concepts/konfig)
:::

### Config Codes

```python
# dev/main.k
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.storage

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
# And main.k is for the configurations in concern of application developers. 

# defination of wordpress application frontend model
wordpress: frontend.Server {
    # specify application image
    image = "wordpress:4.8-apache"

    # use cloud database for the storage of wordpress
    database = storage.DataBase {
        # choose aws_rds as the cloud database
        dataBaseType = "aws_rds"
        dataBaseAttr = storage.DBAttr {
            # choose the engine type and version of the database
            databaseEngine = "MySQL"
            databaseEngineVersion = "5.7"
            # create database account
            databaseAccountName = "root"
            databaseAccountPassword = option("db_password")
            # create internet access for the cloud database
            internetAccess = True
        }
    }

    # NOTE: this configuration is an example of adding an environment variable in the main container
    # uncommenting and re-deploying will add the environment variable "ENV_ADD_EXAMPLE" in the 
    # main container and the differnces will be shown by the command of "kusion apply"
    mainContainer: {
        env += [
            {
                name = "ENV_ADD_EXAMPLE"
                value = "wordpress-example"
            }
        ]
    }
}
```

```python
# dev/platform.k
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.storage
import base.pkg.kusion_models.kube.metadata
import base.pkg.kusion_clouds.aws_backend.aws_config

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
# And platform.k is for the configurations in concern of platform developers. 

_cloudResourceName = "{}-{}".format(metadata.__META_APP_NAME, metadata.__META_ENV_TYPE_NAME).lower()
_awsDependencyPrefix = "$kusion_path." + aws_config.awsProvider.namespace + ":" + aws_config.awsProvider.name + ":"

# defination of wordpress application frontend model
wordpress: frontend.Server {
    # add environment variable in main container with implicit alicloud resource dependency
    mainContainer: {
        env += [
            {
                name = "WORDPRESS_DB_HOST"
                value = _awsDependencyPrefix + aws_config.awsDBInstanceMeta.type + ":" + _cloudResourceName + ".address"
            }
        ]
    }

    # supplement database related configuration code on the platform side
    database: storage.DataBase {
        dataBaseAttr: storage.DBAttr {
            # specify instance type for aws or alicloud rds
            # for aws rds
            instanceType = "db.t3.micro" 

            # for alicloud rds
            # instanceType = "mysql.n2.serverless.1c" 

            # specify cloud charge type for alicloud rds
            # extraMap = {
            #     "cloudChargeType": "Serverless"
            # }
        }
    }
}
```

The configuration code files you need to pay attention to mainly include `dev/main.k` and `dev/platform.k`. Specifically: 

- `dev/main.k` contains config codes for **Developer** to concentrate on for the WordPress application deployment in the dev environment. In addition to the application container image, it also assigns an instance of a type `storage.DataBase` to the `frontend.Server.database` attribute, and thus declaring an RDS with MySQL as the database engine. 
- `dev/platform.k` contains config codes for **Platform** to concentrate on for the WordPress application deployment in the dev environment. Here, the main purpose is to specify the domain name of the cloud database to be connected to for the WordPress application container and the RDS instance type. In addition, we can also declare the RDS charging type and other configurations in `dev/platform.k`.  

As shown above, benefiting from the advanced features of KCL concerning variable, function, and schema definition, we can abstract and encapsulate the RDS resources, which shields many properties that the Developer does not need to be aware of (such as the network segment of VPC and vSwitch behind RDS). The developer only needs to fill in a few necessary fields in the frontend model instance to complete the declaration of RDS resources, so that the application configuration can be organized more flexibly and efficiently. Moreover, under the collaboration of writing config codes in the Konfig repository, Developers and Platforms from different teams can perform their roles, only focusing on their own respective configuration items, thereby improving the collaboration efficiency of application development and operation. 

:::info
More details about Konfig models can be found in [Konfig](https://github.com/KusionStack/konfig)
:::

## Deliver WordPress Application

You can complete the delivery of the WordPress application using the following command line:

```shell
cd appops/wordpress/dev && kusion apply --yes
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

After all the resources reconciled, we can port-forward our local port (e.g. 12345) to the WordPress frontend service port (80) in the cluster:

```shell
kubectl port-forward -n wordpress-example svc/wordpress 12345:80
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

## Modify WordPress Application

### Compliance Check of Config Code Modification

Using KCL to write application config codes naturally has the ability to perform type-checking on configuration items. Validation logic can also be implemented through keywords like `assert` and `check`, making it more convenient to discover potential issues during the writing of application config codes and reduce the risk of delivering the application with the wrong configuration. 

When creating an RDS resource, for different types of cloud service vendors, we can declare the corresponding RDS instance type, and the Konfig backend model has added the validation logic for the RDS instance type through the `assert` keyword, so when we accidentally modify the RDS instance type to an invalid value in `dev/platform.k`, Kusion will throw a corresponding error during the compilation process before applying the resource. 

![KCL Assertion Failure](/img/docs/user_docs/getting-started/assert-rds-instance-type.png)

### Apply Config Code Modification

As shown below, you can try to modify the config codes in the file `dev/main.k` to add an environment variable in the main container of the WordPress application. When using `kusion apply` to apply the config code modification, you can preview the resource changes with the capability of 3-way real-time diff of Kusion (note that we ignore the change of `metadata.managedFields` field in the following example for better demonstration). 

```python
# dev/main.k
# ...

wordpress: frontend.Server {
	# Some unchanged codes are omitted
    # image = ...
    # database = storage.DataBase{...}
    
    # NOTE: this configuration is an example of adding an environment variable in the main container
    # uncommenting and re-deploying will add the environment variable "ENV_ADD_EXAMPLE" in the 
    # main container and the differnces will be shown by the command of "kusion apply"
    mainContainer: {
        env += [
            {
                name = "ENV_ADD_EXAMPLE"
                value = "wordpress-example"
            }
        ]
    }
}
```

```shell
kusion apply --ignore-fields "metadata.managedFields"
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

This tutorial demonstrates how to use KusionStack to deploy a WordPress application that depends on both Kubernetes and RDS resources. During the process of writing and applying WordPress config codes, we can see that with the combination of KCL configuration and policy language, Konfig configuration code library, and Kusion execution engine, KusionStack has the advantages listed below: 

1. **Hybrid resource orchestration**: using KCL to write application config codes make it easy to orchestrate and manage different types of resources in a unified way. In the example of delivering a WordPress application with both Kubernetes and IaaS resources provided by cloud vendors, all the necessary dependencies can be declared in a single KCL code file, enabling the one-click deployment of the entire application and achieving application-centric operations. 

2. **Application schema abstraction**: using KCL’s advanced features such as built-in variables, functions, and schema definition can easily abstract and encapsulate the dependent resources of the application, shielding developers from configuration attributes they don’t need to be aware of. The developer only needs to fill in a few necessary fields in the frontend model instance to declare the required resources, which makes it possible to organize application configuration more flexibly and efficiently. 

3. **Multi-team and multi-role collaboration**: under the cooperation of writing config codes in the Konfig repository, Developers and Platforms from different teams can perform their roles, only focusing on their own respective configuration items, thereby improving the collaboration efficiency of application development and operation. 

4. **Shift left compliance check**: using KCL to write application config codes naturally has the ability to perform type checking on configuration items. Additionally, keywords like `assert` and `check` can be used to implement configuration validation logic, making it more convenient to identify potential issues during the writing of application config codes and reducing the risk of delivering the application with the wrong configuration. Furthermore, Kusion can provide the 3-way real-time diff before the application is applied, allowing users to preview the configuration changes and thus providing a safer workflow. 
