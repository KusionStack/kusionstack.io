---
sidebar_position: 1
---

# Overview

## 1. 前言

Kusion CLI 即 Kusion 工具链的简称，是基于 KCL 的 DevOps 工具集合，主要包括主工具、转换工具集、插件集等。

Kusion CLI 的边界：

* Kusion CLI 聚焦 DevOps 领域
* 基于 KCL，非 KCL 的配置语言需要先转换为 KCL 才能识别
* 多 Runtime，提供的能力一定是多 Runtime 间通用的
* 定制能力通过 Plugin 提供

## 2. Kusion CLI 包括什么？

| 类别       | 工具名称        | 说明                                                                             |
| ---------- | --------------- | -------------------------------------------------------------------------------- |
| 主工具集   | **kusionctl**   | kusionctl 是基于 KCL 语言的 DevOps 工具，管理 KCL 配置从生成到生效的整个生命周期 |
| 转换工具集 | **kube2kcl**    | 从 yaml/kustomize 转换成 KCL 配置的工具                                          |
|            | **crd2kcl**     | 从 crd yaml 转换为 KCL 模型定义的工具                                            |
|            | **tf2kcl**      | 从 tf 转换为 KCL 模型定义的工具                                                  |
|            | **openapi2kcl** | 从 openapi yaml 转换为 KCL 模型定义的工具                                        |
| 插件集     |                 | 可无缝集成 kusionctl 的 plugin                                                   |

## 3. Kusionctl 子命令概览

kusionctl 是基于 KCL 语言的 DevOps 工具，管理 KCL 配置的生命周期

| 能力类别 | 能力名称     | 包含命令 | 说明                                                                                                        |
| -------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| 配置     | 脚手架       | init     | kusion init 命令用于从指定模板初始化一个工作目录，其中包括 KCL 描述的配置清单、project.yaml、stack.yaml 等  |
|          | 语言集成     | compile  | kusion compile 命令用于编译指定的 KCL 配置文件以查看结果是否符合预期                                        |
|          | 元信息查看   | ls       | kusion ls 命令用于查看 Project 和 Stack 基本信息                                                        |
| 运行时   | 资源管理     | preview  | kusion preview 命令用于预览即将发布的配置，包括资源动作                                                     |
|          |              | apply    | kusion apply 命令用于将配置生效，该命令执行后会先执行 preview，确认后才会真正下发配置                       |
|          |              | delete   | kusion delete 命令用于将配置对应的资源删除，该命令会先执行 preview，确认后才会真正删除资源                  |
| 其它     | 插件管理     | plugin   | kusion plugin 用于管理本地安装的 plugin                                                                     |
|          | 版本信息     | version  | kusion version 用于显示版本信息                                                                             |
|          | 环境变量信息 | env      | kusion env 用于查看 kusion 相关的环境变量                                                                   |

备注：

* **配置**：是指用 KCL 描述的配置清单
  ​
