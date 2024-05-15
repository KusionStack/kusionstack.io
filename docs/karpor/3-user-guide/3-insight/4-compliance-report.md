---
title: Compliance Report
---

This section will introduce the compliance scan feature, primarily used to detect and assess whether all resources in the current resource or resource group comply with specific compliance standards and security policies. Through learning in this section, you will understand how to effectively utilize the compliance scan feature to ensure the security and compliance of the cluster and resources.

If you're not familiar with **Compliance Report** or **Risk** related concepts, you can refer to the [Glossary](../2-concepts/3-glossary.md) section.

1. Follow the guidance on [Inspecting Any Resource Group and Resource](#inspecting-any-resource-group-and-resource) and resource to navigate to the insights page of a particular resource group/resource.
2. You can see the **Compliance Report** card of the resource.
   ![](/karpor/assets/insight/insight-home.png)
3. This card displays the **Risk** identified during the scan of the current resource or all the resources under the resource group, categorized by risk level. Under each risk level tag, risks are sorted from highest to lowest occurrence. Each risk entry shows the title, description, number of occurrences, and scanning tool.
4. Clicking on a specific risk will display a popup with details of the risk.
   ![](/karpor/assets/insight/insight-single-issue.png)
5. Click on <kbd>View All Risks</kbd>, and a drawer will pop out listing all the risks. Here, you can search, categorize, paginate, etc
   ![](/karpor/assets/insight/insight-all-issues.png)
6. Once you have resolved a risk following its indications, you can click the [Rescan] button, which will trigger a comprehensive compliance scan of all resources under the resource group. The interface will display the new results once the scan is completed.

