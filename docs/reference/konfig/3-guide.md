---
id: guide
sidebar_label: Use Guide
---
# Use Guide

## 1. 添加应用

在 [快速开始/Usecase](/docs/user_docs/getting-started/usecases/deliver-first-project) 我们已经展示如何快速添加一个应用（参考 [Project & Stack](/docs/user_docs/concepts/konfig)）。

## 2. 验证 Konfig 代码

### 2.1 快速开始

在安装完成 Kusion 工具之后，在 Konfig 根目录执行 `make check-all` 验证大库全部 Project（参考 [Konfig](/docs/user_docs/concepts/konfig)），或者执行 `make check WHAT="http-echo"` 验证 `appops/http-echo` 应用。

如果需要单独验证 `appops/http-echo` 应用的 dev 版本，可以进入 `appops/http-echo/dev` 目录执行 `kusion compile` 命令（或者通过更底层的 `kcl -Y kcl.yaml ci-test/settings.yaml -o ci-test/stdout.golden.yaml` 命令），输出的文件在 `appops/http-echo/dev/ci-test/stdout.golden.yaml`。

:::tip
更多大库预置命令可以在大库根目录执行 make 命令进行查看：

```bash
$ make
help                这里是帮助文档 :)
check-all           校验所有 Project
check               校验指定目录下的 Project，比如 make check WHAT=nginx-example 或者 make check WHAT="http-echo nginx-example"
clean-all           清理缓存
install-hooks       安装 git hooks，目前主要有 pre-commit hook（提交时自动编译）
uninstall-hooks     卸载 git hooks
```

:::

### 2.2 使用样例

🎯 根据目录名编译指定应用，比如编译应用 http-echo

```bash
make check WHAT=http-echo
# OR: make check-http-echo
```

<details>
  <summary>执行结果</summary>

```bash
Matched path: ['/Users/kusion-user/workspace/Konfig/appops/http-echo']
Matched path total: 1

/Users/kusion-user/workspace/Konfig/appops/http-echo                 [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/http-echo/dev         [Success]

All Success!
Total time: 2.06s, Total app num: 1, Total env num: 1, Time per env: 2.06s
```

</details>

🎯 编译多个应用

```bash
make check WHAT="http-echo nginx-example"
```

<details>
  <summary>执行结果</summary>

```bash
Matched path: ['/Users/kusion-user/workspace/Konfig/appops/http-echo']
Matched path total: 1

Matched path: ['/Users/kusion-user/workspace/Konfig/appops/nginx-example']
Matched path total: 1

/Users/kusion-user/workspace/Konfig/appops/http-echo                 [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/http-echo/dev         [Success]
/Users/kusion-user/workspace/Konfig/appops/nginx-example             [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/nginx-example/dev     [Success]

All Success!
Total time: 2.11s, Total app num: 2, Total env num: 2, Time per env: 1.06s
```

</details>

🎯 关键字除了是应用名，也可以是任意目录名称，比如编译 appops 应用运维目录下的所有应用

```bash
make check-appops
# OR: make check WHAT=appops
```

<details>
  <summary>执行结果</summary>

```bash
Matched path: ['/Users/kusion-user/workspace/Konfig/appops']
Matched path total: 1

/Users/kusion-user/workspace/Konfig/appops/nginx-example             [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/nginx-example/dev     [Success]
/Users/kusion-user/workspace/Konfig/appops/guestbook           [ALL DONE]
  ┣━ /Users/kusion-user/workspace/Konfig/appops/guestbook/dev  [Success]
  ┣━ /Users/kusion-user/workspace/Konfig/appops/guestbook/prod [Success]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/guestbook/test [Success]
/Users/kusion-user/workspace/Konfig/appops/http-echo                 [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/http-echo/dev         [Success]

All Success!
Total time: 4.08s, Total app num: 3, Total env num: 5, Time per env: 0.82s
```

</details>

🎯 编译所有应用

```bash
make check-all
```

<details>
  <summary>执行结果</summary>

```bash
Matched path total: 139

/Users/kusion-user/workspace/Konfig/base/examples/server/app_need_namespace [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_need_namespace/prod [Success]
/Users/kusion-user/workspace/Konfig/appops/guestbook           [ALL DONE]
  ┣━ /Users/kusion-user/workspace/Konfig/appops/guestbook/dev  [Success]
  ┣━ /Users/kusion-user/workspace/Konfig/appops/guestbook/prod [Success]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/guestbook/test [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_secret  [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_secret/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_volume  [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_volume/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_config_map [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_config_map/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_label_selector [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_label_selector/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_main_container [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_main_container/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_sidecar [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_sidecar/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_stateful_set [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_stateful_set/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_service [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_service/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/server/app_scheduling_strategy [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/server/app_scheduling_strategy/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/kcl-vault-agent    [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/kcl-vault-agent/dev [Success]
/Users/kusion-user/workspace/Konfig/base/examples/monitoring/prometheus-example-app [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/monitoring/prometheus-example-app/prod [Success]
/Users/kusion-user/workspace/Konfig/base/examples/kcl-vault-csi      [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/base/examples/kcl-vault-csi/dev [Success]
/Users/kusion-user/workspace/Konfig/appops/nginx-example             [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/nginx-example/dev     [Success]
/Users/kusion-user/workspace/Konfig/appops/http-echo                 [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/http-echo/dev         [Success]

All Success!
Total time: 17.21s, Total app num: 16, Total env num: 18, Time per env: 0.96s
```

</details>

## 3. 自动编译

借助 git hooks 功能和 pre-commit 脚本，实现提交代码（git commit）到大库时自动编译当前变更涉及的应用/项目；

:::note
自动编译在 terminal 中展示效果较好，在 IDE 进行 commit 提交的展示效果不佳；
:::

### 3.1 快速开始

移动到大库根目录

```
cd ~/Konfig
```

安装

```
make install-hooks
```

卸载

```
make uninstall-hooks
```

:::note
以上演示命令均在大库根目录中执行；
:::

### 3.2 使用样例

git hooks 安装成功后，在提交时会自动编译:

<details>
  <summary>执行结果</summary>

```bash
➜ Konfig (master) ✔ make install-hooks  
Successfully install pre-commit hooks!
➜ Konfig (master) ✔ git status          
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   appops/http-echo/base/base.k

no changes added to commit (use "git add" and/or "git commit -a")

➜ Konfig (master) ✔ git add . 
➜ Konfig (master) ✔ git commit -m 'test'
------------- 开始执行提交前置检查 🚀 -------------
🕒 开始自动执行预编译...
Running kclvm /Users/kusion-user/workspace/Konfig/hack/compile-rocket.py appops/http-echo ...
Matched path: ['/Users/kusion-user/workspace/Konfig/appops/http-echo']
Matched path total: 1

/Users/kusion-user/workspace/Konfig/appops/http-echo [ALL DONE]
  ┗━ /Users/kusion-user/workspace/Konfig/appops/http-echo/dev [Success]

All Success!
Total time: 2.04s, Total app num: 1, Total env num: 1, Time per env: 2.04s
🕒 正在将编译结果加入到暂存区(stage)，作为本次提交内容...
💡 预编译执行结束

------------- 执行结果 -------------
预编译: 成功

------------- 建议 -------------
预编译: 无

------------- 前置检查完成，已提交 ✅ -------------

[master c006e80] test
 2 files changed, 2 insertions(+), 2 deletions(-)

➜ Konfig (master) ✔ git status          
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

</details>

### 3.3 临时绕过

如果想在本次提交时临时绕过「自动编译」，可以这样做：

```bash
git commit -n
# OR: git commit --no-verify
```

### 3.4 编译结果不自动加入提交

从样例中可以看到，编译生成的编译结果会自动加入到本次提交中，如果不想自动加入，可以设置环境变量 ADD_TO_STAGE_AFTER_COMPILE=False，关闭此功能：
export ADD_TO_STAGE_AFTER_COMPILE=False

:::note
通过 export 设置环境变量只在当前 Terminal 有效
:::
