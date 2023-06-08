---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 在 Kubernetes 和云上部署 WordPress 应用

本教程将演示如何通过 KusionStack 一键部署 WordPress 应用 (该应用同时依赖 Kubernetes 和云厂商 IaaS 资源)。与我们之前介绍的部署在 Kubernetes 上的 Code-City 应用所不同的是，WordPress 应用还将依赖关系型数据库服务 RDS (Relational Database Service) 以便为 WordPress 网站的文章、页面、评论、用户等信息提供云端数据库解决方案。

## 完整演示

下面的视频将为您完整地演示如何通过 Kusion 命令行工具完成 WordPress 应用以及相关阿里云 RDS 资源的一键部署：

[![kusionstack-delivery-wordpress-application](/img/docs/user_docs/getting-started/wordpress-video-cover.png)](https://www.youtube.com/watch?v=QHzKKsoKLQ0 "kusionstack-delivery-wordpress-application")

## 前置条件

- [安装 Kusion](/docs/user_docs/getting-started/install)
- [部署 Kubernetes 集群](https://kubernetes.io/) 或 [Kind](https://kind.sigs.k8s.io/)
- [安装 Terraform](https://www.terraform.io/)
- 准备一个云服务账号，并创建一个具有 `VPCFullAccess` 和 `RDSFullAccess` 权限的用户，以使用其关系型数据库服务，该用户可以在云服务控制台中身份访问管理 (Identity and Access Management, IAM) 界面进行创建和管理

我们还需要将该用户的 AccessKey 和 SecretKey 配置为环境变量：

<Tabs>
<TabItem value="AWS" >

```bash
export AWS_ACCESS_KEY_ID="AKIAQZDxxxx" # replace it with your AccessKey
export AWS_SECRET_ACCESS_KEY="oE/xxxx" # replace it with your SecretKey
```

![aws iam account](/img/docs/user_docs/getting-started/aws-iam-account.png)

```mdx-code-block
</TabItem>
<TabItem value="阿里云">
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
此外，Kusion 还提供敏感数据管理工具，用以加密存储上述提到的 AccessKey 和 SecretKey。
:::

## 查看项目结构与配置代码

### 项目结构
首先，克隆 Konfig 仓库并进入 Konfig 目录：

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

在 `appops/` 目录下查看 `wordpress` 项目，由以下文件组成：

```shell
cd appops/wordpress && tree
.
├── README.md                       // 说明文档
├── base                            // 各环境通用配置
│   └── base.k                      // 应用的环境通用配置
├── dev                             // 环境目录
│   ├── ci-test                     // CI 测试目录，放置测试脚本和数据
│   │   ├── settings.yaml           // 测试数据和编译文件配置
│   │   └── stdout.golden.yaml      // 期望的 YAML，可通过 make 更新
│   ├── kcl.yaml                    // 当前 Stack 的多文件编译配置
│   ├── main.k                      // 应用在当前环境的应用开发者关注的配置清单
│   ├── platform.k                  // 应用在当前环境的平台开发者关注的配置清单
│   └── stack.yaml                  // Stack 元信息
└── project.yaml                    // Project 元信息

3 directories, 9 files
```

:::info
关于 Konfig 项目目录结构的更多详细信息，请查看 [Konfig 基本概念](/docs/user_docs/concepts/konfig)。
:::

### 配置代码

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

您所需要关注的配置代码文件主要包括 `dev/main.k` 和 `dev/platform.k`。其中：

- `dev/main.k` 存放了 WordPress 应用在 dev 这个环境中 **Developer** 所需要关注的配置清单，除了应用容器镜像外，还为 `frontend.Server.databse` 属性分配了一个 `storage.DataBase` 类型的实例，从而为 WordPress 应用的部署声明了一个以 MySQL 作为引擎的 RDS 数据库；
- `dev/platform.k` 存放了 WordPress 应用在 dev 这个环境中 **Platform** 所需要关注的配置清单，此处主要是为 WordPress 应用容器指定了待连接的云数据库域名以及 RDS 实例类型，此外，我们还可以在 `dev/platform.k` 中申明 RDS 收费类型等配置；

可以看到，得益于 KCL 的变量、函数、模型定义等高级功能，我们将云服务的 RDS 资源进行了抽象和封装，屏蔽了许多应用开发者无需感知的属性 (比如 RDS 背后 VPC 和 vSwitch 的网段)，Developer 只需在前端模型实例中填写几个必要的字段即可完成对 RDS 资源的声明，从而可以更自由、灵活、高效地组织应用配置。此外，在 Konfig 大库中共同编写配置代码的协作模式下，可能来自于不同团队的 Developer 和 Platform 能够各司其职，不同的角色可以仅关注自己负责的配置代码，从而提高应用研发与运维的协作效率。

:::info
更多有关Konfig模型的详细信息请查看 [Konfig 模型介绍](https://github.com/KusionStack/konfig)。
:::

## 部署 WordPress 应用

您可以通过下面的命令行完成 WordPress 应用的一键部署：

```shell
cd appops/wordpress/dev && kusion apply --yes
```

<Tabs>
<TabItem value="AWS" >

![apply the wordpress application with aws rds](/img/docs/user_docs/getting-started/apply-wordpress-application-with-aws-rds.png)

```mdx-code-block
</TabItem>
<TabItem value="阿里云">
```
![apply the wordpress application with alicloud rds](/img/docs/user_docs/getting-started/apply-wordpress-application.png)

```mdx-code-block
</TabItem>
</Tabs>

等待所有资源均调和完成后，我们可以将本地端口 (例如 12345) 转发到集群中的 WordPress 前端服务端口 (80): 

```shell
kubectl port-forward -n wordpress-example svc/wordpress 12345:80
```

![kubectl port-forward for wordpress](/img/docs/user_docs/getting-started/wordpress-port-forward.png)

## 验证 WordPress 应用服务

接下来我们验证一下刚刚部署的 WordPress 站点服务，及其所依赖的 RDS 资源的创建情况，我们在浏览器中访问刚刚配置的本地转发端口 [http://localhost:12345](http://localhost:12345) 即可开始 WordPress 站点的使用：

![wordpress site page](/img/docs/user_docs/getting-started/wordpress-site-page.png)

此外，还可以登录云服务控制台页面，查看我们刚刚创建的 RDS 资源实例：

<Tabs>
<TabItem value="AWS" >

![aws rds instance](/img/docs/user_docs/getting-started/aws-rds-instance.png)
![aws rds instance detailed information](/img/docs/user_docs/getting-started/aws-rds-instance-detail.png)

```mdx-code-block
</TabItem>
<TabItem value="阿里云">
```

![alicloud rds instance](/img/docs/user_docs/getting-started/alicloud-rds-instance.png)

```mdx-code-block
</TabItem>
</Tabs>

## 修改 WordPress 应用配置

### 配置合法性检查

使用 KCL 编写应用配置代码天然具备对配置字段进行类型检查的能力，此外还可通过 `assert`、`check` 等关键字实现配置字段的校验逻辑，从而能更加方便地在应用配置代码编写时就发现潜在的问题，减小错误配置生效带来的风险。

在创建 RDS 资源时，对于不同类型的云服务厂商，我们可以声明相应的 RDS 实例类型，Konfig 后端模型已通过 `assert` 关键字添加了对 RDS 实例类型的校验逻辑，因此，当我们不小心在 `dev/platform.k` 中修改 RDS 实例类型为一个无效的值时，Kusion 在生效前的编译过程中就将抛出相应的错误：

![KCL Assertion Failure](/img/docs/user_docs/getting-started/assert-rds-instance-type.png)

### 配置修改生效

您可以尝试通过修改 `dev/main.k` 中的配置代码，在主容器中添加一个环境变量，在使用 kusion apply 重新使配置生效时，可以通过 Kusion 命令行工具**三路实时差异比对 (3-way diff)** 的能力查看到相应资源的变更预览 (注：为了展示效果，此处我们忽略 metadata.managedFields 这个字段的变更)：

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

## 删除 WordPress 应用

您可通过下面的命令行完成 WordPress 应用及 RDS 相关资源的一键删除：

```shell
kusion destroy --yes
```

<Tabs>
<TabItem value="AWS" >

![kusion destroy wordpress with aws rds](/img/docs/user_docs/getting-started/kusion-destroy-wordpress-with-aws-rds.png)

```mdx-code-block
</TabItem>
<TabItem value="阿里云">
```

![kusion destroy wordpress with alicloud rds](/img/docs/user_docs/getting-started/kusion-destroy-wordpress.png)

```mdx-code-block
</TabItem>
</Tabs>


## 总结

本教程演示了如何使用 KusionStack 一键部署一个同时依赖 Kubernetes 和云 RDS 资源的 WordPress 应用。在进行应用配置代码的编写和生效的过程中，我们可以看到，结合了 KCL 配置策略语言、Konfig 配置代码大库以及 Kusion 执行引擎的 KusionStack 应用运维产品具备下述优势：

1. **支持混合资源编排**: 使用 KCL 编写应用配置代码可以很方便地对不同类型的资源进行统一的编排与管理，示例中使用了 Kubernetes 和云厂商 IaaS 资源的 WordPress 应用可以在一份 KCL 代码中完成声明，从而可以一键拉起所有依赖，实现以应用为中心的运维；

2. **提供应用模型抽象**: 使用 KCL 内置的变量、函数以及模型定义等高级功能，可以对应用所需的资源进行抽象和封装，屏蔽掉应用开发者无需感知的属性，Developer 只需在前端模型实例中填写几个必要的字段即可完成对所需资源的声明，从而可以更自由、灵活、高效地组织应用配置；

3. **多团队多角色协作**: 在 Konfig 大库中共同编写配置代码的协作模式下，可能来自于不同团队的 Developer 和 Platform 能够各司其职，不同的角色可以仅关注自己负责的配置代码，从而提高应用研发与运维的协作效率；

4. **配置风险校验左移**: 使用 KCL 编写应用配置代码天然具备配置字段类型检查的能力，此外还可通过 `assert`、`check` 等关键字实现配置校验逻辑，从而能更加方便地在应用配置代码编写时就发现潜在的问题，减小错误配置生效带来的风险，同时，Kusion 还可以在配置生效前提供**三路实时差异比对**的能力，用以预览配置的变更，从而提供一个更加安全的工作流程。
