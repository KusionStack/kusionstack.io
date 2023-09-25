# What is KusionStack Operating?

KusionStack Operating comprises workloads and operators built on Kubernetes Custom Resource Definitions, with a primary aim of bridging the gap between application management and Kubernetes.

## Key features

KusionStack Operating collaborates with various KusionStack components to achieve the following two key features, streamlining both platform development and application operations based on Kubernetes:

### Advanced operational capabilities

* Advanced workloads

KusionStack Operating offers multiple workloads to ensure the convenient and effective delivery and operation of application resources.

Recently, Operating introduced the workload CollaSet, designed to manage Pods with a range of scale and update strategies. 

* Fine-grained operations

KusionStack Operating introduces the Pod ops lifecycle around every Pod operation, which allows various roles like application developers and SREs to collaboratively operate on a single Pod in parallel.

* Risk management

Building upon the Pod ops lifecycle, KusionStack Operating introduces the workload PodTransitionRule. Its primary responsibility is to keep operational risks under control. By providing a MaxUnavailable rule similar to Kubernetes' PodDisruptionBudget (PDB), it ensures there are always enough Pods available to serve. Additionally, it allows for custom rules through extension via webhooks and label hooks. 

### Platform friendly approach

* Resource consist framework

The Pod ops lifecycle also introduces a framework that facilitates the graceful participation of multiple resources related to Pods in the Pod operation process. For example, resource consist framework is able to integrate traffic management into each Pod operation process. It simplifies the work for platform developers dealing with Pod operation details. KusionStack also adapt some resources by default, such as Aliyun SLB.  

* More features coming soon

KusionStack Operating is currently in development, and additional features will be unveiled shortly.







