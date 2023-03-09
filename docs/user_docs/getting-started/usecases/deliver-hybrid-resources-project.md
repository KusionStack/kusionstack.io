---
sidebar_position: 1
---

# Deliver Project with Hybrid Resources

This tutorial will demonstrate how to deliver project with hybrid resources(The project requires both kubernetes resources and IaaS resources), all at one Kusion command.

Unlike the previous Code-City usecase, this tutorial take a step further and will set up a WordPress site that requires resources from the IaaS layer - Aliyun OSS - as the cloud storage for media resources. That's common request for applications to save disk space for the server, reduce the workload of file migration when moving the website, and also avoid the limitation of server bandwidth when accessing files stored in independent cloud storage.

## Prerequisites

- [Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes](https://kubernetes.io/) or [Kind](https://kind.sigs.k8s.io/)
- This use case requires you to have an **Aliyun account** for utilizing its Object Storage Service (OSS).
- Additionally, **a user account with AliyunOSSFullAccess permission** is required, and you can create and manage it in the [Aliyun Resource Access Management (RAM) console](https://ram.console.aliyun.com/users/). And you can configure the obtained AccessKey and SecretKey obtained as environment variables:

```shell
export ALICLOUD_ACCESS_KEY="LTAI5txxx" # replace it with your AccessKey
export ALICLOUD_SECRET_KEY="nxuowIxxx" # replace it with your SecretKey
```

:::info
Alternatively, Kusion provides sensitive data management tool for handling the AccessKey and SecretKey mentioned above. For detailed guidance, please refer to documentation. todo @fuyuan
:::

![](/img/docs/user_docs/getting-started/set-oss-access.png)

## Clone Project 

Firstly, let's clone the Konfig repo and enter the root directory:

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

Then we can locate the WordPress project under the `appops/` directory, which are composed of the folowing files:

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
 More details about the directory structure can be found in [Konfig](/docs/user_docs/concepts/konfig).
:::

### Review Config Files

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

Here, apart from the code that describes the application container and services(these source codes are omitted to save space), a `storage.ObjectStorage` instance is assigned to the `frontend.Server.storage` attribute to declare that the WordPress application claims an Aliyun OSS bucket with `kusion-wordpress-oss` as name and `public-read` acl.

:::info
More details about Konfig Models can be found in [Konfig](https://github.com/KusionStack/konfig)
:::

## Delivery

We can deliver the WordPress Site into the Kubernetes cluster in both ways:

1. Open the `appops/wordpress/dev/main.k` file in VS Code IDE, and right click on the editor to select `Preview Live Diff and Apply` menu item. This operation will deploy the kubernetes resources required for launching the WordPress application and create an OSS bucket named "kusion-wordpress-oss" with public-read permissions.

Then after all resources reconciled, we can click the `port-forward` button popped up in the right bottom to forward the local port to the wordpress frontend service port in the cluster, and click `Open In Browser` to visit the WordPress Site we just delivered in our default browser.

:::info
You can find and install VS Code Kusion extension in the [VS Code Extension Market](https://marketplace.visualstudio.com/items?itemName=KusionStack.kusion)
:::

![apply wordpress with VS Code Kusion extension](/img/docs/user_docs/getting-started/wordpress-apply.gif)

2. Use the Kusion Cli:
```shell
cd appops/wordpress/dev && kusion apply --watch
```

After all resources reconciled, we can port-forward our local port to the wordpress frontend service port in the cluster:

```shell
➜  dev git:(main) ✗ kubectl port-forward -n wordpress-example svc/wordpress 12345:80
Forwarding from 127.0.0.1:12345 -> 80
Forwarding from [::1]:12345 -> 80
```

Then visit [http://localhost:12345](http://localhost:12345) to access to the WordPress Site in our browser.

## Validate and Configurate the OSS as WordPress's Storage

To get started with the WordPress site we just delivered, we need to first complete the installation and login to the site. Then in the WordPress's management sidebar, navigate to the `plugins` tab and click the `Install Plugins`, and search for the "Aliyun OSS" plugin and install it.

![set up the WordPress Site](/img/docs/user_docs/getting-started/wordpress-setup.gif)

As the `Aliyun OSS` plugin successfully installed, we then need to set up the plugin to use the OSS bucket we previously created. Fill in the AccessKey and SecretKey with Read/Write access to that bucket. The AccessKey and SecretKey can be created and obtained from the [Aliyun Resource Access Management (RAM) console](https://ram.console.aliyun.com/users/).

![set up the OSS Aliyun plugin](/img/docs/user_docs/getting-started/wordpress-setup-plugin.gif)

Once the configuration is complete, we can edit our blog post and upload images, such as the Kusion icon image in this case. Then click on the "Preview Changes" button, and we should see that the image has actually been uploaded to our OSS bucket.

![upload kusion icon](/img/docs/user_docs/getting-started/wordpress-oss-validation.gif)
