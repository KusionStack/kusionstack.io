---
id: vars
sidebar_label: 魔术变量
---

# Magic Vars

## 1. 概念

魔术变量：预置的、代表基础元数据的变量

## 2. 魔术变量列表

| 名称                       | 作用   | 取值样例     | 备注                         |
| ------------------------ | ---- | -------- | -------------------------- |
| __META_APP_NAME        | 应用名称 | testapp  | 等价于 project.yaml 中 name 的值 |
| __META_ENV_TYPE_NAME | 环境名称 | test     | 等价于 stack.yaml 中 name 的值   |
| __META_CLUSTER_NAME    | 集群名称 | minikube | 可通过 -D cluster 指定该值        |

## 3. 环境类型（env）推荐取值

```
dev,test,stable,pre,gray,prod
```

## 4. 环境类别（envCategory）推荐取值

| 名称   | 取值      | 包含环境            |
| ---- | ------- | --------------- |
| 线上环境 | online  | pre,gray,prod   |
| 线下环境 | offline | dev,test,stable |
