# v1alpha1

## Index

- [Policy](#policy)
- [Rollout](#rollout)
- [StandardOamDevV1alpha1RolloutSpec](#standardoamdevv1alpha1rolloutspec)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlan](#standardoamdevv1alpha1rolloutspecrolloutplan)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0](#standardoamdevv1alpha1rolloutspecrolloutplancanarymetricitems0)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0MetricsRange](#standardoamdevv1alpha1rolloutspecrolloutplancanarymetricitems0metricsrange)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0TemplateRef](#standardoamdevv1alpha1rolloutspecrolloutplancanarymetricitems0templateref)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0](#standardoamdevv1alpha1rolloutspecrolloutplanrolloutbatchesitems0)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0BatchRolloutWebhooksItems0](#standardoamdevv1alpha1rolloutspecrolloutplanrolloutbatchesitems0batchrolloutwebhooksitems0)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0](#standardoamdevv1alpha1rolloutspecrolloutplanrolloutbatchesitems0canarymetricitems0)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0MetricsRange](#standardoamdevv1alpha1rolloutspecrolloutplanrolloutbatchesitems0canarymetricitems0metricsrange)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0TemplateRef](#standardoamdevv1alpha1rolloutspecrolloutplanrolloutbatchesitems0canarymetricitems0templateref)
- [StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutWebhooksItems0](#standardoamdevv1alpha1rolloutspecrolloutplanrolloutwebhooksitems0)
- [StandardOamDevV1alpha1RolloutStatus](#standardoamdevv1alpha1rolloutstatus)
- [StandardOamDevV1alpha1RolloutStatusConditionsItems0](#standardoamdevv1alpha1rolloutstatusconditionsitems0)


## Schemas

### Policy

Policy is the Schema for the policy API

#### Attributes

**apiVersion** *required* *readOnly*

`"core.oam.dev/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Policy"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**properties**

`any`

properties

**type** *required*

`str`

### Rollout

Rollout is the Schema for the Rollout API

#### Attributes

**apiVersion** *required* *readOnly*

`"standard.oam.dev/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Rollout"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`StandardOamDevV1alpha1RolloutSpec`

spec

**status**

`StandardOamDevV1alpha1RolloutStatus`

status

### StandardOamDevV1alpha1RolloutSpec

RolloutSpec defines how to describe an update between different compRevision

#### Attributes

**componentName** *required*

`str`

ComponentName specify the component name

**rolloutPlan** *required*

`StandardOamDevV1alpha1RolloutSpecRolloutPlan`

rollout plan

**sourceRevisionName**

`str`

SourceRevisionName contains the name of the componentRevisionName  that we need to upgrade from. it can be empty only when it&#39;s the first time to deploy the application

**targetRevisionName** *required*

`str`

TargetRevisionName contains the name of the componentRevisionName that we need to upgrade to.

### StandardOamDevV1alpha1RolloutSpecRolloutPlan

RolloutPlan is the details on how to rollout the resources

#### Attributes

**batchPartition**

`int`

All pods in the batches up to the batchPartition (included) will have the target resource specification while the rest still have the source resource This is designed for the operators to manually rollout Default is the the number of batches which will rollout all the batches

**canaryMetric**

`[StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0]`

CanaryMetric provides a way for the rollout process to automatically check certain metrics before complete the process

**numBatches**

`int`

The number of batches, default = 1

**paused**

`bool`

Paused the rollout, default is false

**rolloutBatches**

`[StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0]`

The exact distribution among batches. its size has to be exactly the same as the NumBatches (if set) The total number cannot exceed the targetSize or the size of the source resource We will IGNORE the last batch&#39;s replica field if it&#39;s a percentage since round errors can lead to inaccurate sum We highly recommend to leave the last batch&#39;s replica field empty

**rolloutStrategy**

`str`

RolloutStrategy defines strategies for the rollout plan The default is IncreaseFirstRolloutStrategyType

**rolloutWebhooks**

`[StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutWebhooksItems0]`

RolloutWebhooks provide a way for the rollout to interact with an external process

**targetSize**

`int`

The size of the target resource. The default is the same as the size of the source resource.

### StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0

CanaryMetric holds the reference to metrics used for canary analysis

#### Attributes

**interval**

`str`

Interval represents the windows size

**metricsRange**

`StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0MetricsRange`

metrics range

**name** *required*

`str`

Name of the metric

**templateRef**

`StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0TemplateRef`

template ref

### StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0MetricsRange

Range value accepted for this metric

#### Attributes

**max**

`int`

Maximum value

**min**

`int`

Minimum value

### StandardOamDevV1alpha1RolloutSpecRolloutPlanCanaryMetricItems0TemplateRef

TemplateRef references a metric template object

#### Attributes

**apiVersion**

`str`

API version of the referent.

**fieldPath**

`str`

If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: &#34;spec.containers{name}&#34; (where &#34;name&#34; refers to the name of the container that triggered the event) or if no container name is specified &#34;spec.containers[2]&#34; (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object. TODO: this design is not final and this field is subject to change in the future.

**kind**

`str`

Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**name**

`str`

Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

**namespace**

`str`

Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

**resourceVersion**

`str`

Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

**uid**

`str`

UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids

### StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0

RolloutBatch is used to describe how the each batch rollout should be

#### Attributes

**batchRolloutWebhooks**

`[StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0BatchRolloutWebhooksItems0]`

RolloutWebhooks provides a way for the batch rollout to interact with an external process

**canaryMetric**

`[StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0]`

CanaryMetric provides a way for the batch rollout process to automatically check certain metrics before moving to the next batch

**instanceInterval**

`int`

The wait time, in seconds, between instances upgrades, default = 0

**maxUnavailable**

`int`

MaxUnavailable is the max allowed number of pods that is unavailable during the upgrade. We will mark the batch as ready as long as there are less or equal number of pods unavailable than this number. default = 0

**podList**

`[str]`

The list of Pods to get upgraded it is mutually exclusive with the Replicas field

**replicas**

`int`

Replicas is the number of pods to upgrade in this batch it can be an absolute number (ex: 5) or a percentage of total pods we will ignore the percentage of the last batch to just fill the gap it is mutually exclusive with the PodList field

### StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0BatchRolloutWebhooksItems0

RolloutWebhook holds the reference to external checks used for canary analysis

#### Attributes

**expectedStatus**

`[int]`

ExpectedStatus contains all the expected http status code that we will accept as success

**metadata**

`{str:str}`

Metadata (key-value pairs) for this webhook

**method**

`str`

Method the HTTP call method, default is POST

**name** *required*

`str`

Name of this webhook

**type** *required*

`str`

**url** *required*

`str`

URL address of this webhook

### StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0

CanaryMetric holds the reference to metrics used for canary analysis

#### Attributes

**interval**

`str`

Interval represents the windows size

**metricsRange**

`StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0MetricsRange`

metrics range

**name** *required*

`str`

Name of the metric

**templateRef**

`StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0TemplateRef`

template ref

### StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0MetricsRange

Range value accepted for this metric

#### Attributes

**max**

`int`

Maximum value

**min**

`int`

Minimum value

### StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutBatchesItems0CanaryMetricItems0TemplateRef

TemplateRef references a metric template object

#### Attributes

**apiVersion**

`str`

API version of the referent.

**fieldPath**

`str`

If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: &#34;spec.containers{name}&#34; (where &#34;name&#34; refers to the name of the container that triggered the event) or if no container name is specified &#34;spec.containers[2]&#34; (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object. TODO: this design is not final and this field is subject to change in the future.

**kind**

`str`

Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**name**

`str`

Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

**namespace**

`str`

Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

**resourceVersion**

`str`

Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

**uid**

`str`

UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids

### StandardOamDevV1alpha1RolloutSpecRolloutPlanRolloutWebhooksItems0

RolloutWebhook holds the reference to external checks used for canary analysis

#### Attributes

**expectedStatus**

`[int]`

ExpectedStatus contains all the expected http status code that we will accept as success

**metadata**

`{str:str}`

Metadata (key-value pairs) for this webhook

**method**

`str`

Method the HTTP call method, default is POST

**name** *required*

`str`

Name of this webhook

**type** *required*

`str`

**url** *required*

`str`

URL address of this webhook

### StandardOamDevV1alpha1RolloutStatus

CompRolloutStatus defines the observed state of rollout

#### Attributes

**LastSourceRevision**

`str`

LastSourceRevision contains the name of the componentRevisionName that we need to upgrade from. We will restart the rollout if this is not the same as the spec

**batchRollingState**

`str`

BatchRollingState only meaningful when the Status is rolling

**conditions**

`[StandardOamDevV1alpha1RolloutStatusConditionsItems0]`

Conditions of the resource.

**currentBatch** *required*

`int`

The current batch the rollout is working on/blocked it starts from 0

**lastAppliedPodTemplateIdentifier**

`str`

lastAppliedPodTemplateIdentifier is a string that uniquely represent the last pod template each workload type could use different ways to identify that so we cannot compare between resources We update this field only after a successful rollout

**lastTargetRevision** *required*

`str`

LastUpgradedTargetRevision contains the name of the componentRevisionName that we upgraded to We will restart the rollout if this is not the same as the spec

**rollingState** *required*

`str`

RollingState is the Rollout State

**rolloutOriginalSize**

`int`

RolloutTargetSize is the size of the target resources. This is determined once the initial spec verification and does not change until the rollout is restarted

**rolloutTargetSize**

`int`

RolloutTargetSize is the size of the target resources. This is determined once the initial spec verification and does not change until the rollout is restarted

**targetGeneration**

`str`

NewPodTemplateIdentifier is a string that uniquely represent the new pod template each workload type could use different ways to identify that so we cannot compare between resources

**upgradedReadyReplicas** *required*

`int`

UpgradedReadyReplicas is the number of Pods upgraded by the rollout controller that have a Ready Condition.

**upgradedReplicas** *required*

`int`

UpgradedReplicas is the number of Pods upgraded by the rollout controller

### StandardOamDevV1alpha1RolloutStatusConditionsItems0

A Condition that may apply to a resource.

#### Attributes

**lastTransitionTime** *required*

`str`

LastTransitionTime is the last time this condition transitioned from one status to another.

**message**

`str`

A Message containing details about this condition&#39;s last transition from one status to another, if any.

**reason** *required*

`str`

A Reason for this condition&#39;s last transition from one status to another.

**status** *required*

`str`

Status of this condition; is it currently True, False, or Unknown?

**type** *required*

`str`

<!-- Auto generated by kcl-doc tool, please do not edit. -->
