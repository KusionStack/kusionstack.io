---
title: Inspecting Any Resource Group and Resource
---
In this part, we will explain in detail through clear steps and examples how to use Karpor to inspect any resource group or resource.

If you are not familiar with relevant concepts, you can refer to the [Glossary](../../2-concepts/3-glossary.md) section.

## Inspecting Specific Resources

1. Search for the resource you are interested in:
   ![](/karpor/assets/search/search-home.png)
2. On the search results page, all resources filtered by the criteria will be listed:
   ![](/karpor/assets/search/search-result.png)
3. Click on any resource name to jump to that resource's insight page:
   ![](/karpor/assets/insight/insight-home.png)

## Inspecting Specific Resource Groups

You may notice that in each search result entry, tags for `Cluster`, `Kind`, `Namespace`, etc., of the resource are listed. Please note that these tags are **hyperlinks**, which we refer to as "**anchor points**". These represent the links to a particular resource group or a resource. By clicking on these **anchor points**, you can quickly jump to the insight page of that resource group or resource.

![](/karpor/assets/search/search-result.png)

## Flexible Switching Between Resource Groups/Resources

In fact, besides the tags in the mentioned search results, any resource/resource group names you see on any page can be re-directed to as **anchor points**, which serve like space-time wormholes, allowing you to traverse back and forth through any dimension until you find the resources you are searching for. Both search and anchor points are means to expedite the retrieval, which are key features of Karpor as a Kubernetes Explorer.

![](/karpor/assets/insight/insight-breadcrumbs.png)
