---
sidebar_position: 1
---

# 托管并取回敏感信息

本指南向大家展示，KusionStack 在 Secret as Code 领域的实践。文中使用了 Vault 作为敏感信息的外部存储。

## 先决条件

- [安装 Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes 集群](https://kubernetes.io/)
- [安装 Vault](https://developer.hashicorp.com/vault/downloads)

## 查看项目和代码

### 项目结构

首先，克隆 Konfig 仓库并进入 Konfig 目录：

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

在 `base/examples` 目录下查看 `secret-as-code` 项目，由以下文件组成：

```shell
cd base/examples/secret-as-code && tree .
.
├── base                            // 各环境通用配置
│   └── base.k                      // 应用的环境通用配置
├── dev                             // 环境目录
│   ├── ci-test                     // CI 测试目录，放置测试脚本和数据
│   │   ├── settings.yaml           // 测试数据和编译文件配置
│   │   └── stdout.golden.yaml      // 期望的 YAML，可通过 make 更新
│   ├── kcl.yaml                    // 当前 Stack 的多文件编译配置
│   ├── main.k                      // 应用在当前环境的应用开发者关注的配置清单
│   └── stack.yaml                  // Stack 元信息
└── project.yaml                    // Project 元信息

3 directories, 8 files
```

:::info
关于 Konfig 项目目录结构的更多详细信息，请查看 [Konfig 基本概念](/docs/user_docs/concepts/glossary)。
:::

### 配置代码

```yaml
# project.yaml
name: secret-as-code
secret_stores:
  vault:
    address: http://127.0.0.1:8200
    auth_method: approle
    role_id: c6a97b50-6b98-67fd-6917-242def1162b0
    secret_id: f8167881-a090-770b-905d-305e7368f26a
```

`project.yaml` 中指定了敏感信息的外部存储为 Vault，并给出了服务器地址（`address`）和认证方式（`auth_method`）。

```yaml
# stack.yaml
name: dev
labels:
  kusionstack.io/secure: true
```

`stack.yaml` 中的标签字段，显示指定当前 stack 包含敏感信息。

```python
# base.k
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.container

# Application Configuration
appConfiguration: frontend.Server {
    # Main Container Configuration
    mainContainer = container.Main {
        ports = [
            {containerPort = 80}
        ]
    }
    image = "nginx:1.7.8"
}
```

`base.k` 中定义了一个简单的 k8s 无状态应用 —— Nginx，并指定了镜像地址和容器端口。

```python
# dev/main.k
import base.pkg.kusion_models.kube.frontend

# The application configuration in stack will overwrite 
# the configuration with the same attribute in base.
appConfiguration: frontend.Server {
    annotations: {
        "secret-store": "vault"
        # Valid format:
        #  "ref+vault://PATH/TO/KV_BACKEND#/KEY"
        "foo": "ref+vault://secret/foo#/foo"
        "bar": "ref+vault://secret/bar#/bar"
    }
}
```

`dev/main.k` 中扩展了 Nginx 应用的配置，自定义注解。其中，注解 `foo` 和 `bar` 的值，遵循敏感信息引用格式（`ref+vault://PATH/TO/KV_BACKEND#/KEY`）：

1. `ref+vault`：表示这是一个敏感信息引用，且外部存储服务是 Vault
2. `PATH/TO/KV_BACKEND`：指定敏感信息存储的路径
3. `KEY`：指定读取敏感信息的键

完整的格式使用类似 URI 表达式的风格拼接，可以检索到外部存储的敏感信息。

## 预存敏感信息

1. 以开发模式启动 Vault 并解封后，预存敏感信息，路径和键与 `main.k` 一致：

```shell
vault kv put secret/foo foo=foo
vault kv put secret/bar bar=bar
```

2. 启用 `approle` 认证方式：

```shell
vault auth enable approle
```

3. 创建权限策略集合，具有 `secret/foo` 和 `secret/bar` 路径下的读权限：

```shell
vault policy write my-policy - <<EOF
path "secret/foo" {
  capabilities = ["read"]
}

path "secret/bar" {
  capabilities = ["read"]
}
EOF
```

4. 绑定权限集合到角色：

```shell
vault write auth/approle/role/my-role policies=my-policy
```

5. 保存 role_id：

```shell
vault read auth/approle/role/my-role/role-id
```

6. 保存 secret_id：

```shell
vault write -f auth/approle/role/my-role/secret-id
```

:::info
有关认证方式的更多信息，请阅读 [AppRole Auth Method](https://developer.hashicorp.com/vault/docs/auth/approle)。
:::

## 部署应用

部署之前，替换 `project.yaml` 中的 `role_id` 和 `secret_id` 的值。

通过以下命令，完成一键部署：

```shell
cd base/example/secret-as-code/dev && kusion apply --yes
```

输出类似于：

![apply](/img/docs/user_docs/guides/secret-as-code/apply.jpg)

## 验证敏感信息

接下来，验证敏感信息已经从 Vault 中取回，并替换了 Nginx 应用的注解值：

```shell
kubectl get deploy -n secret-as-code secret-as-codedev -o jsonpath='{.metadata.annotations}'
```

输出类似于：

```json
{
  "bar": "bar",
  "deployment.kubernetes.io/revision": "1",
  "foo": "foo",
  "secret-store": "vault"
}
```

原始配置是：

```json
{
  "bar": "ref+vault://secret/bar#/bar",
  "foo": "ref+vault://secret/foo#/foo",
  "secret-store": "vault"
}
```

原配置按照以下内容修改：

```diff
- "bar": "ref+vault://secret/bar#/bar",
+ "bar": "bar",
- "foo": "ref+vault://secret/foo#/foo",
+ "foo": "foo",
```

至此，通过 IaC 的方式，我们将托管在 Vault 的敏感信息取回并使用。
