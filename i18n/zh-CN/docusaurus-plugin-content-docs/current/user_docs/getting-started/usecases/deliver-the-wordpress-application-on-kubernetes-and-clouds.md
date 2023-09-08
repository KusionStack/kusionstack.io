---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 在 Kubernetes 和云上部署 WordPress 应用

本教程将演示如何通过 KusionStack 一键部署 WordPress 应用 (该应用同时依赖 Kubernetes 和云厂商 IaaS 资源)。与我们之前介绍的部署在 Kubernetes 上的 Code-City 应用所不同的是，WordPress 应用还将依赖关系型数据库服务 RDS (Relational Database Service) 以便为 WordPress 网站的文章、页面、评论、用户等信息提供云端数据库解决方案。

<!-- ## 完整演示

下面的视频将为您完整地演示如何通过 Kusion 命令行工具完成 WordPress 应用以及相关阿里云 RDS 资源的一键部署：

[![kusionstack-delivery-wordpress-application](/img/docs/user_docs/getting-started/wordpress-video-cover.png)](https://www.youtube.com/watch?v=QHzKKsoKLQ0 "kusionstack-delivery-wordpress-application") -->

## 前置条件

- [安装 Kusion](/docs/user_docs/getting-started/install)
- [部署 Kubernetes 集群](https://kubernetes.io/) 或 [Kind](https://kind.sigs.k8s.io/) 或 [[Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/)
- [安装 Terraform](https://www.terraform.io/)
- 准备一个云服务账号，并创建一个具有 `VPCFullAccess` 和 `RDSFullAccess` 权限的用户，以使用其关系型数据库服务，该用户可以在云服务控制台中身份访问管理 (Identity and Access Management, IAM) 界面进行创建和管理
- 您执行 `kusion` 的环境需要能够连接到 `terraform` registry

我们还需要将该Provider Region, 用户的 AccessKey 和 SecretKey 配置为环境变量：

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
<TabItem value="阿里云">
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

## 初始化项目

我们可以使用在线模板初始化这个教程项目

```shell
kusion init --online
```

所有初始化模板如下：

```shell
~/playground$ kusion init --online
? Please choose a template:  [Use arrows to move, type to filter]
> code-city                  Code City metaphor for visualizing Go source code in 3D.
  deployment-multi-stack     A minimal kusion project of multiple stacks
  deployment-single-stack    A minimal kusion project of single stack
  wordpress                  A sample wordpress project
```

选择 `wordpress` 并按 `Enter` 。 之后，我们将看到下面的提示，并使用默认值来配置这个项目和 Stack。

![](/img/docs/user_docs/getting-started/init-wordpress.gif)

在此过程之后，我们可以使用此命令获取整个文件层次结构：

```shell
~/playground$ tree wordpress/
wordpress/
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
更多关于目录结构的细节请参见 [Concepts](/docs/user_docs/concepts/glossary).
:::

### 配置代码

我们来查看一下目录中生成的配置文件：

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
        subnetID = "{这里填入您的子网或者VSwitch ID}"
        securityIPs = ["0.0.0.0/0"]
        privateRouting = False
    }
}
```

在 `dev/main.k` 中，您需要替换 `{这里填入您的子网或者VSwitch ID}` 并填入创建 RDS 实例的子网或者 VSwitchID。

如果您想使用AWS创建RDS资源，您可以将 `dev/platform.k` 修改成如下配置：
```
import catalog.models.schema.v1 as ac

# platform.k declares customized configurations for a given platform
wordpress: ac.AppConfiguration {
    database: {
        type = "aws"
        # 这个 instanceType 是 AWS 特有的
        instanceType = "db.t3.micro"
        category = "serverless_basic"
        securityIPs = ["0.0.0.0/0"]
        privateRouting = False
    }
}
```

您所需要关注的配置代码文件主要包括 `dev/main.k` 和 `dev/platform.k`。其中：

- `dev/main.k` 存放了 WordPress 应用在 dev 这个环境中 **开发团队** 所需要关注的配置清单，除了应用容器镜像、网络配置外，还为应用声明了一个 `db.DataBase` 类型的实例，从而为 WordPress 应用的部署声明了一个以 MySQL 作为引擎的 RDS 数据库；
- `dev/platform.k` 存放了 WordPress 应用在 dev 这个环境中 **平台团队** 所需要关注的配置清单，此处主要是为 WordPress 应用容器指定了待连接的云数据库 RDS 实例类型、网络配置等。

可以看到，得益于 KCL 的变量、函数、模型定义等高级功能，我们将云服务的 RDS 资源进行了抽象和封装，屏蔽了许多应用开发者无需感知的属性，Developer 只需在前端模型实例中填写几个必要的字段即可完成对 RDS 资源的声明，从而可以更自由、灵活、高效地组织应用配置。此外，在共同编写配置代码的协作模式下，可能来自于不同团队的研发和平台团队能够各司其职，不同的角色可以仅关注自己负责的配置代码，从而提高应用研发与运维的协作效率。

:::info
更多有关Catalog模型的详细信息请查看 [Catalog 模型介绍](https://github.com/KusionStack/catalog)。
:::

## 部署 WordPress 应用

您可以通过下面的命令行完成 WordPress 应用的一键部署：

```shell
cd wordpress/dev && kusion apply --yes
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
```

## 修改 WordPress 应用配置

<!-- ### 配置合法性检查

使用 KCL 编写应用配置代码天然具备对配置字段进行类型检查的能力，此外还可通过 `assert`、`check` 等关键字实现配置字段的校验逻辑，从而能更加方便地在应用配置代码编写时就发现潜在的问题，减小错误配置生效带来的风险。

在创建 RDS 资源时，对于不同类型的云服务厂商，我们可以声明相应的 RDS 实例类型，Catalog 模型已通过 `assert` 关键字添加了对 RDS 实例类型的校验逻辑，因此，当我们不小心在 `dev/platform.k` 中修改 RDS 实例类型为一个无效的值时，Kusion 在生效前的编译过程中就将抛出相应的错误：

![KCL Assertion Failure](/img/docs/user_docs/getting-started/assert-rds-instance-type.png) -->

### 配置修改生效

您可以尝试通过修改 `dev/main.k` 中的配置代码，在业务容器中添加一个环境变量，在使用 kusion apply 重新使配置生效时，可以通过 Kusion 命令行工具**三路实时差异比对 (3-way diff)** 的能力查看到相应资源的变更预览 (注：为了展示效果，此处我们忽略 metadata.managedFields 这个字段的变更)：

```python
# dev/main.k
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            wordpress: c.Container {
                # 此处省略了一些没有改变的配置代码
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

本教程演示了如何使用 KusionStack 一键部署一个同时依赖 Kubernetes 和云 RDS 资源的 WordPress 应用。在进行应用配置代码的编写和生效的过程中，我们可以看到，结合了 KCL 配置策略语言、Catalog 模型仓库以及 Kusion 执行引擎的 KusionStack 应用运维产品具备下述优势：

1. **支持混合资源编排**: 使用 KCL 编写应用配置代码可以很方便地对不同类型的资源进行统一的编排与管理，示例中使用了 Kubernetes 和云厂商 IaaS 资源的 WordPress 应用可以在一份 KCL 代码中完成声明，从而可以一键拉起所有依赖，实现以应用为中心的运维；

2. **提供应用模型抽象**: 使用 KCL 内置的变量、函数以及模型定义等高级功能，可以对应用所需的资源进行抽象和封装，屏蔽掉应用开发者无需感知的属性，Developer 只需在前端模型实例中填写几个必要的字段即可完成对所需资源的声明，从而可以更自由、灵活、高效地组织应用配置；

3. **多团队多角色协作**: 在共同编写配置代码的协作模式下，可能来自于不同团队的 Developer 和 Platform 能够各司其职，不同的角色可以仅关注自己负责的配置代码，从而提高应用研发与运维的协作效率；

4. **配置风险校验左移**: 使用 KCL 编写应用配置代码天然具备配置字段类型检查的能力，此外还可通过 `assert`、`check` 等关键字实现配置校验逻辑，从而能更加方便地在应用配置代码编写时就发现潜在的问题，减小错误配置生效带来的风险，同时，Kusion 还可以在配置生效前提供**三路实时差异比对**的能力，用以预览配置的变更，从而提供一个更加安全的工作流程。
