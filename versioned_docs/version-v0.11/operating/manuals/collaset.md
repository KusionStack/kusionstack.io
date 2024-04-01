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


### Supprting PVCs
CollaSet introduces support for PVCs, allowing user to declare `VolumeClaimTemplates` to create PVCs for each Pod.
Furthermore, in response to common issues with PVCs management, such as high modification costs and difficult control, CollaSet extends its functionality with the following advantages vs. StatefulSet:

1. Support update, add and delete on `volumeClaimTemplates`.
2. Provide control over PVC lifecycle.

#### Provision PVCs
The `collaset-pvc.yaml` file declares a CollaSet with `VolumeClaimTemplates` to provision a PVC with `1Gi` storage for each Pod.
These PVCs are then mounted on the container at the path `/path/mount/www`.

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
        - mountPath: /path/mount/www # path to mount PVC 
          name: www
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      storageClassName: standard
      volumeMode: Filesystem
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

Pods and PVCs can be provisioned by CollaSet.

``` shell
$ kubectl -n default apply -f collaset-pvc.yaml
collaset.apps.kusionstack.io/foo created

$ kubectl -n default get pod
NAME        READY   STATUS    RESTARTS   AGE
foo-pw5lg   1/1     Running   0          4s
foo-5n6ts   1/1     Running   0          4s

$ kubectl -n default get pvc
NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-h5zv7   Bound    pvc-8a7d8ea0-ced0-423a-9255-bedfad0f2db6   1Gi        RWO            standard       7s
foo-www-lswp2   Bound    pvc-9564b44b-9c99-467b-abee-4285183ff9c3   1Gi        RWO            standard       7s
```

Each Pod and its related PVC have the same value of label `collaset.kusionstack.io/instance-id`.

``` shell
$ kubectl -n default get pod -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "1"
      collaset.kusionstack.io/instance-id: "0"

$ kubectl -n default get pvc -o yaml | grep instance-id
      collaset.kusionstack.io/instance-id: "1"
      collaset.kusionstack.io/instance-id: "0"
```

#### Update PVCs
To save the operating costs of PVCs, i.e. expand storage capacity, CollaSet supports update, add and delete on `volumeClaimTemplates`.

To achieve this, for each PVC, CollaSet calculates a hash value based on its template, and attatch it to label `collaset.kusionstack.io/pvc-template-hash`.
Once users modify the templates, CollaSet recognizes, caculates a new hash value and attach it on new PVCs to replace old ones.

Let's give it a try, update the storage of PVC template from `1Gi` to `2Gi`.
``` shell
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
+        storage: 2Gi # update pvc template to expand storage
......
```

There are 2 new PVCs with `2Gi` storage created with different hash values.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS        RESTARTS   AGE
foo-pw5lg   1/1     Terminating   0          7s
foo-5n6ts   1/1     Terminating   0          7s
foo-9nhz4   0/1     Pending       0          1s
foo-xb2gd   0/1     Pending       0          1s

$ kubectl -n default get pvc
NAME            STATUS        VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-h5zv7   Terminating   pvc-8a7d8ea0-ced0-423a-9255-bedfad0f2db6   1Gi        RWO            standard       11s
foo-www-lswp2   Terminating   pvc-9564b44b-9c99-467b-abee-4285183ff9c3   1Gi        RWO            standard       11s
foo-www-cj2s9   Bound         pvc-647e2a81-7fc6-4f37-a835-e63da9172de3   2Gi        RWO            standard       5s
foo-www-hp2t6   Bound         pvc-03d7536e-cd3f-465f-bd30-362a9510f0c9   2Gi        RWO            standard       5s

$ kubectl -n default get pvc -o yaml | grep pvc-template-hash
      collaset.kusionstack.io/pvc-template-hash: 594d8857f9 # hash value of old pvc 
      collaset.kusionstack.io/pvc-template-hash: 594d8857f9
      collaset.kusionstack.io/pvc-template-hash: d78c5ff6b # hash value of new pvc 
      collaset.kusionstack.io/pvc-template-hash: d78c5ff6b
```

For old Pvcs, users can retain them by configuring `whenScaled` policy to `Retain` .
Then old PVCs can be re-mount on its related Pod after rolling back.
Otherwise, old PVCs can be deleted by default policy `Delete`.


#### Add PVCs
Add a PVC template `yyy`, which is mounted on the container at the path `/path/mount/yyy`.

``` shell
$ kubectl -n default edit cls foo
......
    spec:
      containers:
      - image: nginx:1.25
        name: nginx
        volumeMounts: 
        - mountPath: /path/mount/www # path to mount PVC 
          name: www
+       - mountPath: /path/mount/yyy # path to mount PVC 
+         name: yyy
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      storageClassName: standard
      volumeMode: Filesystem
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 2Gi
+ - metadata: # added pvc template
+     name: yyy 
+   spec:
+     storageClassName: standard
+     volumeMode: Filesystem
+     accessModes: [ "ReadWriteOnce" ]
+     resources:
+       requests:
+         storage: 2Gi
```

Now, each pod has two PVCs, which include a new PVCs claimed by template `yyy` and one old PVC claimed by template `www`.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS        RESTARTS   AGE
foo-8wwsz   0/1     Pending       0          1s
foo-9nhz4   1/1     Terminating   0          23s
foo-hd2cv   0/1     Pending       0          1s
foo-xb2gd   1/1     Terminating   0          23s

$ kubectl -n default get pvc
NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-cj2s9   Bound    pvc-647e2a81-7fc6-4f37-a835-e63da9172de3   2Gi        RWO            standard       25s
foo-www-hp2t6   Bound    pvc-03d7536e-cd3f-465f-bd30-362a9510f0c9   2Gi        RWO            standard       25s
foo-yyy-c68nh   Bound    pvc-94ee5eff-2350-4cb7-8411-85f0928d25fc   2Gi        RWO            standard       3s # new pvc
foo-yyy-vpwss   Bound    pvc-8363dc78-3340-47d0-aa11-0adac36308d5   2Gi        RWO            standard       3s # new pvc
```

#### Delete PVCs
Delete the PVC template `yyy` on CollaSet.

``` shell
$ kubectl -n default edit cls foo
......
    spec:
      containers:
      - image: nginx:1.25
        name: nginx
        volumeMounts: 
        - mountPath: /path/mount/www # path to mount PVC 
          name: www
-       - mountPath: /path/mount/yyy # path to mount PVC 
-         name: yyy
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      storageClassName: standard
      volumeMode: Filesystem
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 2Gi
- - metadata: # delete pvc template
-     name: yyy 
-   spec:
-     storageClassName: standard
-     volumeMode: Filesystem
-     accessModes: [ "ReadWriteOnce" ]
-     resources:
-       requests:
-         storage: 2Gi
```

Now, PVCs claimed by template `yyy` are deleted and the origin PVCs claimed by template `www` are retained.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS        RESTARTS   AGE
foo-6qcpc   1/1     Running       0          2s
foo-z2jqv   1/1     Running       0          2s
foo-8wwsz   1/1     Terminating   0          38s
foo-hd2cv   1/1     Terminating   0          38s

$ kubectl -n default get pvc
NAME            STATUS        VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-cj2s9   Bound         pvc-647e2a81-7fc6-4f37-a835-e63da9172de3   2Gi        RWO            standard       61s
foo-www-hp2t6   Bound         pvc-03d7536e-cd3f-465f-bd30-362a9510f0c9   2Gi        RWO            standard       61s
foo-yyy-c68nh   Terminating   pvc-94ee5eff-2350-4cb7-8411-85f0928d25fc   2Gi        RWO            standard       39s
foo-yyy-vpwss   Terminating   pvc-8363dc78-3340-47d0-aa11-0adac36308d5   2Gi        RWO            standard       39s
```

#### PVC Retention Policy
CollaSet provides control over PVC lifecycle by configuring `spec.persistentVolumeClaimRetentionPolicy`.
Users can retain or delete PVCs after its related Pod is scaled down or CollaSet is deleted, respectively.
This feature is also supported by [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#persistentvolumeclaim-retention) since v1.27.
Basic rule is detailed as follows:
- `whenScale` : decides to delete or retain PVCs after Pod is scaled down.
- `whenDeleted`: decides to delete or retain PVCs after CollaSet is deleted.

For each policy users can set the value to either Delete (by default) or Retain.
Note that for StatefulSet, the default policy is Retain.

#### whenScaled
Apply `collaset-pvc.yaml` and edit foo to scale replicas to 1.
``` shell
$ kubectl apply -f collaset-pvc.yaml
collaset.apps.kusionstack.io/foo created

$ kubectl edit cls foo
 ......
 spec:
-  replicas: 2
+  replicas: 1 # scale in 1 pod
   selector:
     matchLabels:
       app: foo
 ......
```
As the `whenScaled` is not configured, thus its value is `Delete` by default.
Consequently, PVC `foo-www-wzwbq` is deleted as its related Pod `foo-tkc5m`  is scaling down.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS    RESTARTS   AGE
foo-tkc5m   0/1     Terminating   0          27s # related pvc is terminating
foo-vwtcm   1/1     Running       0          27s

$ kubectl -n default get pvc
NAME            STATUS        VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-wzwbq   Terminating   pvc-b92c28c6-59ad-4976-810c-8d538c4a22c6   1Gi        RWO            standard       29s
foo-www-r4vlh   Bound         pvc-dd7f7cce-a3cb-4bba-a106-e5ad264959a2   1Gi        RWO            standard       29s
```

Set `Retain` to `whenScaled`, and scale replicas to 0.

``` shell
$ kubectl -n default edit cls foo
 ......
 spec:
-  replicas: 1
+  replicas: 0 # scale in 1 pod
   selector:
     matchLabels:
       app: foo
+  scaleStrategy:
+    persistentVolumeClaimRetentionPolicy:
+      whenScaled: Retain # retain the pvc after pod is scaled down
 ......
```

Pod `foo-vwtcm` is terminating, while its related PVC `foo-www-r4vlh` is retained.

``` shell
$ kubectl -n default edit cls foo
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default get pod
NAME        READY   STATUS        RESTARTS   AGE
foo-vwtcm -n default   1/1     Terminating   0          62s # related pvc is retained

$ kubectl -n default get pvc
NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
foo-www-r4vlh   Bound    pvc-dd7f7cce-a3cb-4bba-a106-e5ad264959a2   1Gi        RWO            standard       63s
```

To validate the retention policy, try ro scale replicas to 2, and the remaining PVC should be mounted again.

``` shell
$ kubectl -n default edit cls foo
 ......
 spec:
-  replicas: 0
+  replicas: 2 # scale out 2 pods
   ......
```

We can see that PVC `foo-www-r4vlh` is retained by Pod `foo-px487` as they have the same `instance-id`.

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
      collaset.kusionstack.io/instance-id: "1" # pvc foo-www-r4vlh is retained
```

#### whenDelete
Edit `foo` to configure `Retain` policy for `whenDelete`, and then delete this CollaSet.
``` shell
$ kubectl -n default edit cls foo
   ......
   scaleStrategy:
     persistentVolumeClaimRetentionPolicy:
       whenScaled: Retain
+      whenDelete: Retain # retain the pvc after collaset is deleted
   ......
collaset.apps.kusionstack.io/foo edited

$ kubectl -n default delete cls foo
collaset.apps.kusionstack.io "foo" deleted
```

Now, try to recreate `foo` with 2 replicas, and the result shows both PVCs are retained.
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
      collaset.kusionstack.io/instance-id: "0" # pvc foo-www-d48gx is retained
      collaset.kusionstack.io/instance-id: "1" # pvc foo-www-r4vlh is retained
```
