# Package v1beta1

## Index

- [AppsKruiseIoV1beta1StatefulSetSpec](#schema-appskruiseiov1beta1statefulsetspec)
- [AppsKruiseIoV1beta1StatefulSetSpecSelector](#schema-appskruiseiov1beta1statefulsetspecselector)
- [AppsKruiseIoV1beta1StatefulSetSpecSelectorMatchExpressionsItems0](#schema-appskruiseiov1beta1statefulsetspecselectormatchexpressionsitems0)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategy](#schema-appskruiseiov1beta1statefulsetspecupdatestrategy)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdate](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdate)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdateinplaceupdatestrategy)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdate](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdateunorderedupdate)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategy)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyorderpriorityitems0)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0matchselector)
- [AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0](#schema-appskruiseiov1beta1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0matchselectormatchexpressionsitems0)
- [AppsKruiseIoV1beta1StatefulSetStatus](#schema-appskruiseiov1beta1statefulsetstatus)
- [StatefulSet](#schema-statefulset)


## Schemas

### Schema AppsKruiseIoV1beta1StatefulSetSpec

StatefulSetSpec defines the desired state of StatefulSet

#### Attributes

**podManagementPolicy**

`str`

podManagementPolicy controls how pods are created during initial scale up, when replacing pods on nodes, or when scaling down. The default policy is `OrderedReady`, where pods are created in increasing order (pod-0, then pod-1, etc) and the controller will wait until each pod is ready before continuing. When scaling down, the pods are removed in the opposite order. The alternative policy is `Parallel` which will create pods in parallel to match the desired scale without waiting, and on scale down will delete all pods at once.

**replicas**

`int`

replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template, but individual replicas also have a consistent identity. If unspecified, defaults to 1. TODO: Consider a rename of this field.

**revisionHistoryLimit**

`int`

revisionHistoryLimit is the maximum number of revisions that will be maintained in the StatefulSet&#39;s revision history. The revision history consists of all revisions not represented by a currently applied StatefulSetSpec version. The default value is 10.

**selector** *required*

`AppsKruiseIoV1beta1StatefulSetSpecSelector`

selector

**serviceName**

`str`

serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where &#34;pod-specific-string&#34; is managed by the StatefulSet controller.

**template** *required*

`any`

template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet.

**updateStrategy**

`AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategy`

update strategy

**volumeClaimTemplates**

`[]`

volumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name. TODO: Define the behavior if a claim already exists with the same name.

### Schema AppsKruiseIoV1beta1StatefulSetSpecSelector

selector is a label query over pods that should match the replica count. It must match the pod template&#39;s labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1beta1StatefulSetSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### Schema AppsKruiseIoV1beta1StatefulSetSpecSelectorMatchExpressionsItems0

A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.

#### Attributes

**key** *required*

`str`

key is the label key that the selector applies to.

**operator** *required*

`str`

operator represents a key&#39;s relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.

**values**

`[str]`

values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategy

updateStrategy indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.

#### Attributes

**rollingUpdate**

`AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdate`

rolling update

**type**

`str`

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdate

RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.

#### Attributes

**inPlaceUpdateStrategy**

`AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy`

in place update strategy

**maxUnavailable**

`int`

The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. Also, maxUnavailable can just be allowed to work with Parallel podManagementPolicy. Defaults to 1.

**minReadySeconds**

`int`

MinReadySeconds indicates how long will the pod be considered ready after it&#39;s updated. MinReadySeconds works with both OrderedReady and Parallel podManagementPolicy. It affects the pod scale up speed when the podManagementPolicy is set to be OrderedReady. Combined with MaxUnavailable, it affects the pod update speed regardless of podManagementPolicy. Default value is 0, max is 300.

**partition**

`int`

Partition indicates the ordinal at which the StatefulSet should be partitioned by default. But if unorderedUpdate has been set:   - Partition indicates the number of pods with non-updated revisions when rolling update.   - It means controller will update $(replicas - partition) number of pod. Default value is 0.

**paused**

`bool`

Paused indicates that the StatefulSet is paused. Default value is false

**podUpdatePolicy**

`str`

PodUpdatePolicy indicates how pods should be updated Default value is &#34;ReCreate&#34;

**unorderedUpdate**

`AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdate`

unordered update

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy

InPlaceUpdateStrategy contains strategies for in-place update.

#### Attributes

**gracePeriodSeconds**

`int`

GracePeriodSeconds is the timespan between set Pod status to not-ready and update images in Pod spec when in-place update a Pod.

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdate

UnorderedUpdate contains strategies for non-ordered update. If it is not nil, pods will be updated with non-ordered sequence. Noted that UnorderedUpdate can only be allowed to work with Parallel podManagementPolicy

#### Attributes

**priorityStrategy**

`AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy`

priority strategy

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy

Priorities are the rules for calculating the priority of updating pods. Each pod to be updated, will pass through these terms and get a sum of weights.

#### Attributes

**orderPriority**

`[AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0]`

Order priority terms, pods will be sorted by the value of orderedKey. For example: ``` orderPriority: - orderedKey: key1 - orderedKey: key2 ``` First, all pods which have key1 in labels will be sorted by the value of key1. Then, the left pods which have no key1 but have key2 in labels will be sorted by the value of key2 and put behind those pods have key1.

**weightPriority**

`[AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0]`

Weight priority terms, pods will be sorted by the sum of all terms weight.

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0

UpdatePriorityOrder defines order priority.

#### Attributes

**orderedKey** *required*

`str`

Calculate priority by value of this key. Values of this key, will be sorted by GetInt(val). GetInt method will find the last int in value, such as getting 5 in value &#39;5&#39;, getting 10 in value &#39;sts-10&#39;.

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0

UpdatePriorityWeightTerm defines weight priority.

#### Attributes

**matchSelector** *required*

`AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector`

match selector

**weight** *required*

`int`

Weight associated with matching the corresponding matchExpressions, in the range 1-100.

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector

MatchSelector is used to select by pod&#39;s labels.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### Schema AppsKruiseIoV1beta1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0

A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.

#### Attributes

**key** *required*

`str`

key is the label key that the selector applies to.

**operator** *required*

`str`

operator represents a key&#39;s relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.

**values**

`[str]`

values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.

### Schema AppsKruiseIoV1beta1StatefulSetStatus

StatefulSetStatus defines the observed state of StatefulSet

#### Attributes

**availableReplicas** *required*

`int`

AvailableReplicas is the number of Pods created by the StatefulSet controller that have been ready for minReadySeconds.

**collisionCount**

`int`

collisionCount is the count of hash collisions for the StatefulSet. The StatefulSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.

**conditions**

`[]`

Represents the latest available observations of a statefulset&#39;s current state.

**currentReplicas** *required*

`int`

currentReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by currentRevision.

**currentRevision**

`str`

currentRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [0,currentReplicas).

**labelSelector**

`str`

LabelSelector is label selectors for query over pods that should match the replica count used by HPA.

**observedGeneration**

`int`

observedGeneration is the most recent generation observed for this StatefulSet. It corresponds to the StatefulSet&#39;s generation, which is updated on mutation by the API Server.

**readyReplicas** *required*

`int`

readyReplicas is the number of Pods created by the StatefulSet controller that have a Ready Condition.

**replicas** *required*

`int`

replicas is the number of Pods created by the StatefulSet controller.

**updateRevision**

`str`

updateRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [replicas-updatedReplicas,replicas)

**updatedReplicas** *required*

`int`

updatedReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by updateRevision.

### Schema StatefulSet

StatefulSet is the Schema for the statefulsets API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1beta1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"StatefulSet"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1beta1StatefulSetSpec`

spec

**status**

`AppsKruiseIoV1beta1StatefulSetStatus`

status

<!-- Auto generated by kcl-doc tool, please do not edit. -->
