---
sidebar_position: 2
---

# Deliver Wordpress Application on Kubernetes and Clouds

This tutorial will demonstrate how to deploy a wordpress application using KusionStack which relies on both Kubernetes and Alicloud IaaS resources. Unlike the code-city application we previously deployed on Kubernetes, the wordpress application will also rely on Alicloud RDS (Relational Database Service) to provide a cloud-based database solution for wordpress website content such as articles, comments, users and other information. 

## Prerequesties

- [Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes](https://kubernetes.io/) or [Kind](https://kind.sigs.k8s.io/)
- Prepare an Alicloud account and create a user with `AliyunVPCFullAccess` and `AliyunRDSFullAccess` permissions to use the Relational Database Service (RDS). This user can be created and managed in the [Alicloud Resource Access Management (RAM) Console](https://ram.console.aliyun.com/users/)
- Additionally, we also need to configure the obtained AccessKey and SecretKey as environment variables: 

```shell
export ALICLOUD_ACCESS_KEY="LTAI5txxx" # replace it with your AccessKey
export ALICLOUD_SECRET_KEY="nxuowIxxx" # replace it with your SecretKey
```

:::info
Alternatively, Kusion provides a sensitive data management tool for handling the AccessKey and SecretKey mentioned above.
:::

![](/img/docs/user_docs/getting-started/set-rds-access.png)

## Review Project Structure and Config Codes

### Project Structure

Firstly, let's clone the Konfig repo and enter the root directory: 

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

Then we can locate the `wordpress` project under the `appops/` directory, which are composed of the following files: 

```shell
cd appops/wordpress && tree
.
├── README.md                       // Documentation
├── base							// Common configuration for all stacks
│   └── base.k					    // Common config code file for all stacks
├── dev							    // Stack directory
│   ├── ci-test					    // CI test directory, storing test scripts and data
│   │   ├── settings.yaml			// Configuration for test data and compiling
│   │   └── stdout.golden.yaml		// Expected Spec YAML, which can be updated using make
│   ├── kcl.yaml					// Multi-file compilation configuration for current stack
│   ├── main.k					    // Config codes for App Dev in current stack
│   ├── platform.k					// Config codes for Platform Dev in current stack
│   └── stack.yaml				    // Meta information of current stack
└── project.yaml				    // Meta information of current project

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
        # choose aliyun_rds as the cloud database
        dataBaseType = "aliyun_rds"
        dataBaseAttr = storage.DBAttr {
            # choose the engine type and version of the database
            databaseEngine = "MySQL"
            databaseEngineVersion = "5.7"
            # choose the charge type of the cloud database
            cloudChargeType = "Serverless"
            # create database account
            databaseAccountName = "root"
            databaseAccountPassword = option("db_password")
            # create internet access for the cloud database
            internetAccess = True
        }
    }
}
```

```python
# dev/platform.k
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_clouds.alicloud_backend.alicloud_config

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
# And platform.k is for the configurations in concern of platform developers. 

_alicloudResourceName = "{}-{}".format(metadata.__META_APP_NAME, metadata.__META_ENV_TYPE_NAME).lower()
_alicloudDependencyPrefix = "$kusion_path." + alicloud_config.alicloudProvider.namespace + ":" + alicloud_config.alicloudProvider.name + ":"

# defination of wordpress application frontend model
wordpress: frontend.Server {
    # add environment variable in main container with implicit alicloud resource dependency
    mainContainer: {
        env += [
            {
                name = "WORDPRESS_DB_HOST"
                value = _alicloudDependencyPrefix + alicloud_config.alicloudDBConnectionMeta.type + ":" + _alicloudResourceName + ".connection_string"
            }
        ]
    }
}
```

The configuration code files you need to pay attention to mainly include `dev/main.k` and `dev/platform.k`. Specifically: 

- `dev/main.k` contains config codes for **App Dev** to concentrate on for the wordpress application deployment in dev environment. In addition to the application container image, it also assigns an instance of type `storage.DataBase` to the `frontend.Server.database` attribute, and thus declaring an Alicloud RDS with the charge type of `Serverless` and internet access capability. 
- `dev/platform.k` contains config codes for **Platform Dev** to concentrate on for the wordpress application deployment in dev environment. Here, the main purpose is to specify the domain name of the cloud database to be connected to for the wordpress application container. 

As shown above, benefited from the advanced features of KCL concerning variable, function and schema definition, we can abstract and encapsulate the Alicloud RDS resources, which shields many properties that App Dev does not need to be aware of (such as the network segment of VPC and vSwitch behind RDS). App Dev only needs to fill in a few necessary fields in the frontend model instance to complete the declaration of RDS resources, so that the application configuration can be organized more flexibly and efficiently. Moreover, under the collaboration of writing config codes in the Konfig repository, App Dev and Platform Dev from different teams can perform their roles, only focusing on their own respective configuration items, thereby improving the collaboration efficiency of application development and operation. 

:::info
More details about Konfig models can be found in [Konfig](https://github.com/KusionStack/konfig)
:::

## Deliver Wordpress Application

You can complete the delivery of wordpress application using the following command line: 

```shell
cd appops/wordpress/dev && kusion apply --yes
```

![apply the wordpress application](/img/docs/user_docs/getting-started/apply-wordpress-application.png)

After all the resources reconsiled, we can port-forward our local port (e.g. 12345) to the wordpress frontend service port (80) in the cluster: 

```shell
kubectl port-forward -n wordpress-example svc/wordpress 12345:80
```

![kubectl port-forward for wordpress](/img/docs/user_docs/getting-started/wordpress-port-forward.png)

## Verify Wordpress Application

Next, we will verify the wordpress site service we just delivered, along with the creation of Alicloud RDS instance it depends on. We can start using the wordpress site by accessing the link of local-forworded port [(http://localhost:12345)](http://localhost:12345) we just configured in the browser. 

![wordpress site page](/img/docs/user_docs/getting-started/wordpress-site-page.png)

In addition, we can also log in to Alicloud Console page to view the RDS instance we just created. 

![alicloud rds instance](/img/docs/user_docs/getting-started/alicloud-rds-instance.png)

## Modify Wordpress Application

### Compliance Check of Config Code Modification

Using KCL to write application config codes naturally has the ability to perform type checking on configuration items. Validation logic can also be implemented through keywords like `assert` and `check`, making it more convenient to discover potential issues during the writing of application config codes and reduce the risk of delivering the application with wrong configuration. 

Take creating an Alicloud RDS resources as an example, according to the relevant regulations of Alicloud, if the charge type of RDS is `Serverless`, we can only create `MySQL` instances. The server backend model in Konfig repository has completed the validation logic through the `assert` keyword. Therefor, when we try to modify the database engine of RDS to `PostgreSQL` but forget to modify the charge type of `Serverless`, Kusion will throw the corresponding assertion failure during the compilation process before applying the wordpress application. 

![KCL Assertion Failure](/img/docs/user_docs/getting-started/kcl-assertion-failure.png)

### Apply Config Code Modification

As shown below, you can try to modify the config codes in `dev/main.k` to add an environment variable in the main container of the wordpress application. When using `kusion apply` to apply the config code modification, you can preview the resource changes with the capability of 3-way real-time diff of Kusion (note that we ignore the change of `metadata.managedFields` field in the following example for better demonstration). 

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

## Delete Wordpress Application

You can use the following command line to delete the wordpress application and related Alicloud RDS resources. 

```shell
kusion destroy --yes
```

![kusion destroy](/img/docs/user_docs/getting-started/kusion-destroy-wordpress.png)

## Summary

This tutorial demonstrates how to use KusionStack to deploy a wordpress application that depends on both Kubernetes and Alicloud RDS resources. During the process of writing and applying wordpress config codes, we can see that with the combination of KCL configuration and policy language, Konfig configuration code library and Kusion execution engine, KusionStack has the advantanges listed below: 

1. **Hybrid resource orchestration**: using KCL to write application config codes make it easy to orchestrate and manage different types of resources in a unified way. In the example of delivering a wordpress application with both Kubernetes and Alicloud IaaS resources, all the necessary dependencies can be declared in a single KCL code file, enabling one-click deployment of the entire application and achieving application-centric operations. 

2. **Application schema abstraction**: using KCL's advanced features such as built-in variables, functions and schema definition can easily abstract and encapsulate the dependent resources of the application, shielding developers from configuration attributes they don't need to be aware of. App Dev only needs to fill in a few necessary fields in the frontend model instance to declare the required resources, which makes it possible to organize application configuration more flexibly and efficiently. 

3. **Multi-team and multi-role collaboration**: under the collaboration of writing config codes in the Konfig repository, App Dev and Platform Dev from different teams can perform their roles, only focusing on their own respective configuration items, thereby improving the collaboration efficiency of application development and operation. 

4. **Shift left compliance check**: using KCL to write application config codes naturally has the ability to perform type checking on configuration items. Additionally, keywords like `assert` and `check` can be used to implement configuration validation logic, making it more convenient to identify potential issues during the writing of application config codes and reducing the risk of delivering the application with wrong configuration. Furthermore, Kusion can provide the 3-way real-time diff before the application is applied, allowing users to preview the configuration changes and thus providing a safer workflow. 

## Full Demonstration Video

The following video will show you a complete demonstration of how to deploy a wordpress application and related Alicloud RDS resources with Kusion command-line tool. 

[![kusionstack-delivery-wordpress-application](https://res.cloudinary.com/marcomontalbano/image/upload/v1682254540/video_to_markdown/images/youtube--psUV_WmP2OU-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://www.youtube.com/watch?v=psUV_WmP2OU "kusionstack-delivery-wordpress-application")
