---
title: 自定义资源组
---

## 创建自定义资源组

本节将重点介绍如何在 Karpor 中创建自定义资源组。通过自定义资源组，您可以根据自己的需求和逻辑概念，在 Karpor 中灵活管理和组织资源。我们将逐步指导您创建和定义自定义资源组，并展示如何使用这些组进行资源洞察和管理。

如果您不熟悉**资源组**和**资源组规则**相关概念，可以参考 [词汇表](../../2-concepts/3-glossary.md) 部分。

**假设**在您的组织或公司内，有一个`应用单元`的概念，代表**某个环境中应用的所有资源**。

我们在**标签中标记应用的名称和环境**。例如，以下是`生产环境`中`mock-apple`的`应用单元`：

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

现在，我们将按照以下步骤创建一个名为`应用单元`的自定义`资源组规则`。它将根据用户指定的规则对集群中的所有资源进行分类，并列出所有符合规则的`资源组`。

1. 点击 <kbd>洞察</kbd> 标签进入洞察首页。
2. 在页面底部，您将看到一个默认的资源组规则`命名空间`，这是按命名空间分类的单一规则。
   ![](/karpor/assets/insight/insight-homepage.png)
3. 点击创建资源组按钮 <kbd>+</kbd>，并在弹出窗口中填入`应用单元`的**基本信息和分类规则**。
   ![](/karpor/assets/insight/insight-create-app-resource-group-rule.png)
4. 点击 <kbd>提交</kbd> 按钮，然后点击新出现的 <kbd>应用单元</kbd> 标签，列出所有应用单元。
   ![](/karpor/assets/insight/insight-list-app-resource-groups.png)
5. 您可以在搜索框中输入关键词，快速找到`生产`环境中的`mock-apple`应用单元。
   ![](/karpor/assets/insight/insight-search-app-resource-group.png)
6. 您可以点击资源组卡片上的 <kbd>查看</kbd> 按钮，跳转到相应的`资源组洞察页面`，查看某个应用单元的所有资源、拓扑关系、合规报告等聚合信息。
7. 如有需要，您也可以使用相同的步骤创建`环境资源组`。
   ![](/karpor/assets/insight/insight-create-env-resource-group-rule.png)
   ![](/karpor/assets/insight/insight-list-env-resource-groups.png)


## 编辑自定义资源组

您可以点击自定义资源组选项卡右侧的按钮 <kbd><svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg></kbd> 来修改弹出窗口中的基本信息和分类规则。

![](/karpor/assets/insight/insight-edit-env-resource-group.png)

## 删除自定义资源组

您可以点击自定义资源组标签右侧的按钮 <kbd><svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg></kbd> 然后在弹出窗口中点击 <kbd>删除</kbd>，以删除当前资源组规则。

![](/karpor/assets/insight/insight-delete-env-resource-group.png)
