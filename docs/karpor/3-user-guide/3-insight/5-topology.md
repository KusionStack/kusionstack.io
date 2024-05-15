---
title: Topology
---

## Topology

In this section, we will explore the topology feature in Karpor. The topology view will help you more intuitively understand the relation and dependencies among various resources in your cluster. We will detail how to use the topology view.

1. Follow the guidance on [Inspecting Any Resource Group and Resource](#inspecting-any-resource-group-and-resource) to navigate to the insights page of a particular resource group/resource.
2. At the bottom of the page, you can see the resource topology map.
   ![](/karpor/assets/insight/insight-topology.png)
3. Depending on the current page:
    1. Resource Insights Page:
        1. The map will display relevant upstream and downstream resources related to the current resource. For example, if the current resource is a Deployment, the topology map will show the ReplicaSet under the Deployment and the Pods under the ReplicaSet.
           ![](/karpor/assets/insight/insight-topology-example.png)
        2. Clicking on a node in the resource topology map is equivalent to clicking on an anchor of a specific resource, which will directly navigate to the insights page of that resource.
    2. Resource Group Insights Page:
        1. The map will intuitively show the quantity and relationship of all types of resources under the current resource group.
        2. Clicking on a node in the resource topology map is equivalent to clicking on a resource type, and the list below will refresh with all the resources under a specific type within the current resource group.
           ![](/karpor/assets/insight/insight-linkage.png)

