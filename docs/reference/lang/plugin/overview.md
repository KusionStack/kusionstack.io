---
sidebar_position: 1
---

# Introduction

For complex logic that is inconvenient to directly describe through configuration, the language can be extended by developing KCL plug-ins in a general programming language.

KCL supports the development of plug-ins through a general-purpose language, KCL provides plugin support through a plugin runtime and auxiliary command line tools. The KCL plug-in framework supports different general-purpose languages to develop plug-ins. Here we take Python as an example to briefly explain the use of plug-ins.

KCL plugin Git repository: [https://github.com/KusionStack/kcl-plugin](https://github.com/KusionStack/kcl-plugin)

## 1. Hello Plugin

KCL plugins are installed in the `plugins` subdirectory of KCLVM (usually installed in the `$HOME/.kusion/kclvm/plugins` directory), or set through the `$KCL_PLUGINS_ROOT` environment variable (environment variables take precedence). For plugin developers, plugins are managed in the Git repository: [https://github.com/KusionStack/kcl-plugin](https://github.com/KusionStack/kcl-plugin), you can clone the plugin repository to this repository directory for development.

Enter the `kcl-plugin info` command to view the plugin directory (replace `/Users/kcl_user` with the local `$HOME` path):

```shell
$ kcl-plugin info
# plugin_root: /Users/kcl_user/.kusion/kclvm/plugins
```

View the list of plugins with the `kcl-plugin list` subcommand:

```shell
$ kcl-plugin list
hello: hello doc - 0.0.1
```

Where `hello` is an example plugin built into KCL (do not modify the plugin).

In KCL code, the `hello` plugin can be imported via `kcl_plugin.hello`. `main.k` code is as follows:

```python
import kcl_plugin.hello
x = hello.add(1,2)
```

The output result is

```shell
$ kcl main.k
name: kcl
three: 3
```

## 2. `kcl-plugin` Command

`kcl-plugin` is a plugin helper provided, the command line help is as follows:

```shell
$ kcl-plugin
usage: kcl-plugin [-h] {list,info,init,gendoc,test} ...
positional arguments:
  {list,info,init,gendoc,test}
                        kcl plugin sub commands
    list                list all plugins
    info                show plugin document
    init                init a new plugin
    gendoc              gen all plugins document
    test                test plugin
optional arguments:
  -h, --help            show this help message and exit
```

The `list` subcommand is used to view the list of plugins; `info` allows users to view the plugin directory and information about each plugin; `init` allows users to initialize new plugins; `gendoc` updates the API documentation of all plugins; `test` tests specified plugin.

## 3. Plugin Information and Documentation

Type `kcl-plugin info hello` to view the `hello` plugin information:

```shell
$ kcl-plugin info hello
{
    "name": "hello",
    "describe": "hello doc",
    "long_describe": "long describe",
    "version": "0.0.1",
    "method": {
        "add": "add two numbers, and return result",
        "foo": "no doc",
        "list_append": "no doc",
        "say_hello": "no doc",
        "tolower": "no doc",
        "update_dict": "no doc"
    }
}
```

The information of the plug-in mainly includes the name and version information of the plug-in, and the function information provided by the plug-in. This information is consistent with the automatically generated `api.md` file in the plugin directory (regenerate the `api.md` file for all plugins via `kcl-plugin gendoc` when the plugin API changes).

## 4. Plugin Directory Structure

The directory structure of the plugin is as follows (replace `/Users/kcl_user` with the local `$HOME` path):

```shell
$ tree /Users/kcl_user/.kusion/kclvm/plugins/
/Users/kcl_user/.kusion/kclvm/plugins/
├── _examples
├── _test
└── hello
    ├── api.md
    ├── plugin.py
    └── plugin_test.py
$
```

The `_examples` directory is the sample code of the plugin, the `_test` directory is the KCL test code of the plugin, and the other directories starting with letters are ordinary plugins (the directory contains both `plugin.py` and `plugin_test.py` document).

KCL plugins are implemented in an independent pure Python code file, and plugins cannot directly call each other. The content of the plugin is as follows:

```shell
$ cat ./hello/plugin.py 
# Copyright 2020 The KCL Authors. All rights reserved.
INFO = {
    'name': 'hello',
    'describe': 'hello doc',
    'long_describe': 'long describe',
    'version': '0.0.1',
}
def add(a: int, b: int) -> int:
    """add two numbers, and return result"""
    return a + b
...
```

Where `INFO` specifies the name of the plugin, a brief description, a detailed description and version information. And all the functions whose names start with letters are the functions provided by the plugin to KCL, so the `add` function can be called directly in KCL.

## 5. Create Plugin

An example plugin can be created with the `kcl-plugin init` command:

```
$ kcl-plugin init hi
$ kcl-plugin list
hello: hello doc - 0.0.1
hi: hi doc - 0.0.1
```

The `kcl-plugin init` command will construct a new plugin from the built-in template, and then we can view the newly created plugin with the `kcl-plugin list` command.

## 6. Remove plugin

KCL plugins are located in the `plugins` subdirectory of KCLVM (usually installed in the `$HOME/.kusion/kclvm/plugins` directory).
We can query the plugin installation directory with the command `kcl-plugin info`.

```shell
$ kcl-plugin info
/Users/kcl_user/.kusion/kclvm/plugins/
$ tree /Users/kcl_user/.kusion/kclvm/plugins/
/Users/kcl_user/.kusion/kclvm/plugins/
├── _examples
├── _test
└── hello      -- Delete this directory to delete the hello plugin
    ├── api.md
    ├── plugin.py
    └── plugin_test.py
$
```

## 7. 插件的测试

The plugin is implemented as an independent pure Python file. There is a `plugin_test.py` file in the plugin directory, which is the unit test file of the plugin (based on the pytest testing framework). Also placed in the `_test` directory are plugin integration tests for KCL files. The `plugin_test.py` unit test is required, and the KCL integration tests in the `_test` directory can be added as needed.

Unit tests for plugins can be executed via `kcl-plugin test`:

```shell
$ kcl-plugin test hello
============================= test session starts ==============================
platform darwin -- Python 3.7.6+, pytest-5.3.5, py-1.9.0, pluggy-0.13.1
rootdir: /Users/kcl_user
collected 5 items
.kusion/kclvm/plugins/hello/plugin_test.py .....      [100%]
============================== 5 passed in 0.03s ===============================
$
```

Integration tests can be tested by executing the `python3 -m pytest` command in the `_test` directory.
