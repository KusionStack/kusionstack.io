---
sidebar_position: 2
---

# ResourceConsist
[**ResourceConsist**](https://github.com/KusionStack/resourceconsist/blob/main/README.md) aims to make a customized controller can be realized easily, and offering the ability of following 
**PodOpsLifecycle** for controllers.

## Tutorials
**kusionstack.io/resourceconsit** mainly consists of frame, experimental/adapters and adapters.

The frame, ```kusionstack.io/resourceconsist/pkg/frame```, is used for adapters starting a controller, which handles
Reconcile and Employer/Employees' spec&status. If you wrote an adapter in your own repo, you can import
```kusionstack.io/resourceconsist/pkg/frame/controller``` and ```kusionstack.io/resourceconsist/pkg/frame/webhook```,
]and call AddToMgr to start a controller.

>webhookAdapter is only necessary to be implemented for controllers following PodOpsLifecycle.

```go
package main

import (
    controllerframe "kusionstack.io/resourceconsist/pkg/frame/controller"
    webhookframe "kusionstack.io/resourceconsist/pkg/frame/webhook"
)

func main() {
    controllerframe.AddToMgr(manager, yourOwnControllerAdapter)
    webhookframe.AddToMgr(manager, yourOwnWebhookAdapter)
}
```
### adapters
The adapters, ```kusionstack.io/resourceconsist/pkg/adapters```, consists of built-in adapters. You can start a
controller with built-in adapters just calling AddBuiltinControllerAdaptersToMgr and AddBuiltinWebhookAdaptersToMgr,
passing built-in adapters' names. Currently, an aliababacloudslb adapter has released. You can use it as follows:
```go
import (
    "kusionstack.io/resourceconsist/pkg/adapters"
)

func main() {
    adapters.AddBuiltinControllerAdaptersToMgr(manager, []adapters.AdapterName{adapters.AdapterAlibabaCloudSlb})
    adapters.AddBuiltinWebhookAdaptersToMgr(manager, []adapters.AdapterName{adapters.AdapterAlibabaCloudSlb})
}
```
Built-in adapters can also be used like how frame used. You can call NewAdapter from a certain built-in adapter pkg
and the call frame.AddToMgr to start a controller/webhook

More built-in adapters will be implemented in the future. To make this repo stable, all new built-in adapters will
be added to ```kusionstack.io/pkg/experimental/adapters``` first, and then moved to ```kusionstack.io/pkg/adapters```
until ready to be released.
#### alibabacloudslb adapter
```pkg/adapters/alibabacloudslb``` is an adapter that implements ReconcileAdapter. It follows **PodOpsLifecycle** to
handle various scenarios during pod operations, such as creating a new pod, deleting an existing pod, or handling
changes to pod configurations. This adapter ensures minimal traffic loss and provides a seamless experience for users
accessing services load balanced by Alibaba Cloud SLB.

In ```pkg/adapters/alibabacloudslb```, the real server is removed from SLB before pod operation in ACK. The LB
management and real server management are handled by CCM in ACK. Since alibabacloudslb adapter follows PodOpsLifecycle
and real servers are managed by CCM, ReconcileLifecycleOptions should be implemented. If the cluster is not in ACK or
CCM is not working in the cluster, the alibabacloudslb controller should implement additional methods of ReconcileAdapter.
### experimental/adapters
The experimental/adapters is more like a pre-release pkg for built-in adapters. Usage of experimental/adapters is same
with built-in adapters, and be aware that **DO NOT USE EXPERIMENTAL/ADAPTERS IN PRODUCTION**
### demo adapter
A demo is implemented in ```resource_controller_suite_test.go```. In the demo controller, the employer is represented
as a service and is expected to have the following **DemoServiceStatus**:
```
DemoServiceStatus{
    EmployerId: employer.GetName(),
    EmployerStatuses: DemoServiceDetails{
        RemoteVIP:    "demo-remote-VIP",
        RemoteVIPQPS: 100,
    }
}
```
The employee is represented as a pod and is expected to have the following **DemoPodStatus**:
```
DemoPodStatus{
    EmployeeId:   pod.Name,
    EmployeeName: pod.Name,
    EmployeeStatuses: PodEmployeeStatuses{
        Ip: string,
        Ipv6: string,
        LifecycleReady: bool,
        ExtraStatus: PodExtraStatus{
            TrafficOn: bool,
            TrafficWeight: int,
        },
    }
}
```
The DemoResourceProviderClient is a fake client that handles backend provider resources related to the employer/employee
(service/pods). In the Demo Controller, ```demoResourceVipStatusInProvider``` and ```demoResourceRsStatusInProvider```
are mocked as resources in the backend provider.

How the demo controller adapter realized will be introduced in detail as follows,
```DemoControllerAdapter``` was defined, including a kubernetes client and a resourceProviderClient. What included in
the Adapter struct can be defined as needed.
```go
type DemoControllerAdapter struct {
	client.Client
	resourceProviderClient *DemoResourceProviderClient
}
```
Declaring that the DemoControllerAdapter implemented ```ReconcileAdapter``` and ```ReconcileLifecycleOptions```.
Implementing ```RconcileAdapter``` is a must action, while ```ReconcileLifecycleOptions``` isn't, check the remarks
for ```ReconcileLifecycleOptions``` in ```kusionstack.io/resourceconsist/pkg/frame/controller/types.go``` to find why.
```go
var _ ReconcileAdapter = &DemoControllerAdapter{}
var _ ReconcileLifecycleOptions = &DemoControllerAdapter{}
```
Following two methods for DemoControllerAdapter inplementing ```ReconcileLifecycleOptions```, defines whether
DemoControllerAdapter following PodOpsLifecycle and need record employees.
```go
func (r *DemoControllerAdapter) FollowPodOpsLifeCycle() bool {
	return true
}

func (r *DemoControllerAdapter) NeedRecordEmployees() bool {
	return needRecordEmployees
}
```
```IEmployer``` and ```IEmployee``` are interfaces that includes several methods indicating the status employer and
employee.
```go
type IEmployer interface {
	GetEmployerId() string
	GetEmployerStatuses() interface{}
	EmployerEqual(employer IEmployer) (bool, error)
}

type IEmployee interface {
	GetEmployeeId() string
	GetEmployeeName() string
	GetEmployeeStatuses() interface{}
	EmployeeEqual(employee IEmployee) (bool, error)
}

type DemoServiceStatus struct {
	EmployerId       string
	EmployerStatuses DemoServiceDetails
}

type DemoServiceDetails struct {
	RemoteVIP    string
	RemoteVIPQPS int
}

type DemoPodStatus struct {
	EmployeeId       string
	EmployeeName     string
	EmployeeStatuses PodEmployeeStatuses
}
```
```GetSelectedEmployeeNames``` returns all employees' names selected by employer, here is pods' names selected by
service. ```GetSelectedEmployeeNames``` is used for ensuring LifecycleFinalizer and ExpectedFinalizer, so you can give
it an empty return if your adapter doesn't follow PodOpsLifecycle.
```go
func (r *DemoControllerAdapter) GetSelectedEmployeeNames(ctx context.Context, employer client.Object) ([]string, error) {
	svc, ok := employer.(*corev1.Service)
	if !ok {
		return nil, fmt.Errorf("expect employer kind is Service")
	}
	selector := labels.Set(svc.Spec.Selector).AsSelectorPreValidated()
	var podList corev1.PodList
	err := r.List(ctx, &podList, &client.ListOptions{Namespace: svc.Namespace, LabelSelector: selector})
	if err != nil {
		return nil, err
	}

	selected := make([]string, len(podList.Items))
	for idx, pod := range podList.Items {
		selected[idx] = pod.Name
	}

	return selected, nil
}
```
```GetExpectedEmployer``` and ```GetCurrentEmployer``` defines what is expected under the spec of employer and what is
current status, like the load balancer from a cloud provider. Here in the demo adapter, expected is defined by hardcode
and current is retrieved from a fake resource provider ```demoResourceVipStatusInProvider```.
```go
func (r *DemoControllerAdapter) GetExpectedEmployer(ctx context.Context, employer client.Object) ([]IEmployer, error) {
	if !employer.GetDeletionTimestamp().IsZero() {
		return nil, nil
	}
	var expect []IEmployer
	expect = append(expect, DemoServiceStatus{
		EmployerId: employer.GetName(),
		EmployerStatuses: DemoServiceDetails{
			RemoteVIP:    "demo-remote-VIP",
			RemoteVIPQPS: 100,
		},
	})
	return expect, nil
}

func (r *DemoControllerAdapter) GetCurrentEmployer(ctx context.Context, employer client.Object) ([]IEmployer, error) {
	var current []IEmployer

	req := &DemoResourceVipOps{}
	resp, err := r.resourceProviderClient.QueryVip(req)
	if err != nil {
		return current, err
	}
	if resp == nil {
		return current, fmt.Errorf("demo resource vip query resp is nil")
	}

	for _, employerStatus := range resp.VipStatuses {
		current = append(current, employerStatus)
	}
	return current, nil
}
```
```CreateEmployer/UpdateEmployer/DeleteEmployer``` handles creation/update/deletion of resources related to employer on
related backend provider. Here in the demo adapter, ```CreateEmployer/UpdateEmployer/DeleteEmployer``` handles
```demoResourceVipStatusInProvider```.
```go
func (r *DemoControllerAdapter) CreateEmployer(ctx context.Context, employer client.Object, toCreates []IEmployer) ([]IEmployer, []IEmployer, error) {
	if toCreates == nil || len(toCreates) == 0 {
		return toCreates, nil, nil
	}

	toCreateDemoServiceStatus := make([]DemoServiceStatus, len(toCreates))
	for idx, create := range toCreates {
		createDemoServiceStatus, ok := create.(DemoServiceStatus)
		if !ok {
			return nil, toCreates, fmt.Errorf("toCreates employer is not DemoServiceStatus")
		}
		toCreateDemoServiceStatus[idx] = createDemoServiceStatus
	}

	_, err := r.resourceProviderClient.CreateVip(&DemoResourceVipOps{
		VipStatuses: toCreateDemoServiceStatus,
	})
	if err != nil {
		return nil, toCreates, err
	}
	return toCreates, nil, nil
}

func (r *DemoControllerAdapter) UpdateEmployer(ctx context.Context, employer client.Object, toUpdates []IEmployer) ([]IEmployer, []IEmployer, error) {
	if toUpdates == nil || len(toUpdates) == 0 {
		return toUpdates, nil, nil
	}

	toUpdateDemoServiceStatus := make([]DemoServiceStatus, len(toUpdates))
	for idx, update := range toUpdates {
		updateDemoServiceStatus, ok := update.(DemoServiceStatus)
		if !ok {
			return nil, toUpdates, fmt.Errorf("toUpdates employer is not DemoServiceStatus")
		}
		toUpdateDemoServiceStatus[idx] = updateDemoServiceStatus
	}

	_, err := r.resourceProviderClient.UpdateVip(&DemoResourceVipOps{
		VipStatuses: toUpdateDemoServiceStatus,
	})
	if err != nil {
		return nil, toUpdates, err
	}
	return toUpdates, nil, nil
}

func (r *DemoControllerAdapter) DeleteEmployer(ctx context.Context, employer client.Object, toDeletes []IEmployer) ([]IEmployer, []IEmployer, error) {
	if toDeletes == nil || len(toDeletes) == 0 {
		return toDeletes, nil, nil
	}

	toDeleteDemoServiceStatus := make([]DemoServiceStatus, len(toDeletes))
	for idx, update := range toDeletes {
		deleteDemoServiceStatus, ok := update.(DemoServiceStatus)
		if !ok {
			return nil, toDeletes, fmt.Errorf("toDeletes employer is not DemoServiceStatus")
		}
		toDeleteDemoServiceStatus[idx] = deleteDemoServiceStatus
	}

	_, err := r.resourceProviderClient.DeleteVip(&DemoResourceVipOps{
		VipStatuses: toDeleteDemoServiceStatus,
	})
	if err != nil {
		return nil, toDeletes, err
	}
	return toDeletes, nil, nil
}
```
```GetExpectedEmployee```and```GetCurrentEmployee``` defines what is expected under the spec of employer and employees
and what is current status, like real servers under the load balancer from a cloud provider. Here in the demo adapter,
expected is calculated from pods and current is retrieved from a fake resource provider ```demoResourceRsStatusInProvider```.
```go
// GetExpectEmployeeStatus return expect employee status
func (r *DemoControllerAdapter) GetExpectedEmployee(ctx context.Context, employer client.Object) ([]IEmployee, error) {
	if !employer.GetDeletionTimestamp().IsZero() {
		return []IEmployee{}, nil
	}

	svc, ok := employer.(*corev1.Service)
	if !ok {
		return nil, fmt.Errorf("expect employer kind is Service")
	}
	selector := labels.Set(svc.Spec.Selector).AsSelectorPreValidated()

	var podList corev1.PodList
	err := r.List(ctx, &podList, &client.ListOptions{Namespace: svc.Namespace, LabelSelector: selector})
	if err != nil {
		return nil, err
	}

	expected := make([]IEmployee, len(podList.Items))
	expectIdx := 0
	for _, pod := range podList.Items {
		if !pod.DeletionTimestamp.IsZero() {
			continue
		}
		status := DemoPodStatus{
			EmployeeId:   pod.Name,
			EmployeeName: pod.Name,
		}
		employeeStatuses, err := GetCommonPodEmployeeStatus(&pod)
		if err != nil {
			return nil, err
		}
		extraStatus := PodExtraStatus{}
		if employeeStatuses.LifecycleReady {
			extraStatus.TrafficOn = true
			extraStatus.TrafficWeight = 100
		} else {
			extraStatus.TrafficOn = false
			extraStatus.TrafficWeight = 0
		}
		employeeStatuses.ExtraStatus = extraStatus
		status.EmployeeStatuses = employeeStatuses
		expected[expectIdx] = status
		expectIdx++
	}

	return expected[:expectIdx], nil
}

func (r *DemoControllerAdapter) GetCurrentEmployee(ctx context.Context, employer client.Object) ([]IEmployee, error) {
	var current []IEmployee
	req := &DemoResourceRsOps{}
	resp, err := r.resourceProviderClient.QueryRealServer(req)
	if err != nil {
		return current, err
	}
	if resp == nil {
		return current, fmt.Errorf("demo resource rs query resp is nil")
	}

	for _, rsStatus := range resp.RsStatuses {
		current = append(current, rsStatus)
	}
	return current, nil
}
```
```CreateEmployees/UpdateEmployees/DeleteEmployees``` handles creation/update/deletion of resources related to employee
on related backend provider. Here in the demo adapter, ```CreateEmployees/UpdateEmployees/DeleteEmployees```
handles ```demoResourceRsStatusInProvider```.
```go
func (r *DemoControllerAdapter) CreateEmployees(ctx context.Context, employer client.Object, toCreates []IEmployee) ([]IEmployee, []IEmployee, error) {
	if toCreates == nil || len(toCreates) == 0 {
		return toCreates, nil, nil
	}
	toCreateDemoPodStatuses := make([]DemoPodStatus, len(toCreates))

	for idx, toCreate := range toCreates {
		podStatus, ok := toCreate.(DemoPodStatus)
		if !ok {
			return nil, toCreates, fmt.Errorf("toCreate is not DemoPodStatus")
		}
		toCreateDemoPodStatuses[idx] = podStatus
	}

	_, err := r.resourceProviderClient.CreateRealServer(&DemoResourceRsOps{
		RsStatuses: toCreateDemoPodStatuses,
	})
	if err != nil {
		return nil, toCreates, err
	}

	return toCreates, nil, nil
}

func (r *DemoControllerAdapter) UpdateEmployees(ctx context.Context, employer client.Object, toUpdates []IEmployee) ([]IEmployee, []IEmployee, error) {
	if toUpdates == nil || len(toUpdates) == 0 {
		return toUpdates, nil, nil
	}

	toUpdateDemoPodStatuses := make([]DemoPodStatus, len(toUpdates))

	for idx, toUpdate := range toUpdates {
		podStatus, ok := toUpdate.(DemoPodStatus)
		if !ok {
			return nil, toUpdates, fmt.Errorf("toUpdate is not DemoPodStatus")
		}
		toUpdateDemoPodStatuses[idx] = podStatus
	}

	_, err := r.resourceProviderClient.UpdateRealServer(&DemoResourceRsOps{
		RsStatuses: toUpdateDemoPodStatuses,
	})
	if err != nil {
		return nil, toUpdates, err
	}

	return toUpdates, nil, nil
}

func (r *DemoControllerAdapter) DeleteEmployees(ctx context.Context, employer client.Object, toDeletes []IEmployee) ([]IEmployee, []IEmployee, error) {
	if toDeletes == nil || len(toDeletes) == 0 {
		return toDeletes, nil, nil
	}

	toDeleteDemoPodStatuses := make([]DemoPodStatus, len(toDeletes))

	for idx, toDelete := range toDeletes {
		podStatus, ok := toDelete.(DemoPodStatus)
		if !ok {
			return nil, toDeletes, fmt.Errorf("toDelete is not DemoPodStatus")
		}
		toDeleteDemoPodStatuses[idx] = podStatus
	}

	_, err := r.resourceProviderClient.DeleteRealServer(&DemoResourceRsOps{
		RsStatuses: toDeleteDemoPodStatuses,
	})
	if err != nil {
		return nil, toDeletes, err
	}

	return toDeletes, nil, nil
}
```
