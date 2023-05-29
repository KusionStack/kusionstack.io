---
sidebar_position: 1
---

# KCL OpenAPI Tool Quick Start

## 1. Installation

The kcl-openapi tool can be installed in both ways: 

- [recommend: install along with the kusion tools pack](#11-install-along-with-the-kusion-tools-pack)
- [only install the kcl-openapi tool](#12-only-install-the-kcl-openapi-tool)

## 1.1 Install along with the kusion tools pack

It's recommended to directly install the kusion tools pack, which bundled the kusion cli, KCLVM, kcl-openapi tool and other useful tools. About installing the kusion tools pack, please refer to the [Kusion Quick Start Doc](/docs/user_docs/getting-started/install).

## 1.2 Only install the kcl-openapi tool

You can optionally install the kcl-openapi tool separately:

```shell
# 1. download the released binary from:
# https://github.com/KusionStack/kcl-openapi/releases

# 2. Add the binary location to PATH
export PATH="<Your directory to store KCLOpenapi binary>:$PATH"
```

## 1.3 Verify your installation

- To verify the installation, you can run the command: `kcl-openapi generate model -h` and the following information indicates your successful installation:

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

- [OpenAPI to KCL](../openapi/openapi-to-kcl.md)
- [CRD to KCL](../openapi/crd-to-kcl.md)
