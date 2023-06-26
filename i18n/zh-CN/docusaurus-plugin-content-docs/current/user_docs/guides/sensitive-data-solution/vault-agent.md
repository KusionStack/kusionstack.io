# Vault Agent

本指南将向你展示，KCL/Kusion 通过集成 Vault，解决敏感信息的传输问题。
本次演示是将数据库的用户名和密码传输到 Pod 中，涉及 3 个 Kubernetes 资源：

- 命名空间（Namespace）
- 无状态应用（Deployment）
- 服务账号（ServiceAccount）

:::tip
本指南要求你对 Kubernetes 有基本的了解。不清楚相关概念的，可以前往 Kubernetes 官方网站，查看相关说明：
- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ServiceAccount](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)
:::

## 1. 准备开始

在开始之前，我们需要做以下准备工作：

1、安装 Kusion 工具链

我们推荐使用 kusion 的官方安装工具 `kusionup`，可实现 kusion 多版本管理等关键能力。
详情信息请参阅[下载和安装](/docs/user_docs/getting-started/install)。

2、下载开源 Konfig 大库

在本篇指南中，需要用到部分已经抽象实现的 KCL 模型。
有关 KCL 语言的介绍，可以参考 [Tour of KCL](https://kcl-lang.io/)。

仓库地址： https://github.com/KusionStack/konfig.git

3、可用的 Kubernetes 集群

必须要有一个 Kubernetes 集群，同时 Kubernetes 集群最好带有
[kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) 命令行工具。
如果你还没有集群，你可以通过 [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/)
构建一个你自己的集群。

4、可用的 Helm CLI

Helm 工具用来部署 Vault Server 和 Agent Injector。
如果你还没有安装 Helm，请参阅 [Helm 官方地址](https://helm.sh/docs/intro/install/)。

## 2. 安装 Vault

推荐使用 Helm Chart 在 Kubernetes 上部署 Vault Server 和 Agent。
[Helm](https://helm.sh/docs/helm/) 是一个包管理器，
它可以安装和配置 Vault 及其相关组件，以不同模式运行。
Helm Chart 实现了模板的条件化和参数化。这些参数可以通过命令行参数设置或在 YAML 中定义。

1、添加 HashiCorp Helm 存储库：
```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
```

2、更新所有存储库以确保 helm 缓存了最新版本：
```bash
helm repo update
```

3、安装最新版本的 Vault Server 和 Agent，并以开发模式运行：
```bash
helm install vault hashicorp/vault --set "server.dev.enabled=true"
```
`server.dev.enabled=true` 表示 Vault 在单 Pod 上以开发者模式启动。

4、检查 Default 命名空间中的所有 Pod：
```bash
kubectl get pod
```

输出类似于：
```
NAME                                  READY   STATUS    RESTARTS      AGE
vault-0                               1/1     Running   0             2d1h
vault-agent-injector-58b6d499-k9x9r   1/1     Running   0             2d1h
```

`vault-0` 是以 **dev** 模式运行的 Vault 服务器，
`vault-agent-injector-58b6d499-k9x9r` 是 Agent，会根据 Annotation 执行数据注入。

:::caution
本例为了简化演示，使用 **dev** 模式启动 Vault 服务器，
此模式下，Vault 会自动初始化并解封（Unseal）。请勿在生产环境中使用。
:::

## 3. 配置 Vault

Vault 将机密数据保存在自己的数据库中，用户需要先配置相关机密数据，并启用 Vault 的 Kubernetes 认证。

### 3.1 配置机密数据 {#set-secret-data}

在[创建带注解的 Pod](#create-pod-with-annotation) 小节，将会把数据库的用户名和密码作为机密数据注入 Pod，
而 Vault 将此机密数据保存。要创建此类数据，需要 Vault 启用 kv 引擎，并将用户名和密码保存在指定的路径中。

1、在 `vault-0` 启动交互式 shell 终端：
```bash
kubectl exec -it vault-0 -- /bin/sh
```

2、指定路径 `path=internal` 启动 kv 引擎：
```bash
vault secrets enable -path=internal kv-v2
```
输出类似于：
```bash
Success! Enabled the kv-v2 secrets engine at: internal/
```

:::tip
有关 kv secrets 引擎的更多信息，请参阅
[Static Secrets: Key/Value Secret](https://learn.hashicorp.com/tutorials/vault/static-secrets)。
:::

3、在 `internal/database/config` 路径创建 secret，包含 `username` 和 `password`：
```bash
vault kv put internal/database/config username="db-readonly-username" password="db-secret-password"
```
输出类似于：
```
Key              Value
---              -----
created_time     2022-03-13T08:40:02.1133715Z
deletion_time    n/a
destroyed        false
version          1
```

4、检查创建结果：
```bash
vault kv get internal/database/config
```
输出类似于：
```
======= Metadata =======
Key                Value
---                -----
created_time       2022-03-13T08:40:02.1133715Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
password    db-secret-password
username    db-readonly-username
```
到此，机密数据创建完毕，暂且不需要退出 Pod。

### 3.2 启用 kubernetes 身份认证

Vault 提供了 Kubernetes 身份验证方法，使客户端能够使用 Kubernetes ServiceAccount 令牌进行身份验证。
此令牌在创建时提供给每个 Pod。

1、继续上一小节的 Terminal，启用 Kubernetes 身份验证：
```bash
vault auth enable kubernetes
```
输出类似于：
```
Success! Enabled kubernetes auth method at: kubernetes/
```

2、配置 kubernetes 身份认证规则，
依赖 Kubernetes API 地址、ServiceAccount 令牌、证书以及 Kubernetes ServiceAccount 的颁发者（Kubernetes 1.21+ 需要）：
```bash
vault write auth/kubernetes/config \
    kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443" \
    token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
    kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
    issuer="https://kubernetes.default.svc.cluster.local"
```

输出类似于：
```
Success! Data written to: auth/kubernetes/config
```
Kubernetes 创建容器时，将 `token_reviewer_jwt` 和 `kubernetes_ca_cert` 挂载到容器中。
环境变量 `KUBERNETES_PORT_443_TCP_ADDR` 引用的是 Kubernetes 主机的内部网络地址。

3、设置读权限的 _policy_

后面要部署的服务，需要读取路径 `internal/database/config` 中保存的机密数据，先给该路径添加读权限：
```bash
vault policy write kcl-vault-agent-agent-policy - <<EOF
path "internal/data/database/config" {
  capabilities = ["read"]
}
EOF
```

4、再创建名为 `kcl-vault-agent-agent-role` 的 _role_ ，关联上一步创建的 _policy_，并绑定 Namespace 和 ServiceAccount：
```bash
vault write auth/kubernetes/role/kcl-vault-agent-agent-role \
    bound_service_account_names=kcl-vault-agent-agent-sa \
    bound_service_account_namespaces=kcl-vault-agent-agent \
    policies=kcl-vault-agent-agent-policy \
    ttl=24h
```

输出类似于：
```
Success! Data written to: auth/kubernetes/role/kcl-vault-agent-role
```
该角色将 Kubernetes 服务帐户 _kcl-vault-agent-sa_ 和命名空间 _kcl-vault_ 与 Vault 策略 _kcl-vault-agent-role_ 关联起来。
此  Kubernetes 服务帐户将会在后面创建。认证成功后返回的令牌有效期为 24 小时。最后，执行 `exit` 退出 Pod。

## 4. 结果验证

上一节我们已经在 Vault 中保存机密数据，并且配置 Vault 角色，完成了 Namespace + ServiceAccount + Policy 的绑定。
这一节，我们直接使用开源大库中的 Vault 演示项目，部署应用并检验结果。

### 4.1 创建带注解的 Pod {#create-pod-with-annotation}

1、进入开源大库的 Vault 演示项目的 Stack 目录 `base/examples/kcl-vault-agent/dev`，并下发配置：
```bash
cd base/examples/kcl-vault/dev && kusion apply --yes=true
```

输出类似于：
```
SUCCESS  Compiling in stack dev...
Stack: dev    Provider                Type                    Name    Plan
      * ├─  kubernetes        v1:Namespace      kcl-vault-agent[0]  Create
      * ├─  kubernetes  apps/v1:Deployment  kcl-vault-agent-dev[0]  Create
      * └─  kubernetes   v1:ServiceAccount   kcl-vault-agent-sa[0]  Create

Start applying diffs......
 SUCCESS  Creating Namespace/kcl-vault-agent
 SUCCESS  Creating Deployment/kcl-vault-agent-dev
 SUCCESS  Creating ServiceAccount/kcl-vault-agent-sa
Creating ServiceAccount/kcl-vault-agent-sa [3/3] ███████████████████████████████████████████ 100% | 0s
```

:::info
三个资源已全部下发，Deployment 还需要创建 ReplicaSet 和 Pod，并且 Pod 需要一定的时间启动。

请使用 `kubectl get po -n kcl-vault-agent` 确定 Pod 进入到 _Running_ 状态，并且已经准备就绪（2/2）。
:::

### 4.2 验证结果

#### 4.2.1 非格式化输出

1、检查结果机密信息注入结果：
```bash
kubectl exec -n kcl-vault \
    $(kubectl get pod -n kcl-vault-agent -l app=kcl-vault-agent-test -o jsonpath="{.items[0].metadata.name}") \
    --container kcl-vault-agent-test -- cat /vault/secrets/database-config.txt
```

输出类似于：
```
data: map[password:db-secret-password username:db-readonly-username]
metadata: map[created_time:2022-03-13T08:40:02.1133715Z custom_metadata:<nil> deletion_time: destroyed:false version:1]
```

可以看到未格式化的数据库用户名和密码，这也是[配置机密数据](#set-secret-data)小节配置的内容。

#### 4.2.2 格式化输出

没有格式化的数据显然是不合理的，给业务应用在读取配置方面也添加了不必要的障碍。
数据格式化，Vault 也提供了一些[模板说明](https://www.vaultproject.io/docs/agent/template)。
在本例子中，只需要打开 `main.k` 中被注释的部分，再次下发配置即可。

以下展示的是 `main.k` 中的部分配置代码：
```py
podMetadata = apis.ObjectMeta {
        annotations = {
            "vault.hashicorp.com/agent-inject" = "true"
            "vault.hashicorp.com/role" = "kcl-vault-agent-role"
            "vault.hashicorp.com/agent-inject-secret-database-config.txt" = "internal/data/database/config"
            "vault.hashicorp.com/agent-inject-status" = "update"
            "vault.hashicorp.com/agent-inject-template-database-config.txt" = """\
{{- with secret "internal/data/database/config" -}}
postgresql://{{ .Data.data.username }}:{{ .Data.data.password }}@postgres:5432/wizard
{{- end -}}"""
```

重新下发配置：
```bash
kusion apply --yes=true
```

待 Deployment 滚动更新完成后，检查机密数据注入结果：
```bash
kubectl exec -n kcl-vault-agent \
    $(kubectl get pod -n kcl-vault-agent -l app=kcl-vault-agent-test -o jsonpath="{.items[0].metadata.name}") \
    --container kcl-vault-agent-test -- cat /vault/secrets/database-config.txt
```

输出类似于：
```
postgresql://db-readonly-username:db-secret-password@postgres:5432/wizard
```
可以看到，不仅成功注入了机密数据，而且按照 Pod 模板中的 Annotation 字段指定的格式渲染结果。

到此我们就完成了 KCL/Kusion 集成 Vault Agent Injector 实现了敏感信息的传输。