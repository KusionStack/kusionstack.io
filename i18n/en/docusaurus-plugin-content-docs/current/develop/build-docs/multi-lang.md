---
sidebar_position: 99
---

# Multi-Language Docs

欢迎帮助将 KusionStack 文档翻译为其他语言。原始的文档是中文版本，目前最高优先级是翻译英文文档。

多语言翻译工作通过 [crowdin](https://crowdin.com/project/kusionstack) 平台进行，最新的状态请参考 [Issue25](https://github.com/KusionStack/kusionstack.io/issues/25)。对应以下步骤：

1. 本地修改了远文件：执行 `make i18n-upload` 上传源文件变更
2. 登陆 crowdin 上的 KusionStack 翻译项目进行翻译：https://crowdin.com/project/kusionstack
3. crowdin 上翻译文档文档更新：执行 `make i18n-download` 下载变更
4. 执行  `make i18n` 查看效果：http://127.0.0.1:8080

注意：第一次执行 `make i18n` 时可能会自动更新 Java 运行时环境，不同的网络环境可能需要几十分钟。

