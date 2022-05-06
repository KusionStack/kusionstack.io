# 使用 ArgoCD 进行漂移检查

## 1. 配置 Kusion 插件

目前，ArgoCD 内置了一些常见的配置插件，包括 helm、jsonnet、kustomize。而对于 KCL 来说，作为一门全新的配置语言，想要使用 ArgoCD 实现漂移检查的能力，需要遵循它的插件化的机制，配置 Kusion 插件。具体操作如下：

1. 将以下配置保存到 `patch-argocd-cm.yaml` 文件中

```yaml
data:
  configManagementPlugins: |
    - name: kusion
      generate:
        command: ["sh", "-c"]
        args: ["kusion compile -Y kcl.yaml -Y ci-test/settings.yaml"]
      lockRepo: true
```

2. 更新配置

```shell
kubectl -n argocd patch cm/argocd-cm -p "$(cat patch-argocd-cm.yaml)"
```


## 2. 更新 ArgoCD 部署

完成第一步，ArgoCD 就可以识别 Kusion 插件，但 Kusion 插件还没有载入到 ArgoCD 的镜像中。要实现配置漂移检查，需要修改 argocd-repo-server 的 Deployment。

1. 将以下配置保存到 `patch-argocd-repo-server.yaml` 文件中

```yaml
spec:
  template:
    spec:
      # 1. Define an emptyDir volume which will hold the custom binaries
      volumes:
      - name: custom-tools
        emptyDir: {}
      # 2. Use an init container to download/copy custom binaries
      initContainers:
      - name: download-kusion
        image: yuanhao1223/kusion:open 
        command: [sh, -c]
        args:
        - cp -rf /kusion /custom-tools/kusion
        volumeMounts:
        - mountPath: /custom-tools
          name: custom-tools
      # 3. Volume mount the custom binary to the bin directory
      containers:
      - name: argocd-repo-server
        env:
        - name: PATH
          value: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/kusion/bin:/kusion/kclvm/bin 
        volumeMounts:
        - mountPath: /kusion
          name: custom-tools
          subPath: kusion
        securityContext:
          readOnlyRootFilesystem: false
```

2. 更新配置

```shell
kubectl -n argocd patch deploy/argocd-repo-server -p "$(cat patch-argocd-repo-server.yaml)"
```

## 3. 创建 KCL 项目

到此，准备工具已经完成，现在开始验证。我们使用开源 Konfig 大库中的示例项目，执行以下命令，创建 ArgoCD Application：

1. 创建 guestbook-test

```shell
argocd app create guestbook-test \
--repo git@github.com:KusionStack/konfig.git \
--path appops/guestbook-frontend/test \
--dest-namespace default \
--dest-server https://kubernetes.default.svc \
--config-management-plugin kusion
```

> 注意：如果你正在使用私有仓库，需要先配置私有仓库的访问私钥凭证，再执行创建命令。详细操作，请参见 [Private Repositories](https://argo-cd.readthedocs.io/en/stable/user-guide/private-repositories/#ssh-private-key-credential)。

创建成功后，可以看到以下输出：

```
application 'guestbook-test' created
```

通过ArgoCD UI，可以看到，已经创建的应用暂未同步，此处可以手动同步，也可以设置自动同步。

![](./images/5-out-of-sync.jpg)

2. 设置同步策略（仅同步 `unsynced` 的资源）：

```shell
argocd app set guestbook-test --sync-option ApplyOutOfSyncOnly=true
```

> 有关同步策略的详细信息，请参见 [Sync Options](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/)

同步成功：

![](./images/5-synced.jpg)

## 4. 配置漂移检查

到此，已经完成了 ArgoCD 监听 KCL 项目，实现配置漂移检查并实现结果一致性。我们来修改 `guestbook-test` 的镜像版本，实现配置变更。

1. 更新镜像

```diff
 appConfiguration: frontend.Server {
-    image = "gcr.io/google-samples/gb-frontend:v4"
+    image = "gcr.io/google-samples/gb-frontend:v5"
     schedulingStrategy.resource = res_tpl.tiny
 }
```

2. 更新编译结果

```shell
kusion compile -w appops/guestbook-frontend/test
```

3. Git 提交并推送

```shell
git add .
git commit -m "mannual drifted config for appops/guestbook-frontend/test"
git push origin main
```

4. 漂移配置自动收敛

![](./images/5-reconcile-drifted-config.jpg)

