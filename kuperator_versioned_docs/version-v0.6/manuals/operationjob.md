---
sidebar_position: 3
---

# OperationJob
The OperationJob Workload is responsible for performing one-shot operational tasks on a batch of Pods, providing scaffolding for Pod operation scenarios to reduce user development costs. 

OperationJob offers an abstract interface layer for Pod operational capabilities, supporting developers to implement operational functions as plugins.
Each operational plugin will be presented as a type of `Action` API in OperationJob, such as `Replace`.
Additionally, it optionally facilitates seamless integration with the `PodOpsLifecycle` to ensure lossless traffic changes during operations.

# Example
Following docs will guide you to play with OperationJob, and to implement OperationJob action plugin.

## Replace
### Prepare Pods
Given that a [CollaSet](collaset.md) with more than 2 replicas is presented in your kubernetes cluster.
```shell
$ kubectl get cls
NAME     DESIRED   CURRENT   AVAILABLE   UPDATED   UPDATED_READY   UPDATED_AVAILABLE   CURRENT_REVISION   UPDATED_REVISION   AGE
foo      2         2         2           2         2               2                   foo-7bdb974bc7     foo-7bdb974bc7     7s

$ kubectl get pod
NAME           READY   STATUS    RESTARTS      AGE
foo-752sz      1/1     Running   0             41s
foo-jttd5      1/1     Running   0             41s
```

### Create OperationJob
The following `operationjob.yaml` file describes a `Replace` OperationJob, which will replace pods in `targets`.
For each replace operation, a new pod will be created to replace the target pod, which will not be deleted until new pod is **[ServiceAvailable](../concepts/podopslifecycle.md#introduction)**.  

```yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: OperationJob
metadata:
  name: opj-replace
  namespace: default
spec:
  action: Replace # Operation type is replace
  activeDeadlineSeconds: 3600 # job will be forced failed after 3600s since startTime
  TTLSecondsAfterFinished: 18000 # job will be deleted after 18000s since job failed or succeeded
  partition: 1 # replace 1 pod at this time
  targets:
  - name: foo-jttd5
  - name: foo-752sz
```

Create OperationJob `opj-replace` to replace target pods.
```shell
$ kubectl apply -f operationjob.yaml
operationjobs.apps.kusionstack.io/opj-replace created
```

### Replace Pods
The status of OperationJob is updated, and target pod `foo-jttd5` is replaced by `foo-mpl7n`.
```shell
$ kubectl get opj
NAME          PROGRESS     AGE
opj-replace   Processing   11s

$ kubectl get pod
NAME        READY   STATUS              RESTARTS   AGE
foo-752sz   1/1     Running             0          92s
foo-jttd5   1/1     Running             0          92s
foo-mpl7n   0/1     ContainerCreating   0          4s

$ kubectl get opj opj-replace -o yaml | grep -A20 status
status:
  observedGeneration: 1
  progress: Processing # job is processing
  succeededPodCount: 1
  targetDetails:
  - extraInfo:
      NewPod: foo-mpl7n 
    name: foo-jttd5
    progress: Succeeded # foo-jttd5 is replaced by foo-mpl7n suceeded
  - name: foo-752sz
    progress: Pending # replace is pending
  totalPodCount: 2
```

The ```status.progress``` can be:
- ```Pending```: operationJob is waiting to be processed
- ```Processing```: operationJob is being processed
- ```Failed```: some target pods have failed to operate
- ```Succeeded```: all target pods have succeeded to operate

Note that if a target pod has failed to operate, `status.targetDetails[x].error` will show the `reason` and `message` for failure.
And if it has succeeded to operate, the error status will be cleared.

The ```status.targetDetails[x].progress``` can be:
- ```Pending```: target pod is waiting to be operated
- ```Processing```: target pod  is being operated
- ```Failed```: target pod has failed to operate
- ```Succeeded```: target pod has succeeded to operate

Edit `opj-replace` to replace the other target pod.
```shell
$ kubectl edit opj opj-replace
```

```yaml
# operationjob.yaml
# Edit partition to 2 to replace all pods
...
spec:
  ...
  partition: 2
```

All pods replaced.
```shell
$ kubectl get pod
NAME        READY   STATUS              RESTARTS   AGE
foo-752sz   1/1     Running             0          8m5s
foo-mpl7n   1/1     Running             0          6m37s
foo-rgxbl   0/1     ContainerCreating   0          5s

$ kubectl get opj opj-replace -o yaml | grep -A20 status
status:
  endTimestamp: "2024-09-13T08:47:43Z"
  observedGeneration: 2
  progress: Succeeded # all pods are replaced, job is suceeded
  succeededPodCount: 2
  targetDetails:
  - extraInfo:
      NewPod: foo-mpl7n
    name: foo-jttd5
    progress: Succeeded
  - extraInfo:
      NewPod: foo-rgxbl
    name: foo-752sz
    progress: Succeeded # foo-752sz is replaced by foo-rgxbl suceeded
  totalPodCount: 2

$ kubectl get opj
NAME          PROGRESS    AGE
opj-replace   Succeeded   6m42s
```

The ```status.targetDetails[x].extraInfo``` is a key-value string map, which is used to store operate information for target. 
Developers can define and utilize specified extraInfos for their action plugins.

## Tutorial
### Action Plugin
Developers implement and register action plugin, then OperationJob controller is responsible for running it:

![operationjob-framework](/img/kuperator/manuals/operationjob/operationjob-frame.png)

Action plugin is formulated as golang adapter `ActionHandler`, which consists 4 idempotent functions:
- `Setup` sets up action in `AddToMgr`, i.e., watch resources for action, register cache index
- `OperateTarget` operates what you want to the target pod
- `GetOpsProgress` gets current operation status of target pod, i.e., "Processing", "Failed" and "Succeeded"
- `ReleaseTarget` cleans up target pod and operating environment when operation finished or job deleted

```shell
cat ~/kuperator/pkg/controllers/operationjob/opscore/handler.go
```

```go
...
type ActionHandler interface {
	// Setup sets up action with manager in AddToMgr, i.e., watch, cache...
	Setup(controller.Controller, *mixin.ReconcilerMixin) error

	// OperateTarget do real operation to target
	OperateTarget(context.Context, *OpsCandidate, *appsv1alpha1.OperationJob) error

	// GetOpsProgress returns target's current opsStatus, e.g., progress, reason, message
	GetOpsProgress(context.Context, *OpsCandidate, *appsv1alpha1.OperationJob) (progress ActionProgress, err error)

	// ReleaseTarget releases the target from operation when the operationJob is deleted
	ReleaseTarget(context.Context, *OpsCandidate, *appsv1alpha1.OperationJob) error
}
```

### Register Action
Developers can register implemented action plugins by calling `RegisterAction` before OperationJob controller `AddToMgr` is called. 
The register function consists 3 parameters: 
- `action`: string, name of action plugin, showed in `spec.action`
- `hander`: ActionHandler, the implemented adapter
- `enablePodOpsLifecycle`: bool, if true, target pods will be operated in the manner of **[PodOpsLifecycle](../concepts/podopslifecycle.md)**

```shell
cat ~/kuperator/pkg/controllers/operationjob/opscore/register.go
```

```go
...
// RegisterAction will register an operationJob action with handler and lifecycleAdapter
// Note: if enablePodOpsLifecycle=false, this operation will be done directly, ignoring podOpsLifecycle
func RegisterAction(action string, handler ActionHandler, enablePodOpsLifecycle bool) {...}
```

### Example
OperationJob natively supports Replace action. And Replace ActionHandler is implemented in this folder:
```shell
cd ~/kuperator/pkg/controllers/operationjob/replace
```