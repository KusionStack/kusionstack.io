---
sidebar_position: 4
---
# Try a Sample
This guide lets you quickly evaluate KusionStack Controller Mesh. 


## Install Controller Mesh Manager
Controller Mesh requires **Kubernetes version >= 1.18**

**Install with helm**
```bash
# Firstly add KusionStack charts repository if you haven't do this.
$ helm repo add kusionstack https://kusionstack.github.io/charts

# To update the kusionstack repo.
$ helm repo update kusionstack

# Install the latest version.
$ helm install ctrlmesh kusionstack/ctrlmesh

# Wait manager ready
$ kubectl -n ctrlmesh get po
NAME                        READY   STATUS    RESTARTS   AGE
ctrlmesh-57d6b4df57-mdslc   1/1     Running   0          40s
ctrlmesh-57d6b4df57-mtv2s   1/1     Running   0          40s
```
[Install manager with more options](install.md)
## Enable Custom Operator Sharding

You can use the **[Operating v0.1.1](https://kusionstack.io/docs/operating/introduction/)** available here.

Deploy the sample operator with ShardingConfig:

```bash
$ helm repo update
$ helm install sample-operating kusionstack/operating \
  --version v0.2.0 \
  --set sharding.enabled=true \
  --set sharding.isDemo=true

$ kubectl -n kusionstack-system get sts
NAME                    READY   AGE
kusionstack-operating   5/5     1m45s

# The proxy container will be automatically injected into the pod
$ kubectl -n kusionstack-system get po
NAME                      READY   STATUS              RESTARTS   AGE
kusionstack-operating-0   2/2     Running             0          42s
kusionstack-operating-1   2/2     Running             0          32s
kusionstack-operating-2   2/2     Running             0          21s
kusionstack-operating-3   2/2     Running             0          12s
kusionstack-operating-4   0/2     ContainerCreating   0          1s

# Now we have three shards with three lease.
#  operating-0-canary -> [kusionstack-operating-0]
#  operating-1-normal -> [kusionstack-operating-1, kusionstack-operating-2]
#  operating-2-normal -> [kusionstack-operating-3, kusionstack-operating-4]
$ kubectl -n kusionstack-system get lease
NAME                                                  HOLDER                                                         AGE
kusionstack-controller-manager---operating-0-canary   kusionstack-operating-0_81b5bbae-be63-45ed-a939-e67e0c3d6326   12m
kusionstack-controller-manager---operating-1-normal   kusionstack-operating-1_e4bbad49-e6ec-42fa-8ffd-caae82156a3e   12m
kusionstack-controller-manager---operating-2-normal   kusionstack-operating-3_94f7f81a-f9e6-47d6-b72b-e16da479e9be   12m
```

 Show the sample ShardingConfig:

```bash
$ helm template sample-operating kusionstack/operating \
  --version v0.1.1 \
  --set sharding.enabled=true \
  --set sharding.isDemo=true \
  --show-only templates/shardingconfig.yaml
```

Here is a sample `ShardingConfig`:
```yaml
---
# Source: operating/templates/shardingconfig.yaml
apiVersion: ctrlmesh.kusionstack.io/v1alpha1
kind: ShardingConfig
metadata:
  name: sharding-root
  namespace: kusionstack-system
spec:
  # Auto sharding config
  root:
    prefix: operating
    targetStatefulSet: kusionstack-operating
    canary:
      replicas: 1
      inNamespaces:
      - kusionstack-system
    auto:
      everyShardReplicas: 2
      shardingSize: 2
    resourceSelector:
    - relateResources:
      - apiGroups:
        - '*'
        resources:
        - configmaps
        - pods
        - endpoints
        - services
        - replicasets
      - apiGroups:
        - apps.kusionstack.io
        resources:
        - '*'
  controller:
    leaderElectionName: kusionstack-controller-manager
```
You can configure the ShardingConfig according to your requirements.

:::info
In order to enable the ShardingConfig, you also need to add the following label to the pod template.  
`ctrlmesh.kusionstack.io/enable-proxy: 'true'`  
We plan to deprecate it in future versions.
:::

:::info
Supported OS/ARCH  
**ControllerMesh** v0.1.0: `linux/amd64`, `linux/arm64`.  
**Operating** v0.1.1: `linux/amd64`, `linux/arm64`.  
:::