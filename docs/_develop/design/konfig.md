---
sidebar_position: 4
---

# Konfig Dir Struct

本文主要解释 Konfig 配置大库的目录和代码结构，其中涉及的基本概念解释可见[《模型概览》](/docs/reference/model/overview)。

## 1. 整体结构

```bash
.
├── Makefile            # 通过 Makefile 封装常用命令
├── README.md           # 配置大库说明
├── appops              # 应用运维目录，用来放置所有应用的 KCL 运维配置
│   ├── clickhouse-operator
│   ├── code-city
│   ├── guestbook
│   ├── http-echo
│   └── nginx-example
├── base                # Kusion Model 模型库
│   ├── examples        # Kusion Model 样例代码
│   │   ├── monitoring  # 监控配置样例
│   │   ├── native      # Kubernetes 资源配置样例
│   │   ├── provider    # 基础资源配置样例
│   │   └── server      # 云原生应用运维配置模型样例
│   └── pkg
│       ├── kusion_kubernetes   # Kubernetes 底层模型库
│       ├── kusion_models       # 核心模型库
│       ├── kusion_prometheus   # Prometheus 底层模型库
│       └── kusion_provider     # 基础资源 底层模型库
├── hack                # 放置一些脚本
└── kcl.mod             # 大库配置文件，通常用来标识大库根目录位置以及大库所需依赖
```

## 2. 核心模型库结构

核心模型库一般命名为 kusion_models，主要包含前端模型、后端模型、Mixin、渲染器等，目录结构为：

```bash
├── commons         # 基础资源核心模型库
├── kube            # 云原生资源核心模型库
│   ├── backend         # 后端模型
│   ├── frontend        # 前端模型
│   │   ├── common          # 通用前端模型
│   │   ├── configmap       # ConfigMap 前端模型
│   │   ├── container       # 容器前端模型
│   │   ├── ingress         # Ingress 前端模型
│   │   ├── resource        # 资源规格前端模型
│   │   ├── secret          # Secret 前端模型
│   │   ├── service         # Service 前端模型
│   │   ├── sidecar         # Sidecar 容器前端模型
│   │   ├── strategy        # 策略前端模型
│   │   ├── volume          # Volume 前端模型
│   │   └── server.k        # 云原生应用运维前端模型
│   ├── metadata        # 应用运维的元数据模型
│   ├── mixins          # 统一放置可复用的 Mixin
│   ├── render          # 渲染器，把前后端模型联系在一起的桥梁
│   ├── templates       # 静态配置
│   └── utils           # 工具方法
└── metadata        # 通用元数据模型
```

## 3. Project 和 Stack 结构

Project 和 Stack 的基本概念可见 [《Project & Stack》](/user_docs/concepts/konfig.md)。

Project 在配置大库的应用运维（appops）场景中对应的概念是「应用」，Stack 对应的概念是「环境」。

本节以应用「nginx-example」为例，介绍 Project 和 Stack 在配置大库中的基本目录结构：

```bash
├── README.md       # Project 介绍文件
├── base            # 各环境通用配置
│   └── base.k      # 通用 KCL 配置
├── dev             # 环境特有配置
│   ├── ci-test     # 测试目录
│   │   ├── settings.yaml       # 测试数据
│   │   └── stdout.golden.yaml  # 测试期望结果
│   ├── kcl.yaml    # 多文件编译配置，是 KCL 编译的入口
│   ├── main.k      # 当前环境 KCL 配置
│   └── stack.yaml  # Stack 配置文件
└── project.yaml    # Project 配置文件
```
