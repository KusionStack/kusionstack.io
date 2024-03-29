---
sidebar_position: 1
---

# CollaSet
CollaSet is responsible for managing a set of Pods. Similar to Kubernetes Deployment and StatefulSet, it also supports scaling and updating Pods. Additionally, CollaSet offers advanced features to provide users with more granular control over managing Pods.

A basic CollaSet configuration is represented in the following YAML format:

``` yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  replicas: 2
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
          name: nginx
```
Let's explore the features of CollaSet.

## Basic Features
### Scaling Pods
CollaSet utilizes the field spec.replicas to indicate the number of Pods under management.

``` yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  replicas: 3 # indicate the number of Pods to manage
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
          name: nginx
...
```
Pods can be provisioned by CollaSet.

``` shell
$ kubectl -n default apply -f ./config/samples/apps_v1alpha1_collaset.yaml
collaset.apps.kusionstack.io/collaset-sample created

$ kubectl -n default get pod
NAME                    READY   STATUS    RESTARTS   AGE
collaset-sample-85q7g   1/1     Running   0          57s
collaset-sample-vx5ws   1/1     Running   0          57s
collaset-sample-hr7pv   1/1     Running   0          57s

$ kubectl -n default get cls
NAME              DESIRED   CURRENT   UPDATED   UPDATED_READY   UPDATED_AVAILABLE   CURRENT_REVISION            UPDATED_REVISION            AGE
collaset-sample   3         3         3         3               3                   collaset-sample-6d7b7c58f   collaset-sample-6d7b7c58f   64s
```

By default, CollaSet always creates new Pods using the latest template specified in `spec.template`. CollaSet establishes ownership over a set of Pods through the label selector defined in `spec.selector`. Thus, it's important to ensure that the labels provided in `spec.selector` match those in `spec.template.metadata.labels`.

CollaSet status provides general information about this CollaSet and all Pods under it.

``` shell
$ kubectl -n default get cls collaset-sample -o yaml
......
status:
  availableReplicas: 3
  collisionCount: 0
  conditions:
  - lastTransitionTime: "2023-09-01T03:56:09Z"
    reason: Updated
    status: "True"
    type: Update
  currentRevision: collaset-sample-6d7b7c58f
  observedGeneration: 1
  operatingReplicas: 0
  readyReplicas: 3
  replicas: 3
  scheduledReplicas: 3
  updatedAvailableReplicas: 3
  updatedReadyReplicas: 3
  updatedReplicas: 3
  updatedRevision: collaset-sample-6d7b7c58f
```

Some fields in CollaSet status are explained here:

`updatedRevision` indicates the latest revision that CollaSet uses to create or update Pods.

`currentRevision` indicates the last updated revision. It will be set to updatedRevision after all Pods are updated, and their PodReady conditions become True.

`replicas` indicates the count of Pods under this CollaSet.

`scheduledReplicas` indicates the count of Pods under this CollaSet that successfully got scheduled.

`availableReplicas` indicates the count of Pods under this CollaSet that have all expected finalizers attached.

`updatedReplicas` indicates the count of Pods under this CollaSet that have the updated revision.

`updatedReadyReplicas` indicates the count of Pods under this CollaSet that are counted in `updatedReplicas` and have their PodReady conditions set to True.

`updatedAvailableReplicas` indicates the count of Pods under this CollaSet that is counted in `updatedReadyReplicas` and have all expected finalizers attached.

### Updating Pods
CollaSet generates Pods according to the pod template described in `spec.template`. This template can be updated to signal CollaSet to update each owned Pod:

``` shell
$ kubectl -n default edit cls collaset-sample
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
......
spec:
......
  template:
    ......
    spec:
      containers:
      - image: nginx:1.24.0  # changed from nginx:1.25.2 
......
```

CollaSet immediately updates all Pods it owns with the new Pod template by default.

``` shell
$ kubectl -n default get pod -o yaml | grep "image: nginx"
    - image: nginx:1.24.0
    - image: nginx:1.24.0
    - image: nginx:1.24.0
```

The update progress can be controlled using partition.

#### Partition
Similar to StatefulSet, `partition` is used to control the upgrade progress.

By default, if not indicated, all Pods will be updated when spec.template changes. The `partition` can be adjusted from 0 to `spec.replicas` to specify how many Pods CollaSet should update. **Unlike StatefulSet, the partition in CollaSet represents the number of Pods to update.**

Let's update the image back to nginx:1.25.2:

``` shell
$ kubectl -n default edit cls collaset-sample
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  template:
    ......
    spec:
      containers:
      - image: nginx:1.25.2  # changed from nginx:1.24.0 
  ...
  updateStrategy:
    rollingUpdate:
	  byPartition:
        partition: 1	# use partition to control upgrade progress
```

In this case, CollaSet only updates 1 Pod to the updated revision.

``` shell
$ kubectl -n default get pod -o yaml | grep "image: nginx"
    - image: nginx:1.24.0
    - image: nginx:1.25.2   # only 1 Pod updated
    - image: nginx:1.24.0
```

#### Update by Label
By configuring the `byLabel` rolling update policy, users can precisely specify which Pods they want to update by using labels.

If you go back to the sample in the [section Partition](#Partition) and change `byPartition` to `byLabel` like the following:

``` shell
$ kubectl -n default edit cls collaset-sample
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  ...
  updateStrategy:
    rollingUpdate:
-     byPartition:
-       partition: 1
+     byLabel: {}
```

Subsequently, each Pod will only be updated if it's marked with the label `collaset.kusionstack.io/update-included`.

## Advanced Features
### Pod Instance ID
Each Pod created by CollaSet has a unique ID held by the label `collaset.kusionstack.io/instance-id`, which can be used to identify each individual Pod.

``` yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    collaset.kusionstack.io/instance-id: "0"  # Pod instance ID
...
```

CollaSet provides a context to specify an ID pool, which defaults to the same name as the CollaSet and is immutable.

``` yaml
...
spec:
  scaleStrategy:
    context: <id-pool-name>
```

The same ID pool name can be indicated for multiple CollaSets, allowing them to share a single ID pool. Consequently, each Pod created by these CollaSets will be assigned a unique ID.

For example, these are two CollaSets with the same context:

``` shell
$ cat ~/sample.yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample-a
spec:
  replicas: 2
  scaleStrategy:
    context: foo    # with the same context foo
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
          name: nginx
---

apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample-b
spec:
  replicas: 2
  scaleStrategy:
    context: foo    # with the same context foo
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
          name: nginx
```

Then create these CollaSets with the sample file:

``` shell
$ kubectl -n default apply -f ~/sample.yaml
collaset.apps.kusionstack.io/collaset-sample-a created
collaset.apps.kusionstack.io/collaset-sample-b created

$ kubectl -n default get pod
NAME                      READY   STATUS    RESTARTS   AGE
collaset-sample-a-g4sjj   1/1     Running   0          42s
collaset-sample-a-ph9vc   1/1     Running   0          42s
collaset-sample-b-fqkq4   1/1     Running   0          42s
collaset-sample-b-lqg8f   1/1     Running   0          42s

$ kubectl -n default get pod -o yaml | grep collaset.kusionstack.io/instance-id
      collaset.kusionstack.io/instance-id: "0"
      collaset.kusionstack.io/instance-id: "1"
      collaset.kusionstack.io/instance-id: "3"
      collaset.kusionstack.io/instance-id: "2"
```

Now, the 4 Pods created by these 2 CollaSets will have a unique instance ID.

### Revision Consistency
Pods within a CollaSet can utilize more than two different Pod templates simultaneously, including both the current and updated revisions. This can result from partial updates. To ensure the stability of Pod revisions over time, CollaSet records this information. When a Pod is deleted, CollaSet recreates it using its previous revision.

It can be reproduced by following steps:

1. Provision a new CollaSet with replicas 3.

``` shell
$ kubectl -n default apply -f ./config/samples/apps_v1alpha1_collaset.yaml
collaset.apps.kusionstack.io/collaset-sample created

$ kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
collaset-sample-5tgcs    1/1     Running   0          4s
collaset-sample-glgnb    1/1     Running   0          4s
collaset-sample-qs46r    1/1     Running   0          4s

$ kubectl -n default get cls
NAME              DESIRED   CURRENT   UPDATED   UPDATED_READY   UPDATED_AVAILABLE   CURRENT_REVISION            UPDATED_REVISION            AGE
collaset-sample   3         3         3         3               3                   collaset-sample-6d7b7c58f   collaset-sample-6d7b7c58f   64s
```

2. Update the image of PodTemplate of the CollaSet to image nginx:1.24.0 and set the partition to 2. Then there will be 2 Pods with image nginx:1.24.0 and 1 Pod with image nginx:1.25.2.

``` shell
$ kubectl -n default edit cls collaset-sample
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  template:
    ......
    spec:
      containers:
      - image: nginx:1.24.0  # changed from nginx:1.25.2 
  ...
  updateStrategy:
    rollingUpdate:
	  byPartition:
        partition: 2	# update 2 Pods

# Wait until these 2 Pods are updated, and check the Pod's images.
$ kubectl get pod -o yaml | grep "image: nginx"
    - image: nginx:1.25.2
    - image: nginx:1.24.0
    - image: nginx:1.24.0
```

3. Update the image of PodTemplate of the CollaSet to image nginx:1.23.4 and set the partition to 1.

``` shell
$ kubectl -n default edit cls collaset-sample
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  template:
    ......
    spec:
      containers:
      - image: nginx:1.23.4  # changed from nginx:1.24.0
  ...
  updateStrategy:
    rollingUpdate:
	  byPartition:
        partition: 1	# update 1 Pod

# Wait until the Pod is updated, and check the Pod's images.
$ kubectl get pod -o yaml | grep "image: nginx"
    - image: nginx:1.25.2
    - image: nginx:1.24.0   # Pod collaset-sample-qs46r
    - image: nginx:1.23.4
```

Now, there are 3 Pods, each of which has an individual image. If we then delete the Pod with the image nginx:1.24.0, the new Pod replacing it will be created with the same image nginx:1.24.0 in order for the Pod to inherit the revision.

``` shell
$ kubectl delete -n default delete pod collaset-sample-qs46r
pod "collaset-sample-qs46r" deleted

$ kubectl get pod
NAME                     READY   STATUS    RESTARTS      AGE
collaset-sample-5tgcs    1/1     Running   0             3h
collaset-sample-ht9x6    1/1     Running   0             2m27s  # Pod recreated
collaset-sample-qs46r    1/1     Running   1 (3h ago)    3h

$ kubectl get pod -o yaml | grep "image: nginx"
    - image: nginx:1.25.2
    - image: nginx:1.24.0   # image has not been changed
    - image: nginx:1.23.4
```

### In-Place Update Pod
In addition to the `Recreate` update policy, which is identical to Deployment and StatefulSet, CollaSet offers the `InPlaceIfPossible` update policy.

``` yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  ...
  updateStrategy:
    podUpgradePolicy: InPlaceIfPossible  # Options: InPlaceIfPossible, Recreate, Replace
```

`InPlaceIfPossible` is the default value, which instructs CollaSets to try to update Pods in place when only container images, labels, and annotations have changed. If some other fields have changed too, the policy will back off to the `Recreate` policy.

`Recreate` indicates CollaSets always delete the old Pod and create a new one with an updated revision.

If update pod template with `InPlaceIfPossible` policy as following example, the Pod will not be recreated.

``` shell
$ kubectl -n default edit cls collaset-sample
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  template:
    ......
    spec:
      containers:
      - image: nginx:1.24.0  # changed from nginx:1.25.2
  ...
  updateStrategy:
    podUpgradePolicy: InPlaceIfPossible # use InPlaceIfPossible policy

$ kubectl -n default get pod -o yaml | grep "image: nginx"
    - image: nginx:1.24.0
    - image: nginx:1.24.0
    - image: nginx:1.24.0

$ kubectl -n default get pod
NAME                     READY   STATUS    RESTARTS     AGE
collaset-sample-5wvlh    1/1     Running   1 (6s ago)   2m10s
collaset-sample-ldvrg    1/1     Running   1 (6s ago)   2m10s
collaset-sample-pbz75    1/1     Running   1 (6s ago)   2m10s
```

### Replace Update Pod

CollaSet provides the `Replace` policy for certain applications that are sensitive to the available number of Pods.

``` yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  ...
  updateStrategy:
    podUpgradePolicy: Replace  # Options: InPlaceIfPossible, Recreate, Replace
```

The `Replace` policy indicates that CollaSet should update a Pod by creating a new one to replace it. 
Unlike the `Recreate` policy, which deletes the old Pod before creating a new updated one, or the `InPlaceIfPossible` policy, which updates the current Pod in place, 
the `Replace` policy first creates a new Pod with the updated revision. It then deletes the old Pod once the new one becomes available for service.

```shell
# Before updating CollaSet
$ kubectl -n default get pod
NAME                    READY   STATUS        RESTARTS   AGE
collaset-sample-dwkls   1/1     Running       0          6m55s

# After updating CollaSet, the updated Pod is created first
$ kubectl -n default get pod
NAME                    READY   STATUS              RESTARTS   AGE
collaset-sample-dwkls   1/1     Running             0          6m55s
collaset-sample-rcmbv   0/1     ContainerCreating   0          0s

# Once the created Pod is available for service, the old Pod will be deleted
$ kubectl -n default get pod
NAME                    READY   STATUS              RESTARTS   AGE
collaset-sample-rcmbv   1/1     Running             0          1s
collaset-sample-dwkls   1/1     Terminating         0          7m12s
```

The two Pods will have a pair of labels to identify their relationship. The new Pod will have the label `collaset.kusionstack.io/replace-pair-origin-name` to indicate the name of the old Pod, and the old Pod will have the label `collaset.kusionstack.io/replace-pair-new-id` to indicate the instance ID of the new Pod.

Additionally, the new Pod and old Pod will each begin their own PodOpsLifecycles, which are independent of each other.

### Recreate And Replace Specified Pod

In practice, users often need to recreate or replace specified Pods under a CollaSet.

To delete a Pod, users can simply call the Kubernetes API, like executing `kubectl delete pod <pod-name>`. 
However, this will bypass the [PodOpsLifecycle](https://www.kusionstack.io/docs/operating/concepts/podopslifecycle) Mechanism. 
We provide following two options:

1. Enable the feature `GraceDeleteWebhook` so that it is possible to delete Pods through `PodOpsLifecycle`.
```shell
# Enable the GraceDeleteWebhook feature when starting the controller with this argument
$ /manager --feature-gates=GraceDeleteWebhook=true
```
```shell
$ kubectl -n default get pod
NAME                    READY   STATUS        RESTARTS   AGE
collaset-sample-vqccr   1/1     Running       0          21s

# Delete the pod directly. A message will respond indicating that the Pod deletion is handled by PodOpsLifecycle
kubectl -n default delete pod collaset-sample-vqccr
Error from server (failed to validate GraceDeleteWebhook, pod deletion process is underway and being managed by PodOpsLifecycle): admission webhook "validating-pod.apps.kusionstack.io" denied the request: failed to validate GraceDeleteWebhook, pod deletion process is underway and being managed by PodOpsLifecycle

# The old Pod is deleted, and a new Pod will be created 
$ kubectl -n default get pod -w
collaset-sample-vqccr   1/1     Running       0          71s
collaset-sample-vqccr   1/1     Terminating   0          71s
......
collaset-sample-nbl6t   0/1     Pending       0          0s
collaset-sample-nbl6t   0/1     ContainerCreating   0          0s
......
collaset-sample-nbl6t   1/1     Running             0          0s
```
2. Label the Pod with `podopslifecycle.kusionstack.io/to-delete`, so that CollaSet will delete the Pod through PodOpsLifecycle.

```shell
# Label Pod
$ kubectl -n default label pod collaset-sample-nbl6t podopslifecycle.kusionstack.io/to-delete=true

# The old Pod is deleted, and a new Pod will be recreated 
$ kubectl -n default get pod -w
collaset-sample-nbl6t   1/1     Running       0          5m28s
collaset-sample-nbl6t   1/1     Terminating   0          5m28s
......
collaset-sample-w6x69   0/1     Pending       0          0s
......
collaset-sample-w6x69   0/1     ContainerCreating   0          0s
......
collaset-sample-w6x69   1/1     Running             0          2s
```

Recreating a Pod will delete the old Pod first and then create a new one. This will affect the available Pod count. 
To avoid this, CollaSet provides a feature to replace Pods by labeling them with `podopslifecycle.kusionstack.io/to-replace`.

```shell
# Replace Pod by label
$ kubectl -n echo label pod collaset-sample-w6x69 podopslifecycle.kusionstack.io/to-replace=true

# The old Pod is deleted, and a new Pod will be created 
$ kubectl -n default get pod -w
collaset-sample-w6x69   1/1     Running       0          5m29s
collaset-sample-74fsv   0/1     Pending       0          0s
collaset-sample-74fsv   0/1     ContainerCreating   0          0s
......
collaset-sample-74fsv   1/1     Running             0          2s
......
collaset-sample-w6x69   0/1     Terminating         0          5m33s
```
