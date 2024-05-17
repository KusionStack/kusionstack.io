---
title: Summary
---

In this section, we will learn about the `summary card` on the Karpor insight page, which are used to quickly view and understand key metrics for the current resource group or resource.

Under different resource groups, the content displayed by the `summary card` may also vary.

If you are on:

1. **Resource Group Insight Page**:
    1. **Cluster Insight Page**, the summary card shows the **Node, Pod numbers, CPU, memory capacity, and Kubernetes version of the cluster**.
       ![](/karpor/assets/insight/insight-summary-cluster.png)
    2. **Resource Kind Insight Page**, the summary card shows the **affiliated cluster, GVK (Group Version Kind) information, and the number of that type of resource under the current cluster**.
       ![](/karpor/assets/insight/insight-summary-kind.png)
    3. **Namespace Insight Page**, the summary card shows the **affiliated cluster, namespace, and the most abundant resource types under the current namespace.**
       ![](/karpor/assets/insight/insight-summary-namespace.png)
    4. **Custom Resource Group Insight Page**, the summary card shows the **key-value of each rule, and several resource statistics under the current resource group.**
       ![](/karpor/assets/insight/insight-summary-custom-resource-group.png)
2. **Resource Insight Page**, the summary card shows the **current resource's name, GVK information, affiliated cluster, and namespace.**
       ![](/karpor/assets/insight/insight-summary-resource.png)

⚠️ **Attention**: No matter which resource group insight page you are on, the summary card will always display a health score, calculated based on the risk compliance status of the subject.

