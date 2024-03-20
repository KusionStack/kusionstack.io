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
### Scaling Pods
#### Pod Instance ID
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

#### Revision Consistency
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

### Updating Pods
#### Update Policy
In addition to the `ReCreate` update policy, which is identical to Deployment and StatefulSet, CollaSet offers the `InPlaceIfPossible` update policy.

``` yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: collaset-sample
spec:
  ...
  updateStrategy:
    podUpgradePolicy: InPlaceIfPossible  # Options: InPlaceIfPossible, ReCreate
```

`InPlaceIfPossible` is the default value, which instructs CollaSets to try to update Pods in place when only container images, labels, and annotations have changed. If some other fields have changed too, the policy will back off to the `ReCreate` policy.

`ReCreate` indicates CollaSets always delete the old Pod and create a new one with an updated revision.

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

### Supprting PVCs
CollaSet introduces support for PVCs, allowing user to declare `VolumeClaimTemplates` to create PVCs for Pods. Furthermore, in response to common issues with PVCs management, such as high modification costs and difficult control, CollaSet extendeds its functionality with the following advantages vs. StatefulSet:
1. It provides control over the lifecycle of PVCs.
2. Users can flexibly update, add, or remove persistent volumeClaimTemplates based requirements.

#### Provision PVCs
This `collaset-pvc.yaml` declares a CollaSet with VolumeClaimTemplates to provision PVCs with `1Gi` storage for each Pod, and they are mounted on the container's path at `/path/mount/www`.

``` yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: foo
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
      - image: nginx:1.25
        name: nginx
        volumeMounts: 
        - mountPath: /path/mount/www
        name: www
 volumeClaimTemplates:
 - metadata:
    name: www
  spec:
    storageClassName: standard
    volumeModes: Filesystem
    accessModes: [ "ReadWriteOnce" ]
    resources:
      requests:
        storage: 1Gi
```

Then create CollaSet and PVCs with the sample file:

``` shell
$ kubectl -n default apply -f collaset-pvc.yaml
collaset.apps.kusionstack.io/foo created

$ kubectl -n default get pod
NAME        READY   STATUS    RESTARTS   AGE
foo-tkc5m   1/1     Running   0          10s
foo-vwtcm   1/1     Running   0          10s

$ kubectl -n default get pvc
NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-r4vlh   Bound    pvc-dd7f7cce-a3cb-4bba-a106-e5ad264959a2   1Gi        RWO            standard       12s
foo-www-wzwbq   Bound    pvc-b92c28c6-59ad-4976-810c-8d538c4a22c6   1Gi        RWO            standard       12s
```

Each Pod and PVC created by CollaSet has a `collaset.kusionstack.io/instance-id` label key. 
The Pod and its associated PVCs will have the same `instance-id`. They use the same string as label value which is composed of a unique instance-id.

``` shell
$ kubectl -n default get pod -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "1"
      collaset.kusionstack.io/instance-id: "0"

$ kubectl -n default get pvc -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "1"
      collaset.kusionstack.io/instance-id: "0"
```


#### PVC Retention Policy
By configuring `persistentVolumeClaimRetentionPolicy` filed, CollaSet supports lifecycle management for PVCs. Users can retention or delete PVCs after the related Pod is scaled down and CollaSet is deleted. The rule is detailed as follows:
- `WhenScale` : decides to delete or retention PVCs after Pod is scaled down.
- `WhenDeleted`: decides to delete or retention PVCs after CollaSet is deleted.
- Value of above options are `Delete` (by default) or `Retain`.

#### whenScaled
Edit `foo` to scale in 1 Pod.

``` shell
$ kubectl edit cls foo
 ......
 spec:
-  replicas: 2
+  replicas: 1
   selector:
     matchLabels:
       app: foo
 ......
```

The value of `whenScaled` is `Delete` by default as the option is not configured, thus the PVC `foo-www-wzwbq` is being deleted as its related Pod `foo-tkc5m`  is scaling down.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS    RESTARTS   AGE
foo-tkc5m   0/1     Terminating   0          27s
foo-vwtcm   1/1     Running       0          27s

$ kubectl -n default get pvc
NAME            STATUS        VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-wzwbq   Terminating   pvc-b92c28c6-59ad-4976-810c-8d538c4a22c6   1Gi        RWO            standard       29s
foo-www-r4vlh   Bound         pvc-dd7f7cce-a3cb-4bba-a106-e5ad264959a2   1Gi        RWO            standard       29s
```

Set `Retain` to `whenScaled`, and scale the replicas to 0.

``` shell
$ kubectl -n default edit cls foo
 ......
 spec:
-  replicas: 1
+  replicas: 0
   selector:
     matchLabels:
       app: foo
+  scaleStrategy:
+    persistentVolumeClaimRetentionPolicy:
+      whenScaled: Retain # retention the pvc after pod is scaled down
 ......
```

Pod `foo-vwtcm` is terminating, while its related PVC `foo-www-r4vlh` is retentioned.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS        RESTARTS   AGE
foo-vwtcm -n default   1/1     Terminating   0          62s

$ kubectl -n default get pvc
NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-r4vlh   Bound    pvc-dd7f7cce-a3cb-4bba-a106-e5ad264959a2   1Gi        RWO            standard       63s
```

To validate the retention policy, scale replicas to 2, and the remaining PVC should be mounted again.

``` shell
$ kubectl -n default edit cls foo
 ......
 spec:
-  replicas: 0
+  replicas: 2
   ......
   scaleStrategy:
     persistentVolumeClaimRetentionPolicy:
       whenScaled: Retain
 ......
```

PVC `foo-www-r4vlh` is retained by Pod `foo-px487` as they have the same `instance-id`. 
When Pod is created, it searchs PVC with the same instance-id which is owned by CollaSet `foo` and claimed by `volumeClaimTemplates`. 
The Pod will retain this PVC if the target PVC exists, otherwise create a new one.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS    RESTARTS   AGE
foo-ld5xc   1/1     Running   0          27s
foo-px487   1/1     Running   0          27s

$ kubectl -n default get pvc
NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-d48gx   Bound    pvc-1884ee45-5cc9-48ee-b01a-20f5ad63d6d4   1Gi        RWO            standard       29s
foo-www-r4vlh   Bound    pvc-dd7f7cce-a3cb-4bba-a106-e5ad264959a2   1Gi        RWO            standard       2m47s

$ kubectl -n default get pod foo-px487 -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "1"

$ kubectl -n default get pvc foo-www-r4vlh -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "1"
```

#### whenDelete
Edit foo to configure `Retain` policy fot `whenDelete`, and then delete it.
``` shell
$ kubectl -n default edit cls foo
   ......
   scaleStrategy:
     persistentVolumeClaimRetentionPolicy:
       whenScaled: Retain
+      whenDelete: Retain
   ......
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default delete cls foo
collaset.apps.kusionstack.io "foo" deleted
```

Recreate `foo` with 2 replicas, and both PVCs are retained.
``` shell
$ kubectl -n default apply -f collaset-pvc.yaml
collaset.apps.kusionstack.io/foo created

$ kubectl -n default get pod
NAME        READY   STATUS    RESTARTS   AGE
foo-qhh8t   1/1     Running   0          2s
foo-ss255   1/1     Running   0          2s

$ kubectl -n default get pvc
NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-d48gx   Bound    pvc-1884ee45-5cc9-48ee-b01a-20f5ad63d6d4   1Gi        RWO            standard       4m29s
foo-www-r4vlh   Bound    pvc-dd7f7cce-a3cb-4bba-a106-e5ad264959a2   1Gi        RWO            standard       6m47s

$ kubectl -n default get pod foo-px487 -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "0"
      collaset.kusionstack.io/instance-id: "1"

$ kubectl -n default get pvc foo-www-r4vlh -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "0"
      collaset.kusionstack.io/instance-id: "1"
```

#### Update VolumeClaimTemplates
If users want to expand the capacity of PVs, they just need to update the template. 
Then CollaSet takes over the expansion and replacement of the PVCs, reducing manual operating costs for users.

To achieve this, CollaSet calculates a hash code for each template and attatch the value to the responding PVCs by label `collaset.kusionstack.io/pvc-template-hash`. 
When users update the template, CollaSet recognizes, caculate a new hash code and replaces old ones with new PVCs.

Create CollaSet `foo` with 2 PVCs and 2 Pods, and edit `volumeClaimTemplates` to expand the storage of PVC from `1Gi` to `2Gi`.
``` shell
$ kubectl -n default apply -f collaset-pvc.yaml
collaset.apps.kusionstack.io/foo created

$ kubectl -n default edit cls foo
 ......
 volumeClaimTemplates:
 - metadata:
     name: www
   spec:
     storageClassName: standard
     volumeModes: Filesystem
     accessModes: [ "ReadWriteOnce" ]
     resources:
       requests:
-        storage: 1Gi
+        storage: 2Gi
......
```

2 new PVCs with `2Gi` storage are created, and the old PVCs are terminating. Notice that hash labels on PVCs are chaned.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS        RESTARTS   AGE
foo-8rx6d   0/1     Terminating   0          53s
foo-lxmbx   0/1     Terminating   0          53s
foo-2sxxm   1/1     Running       0          10s
foo-hnbjr   1/1     Running       0          10s

$ kubectl -n default get pvc
NAME            STATUS        VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-72h8k   Terminating   pvc-2ad0b527-9ba2-4436-83e4-b6d57c68267f   1Gi        RWO            standard       51s
foo-www-x49nh   Terminating   pvc-670d7fd6-c479-4aa5-932b-9e9f080da8c2   1Gi        RWO            standard       51s
foo-www-dswt6   Bound         pvc-640463d0-22fd-46ea-a34c-2d107b949e4c   2Gi        RWO            standard       8s
foo-www-mbzhc   Bound         pvc-047c755a-3bd1-4840-9dbf-4b7dbc0bfd4f   2Gi        RWO            standard       8s
      
$ kubectl -n default get pvc -o yaml | grep pvc-template-hash
      collaset.kusionstack.io/pvc-template-hash: 594d8857f9
      collaset.kusionstack.io/pvc-template-hash: 594d8857f9
      collaset.kusionstack.io/pvc-template-hash: d78c5ff6b
      collaset.kusionstack.io/pvc-template-hash: d78c5ff6b
```

It can be observed that the original PVC and Pod are both rebuilt, which poses certain risks as data might be lost. 
If users expect to retain the PVC, similar to `whenScaled`, this can be achieved by configuring `.spec.persistentVolumeClaimRetentionPolicy` to preserve it.