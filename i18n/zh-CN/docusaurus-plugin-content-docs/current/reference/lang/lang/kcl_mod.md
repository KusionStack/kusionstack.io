---
sidebar_position: 6
---

# kcl.mod

当配置参数变得复杂时，我们可以通过拆分文件和目录的方式重新组装 KCL 代码，不同文件中的 KCL 代码对应包或模块，它们可以通过 import 语句被导入使用。模块和包可以通过相对模块路径导入，也可以通过绝对模块路径导入。而模块的绝对路径是通过 kcl.mod 文件指定的。

## 1. 定位模块根目录

比如有以下结构：

```
.
|── kcl.mod
├── mod1.k
├── mod2.k
├── pkg1
│   ├── def1.k
│   ├── def2.k
│   └── def3init.k
└── pkg2
    ├── file2.k
    └── subpkg3
        └── file3.k
```

- kcl.mod 文件所在的目录对应模块的根目录
- `mod1.k` 对应导入方式 `import mod1`
- `mod2.k` 对应导入方式 `import mod2`
- `pkg1/*.k` 对应导入方式 `import pkg1`
- `pkg2/*.k` 对应导入方式 `import pkg2`
- `pkg1/subpkg3/*.k` 对应导入方式 `import pkg1.subpkg3`

> **Note:** 对于同目录下的 KCL 文件，不要混用目录和文件的导入方式（比如 `import pkg1` 和 `import pkg1.def1` 就是混用的例子）。

## 2. kcl.mod 文件的结构

最简单的 kcl.mod 是一个空文件，只是用于定位模块的绝对路径。不过 kcl.mod 其实是一种 [TOML](https://github.com/toml-lang/toml) 格式的文件，其中可以包含一些配置信息。

比如以下的 kcl.mod 文件：

```toml
[build]
enable_pkg_cache=true
cached_pkg_prefix="base.pkg."

[expected]
kclvm_version="v0.3.9"
kcl_plugin_version="v0.2.14"
```

`build` 段打开了缓存，并定义了要换成的包路径前缀。`expected` 段定义了期望的 KCLVM 版本和插件版本。

完整的 kcl.mod 对应以下的 Protobuf 结构：

```protobuf
syntax = "proto3";

package kclvm.modfile;

// kcl.mod 文件对应的内存格式
// kcl.mod 文件为TOML格式, 字段名字和类型保持一致
message KclModFile {
    string root = 1;                           // 根目录路径, 由程序填充
    string root_pkg = 2;                       // 根包import路径, 对应所有子包的前缀, 可以忽略

    KclModFile_build_section build = 3;        // build 配置
    KclModFile_expected_section expected = 4;  // expected 配置
}

message KclModFile_build_section {
    bool enable_pkg_cache = 1;    // 启动pkg缓存
    string cached_pkg_prefix = 2; // 缓存的前缀路径
    string target = 3;  // 编译的目标，可选 native, wasm
}

message KclModFile_expected_section {
    string min_build_time = 1;      // 期望构建时间下界 2021-08-14 20:30:08
    string max_build_time = 2;      // 期望构建时间上界 2021-08-16 20:30:08
    string kclvm_version = 3;       // KCLVM 版本依赖
    string kcl_plugin_version = 4;  // KCLVM Plugin 版本依赖
    string global_version = 5;      // 全局版本
}
```

kcl.mod 文件对应 KclModFile 结构，其中包含模块路径和本地路径的映射关系（目前还没有使用）。上面例子中的 build 和 expected 分别对应 KclModFile_build_section 和 KclModFile_expected_section 结构。

