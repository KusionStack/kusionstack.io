---
id: overview
sidebar_label: Overview
---
# Konfig Overview

KusionStack 推荐通过 **配置大库** 的方式统一管理所有的配置清单和模型库，即不仅存放抽象模型本身的 KCL 定义，还存放各种类型的配置清单，比如应用的运维配置、策略配置等。配置大库推荐托管在各类 VCS 系统中，以方便做配置的回滚和漂移检查。官方的配置大库的最佳实践代号为 Konfig，仓库托管在 [Github](https://github.com/KusionStack/konfig)。

⚡️ 配置大库 主要包括：

* Kusion 模型库
* 各类配置清单目录：应用运维配置（appops）、建站配置（siteops）等
* 大库声明文件（kcl.mod）
* 大库测试脚本（Makefile 等）

之所以用一个大的仓库管理全部的 IaC 配置代码，是由于不同代码包的研发主体不同，会引发出包管理和版本管理的问题，从而导致平台侧需要支持类似编译平台的能力。采用大库模式，业务配置代码、基础配置代码在一个大库中，因此代码间的版本依赖管理比较简单，平台侧处理也比较简单，定位唯一代码库的目录及文件即可，代码互通，统一管理，便于查找、修改、维护（大库模式也是 Google 等头部互联网公司内部实践的模式）。

下面是配置大库（Konfig）的架构图，核心模型内部通过前端模型和后端模型两层抽象简化前端用户的配置代码：

![](/img/docs/reference/konfig/konfig-arch-01.png)

:::tip
模型的更详细文档可参考 [参考手册/Kusion 模型库](/docs/reference/model/overview)。
:::
