# Vault Agent

This guide will show you that KCL/Kusion solves the secret management problem by integrating Vault.
We will pass the database username and password into the Pod, involving 3 Kubernetes resources:

- Namespace
- Deployment
- ServiceAccount

:::tip

This guide requires you to have a basic understanding of Kubernetes.
If you are not familiar with the relevant concepts, please refer to the links below:
- [Learn Kubernetes Basics](https://Kubernetes.io/docs/tutorials/Kubernetes-basics/)
- [Namespace](https://Kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Deployment](https://Kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ServiceAccount](https://Kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)
:::

## Prerequisites

Before we start, we need to complete the following steps:

1、Install Kusion

We recommend using the official installation tool _kusionup_ which supports multi-version management.
See [Download and Install](/docs/user_docs/getting-started/install) for more details.

2、Clone Konfig repo

In this guide, we need some KCL models that [Konfig](https://github.com/KusionStack/konfig.git) offers.
For more details on KCL language, please refer to [Tour of KCL](https://kcl-lang.io/).

3、Running Kubernetes cluster

There must be a running Kubernetes cluster and a [kubectl](https://Kubernetes.io/docs/tasks/tools/#kubectl) command line tool.
If you don't have a cluster yet, you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/multi_node/) to start one of your own.

4、Available Helm CLI

The Helm tool is used to deploy the Vault Server and Agent Injector.
If you haven't installed Helm, please refer to [Install Helm](https://helm.sh/docs/intro/install/).

## Install Vault

We recommend deploying the vault server and agent on Kubernetes by _Helm Chart_.
[Helm](https://helm.sh/docs/helm/) is a package manager,
it can install and configure Vault and its related components in different modes.
Helm chart implements conditionalization and parameterization of templates.
These parameters can be set via command line arguments or defined in YAML files.

1、Add HashiCorp helm repo：
```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
```

2、Update to cache HashiCorp's latest version:
```bash
helm repo update
```

3、Install Vault server and agent, and start in development mode:
```bash
helm install vault hashicorp/vault --set "server.dev.enabled=true"
```

`server.dev.enabled=true` indicates that Vault is started in developer mode on a single pod.

4、Check all pods in the default namespace:
```bash
kubectl get pod
```

The output is similar to:
```
NAME                                  READY   STATUS    RESTARTS      AGE
vault-0                               1/1     Running   0             2d1h
vault-agent-injector-58b6d499-k9x9r   1/1     Running   0             2d1h
```

Pod `vault-0` is the Vault server running in **dev** mode,
pod `vault-agent-injector-58b6d499-k9x9r` is an agent that injects data according to `metadata.annotations`.

:::caution

To simplify the demonstration, start the Vault server in **dev** mode.
In this mode, the vault server will automatically initialize and unseal.
**DO NOT** use it in a production environment.
:::

## Configure Vault

Vault stores secrets in its database, and users need to configure the relevant confidential data and enable Vault's Kubernetes authentication.

### Create a Secret

We must enable the k/v engine of Vault, and save the secret data(username and password of database) in it.
Then, in the [Create Annotated Pods](#create-annotated-pods) section, the database username and password will be injected into the pod.

1、Start an interactive shell session on the `vault-0` pod: 
```bash
kubectl exec -it vault-0 -- /bin/sh
```

2、Enable the k/v engine at the path `path=internal`
```bash
vault secrets enable -path=internal kv-v2
```

The output is similar to:
```bash
Success! Enabled the kv-v2 secrets engine at: internal/
```

:::tip

For more detail on the k/v secrets engine, see [Static Secrets: Key/Value Secret](https://learn.hashicorp.com/tutorials/vault/static-secrets).
:::

3、Create a secret at the path `internal/database/config` with username and password:
```bash
vault kv put internal/database/config username="db-readonly-username" password="db-secret-password"
```

The output is similar to:
```
Key              Value
---              -----
created_time     2022-03-13T08:40:02.1133715Z
deletion_time    n/a
destroyed        false
version          1
```

4、Verify that the secret is readable at the path `internal/database/config`:
```bash
vault kv get internal/database/config
```

The output is similar to:
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

Now the confidential data is created, please don't exit the Pod.

### Enable Kubernetes Authentication

Vault provides a Kubernetes authentication method that enables clients to authenticate with a Kubernetes ServiceAccount Token.
The Kubernetes resources that access the secret and create the volume authenticate through this method through a `role`.

1、Continue with the terminal in the previous step, and enable the Kubernetes authentication method:
```bash
vault auth enable kubernetes
```

The output is similar to:
```
Success! Enabled Kubernetes auth method at: Kubernetes/
```

2、Configure authentication rules, depending on the Kubernetes API address, ServiceAccount token, certificate, and the issuer of the Kubernetes ServiceAccount(required for Kubernetes 1.21+):
```bash
vault write auth/Kubernetes/config \
    Kubernetes_host="https://$Kubernetes_PORT_443_TCP_ADDR:443" \
    token_reviewer_jwt="$(cat /var/run/secrets/Kubernetes.io/serviceaccount/token)" \
    Kubernetes_ca_cert=@/var/run/secrets/Kubernetes.io/serviceaccount/ca.crt \
    issuer="https://Kubernetes.default.svc.cluster.local"
```

The output is similar to:
```
Success! Data written to: auth/Kubernetes/config
```

When Kubernetes creates pods, mount `token_reviewer_jwt` and `Kubernetes_ca_cert` into them.
The environment variable `KUBERNETES_PORT_443_TCP_ADDR` references the internal network address of the Kubernetes host.

3、Create a policy named `kcl-vault-agent-agent-policy`:
```bash
vault policy write kcl-vault-agent-agent-policy - <<EOF
path "internal/data/database/config" {
  capabilities = ["read"]
}
EOF
```

The service to be deployed later needs to read the secret saved in the path "internal/database/config",
so grant read permission to the path first.

4、Create a role named `kcl-vault-agent-agent-role`:
```bash
vault write auth/Kubernetes/role/kcl-vault-agent-agent-role \
    bound_service_account_names=kcl-vault-agent-agent-sa \
    bound_service_account_namespaces=kcl-vault-agent-agent \
    policies=kcl-vault-agent-agent-policy \
    ttl=24h
```

The output is similar to:
```
Success! Data written to: auth/Kubernetes/role/kcl-vault-agent-role
```

This role associates the Kubernetes service account `kcl-vault-agent-sa` and namespace `kcl-vault` with the Vault policy `kcl-vault-agent-role`.
This Kubernetes service account will be created later. The token returned after successful authentication is valid for 24 hours.
Finally, exit the `vault-0` pod.

## Verify Secret

In the previous section, we created a secret in the Vault server,
configured the Vault `role` and `policy`, and completed the binding of `Namespace` and `ServiceAccount`.
In this section, we directly use the Vault demo project `kcl-vault-agent` in Konfig to deploy the application and verify the results.

### Create Annotated Pods

1、Enter stack dir `base/examples/kcl-vault-agent/dev` and apply stack configs:
```bash
cd base/examples/kcl-vault/dev && kusion apply --yes=true
```

The output is similar to:
```
SUCCESS  Compiling in stack dev...
Stack: dev    Provider                Type                    Name    Plan
      * ├─  Kubernetes        v1:Namespace      kcl-vault-agent[0]  Create
      * ├─  Kubernetes  apps/v1:Deployment  kcl-vault-agent-dev[0]  Create
      * └─  Kubernetes   v1:ServiceAccount   kcl-vault-agent-sa[0]  Create

Start applying diffs......
 SUCCESS  Creating Namespace/kcl-vault-agent
 SUCCESS  Creating Deployment/kcl-vault-agent-dev
 SUCCESS  Creating ServiceAccount/kcl-vault-agent-sa
Creating ServiceAccount/kcl-vault-agent-sa [3/3] ███████████████████████████████████████████ 100% | 0s
```

:::info

All three resources have been distributed, and the controller needs some time to sync these resources.

Please execute `kubectl get po -n kcl-vault-agent` to make sure the Pod is Running (`2/2`).
:::

### Validation mount results

#### Raw Output

1、Secret injection result:
```bash
kubectl exec -n kcl-vault \
    $(kubectl get pod -n kcl-vault-agent -l app=kcl-vault-agent-test -o jsonpath="{.items[0].metadata.name}") \
    --container kcl-vault-agent-test -- cat /vault/secrets/database-config.txt
```

The output is similar to:
```
data: map[password:db-secret-password username:db-readonly-username]
metadata: map[created_time:2022-03-13T08:40:02.1133715Z custom_metadata:<nil> deletion_time: destroyed:false version:1]
```

You can see the unformatted database username and password, which are configured in the [Create a secret](#create-a-secret) section.

#### Formatted Output

Unformatted data is unreasonable and not read directly for applications.
Regarding formatting, Vault also provides some [template instructions](https://www.vaultproject.io/docs/agent/template).
In this example, you only need to uncomment the code of `main.k` and re-apply the configurations.

The following shows commented code in `main.k`:
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

Apply again:
```bash
kusion apply --yes=true
```

Check the secret data after the `Deployment` rolling update is finished:
```bash
kubectl exec -n kcl-vault-agent \
    $(kubectl get pod -n kcl-vault-agent -l app=kcl-vault-agent-test -o jsonpath="{.items[0].metadata.name}") \
    --container kcl-vault-agent-test -- cat /vault/secrets/database-config.txt
```

The output is similar to:
```
postgresql://db-readonly-username:db-secret-password@postgres:5432/wizard
```
As you can see, the confidential data is injected successfully and the result is rendered in the format specified by annotation.

At this point, we have completed the KCL/Kusion integration Vault agent to realize secret management.

## What's Next

- Learn about secret management with [Vault CSI Provider](/docs/user_docs/guides/sensitive-data-solution/vault-csi-provider)