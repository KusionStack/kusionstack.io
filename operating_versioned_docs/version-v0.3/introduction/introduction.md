# What is KusionStack Operating?

KusionStack Operating consists of workloads and operators built on Kubernetes Custom Resource Definitions,
with a primary aim of bridging the gap between platform development and Kubernetes.

By keeping more operation works finished in Kubernetes layer,
KusionStack Operating reduces complexity when interacting with Kubernetes
and enhances convenience for platform developers.

## Key features

KusionStack Operating currently provides the following features,
streamlining application operations when developing platforms based on Kubernetes:

### Fine-grained operation

KusionStack Operating introduces PodOpsLifecycle to extend native Pod lifecycle with additional phases such as PreCheck, Preparing, etc. 
All operators within KusionStack Operating will respect PodOpsLifecycle, 
so that PodOpsLifecycle is able to orchestrate all of these operators to operate each Pod coordinately. 

### Advanced workloads

KusionStack Operating offers several workloads to ensure it is convenient and effective to delivery and operate application resources.

Recently, Operating provides the workload CollaSet.
Besides the basic ability of scaling and updating Pods like Deployment and StatefulSet of Kubernetes,
CollaSet also provides a range of scale and update strategies,
like in-place update with container image and pod revision consistency.

### Streamlined Pod Operation

KusionStack Operating introduces resource consist framework that offers a graceful way 
to integrate resource management around Pods, including traffic control, into the PodOpsLifecycle.
This simplifies the works for platform developers dealing with Pod operation details. 
KusionStack also integrates some resources by default, such as Aliyun SLB.

### Risk management

Building upon the PodOpsLifecycle, KusionStack Operating introduces the workload named PodTransitionRule
which will keep risks of pod operation under control.
By providing a MaxUnavailable rule similar to Kubernetes' PodDisruptionBudget (PDB),
it ensures there are always enough Pods available for service.
Furthermore, it allows for custom rules through extension via webhooks and label hooks.

## Future works

KusionStack Operating project is currently in its early stages.
Our goal is to simplify platform development. We will continue building in areas such as application operations,
observability, and insight. We hope the Operating will make it easier for you to build platforms.