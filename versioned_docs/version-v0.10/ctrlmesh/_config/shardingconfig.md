---
sidebar_position: 1
---
# ShardingConfig

## Auto Sharding
```yaml
apiVersion: ctrlmesh.kusionstack.io/v1alpha1
kind: ShardingConfig
metadata:
  name: sharding-root
  namespace: default
spec:
  root:
    prefix: demo
    targetStatefulSet: operator-demo
    canary:
      replicas: 1
      inNamespaces: 
      - ns-canary
    auto: 
      everyShardReplicas: 2
      shardingSize: 2
  resourceSelector:
  - relatedResources:
    - apiGroups:
      - '*'
      resources:
      - pods
  controller: 
    leaderElectionName: operator-leader
  webhook:
    certDir: /etc/kubernetes/webhook-cret/
    port: 9443
```