---
sidebar_position: 1
---

# Overview

KCL toolchain is a toolset of KCL language, which aims to improve the efficiency of batch migration, writing, compiling and testing of KCL.

|                  | Name                     | Description                                                             |
| ---------------- | ------------------------ | ----------------------------------------------------------------------- |
|  Main Toolset    | **kcl**                  | Provide support for KCL in coding, compiling and testing                |
|                  | kcl build                | Build KCL code(not support)                                             |
|                  | kcl test                 | KCL test tool, provide unit test(not support) and integration test      |
|                  | kcl fmt                  | Formoat KCL code                                                        |
|                  | kcl list                 | Parses the KCL code and lists the option parameter/schema attributes information. （kcl list-options and kcl list-attributes)|
|Automation Toolset|  kcl-lint                | Check code style for KCL code                                           |
|                  |  kcl-doc                 | Parses the KCL code and generate documents                              |
|                  |  kcl-fmt                 | Same as `kcl fmt`                                                       |
| IDE Plugin       | IntelliJ IDEA KCL plugin | Provide KCL compilation and compilation assistance for IntelliJ IDEA    |
|                  | VS Code KCL plugin       | Provide KCL compilation and compilation assistance for VS Code          |
