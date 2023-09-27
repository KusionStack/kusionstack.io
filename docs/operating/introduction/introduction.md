# What is KusionStack Operating?

KusionStack Operating consists of workloads and operators built on Kubernetes Custom Resource Definitions,
with a primary aim of bridging the gap between platform development and Kubernetes.

By keeping more operation works finished in Kubernetes layer,
KusionStack Operating reduces complexity when interacting with Kubernetes
and enhances convenience for platform and application developers.

## Key features

In order to make it easy to build a platform or directly manage application resources on Kubernetes,
KusionStack Operating currently provides the following features,
streamlining both platform development and application operations based on Kubernetes:

### Advanced workloads

KusionStack Operating offers several workloads to ensure it is convenient and effective to delivery and operate application resources.

Recently, Operating introduced the workload CollaSet.
Besides the basic ability of scaling and updating Pods like Deployment and StatefulSet of Kubernetes,
CollaSet also provides a range of scale and update strategies,
like in-place update with container image and pod revision consistency.

### Streamlined Pod Operation

KusionStack Operating introduces PodOpsLifecycle that facilitates the graceful participation
of multiple resources related to Pods in a Pod operation process.
For instance, the resource consist framework in PodOpsLifecycle is able to incorporate traffic management
into each Pod operation process.
It simplifies the work for platform developers dealing with Pod operation details. KusionStack also adapt some resources
by default, such as Aliyun SLB.

### Integrated risk management

Building upon the PodOpsLifecycle, KusionStack Operating introduces the workload named PodTransitionRule
which will keep risks of pod operation under control.
By providing a MaxUnavailable rule similar to Kubernetes' PodDisruptionBudget (PDB),
it ensures there are always enough Pods available for service.
Furthermore, it allows for custom rules through extension via webhooks and label hooks.

## Future works

KusionStack Operating project is currently in its early stages.
Our goal is to simplify platform development. we will continue building in areas such as application operations,
observability, and insight. We hope the Operating will make it easier for you to build platforms.