# v1alpha1

## Index

- [AdvancedCronJob](#advancedcronjob)
- [AppsKruiseIoV1alpha1AdvancedCronJobSpec](#appskruiseiov1alpha1advancedcronjobspec)
- [AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplate](#appskruiseiov1alpha1advancedcronjobspectemplate)
- [AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplate](#appskruiseiov1alpha1advancedcronjobspectemplatebroadcastjobtemplate)
- [AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpec](#appskruiseiov1alpha1advancedcronjobspectemplatebroadcastjobtemplatespec)
- [AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpecCompletionPolicy](#appskruiseiov1alpha1advancedcronjobspectemplatebroadcastjobtemplatespeccompletionpolicy)
- [AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpecFailurePolicy](#appskruiseiov1alpha1advancedcronjobspectemplatebroadcastjobtemplatespecfailurepolicy)
- [AppsKruiseIoV1alpha1AdvancedCronJobStatus](#appskruiseiov1alpha1advancedcronjobstatus)
- [AppsKruiseIoV1alpha1BroadcastJobSpec](#appskruiseiov1alpha1broadcastjobspec)
- [AppsKruiseIoV1alpha1BroadcastJobSpecCompletionPolicy](#appskruiseiov1alpha1broadcastjobspeccompletionpolicy)
- [AppsKruiseIoV1alpha1BroadcastJobSpecFailurePolicy](#appskruiseiov1alpha1broadcastjobspecfailurepolicy)
- [AppsKruiseIoV1alpha1BroadcastJobStatus](#appskruiseiov1alpha1broadcastjobstatus)
- [AppsKruiseIoV1alpha1BroadcastJobStatusConditionsItems0](#appskruiseiov1alpha1broadcastjobstatusconditionsitems0)
- [AppsKruiseIoV1alpha1CloneSetSpec](#appskruiseiov1alpha1clonesetspec)
- [AppsKruiseIoV1alpha1CloneSetSpecLifecycle](#appskruiseiov1alpha1clonesetspeclifecycle)
- [AppsKruiseIoV1alpha1CloneSetSpecLifecycleInPlaceUpdate](#appskruiseiov1alpha1clonesetspeclifecycleinplaceupdate)
- [AppsKruiseIoV1alpha1CloneSetSpecLifecyclePreDelete](#appskruiseiov1alpha1clonesetspeclifecyclepredelete)
- [AppsKruiseIoV1alpha1CloneSetSpecScaleStrategy](#appskruiseiov1alpha1clonesetspecscalestrategy)
- [AppsKruiseIoV1alpha1CloneSetSpecSelector](#appskruiseiov1alpha1clonesetspecselector)
- [AppsKruiseIoV1alpha1CloneSetSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1clonesetspecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategy](#appskruiseiov1alpha1clonesetspecupdatestrategy)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyInPlaceUpdateStrategy](#appskruiseiov1alpha1clonesetspecupdatestrategyinplaceupdatestrategy)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategy](#appskruiseiov1alpha1clonesetspecupdatestrategyprioritystrategy)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyOrderPriorityItems0](#appskruiseiov1alpha1clonesetspecupdatestrategyprioritystrategyorderpriorityitems0)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0](#appskruiseiov1alpha1clonesetspecupdatestrategyprioritystrategyweightpriorityitems0)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelector](#appskruiseiov1alpha1clonesetspecupdatestrategyprioritystrategyweightpriorityitems0matchselector)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0](#appskruiseiov1alpha1clonesetspecupdatestrategyprioritystrategyweightpriorityitems0matchselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyScatterStrategyItems0](#appskruiseiov1alpha1clonesetspecupdatestrategyscatterstrategyitems0)
- [AppsKruiseIoV1alpha1CloneSetStatus](#appskruiseiov1alpha1clonesetstatus)
- [AppsKruiseIoV1alpha1CloneSetStatusConditionsItems0](#appskruiseiov1alpha1clonesetstatusconditionsitems0)
- [AppsKruiseIoV1alpha1ContainerRecreateRequestSpec](#appskruiseiov1alpha1containerrecreaterequestspec)
- [AppsKruiseIoV1alpha1ContainerRecreateRequestSpecContainersItems0](#appskruiseiov1alpha1containerrecreaterequestspeccontainersitems0)
- [AppsKruiseIoV1alpha1ContainerRecreateRequestSpecContainersItems0StatusContext](#appskruiseiov1alpha1containerrecreaterequestspeccontainersitems0statuscontext)
- [AppsKruiseIoV1alpha1ContainerRecreateRequestSpecStrategy](#appskruiseiov1alpha1containerrecreaterequestspecstrategy)
- [AppsKruiseIoV1alpha1ContainerRecreateRequestStatus](#appskruiseiov1alpha1containerrecreaterequeststatus)
- [AppsKruiseIoV1alpha1ContainerRecreateRequestStatusContainerRecreateStatesItems0](#appskruiseiov1alpha1containerrecreaterequeststatuscontainerrecreatestatesitems0)
- [AppsKruiseIoV1alpha1DaemonSetSpec](#appskruiseiov1alpha1daemonsetspec)
- [AppsKruiseIoV1alpha1DaemonSetSpecSelector](#appskruiseiov1alpha1daemonsetspecselector)
- [AppsKruiseIoV1alpha1DaemonSetSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1daemonsetspecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategy](#appskruiseiov1alpha1daemonsetspecupdatestrategy)
- [AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdate](#appskruiseiov1alpha1daemonsetspecupdatestrategyrollingupdate)
- [AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdateSelector](#appskruiseiov1alpha1daemonsetspecupdatestrategyrollingupdateselector)
- [AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdateSelectorMatchExpressionsItems0](#appskruiseiov1alpha1daemonsetspecupdatestrategyrollingupdateselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1DaemonSetStatus](#appskruiseiov1alpha1daemonsetstatus)
- [AppsKruiseIoV1alpha1DaemonSetStatusConditionsItems0](#appskruiseiov1alpha1daemonsetstatusconditionsitems0)
- [AppsKruiseIoV1alpha1ImagePullJobSpec](#appskruiseiov1alpha1imagepulljobspec)
- [AppsKruiseIoV1alpha1ImagePullJobSpecCompletionPolicy](#appskruiseiov1alpha1imagepulljobspeccompletionpolicy)
- [AppsKruiseIoV1alpha1ImagePullJobSpecPodSelector](#appskruiseiov1alpha1imagepulljobspecpodselector)
- [AppsKruiseIoV1alpha1ImagePullJobSpecPodSelectorMatchExpressionsItems0](#appskruiseiov1alpha1imagepulljobspecpodselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1ImagePullJobSpecPullPolicy](#appskruiseiov1alpha1imagepulljobspecpullpolicy)
- [AppsKruiseIoV1alpha1ImagePullJobSpecSelector](#appskruiseiov1alpha1imagepulljobspecselector)
- [AppsKruiseIoV1alpha1ImagePullJobSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1imagepulljobspecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1ImagePullJobStatus](#appskruiseiov1alpha1imagepulljobstatus)
- [AppsKruiseIoV1alpha1NodeImageSpec](#appskruiseiov1alpha1nodeimagespec)
- [AppsKruiseIoV1alpha1NodeImageSpecImagesAnon](#appskruiseiov1alpha1nodeimagespecimagesanon)
- [AppsKruiseIoV1alpha1NodeImageSpecImagesAnonPullSecretsItems0](#appskruiseiov1alpha1nodeimagespecimagesanonpullsecretsitems0)
- [AppsKruiseIoV1alpha1NodeImageSpecImagesAnonTagsItems0](#appskruiseiov1alpha1nodeimagespecimagesanontagsitems0)
- [AppsKruiseIoV1alpha1NodeImageSpecImagesAnonTagsItems0PullPolicy](#appskruiseiov1alpha1nodeimagespecimagesanontagsitems0pullpolicy)
- [AppsKruiseIoV1alpha1NodeImageStatus](#appskruiseiov1alpha1nodeimagestatus)
- [AppsKruiseIoV1alpha1NodeImageStatusFirstSyncStatus](#appskruiseiov1alpha1nodeimagestatusfirstsyncstatus)
- [AppsKruiseIoV1alpha1NodeImageStatusImageStatusesAnon](#appskruiseiov1alpha1nodeimagestatusimagestatusesanon)
- [AppsKruiseIoV1alpha1NodeImageStatusImageStatusesAnonTagsItems0](#appskruiseiov1alpha1nodeimagestatusimagestatusesanontagsitems0)
- [AppsKruiseIoV1alpha1SidecarSetSpec](#appskruiseiov1alpha1sidecarsetspec)
- [AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0](#appskruiseiov1alpha1sidecarsetspeccontainersitems0)
- [AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0ShareVolumePolicy](#appskruiseiov1alpha1sidecarsetspeccontainersitems0sharevolumepolicy)
- [AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0TransferEnvItems0](#appskruiseiov1alpha1sidecarsetspeccontainersitems0transferenvitems0)
- [AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0UpgradeStrategy](#appskruiseiov1alpha1sidecarsetspeccontainersitems0upgradestrategy)
- [AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0](#appskruiseiov1alpha1sidecarsetspecinitcontainersitems0)
- [AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0ShareVolumePolicy](#appskruiseiov1alpha1sidecarsetspecinitcontainersitems0sharevolumepolicy)
- [AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0TransferEnvItems0](#appskruiseiov1alpha1sidecarsetspecinitcontainersitems0transferenvitems0)
- [AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0UpgradeStrategy](#appskruiseiov1alpha1sidecarsetspecinitcontainersitems0upgradestrategy)
- [AppsKruiseIoV1alpha1SidecarSetSpecSelector](#appskruiseiov1alpha1sidecarsetspecselector)
- [AppsKruiseIoV1alpha1SidecarSetSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1sidecarsetspecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategy](#appskruiseiov1alpha1sidecarsetspecupdatestrategy)
- [AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategyScatterStrategyItems0](#appskruiseiov1alpha1sidecarsetspecupdatestrategyscatterstrategyitems0)
- [AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategySelector](#appskruiseiov1alpha1sidecarsetspecupdatestrategyselector)
- [AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategySelectorMatchExpressionsItems0](#appskruiseiov1alpha1sidecarsetspecupdatestrategyselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1SidecarSetStatus](#appskruiseiov1alpha1sidecarsetstatus)
- [AppsKruiseIoV1alpha1StatefulSetSpec](#appskruiseiov1alpha1statefulsetspec)
- [AppsKruiseIoV1alpha1StatefulSetSpecSelector](#appskruiseiov1alpha1statefulsetspecselector)
- [AppsKruiseIoV1alpha1StatefulSetSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1statefulsetspecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategy](#appskruiseiov1alpha1statefulsetspecupdatestrategy)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdate](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdate)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdateinplaceupdatestrategy)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdate](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdateunorderedupdate)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategy)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyorderpriorityitems0)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0matchselector)
- [AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0](#appskruiseiov1alpha1statefulsetspecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0matchselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1StatefulSetStatus](#appskruiseiov1alpha1statefulsetstatus)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpec](#appskruiseiov1alpha1uniteddeploymentspec)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecSelector](#appskruiseiov1alpha1uniteddeploymentspecselector)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1uniteddeploymentspecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplate](#appskruiseiov1alpha1uniteddeploymentspectemplate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplate](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpec](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespec)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecSelector](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecselector)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategy](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdate](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdateinplaceupdatestrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdate](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdateunorderedupdate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdateunorderedupdateprioritystrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdateunorderedupdateprioritystrategyorderpriorityitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0matchselector)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateadvancedstatefulsettemplatespecupdatestrategyrollingupdateunorderedupdateprioritystrategyweightpriorityitems0matchselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplate](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpec](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespec)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecycle](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespeclifecycle)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecycleInPlaceUpdate](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespeclifecycleinplaceupdate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecyclePreDelete](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespeclifecyclepredelete)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecScaleStrategy](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecscalestrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecSelector](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecselector)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecSelectorMatchExpressionsItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategy](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyInPlaceUpdateStrategy](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategyinplaceupdatestrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategy](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategyprioritystrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyOrderPriorityItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategyprioritystrategyorderpriorityitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategyprioritystrategyweightpriorityitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelector](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategyprioritystrategyweightpriorityitems0matchselector)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategyprioritystrategyweightpriorityitems0matchselectormatchexpressionsitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyScatterStrategyItems0](#appskruiseiov1alpha1uniteddeploymentspectemplateclonesettemplatespecupdatestrategyscatterstrategyitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateDeploymentTemplate](#appskruiseiov1alpha1uniteddeploymentspectemplatedeploymenttemplate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateStatefulSetTemplate](#appskruiseiov1alpha1uniteddeploymentspectemplatestatefulsettemplate)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTopology](#appskruiseiov1alpha1uniteddeploymentspectopology)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecTopologySubsetsItems0](#appskruiseiov1alpha1uniteddeploymentspectopologysubsetsitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecUpdateStrategy](#appskruiseiov1alpha1uniteddeploymentspecupdatestrategy)
- [AppsKruiseIoV1alpha1UnitedDeploymentSpecUpdateStrategyManualUpdate](#appskruiseiov1alpha1uniteddeploymentspecupdatestrategymanualupdate)
- [AppsKruiseIoV1alpha1UnitedDeploymentStatus](#appskruiseiov1alpha1uniteddeploymentstatus)
- [AppsKruiseIoV1alpha1UnitedDeploymentStatusConditionsItems0](#appskruiseiov1alpha1uniteddeploymentstatusconditionsitems0)
- [AppsKruiseIoV1alpha1UnitedDeploymentStatusUpdateStatus](#appskruiseiov1alpha1uniteddeploymentstatusupdatestatus)
- [BroadcastJob](#broadcastjob)
- [CloneSet](#cloneset)
- [ContainerRecreateRequest](#containerrecreaterequest)
- [DaemonSet](#daemonset)
- [ImagePullJob](#imagepulljob)
- [NodeImage](#nodeimage)
- [SidecarSet](#sidecarset)
- [StatefulSet](#statefulset)
- [UnitedDeployment](#uniteddeployment)


## Schemas

### AdvancedCronJob

AdvancedCronJob is the Schema for the advancedcronjobs API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"AdvancedCronJob"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1AdvancedCronJobSpec`

spec

**status**

`AppsKruiseIoV1alpha1AdvancedCronJobStatus`

status

### AppsKruiseIoV1alpha1AdvancedCronJobSpec

AdvancedCronJobSpec defines the desired state of AdvancedCronJob

#### Attributes

**concurrencyPolicy**

`"Allow" | "Forbid" | "Replace"`

Specifies how to treat concurrent executions of a Job. Valid values are: - &#34;Allow&#34; (default): allows CronJobs to run concurrently; - &#34;Forbid&#34;: forbids concurrent runs, skipping next run if previous run hasn&#39;t finished yet; - &#34;Replace&#34;: cancels currently running job and replaces it with a new one

**failedJobsHistoryLimit**

`int`

The number of failed finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified.

**paused**

`bool`

Paused will pause the cron job.

**schedule** *required*

`str`

The schedule in Cron format, see https://en.wikipedia.org/wiki/Cron.

**startingDeadlineSeconds**

`int`

Optional deadline in seconds for starting the job if it misses scheduled time for any reason.  Missed jobs executions will be counted as failed ones.

**successfulJobsHistoryLimit**

`int`

The number of successful finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified.

**template** *required*

`AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplate`

template

### AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplate

Specifies the job that will be created when executing a CronJob.

#### Attributes

**broadcastJobTemplate**

`AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplate`

broadcast job template

**jobTemplate**

`any`

Specifies the job that will be created when executing a CronJob.

### AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplate

Specifies the broadcastjob that will be created when executing a BroadcastCronJob.

#### Attributes

**metadata**

`any`

Standard object&#39;s metadata of the jobs created from this template.

**spec**

`AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpec`

spec

### AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpec

Specification of the desired behavior of the broadcastjob.

#### Attributes

**completionPolicy**

`AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpecCompletionPolicy`

completion policy

**failurePolicy**

`AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpecFailurePolicy`

failure policy

**parallelism**

`int`

Parallelism specifies the maximum desired number of pods the job should run at any given time. The actual number of pods running in steady state will be less than this number when the work left to do is less than max parallelism. Not setting this value means no limit.

**paused**

`bool`

Paused will pause the job.

**template** *required*

`any`

Template describes the pod that will be created when executing a job.

### AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpecCompletionPolicy

CompletionPolicy indicates the completion policy of the job. Default is Always CompletionPolicyType

#### Attributes

**activeDeadlineSeconds**

`int`

ActiveDeadlineSeconds specifies the duration in seconds relative to the startTime that the job may be active before the system tries to terminate it; value must be positive integer. Only works for Always type.

**ttlSecondsAfterFinished**

`int`

ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won&#39;t be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes. This field is alpha-level and is only honored by servers that enable the TTLAfterFinished feature. Only works for Always type

**type**

`str`

### AppsKruiseIoV1alpha1AdvancedCronJobSpecTemplateBroadcastJobTemplateSpecFailurePolicy

FailurePolicy indicates the behavior of the job, when failed pod is found.

#### Attributes

**restartLimit**

`int`

RestartLimit specifies the number of retries before marking the pod failed.

**type**

`str`

### AppsKruiseIoV1alpha1AdvancedCronJobStatus

AdvancedCronJobStatus defines the observed state of AdvancedCronJob

#### Attributes

**active**

`[]`

A list of pointers to currently running jobs.

**lastScheduleTime**

`str`

Information when was the last time the job was successfully scheduled.

**type**

`str`

### AppsKruiseIoV1alpha1BroadcastJobSpec

BroadcastJobSpec defines the desired state of BroadcastJob

#### Attributes

**completionPolicy**

`AppsKruiseIoV1alpha1BroadcastJobSpecCompletionPolicy`

completion policy

**failurePolicy**

`AppsKruiseIoV1alpha1BroadcastJobSpecFailurePolicy`

failure policy

**parallelism**

`int`

Parallelism specifies the maximum desired number of pods the job should run at any given time. The actual number of pods running in steady state will be less than this number when the work left to do is less than max parallelism. Not setting this value means no limit.

**paused**

`bool`

Paused will pause the job.

**template** *required*

`any`

Template describes the pod that will be created when executing a job.

### AppsKruiseIoV1alpha1BroadcastJobSpecCompletionPolicy

CompletionPolicy indicates the completion policy of the job. Default is Always CompletionPolicyType

#### Attributes

**activeDeadlineSeconds**

`int`

ActiveDeadlineSeconds specifies the duration in seconds relative to the startTime that the job may be active before the system tries to terminate it; value must be positive integer. Only works for Always type.

**ttlSecondsAfterFinished**

`int`

ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won&#39;t be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes. This field is alpha-level and is only honored by servers that enable the TTLAfterFinished feature. Only works for Always type

**type**

`str`

### AppsKruiseIoV1alpha1BroadcastJobSpecFailurePolicy

FailurePolicy indicates the behavior of the job, when failed pod is found.

#### Attributes

**restartLimit**

`int`

RestartLimit specifies the number of retries before marking the pod failed.

**type**

`str`

### AppsKruiseIoV1alpha1BroadcastJobStatus

BroadcastJobStatus defines the observed state of BroadcastJob

#### Attributes

**active**

`int`

The number of actively running pods.

**completionTime**

`str`

Represents time when the job was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.

**conditions**

`[AppsKruiseIoV1alpha1BroadcastJobStatusConditionsItems0]`

The latest available observations of an object&#39;s current state.

**desired**

`int`

The desired number of pods, this is typically equal to the number of nodes satisfied to run pods.

**failed**

`int`

The number of pods which reached phase Failed.

**phase**

`str`

The phase of the job.

**startTime**

`str`

Represents time when the job was acknowledged by the job controller. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.

**succeeded**

`int`

The number of pods which reached phase Succeeded.

### AppsKruiseIoV1alpha1BroadcastJobStatusConditionsItems0

JobCondition describes current state of a job.

#### Attributes

**lastProbeTime**

`str`

Last time the condition was checked.

**lastTransitionTime**

`str`

Last time the condition transit from one status to another.

**message**

`str`

Human readable message indicating details about last transition.

**reason**

`str`

(brief) reason for the condition&#39;s last transition.

**status** *required*

`str`

Status of the condition, one of True, False, Unknown.

**type** *required*

`str`

### AppsKruiseIoV1alpha1CloneSetSpec

CloneSetSpec defines the desired state of CloneSet

#### Attributes

**lifecycle**

`AppsKruiseIoV1alpha1CloneSetSpecLifecycle`

lifecycle

**minReadySeconds**

`int`

Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)

**replicas**

`int`

Replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template. If unspecified, defaults to 1.

**revisionHistoryLimit**

`int`

RevisionHistoryLimit is the maximum number of revisions that will be maintained in the CloneSet&#39;s revision history. The revision history consists of all revisions not represented by a currently applied CloneSetSpec version. The default value is 10.

**scaleStrategy**

`AppsKruiseIoV1alpha1CloneSetSpecScaleStrategy`

scale strategy

**selector** *required*

`AppsKruiseIoV1alpha1CloneSetSpecSelector`

selector

**template** *required*

`any`

Template describes the pods that will be created.

**updateStrategy**

`AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategy`

update strategy

**volumeClaimTemplates**

`[]`

VolumeClaimTemplates is a list of claims that pods are allowed to reference. Note that PVC will be deleted when its pod has been deleted.

### AppsKruiseIoV1alpha1CloneSetSpecLifecycle

Lifecycle defines the lifecycle hooks for Pods pre-delete, in-place update.

#### Attributes

**inPlaceUpdate**

`AppsKruiseIoV1alpha1CloneSetSpecLifecycleInPlaceUpdate`

in place update

**preDelete**

`AppsKruiseIoV1alpha1CloneSetSpecLifecyclePreDelete`

pre delete

### AppsKruiseIoV1alpha1CloneSetSpecLifecycleInPlaceUpdate

InPlaceUpdate is the hook before Pod to update and after Pod has been updated.

#### Attributes

**finalizersHandler**

`[str]`

finalizers handler

**labelsHandler**

`{str:str}`

labels handler

### AppsKruiseIoV1alpha1CloneSetSpecLifecyclePreDelete

PreDelete is the hook before Pod to be deleted.

#### Attributes

**finalizersHandler**

`[str]`

finalizers handler

**labelsHandler**

`{str:str}`

labels handler

### AppsKruiseIoV1alpha1CloneSetSpecScaleStrategy

ScaleStrategy indicates the ScaleStrategy that will be employed to create and delete Pods in the CloneSet.

#### Attributes

**podsToDelete**

`[str]`

PodsToDelete is the names of Pod should be deleted. Note that this list will be truncated for non-existing pod names.

### AppsKruiseIoV1alpha1CloneSetSpecSelector

Selector is a label query over pods that should match the replica count. It must match the pod template&#39;s labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1CloneSetSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1CloneSetSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategy

UpdateStrategy indicates the UpdateStrategy that will be employed to update Pods in the CloneSet when a revision is made to Template.

#### Attributes

**inPlaceUpdateStrategy**

`AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyInPlaceUpdateStrategy`

in place update strategy

**maxSurge**

`int`

The maximum number of pods that can be scheduled above the desired replicas during update or specified delete. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up. Defaults to 0.

**maxUnavailable**

`int`

The maximum number of pods that can be unavailable during update or scale. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up by default. When maxSurge &gt; 0, absolute number is calculated from percentage by rounding down. Defaults to 20%.

**partition**

`int`

Partition is the desired number of pods in old revisions. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up by default. It means when partition is set during pods updating, (replicas - partition value) number of pods will be updated. Default value is 0.

**paused**

`bool`

Paused indicates that the CloneSet is paused. Default value is false

**priorityStrategy**

`AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategy`

priority strategy

**scatterStrategy**

`[AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyScatterStrategyItems0]`

ScatterStrategy defines the scatter rules to make pods been scattered when update. This will avoid pods with the same key-value to be updated in one batch. - Note that pods will be scattered after priority sort. So, although priority strategy and scatter strategy can be applied together, we suggest to use either one of them. - If scatterStrategy is used, we suggest to just use one term. Otherwise, the update order can be hard to understand.

**type**

`str`

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyInPlaceUpdateStrategy

InPlaceUpdateStrategy contains strategies for in-place update.

#### Attributes

**gracePeriodSeconds**

`int`

GracePeriodSeconds is the timespan between set Pod status to not-ready and update images in Pod spec when in-place update a Pod.

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategy

Priorities are the rules for calculating the priority of updating pods. Each pod to be updated, will pass through these terms and get a sum of weights.

#### Attributes

**orderPriority**

`[AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyOrderPriorityItems0]`

Order priority terms, pods will be sorted by the value of orderedKey. For example: ``` orderPriority: - orderedKey: key1 - orderedKey: key2 ``` First, all pods which have key1 in labels will be sorted by the value of key1. Then, the left pods which have no key1 but have key2 in labels will be sorted by the value of key2 and put behind those pods have key1.

**weightPriority**

`[AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0]`

Weight priority terms, pods will be sorted by the sum of all terms weight.

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyOrderPriorityItems0

UpdatePriorityOrder defines order priority.

#### Attributes

**orderedKey** *required*

`str`

Calculate priority by value of this key. Values of this key, will be sorted by GetInt(val). GetInt method will find the last int in value, such as getting 5 in value &#39;5&#39;, getting 10 in value &#39;sts-10&#39;.

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0

UpdatePriorityWeightTerm defines weight priority.

#### Attributes

**matchSelector** *required*

`AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelector`

match selector

**weight** *required*

`int`

Weight associated with matching the corresponding matchExpressions, in the range 1-100.

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelector

MatchSelector is used to select by pod&#39;s labels.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1CloneSetSpecUpdateStrategyScatterStrategyItems0

apps kruise io v1alpha1 clone set spec update strategy scatter strategy items0

#### Attributes

**key** *required*

`str`

key

**value** *required*

`str`

value

### AppsKruiseIoV1alpha1CloneSetStatus

CloneSetStatus defines the observed state of CloneSet

#### Attributes

**availableReplicas** *required*

`int`

AvailableReplicas is the number of Pods created by the CloneSet controller that have a Ready Condition for at least minReadySeconds.

**collisionCount**

`int`

CollisionCount is the count of hash collisions for the CloneSet. The CloneSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.

**conditions**

`[AppsKruiseIoV1alpha1CloneSetStatusConditionsItems0]`

Conditions represents the latest available observations of a CloneSet&#39;s current state.

**currentRevision**

`str`

currentRevision, if not empty, indicates the current revision version of the CloneSet.

**labelSelector**

`str`

LabelSelector is label selectors for query over pods that should match the replica count used by HPA.

**observedGeneration**

`int`

ObservedGeneration is the most recent generation observed for this CloneSet. It corresponds to the CloneSet&#39;s generation, which is updated on mutation by the API Server.

**readyReplicas** *required*

`int`

ReadyReplicas is the number of Pods created by the CloneSet controller that have a Ready Condition.

**replicas** *required*

`int`

Replicas is the number of Pods created by the CloneSet controller.

**updateRevision**

`str`

UpdateRevision, if not empty, indicates the latest revision of the CloneSet.

**updatedReadyReplicas** *required*

`int`

UpdatedReadyReplicas is the number of Pods created by the CloneSet controller from the CloneSet version indicated by updateRevision and have a Ready Condition.

**updatedReplicas** *required*

`int`

UpdatedReplicas is the number of Pods created by the CloneSet controller from the CloneSet version indicated by updateRevision.

### AppsKruiseIoV1alpha1CloneSetStatusConditionsItems0

CloneSetCondition describes the state of a CloneSet at a certain point.

#### Attributes

**lastTransitionTime**

`str`

Last time the condition transitioned from one status to another.

**message**

`str`

A human readable message indicating details about the transition.

**reason**

`str`

The reason for the condition&#39;s last transition.

**status** *required*

`str`

Status of the condition, one of True, False, Unknown.

**type** *required*

`str`

### AppsKruiseIoV1alpha1ContainerRecreateRequestSpec

ContainerRecreateRequestSpec defines the desired state of ContainerRecreateRequest

#### Attributes

**activeDeadlineSeconds**

`int`

ActiveDeadlineSeconds is the deadline duration of this ContainerRecreateRequest.

**containers** *required*

`[AppsKruiseIoV1alpha1ContainerRecreateRequestSpecContainersItems0]`

Containers contains the containers that need to recreate in the Pod.

**podName** *required*

`str`

PodName is name of the Pod that owns the recreated containers.

**strategy**

`AppsKruiseIoV1alpha1ContainerRecreateRequestSpecStrategy`

strategy

**ttlSecondsAfterFinished**

`int`

TTLSecondsAfterFinished is the TTL duration after this ContainerRecreateRequest has completed.

### AppsKruiseIoV1alpha1ContainerRecreateRequestSpecContainersItems0

ContainerRecreateRequestContainer defines the container that need to recreate.

#### Attributes

**name** *required*

`str`

Name of the container that need to recreate. It must be existing in the real pod.Spec.Containers.

**ports**

`[]`

Ports is synced from the real container in Pod spec during this ContainerRecreateRequest creating. Populated by the system. Read-only.

**preStop**

`any`

PreStop is synced from the real container in Pod spec during this ContainerRecreateRequest creating. Populated by the system. Read-only.

**statusContext**

`AppsKruiseIoV1alpha1ContainerRecreateRequestSpecContainersItems0StatusContext`

status context

### AppsKruiseIoV1alpha1ContainerRecreateRequestSpecContainersItems0StatusContext

StatusContext is synced from the real Pod status during this ContainerRecreateRequest creating. Populated by the system. Read-only.

#### Attributes

**containerID** *required*

`str`

Container&#39;s ID in the format &#39;docker://&lt;container_id&gt;&#39;.

**restartCount** *required*

`int`

The number of times the container has been restarted, currently based on the number of dead containers that have not yet been removed. Note that this is calculated from dead containers. But those containers are subject to garbage collection. This value will get capped at 5 by GC.

### AppsKruiseIoV1alpha1ContainerRecreateRequestSpecStrategy

Strategy defines strategies for containers recreation.

#### Attributes

**failurePolicy**

`str`

FailurePolicy decides whether to continue if one container fails to recreate

**minStartedSeconds**

`int`

Minimum number of seconds for which a newly created container should be started and ready without any of its container crashing, for it to be considered Succeeded. Defaults to 0 (container will be considered Succeeded as soon as it is started and ready)

**orderedRecreate**

`bool`

OrderedRecreate indicates whether to recreate the next container only if the previous one has recreated completely.

**terminationGracePeriodSeconds**

`int`

TerminationGracePeriodSeconds is the optional duration in seconds to wait the container terminating gracefully. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, we will use pod.Spec.TerminationGracePeriodSeconds as default value.

**unreadyGracePeriodSeconds**

`int`

UnreadyGracePeriodSeconds is the optional duration in seconds to mark Pod as not ready over this duration before executing preStop hook and stopping the container.

### AppsKruiseIoV1alpha1ContainerRecreateRequestStatus

ContainerRecreateRequestStatus defines the observed state of ContainerRecreateRequest

#### Attributes

**completionTime**

`str`

Represents time when the ContainerRecreateRequest was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.

**containerRecreateStates**

`[AppsKruiseIoV1alpha1ContainerRecreateRequestStatusContainerRecreateStatesItems0]`

ContainerRecreateStates contains the recreation states of the containers.

**message**

`str`

A human readable message indicating details about this ContainerRecreateRequest.

**phase** *required*

`str`

Phase of this ContainerRecreateRequest, e.g. Pending, Recreating, Completed

### AppsKruiseIoV1alpha1ContainerRecreateRequestStatusContainerRecreateStatesItems0

ContainerRecreateRequestContainerRecreateState contains the recreation state of the container.

#### Attributes

**message**

`str`

A human readable message indicating details about this state.

**name** *required*

`str`

Name of the container.

**phase** *required*

`str`

Phase indicates the recreation phase of the container.

### AppsKruiseIoV1alpha1DaemonSetSpec

DaemonSetSpec defines the desired state of DaemonSet

#### Attributes

**burstReplicas**

`int`

BurstReplicas is a rate limiter for booting pods on a lot of pods. The default value is 250

**minReadySeconds**

`int`

The minimum number of seconds for which a newly created DaemonSet pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready).

**revisionHistoryLimit**

`int`

The number of old history to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.

**selector** *required*

`AppsKruiseIoV1alpha1DaemonSetSpecSelector`

selector

**template** *required*

`any`

An object that describes the pod that will be created. The DaemonSet will create exactly one copy of this pod on every node that matches the template&#39;s node selector (or on every node if no node selector is specified). More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template

**updateStrategy**

`AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategy`

update strategy

### AppsKruiseIoV1alpha1DaemonSetSpecSelector

A label query over pods that are managed by the daemon set. Must match in order to be controlled. It must match the pod template&#39;s labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1DaemonSetSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1DaemonSetSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategy

An update strategy to replace existing DaemonSet pods with new pods.

#### Attributes

**rollingUpdate**

`AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdate`

rolling update

**type**

`str`

### AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdate

Rolling update config params. Present only if type = &#34;RollingUpdate&#34;.

#### Attributes

**maxSurge**

`int`

Only when type=SurgingRollingUpdateType, it works. The maximum number of DaemonSet pods that can be scheduled above the desired number of pods during the update. Value can be an absolute number (ex: 5) or a percentage of the total number of DaemonSet pods at the start of the update (ex: 10%). The absolute number is calculated from the percentage by rounding up. This cannot be 0. The default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have 2 pods running at any given time. The update starts by starting replacements for at most 30% of those DaemonSet pods. Once the new pods are available it then stops the existing pods before proceeding onto other DaemonSet pods, thus ensuring that at most 130% of the desired final number of DaemonSet  pods are running at all times during the update.

**maxUnavailable**

`int`

The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0. Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.

**partition**

`int`

The number of DaemonSet pods remained to be old version. Default value is 0. Maximum value is status.DesiredNumberScheduled, which means no pod will be updated.

**paused**

`bool`

Indicates that the daemon set is paused and will not be processed by the daemon set controller.

**rollingUpdateType**

`str`

Type is to specify which kind of rollingUpdate.

**selector**

`AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdateSelector`

selector

### AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdateSelector

A label query over nodes that are managed by the daemon set RollingUpdate. Must match in order to be controlled. It must match the node&#39;s labels.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdateSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1DaemonSetSpecUpdateStrategyRollingUpdateSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1DaemonSetStatus

DaemonSetStatus defines the observed state of DaemonSet

#### Attributes

**collisionCount**

`int`

Count of hash collisions for the DaemonSet. The DaemonSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.

**conditions**

`[AppsKruiseIoV1alpha1DaemonSetStatusConditionsItems0]`

Represents the latest available observations of a DaemonSet&#39;s current state.

**currentNumberScheduled** *required*

`int`

The number of nodes that are running at least 1 daemon pod and are supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/

**daemonSetHash** *required*

`str`

DaemonSetHash is the controller-revision-hash, which represents the latest version of the DaemonSet.

**desiredNumberScheduled** *required*

`int`

The total number of nodes that should be running the daemon pod (including nodes correctly running the daemon pod). More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/

**numberAvailable**

`int`

The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available (ready for at least spec.minReadySeconds)

**numberMisscheduled** *required*

`int`

The number of nodes that are running the daemon pod, but are not supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/

**numberReady** *required*

`int`

The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready.

**numberUnavailable**

`int`

The number of nodes that should be running the daemon pod and have none of the daemon pod running and available (ready for at least spec.minReadySeconds)

**observedGeneration**

`int`

The most recent generation observed by the daemon set controller.

**updatedNumberScheduled** *required*

`int`

The total number of nodes that are running updated daemon pod

### AppsKruiseIoV1alpha1DaemonSetStatusConditionsItems0

DaemonSetCondition describes the state of a DaemonSet at a certain point.

#### Attributes

**lastTransitionTime**

`str`

Last time the condition transitioned from one status to another.

**message**

`str`

A human readable message indicating details about the transition.

**reason**

`str`

The reason for the condition&#39;s last transition.

**status** *required*

`str`

Status of the condition, one of True, False, Unknown.

**type** *required*

`str`

### AppsKruiseIoV1alpha1ImagePullJobSpec

ImagePullJobSpec defines the desired state of ImagePullJob

#### Attributes

**completionPolicy** *required*

`AppsKruiseIoV1alpha1ImagePullJobSpecCompletionPolicy`

completion policy

**image** *required*

`str`

Image is the image to be pulled by the job

**parallelism**

`int`

Parallelism is the requested parallelism, it can be set to any non-negative value. If it is unspecified, it defaults to 1. If it is specified as 0, then the Job is effectively paused until it is increased.

**podSelector**

`AppsKruiseIoV1alpha1ImagePullJobSpecPodSelector`

pod selector

**pullPolicy**

`AppsKruiseIoV1alpha1ImagePullJobSpecPullPolicy`

pull policy

**pullSecrets**

`[str]`

ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling the image. If specified, these secrets will be passed to individual puller implementations for them to use.  For example, in the case of docker, only DockerConfig type secrets are honored.

**selector**

`AppsKruiseIoV1alpha1ImagePullJobSpecSelector`

selector

### AppsKruiseIoV1alpha1ImagePullJobSpecCompletionPolicy

CompletionPolicy indicates the completion policy of the job. Default is Always CompletionPolicyType.

#### Attributes

**activeDeadlineSeconds**

`int`

ActiveDeadlineSeconds specifies the duration in seconds relative to the startTime that the job may be active before the system tries to terminate it; value must be positive integer. Only works for Always type.

**ttlSecondsAfterFinished**

`int`

ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won&#39;t be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes. This field is alpha-level and is only honored by servers that enable the TTLAfterFinished feature. Only works for Always type

**type**

`str`

### AppsKruiseIoV1alpha1ImagePullJobSpecPodSelector

PodSelector is a query over pods that should pull image on nodes of these pods. Mutually exclusive with Selector.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1ImagePullJobSpecPodSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1ImagePullJobSpecPodSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1ImagePullJobSpecPullPolicy

PullPolicy is an optional field to set parameters of the pulling task. If not specified, the system will use the default values.

#### Attributes

**backoffLimit**

`int`

Specifies the number of retries before marking the pulling task failed. Defaults to 3

**timeoutSeconds**

`int`

Specifies the timeout of the pulling task. Defaults to 600

### AppsKruiseIoV1alpha1ImagePullJobSpecSelector

Selector is a query over nodes that should match the job. nil to match all nodes.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1ImagePullJobSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

**names**

`[str]`

Names specify a set of nodes to execute the job.

### AppsKruiseIoV1alpha1ImagePullJobSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1ImagePullJobStatus

ImagePullJobStatus defines the observed state of ImagePullJob

#### Attributes

**active**

`int`

The number of actively running pulling tasks.

**completionTime**

`str`

Represents time when the job was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.

**desired** *required*

`int`

The desired number of pulling tasks, this is typically equal to the number of nodes satisfied.

**failed**

`int`

The number of pulling tasks  which reached phase Failed.

**failedNodes**

`[str]`

The nodes that failed to pull the image.

**message**

`str`

The text prompt for job running status.

**startTime**

`str`

Represents time when the job was acknowledged by the job controller. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.

**succeeded**

`int`

The number of pulling tasks which reached phase Succeeded.

### AppsKruiseIoV1alpha1NodeImageSpec

NodeImageSpec defines the desired state of NodeImage

#### Attributes

**images**

`{str:AppsKruiseIoV1alpha1NodeImageSpecImagesAnon}`

Specifies images to be pulled on this node It can not be more than 256 for each NodeImage

### AppsKruiseIoV1alpha1NodeImageSpecImagesAnon

ImageSpec defines the pulling spec of an image

#### Attributes

**pullSecrets**

`[AppsKruiseIoV1alpha1NodeImageSpecImagesAnonPullSecretsItems0]`

PullSecrets is an optional list of references to secrets in the same namespace to use for pulling the image. If specified, these secrets will be passed to individual puller implementations for them to use.  For example, in the case of docker, only DockerConfig type secrets are honored.

**tags** *required*

`[AppsKruiseIoV1alpha1NodeImageSpecImagesAnonTagsItems0]`

Tags is a list of versions of this image

### AppsKruiseIoV1alpha1NodeImageSpecImagesAnonPullSecretsItems0

ReferenceObject comprises a resource name, with a mandatory namespace, rendered as &#34;&lt;namespace&gt;/&lt;name&gt;&#34;.

#### Attributes

**name**

`str`

name

**namespace**

`str`

namespace

### AppsKruiseIoV1alpha1NodeImageSpecImagesAnonTagsItems0

ImageTagSpec defines the pulling spec of an image tag

#### Attributes

**createdAt**

`str`

Specifies the create time of this tag

**ownerReferences**

`[]`

List of objects depended by this object. If this image is managed by a controller, then an entry in this list will point to this controller.

**pullPolicy**

`AppsKruiseIoV1alpha1NodeImageSpecImagesAnonTagsItems0PullPolicy`

pull policy

**tag** *required*

`str`

Specifies the image tag

**version**

`int`

An opaque value that represents the internal version of this tag that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server.  Populated by the system. Read-only. Value must be treated as opaque by clients and .

### AppsKruiseIoV1alpha1NodeImageSpecImagesAnonTagsItems0PullPolicy

PullPolicy is an optional field to set parameters of the pulling task. If not specified, the system will use the default values.

#### Attributes

**activeDeadlineSeconds**

`int`

ActiveDeadlineSeconds specifies the duration in seconds relative to the startTime that the task may be active before the system tries to terminate it; value must be positive integer. if not specified, the system will never terminate it.

**backoffLimit**

`int`

Specifies the number of retries before marking the pulling task failed. Defaults to 3

**timeoutSeconds**

`int`

Specifies the timeout of the pulling task. Defaults to 600

**ttlSecondsAfterFinished**

`int`

TTLSecondsAfterFinished limits the lifetime of a pulling task that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the task finishes, it is eligible to be automatically deleted. If this field is unset, the task won&#39;t be automatically deleted. If this field is set to zero, the task becomes eligible to be deleted immediately after it finishes.

### AppsKruiseIoV1alpha1NodeImageStatus

NodeImageStatus defines the observed state of NodeImage

#### Attributes

**desired** *required*

`int`

The desired number of pulling tasks, this is typically equal to the number of images in spec.

**failed**

`int`

The number of pulling tasks  which reached phase Failed.

**firstSyncStatus**

`AppsKruiseIoV1alpha1NodeImageStatusFirstSyncStatus`

first sync status

**imageStatuses**

`{str:AppsKruiseIoV1alpha1NodeImageStatusImageStatusesAnon}`

all statuses of active image pulling tasks

**pulling**

`int`

The number of pulling tasks which are not finished.

**succeeded**

`int`

The number of pulling tasks which reached phase Succeeded.

### AppsKruiseIoV1alpha1NodeImageStatusFirstSyncStatus

The first of all job has finished on this node. When a node is added to the cluster, we want to know the time when the node&#39;s image pulling is completed, and use it to trigger the operation of the upper system.

#### Attributes

**message**

`str`

message

**status**

`str`

SyncStatusPhase defines the node status

**syncAt**

`str`

sync at

### AppsKruiseIoV1alpha1NodeImageStatusImageStatusesAnon

ImageStatus defines the pulling status of an image

#### Attributes

**tags** *required*

`[AppsKruiseIoV1alpha1NodeImageStatusImageStatusesAnonTagsItems0]`

Represents statuses of pulling tasks on this node

### AppsKruiseIoV1alpha1NodeImageStatusImageStatusesAnonTagsItems0

ImageTagStatus defines the pulling status of an image tag

#### Attributes

**completionTime**

`str`

Represents time when the pulling task was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.

**imageID**

`str`

Represents the ID of this image.

**message**

`str`

Represents the summary informations of this node

**phase** *required*

`str`

Represents the image pulling task phase.

**progress**

`int`

Represents the pulling progress of this tag, which is beetween 0-100. There is no guarantee of monotonic consistency, and it may be a rollback due to retry during pulling.

**startTime**

`str`

Represents time when the pulling task was acknowledged by the image puller. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.

**tag** *required*

`str`

Represents the image tag.

**version**

`int`

Represents the internal version of this tag that the daemon handled.

### AppsKruiseIoV1alpha1SidecarSetSpec

SidecarSetSpec defines the desired state of SidecarSet

#### Attributes

**containers**

`[AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0]`

Containers is the list of sidecar containers to be injected into the selected pod

**initContainers**

`[AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0]`

Containers is the list of init containers to be injected into the selected pod We will inject those containers by their name in ascending order We only inject init containers when a new pod is created, it does not apply to any existing pod

**namespace**

`str`

Namespace sidecarSet will only match the pods in the namespace otherwise, match pods in all namespaces(in cluster)

**selector**

`AppsKruiseIoV1alpha1SidecarSetSpecSelector`

selector

**updateStrategy**

`AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategy`

update strategy

**volumes**

`[]`

List of volumes that can be mounted by sidecar containers

### AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0

SidecarContainer defines the container of Sidecar

#### Attributes

**podInjectPolicy**

`str`

The rules that injected SidecarContainer into Pod.spec.containers, not takes effect in initContainers If BeforeAppContainer, the SidecarContainer will be injected in front of the pod.spec.containers otherwise it will be injected into the back. default BeforeAppContainerType

**shareVolumePolicy**

`AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0ShareVolumePolicy`

share volume policy

**transferEnv**

`[AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0TransferEnvItems0]`

TransferEnv will transfer env info from other container SourceContainerName is pod.spec.container[x].name; EnvName is pod.spec.container[x].Env.name

**upgradeStrategy**

`AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0UpgradeStrategy`

upgrade strategy

### AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0ShareVolumePolicy

If ShareVolumePolicy is enabled, the sidecar container will share the other container&#39;s VolumeMounts in the pod(don&#39;t contains the injected sidecar container).

#### Attributes

**type**

`str`

### AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0TransferEnvItems0

apps kruise io v1alpha1 sidecar set spec containers items0 transfer env items0

#### Attributes

**envName**

`str`

env name

**sourceContainerName**

`str`

source container name

### AppsKruiseIoV1alpha1SidecarSetSpecContainersItems0UpgradeStrategy

sidecarContainer upgrade strategy, include: ColdUpgrade, HotUpgrade

#### Attributes

**hotUpgradeEmptyImage**

`str`

when HotUpgrade, HotUpgradeEmptyImage is used to complete the hot upgrading process HotUpgradeEmptyImage is consistent of sidecar container in Command, Args, Liveness probe, etc. but it does no actual work.

**upgradeType**

`str`

when sidecar container is stateless, use ColdUpgrade otherwise HotUpgrade are more HotUpgrade. examples for istio envoy container is suitable for HotUpgrade default is ColdUpgrade

### AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0

SidecarContainer defines the container of Sidecar

#### Attributes

**podInjectPolicy**

`str`

The rules that injected SidecarContainer into Pod.spec.containers, not takes effect in initContainers If BeforeAppContainer, the SidecarContainer will be injected in front of the pod.spec.containers otherwise it will be injected into the back. default BeforeAppContainerType

**shareVolumePolicy**

`AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0ShareVolumePolicy`

share volume policy

**transferEnv**

`[AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0TransferEnvItems0]`

TransferEnv will transfer env info from other container SourceContainerName is pod.spec.container[x].name; EnvName is pod.spec.container[x].Env.name

**upgradeStrategy**

`AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0UpgradeStrategy`

upgrade strategy

### AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0ShareVolumePolicy

If ShareVolumePolicy is enabled, the sidecar container will share the other container&#39;s VolumeMounts in the pod(don&#39;t contains the injected sidecar container).

#### Attributes

**type**

`str`

### AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0TransferEnvItems0

apps kruise io v1alpha1 sidecar set spec init containers items0 transfer env items0

#### Attributes

**envName**

`str`

env name

**sourceContainerName**

`str`

source container name

### AppsKruiseIoV1alpha1SidecarSetSpecInitContainersItems0UpgradeStrategy

sidecarContainer upgrade strategy, include: ColdUpgrade, HotUpgrade

#### Attributes

**hotUpgradeEmptyImage**

`str`

when HotUpgrade, HotUpgradeEmptyImage is used to complete the hot upgrading process HotUpgradeEmptyImage is consistent of sidecar container in Command, Args, Liveness probe, etc. but it does no actual work.

**upgradeType**

`str`

when sidecar container is stateless, use ColdUpgrade otherwise HotUpgrade are more HotUpgrade. examples for istio envoy container is suitable for HotUpgrade default is ColdUpgrade

### AppsKruiseIoV1alpha1SidecarSetSpecSelector

selector is a label query over pods that should be injected

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1SidecarSetSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1SidecarSetSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategy

The sidecarset updateStrategy to use to replace existing pods with new ones.

#### Attributes

**maxUnavailable**

`int`

The maximum number of SidecarSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of SidecarSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0. Default value is 1.

**partition**

`int`

Partition is the desired number of pods in old revisions. It means when partition is set during pods updating, (replicas - partition) number of pods will be updated. Default value is 0.

**paused**

`bool`

Paused indicates that the SidecarSet is paused to update the injected pods, but it don&#39;t affect the webhook inject sidecar container into the newly created pods. default is false

**scatterStrategy**

`[AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategyScatterStrategyItems0]`

ScatterStrategy defines the scatter rules to make pods been scattered when update. This will avoid pods with the same key-value to be updated in one batch. - Note that pods will be scattered after priority sort. So, although priority strategy and scatter strategy can be applied together, we suggest to use either one of them. - If scatterStrategy is used, we suggest to just use one term. Otherwise, the update order can be hard to understand.

**selector**

`AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategySelector`

selector

**type**

`str`

### AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategyScatterStrategyItems0

apps kruise io v1alpha1 sidecar set spec update strategy scatter strategy items0

#### Attributes

**key** *required*

`str`

key

**value** *required*

`str`

value

### AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategySelector

If selector is not nil, this upgrade will only update the selected pods.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategySelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1SidecarSetSpecUpdateStrategySelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1SidecarSetStatus

SidecarSetStatus defines the observed state of SidecarSet

#### Attributes

**matchedPods** *required*

`int`

matchedPods is the number of Pods whose labels are matched with this SidecarSet&#39;s selector and are created after sidecarset creates

**observedGeneration**

`int`

observedGeneration is the most recent generation observed for this SidecarSet. It corresponds to the SidecarSet&#39;s generation, which is updated on mutation by the API Server.

**readyPods** *required*

`int`

readyPods is the number of matched Pods that have a ready condition

**updatedPods** *required*

`int`

updatedPods is the number of matched Pods that are injected with the latest SidecarSet&#39;s containers

**updatedReadyPods**

`int`

updatedReadyPods is the number of matched pods that updated and ready

### AppsKruiseIoV1alpha1StatefulSetSpec

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

`AppsKruiseIoV1alpha1StatefulSetSpecSelector`

selector

**serviceName**

`str`

serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where &#34;pod-specific-string&#34; is managed by the StatefulSet controller.

**template** *required*

`any`

template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet.

**updateStrategy**

`AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategy`

update strategy

**volumeClaimTemplates**

`[]`

volumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name. TODO: Define the behavior if a claim already exists with the same name.

### AppsKruiseIoV1alpha1StatefulSetSpecSelector

selector is a label query over pods that should match the replica count. It must match the pod template&#39;s labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1StatefulSetSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1StatefulSetSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategy

updateStrategy indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.

#### Attributes

**rollingUpdate**

`AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdate`

rolling update

**type**

`str`

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdate

RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.

#### Attributes

**inPlaceUpdateStrategy**

`AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy`

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

`AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdate`

unordered update

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy

InPlaceUpdateStrategy contains strategies for in-place update.

#### Attributes

**gracePeriodSeconds**

`int`

GracePeriodSeconds is the timespan between set Pod status to not-ready and update images in Pod spec when in-place update a Pod.

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdate

UnorderedUpdate contains strategies for non-ordered update. If it is not nil, pods will be updated with non-ordered sequence. Noted that UnorderedUpdate can only be allowed to work with Parallel podManagementPolicy

#### Attributes

**priorityStrategy**

`AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy`

priority strategy

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy

Priorities are the rules for calculating the priority of updating pods. Each pod to be updated, will pass through these terms and get a sum of weights.

#### Attributes

**orderPriority**

`[AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0]`

Order priority terms, pods will be sorted by the value of orderedKey. For example: ``` orderPriority: - orderedKey: key1 - orderedKey: key2 ``` First, all pods which have key1 in labels will be sorted by the value of key1. Then, the left pods which have no key1 but have key2 in labels will be sorted by the value of key2 and put behind those pods have key1.

**weightPriority**

`[AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0]`

Weight priority terms, pods will be sorted by the sum of all terms weight.

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0

UpdatePriorityOrder defines order priority.

#### Attributes

**orderedKey** *required*

`str`

Calculate priority by value of this key. Values of this key, will be sorted by GetInt(val). GetInt method will find the last int in value, such as getting 5 in value &#39;5&#39;, getting 10 in value &#39;sts-10&#39;.

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0

UpdatePriorityWeightTerm defines weight priority.

#### Attributes

**matchSelector** *required*

`AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector`

match selector

**weight** *required*

`int`

Weight associated with matching the corresponding matchExpressions, in the range 1-100.

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector

MatchSelector is used to select by pod&#39;s labels.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1StatefulSetSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1StatefulSetStatus

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

### AppsKruiseIoV1alpha1UnitedDeploymentSpec

UnitedDeploymentSpec defines the desired state of UnitedDeployment.

#### Attributes

**replicas**

`int`

Replicas is the total desired replicas of all the subsets. If unspecified, defaults to 1.

**revisionHistoryLimit**

`int`

Indicates the number of histories to be conserved. If unspecified, defaults to 10.

**selector** *required*

`AppsKruiseIoV1alpha1UnitedDeploymentSpecSelector`

selector

**template**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplate`

template

**topology**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTopology`

topology

**updateStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecUpdateStrategy`

update strategy

### AppsKruiseIoV1alpha1UnitedDeploymentSpecSelector

Selector is a label query over pods that should match the replica count. It must match the pod template&#39;s labels.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplate

Template describes the subset that will be created.

#### Attributes

**advancedStatefulSetTemplate**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplate`

advanced stateful set template

**cloneSetTemplate**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplate`

clone set template

**deploymentTemplate**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateDeploymentTemplate`

deployment template

**statefulSetTemplate**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateStatefulSetTemplate`

stateful set template

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplate

AdvancedStatefulSet template

#### Attributes

**metadata**

`any`

metadata

**spec** *required*

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpec`

spec

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpec

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

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecSelector`

selector

**serviceName**

`str`

serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where &#34;pod-specific-string&#34; is managed by the StatefulSet controller.

**template** *required*

`any`

template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet.

**updateStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategy`

update strategy

**volumeClaimTemplates**

`[]`

volumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name. TODO: Define the behavior if a claim already exists with the same name.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecSelector

selector is a label query over pods that should match the replica count. It must match the pod template&#39;s labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategy

updateStrategy indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.

#### Attributes

**rollingUpdate**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdate`

rolling update

**type**

`str`

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdate

RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.

#### Attributes

**inPlaceUpdateStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy`

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

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdate`

unordered update

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateInPlaceUpdateStrategy

InPlaceUpdateStrategy contains strategies for in-place update.

#### Attributes

**gracePeriodSeconds**

`int`

GracePeriodSeconds is the timespan between set Pod status to not-ready and update images in Pod spec when in-place update a Pod.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdate

UnorderedUpdate contains strategies for non-ordered update. If it is not nil, pods will be updated with non-ordered sequence. Noted that UnorderedUpdate can only be allowed to work with Parallel podManagementPolicy

#### Attributes

**priorityStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy`

priority strategy

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategy

Priorities are the rules for calculating the priority of updating pods. Each pod to be updated, will pass through these terms and get a sum of weights.

#### Attributes

**orderPriority**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0]`

Order priority terms, pods will be sorted by the value of orderedKey. For example: ``` orderPriority: - orderedKey: key1 - orderedKey: key2 ``` First, all pods which have key1 in labels will be sorted by the value of key1. Then, the left pods which have no key1 but have key2 in labels will be sorted by the value of key2 and put behind those pods have key1.

**weightPriority**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0]`

Weight priority terms, pods will be sorted by the sum of all terms weight.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyOrderPriorityItems0

UpdatePriorityOrder defines order priority.

#### Attributes

**orderedKey** *required*

`str`

Calculate priority by value of this key. Values of this key, will be sorted by GetInt(val). GetInt method will find the last int in value, such as getting 5 in value &#39;5&#39;, getting 10 in value &#39;sts-10&#39;.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0

UpdatePriorityWeightTerm defines weight priority.

#### Attributes

**matchSelector** *required*

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector`

match selector

**weight** *required*

`int`

Weight associated with matching the corresponding matchExpressions, in the range 1-100.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelector

MatchSelector is used to select by pod&#39;s labels.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateAdvancedStatefulSetTemplateSpecUpdateStrategyRollingUpdateUnorderedUpdatePriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplate

CloneSet template

#### Attributes

**metadata**

`any`

metadata

**spec** *required*

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpec`

spec

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpec

CloneSetSpec defines the desired state of CloneSet

#### Attributes

**lifecycle**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecycle`

lifecycle

**minReadySeconds**

`int`

Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)

**replicas**

`int`

Replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template. If unspecified, defaults to 1.

**revisionHistoryLimit**

`int`

RevisionHistoryLimit is the maximum number of revisions that will be maintained in the CloneSet&#39;s revision history. The revision history consists of all revisions not represented by a currently applied CloneSetSpec version. The default value is 10.

**scaleStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecScaleStrategy`

scale strategy

**selector** *required*

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecSelector`

selector

**template** *required*

`any`

Template describes the pods that will be created.

**updateStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategy`

update strategy

**volumeClaimTemplates**

`[]`

VolumeClaimTemplates is a list of claims that pods are allowed to reference. Note that PVC will be deleted when its pod has been deleted.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecycle

Lifecycle defines the lifecycle hooks for Pods pre-delete, in-place update.

#### Attributes

**inPlaceUpdate**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecycleInPlaceUpdate`

in place update

**preDelete**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecyclePreDelete`

pre delete

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecycleInPlaceUpdate

InPlaceUpdate is the hook before Pod to update and after Pod has been updated.

#### Attributes

**finalizersHandler**

`[str]`

finalizers handler

**labelsHandler**

`{str:str}`

labels handler

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecLifecyclePreDelete

PreDelete is the hook before Pod to be deleted.

#### Attributes

**finalizersHandler**

`[str]`

finalizers handler

**labelsHandler**

`{str:str}`

labels handler

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecScaleStrategy

ScaleStrategy indicates the ScaleStrategy that will be employed to create and delete Pods in the CloneSet.

#### Attributes

**podsToDelete**

`[str]`

PodsToDelete is the names of Pod should be deleted. Note that this list will be truncated for non-existing pod names.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecSelector

Selector is a label query over pods that should match the replica count. It must match the pod template&#39;s labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategy

UpdateStrategy indicates the UpdateStrategy that will be employed to update Pods in the CloneSet when a revision is made to Template.

#### Attributes

**inPlaceUpdateStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyInPlaceUpdateStrategy`

in place update strategy

**maxSurge**

`int`

The maximum number of pods that can be scheduled above the desired replicas during update or specified delete. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up. Defaults to 0.

**maxUnavailable**

`int`

The maximum number of pods that can be unavailable during update or scale. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up by default. When maxSurge &gt; 0, absolute number is calculated from percentage by rounding down. Defaults to 20%.

**partition**

`int`

Partition is the desired number of pods in old revisions. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up by default. It means when partition is set during pods updating, (replicas - partition value) number of pods will be updated. Default value is 0.

**paused**

`bool`

Paused indicates that the CloneSet is paused. Default value is false

**priorityStrategy**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategy`

priority strategy

**scatterStrategy**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyScatterStrategyItems0]`

ScatterStrategy defines the scatter rules to make pods been scattered when update. This will avoid pods with the same key-value to be updated in one batch. - Note that pods will be scattered after priority sort. So, although priority strategy and scatter strategy can be applied together, we suggest to use either one of them. - If scatterStrategy is used, we suggest to just use one term. Otherwise, the update order can be hard to understand.

**type**

`str`

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyInPlaceUpdateStrategy

InPlaceUpdateStrategy contains strategies for in-place update.

#### Attributes

**gracePeriodSeconds**

`int`

GracePeriodSeconds is the timespan between set Pod status to not-ready and update images in Pod spec when in-place update a Pod.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategy

Priorities are the rules for calculating the priority of updating pods. Each pod to be updated, will pass through these terms and get a sum of weights.

#### Attributes

**orderPriority**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyOrderPriorityItems0]`

Order priority terms, pods will be sorted by the value of orderedKey. For example: ``` orderPriority: - orderedKey: key1 - orderedKey: key2 ``` First, all pods which have key1 in labels will be sorted by the value of key1. Then, the left pods which have no key1 but have key2 in labels will be sorted by the value of key2 and put behind those pods have key1.

**weightPriority**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0]`

Weight priority terms, pods will be sorted by the sum of all terms weight.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyOrderPriorityItems0

UpdatePriorityOrder defines order priority.

#### Attributes

**orderedKey** *required*

`str`

Calculate priority by value of this key. Values of this key, will be sorted by GetInt(val). GetInt method will find the last int in value, such as getting 5 in value &#39;5&#39;, getting 10 in value &#39;sts-10&#39;.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0

UpdatePriorityWeightTerm defines weight priority.

#### Attributes

**matchSelector** *required*

`AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelector`

match selector

**weight** *required*

`int`

Weight associated with matching the corresponding matchExpressions, in the range 1-100.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelector

MatchSelector is used to select by pod&#39;s labels.

#### Attributes

**matchExpressions**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0]`

matchExpressions is a list of label selector requirements. The requirements are ANDed.

**matchLabels**

`{str:str}`

matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is &#34;key&#34;, the operator is &#34;In&#34;, and the values array contains only &#34;value&#34;. The requirements are ANDed.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyPriorityStrategyWeightPriorityItems0MatchSelectorMatchExpressionsItems0

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

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateCloneSetTemplateSpecUpdateStrategyScatterStrategyItems0

apps kruise io v1alpha1 united deployment spec template clone set template spec update strategy scatter strategy items0

#### Attributes

**key** *required*

`str`

key

**value** *required*

`str`

value

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateDeploymentTemplate

Deployment template

#### Attributes

**metadata**

`any`

metadata

**spec** *required*

`any`

DeploymentSpec is the specification of the desired behavior of the Deployment.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTemplateStatefulSetTemplate

StatefulSet template

#### Attributes

**metadata**

`any`

metadata

**spec** *required*

`any`

A StatefulSetSpec is the specification of a StatefulSet.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTopology

Topology describes the pods distribution detail between each of subsets.

#### Attributes

**subsets**

`[AppsKruiseIoV1alpha1UnitedDeploymentSpecTopologySubsetsItems0]`

Contains the details of each subset. Each element in this array represents one subset which will be provisioned and managed by UnitedDeployment.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecTopologySubsetsItems0

Subset defines the detail of a subset.

#### Attributes

**name** *required*

`str`

Indicates subset name as a DNS_LABEL, which will be used to generate subset workload name prefix in the format &#39;&lt;deployment-name&gt;-&lt;subset-name&gt;-&#39;. Name should be unique between all of the subsets under one UnitedDeployment.

**nodeSelectorTerm**

`any`

Indicates the node selector to form the subset. Depending on the node selector, pods provisioned could be distributed across multiple groups of nodes. A subset&#39;s nodeSelectorTerm is not allowed to be updated.

**replicas**

`int`

Indicates the number of the pod to be created under this subset. Replicas could also be percentage like &#39;10%&#39;, which means 10% of UnitedDeployment replicas of pods will be distributed under this subset. If nil, the number of replicas in this subset is determined by controller. Controller will try to keep all the subsets with nil replicas have average pods.

**tolerations**

`[]`

Indicates the tolerations the pods under this subset have. A subset&#39;s tolerations is not allowed to be updated.

### AppsKruiseIoV1alpha1UnitedDeploymentSpecUpdateStrategy

UpdateStrategy indicates the strategy the UnitedDeployment use to preform the update, when template is changed.

#### Attributes

**manualUpdate**

`AppsKruiseIoV1alpha1UnitedDeploymentSpecUpdateStrategyManualUpdate`

manual update

**type**

`str`

### AppsKruiseIoV1alpha1UnitedDeploymentSpecUpdateStrategyManualUpdate

Includes all of the parameters a Manual update strategy needs.

#### Attributes

**partitions**

`{str:int}`

Indicates number of subset partition.

### AppsKruiseIoV1alpha1UnitedDeploymentStatus

UnitedDeploymentStatus defines the observed state of UnitedDeployment.

#### Attributes

**collisionCount**

`int`

Count of hash collisions for the UnitedDeployment. The UnitedDeployment controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.

**conditions**

`[AppsKruiseIoV1alpha1UnitedDeploymentStatusConditionsItems0]`

Represents the latest available observations of a UnitedDeployment&#39;s current state.

**currentRevision** *required*

`str`

CurrentRevision, if not empty, indicates the current version of the UnitedDeployment.

**observedGeneration**

`int`

ObservedGeneration is the most recent generation observed for this UnitedDeployment. It corresponds to the UnitedDeployment&#39;s generation, which is updated on mutation by the API Server.

**readyReplicas**

`int`

The number of ready replicas.

**replicas** *required*

`int`

Replicas is the most recently observed number of replicas.

**subsetReplicas**

`{str:int}`

Records the topology detail information of the replicas of each subset.

**updateStatus**

`AppsKruiseIoV1alpha1UnitedDeploymentStatusUpdateStatus`

update status

**updatedReadyReplicas**

`int`

The number of ready current revision replicas for this UnitedDeployment.

**updatedReplicas** *required*

`int`

The number of pods in current version.

### AppsKruiseIoV1alpha1UnitedDeploymentStatusConditionsItems0

UnitedDeploymentCondition describes current state of a UnitedDeployment.

#### Attributes

**lastTransitionTime**

`str`

Last time the condition transitioned from one status to another.

**message**

`str`

A human readable message indicating details about the transition.

**reason**

`str`

The reason for the condition&#39;s last transition.

**status**

`str`

Status of the condition, one of True, False, Unknown.

**type**

`str`

### AppsKruiseIoV1alpha1UnitedDeploymentStatusUpdateStatus

Records the information of update progress.

#### Attributes

**currentPartitions**

`{str:int}`

Records the current partition.

**updatedRevision**

`str`

Records the latest revision.

### BroadcastJob

BroadcastJob is the Schema for the broadcastjobs API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"BroadcastJob"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1BroadcastJobSpec`

spec

**status**

`AppsKruiseIoV1alpha1BroadcastJobStatus`

status

### CloneSet

CloneSet is the Schema for the clonesets API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"CloneSet"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1CloneSetSpec`

spec

**status**

`AppsKruiseIoV1alpha1CloneSetStatus`

status

### ContainerRecreateRequest

ContainerRecreateRequest is the Schema for the containerrecreaterequests API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"ContainerRecreateRequest"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1ContainerRecreateRequestSpec`

spec

**status**

`AppsKruiseIoV1alpha1ContainerRecreateRequestStatus`

status

### DaemonSet

DaemonSet is the Schema for the daemonsets API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"DaemonSet"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1DaemonSetSpec`

spec

**status**

`AppsKruiseIoV1alpha1DaemonSetStatus`

status

### ImagePullJob

ImagePullJob is the Schema for the imagepulljobs API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"ImagePullJob"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1ImagePullJobSpec`

spec

**status**

`AppsKruiseIoV1alpha1ImagePullJobStatus`

status

### NodeImage

NodeImage is the Schema for the nodeimages API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"NodeImage"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1NodeImageSpec`

spec

**status**

`AppsKruiseIoV1alpha1NodeImageStatus`

status

### SidecarSet

SidecarSet is the Schema for the sidecarsets API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"SidecarSet"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1SidecarSetSpec`

spec

**status**

`AppsKruiseIoV1alpha1SidecarSetStatus`

status

### StatefulSet

StatefulSet is the Schema for the statefulsets API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"StatefulSet"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1StatefulSetSpec`

spec

**status**

`AppsKruiseIoV1alpha1StatefulSetStatus`

status

### UnitedDeployment

UnitedDeployment is the Schema for the uniteddeployments API

#### Attributes

**apiVersion** *required* *readOnly*

`"apps.kruise.io/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"UnitedDeployment"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec**

`AppsKruiseIoV1alpha1UnitedDeploymentSpec`

spec

**status**

`AppsKruiseIoV1alpha1UnitedDeploymentStatus`

status

<!-- Auto generated by kcl-doc tool, please do not edit. -->
