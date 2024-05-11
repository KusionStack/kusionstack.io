---
title: Insight
---

In this section, we will introduce how to gain comprehensive insights into the resources within a cluster using Karpor. You can access the Insight page in various ways and easily toggle between insight pages for different resource groups (such as Cluster, Kind, Namespace). If there are domain-specific cluster resource logical concepts within your current organization, you can even customize resource groups (such as Application, Environment, etc.) by setting rules. We also provide functionality to gain insights into these custom resource groups.

This guide will be entirely operated within the Web UI visualization interface.

## Inspecting Any Resource Group and Resource

In this part, we will explain in detail through clear steps and examples how to use Karpor to inspect any resource group or resource.

If you are not familiar with relevant concepts, you can refer to the [Glossary](../2-concepts/3-glossary.md) section.

### Inspecting Specific Resources

1. Search for the resource you are interested in:
   ![](assets/3-insight/image-20240327205411812.png)

2. On the search results page, all resources filtered by the criteria will be listed:
   ![](assets/3-insight/image-20240327205358940.png)

3. Click on any resource name to jump to that resource's insight page:
   ![](assets/3-insight/image-20240327205459514.png)

### Inspecting Specific Resource Groups

You may notice that in each search result entry, tags for `Cluster`, `Kind`, `Namespace`, etc., of the resource are listed. Please note that these tags are **hyperlinks**, which we refer to as "**anchor points**". These represent the links to a particular resource group or a resource. By clicking on these **anchor points**, you can quickly jump to the insight page of that resource group or resource.

![](assets/3-insight/image-20240327205846057.png)

### Flexible Switching Between Resource Groups/Resources

In fact, besides the tags in the mentioned search results, any resource/resource group names you see on any page can be re-directed to as `anchor` points, which serve like space-time wormholes, allowing you to traverse back and forth through any dimension until you find the resources you are searching for. Both search and anchor points are means to expedite the retrieval, which are key features of Karpor as a Kubernetes Explorer.

![](assets/3-insight/image-20240327210019264.png)

![](assets/3-insight/image-20240327210137857.png)

## Creating Custom Resource Groups

This section will focus on how to create custom resource groups within Karpor. Through custom resource groups, you can flexibly manage and organize resources in Karpor according to your own needs and logical concepts. We will guide you step by step to create and define custom resource groups and show you how to use these groups for resource insight and management.

TODO 🚧

## Overview of Resource Groups/Resources

In this section, we will learn about the overview cards on the Karpor insight page, which are used to quickly view and understand various statistics for the current resource group/resource.

Under different resource groups, the content displayed by the overview cards may also vary.

If you are on:

1. Resource Group Insight Page:
    1. Cluster Insight Page, the overview card shows the Node, Pod numbers, CPU, memory capacity, and Kubernetes version of the cluster.
    2. Resource Type Insight Page, the overview card shows the affiliated cluster, GVK (Group Version Kind) information, and the number of that type of resource under the current cluster.
    3. Namespace Insight Page, the overview card shows the affiliated cluster, namespace, and the most abundant resource types under the current namespace.
2. Resource Insight Page, the overview card shows the current resource's name, GVK information, affiliated cluster, and namespace.

⚠️ Attention: No matter which resource group insight page you are on, the overview card will display a health score.

## Audit Report

This section will introduce the compliance scan feature, primarily used to detect and assess whether all resources in the current resource or resource group comply with specific compliance standards and security policies. Through learning in this section, you will understand how to effectively utilize the compliance scan feature to ensure the security and compliance of the cluster and resources.

If you're not familiar with **audit report** or **risk** related concepts, you can refer to the [Glossary](../2-concepts/3-glossary.md) section.

1. Follow the guidance on [Inspecting Any Resource Group and Resource](#inspecting-any-resource-group-and-resource) and resource to navigate to the insights page of a particular resource group/resource.
2. In the top right corner of the page, you can see the **Issue Report** card of the resource.
   ![](assets/3-insight/image-20240328172844614.png)
3. This card displays the **risks** identified during the scan of the current resource or all the resources under the resource group, categorized by risk level. Under each risk level tag, risks are sorted from highest to lowest occurrence. Each risk entry shows the title, description, number of occurrences, and scanning tool.
4. Clicking on a specific risk will display a popup with details of the risk.
   ![](assets/3-insight/image-20240328173437463.png)
5. Click on <kbd>View All Risks</kbd>, and a drawer will pop out listing all the risks. Here, you can search, categorize, paginate, etc
   ![](assets/3-insight/image-20240328173635251.png)
6. Once you have resolved a risk following its indications, you can click the [Rescan] button, which will trigger a comprehensive compliance scan of all resources under the resource group. The interface will display the new results once the scan is completed.

## Resource Topology

In this section, we will explore the topology feature in Karpor. The topology view will help you more intuitively understand the relation and dependencies among various resources in your cluster. We will detail how to use the topology view.

1. Follow the guidance on [Inspecting Any Resource Group and Resource](#inspecting-any-resource-group-and-resource) to navigate to the insights page of a particular resource group/resource.
2. At the bottom of the page, you can see the resource topology map.
3. Depending on the current page:
    1. Resource Insights Page:
        1. The map will display relevant upstream and downstream resources related to the current resource. For example, if the current resource is a Deployment, the topology map will show the ReplicaSet under the Deployment and the Pods under the ReplicaSet.
           ![](assets/3-insight/image-20240328165950585.png)
        2. Clicking on a node in the resource topology map is equivalent to clicking on an anchor of a specific resource, which will directly navigate to the insights page of that resource.
    2. Resource Group Insights Page:
        1. The map will intuitively show the quantity and relationship of all types of resources under the current resource group.
        2. Clicking on a node in the resource topology map is equivalent to clicking on a resource type, and the list below will refresh with all the resources under a specific type within the current resource group.
           ![](assets/3-insight/image-20240327210213409.png)

## Conclusion

Through this guide, you should be able to fully utilize Karpor's insights feature to perform comprehensive and in-depth exploration and understanding of resources within your Kubernetes cluster. Whether you are a beginner or an experienced Kubernetes user, Karpor will be a powerful tool to help you more easily navigate and manage all the resources within your cluster. We wish you success in using Karpor to navigate your clusters!
