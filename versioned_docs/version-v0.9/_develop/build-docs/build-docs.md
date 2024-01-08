# Build Doc

Kusion 的文档采用 [Docusaurus](https://docusaurus.io/) 框架构建，Docusaurus 是基于 React 构建的站点生成器。在构建之前先安装 [Node.js 16+](https://nodejs.org)。

文档仓库：https://github.com/KusionStack/kusionstack.io

## 1. 克隆仓库

然后克隆文档仓库到本地：

```
$ git clone git@github.com:KusionStack/kusionstack.io.git
```

Markdown 格式的文档主要在 docs 和 blog 两个目录，目录对应的内容说明如下：

- `/docs` - 文档根目录
- `/docs/user_docs` - 使用文档，针对 Kusion 使用者
- `/docs/develop` - 开发文档，针对 Kusion 项目本身开发和完善
- `/docs/referece` - 参考手册，工具、语言、模型的参考
- `/docs/governance` - 治理，开源社区、路线规划等
- `/blog` - 博客文章

## 2. 本地预览

预览和构建之前需要先执行 `npm install` 命令安装 Node.js 依赖的包，然后执行 `npm run start` 命令启动本地预览：

```
$ npm install
$ npm run start

> website@0.1.0 start
> docusaurus start

[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at http://localhost:3000/.

✔ Client
  Compiled successfully in 3.84s

client (webpack 5.69.1) compiled successfully

█
```

该命令会通过默认浏览器打开 http://localhost:3000 页面。左上角的导航栏有：使用文档、开发文档、内部文档、参考手册、治理和博客按钮，分别对应前文对应的目录。右上角对应多语言、文档仓库和主题切换按钮。主体页面是 Kusion 一句话简介和快速开始的按钮链接，下面是 KCL 配置语言、Kusion 模型库和 Kusion 引擎的介绍。


## 3. 构建发布

同样需要先执行 `npm install` 命令安装 Node.js 依赖的包（至少执行一次），然后通过 `npm run build` 构建最终的页面资源：

```
$ npm run build

> website@0.1.0 build
> docusaurus build

[INFO] [zh-CN] Creating an optimized production build...

█
```

构建是会有更严格的检查，比如内部的坏链接会输出红色的错误信息、橘黄色输出警告信息。对于测试测试，如果遇到比较多的坏链接，可以先将 `docusaurus.config.js` 文件中的 `onBrokenLinks` 和 `onBrokenMarkdownLinks` 设置为 `"ignore"` 关闭。产生的文件输出到 `build` 目录，该目录可以直接部署发布。


## 4. 配置文件

配置文件有文档配置、侧边栏和内部文档几个：

- [docusaurus.config.js](https://github.com/KusionStack/kusionstack.io/blob/main/docusaurus.config.js) 是 [Docusaurus](https://docusaurus.io/) 的主配置文件。
- [sidebars.js](https://github.com/KusionStack/kusionstack.io/blob/main/sidebars.js) 对应文档的侧边栏配置，被 [docusaurus.config.js](https://github.com/KusionStack/kusionstack.io/blob/main/docusaurus.config.js) 文件引用。

## 5. 主页面内容

主页面内容由以下文件构建产生：

- [docusaurus.config.js](https://github.com/KusionStack/kusionstack.io/blob/main/docusaurus.config.js) 是 [Docusaurus](https://docusaurus.io/) 的主配置文件，包含顶部的导航栏和底部的链接。
- [src/pages/index.js](https://github.com/KusionStack/kusionstack.io/blob/main/src/pages/index.js) 对应页面主体区域，包含快速开始的链接按钮。
- [src/components/HomepageFeatures.js](https://github.com/KusionStack/kusionstack.io/blob/main/src/components/HomepageFeatures.js) 对应 Kusion 的特性介绍。

## 6. 内部链接

网址内部的相对链接可以通过 Markdown 文件的相对路径映射，比如 [`/docs/develop/build-docs`](https://github.com/KusionStack/kusionstack.io/docs/develop/build-docs) 文件中可以通过 [`/docs/user_docs/intro/overview`](/docs/user_docs/intro/overview) 绝对路径或 [`../repos`](../repos) 相对路径引用。

注意：目录内部的 `index.md` 或与目录同名的 Markdonwn 文件对应目录链接的页面。

## 7. 更新模型文档

Konfig 中的 [模型文档](../../user_docs/reference/model) 是从 KCL 代码，通过 docgen 工具自动提取产生（比如自动生成的 [ConfigMap](../../user_docs/reference/model/kusion_models/kube/frontend/configmap/doc_configmap) 模型文档）。如果希望完善模型文档，首先需要到 [Konfig 代码仓库](https://github.com/KusionStack/konfig) 添加或更新文档，然后重新生成文档（目前还不能自动同步，有兴趣的用户可以尝试提供帮助。
