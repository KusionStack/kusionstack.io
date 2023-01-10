---
sidebar_position: 2
---

# 在云端 IDE 快速体验

KusionStack 支持免安装快速体验啦！无需任何下载-安装-配置流程，即可快速体验通过 KusionStack 管理和发布应用的流程。

## 使用 GitHub Codespaces 体验

使用 [GitHub Codespaces](https://github.com/features/codespaces) 云端开发 IDE，您即可面向 Konfig 仓库创建云端工作空间，获得已预置 Kusion 整套工具和插件的研发环境。

### Step1：创建 Konfig 工作空间

点击 [创建 Konfig 工作空间链接](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=488867056&machine=standardLinux32gb&devcontainer_path=.devcontainer.json)，或在 [Konfig仓库](https://github.com/KusionStack/konfig) 点击创建按钮，在创建选择确定创建，即可创建一个面向 Konfig 仓库 main 分支的 4C8G 的工作空间：

![create codespace](/img/docs/user_docs/getting-started/install/codespaces/create-codespace.gif)

等待工作空间的创建和准备需要一段时间（大约30s），随后您将看到空间内预置的 minikube 正在启动，它将为我们提供后续体验 kusion 的本地模拟集群。minikube 启动大约需要 1 分钟左右，请耐心等待。

![minikube start](/img/docs/user_docs/getting-started/install/codespaces/minikube-start.gif)

留言簿应用由 web 前端和一个用于存储留言条目的单实例的 Redis 组成。我们创建的工作空间会默认展示 `appops/guestbook/base/base.k` 和 `appops/guestbook/dev/main.k` 文件，它们共同描述了留言簿应用在研发环境的部署配置。可以看到应用的 `dev/main.k` 文件中声明了研发环境的前端镜像版本为 `gcr.io/google-samples/gb-frontend:v5`，而 `base/base.k` 中则描述了应用在各环境的通用配置 —— 例如前端服务 `frontend` 将通过 80 端口暴露。

![view code](/img/docs/user_docs/getting-started/install/codespaces/view-code.gif)

### Step2：使用 Kusion 发布应用

minikube 启动完成后，我们即可使用 kusion 在 minikube 中拉起研发版本的留言簿应用，预览待发布应用资源与集群资源的 live-diff，确认无误后继续完成发布：
- 在 dev 目录下的配置文件 `main.k` 中，右键点击 `Kusion: Preview Live Diff and Apply`
- 在随即展开的交互式控制台中，使用键盘↑↓箭头切换选择，对于 `Do you want to apply these diffs?` 选择 `details` 即可预览变更资源列表；进一步，对 `Which diff detail do you want to see? `选择指定或全部资源分别预览变更细节。由于是首次发布，可以看到，发生变更的3类资源 Service、Deployment、Namespace 均为待 `Create` 状态
- 选择 `yes` 确认变更后，我们可以继续观察控制台滚动显示的资源变更状态跟踪，直至显示 `Watch Finish! All resources have been reconciled`，说明全部相关资源调和完成
- 接着，Kusion 检测到集群内服务的变化，提示将本地端口转发到 minikube 内运行的留言簿前端服务80端口，以便本地访问并进一步验证本次变更中的应用运行正常，点击 `Forward Port` 按钮，并在后续提示中选择 `Open in Browser`，在浏览器打开和验证留言簿前端页面，输入留言条目以验证应用正常提供服务

![apply to cloud](/img/docs/user_docs/getting-started/install/codespaces/apply.gif)

## 回顾

至此，我们就完成了基于 KusionStack 预览、发布、验证应用的流程。

体验结束后，您可以在 [GitHub Codespaces 管理界面](https://github.com/codespaces) 中停止方才创建的工作空间，该工作空间将保留以便下次继续使用；或者选择直接删除，不带走一片云彩。

![delete codespace](/img/docs/user_docs/getting-started/install/codespaces/delete-codespace.gif)
