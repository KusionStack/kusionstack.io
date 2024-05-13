---
title: Quick Start
---

## Install of Karpor

To install Karpor, execute the following command in your terminal:

```shell
helm repo add kusionstack https://kusionstack.github.io/charts && \
helm repo update && \
helm install karpor kusionstack/karpor
```

This command will clone the Karpor repository from GitHub and use Helm to install the Karpor chart. For more installation details, please refer to the [Installation Documentation](2-installation.md).

![Install](./assets/2-installation/install.gif)

## Register Cluster

To register a new cluster with Karpor, follow these steps:

1. Navigate to the `Cluster Management` section in the Karpor UI.
2. Click on the `Register Cluster` button.
3. Follow the on-screen instructions to complete the registration process.

An example of the registration button can be seen in the image below:

![](/karpor/assets/cluster-mng/cluster-mng-register-new-cluster.png)

For a more detailed explanation of the registration process, refer to the [Multi-cluster management](../3-user-guide/1-multi-cluster-management.md) Documentation.

## Search Resources

Karpor provides a powerful search feature that allows you to quickly find resources. To use this feature:

1. Go to the `Search` page within the Karpor UI.
2. Enter the search criteria for the resources you are looking for.

Here is an example of the `Search` interface:

![](/karpor/assets/search/search-auto-complete.png)
![](/karpor/assets/search/search-result.png)

To learn more about the search capabilities and how to use them effectively, check out the [Search Methodology Documentation](../5-references/3-search-methods.md).

## Gaining Insight into Resources

By selecting a result from your search, you can delve into the `Insight` page, where you'll be able to investigate issues related to the resource, see its topology, and examine detailed information.

Here are visuals demonstrating the Insight interface:

![](/karpor/assets/insight/insight-home.png)
![](/karpor/assets/insight/insight-single-issue.png)
![](/karpor/assets/insight/insight-topology.png)

## Next Step
- Learn Karpor's [Architecture](../concepts/architecture) and [Glossary](../concepts/glossary).
- View [User Guide](../user-guide/multi-cluster-management) to look on more of what you can achieve with Karpor.

