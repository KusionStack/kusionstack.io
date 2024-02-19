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


## Try with sample-operator

Here is an example of a `Deployment` enabling sharding.
### Get and deploy sample-operator v0
👉 [sample-operator repo](https://github.com/KusionStack/controller-mesh/tree/sample-operator)  
```bash
# Clone and checkout branch sample-operator.
$ git clone -b sample-operator https://github.com/KusionStack/controller-mesh.git
$ cd sample

# Make sure you have kind or test cluster, and kubectl is available.

# Deploy default sample-operator v0.
$ IMAGE_TAG=v0.1.0 make deploy

namespace/kusionstack-sample created
serviceaccount/kusionstack-controller-manager created
role.rbac.authorization.k8s.io/kusionstack-leader-election-role created
clusterrole.rbac.authorization.k8s.io/kusionstack-manager-role created
rolebinding.rbac.authorization.k8s.io/kusionstack-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/kusionstack-sample-manager-rolebinding created
deployment.apps/kusionstack-sample-operator-v0 created

# kusionstack-sample-operator-v0 is created.
$ kubectl get deploy -n kusionstack-sample     
NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
kusionstack-sample-operator-v0   2/2     2            2           14s

$ kubectl get po -n kusionstack-sample  
NAME                                              READY   STATUS    RESTARTS   AGE
kusionstack-sample-operator-v0-66f7595c7b-n4c47   1/1     Running   0          50s
kusionstack-sample-operator-v0-66f7595c7b-wxwtv   1/1     Running   0          50s

# sample-operator uses leader-election. Only one leader pod reconciling.
$ kubectl -n kusionstack-sample get lease 
NAME                     HOLDER                                                                                 AGE
sample-operator-leader   kusionstack-sample-operator-v0-66f7595c7b-wxwtv_c0ed684d-f332-47f6-890c-dd7e489486f2   53
```
### Play with ShardingConfig

By configuring `ShardingConfig` appropriately, you can achieve canary and sharding deploy.

**Isolate canary namespaces**
```bash
# Create some test namespaces([foo-01, foo-02, ..., foo-31]).
$ chmod +x ./scripts/create-ns-foo.sh && ./scripts/create-ns-foo.sh

# All namespaces are controlled by sample-operator v0.
$ kubectl get ns -l sample.kusionstack.io/control-by=kusionstack-sample-operator-v0-66f7595c7b-wxwtv                                               
NAME                 STATUS   AGE
default              Active   12d
foo-01               Active   78s
foo-02               Active   78s
foo-03               Active   78s
...                  ...      ...
foo-32               Active   78s

# There are more details in leader pod log.
$ kubectl logs kusionstack-sample-operator-v0-66f7595c7b-wxwtv -n kusionstack-sample | grep "hold namespaces"
I0110 09:32:50.950535   1 runner.go:101] hold namespaces [ctrlmesh default foo-01 foo-02 foo-03 foo-04 foo-05 foo-06 foo-07 foo-08 foo-09 foo-10 foo-11 foo-12 foo-13 foo-14 foo-15 foo-16 foo-17 foo-18 foo-19 foo-20 foo-21 foo-22 foo-23 foo-24 foo-25 foo-26 foo-27 foo-28 foo-29 foo-30 foo-31 foo-32 kusionstack-sample kusionstack-system local-path-storage]

# Apply sample ShardingConfigs
$ ./bin/kustomize build config/shardingconfig/canary | kubectl apply -f -
shardingconfig.ctrlmesh.kusionstack.io/kusionstack-sample-operator-0-canary created
shardingconfig.ctrlmesh.kusionstack.io/kusionstack-sample-operator-1-normal created
```

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '5px',
      color: '#fff',
      padding: '0.1rem',
    }}>
    {children}
  </span>
);

The [kusionstack-sample-operator-0-canary](https://github.com/KusionStack/controller-mesh/blob/sample-operator/sample/config/shardingconfig/canary/shardingconfig-canary.yaml) has restricted the scope of namespaces <Highlight color="#A3B1A8">[foo-01, foo-02, foo-03]</Highlight> reconciled by version `v1`.
And [kusionstack-sample-operator-1-normal](https://github.com/KusionStack/controller-mesh/blob/sample-operator/sample/config/shardingconfig/canary/shardingconfig-normal.yaml) decided that other namespaces will be reconciled by version `v0`.
```bash
# Patch labels to pod template to inject sidecar and ShardingConfig
$ kubectl -n kusionstack-sample patch deployment kusionstack-sample-operator-v0 --type=strategic --patch \
  'spec:
    template:
      metadata:
        labels:
          ctrlmesh.kusionstack.io/enable-proxy: "true"
          ctrlmesh.kusionstack.io/watching: "true"'

# Mesh proxy container was injected
$ kubectl get po -n kusionstack-sample
NAME                                              READY   STATUS    RESTARTS   AGE
kusionstack-sample-operator-v0-6944bb4bf5-gclqq   2/2     Running   0          30s
kusionstack-sample-operator-v0-6944bb4bf5-lfwdb   2/2     Running   0          41s

# Find current leader
# sharding lease format: ${leader-election-name}---${shardingconfig-name}
$ kubectl get lease -n kusionstack-sample
NAME                                                            HOLDER                                                                                 AGE
sample-operator-leader---kusionstack-sample-operator-1-normal   kusionstack-sample-operator-v0-6944bb4bf5-lfwdb_497a7962-a5f1-465e-b8ef-6e35660c63f4   32s

# Namespaces [foo-1, foo-2, foo-3] are no longer under v0 control.
$ kubectl logs kusionstack-sample-operator-v0-6944bb4bf5-lfwdb -c manager -n kusionstack-sample | grep "namespaces"
 ... hold namespaces [default foo-04 foo-05 ... foo-32]

```

**Deploy canary sample-operator v1**

```bash
# Apply sample operator v1 which deployment already labeled
$ ./bin/kustomize build config/manager-v1 | kubectl apply -f - 
deployment.apps/kusionstack-sample-operator-v1 created

# Two pods created
$ kubectl get po -n kusionstack-sample
NAME                                              READY   STATUS              RESTARTS   AGE
kusionstack-sample-operator-v0-6944bb4bf5-gclqq   2/2     Running             0          4m
kusionstack-sample-operator-v0-6944bb4bf5-lfwdb   2/2     Running             0          4m
kusionstack-sample-operator-v1-7b6bbb49c8-kbgww   0/2     ContainerCreating   0          3s
kusionstack-sample-operator-v1-7b6bbb49c8-qbzjj   0/2     ContainerCreating   0          3s

# The canary shard uses a separate lease
$ kubectl get lease -n kusionstack-sample 
NAME                                                            HOLDER                                                                                 AGE
sample-operator-leader---kusionstack-sample-operator-0-canary   kusionstack-sample-operator-v1-7b6bbb49c8-qbzjj_64272983-c59a-4574-933d-7d5fea7a1e35   15s
sample-operator-leader---kusionstack-sample-operator-1-normal   kusionstack-sample-operator-v0-6944bb4bf5-lfwdb_497a7962-a5f1-465e-b8ef-6e35660c63f4   4m

# Only foo-01, foo-02, foo-03 controlled by v1
$ kubectl get ns -l sample.kusionstack.io/control-by=v1 -n kusionstack-sample
NAME     STATUS   AGE
foo-01   Active   4m
foo-02   Active   4m
foo-03   Active   4m

$ kubectl logs kusionstack-sample-operator-v1-7b6bbb49c8-qbzjj -c manager -c kusionstack-sample| grep namespaces
 ... hold namespaces [foo-01 foo-02 foo-03]
```
Similarly, if you want to have more shards, you need to do the following steps: 
1. Extract a portion of the namespace from the existing ShardingConfigs.
2. Configure a new ShardingConfig and apply it.
3. Recreate or restart the existing pods to make the new ShardingConfig take effect.
4. Scale out the Pods for the new ShardingConfig.


### Clear sample resources

```bash
$ chmod +x ./scripts/clear.sh && ./scripts/clear.sh
```
  
    
:::tip
**Beta**: *We try to support automatic sharding strategy. With automatic sharding configuration, there is no need to manually configure each shard's configuration. It manages multiple sub-shardingconfigs automatically through a root configuration.*
:::



## Try with Operating

For `StatefulSet` case, you can use the **[Operating v0.1.1](https://kusionstack.io/docs/operating/introduction/)** available here.

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
```yaml title="operating/templates/shardingconfig.yaml"
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
`ctrlmesh.kusionstack.io/watching: 'true'`  
`ctrlmesh.kusionstack.io/enable-proxy: 'true'`  
We plan to deprecate it in future versions.
:::