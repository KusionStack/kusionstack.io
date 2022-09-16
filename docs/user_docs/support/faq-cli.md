---
sidebar_position: 5
---

# Command Line Tool

### 1. Konfig 大库应用目录下的 settings.yaml 文件的作用是什么？

KCL 中 settings.yaml 文件表示 KCL 命令行工具的配置参数文件，可以将编译的配置放入其中进行调用比如需要编译的文件，需要输入的 option 动态参数 `-d`，是否需要忽略掉空值 None `-n` 等配置。

比如对于如下的命令行运行参数

```
kcl main.k -D key=value -n -r
```

就可以使用如下的命令行参数和 settings.yaml 配置文件代替

```

kcl -Y settings.yaml
```

settings.yaml

```yaml
kcl_cli_configs:
  files:
    - main.k
  disable_none: true
  strict_range_check: true
kcl_options:
  - key: key
    value: value
```

- `kcl_cli_configs` 表示可以配置的编译参数，`file` 用于配置编译的 KCL 文件，`disable_none` 表示是否使用 `-n` 参数，`strict_range_check` 表示是否使用 `-r` 参数。
- `kcl_options` 表示可以配置的动态参数，`key` 表示动态参数的名称，`value` 表示动态参数的值

注意：settings.yaml 的文件名称可替换，只要其中的配置结构满足规定即可

### 2. 如何传入动态参数？如何在代码中获取命令行传入的动态参数？

KCL 支持多种方式传入动态参数

- `-D`: 使用 KCL 命令行的-D 参数可以直接传入动态参数，支持基本数据类型 str/int/float/bool, 以及结构数据类型 list/dict

```
kcl main.k -D env-type=TEST -D deploy-topology='[{"cluster":"sigma-eu126-mybank-staging","idc":"cn-hangzhou-test-eu126","replicas":2,"workspace":"middlewarehzcloudsit","zone":"CellAEU126"}]'
```

- `-Y`: 使用 KCL 命令行的-Y 参数可以间接通过配置文件传入动态参数:

```yaml
kcl_options:
- key: env-type
  value: TEST
- key: deploy-topology
  value:
  - cluster: sigma-eu126-mybank-staging
    idc: cn-hangzhou-test-eu126
    replicas: 2
    workspace: middlewarehzcloudsit
    zone: CellAEU126
```

在代码中使用内置的 option 函数获取即可

```python
env = option("env-type")
deploy_topology = option("deploy-topology")
```

输出 YAML

```yaml
env: TEST
deploy_topology:
- cluster: sigma-eu126-mybank-staging
  idc: cn-hangzhou-test-eu126
  replicas: 2
  workspace: middlewarehzcloudsit
  zone: CellAEU126
```

### 3. 如何使用 kcl 的多文件编译特性？

- 使用 KCL 命令行工具直接书写多文件编译

```
kcl file1.k file2.k file3.k
```

- 在配置文件中配置并配合 KCL 命令行工具参数 `-Y` 使用

settings.yaml

```yaml
kcl_cli_configs:
  files:
    - file1.k
    - file2.k
    - file3.k
```

```
kcl -Y settings.yaml
```

### 4. Konfig 大库应用目录下的 stack.yaml 文件的定位是什么？

Stack 是项目中的一个隔离的逻辑工作区。Stack 唯一地属于一个开发组，例如 Web 项目中的前端开发组，并且唯一表示特定的开发阶段，例如开发、测试、生产。从开发的角度看，Stack 是 Kusion 项目的基本配置单元。从执行的角度来看，KCL 代码单元被部署到一个 Stack 中。
