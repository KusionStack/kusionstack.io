---
sidebar_position: 2
---

# 在 Kubernetes 和云上部署 Wordpress 应用

本教程将演示如何通过 KusionStack 一键部署 Wordpress 应用 (该应用同时依赖 Kubernetes 和阿里云 IaaS 资源)。与我们之前介绍的部署在 Kubernetes 上的 Code-City 应用所不同的是，Wordpress 应用还将依赖阿里云关系型数据库 RDS (Relational Database Service) 以便为 Wordpress 网站的文章、页面、评论、用户等信息提供云端数据库解决方案。

## 前置条件

- [安装 Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes 集群](https://kubernetes.io/) 或 [Kind](https://kind.sigs.k8s.io/)
- [Terraform](https://www.terraform.io/)
- 准备一个阿里云账号，并创建一个具有 `AliyunVPCFullAccess` 和 `AliyunRDSFullAccess` 权限的用户，以使用其关系型数据库服务 (RDS)，该用户可以在[阿里云资源访问控制 (RAM) 控制台](https://ram.console.aliyun.com/users/)中创建和管理
- 我们还需要将该用户的 AccessKey 和 SecretKey 配置为环境变量：

```shell
export ALICLOUD_ACCESS_KEY="LTAI5txxx" # replace it with your AccessKey
export ALICLOUD_SECRET_KEY="nxuowIxxx" # replace it with your SecretKey
```

:::info
此外，Kusion 还提供敏感数据管理工具，用以加密存储上述提到的 AccessKey 和 SecretKey。
:::

![](/img/docs/user_docs/getting-started/set-rds-access.png)

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

您所需要关注的配置代码文件主要包括 `dev/main.k` 和 `dev/platform.k`。其中：

- `dev/main.k` 存放了 Wordpress 应用在 dev 这个环境中 **App Dev** 所需要关注的配置清单，除了应用容器镜像外，还为 `frontend.Server.databse` 属性分配了一个 `storage.DataBase` 类型的实例，从而为 Wordpress 应用的部署声明了一个收费类型为 `Serverless` 且具备公网访问权限的阿里云 RDS 数据库；
- `dev/platform.k` 存放了 Wordpress 应用在 dev 这个环境中 **Platform Dev** 所需要关注的配置清单，此处主要是为 Wordpress 应用容器指定了待连接的云数据库域名；

可以看到，得益于 KCL 的变量、函数、模型定义等高级功能，我们将阿里云 RDS 资源进行了抽象和封装，屏蔽了许多应用开发者无需感知的属性 (比如 RDS 背后 VPC 和 vSwitch 的网段)，App Dev 只需在前端模型实例中填写几个必要的字段即可完成对 RDS 资源的声明，从而可以更自由、灵活、高效地组织应用配置。此外，在 Konfig 大库中共同编写配置代码的协作模式下，可能来自于不同团队的 App Dev 和 Platform Dev 能够各司其职，不同的角色可以仅关注自己负责的配置代码，从而提高应用研发与运维的协作效率。

:::info
更多有关Konfig模型的详细信息请查看 [Konfig 模型介绍](https://github.com/KusionStack/konfig)。
:::

## 部署 Wordpress 应用

您可以通过下面的命令行完成 Wordpress 应用的一键部署：

```shell
cd appops/wordpress/dev && kusion apply --yes
```

![apply the wordpress application](/img/docs/user_docs/getting-started/apply-wordpress-application.png)

等待所有资源均调和完成后，我们可以将本地端口 (例如 12345) 转发到集群中的 Wordpress 前端服务端口 (80): 

```shell
kubectl port-forward -n wordpress-example svc/wordpress 12345:80
```

![kubectl port-forward for wordpress](/img/docs/user_docs/getting-started/wordpress-port-forward.png)

## 验证 Wordpress 应用服务

接下来我们验证一下刚刚部署的 Wordpress 站点服务，及其所依赖的阿里云 RDS 资源的创建情况，我们在浏览器中访问刚刚配置的本地转发端口 [http://localhost:12345](http://localhost:12345) 即可开始 Wordpress 站点的使用：

![wordpress site page](/img/docs/user_docs/getting-started/wordpress-site-page.png)

此外，还可登录阿里云控制台页面，查看我们刚刚创建的 RDS 资源实例：

![alicloud rds instance](/img/docs/user_docs/getting-started/alicloud-rds-instance.png)

## 修改 Wordpress 应用配置

### 配置合法性检查

使用 KCL 编写应用配置代码天然具备对配置字段进行类型检查的能力，此外还可通过 `assert`、`check` 等关键字实现配置字段的校验逻辑，从而能更加方便地在应用配置代码编写时就发现潜在的问题，减小错误配置生效带来的风险。

在创建阿里云 RDS 资源时，当收费类型为 `Serverless` 时，我们只能创建 MySQL 实例，Konfig 后端模型已通过 `assert` 关键字添加了这段校验逻辑，因此，当我们试图修改 RDS 的数据库引擎但忘记修改收费类型时，Kusion 在生效前的编译过程中就将抛出相应的错误：

![KCL Assertion Failure](/img/docs/user_docs/getting-started/kcl-assertion-failure.png)

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

## 删除 Wordpress 应用

您可通过下面的命令行完成 Wordpress 应用及阿里云 RDS 相关资源的一键删除：

```shell
kusion destroy --yes
```

![kusion destroy](/img/docs/user_docs/getting-started/kusion-destroy-wordpress.png)

## 总结

本教程演示了如何使用 KusionStack 一键部署一个同时依赖 Kubernetes 和阿里云 RDS 资源的 Wordpress 应用。在进行应用配置代码的编写和生效的过程中，我们可以看到，结合了 KCL 配置策略语言、Konfig 配置代码大库以及 Kusion 执行引擎的 KusionStack 应用运维产品具备下述优势：

1. **支持混合资源编排**: 使用 KCL 编写应用配置代码可以很方便地对不同类型的资源进行统一的编排与管理，示例中使用了 Kubernetes 和阿里云 IaaS 资源的 Wordpress 应用可以在一份 KCL 代码中完成声明，从而可以一键拉起所有依赖，实现以应用为中心的运维；

2. **提供应用模型抽象**: 使用 KCL 内置的变量、函数以及模型定义等高级功能，可以对应用所需的资源进行抽象和封装，屏蔽掉应用开发者无需感知的属性，App Dev 只需在前端模型实例中填写几个必要的字段即可完成对所需资源的声明，从而可以更自由、灵活、高效地组织应用配置；

3. **多团队多角色协作**: 在 Konfig 大库中共同编写配置代码的协作模式下，可能来自于不同团队的 App Dev 和 Platform Dev 能够各司其职，不同的角色可以仅关注自己负责的配置代码，从而提高应用研发与运维的协作效率；

4. **配置风险校验左移**: 使用 KCL 编写应用配置代码天然具备配置字段类型检查的能力，此外还可通过 `assert`、`check` 等关键字实现配置校验逻辑，从而能更加方便地在应用配置代码编写时就发现潜在的问题，减小错误配置生效带来的风险，同时，Kusion 还可以在配置生效前提供**三路实时差异比对**的能力，用以预览配置的变更，从而提供一个更加安全的工作流程。

## 完整演示

下面的视频将为您完整地演示如何通过 Kusion 命令行工具完成 Wordpress 应用以及相关阿里云 RDS 资源的一键部署：

[![kusionstack-delivery-wordpress-application](https://res.cloudinary.com/marcomontalbano/image/upload/v1682254540/video_to_markdown/images/youtube--psUV_WmP2OU-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://www.youtube.com/watch?v=psUV_WmP2OU "kusionstack-delivery-wordpress-application")
