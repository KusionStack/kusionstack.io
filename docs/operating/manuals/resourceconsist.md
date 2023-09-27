---
sidebar_position: 2
---

# ResourceConsist
## Motivation
### Goals
Making a customized controller can be realized easily, and offering the ability of controllers following PodOpsLifecycle.

The only thing users need to do to realize a customized controller is writing an adapter implementing ReconcileAdapter.
### Non-Goals
Making resource consist as a pkg like controller-runtime.

A customized controller can be started by command like "resource-consist enable".
## Proposal
### Key Concepts
#### Employer
**Employer** is the entity responsible for managing and coordinating the utilization of another resource, similar to how a service selects and controls pods.

Employer can be any kind, and CRD is of course can be used as Employer.
#### Employee
**Employee** is the resource managed by another resource, like pods selected by service.

Same with Employer, Employee can be any kind, and CRD is of course can be used as Employee.

If an adapter implementing ReconcileAdapter and following PodOpsLifecycle, the Employee should be Pod.
### Key Interface/Struct Definitions
#### ReconcileAdapter
**ReconcileAdapter** is an interface specifying a set of methods as follows.
```
// ReconcileOptions includes max concurrent reconciles and rate limiter,
// max concurrent reconcile: 5 and DefaultControllerRateLimiter() will be used if ReconcileOptions not implemented.
type ReconcileOptions interface {
	GetRateLimiter() ratelimiter.RateLimiter
	GetMaxConcurrentReconciles() int
}

// ReconcileWatchOptions defines what employer and employee is and how controller watch
// default employer: Service, default employee: Pod
type ReconcileWatchOptions interface {
	NewEmployer() client.Object
	NewEmployee() client.Object
	EmployerEventHandler() handler.EventHandler
	EmployeeEventHandler() handler.EventHandler
	EmployerPredicates() predicate.Funcs
	EmployeePredicates() predicate.Funcs
}

// ReconcileAdapter is the interface that customized controllers should implement.
type ReconcileAdapter interface {
	GetControllerName() string
	NotFollowPodOpsLifeCycle() bool

	GetSelectedEmployeeNames(ctx context.Context, employer client.Object) ([]string, error)

	// GetExpectEmployer and GetCurrentEmployer return expect/current status of employer from related backend provider
	GetExpectEmployer(ctx context.Context, employer client.Object) ([]IEmployer, error)
	GetCurrentEmployer(ctx context.Context, employer client.Object) ([]IEmployer, error)

	CreateEmployer(ctx context.Context, employer client.Object, toCreate []IEmployer) ([]IEmployer, []IEmployer, error)
	UpdateEmployer(ctx context.Context, employer client.Object, toUpdate []IEmployer) ([]IEmployer, []IEmployer, error)
	DeleteEmployer(ctx context.Context, employer client.Object, toDelete []IEmployer) ([]IEmployer, []IEmployer, error)

	// GetExpectEmployee and GetCurrentEmployee return expect/current status of employees from related backend provider
	GetExpectEmployee(ctx context.Context, employer client.Object) ([]IEmployee, error)
	GetCurrentEmployee(ctx context.Context, employer client.Object) ([]IEmployee, error)

	CreateEmployees(ctx context.Context, employer client.Object, toCreate []IEmployee) ([]IEmployee, []IEmployee, error)
	UpdateEmployees(ctx context.Context, employer client.Object, toUpdate []IEmployee) ([]IEmployee, []IEmployee, error)
	DeleteEmployees(ctx context.Context, employer client.Object, toDelete []IEmployee) ([]IEmployee, []IEmployee, error)
}
```
A customized controller should realize an adapter implementing the ReconcileAdapter.

ReconcileOptions and ReconcileWatchOptions Interfaces can be optional implemented, dependent on whether customized controllers need specify some reconcile options like rate limiter.

Service/Pod will be default Employer/Employee, if ReconcileWatchOptions not implemented. And there is a default Predicate which filters out Services without **Label "kusionstack.io/control": "true"**.
#### IEmployer/IEmployee
**IEmployer/IEmployee** are interfaces defined as follows.
```
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
```
#### PodEmployeeStatuses
**PodEmployeeStatuses** is a built-in struct implementing EmployeeStatus.EmployeeStatuses.
ExtraStatus in PodEmployeeStatuses is an interface so that adapters can implement it as they wished. Normally, ExtraStatus is extra info beyond basic pod status related to backend provider, like the traffic status of backend server(pod) under load balancer.
```
type PodEmployeeStatuses struct {
	// can be set by calling SetCommonPodEmployeeStatus
	Ip             string `json:"ip,omitempty"`
	Ipv6           string `json:"ipv6,omitempty"`
	LifecycleReady bool   `json:"lifecycleReady,omitempty"`
	// extra info related to backend provider
	ExtraStatus interface{} `json:"extraStatus,omitempty"`
}
```
#### PodAvailableConditions
Used if PodOpsLifecycle followed.

**PodAvailableConditions** is an annotation on pod, indicating what finalizer should be added to achieve service-available state.

For a pod employed by multiple employers, there will be multiple LifecycleFinalizer should be added, and PodAvailableConditions annotation will record what employers and what finalizers are.

Webhook will also record PodAvailableConditions in case of Pod creation to avoid Pod reaching service-available state if ResourceConsist controller not record PodAvailableConditions before Pod ready.
```
const PodAvailableConditionsAnnotation = "pod.kusionstack.io/available-conditions" // indicate the available conditions of a pod

type PodAvailableConditions struct {
	ExpectedFinalizers map[string]string `json:"expectedFinalizers,omitempty"` // indicate the expected finalizers of a pod
}

func GenerateLifecycleFinalizerKey(employer client.Object) string {
	return fmt.Sprintf("%s/%s/%s", employer.GetObjectKind().GroupVersionKind().Kind,
		employer.GetNamespace(), employer.GetName())
}

func GenerateLifecycleFinalizer(employerName string) string {
	b := md5.Sum([]byte(employerName))
	return v1alpha1.PodOperationProtectionFinalizerPrefix + "/" + hex.EncodeToString(b[:])[8:24]
}
```
### Key Finalizers
#### LifecycleFinalizer
**LifecycleFinalizer** prefixed with <mark>"prot.podopslifecycle.kusionstack.io"</mark>, is a finalizer on Employee used to following PodOpsLifecycle, removed in preparing period of PodOpsLifecycle and added in completing period of PodOpsLifecycle
```
const (
	PodOperationProtectionFinalizerPrefix = "prot.podopslifecycle.kusionstack.io"
)

func GenerateLifecycleFinalizerKey(employer client.Object) string {
	return fmt.Sprintf("%s/%s/%s", employer.GetObjectKind().GroupVersionKind().Kind,
		employer.GetNamespace(), employer.GetName())
}

func GenerateLifecycleFinalizer(employerName string) string {
	b := md5.Sum([]byte(employerName))
	return v1alpha1.PodOperationProtectionFinalizerPrefix + "/" + hex.EncodeToString(b[:])[8:24]
}
```
#### CleanFinalizer
**CleanFinalizer** is a finalizer on Employer, used to bind Employer and Employee.

CleanFinalizer should be added in the first Reconcile of the resource, and be removed only when there is no more relation between Employer and Employee and during deletion.
```
	cleanFinalizerPrefix = "resource-consist.kusionstack.io/clean-"
	
	cleanFlz := cleanFinalizerPrefix + employer.GetName()
```
### Main Logic of Reconcile in ResourceConsist Controller
#### Ensure clean finalizer of Employer
Clean finalizer will be added to Employer before everything, and all resources related to Employer will be cleaned before clean finalizer removed, so that nothing related to Employer will be remained.
#### Ensure PodAvailableConditions if PodOpsLifecycle followed
An expected LifecycleFinalizer related to Employer will be added into PodAvailableConditions.
#### Get Expect/Current Employer/Employee, make diff, and do sync
Adapters should implement these methods, and Resource Consist Controller will call it.
## Tutorials
```pkg/controllers/alibabacloudslb``` is an adapter that implements ReconcileAdapter. It follows **PodOpsLifecycle** to handle various scenarios during pod operations, such as creating a new pod, deleting an existing pod, or handling changes to pod configurations. This adapter ensures minimal traffic loss and provides a seamless experience for users accessing services load balanced by Alibaba Cloud SLB.

In ```pkg/controllers/alibabacloudslb```, the real server is removed from SLB before pod operation in ACK. The LB management and real server management are handled by CCM in ACK. If the cluster is not in ACK or CCM is not working in the cluster, the alibabacloudslb controller should implement additional methods of ReconcileAdapter.

A demo is implemented in ```resource_controller_suite_test.go```. In the demo controller, the employer is represented as a service and is expected to have the following **DemoServiceStatus**:
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
The DemoResourceProviderClient is a fake client that handles backend provider resources related to the employer/employee (service/pods). In the Demo Controller, ```demoResourceVipStatusInProvider``` and ```demoResourceRsStatusInProvider``` are mocked as resources in the backend provider.

These two adapters can be referred to for implementing customized controllers.