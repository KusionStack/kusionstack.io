---
sidebar_position: 1
---

# Hosting and Retrieving Secrets

This guide shows you the practice of KusionStack in the field of Secret as Code. Vault is used in this paper as an external storage for secrets.

## Prerequisites

- [Install Kusion](/docs/user_docs/getting-started/install)
- [Kubernetes Cluster](https://kubernetes.io/)
- [Install Vault](https://developer.hashicorp.com/vault/downloads)

## Review Project and Codes

### Project Structure

Firstly, let's clone the Konfig repo and enter the root directory: 

```shell
git clone git@github.com:KusionStack/konfig.git && cd konfig
```

Then we can locate the `secret-as-code` project under the `base/examples` directory, which is composed of the following files: 

```shell
cd base/examples/secret-as-code && tree .
.
├── base                            // Common configuration for all stacks
│   └── base.k                      // Common config code file for all stacks
├── dev                             // Stack directory
│   ├── ci-test                     // CI test directory, storing test scripts and data
│   │   ├── settings.yaml           // Configuration for test data and compiling
│   │   └── stdout.golden.yaml      // Expected Spec YAML, which can be updated using make
│   ├── kcl.yaml                    // Multi-file compilation configuration for current stack
│   ├── main.k                      // Config codes for App Dev in current stack
│   └── stack.yaml                  // Meta data of current stack
└── project.yaml                    // Meta data of current project

3 directories, 8 files
```

:::info
More details about the directory structure can be found in [Konfig](/docs/user_docs/concepts/konfig)
:::

### Config Code

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

The `project.yaml` file specifies the external storage of secrets as Vault and gives the server address (`address`) and authentication method (`auth_method`).

```yaml
# stack.yaml
name: dev
labels:
  kusionstack.io/secure: true
```

The label field in the `stack.yaml` file indicates that the current stack contains secrets.

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

The `base.k` file defines a simple k8s stateless application - Nginx and specifies the mirror address and container port.

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

The `dev/main.k` file extends the configuration of the Nginx application and customizes annotations. Among them, the value of annotation `foo` and `bar` follow secret reference format (`ref+vault://PATH/TO/KV_BACKEND#/KEY`):

1. `ref+vault`: indicates that this is a secret reference, and the external storage service is Vault
2. `PATH/TO/KV_BACKEND`: specifies the path where a secret is stored
3. `KEY`: specifies the key to reading secret

The complete format is concatenated using a style similar to URI expressions, which can retrieve a secret stored externally.

## Pre-store Secrets

1. After Vault is started in development mode and unpacked, secrets are pre-stored, and the path and keys are consistent with `main.k`:

```shell
vault kv put secret/foo foo=foo
vault kv put secret/bar bar=bar
```

2. Enable the `approle` auth method:

```shell
vault auth enable approle
```

3. Create a policy named "my-policy" with READ permissions under the paths `secret/foo` and `secret/bar`:

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

4. Bind permission sets to the role named "my-role":

```shell
vault write auth/approle/role/my-role policies=my-policy
```

5. Save role_id：

```shell
vault read auth/approle/role/my-role/role-id
```

6. Save secret_id：

```shell
vault write -f auth/approle/role/my-role/secret-id
```

:::info
For more information on authentication methods, please read [AppRole Auth Method](https://developer.hashicorp.com/vault/docs/auth/approle).
:::

## Deploy Application

Before deploying, replace the values of `role_id` and `secret_id` in the  `project.yaml` file.

Complete one-click deployment with the following command:

```shell
cd base/example/secret-as-code/dev && kusion apply --yes
```

The output is similar to below:

![apply](/img/docs/user_docs/guides/secret-as-code/apply.jpg)

## Verify Secrets

Next, verify that the secrets have been retrieved from Vault and replace the values of annotations of Nginx:

```shell
kubectl get deploy -n secret-as-code secret-as-codedev -o jsonpath='{.metadata.annotations}'
```

The output is similar to below:

```json
{
  "bar": "bar",
  "deployment.kubernetes.io/revision": "1",
  "foo": "foo",
  "secret-store": "vault"
}
```

The original config:

```json
{
  "bar": "ref+vault://secret/bar#/bar",
  "foo": "ref+vault://secret/foo#/foo",
  "secret-store": "vault"
}
```

They have been changed as below:

```diff
- "bar": "ref+vault://secret/bar#/bar",
+ "bar": "bar",
- "foo": "ref+vault://secret/foo#/foo",
+ "foo": "foo",
```

So far, we have retrieved the secrets hosted in Vault by IaC and put them into use.
