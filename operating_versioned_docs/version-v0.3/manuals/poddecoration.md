---
sidebar_position: 4
---

# PodDecoration
PodDecoration works in conjunction with CollaSet to selectively inject specific configurations to Pods that meet certain criteria. 

PodDecoration not only allows injecting sidecar containers to Pods but also enables modifying existing container configurations, metadata, and scheduling parameters etc.
The PodDecoration controller does not control the upgrade of Pods. The actual upgrade process is fully controlled by the CollaSet controller. This means that the injection upgrade of PodDecoration can also be performed `InPlaceIfPossible`.

About [CollaSet](collaset.md).
# Example

## Create CollaSet

```yaml
# collaset.yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: foo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: foo
  template:
    metadata:
      labels:
        app: foo
    spec:
      containers:
      - image: nginx:1.25.2
        name: foo
```
Use `collaset.yaml` to create three pods under CollaSet `foo` management.
```shell
$ kubectl apply -f collaset.yaml
collaset.apps.kusionstack.io/foo created

$ kubectl get cls
NAME     DESIRED   CURRENT   AVAILABLE   UPDATED   UPDATED_READY   UPDATED_AVAILABLE   CURRENT_REVISION   UPDATED_REVISION   AGE
foo      3         3         3           3         3               3                   foo-7bdb974bc7     foo-7bdb974bc7     7s

$ kubectl get pod
NAME           READY   STATUS    RESTARTS      AGE
foo-2wnnf      1/1     Running   0             41s
foo-hqpx7      1/1     Running   0             41s
foo-mqt48      1/1     Running   0             41s
```
## Create PodDecoration

The following `poddecoration.yaml` file describes a PodDecoration, which selects the pod under CollaSet `foo` and injects the content in `template` into the pod with `instance-id=0`.

```yaml
# poddecoration.yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: PodDecoration
metadata:
  name: sample-pd
spec:
  selector:     # selected pod range in which PodDecoration takes effect
    matchLabels:
      app: foo
  updateStrategy:
    rollingUpdate:
      selector:      # select pod to upgrade in effect range
        matchLabels:
          collaset.kusionstack.io/instance-id: "0"
  template:
    metadata:
    - patchPolicy: Overwrite
      labels:
        custom.io/sidecar-version: "v1"
    containers:
    - injectPolicy: AfterPrimaryContainer
      name: sidecar-a
      image: ubuntu:22.04
      command: ["sleep", "2h"]
      volumeMounts:
      - name: sample-volume
        mountPath: /vol/sample
    volumes:
    - name: sample-volume
      emptyDir: {}
```

Create PodDecoration `sample-pd` to upgrade selected pod 
```shell
$ kubectl apply -f poddecoration.yaml
poddecoration.apps.kusionstack.io/sample-pd created
```
The status of PodDecoration is updated, and one pod is injected with sidecar through recreate.
```shell
$ kubectl get pd
NAME        EFFECTIVE   MATCHED   INJECTED   UPDATED   UPDATED_READY   CURRENT_REVISION   UPDATED_REVISION      AGE
sample-pd   true        3         1          1         1                                  sample-pd-9465f4c84   20s

$ kubectl get pod
NAME        READY   STATUS    RESTARTS   AGE
foo-2gnnl   2/2     Running   0          15s
foo-2wnnf   1/1     Running   0          2m
foo-hqpx7   1/1     Running   0          2m

$ kubectl get pd sample-pd -o yaml | grep -A20 status
status:
  details:
  - affectedReplicas: 3
    collaSet: foo
    pods:
    - name: foo-2gnnl
      revision: sample-pd-9465f4c84
    - name: foo-2wnnf
      escaped: true
    - name: foo-hqpx7
      escaped: true
  matchedPods: 3
  injectedPods: 1
  updatedPods: 1
  updatedReadyPods: 1
  updatedAvailablePods: 1
  isEffective: true
  updatedRevision: sample-pd-9465f4c84
```

## Update PodDecoration

### Rolling update v1

Edit `sample-pd` to expand the upgrade scope.
```shell
$ kubectl edit pd sample-pd
```

```yaml
# poddecoration.yaml
# Edit updateStrategy to select instance-id in [0, 1, 2]
...
spec:
  ...
  updateStrategy:
    rollingUpdate:
      selector: 
        matchExpressions:
        - key: collaset.kusionstack.io/instance-id
          operator: In
          values:
          - "0"
          - "1"  
          - "2"  
  template:
    ...
```

All pods updated.
```shell
$ kubectl get pd
NAME        EFFECTIVE   MATCHED   INJECTED   UPDATED   UPDATED_READY   CURRENT_REVISION      UPDATED_REVISION      AGE
sample-pd   true        3         3          3         3               sample-pd-9465f4c84   sample-pd-9465f4c84   3m

$ kubectl get pod
NAME        READY   STATUS    RESTARTS      AGE
foo-2gnnl   2/2     Running   0             3m
foo-lftw8   2/2     Running   0             8s
foo-n57rr   2/2     Running   0             8s

$ kubectl get pd sample-pd -o yaml | grep -A20 status
status:
  currentRevision: sample-pd-9465f4c84
  details:
  - affectedReplicas: 3
    collaSet: foo
    pods:
    - name: foo-2gnnl
      revision: sample-pd-9465f4c84
    - name: foo-lftw8
      revision: sample-pd-9465f4c84
    - name: foo-n57rr
      revision: sample-pd-9465f4c84
  matchedPods: 3
  injectedPods: 3
  updatedPods: 3
  updatedReadyPods: 3
  updatedAvailablePods: 3
  isEffective: true
  currentRevision: sample-pd-9465f4c84
  updatedRevision: sample-pd-9465f4c84
```
### Rolling update v1 -> v2


Update `sample-pd`'s sidecar container image and `updateStrategy`.
```shell
$ kubectl edit pd sample-pd
```
```yaml
# poddecoration.yaml
# Update sidecar-a's image with ubuntu:22.10
# Edit updateStrategy to select instance-id in [0]
...
spec:
  ...
  updateStrategy:
    rollingUpdate:
      selector:
        - key: collaset.kusionstack.io/instance-id
          operator: In
          values:
          - "0"
  template:
    ...
    containers:
    - injectPolicy: AfterPrimaryContainer
      name: sidecar-a
      image: ubuntu:22.10
      ...
```
Pod `foo-2gnnl` in-place upgrade sidecar container image.
```shell
$ kubectl get pd
NAME        EFFECTIVE   MATCHED   INJECTED   UPDATED   UPDATED_READY   CURRENT_REVISION      UPDATED_REVISION       AGE
sample-pd   true        3         3          1         1               sample-pd-9465f4c84   sample-pd-8697d4bf8c   6min

$ kubectl get pod
NAME        READY   STATUS    RESTARTS       AGE
foo-2gnnl   2/2     Running   1 (12s ago)    6m
foo-lftw8   2/2     Running   0              3min
foo-n57rr   2/2     Running   0              3min

$ kubectl get pod foo-2gnnl -o yaml | grep "image: ubuntu"
    image: ubuntu:22.10

$ kubectl get pd sample-pd -o yaml | grep -A20 status
status:
  details:
  - affectedReplicas: 3
    collaSet: foo
    pods:
    - name: foo-2gnnl
      revision: sample-pd-8697d4bf8c
    - name: foo-lftw8
      revision: sample-pd-9465f4c84
    - name: foo-n57rr
      revision: sample-pd-9465f4c84
  matchedPods: 3
  injectedPods: 3
  updatedPods: 1
  updatedReadyPods: 1
  updatedAvailablePods: 1
  isEffective: true
  currentRevision: sample-pd-9465f4c84
  updatedRevision: sample-pd-8697d4bf8c
```


# Features

## Injection

### Metadata
```yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: PodDecoration
spec:
  template:
    metadata:
    - patchPolicy: MergePatchJson
      annotations:
        cafe.sofastack.io/decoration-version: '[{"name":"sample-pd","version":"v2"}]'
    - patchPolicy: Overwrite
      labels:
        custom.io/sidecar-version: "v2"
      annotations:
        cafe.sofastack.io/decoration-name: sample-pd
```
`patchPolicy` is the injected policy, as follows:
- `Retain`: The original value of annotations and labels will be retained.
- `Overwrite`: The value of annotations and labels corresponding to the existing key will be overwritten.
- `MergePatchJson`: It only takes effect for annotation. If the key does not exist, the value will be written directly. Otherwise, the json value will be merged.

For example：
```yaml
# Old pod metadata
metadata:
  labels:
    custom.io/sidecar-version: "v1"
  annotations:
    cafe.sofastack.io/decoration-version: '[{"name":"old-pd","version":"v1"}]'

# After metadata injected
metadata:
  labels:
    custom.io/sidecar-version: "v2"
  annotations:
    cafe.sofastack.io/decoration-type: sample-pd
    cafe.sofastack.io/decoration-version: '[{"name":"old-pd","version":"v1"}, {"name":"sample-pd","version":"v2"}]'
```
### Primary Container

```yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: PodDecoration
spec:
  template:
    primaryContainers:
    - targetPolicy: ByName
      name: foo
      image: foo:v2
      env: 
      - name: APP_NAME
        value: foo
      volumeMounts:
      - name: sample-volume
        mountPath: /vol/sample
    volumes:
    - name: sample-volume
      emptyDir: {}
```
Injection into the primary containers only supports limited fields: `image`, `env` and `volumeMounts`.

`targetPolicy` indicates which existed container these configuration should inject into, as follows:
- `ByName`: Only inject containers matching `name`.
- `All`: Inject all primary containers.
- `First`: Inject into first primary container.
- `Last`: Inject into last primary container.

### Sidecar Container

```yaml
spec:
  template:
    containers:
    - injectPolicy: AfterPrimaryContainer  # Container injected policy, AfterPrimaryContainer or BeforePrimaryContainer
      name: sidecar-a
      image: ubuntu:22.04
      ...
```
Inject a new sidecar container. Optional, it can be placed in front or behind the primary container.
### InitContainer

```yaml
spec:
  template:
    initContainers:
    - name: init
      image: custom-init-image:v1
      ...
```

## Upgrade strategy
Coming soon...