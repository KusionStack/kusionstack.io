
---
sidebar_position: 2
---

# 混合资源项目一键交付

本教程将演示如何通过 Kusion 一键交付混合资源项目（该项目同时依赖 Kubernetes 资源和 IaaS 资源）。
本教程将带领你在云上搭建一个 WordPress 网站。与 Code-City 应用不同的是，WordPress 网站依赖 IaaS 资源（阿里云OSS）以便为媒体资源提供云端存储。采用云端存储属于很常见的实践，可以节省服务器的磁盘空间，减轻网站迁移时文件迁移工作量，同时避免访问独立云存储中文件时服务器带宽的限制。

## 前置条件

- [安装 Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes 集群](https://kubernetes.io/) 或 [Kind](https://kind.sigs.k8s.io/)
- 准备一个阿里云账户，以使用其对象存储服务（OSS）
- 创建一个具有 AliyunOSSFullAccess 权限的用户，该用户可在[阿里云资源访问控制（RAM）控制台](https://ram.console.aliyun.com/users/)中创建和管理。接着我们需要将该用户的 AccessKey 和SecretKey 配置为环境变量：

```shell
export ALICLOUD_ACCESS_KEY="LTAI5txxx" # replace it with your AccessKey
export ALICLOUD_SECRET_KEY="nxuowIxxx" # replace it with your SecretKey
```

:::info
此外，Kusion 还提供敏感数据管理工具，用以加密存储上述提到的 AccessKey 和 SecretKey。详细指导请参阅文档。todo @fuyuan
:::

![](/img/docs/user_docs/getting-started/set-oss-access.png)

## 了解项目 

首先，克隆 Konfig 仓库并进入 Konfig 目录：

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

在 `appops/` 目录下查看 WordPress 项目，由以下文件组成：

```shell
➜  konfig git:(main) ✗ cd appops/wordpress && tree
.
├── README.md
├── base
│   └── base.k
├── dev
│   ├── ci-test
│   │   ├── settings.yaml
│   │   └── stdout.golden.yaml
│   ├── kcl.yaml
│   ├── main.k
│   └── stack.yaml
└── project.yaml

3 directories, 8 files
```

:::info
关于 Konfig 项目目录结构的更多详细信息，请查看 [Konfig 基本概念](/docs/user_docs/concepts/konfig)。
:::

### 查看配置文件

```python
# base/base.k
# ...
wordpress = frontend.Server {
    name = "wordpress-deployment"
    # Some code are omitted, the complete code can be found in [Konfig/appops/wordpress](https://github.com/KusionStack/konfig/tree/main/wordpress/base/base.k)
    # volumes = {...}
    # mainContainer = {...}
    # services = {...}
    
    storage = storage.ObjectStorage {
        objectStorageType = "aliyun_oss"
        objectStorageAttr = storage.StorageAttr {
            bucket = "kusion-wordpress-oss"
            acl    = "public-read"
        }
    }
}
```

此处除了描述应用容器和服务的配置（这部分源代码已经在文档中略去）以外，还为`frontend.Server.storage`属性分配了一个`storage.ObjectStorage`类型的实例，从而为 WordPress 应用的部署声明一个名为`kusion-wordpress-oss`且具备公共读权限的阿里云 OSS bucket。

:::info
更多有关Konfig模型的详细信息请查看 [Konfig 模型介绍](https://github.com/KusionStack/konfig)。
:::

### 部署 WordPress 及关联 OSS Bucket

接下来我们将 WordPress 站点一键部署到 Kubernetes 集群，同时创建所需的 OSS bucket：

1. 通过 VS Code IDE 打开 `Konfig` 项目，打开 `appops/wordpress/dev/main.k` 文件，并右键选择 `Preview Live Diff and Apply` 菜单项。该操作将部署 WordPress 应用程序所需的 Kubernetes 资源，并创建一个名为 “kusion-wordpress-oss”、具有 public-read 权限的 OSS bucket。

接着，在所有资源协调完成后，我们可以点击右下角弹出的 port-forward 按钮将本地端口转发到集群中的 WordPress 前端服务端口，并单击 Open In Browser 在默认浏览器中访问我们刚刚交付的 WordPress 站点。

:::info
您可以访问 [VS Code 扩展市场](https://marketplace.visualstudio.com/items?itemName=KusionStack.kusion) 中搜索并安装 VS Code Kusion 扩展。
:::

![apply wordpress with VS Code Kusion extension](/img/docs/user_docs/getting-started/wordpress-apply.gif)

2. 通过 Kusion 命令行工具一键部署 WordPress 应用及相关 OSS 资源：

```shell
cd appops/wordpress/dev && kusion apply --watch
```
所有资源调和完成后，我们可以将本地端口（例如 12345）转发到集群中的 WordPress 前端服务端口（80）：

```shell
➜  dev git:(main) ✗ kubectl port-forward -n wordpress-example svc/wordpress 12345:80
Forwarding from 127.0.0.1:12345 -> 80
Forwarding from [::1]:12345 -> 80
```

接着在浏览器中访问 [http://localhost:12345](http://localhost:12345)，以使用 WordPress 站点。

### 验证并配置 OSS 作为 WordPress 的云端存储

接下来我们验证 WordPress 站点的服务，及其依赖的 OSS 资源创建情况。首先需要完成 WordPress 的安装和登录，并在 WordPress 的侧边栏进入`插件`设置，单击`安装插件`，搜索并安装 “Aliyun OSS” 插件。

![set up the WordPress Site](/img/docs/user_docs/getting-started/wordpress-setup.gif)

Aliyun OSS 插件安装成功后，我们需要设置插件使用我们之前创建的 OSS bucket，配置插件使用具有读写权限的 AccessKey 和 SecretKey，该 AccessKey 和 SecretKey 可以在[阿里云资源访问管理(RAM)控制台](https://ram.console.aliyun.com/users/)上创建和获取。

![set up the OSS Aliyun plugin](/img/docs/user_docs/getting-started/wordpress-setup-plugin.gif)

完成配置后，我们可以编辑博客文章并上传图片（例如此示例中的 Kusion 图标），并点击 "预览更改" 按钮。可以验证该图片实际已经上传到我们通过 kusion 一键创建出来的 OSS bucket.

![upload kusion icon](/img/docs/user_docs/getting-started/wordpress-oss-validation.gif)
