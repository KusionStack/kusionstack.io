---
id: k8s-manifest
---

# Apply the Raw K8s Manifest YAML

The guides above provide examples on how to configure workloads and accessories with KCL, and generate the related Kubernetes resources with Kusion Module generators, which is the usage method we recommend, as it can achieve the separation of concerns between developers and platform engineers, reducing the cognitive burden on developers. 

However, in some specific scenario, users may also have the need to directly use Kusion to apply and manage the raw Kubernetes manifest YAML files, such as taking over some existing resources and deploying CRD (CustomResourceDefinition), or other special resources. 

To help users directly apply raw K8s manifests, the KusionStack community has provided the [k8s_manifest](../../../6-reference/2-modules/1-developer-schemas/k8s_manifest/k8s_manifest.md) Kusion Module. 

:::info
The module definition and implementation, as well as the example can be found at [here](https://github.com/KusionStack/catalog/tree/main/modules/k8s_manifest). 
:::

## Prerequisites

Please refer to the [prerequisites](1-deploy-application#prerequisites) in the guide for deploying an application. 

The example below also requires you to have [initialized the project](1-deploy-application#initializing) using the `kusion workspace create`, `kusion project create`, `kusion stack create` command, which will create a workspace and project, and also generate a [kcl.mod](1-deploy-application#kclmod) file under the stack directory. 

## Managing Workspace Configuration

In the first guide in this series, we introduced a step to [initialize a workspace](1-deploy-application#initializing-workspace-configuration) with an empty configuration. The same empty configuration will still work in this guide, no changes are required there. Alternatively, if you have updated your workspace config in the previous guides, no changes need to be made either.

However, if you (or the platform team) would like to set some default paths for the raw K8s manifest YAML files to standardize the behavior of applications in the `dev` workspace, you can do so by updating the `dev.yaml` with the following config block: 

```yaml
modules: 
    k8s_manifest: 
        path: oci://ghcr.io/kusionstack/k8s_manifest
        version: 0.1.0
        configs: 
            default: 
                # The default paths to apply for the raw K8s manifest YAML files. 
                paths: 
                    - /path/to/k8s_manifest.yaml
                    - /dir/to/k8s_manifest/
```

Please note that the `paths` decalred by the platform engineers in the workspace configs will be merged with the ones declared by the developers in the `AppConfiguration` in `main.k`. 

The workspace configuration needs to be updated with the command: 

```bash
kusion workspace update dev -f dev.yaml
```

## Example

To apply the specified raw K8s manifest YAML files with `k8s_manifest` module, please use the `v0.2.1` version of `kam`, whose `workload` is no longer a required field in the `AppConfiguration` model. An example is shown below: 

`kcl.mod`: 
```py
[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "v0.2.1" }
k8s_manifest = { oci = "oci://ghcr.io/kusionstack/k8s_manifest", tag = "0.1.0" }
```

`stack.yaml`: 
```yaml
# Generate a specified namespace 
name: dev
extensions: 
  - kind: kubernetesNamespace
    kubernetesNamespace: 
      namespace: test
```

`main.k`: 
```py
import kam.v1.app_configuration as ac
import k8s_manifest

test: ac.AppConfiguration {
    accessories: {
        "k8s_manifests": k8s_manifest.K8sManifest {
            paths: [
                # The `test.yaml` should be placed under the stack directory, 
                # as it is declared using a relative path. 
                "./test.yaml"
            ]
        }
    }
}
```

`test.yaml`: 
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: test
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

## Generate and Applying

Execute the `kusion generate` command, the `Deployment` in the `test.yaml` will be generated into a Kusion `Resource` with a Kusion ID in the `Spec`. 

```
➜  dev git:(main) ✗ kusion generate
 ✔︎  Generating Spec in the Stack dev...
resources:
    - id: v1:Namespace:test
      type: Kubernetes
      attributes:
        apiVersion: v1
        kind: Namespace
        metadata:
            creationTimestamp: null
            name: test
        spec: {}
        status: {}
      extensions:
        GVK: /v1, Kind=Namespace
    - id: apps/v1:Deployment:test:nginx-deployment
      type: Kubernetes
      attributes:
        apiVersion: apps/v1
        kind: Deployment
        metadata:
            labels:
                app: nginx
            name: nginx-deployment
            namespace: test
        spec:
            replicas: 3
            selector:
                matchLabels:
                    app: nginx
            template:
                metadata:
                    labels:
                        app: nginx
                spec:
                    containers:
                        - image: nginx:1.14.2
                          name: nginx
                          ports:
                            - containerPort: 80
      dependsOn:
        - v1:Namespace:test
secretStore: null
context: {}
```

Execute the `kusion apply` command, you may get the output like the following: 

```
➜  dev git:(main) ✗ kusion apply
 ✔︎  Generating Spec in the Stack dev...
Stack: dev
ID                                        Action
v1:Namespace:test                         Create
apps/v1:Deployment:test:nginx-deployment  Create


Do you want to apply these diffs?:
  > yes

Start applying diffs ...
 ✔︎  Succeeded v1:Namespace:test
 ✔︎  Succeeded apps/v1:Deployment:test:nginx-deployment
Apply complete! Resources: 2 created, 0 updated, 0 deleted.

[v1:Namespace:test]
Type   Kind       Name  Detail
READY  Namespace  test  Phase: Active
[apps/v1:Deployment:test:nginx-deployment]
Type   Kind        Name                               Detail
READY  Deployment  nginx-deployment                   Ready: 3/3, Up-to-date: 3, Available: 3
READY  ReplicaSet  nginx-deployment-7fb96c846b        Desired: 3, Current: 3, Ready: 3
READY  Pod         nginx-deployment-7fb96c846b-d9pp4  Ready: 1/1, Status: Running, Restart: 0, Age: 2s
```

## Validation

We can verify the `Deployment` and `Pod` we have just applied: 

```shell
➜  dev git:(main) ✗ kubectl get deployment -n test
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           70s
➜  dev git:(main) ✗ kubectl get pod -n test
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-7fb96c846b-d9pp4   1/1     Running   0          87s
nginx-deployment-7fb96c846b-j45nt   1/1     Running   0          87s
nginx-deployment-7fb96c846b-tnz5f   1/1     Running   0          87s
```
