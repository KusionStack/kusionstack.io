---
title: Custom Resource Group
---

## Creating Custom Resource Group

This section will focus on how to create custom resource group within Karpor. Through custom resource group, you can flexibly manage and organize resources in Karpor according to your own needs and logical concepts. We will guide you step by step to create and define custom resource group and show you how to use these groups for resource insight and management.

If you're not familiar with **Resource Group** and **Resource Group Rule** related concepts, you can refer to the [Glossary](../2-concepts/3-glossary.md) section.

**Let's assume** that within your organization or company, there is a concept of `application unit` that represent **all resources of an application in a certain environment**.

We mark the **name and environment of the application in the label**. For example, the following is the `application unit` of `mock-apple` in the `production environment`:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  labels:
    app.kubernetes.io/name: mock-apple
  name: mock-apple
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/environment: prod
    app.kubernetes.io/name: mock-apple
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/environment: prod
      app.kubernetes.io/name: mock-apple
  template:
    metadata:
      labels:
        app.kubernetes.io/environment: prod
        app.kubernetes.io/name: mock-apple
        fruit: apple
    spec:
      containers:
        - image: nginx:latest
          name: mock-container
      dnsPolicy: ClusterFirst
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/environment: prod
    app.kubernetes.io/name: mock-apple
  name: mock-service-apple-prod
  namespace: mock-apple
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app.kubernetes.io/environment: prod
    app.kubernetes.io/name: mock-apple
  type: ClusterIP
```

Now, we will create a custom `resource group rule` called the `application unit` by following the steps below. It will classify all resources in the cluster according to the rules specified by the user and list all `resource groups` that comply with the rules.

1. Click on the <kbd>Insight</kbd> tab to enter the insight homepage.
2. At the bottom of the page, you will see a default resource group rule `namespace`, which is a single rule classified by a namespace.
   ![](/karpor/assets/insight/insight-homepage.png)
3. Click on the create button <kbd>+</kbd> of the resource group and fill in the **basic information and classification rules** of the `application unit` in the pop-up window.
   ![](/karpor/assets/insight/insight-create-app-resource-group-rule.png)
4. Click on the <kbd>Submit</kbd> button, then click on the newly appearing <kbd>application unit</kbd> tab to list all application units.
   ![](/karpor/assets/insight/insight-list-app-resource-groups.png)
5. You can enter keywords in the search box to quickly find the `application unit` of `mock-apple` in `production`.
   ![](/karpor/assets/insight/insight-search-app-resource-group.png)
6. You can click the <kbd>View</kbd> button on a resource group card to jump to the corresponding `resource group insight page` and view aggregated information such as all resources, topology relationships, compliance reports, etc. of a certain application unit.
7. If necessary, you can also use the same steps to create an `environment resource group`.
   ![](/karpor/assets/insight/insight-create-env-resource-group-rule.png)
   ![](/karpor/assets/insight/insight-list-env-resource-groups.png)

