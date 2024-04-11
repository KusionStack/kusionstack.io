# Concepts

Generally, a `ctrlmesh-proxy` container will be injected into each operator Pod that has configured in ShardingConfigs.
This proxy container will intercept and handle the connection by between API/Oth Server and controllers/webhooks in the Pod.

<p align="center">
<img width="550" src={require("./../images/fake-configmap.png").default}
/></p>


ApiServer proxy method:
- *iptables nat*: 
- *fake kubeconfig*: 

The `ctrlmesh-manager` dispatches rules to the proxies, so that they can route requests according to the rules.


A core CRD of ControllerMesh is `ShardingConfig`. It contains all rules for user's controller:

```yaml
apiVersion: ctrlmesh.kusionstack.io/v1alpha1
kind: ShardingConfig
metadata:
  name: sharding-demo
  namespace: operator-demo
spec:
  controller:
    leaderElectionName: operator-leader
  webhook:
    certDir: /tmp/webhook-certs
    port: 9443
  limits:
  - relateResources:
    - apiGroups:
      - '*'
      resources:
      - pods
      - services
    selector:
      matchExpressions:
      - key: ctrlmesh.kusionstack.io/namespace
        operator: In
        values:
        - ns-a
        - ns-b
      matchLabels:
        app: foo
  selector:
    matchExpressions:
    - key: statefulset.kubernetes.io/pod-name
      operator: In
      values:
      - operator-demo-0
```

- selector: for all pods under a shard. It can be a subset of pods under a StatefulSet.
- controller: configuration for controller, including leader election name
- webhook: configuration for webhook, including certDir and port of this webhook
- limits: shard isolation is achieved through a set of `ObjectSelector`.

When `manager` is first launched, shard labels will be added to all configured resources.

- `ctrlmesh.kusionstack.io/sharding-hash`: the hash value calculated based on the namespace ranges from 0 to 31.
- `ctrlmesh.kusionstack.io/namespace`: the namespace referring to this resource.
- `ctrlmesh.kusionstack.io/control`: under ctrlmesh-manager control.


In this repo, we only support `ObjectSelector` type of flow control,
which means the `ctrlmesh-proxy `will proxy http/s requests to the ApiServer, 
and inject a `LabelSelector` into the request param for the requested resource type.




Router:
<p align="center">
<img width="600" src={require("../images/mesh-proxy.png").default}
/></p>