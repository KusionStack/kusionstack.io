# Vault CSI Provider

This guide will show you that KCL/Kusion solves the secret management problem by integrating Vault CSI Provider.
We will pass the database username and password into the Pod, involving 3 kubernetes built-in resources and 1 custom resource:

- Namespace
- Deployment
- ServiceAccount
- SecretProviderClass

:::tip

This guide requires you to have a basic understanding of Kubernetes.
If you are not familiar with the relevant concepts, please refer to the links below:
- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ServiceAccount](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)
- [SecretProviderClass](https://secrets-store-csi-driver.sigs.k8s.io/concepts.html#custom-resource-definitions-crds)
:::

## Prerequisites

Before we start, we need to complete the following steps first:

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

The Helm tool is used to deploy the Vault server and CSI driver.
If you haven't installed Helm, please refer to [Install Helm](https://helm.sh/docs/intro/install/).

## Install Vault server and CSI driver

We recommend deploying the Vault server and CSI driver on Kubernetes by _Helm Chart_.
[Helm](https://helm.sh/docs/helm/) is a package manager,
which can install and configure Vault and its related components in different modes.
Helm chart implements conditionalization and parameterization of templates.
These parameters can be set via command line arguments or defined in YAML files.

### Install Vault server

1、Add HashiCorp helm repository:
```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
```

2、Update to cache HashiCorp's latest version:
```bash
helm repo update
```

3、Install Vault server, start in development mode, disable Injector and enable CSI:
```bash
helm install vault hashicorp/vault \
    --set "server.dev.enabled=true" \
    --set "injector.enabled=false" \
    --set "csi.enabled=true"
```
`server.dev.enabled=true` indicates that Vault is started in developer mode on a single pod.
`injector.enabled=false` indicates that the Injector service is disabled;
`csi.enabled=true` Indicates that the Vault CSI Pod is enabled.
If you already have Vault installed, you can use the `helm upgrade` command to update Vault's deployment mode.

4、Check all pods in the default namespace:
```bash
kubectl get pod
NAME                       READY   STATUS    RESTARTS   AGE
vault-0                    1/1     Running   0          17m
vault-csi-provider-456hl   1/1     Running   0          17m
```

Wait until the status of `vault-0` is `Running` and ready (`1/1`) before continuing with this guide.

### Install CSI driver

[Secrets Store CSI Driver](https://secrets-store-csi-driver.sigs.k8s.io/introduction.html)
`secrets-store.csi.k8s.io` allows Kubernetes to mount multiple secrets, keys,
and certs stored in enterprise-grade external secrets stores into their pods as a volume.
Once the volume is attached, the data in it is mounted into the container’s file system.

:::tip

The [Container Storage Interface (CSI)](https://github.com/container-storage-interface/spec/blob/master/spec.md)
is a standard for exposing arbitrary block and file storage systems
to containerized workloads on Container Orchestration Systems (COs) like Kubernetes.
Using CSI third-party storage providers can write and deploy plugins exposing new storage systems in Kubernetes
without ever having to touch the core Kubernetes code.
:::

1、Add CSI driver helm repository:
```bash
helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
```

2、Install Kubernetes-Secrets-Store-CSI-Driver：
```bash
helm install csi secrets-store-csi-driver/secrets-store-csi-driver --namespace kube-system
```

3、Check CSI driver pods:
```bash
kubectl --namespace=kube-system get pods -l "app=secrets-store-csi-driver"
NAME                                 READY   STATUS    RESTARTS   AGE
csi-secrets-store-csi-driver-2wl2f   3/3     Running   0          2m
```

Wait until the status of pod `csi-secrets-store-csi-driver-2wl2f` is `Running` and is ready (`3/3`) before continuing with this guide.

## Configure Vault

Vault stores confidential data in its database, and users need to configure the relevant confidential data and enable Vault's Kubernetes authentication.

### Create a secret

In [Create a pod with a secret mounted](#create-a-pod-with-a-secret-mounted) section,
the volume mounted in Pod expects secret stored at path `secret/data/db-pass`.
When Vault is run in development a K/V secret engine is enabled at the path `/secret`.

1、start an interactive shell session on the `vault-0` pod:
```bash
kubectl exec -it vault-0 -- /bin/sh
```

2、Create a secret at the path `secret/db-pass` with a password:
```bash
vault kv put secret/db-pass password="db-secret-password"
```

The output is similar to:
```
Key                Value
---                -----
created_time       2022-03-17T07:45:06.3767973Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1
```

3、Verify that the secret is readable at the path `secret/db-pass`.
```bash
vault kv get secret/db-pass
```

The output is similar to:
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
For now, the confidential data is created, please don't exit the vault pod immediately.

### Enable Kubernetes authentication

Vault provides a Kubernetes authentication method that enables clients to authenticate with a Kubernetes ServiceAccount Token.
The Kubernetes resources that access the secret and create the volume authenticate through this method through a `role`.

1、Continue with the terminal in the previous step, and enable the Kubernetes authentication method:
```bash
vault auth enable kubernetes
```

The output is similar to:
```
Success! Enabled kubernetes auth method at: kubernetes/
```

2、Configure authentication rules, depending on the Kubernetes API address, ServiceAccount token, certificate, and the issuer of the Kubernetes ServiceAccount(required for Kubernetes 1.21+):
```bash
vault write auth/kubernetes/config \
    kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443" \
    token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
    kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
    issuer="https://kubernetes.default.svc.cluster.local"
```

The output is similar to:
```
Success! Data written to: auth/kubernetes/config
```

When Kubernetes creates pods, mount `token_reviewer_jwt` and `Kubernetes_ca_cert` into them.
The environment variable `KUBERNETES_PORT_443_TCP_ADDR` references the internal network address of the Kubernetes host.

3、Create a policy named `kcl-vault-csi-policy`:
```bash
vault policy write kcl-vault-csi-policy - <<EOF
path "secret/data/db-pass" {
  capabilities = ["read"]
}
EOF
```

Kubernetes-Secrets-Store-CSI-Driver needs to read the secret key, which must have read access to the mounted volume.

4、Create a role named `kcl-vault-csi-role`:
```bash
vault write auth/kubernetes/role/kcl-vault-csi-role \
    bound_service_account_names=kcl-vault-csi-sa \
    bound_service_account_namespaces=kcl-vault-csi \
    policies=kcl-vault-csi-policy \
    ttl=24h
```

The output is similar to:
```
Success! Data written to: auth/kubernetes/role/kcl-vault-csi-role
```

This role associates the Kubernetes service account `kcl-vault-csi-sa` and namespace `kcl-vault-csi` with the Vault policy `kcl-vault-csi-role`.
This Kubernetes service account will be created later. The token returned after successful authentication is valid for 24 hours.
Finally, exit the `vault-0` pod.

## Verify Secret

In the previous section, we created a secret in the Vault server,
configured the Vault `role` and `policy`, and completed the binding of `Namespace` and `ServiceAccount`.
In this section, we directly use the Vault demo project `kcl-vault-csi` in Konfig to deploy the application and verify the results.

### Create a pod with a secret mounted

1、Enter stack dir `base/examples/kcl-vault-csi/dev` and apply stack configs:
```bash
cd base/examples/kcl-vault-csi/dev && kusion apply --yes=true
```

The output is similar to:
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

The four resources are created successfully.
After the deployment controller finished syncing pods, it will mount the volume declared in SecretProviderClass to the pod's file system.

### Verify mount results

1、Check pod status:
```bash
kubectl get pod -n kcl-vault-csi 
```

The output is similar to:
```
NAME                                 READY   STATUS    RESTARTS   AGE
kcl-vault-csi-dev-64b66968d8-p27fv   1/1     Running   0          12s
```

2、Read file content from `/mnt/secrets-store/db-password`, see if it is the password written in the section [Create a secret](#create-a-secret):
```bash
kubectl exec -it kcl-vault-csi-dev-64b66968d8-p27fv -n kcl-vault-csi -- cat /mnt/secrets-store/db-password
```

The output is similar to:
```
db-secret-password
```

It can be seen that we successfully injected the secret data `password` into the file system of the pod by the CSI driver.

## What's Next

- Learn about secret management with [Vault Agent](/docs/user_docs/guides/sensitive-data-solution/vault-agent)
