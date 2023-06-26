# Vault CSI Provider

本指南将向你展示，KCL/Kusion 通过集成 Vault CSI Provider，解决敏感信息的传输问题。
本次演示是将数据库的用户名和密码传输到 Pod 中，涉及 3 个 Kubernetes 内置资源和 1 个 自定义资源：

- 命名空间（Namespace）
- 无状态应用（Deployment）
- 服务账号（ServiceAccount）
- 自定义资源（SecretProviderClass）

:::tip
本指南要求你对 Kubernetes 有基本的了解。不清楚相关概念的，可以前往 Kubernetes 官方网站，查看相关说明：
- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ServiceAccount](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)
- [SecretProviderClass](https://secrets-store-csi-driver.sigs.k8s.io/concepts.html#custom-resource-definitions-crds)
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

Helm 工具用来部署 Vault Server 和 CSI Driver。
如果你还没有安装 Helm，请参阅 [Helm 官方地址](https://helm.sh/docs/intro/install/)。

## 2. 安装 Vault 和 CSI Driver

推荐使用 Helm Chart 在 Kubernetes 上部署 Vault Server 和 CSI Driver
[Helm](https://helm.sh/docs/helm/) 是一个包管理器，
它可以安装和配置 Vault 及其相关组件，以不同模式运行。
Helm Chart 实现了模板的条件化和参数化。这些参数可以通过命令行参数设置或在 YAML 中定义。

### 2.1 安装 Vault

1、添加 HashiCorp Helm 存储库：
```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
```

2、更新所有存储库以确保 helm 缓存了最新版本：
```bash
helm repo update
```

3、安装最新版本的 Vault Server，以开发模式运行，禁用 Injector 服务并启用 CSI：
```bash
helm install vault hashicorp/vault \
    --set "server.dev.enabled=true" \
    --set "injector.enabled=false" \
    --set "csi.enabled=true"
```
`server.dev.enabled=true` 表示 Vault 在单 Pod 上以开发者模式启动；
`injector.enabled=false` 表示禁用 Injector 服务；
`csi.enabled=true` 表示启用 Vault CSI Pod。
如果你已经安装了 Vault，可以使用 `helm upgrade` 命令来更新 Vault 的部署模式。

4、检查 Default 命名空间中的所有 Pod：
```bash
kubectl get pod
NAME                       READY   STATUS    RESTARTS   AGE
vault-0                    1/1     Running   0          17m
vault-csi-provider-456hl   1/1     Running   0          17m
```
等到 `vault-0` 的状态是 `Running` 并且准备就绪（`1/1`），再继续本指南。

### 2.2 安装 CSI Driver

[Secrets Store CSI 驱动程序](https://secrets-store-csi-driver.sigs.k8s.io/introduction.html)
`secrets-store.csi.k8s.io` 允许 Kubernetes 将存储在外部机密存储中的多个机密、密钥和证书作为卷挂载到其 Pod 中。
附加卷后，其中的数据将被挂载到容器的文件系统中。

:::tip
[容器存储接口（CSI）](https://github.com/container-storage-interface/spec/blob/master/spec.md)
是一种标准，用于将任意块和文件存储系统暴露给 Kubernetes 等容器编排系统 (CO) 上的容器化工作负载。
使用 CSI 第三方存储提供商可以编写和部署插件，在 Kubernetes 中公开新的存储系统，而无需接触核心 Kubernetes 代码。
:::

1、添加 CSI 驱动的 Helm 存储库：
```bash
helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
```

2、安装最新版本的 Kubernetes-Secrets-Store-CSI-Driver：
```bash
helm install csi secrets-store-csi-driver/secrets-store-csi-driver --namespace kube-system
```
`csi-secrets-store-csi-driver` 是以 DemonSet 形式部署在 `kube-system` 命名空间。

3、检查 CSI Driver 的 Pod 是否启动：
```bash
kubectl --namespace=kube-system get pods -l "app=secrets-store-csi-driver"
NAME                                 READY   STATUS    RESTARTS   AGE
csi-secrets-store-csi-driver-2wl2f   3/3     Running   0          2m
```
等待 `csi-secrets-store-csi-driver-2wl2f` 的状态是 `Running`，并且已经准备就绪（`3/3`），再继续本指南。

## 3. 配置 Vault

Vault 将机密数据保存在自己的数据库中，用户需要先配置相关机密数据，并启用 Vault 的 Kubernetes 认证。

### 3.1 配置机密数据 {#set-secret-data}

在[创建挂载 Vault Secret 的 Pod](#create-pod-with-secret-mounted)小节，挂载到 Pod 中的卷，
引用了保存在 `secret/data/db-pass` 路径下的 secret 。
Vault 以开发模式运行时，kv 引擎会启用默认路径 `/secret`。

1、在 `vault-0` 启动交互式 shell 终端：
```bash
kubectl exec -it vault-0 -- /bin/sh
```

2、在 `secret/db-pass` 路径创建带有密码的 secret：
```bash
vault kv put secret/db-pass password="db-secret-password"
```

输出类似于：
```
Key                Value
---                -----
created_time       2022-03-17T07:45:06.3767973Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1
```

3、验证 secret 在路径 `/secret/db-pass` 上是否可读：
```bash
vault kv get secret/db-pass
```

输出类似于：
```
======= Metadata =======
Key                Value
---                -----
created_time       2022-03-17T07:45:06.3767973Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
password    db-secret-password
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

2、配置 kubernetes 身份认证规则，依赖 Kubernetes API 地址、ServiceAccount 令牌、
证书以及 Kubernetes ServiceAccount 的颁发者（Kubernetes 1.21+ 需要）：
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

Kubernetes-Secrets-Store-CSI-Driver 需要读取密钥，保证它对挂载的卷和卷中密钥有读权限。

创建名为 `kcl-vault-csi-policy` 的 _policy_：
```bash
vault policy write kcl-vault-csi-policy - <<EOF
path "secret/data/db-pass" {
  capabilities = ["read"]
}
EOF
```

4、再创建名为 `kcl-vault-csi-role` 的 _role_ ，关联上一步创建的 _policy_，并绑定 Namespace 和 ServiceAccount：
```bash
vault write auth/kubernetes/role/kcl-vault-csi-role \
    bound_service_account_names=kcl-vault-csi-sa \
    bound_service_account_namespaces=kcl-vault-csi \
    policies=kcl-vault-csi-policy \
    ttl=24h
```

输出类似于：
```
Success! Data written to: auth/kubernetes/role/kcl-vault-csi-role
```
该角色将 Kubernetes 服务帐户 _kcl-vault-csi-sa_ 和命名空间 _kcl-vault-csi_ 与 Vault 策略 _kcl-vault-csi-role_ 关联起来。
此  Kubernetes 服务帐户将会在后面创建。认证成功后返回的令牌有效期为 24 小时。最后，执行 `exit` 退出 Pod。

## 4. 结果验证 {#verify-result}

上一节我们已经在 Vault 中保存机密数据，并且配置 Vault 角色，完成了 Namespace + ServiceAccount + Policy 的绑定。
这一节，我们直接使用开源大库中的 Vault 演示项目，部署应用并检验结果。

### 4.1 创建挂载 Vault Secret 的 Pod  {#create-pod-with-secret-mounted}

1、进入开源大库的 Vault 演示项目的 Stack 目录 `base/examples/kcl-vault-csi/dev`，并下发配置：
```bash
cd base/examples/kcl-vault-csi/dev && kusion apply --yes=true
```

输出类似于：
```
 SUCCESS  Compiling in stack dev...                                                                                                   

Stack: dev    Provider                                               Type                       Name    Plan
      * ├─  kubernetes                                       v1:Namespace           kcl-vault-csi[0]  Create
      * ├─  kubernetes                                  v1:ServiceAccount        kcl-vault-csi-sa[0]  Create
      * ├─  kubernetes  secrets-store.csi.x-k8s.io/v1:SecretProviderClass  kcl-vault-csi-database[0]  Create
      * └─  kubernetes                                 apps/v1:Deployment       kcl-vault-csi-dev[0]  Create

Start applying diffs......
 SUCCESS  Creating Namespace/kcl-vault-csi                                                                                            
 SUCCESS  Creating ServiceAccount/kcl-vault-csi-sa                                                                                    
 SUCCESS  Creating SecretProviderClass/kcl-vault-csi-database                                                                         
 SUCCESS  Creating Deployment/kcl-vault-csi-dev                                                                                       
Creating Deployment/kcl-vault-csi-dev [4/4] ██████████████████████████████████████████████████████ 100% | 0s

Apply complete! Resources: 4 created, 0 updated, 0 deleted.
```
四个资源创建成功，待 Deployment 创建出 Pod 后，会将 SecretProviderClass 中声明的卷挂载到容器的文件系统中。

### 4.2 校验注入结果

1、检查实验 Pod 是否运行：
```bash
kubectl get pod -n kcl-vault-csi 
```

输出类似于：
```
NAME                                 READY   STATUS    RESTARTS   AGE
kcl-vault-csi-dev-64b66968d8-p27fv   1/1     Running   0          12s
```

2、查看写入 Pod 的文件系统路径 `/mnt/secrets-store/db-password` 的内容，
检查是否是[配置机密数据](#set-secret-data) 小节写入的 paasword：
```bash
kubectl exec -it kcl-vault-csi-dev-64b66968d8-p27fv -n kcl-vault-csi -- cat /mnt/secrets-store/db-password
```

输出类似于：
```
db-secret-password
```
可以看到，我们成功地将机密数据 `password` 通过 CSI 卷的方式，成功注入到 Pod 的文件系统中，完成了机密信息的传输。
