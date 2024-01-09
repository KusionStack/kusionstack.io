---
sidebar_position: 1
---

# KusionStack Helps Users Better Use KubeVela

## Introduction

In recent years, Kubernetes has gradually become the de facto standard for cloud-native technology infrastructure, unifying the orchestration and scheduling of infrastructure resources. However, Kubernetes does not provide an operational model from an application-centric perspective, which results in a higher cognitive cost for application developers, impacts the application management experience, and ultimately reduces development efficiency. To address this issue, the **KubeVela** platform and the **KusionStack** technology stack have emerged. 

KubeVela is an excellent application delivery server solution that can serve as a highly available control plane for the centralized management of scalable applications. As a CNCF (Cloud Native Computing Foundation) incubating project, KubeVela has garnered significant attention and participation from a large number of users and developers due to its novel technical concepts and relatively high completion. 

KusionStack is an **application-centric** delivery and operation technology stack that acts as a client entry point for writing and applying application configurations. It enables configuration model abstraction and complexity reduction, configuration field type checking and validation, as well as unified orchestration of Kubernetes and cloud resources. As a result, KubeVela users can benefit from a better experience in areas like hybrid resource operation, team collaboration, and shift-left security. 

## KubeVela

KubeVela is an out-of-the-box modern application delivery and management platform built on top of Kubernetes clusters, various cloud platforms, and diverse IoT devices. It achieves application delivery and management in hybrid and multi-cloud environments through the **Open Application Model (OAM)**, a modular, scalable, and portable cloud-native application abstraction standard. 

![KubeVela usage example](/img/docs/user_docs/guides/kubevela/kubevela_usage_example.png)

KubeVela translates all the components required for application deployment and various operational traits into an infrastructure-agnostic deployment plan. As a control plane application delivery engine, KubeVela is primarily integrated into PaaS (Platform as a Service) platforms in the form of a Kubernetes Custom Resource Definition (CRD) controller. Users can achieve standardized application delivery by writing **KubeVela Application** resource YAML files. A typical KubeVela Application is shown below. 

![KubeVela application example](/img/docs/user_docs/guides/kubevela/kubevela_application_example.png)

## KusionStack

KusionStack is an open-source programmable engineering stack to facilitate app-centric development and unified operation, inspired by the phrase **'Fusion on the Kubernetes'**. The main motivation is to help platform and app developers to develop and deliver in a self-serviceable, fast, reliable, and collaborative way. 

KusionStack consists of a series of tools and products. Among them, KCL provides programmability similar to modern programming languages, Kusion turns blueprints into reality with powerful engines and orchestration capabilities, and Konfig holds app delivery models and components. Users can choose to use one of them, such as KCL, or use them in combination.

- **KCL**: Configuration and policy programming language for application developers, along with its protocols, toolchains, and IDE plugins
- **Kusion**: Operation engine, toolchains, service, IDE workspace
- **Konfig**: Shared repository of application models and components, and CI suite for GitOps workflows (such as GitHub Actions suite)

![KusionStack workflow example](/img/docs/user_docs/guides/kubevela/kusionstack_workflow_example.png)

## KusionStack Helps Users Better Use KubeVela

In enterprise-level scenarios such as **large-scale application configuration management**, different teams (infrastructure, platform, business) with different roles (developers, SREs) may simultaneously have unified delivery and differentiated cloud resource management requirements for hundreds or even thousands of applications. In such situations, challenges arise on how to achieve better multi-team, multi-role collaboration and how to manage hybrid resources with applications in a unified way.

KusionStack, when combined with KubeVela, serves as an operational technology carrier that helps users enhance the efficiency and security of application delivery and management in large-scale environments. It facilitates a seamless experience in addressing the complexities of coordinating multiple teams and roles while managing applications at the center of hybrid resource unification.

### Application-centric Unified Resource Management

KubeVela offers rich extensible mechanisms, supporting users to create Terraform-like component definitions (ComponentDefinition). Users can declare HCL (HashiCorp Configuration Language) code in YAML files describing their applications to manage resources in multi-cloud and hybrid environments. However, **writing HCL code in YAML may lead to a somewhat fragmented user experience**.

On the other hand, KusionStack uses KCL (Kusion Configuration Language) to provide **a unified description of application-dependent resources**. Developers can declare both Kubernetes resources and IaaS (Infrastructure as a Service) cloud resources (such as VPC, OSS, RDS, etc.) in a single configuration file, simplifying cognitive overhead and improving the operational experience.

![Unified Description of Application's K8s & IaaS Cloud Resource Configuration Example in a KCL File](/img/docs/user_docs/guides/kubevela/unified_description_in_kcl.png)

### Multi-team and Multi-role Collaboration

KusionStack and KubeVela are both systems designed for the separation of concerns, where users are naturally divided into two roles: **Developer** and **Platform**. Different roles can focus solely on their concerned configuration items to improve development and operational efficiency.

However, in large-scale application delivery scenarios, KubeVela Application YAML files and related Custom Resource Definitions (CRDs) for each application are often scattered across different locations, making it challenging to manage and collaborate effectively. KusionStack addresses this issue by adopting the Konfig repository pattern, providing support for large-scale collaboration. All team members can collaborate on writing and auditing application configuration code in the same Git repository. Additionally, KusionStack utilizes KCL for unified operational intent descriptions, further enhancing collaboration efficiency.

Moreover, KusionStack simplifies the writing of configuration code for developers by encapsulating various complex application models into a unified frontend + backend model. The frontend model serves as the user interface for developers to write configuration code and contains all configurable properties exposed by the platform, while abstracting away redundant and deducible configurations, presenting only the necessary attributes for user interaction. The backend model is the concrete implementation of the model, responsible for applying the properties defined in the frontend model. It includes resource rendering, compliance validation, and other logical fragments, improving the robustness and reusability of configuration code without requiring developers to be aware of the underlying complexity.

![Developer & Platform Collaboration Example](/img/docs/user_docs/guides/kubevela/developer_and_platform_collab_example.png)

### Shift-left Security

When declaring KubeVela Applications, KubeVela users utilize YAML plaintext, which lacks client-side validation capabilities for configuration fields such as type, value constraints, and security compliance policies.

KusionStack, on the other hand, employs a **Policy as Code (PaC)** mechanism, allowing for more convenient detection of potential issues during the writing of application configurations. This enables identifying problems before the CR (Custom Resource) is applied, reducing the risks associated with erroneous configurations taking effect. Additionally, the Kusion engine provides a three-way real-time diff comparison capability before the configuration takes effect, allowing users to preview configuration changes and thereby offering a safer workflow.

![KCL Code Validation Example](/img/docs/user_docs/guides/kubevela/shift_left_security_example.png)

![3-Way Real-time Diff Example](/img/docs/user_docs/guides/kubevela/3_way_diff_example.png)

## The Integration Solution of KusionStack and KubeVela

The proposed solution for integrating KubeVela with KusionStack is illustrated in the following diagram. In this setup, KusionStack serves as the client side for application delivery and management, providing a unified abstraction of application configuration models and unified orchestration of Kubernetes and cloud resources. Additionally, it supports multi-team & multi-role collaboration and configuration code risk validation capabilities. On the other hand, KubeVela acts as the control plane backend, responsible for the deployment of Kubernetes resources, while Terraform handles the management of cloud resources.

![Workflow of KubeVela Integrated with KusionStack](/img/docs/user_docs/guides/kubevela/integration_solution.png)

The corresponding workflow is as follows. 

- Users utilize KCL to write the Konfig application configuration model, which can include a mix of Kubernetes and Terraform resources.

- Kubernetes resources in the application model instance will be rendered as KubeVela Application CRs (Custom Resources), while Terraform resources will be rendered as configuration data in Kusion Spec format.

- Users deliver the KubeVela Application instances to KubeVela using the Kusion command-line tool, and the Terraform resources are delivered to Terraform to complete the resource deployment.

## Practical Example: Deliver WordPress Application to Kubernetes and Clouds

Here is an example of delivering a WordPress application to Kubernetes and the cloud using KusionStack in conjunction with KubeVela. WordPress is an open-source content management system (CMS) that can be used to create and manage various types of websites and handle multiple users and roles. In our practical example, the WordPress application will rely on AWS Relational Database Service (RDS) to provide a cloud-based database solution for managing WordPress site content, including articles, pages, comments, and user information.

### Prerequisites

- [Install Kusion](/docs/user_docs/getting-started/install-kusion)
- [Install KubeVela](https://kubevela.io/)
- [Deploy Kubernetes](https://kubernetes.io/) or [Kind](https://kind.sigs.k8s.io/)
- [Install Terraform](https://www.terraform.io/)
- Prepare an AWS account and create a user with the permissions for `AmazonVPCFullAccess` and `AmazonRDSFullAccess` to utilize the Amazon Relational Database Service (RDS). This user can create and manage resources in the AWS Identity and Access Management (IAM) console

![aws iam account](/img/docs/user_docs/guides/kubevela/aws_iam_account.png)

Additionally, we also need to configure the obtained AccessKey and SecretKey as environment variables: 

```bash
export AWS_ACCESS_KEY_ID="AKIAQZDxxxx" # replace it with your AccessKey
export AWS_SECRET_ACCESS_KEY="oE/xxxx" # replace it with your SecretKey
```

:::info
Alternatively, Kusion provides a **Secret as Code** solution for handling the AccessKey and SecretKey mentioned above.
:::

### Review Project Structure and Config Codes

#### Project Structure

Firstly, let's clone the Konfig repo and enter the root directory: 

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

Then we can locate the `wordpress-kubevela` project under the `appops/` directory, which is composed of the following files: 

```shell
cd appops/wordpress-kubevela && tree
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
More details about the directory structure can be found in [Konfig](/docs/user_docs/concepts/glossary)
:::

#### Config Codes

The configuration code files we need to pay attention to mainly include `dev/main.k` and `dev/platform.k`.

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

Specifically: 

- `dev/main.k` contains config codes for **Developer** to concentrate on for the WordPress application deployment in the dev environment. In addition to the application container image, it also assigns an instance of a type `storage.DataBase` to the `frontend.Server.database` attribute, and thus declaring an RDS with MySQL as the database engine. 
- `dev/platform.k` contains config codes for **Platform** to concentrate on for the WordPress application deployment in the dev environment. Here, the main purpose is to specify the domain name of the cloud database to be connected to for the WordPress application container and the RDS instance type. In addition, we can also declare the RDS charging type and other configurations in `dev/platform.k`.  

As shown above, benefiting from the advanced features of KCL concerning variable, function, and schema definition, we can abstract and encapsulate the RDS resources, which shields many properties that the Developer does not need to be aware of (such as the network segment of VPC and vSwitch behind RDS). The developer only needs to fill in a few necessary fields in the frontend model instance to complete the declaration of RDS resources, so that the application configuration can be organized more flexibly and efficiently. Moreover, under the collaboration of writing config codes in the Konfig repository, Developers and Platforms from different teams can perform their roles, only focusing on their own respective configuration items, thereby improving the collaboration efficiency of application development and operation. 

### Deliver WordPress Application

We can complete the delivery of the WordPress application using the following command line:

```shell
cd appops/wordpress-kubevela/dev && kusion apply --yes
```

![apply the wordpress application with aws rds](/img/docs/user_docs/guides/kubevela/kusion_apply.png)

After all the resources reconciled, we can port-forward our local port (e.g. 12345) to the WordPress frontend service port (80) in the cluster:

```shell
kubectl port-forward -n wordpress-kubevela svc/wordpress 12345:80
```

![kubectl port-forward for wordpress](/img/docs/user_docs/guides/kubevela/port_forward.png)

### Verify WordPress Application

Next, we will verify the WordPress site service we just delivered, along with the creation of the RDS instance it depends on. We can start using the WordPress site by accessing the link of local-forwarded port [(http://localhost:12345)](http://localhost:12345) we just configured in the browser. 

![wordpress site page](/img/docs/user_docs/getting-started/wordpress-site-page.png)

We can use `velaux` or `vela top` commands to view the KubeVela Application-related resources. 

```shell
vela port-forward addon-velaux -n vela-system 8080:80
```

![velaux](/img/docs/user_docs/guides/kubevela/velaux.png)

```shell
vela top
```

![vela top](/img/docs/user_docs/guides/kubevela/vela_top.png)

In addition, we can also log in to the cloud service console page to view the RDS instance we just created.

![rds info](/img/docs/user_docs/guides/kubevela/rds_info.png)
![rds detailed](/img/docs/user_docs/guides/kubevela/rds_detailed.png)

### Modify WordPress Application

#### Compliance Check of Config Code Modification

Using KCL to write application config codes naturally has the ability to perform type-checking on configuration items. Validation logic can also be implemented through keywords like `assert` and `check`, making it more convenient to discover potential issues during the writing of application config codes and reduce the risk of delivering the application with the wrong configuration. 

When creating an RDS resource, for different types of cloud service vendors, we can declare the corresponding RDS instance type, and the Konfig backend model has added the validation logic for the RDS instance type through the `assert` keyword, so when we accidentally modify the RDS instance type to an invalid value in `dev/platform.k`, Kusion will throw a corresponding error during the compilation process before applying the resource. 

![KCL Assertion](/img/docs/user_docs/guides/kubevela/assert.png)

#### Apply Config Code Modification

As shown below, we can try to modify the config codes in the file `dev/main.k` to add an environment variable in the main container of the WordPress application. When using `kusion apply` to apply the config code modification, we can preview the resource changes with the capability of 3-way real-time diff of Kusion (note that we ignore the change of `metadata.managedFields` field in the following example for better demonstration). 

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

![kusion apply diff](/img/docs/user_docs/guides/kubevela/kusion_apply_diff.png)

### Delete WordPress Application

We can delete the WordPress application and related RDS resources using the following command line. 

```shell
kusion destroy --yes
```

![kusion destroy](/img/docs/user_docs/guides/kubevela/kusion_destroy.png)

## Summary

This article introduces how KusionStack empowers developers and platform users to achieve efficient application delivery management using KubeVela. In the proposed integration solution, KusionStack serves as a unified abstraction and orchestration layer for hybrid application resource models, while KubeVela handles the activation of Kubernetes resources, and Terraform manages cloud resources.

From the practical example of rapidly deploying WordPress to the cloud, we can observe the following features that KusionStack offers:

- **Application-centric unified resource management**: Using KCL, developers can abstract and encapsulate Kubernetes and IaaS cloud resources required by the application, hiding properties that developers don't need to be aware of. This approach enables more freedom, flexibility, and efficiency in organizing application configurations and easily launching all dependencies, achieving an application-centric operations approach.

- **Multi-team and multi-role collaboration**: By collaboratively writing configuration code in the Konfig repository, developers and platform users can focus on their respective responsibilities, enhancing collaboration efficiency between different roles and improving application development and operational cooperation.

- **Shift-left compliance check**: Writing application configuration code with KCL allows for the detection of potential issues during the writing phase, reducing the risks associated with erroneous configurations taking effect. Additionally, Kusion offers a three-way real-time diff comparison capability before configuration activation, allowing users to preview configuration changes and providing a safer workflow.
