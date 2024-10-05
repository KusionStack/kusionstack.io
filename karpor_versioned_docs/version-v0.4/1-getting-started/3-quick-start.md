---
title: Quick Start
---
## Prerequisites

* Ensure [kubectl](https://kubernetes.io/docs/tasks/tools/) is installed.
* Ensure [helm](https://helm.sh/docs/intro/install/) is installed.
* If you do not have a ready-made cluster, you still need a [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation/).

## Create Cluster (Optional)

First, if you do not have a ready-made cluster, you need to create a kubernetes cluster in your local environment with the `kind` tool. Follow these steps:

1. Create a cluster. You can create a cluster named `demo-cluster` using the following command:
   ```shell
   kind create cluster --name demo-cluster
   ```

   This will create a new Kubernetes cluster in your local Docker environment. Wait for a moment until the cluster creation is complete.
2. Verify that the cluster is running properly by executing the command:
   ```shell
   kubectl cluster-info
   ```

   If everything is set up correctly, you'll see information about your Kubernetes cluster.

## Installation

To install Karpor, execute the following command in your terminal:

```shell
helm repo add kusionstack https://kusionstack.github.io/charts
helm repo update
helm install karpor kusionstack/karpor
```

For more installation details, please refer to the [Installation Documentation](2-installation.md).

![Install](./assets/2-installation/install.gif)

## Access Karpor Dashboard

1. Run the following command to forward the Karpor server port:
   ```shell
   kubectl -n karpor port-forward service/karpor-server 7443:7443
   ```

   This will create a port forward from your local machine to the Karpor server.
2. Open your browser and enter the following URL:
   ```shell
   https://127.0.0.1:7443
   ```

This will take you to the karpor dashboard. 👇

![Open in Browser](./assets/2-installation/open-in-browser.gif)

Congratulations! 🎉 You have successfully installed Karpor. Now you can start using Karpor for multi-cluster search and insights.

## Register Cluster

To register a new cluster with Karpor, follow these steps:

1. Navigate to the `Cluster Management` section in the Karpor UI.
2. Click on the `Register Cluster` button.
3. Follow the on-screen instructions to complete the registration process.

An example of the registration button can be found in the image below:

![](/karpor/assets/cluster-mng/cluster-mng-register-new-cluster.png)

For a more detailed explanation of the registration process, refer to the [Multi-cluster management](../3-user-guide/1-multi-cluster-management.md) Documentation.

## Search Resources

Karpor provides a powerful search feature that allows you to quickly find resources across the registered clusters. To use this feature:

1. Go to the `Search` page within the Karpor UI.
2. Enter the search criteria for the resources you are looking for.

Here is an example of the `Search` page:

![](/karpor/assets/search/search-auto-complete.png)
![](/karpor/assets/search/search-result.png)

To learn more about the search capabilities and how to use them effectively, check out the [Search Methods Documentation](../5-references/3-search-methods.md).

## Gain Insight into Resources

By clicking on a result from your search, you can delve into the `Insight` page, where you'll be able to investigate risks related to the resource, see a topological view with its relevant resources, and examine its detailed information.

Here are examples for what you can find on the Insight page:

![](/karpor/assets/insight/insight-home.png)
![](/karpor/assets/insight/insight-single-issue.png)
![](/karpor/assets/insight/insight-topology.png)

## Conclusion

Please note that this guide only provides a quick start for Karpor, and you may need to refer to additional documentations and resources to configure and use other features.

If you have any questions or concerns, check out the official documentation of Karpor or seek relevant support.

## Next Step

- Learn Karpor's [Architecture](../concepts/architecture) and [Glossary](../concepts/glossary).
- View [User Guide](../user-guide/multi-cluster-management) to look on more of what you can achieve with Karpor.
