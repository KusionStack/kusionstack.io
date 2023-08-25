# Package frontend

## Index

- [Job](#schema-job)
- [Server](#schema-server)
- [common](common/index.md)
  - [Metadata](common/index.md#schema-metadata)
- [configmap](configmap/index.md)
  - [ConfigMap](configmap/index.md#schema-configmap)
- [container](container/index.md)
  - [Main](container/index.md#schema-main)
  - [env](container/env/index.md)
    - [Env](container/env/index.md#schema-env)
    - [EnvFromSource](container/env/index.md#schema-envfromsource)
    - [EnvValueFrom](container/env/index.md#schema-envvaluefrom)
    - [ObjectFieldSelector](container/env/index.md#schema-objectfieldselector)
    - [ObjectKeySelector](container/env/index.md#schema-objectkeyselector)
    - [ResourceFieldSelector](container/env/index.md#schema-resourcefieldselector)
  - [lifecycle](container/lifecycle/index.md)
    - [Lifecycle](container/lifecycle/index.md#schema-lifecycle)
  - [port](container/port/index.md)
    - [ContainerPort](container/port/index.md#schema-containerport)
  - [probe](container/probe/index.md)
    - [Exec](container/probe/index.md#schema-exec)
    - [Http](container/probe/index.md#schema-http)
    - [Probe](container/probe/index.md#schema-probe)
    - [Tcp](container/probe/index.md#schema-tcp)
- [ingress](ingress/index.md)
  - [Ingress](ingress/index.md#schema-ingress)
- [rbac](rbac/index.md)
  - [ClusterRole](rbac/index.md#schema-clusterrole)
  - [ClusterRoleBinding](rbac/index.md#schema-clusterrolebinding)
  - [Role](rbac/index.md#schema-role)
  - [RoleBinding](rbac/index.md#schema-rolebinding)
- [resource](resource/index.md)
  - [Resource](resource/index.md#schema-resource)
  - [ResourceRequirements](resource/index.md#schema-resourcerequirements)
- [secret](secret/index.md)
  - [Secret](secret/index.md#schema-secret)
- [service](service/index.md)
  - [Service](service/index.md#schema-service)
- [serviceaccount](serviceaccount/index.md)
  - [ServiceAccount](serviceaccount/index.md#schema-serviceaccount)
- [sidecar](sidecar/index.md)
  - [Sidecar](sidecar/index.md#schema-sidecar)
  - [SimpleSidecar](sidecar/index.md#schema-simplesidecar)
- [storage](storage/index.md)
  - [DBAttr](storage/index.md#schema-dbattr)
  - [DataBase](storage/index.md#schema-database)
  - [ObjectStorage](storage/index.md#schema-objectstorage)
  - [StorageAttr](storage/index.md#schema-storageattr)
- [strategy](strategy/index.md)
  - [SchedulingStrategy](strategy/index.md#schema-schedulingstrategy)
- [volume](volume/index.md)
  - [CSI](volume/index.md#schema-csi)
  - [ConfigMap](volume/index.md#schema-configmap)
  - [DownwardAPI](volume/index.md#schema-downwardapi)
  - [EmptyDir](volume/index.md#schema-emptydir)
  - [FlexVolume](volume/index.md#schema-flexvolume)
  - [HostPath](volume/index.md#schema-hostpath)
  - [Mount](volume/index.md#schema-mount)
  - [Secret](volume/index.md#schema-secret)
  - [Volume](volume/index.md#schema-volume)


## Schemas

### Schema Job

Job is the common user interface for one-time jobs, which is defined by Kubernetes Job. Job supports reliable parallel execution of Pods.

#### Attributes

**activeDeadlineSeconds**

`int`

Specifies the duration in seconds relative to the startTime that the job may be active
before the system tries to terminate it; value must be positive integer

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata.
More info: http://kubernetes.io/docs/user-guide/annotations

**backoffLimit**

`int`

Specifies the number of retries before marking this job failed. Defaults to 6

**completionMode**

`"NonIndexed" | "Indexed"`

CompletionMode specifies how Pod completions are tracked. It can be `NonIndexed` (default) or `Indexed`.

**completions**

`int`

Specifies the desired number of successfully finished pods the job should be run with.
More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/

**configMaps**

`[ConfigMap]`

ConfigMaps is a list of ConfigMap which holds configuration data for server to consume.

**image** *required*

`str`

Container image name. More info: https://kubernetes.io/docs/concepts/containers/images

**initContainers**

`[Sidecar]`

InitContainers describes the list of sidecar container configuration that is expected to be run on the host.

**labels**

`{str:str}`

Labels is a map of string keys and values that can be used to organize and categorize (scope and select) objects.
More info: http://kubernetes.io/docs/user-guide/labels

**mainContainer** *required*

`Main`

MainContainer describes the main container configuration that is expected to be run on the host.

**manualSelector**

`bool`

manualSelector controls generation of pod labels and pod selectors.
More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/#specifying-your-own-pod-selector

**needNamespace**

`bool`

NeedNamespace mark server is namespace scoped or not.

**parallelism**

`int`

Specifies the maximum desired number of pods the job should run at any given time.
More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/

**podMetadata**

`ObjectMeta`

PodMetadata is metadata that all persisted resources must have, which includes all objects users must create.

**restartPolicy**

`"Never" | "OnFailure"`

Restart policy for all containers within the pod. One of Always, OnFailure, Never.
Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy

**schedulingStrategy**

`SchedulingStrategy`

SchedulingStrategy represents scheduling strategy.

**selector**

`{str:str}`

A label query over pods that should match the pod count.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

**serviceAccount**

`ServiceAccount`

ServiceAccount is used to run this pod.

**sidecarContainers**

`[Sidecar]`

SidecarContainers describes the list of sidecar container configuration that is expected to be run on the host.

**suspend**

`bool`

Suspend specifies whether the Job controller should create Pods or not.

**ttlSecondsAfterFinished**

`int`

ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed).

**volumes**

`[Volume]`

Volumes represents a named volume and corresponding mounts in containers.

### Schema Server

Server is abstaction of Deployment and StatefulSet.

#### Attributes

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata.
More info: http://kubernetes.io/docs/user-guide/annotations

**configMaps**

`[ConfigMap]`

ConfigMaps is a list of ConfigMap which holds configuration data for server to consume.

**database**

`DataBase`

**enableMonitoring**

`bool`

EnableMonitoring mark server is enable monitor or not.

**image** *required*

`str`

Container image name.
More info: https://kubernetes.io/docs/concepts/containers/images

**ingresses**

`[Ingress]`

Ingresses is a list of Ingress which is collection of rules that allow inbound connections to reach the endpoints defined by a backend.

**initContainers**

`[Sidecar]`

InitContainers describes the list of sidecar container configuration that is expected to be run on the host.

**labels**

`{str:str}`

Labels is a map of string keys and values that can be used to organize and categorize (scope and select) objects.
More info: http://kubernetes.io/docs/user-guide/labels

**mainContainer** *required*

`Main`

MainContainer describes the main container configuration that is expected to be run on the host.

**name**

`str`

The name of the workload and service.
If not defined, a generated name (&#34;{__META_APP_NAME}-{__META_ENV_TYPE_NAME}&#34;) will be used.
The value of __META_APP_NAME will be extracted from the value of the &#34;name&#34; defined in project.yaml,
and the value of __META_ENV_TYPE_NAME will be extracted from the value of the &#34;name&#34; defined in stack.yaml.

**needNamespace**

`bool`

NeedNamespace mark server is namespace scoped or not.

**podMetadata**

`ObjectMeta`

PodMetadata is metadata that all persisted resources must have, which includes all objects users must create.

**renderType**

`"Server" | "KubeVelaApplication"`

Application render type, default to &#39;Server&#39;

**replicas** *required*

`int`

Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.

**schedulingStrategy** *required*

`SchedulingStrategy`

SchedulingStrategy represents scheduling strategy.

**secrets**

`[Secret]`

Secrets is a list of Secret which hold secret data of a certain type.

**selector**

`{str:str}`

Label selector for pods. Existing ReplicaSets/ whose pods are selected by this will be the ones affected by this deployment.

**serviceAccount**

`ServiceAccount`

ServiceAccount is used to run this pod.

**services**

`[Service]`

Services is a list of Service which partition a single Kubernetes cluster into multiple virtual clusters.

**sidecarContainers**

`[Sidecar]`

SidecarContainers describes the list of sidecar container configuration that is expected to be run on the host.

**storage**

`ObjectStorage`

**useBuiltInLabels**

`bool`

UseBuiltInLabels indicates use built-in labels or not.

**useBuiltInSelector**

`bool`

UseBuiltInSelector indicates use built-in selector or not.

**volumes**

`[Volume]`

Volumes represents a named volume and corresponding mounts in containers.

**workloadType** *required*

`"Deployment" | "StatefulSet"`

Application workload type, default to &#39;Deployment&#39;

<!-- Auto generated by kcl-doc tool, please do not edit. -->
