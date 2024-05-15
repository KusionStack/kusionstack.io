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


## Edit Custom Resource Group

You can click the <kbd><svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg></kbd> button on the right side of the custom resource group tab to modify basic information and classification rules in the pop-up window.

![](/karpor/assets/insight/insight-edit-env-resource-group.png)

## Delete Custom Resource Group

You can click the <kbd><svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg></kbd> button on the right side of the custom resource group tab, then click on the <kbd>Delete</kbd> to delete current resource group rule in the pop-up window.

![](/karpor/assets/insight/insight-delete-env-resource-group.png)
