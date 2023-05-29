---
sidebar_position: 1
---

# Quick Start

## 1. 安装 KCLOpenAPI tool

目前有两种安装方式可选：

- [通过 kusionctl 工具集一键安装（推荐）](#11-通过-kusionctl-工具集一键安装)
- [单独安装 KCLOpenAPI 工具](#12-单独安装-kclopenapi-工具)

## 1.1 通过 kusionctl 工具集一键安装

- 安装：推荐直接安装 kusionctl 工具集，它内置了 kusionCtl，KCLVM，KCLOpenAPI 等多种工具。关于 kusionctl 安装，请查看 [kusion 快速上手文档](/docs/user_docs/getting-started/install)。

## 1.2 单独安装 KCLOpenAPI 工具：

- 安装：您也可以单独安装 KCLOpenapi：

```shell
# 1. 下载二进制程序
# https://github.com/KusionStack/kcl-openapi/releases

# 2. 将命令添加至PATH
export PATH="<Your directory to store KCLOpenapi binary>:$PATH"
```
## 1.3 验证安装结果

安装完成后，您可执行 `kcl-openapi generate model -h`，如果看到如下信息则说明安装成功：

```shell
kcl-openapi command helps you to generate KCL schema structure from K8s CRD YAML/JSON file.
  1. Translate Swagger Openapi Spec to KCL code
  2. Translate Kubernetes CRD to KCL code

Examples:

  # convert a K8s CRD file into KCL files
  kcl-openapi generate model -f FILENAME --crd --skip-validation

Options:
      --crd=false: Set the spec file is a kube crd
  -f, --filename='': The filename to convert
      --skip-validation=false: Skips validation of spec prior to generation
  -t, --target='': The location to write output kcl files
      --version=false: Show the KCLOpenAPI version

Usage:
  kcl-openapi generate model -f FILENAME [options]
```

# 2. 生成 KCL 文件

- [将 OpenAPI 描述文件转换为 KCL](../openapi/openapi-to-kcl.md)
- [将 Kubernetes CRD 转换为 KCL](../openapi/crd-to-kcl.md)
