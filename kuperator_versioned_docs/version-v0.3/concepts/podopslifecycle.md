---
sidebar_position: 2
---

# PodOpsLifecycle

## Background

Kubernetes provides a set of default controllers for workload management, such as StatefulSet, Deployment, and DaemonSet, which are responsible for Pod operations. 
Meanwhile, application users may also have some services outside the Kubernetes cluster that are closely related to the Pod Lifecycle, including traffic routing, service discovery, or alert monitoring. 
However, they face challenges in participating in the operational lifecycle of a Pod, even if they are connected to Kubernetes by developing a controller that watches the Pods.

PodOpsLifecycle aims to offer Kubernetes administrators and developers finer-grained control over the entire lifecycle of a Pod. 
It enables developers to execute necessary actions before, during, and after specific phases of a Pod operation. 
For instance, removing the Pod's IP from the traffic route before initiating the Pod operation, performing the actual Pod operations, and adding it back after the Pod operation is completed to achieve a smooth and graceful Pod operation, and prevent any traffic loss.

## Introduction

In PodOpsLifecycle, participants are classified into two roles: `operation controllers` and `cooperation controllers`.
- **Operation controllers** are responsible for operating Pods, such as Deployments and StatefulSets from Kubernetes, and CollaSets from Operating which intend to scale, update, or recreate Pods.
- **Cooperation controllers** are sensitive with Pod status. They handle resources or configurations around Pods, which may include traffic controller, alert monitoring controller, etc. These controllers typically reconcile Kubernetes resources around Pods with external services, such as sync Pod IPs with the LB provider, or maintaining Pods' metadata with application monitoring system.

The two types of controllers do not need to be aware of each other. All controllers are organized by PodOpsLifecycle. Additionally, KusionStack Operating introduces extra phases around the native Kubernetes Pod Lifecycle: ServiceAvailable, Preparing, and Completing.

![pod-ops-lifecycle](/img/operating/concepts/podopslifecycle/pod-ops-lifecycle.png)

- **Completing**: After a Pod is created or updated and becomes ready, Operating marks its PodOpsLifecycle as the `Completing` phase. During this phase, the Pod is in a ready condition, prompting cooperation controllers to perform actions such as registering the Pod IP in the traffic route. Once all cooperation controllers complete their tasks, Operating sets the PodOpsLifecycle to the `ServiceAvailable` phase.
- **ServiceAvailable**: This phase indicates that the Pod is in a normal state and ready to serve. If everything goes smoothly, the Pod remains in the `ServiceAvailable` phase until the next operation.
- **Preparing**: When an operation controller needs to operate the Pod, it triggers a new PodOpsLifecycle. The Pod then transitions from the `ServiceAvailable` phase to the `Preparing` phase. During this phase, the Pod is initially marked as Unready by setting ReadinessGate to false. All cooperation controllers then begin preparing tasks, such as removing the Pod's IP from the traffic route. After completing these tasks, the Pod enters the `Operating` phase.
- **Operating**: If a Pod enters the `Operating` phase, it is expected to accept any kind of operation without any damage, including recreation, scaling-in, upgrading, etc. Operation controllers are permitted to apply any changes to this Pod. Once all these operations are completed, the Pod advances to the next phase — `Completing`, and the PodOpsLifecycle continues.

The PodOpsLifecycle detail and the relationship with Kubernetes native Pod Lifecycle is showed by following sequence diagram.

![pod-ops-lifecycle-sequence-diagram](/img/operating/concepts/podopslifecycle/pod-ops-lifecycle-sequence-diagram.png)

## Developer's Guide

This section introduces how to develop operation controllers and cooperation controllers to interact with PodOpsLifecycle.
- The operation controller is responsible for a set of Pod operation tasks. KusionStack Operating has already provided various types of operation controllers. Users only need to develop a new operation controller if a new kind of Pod operation needs to be added.
- The cooperation controller participates in PodOpsLifecycle before and after operating on a Pod, such as the Traffic controller, alert monitoring controller, and other controllers responsible for maintaining the Pod and application status. Users should develop a new cooperation controller only when there is a new type of service or status around the Pod that needs to be maintained, such as integrating with a new traffic provider.

### Operation Controller

The operation controller is responsible for Pod operations. The tasks that an operation controller needs to perform during PodOpsLifecycle include triggering a PodOpsLifecycle, checking whether the Pod has entered the Operating phase, performing Pod operations, and marking Pod operations as finished. These actions interacting with PodOpsLifecycle are provided in the package `kusionstack.io/operating/pkg/controllers/utils/podopslifecycle/utils.go`.

A simple operation controller reconcile method would look like this:

```go
import (
    "context"

    corev1 "k8s.io/api/core/v1"
    "sigs.k8s.io/controller-runtime/pkg/reconcile"
    "sigs.k8s.io/controller-runtime/pkg/client"
    
    "kusionstack.io/operating/pkg/controllers/utils/podopslifecycle"
)

var operationAdapter = &OperationOpsLifecycleAdapter{}

type OperationOpsLifecycleAdapter struct {
}

// GetID indicates ID of the PodOpsLifecycle
func (a *OperationOpsLifecycleAdapter) GetID() string {
    return "new-id"
}

// GetType indicates type for this Operation Controller
func (a *OperationOpsLifecycleAdapter) GetType() podopslifecycle.OperationType {
    return "new-type"
}

// AllowMultiType indicates whether multiple IDs which have the same Type are allowed
func (a *OperationOpsLifecycleAdapter) AllowMultiType() bool {
    return true
}

// WhenBegin is a hook, which will be executed when begin a lifecycle
func (a *OperationOpsLifecycleAdapter) WhenBegin(pod client.Object) (bool, error) {
    return false, nil
}

// WhenFinish is a hook, which will be executed when finish a lifecycle
func (a *OperationOpsLifecycleAdapter) WhenFinish(pod client.Object) (bool, error) {
    return false, nil
}

......
func (r *PodOperationReconciler) Reconcile(ctx context.Context, req reconcile.Request) (ctrl.Result, error) {
    // get the Pod
    pod := &corev1.Pod{}
    if err := r.Get(ctx, req.NamespacedName, pod); err != nil {
        if !errors.IsNotFound(err) {
            return reconcile.Result{}, err
        }
        return reconcile.Result{}, nil
    }

    // check if the Pod needs operation
    if !r.needOperation(pod) {
        return reconcile.Result{}, nil
    }

    // if PodOpsLifecycle has not been triggered, trigger it
    if !podopslifecycle.IsDuringOps(OpsLifecycleAdapter, pod) {
        if updated, err := podopslifecycle.Begin(r, operationAdapter, pod); err != nil {
            return reconcile.Result{}, err
        } else if updated {
            return reconcile.Result{}, nil
        }
    }

    // waiting until Pod enters operating phase
    if _, allowed := podopslifecycle.AllowOps(operationAdapter, 0, pod); !allowed {
        return reconcile.Result{}, nil
    }

    // do operation works
    if completed := r.doPodOperation(pod); !completed {
        return reconcile.Result{}, nil
    }

    // after operation works completed, finish operating phase to continue PodOpsLifecycle
    if _, err := podopslifecycle.Finish(r, operationAdapter, pod); err != nil {
        return reconcile.Result{}, err
    }
}
```

### Pod Cooperation Controller

There are two ways to develop a cooperation controller. 
One way is to develop a controller using the controller runtime and adhering to some conventions of PodOpsLifecycle and Kubernetes. 
Another way is to take the use of [ResourceConsist](https://github.com/KusionStack/resourceconsist) framework provided by KusionStack, which can be referenced from its [documentation](https://www.kusionstack.io/docs/operating/manuals/resourceconsist).

The following outlines the first approach.

```go
import (
    "context"

    corev1 "k8s.io/api/core/v1"
    "k8s.io/apimachinery/pkg/api/errors"
    k8spod "k8s.io/kubernetes/pkg/api/v1/pod/util.go"
    "sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
    "sigs.k8s.io/controller-runtime/pkg/reconcile"

    operatingapps "kusionstack.io/operating/apis/apps/v1alpha1"
)

const (
    // Finalizer needs to have prefix: `prot.podopslifecycle.kusionstack.io`.
    // KusionStack Operating keeps this prefix back-compatible,
    // so that it can be hard code to decouple with KusionStack Operating.
    finalizerPrefix = operatingapps.PodOperationProtectionFinalizerPrefix

    protectionFinalizer = finalizerPrefix + "/" + "unique-id"
)

......
func (r *PodResourceReconciler) Reconcile(ctx context.Context, req reconcile.Request) (reconcile.Result, error) {
    // get the Pod
    pod := &corev1.Pod{}
    if err := r.Get(ctx, req.NamespacedName, pod); err != nil {
        if !errors.IsNotFound(err) {
            return reconcile.Result{}, err
        }
        return reconcile.Result{}, nil
    }

    if k8spod.IsPodReady(pod) {
        // do resource reconcile like add Pod IP to traffic route
        r.trafficOn(pod.status.PodIP)
        // It is important to add a unique finalizer on this Pod
        return reconcile.Result{}, r.addFinalizer(ctx, pod, protectionFinalizer)
    }

    if !k8spod.IsPodReady(pod) {
        // do resource reconcile like remove Pod IP from traffic route
        r.trafficOff(pod.status.PodIP)
        // It is important to remove the unique finalizer from this Pod
        return reconcile.Result{}, r.removeFinalizer(ctx, pod, protectionFinalizer)
    }
}

func (r *PodResourceReconciler) addFinalizer(ctx context.Context, pod *corev1.Pod, finalizer string) error {
    if controllerutil.ContainsFinalizer(pod, finalizer) {
        return nil
    }

    controllerutil.AddFinalizer(pod, finalizer)
    return r.Update(ctx, pod)
}

func (r *PodResourceReconciler) removeFinalizer(ctx context.Context, pod *corev1.Pod, finalizer string) error {
    if !controllerutil.ContainsFinalizer(pod, finalizer) {
        return nil
    }

    controllerutil.RemoveFinalizer(pod, finalizer)
    return r.Update(ctx, pod)
}
```

## Key Features

### Concurrency Support

PodOpsLifecycle in KusionStack Operating supports concurrency. 
It means PodOpsLifecycle is able to organize and track multi controllers operating the same pod at the same time. 
For example, when a controller is going to update Pod, other controllers are allowed to do other operations at the same time, like delete, restart, recreate it, 
although the result may not be meaningful.

### General Workload Support

PodOpsLifecycle offers seamless integration with various workload types, including Deployment and StatefulSet. 
To enable this functionality, ensure the feature gate for `GraceDeleteWebhook` is enabled when starting the KusionStack Operating controller:

```shell
# Enable the GraceDeleteWebhook feature when starting the controller with this argument
$ /manager --feature-gates=GraceDeleteWebhook=true
```

Once enabled, any Pod labeled with `kusionstack.io/control=true` under a general workload, such as Deployment, becomes manageable by PodOpsLifecycle.
This feature provides workloads a way to work closer with Pod Cooperation Controllers.

> Due to the Kubernetes webhook mechanism, the following error will be returned when workloads or users delete a pod. This error is intentional and serves to indicate that the pod deletion process has started and is being managed by PodOpsLifecycle.   
> ```shell
> $ kubectl -n default delete pod collaset-sample-74fsv
> Error from server (failed to validate GraceDeleteWebhook, pod deletion process is underway and being managed by PodOpsLifecycle): admission webhook "validating-pod.apps.kusionstack.io" denied the request: failed to validate GraceDeleteWebhook, pod deletion process is underway and being managed by PodOpsLifecycle
> ```