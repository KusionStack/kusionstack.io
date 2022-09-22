---
sidebar_position: 3
---

# Lint 检查代码风格

KCL 支持通过内置的命令行工具对 KCL 代码进行检查，并支持多种输出格式。本文档展示 KCL Lint 工具的使用方式。

## 示例

### 工程结构

```text
.
└── Test
    └── kcl.mod
    └── .kcllint
    └── a.k
    └── b.k
    └── dir
        └── c.k
    └── test.k
```

其中，`.kcllint` 文件为配置参数文件，非必需项，`a.k`,`b.k`,`c.k`,`test.k` 为测试的 kcl 文件。

命令：

```shell
kcl-lint your_config.k
```

或

```shell
kcl-lint your_config_path
```

lint 配置文件

```shell
kcl-lint --config abspath/.kcllint your_config.k
```

输出结果示例：

```shell
/Users/../test.k:12:1: E0501 line too long (122 > 120 characters)
# line too long, line too long, line too long, line too long, line too long, line too long, line too long, line too long,
^

/Users/../test.k:14:1: E0413 Import b should be placed at the top of the module
import b
^


Check total 1 files:
1       E0413: ImportStmt is not at the top of the file
1       E0501: Line too long
KCL Lint: 2 problems
```

## KCL Lint 工具使用方式

### CLI 参数

```shell
usage: kcl-lint [-h] [--config file] [file]

positional arguments:
  file           KCL file path

optional arguments:
  -h, --help     show this help message and exit
  --config file  KCL lint config path
```

+ --config : lint 配置文件 `.kcllint` 的路径
+ file : 需要检查的单个 `.k` 文件路径或路径目录下的所有 `.k` 文件，支持绝对路径或当前目录的相对路径

### Lint 配置参数

#### 优先级

Lint 的配置参数的优先级如下：

1. CLI 参数中的 `--config file` 路径的 `.kcllint` 文件
2. 被检查 `.k` 文件所在目录或被检查目录下的 `.kcllint` 文件
3. 默认配置

#### .kcllint

`.kcllint` 文件以 yaml 格式书写。其内容包括：

- check_list 用于选择检查的 checker，可选项为 `"import"` 和 `"misc"`
- ignore 用于选择忽略的检查项，可选项见错误代码
- max_line_length 为检查的参数，即单行代码最大长度
- output 用于选择输出流和输出格式，可选项为 `"stdout"`、`"file"`、`"sarif"`
- output_path 为可选项，当 output 选择了“file”或"sarif"，则必须设置输出文件的路径

示例：

```yaml
check_list: ["import","misc"]
ignore: ["E0501"]
max_line_length: 120
output: ["stdout"]
output_path:
```

#### 默认配置

```yaml
check_list: ["import", "misc"]
ignore": []
max_line_length: 200
output: ["stdout"]
```

### 错误代码

目前提供 import_checker 和 misc_checker

+ import_checker
  + E0401: Unable to import.
  + W0401: Reimport.
  + E0406: Module import itself.
  + W0411: Import but unused.
  + E0413: ImportStmt is not at the top of the file
+ misc_checker
  + E0501: Line too long
