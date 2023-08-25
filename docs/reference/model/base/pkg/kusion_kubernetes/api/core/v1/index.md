# Package v1

## Index

- [AWSElasticBlockStoreVolumeSource](#schema-awselasticblockstorevolumesource)
- [Affinity](#schema-affinity)
- [AzureDiskVolumeSource](#schema-azurediskvolumesource)
- [AzureFileVolumeSource](#schema-azurefilevolumesource)
- [CSIVolumeSource](#schema-csivolumesource)
- [Capabilities](#schema-capabilities)
- [CephFSVolumeSource](#schema-cephfsvolumesource)
- [CinderVolumeSource](#schema-cindervolumesource)
- [ClientIPConfig](#schema-clientipconfig)
- [ConfigMap](#schema-configmap)
- [ConfigMapEnvSource](#schema-configmapenvsource)
- [ConfigMapKeySelector](#schema-configmapkeyselector)
- [ConfigMapNodeConfigSource](#schema-configmapnodeconfigsource)
- [ConfigMapProjection](#schema-configmapprojection)
- [ConfigMapVolumeSource](#schema-configmapvolumesource)
- [Container](#schema-container)
- [ContainerPort](#schema-containerport)
- [DownwardAPIProjection](#schema-downwardapiprojection)
- [DownwardAPIVolumeFile](#schema-downwardapivolumefile)
- [DownwardAPIVolumeSource](#schema-downwardapivolumesource)
- [EmptyDirVolumeSource](#schema-emptydirvolumesource)
- [EnvFromSource](#schema-envfromsource)
- [EnvVar](#schema-envvar)
- [EnvVarSource](#schema-envvarsource)
- [EphemeralContainer](#schema-ephemeralcontainer)
- [EphemeralVolumeSource](#schema-ephemeralvolumesource)
- [ExecAction](#schema-execaction)
- [FCVolumeSource](#schema-fcvolumesource)
- [FlexVolumeSource](#schema-flexvolumesource)
- [FlockerVolumeSource](#schema-flockervolumesource)
- [GCEPersistentDiskVolumeSource](#schema-gcepersistentdiskvolumesource)
- [GitRepoVolumeSource](#schema-gitrepovolumesource)
- [GlusterfsVolumeSource](#schema-glusterfsvolumesource)
- [HTTPGetAction](#schema-httpgetaction)
- [HTTPHeader](#schema-httpheader)
- [Handler](#schema-handler)
- [HostAlias](#schema-hostalias)
- [HostPathVolumeSource](#schema-hostpathvolumesource)
- [ISCSIVolumeSource](#schema-iscsivolumesource)
- [KeyToPath](#schema-keytopath)
- [Lifecycle](#schema-lifecycle)
- [LocalObjectReference](#schema-localobjectreference)
- [NFSVolumeSource](#schema-nfsvolumesource)
- [Namespace](#schema-namespace)
- [NamespaceSpec](#schema-namespacespec)
- [Node](#schema-node)
- [NodeAffinity](#schema-nodeaffinity)
- [NodeConfigSource](#schema-nodeconfigsource)
- [NodeSelector](#schema-nodeselector)
- [NodeSelectorRequirement](#schema-nodeselectorrequirement)
- [NodeSelectorTerm](#schema-nodeselectorterm)
- [NodeSpec](#schema-nodespec)
- [ObjectFieldSelector](#schema-objectfieldselector)
- [ObjectReference](#schema-objectreference)
- [PersistentVolumeClaim](#schema-persistentvolumeclaim)
- [PersistentVolumeClaimSpec](#schema-persistentvolumeclaimspec)
- [PersistentVolumeClaimTemplate](#schema-persistentvolumeclaimtemplate)
- [PersistentVolumeClaimVolumeSource](#schema-persistentvolumeclaimvolumesource)
- [PhotonPersistentDiskVolumeSource](#schema-photonpersistentdiskvolumesource)
- [Pod](#schema-pod)
- [PodAffinity](#schema-podaffinity)
- [PodAffinityTerm](#schema-podaffinityterm)
- [PodAntiAffinity](#schema-podantiaffinity)
- [PodDNSConfig](#schema-poddnsconfig)
- [PodDNSConfigOption](#schema-poddnsconfigoption)
- [PodReadinessGate](#schema-podreadinessgate)
- [PodSecurityContext](#schema-podsecuritycontext)
- [PodSpec](#schema-podspec)
- [PodTemplateSpec](#schema-podtemplatespec)
- [PortworxVolumeSource](#schema-portworxvolumesource)
- [PreferredSchedulingTerm](#schema-preferredschedulingterm)
- [Probe](#schema-probe)
- [ProjectedVolumeSource](#schema-projectedvolumesource)
- [QuobyteVolumeSource](#schema-quobytevolumesource)
- [RBDVolumeSource](#schema-rbdvolumesource)
- [ResourceFieldSelector](#schema-resourcefieldselector)
- [ResourceRequirements](#schema-resourcerequirements)
- [SELinuxOptions](#schema-selinuxoptions)
- [ScaleIOVolumeSource](#schema-scaleiovolumesource)
- [SeccompProfile](#schema-seccompprofile)
- [Secret](#schema-secret)
- [SecretEnvSource](#schema-secretenvsource)
- [SecretKeySelector](#schema-secretkeyselector)
- [SecretProjection](#schema-secretprojection)
- [SecretVolumeSource](#schema-secretvolumesource)
- [SecurityContext](#schema-securitycontext)
- [Service](#schema-service)
- [ServiceAccount](#schema-serviceaccount)
- [ServiceAccountTokenProjection](#schema-serviceaccounttokenprojection)
- [ServicePort](#schema-serviceport)
- [ServiceSpec](#schema-servicespec)
- [SessionAffinityConfig](#schema-sessionaffinityconfig)
- [StorageOSVolumeSource](#schema-storageosvolumesource)
- [Sysctl](#schema-sysctl)
- [TCPSocketAction](#schema-tcpsocketaction)
- [Taint](#schema-taint)
- [Toleration](#schema-toleration)
- [TopologySpreadConstraint](#schema-topologyspreadconstraint)
- [TypedLocalObjectReference](#schema-typedlocalobjectreference)
- [Volume](#schema-volume)
- [VolumeDevice](#schema-volumedevice)
- [VolumeMount](#schema-volumemount)
- [VolumeProjection](#schema-volumeprojection)
- [VsphereVirtualDiskVolumeSource](#schema-vspherevirtualdiskvolumesource)
- [WeightedPodAffinityTerm](#schema-weightedpodaffinityterm)
- [WindowsSecurityContextOptions](#schema-windowssecuritycontextoptions)


## Schemas

### Schema AWSElasticBlockStoreVolumeSource

Represents a Persistent Disk resource in AWS. An AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.

#### Attributes

**fsType**

`str`

**partition**

`int`

**readOnly**

`bool`

**volumeID** *required*

`str`

### Schema Affinity

Affinity is a group of affinity scheduling rules.

#### Attributes

**nodeAffinity**

`NodeAffinity`

Describes node affinity scheduling rules for the pod.

**podAffinity**

`PodAffinity`

Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).

**podAntiAffinity**

`PodAntiAffinity`

Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).

### Schema AzureDiskVolumeSource

AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.

#### Attributes

**cachingMode**

`str`

Host Caching mode: None, Read Only, Read Write.

**diskName** *required*

`str`

The Name of the data disk in the blob storage

**diskURI** *required*

`str`

The URI the data disk in the blob storage

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified.

**kind**

`str`

Expected values Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to shared

**readOnly**

`bool`

Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

### Schema AzureFileVolumeSource

AzureFile represents an Azure File Service mount on the host and bind mount to the pod.

#### Attributes

**readOnly**

`bool`

Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

**secretName** *required*

`str`

the name of secret that contains Azure Storage Account Name and Key

**shareName** *required*

`str`

Share Name

### Schema CSIVolumeSource

Represents a source location of a volume to mount, managed by an external CSI driver

#### Attributes

**driver** *required*

`str`

Driver is the name of the CSI driver that handles this volume. Consult with your admin for the correct name as registered in the cluster.

**fsType**

`str`

Filesystem type to mount. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. If not provided, the empty value is passed to the associated CSI driver which will determine the default filesystem to apply.

**nodePublishSecretRef**

`LocalObjectReference`

NodePublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and  may be empty if no secret is required. If the secret object contains more than one secret, all secret references are passed.

**readOnly**

`bool`

Specifies a read-only configuration for the volume. Defaults to false (read/write).

**volumeAttributes**

`{str:str}`

VolumeAttributes stores driver-specific properties that are passed to the CSI driver. Consult your driver&#39;s documentation for supported values.

### Schema Capabilities

Adds and removes POSIX capabilities from running containers.

#### Attributes

**add**

`[str]`

Added capabilities

**drop**

`[str]`

Removed capabilities

### Schema CephFSVolumeSource

Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.

#### Attributes

**monitors** *required*

`[str]`

Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

**path**

`str`

Optional: Used as the mounted root, rather than the full Ceph tree, default is /

**readOnly**

`bool`

Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

**secretFile**

`str`

Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

**secretRef**

`LocalObjectReference`

Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

**user**

`str`

Optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

### Schema CinderVolumeSource

Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling.

#### Attributes

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

**readOnly**

`bool`

Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

**secretRef**

`LocalObjectReference`

Optional: points to a secret object containing parameters used to connect to OpenStack.

**volumeID** *required*

`str`

volume id used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

### Schema ClientIPConfig

ClientIPConfig represents the configurations of Client IP based session affinity.

#### Attributes

**timeoutSeconds**

`int`

timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be &gt;0 &amp;&amp; &lt;=86400(for 1 day) if ServiceAffinity == &#34;ClientIP&#34;. Default value is 10800(for 3 hours).

### Schema ConfigMap

ConfigMap holds configuration data for pods to consume.

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**binaryData**

`{str:str}`

BinaryData contains the binary data. Each key must consist of alphanumeric characters, &#39;-&#39;, &#39;_&#39; or &#39;.&#39;. BinaryData can contain byte sequences that are not in the UTF-8 range. The keys stored in BinaryData must not overlap with the ones in the Data field, this is enforced during validation process. Using this field will require 1.10+ apiserver and kubelet.

**data**

`{str:str}`

Data contains the configuration data. Each key must consist of alphanumeric characters, &#39;-&#39;, &#39;_&#39; or &#39;.&#39;. Values with non-UTF-8 byte sequences must use the BinaryData field. The keys stored in Data must not overlap with the keys in the BinaryData field, this is enforced during validation process.

**immutable**

`bool`

Immutable, if set to true, ensures that data stored in the ConfigMap cannot be updated (only object metadata can be modified). If not set to true, the field can be modified at any time. Defaulted to nil.

**kind** *required* *readOnly*

`"ConfigMap"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

### Schema ConfigMapEnvSource

ConfigMapEnvSource selects a ConfigMap to populate the environment variables with. The contents of the target ConfigMap&#39;s Data field will represent the key-value pairs as environment variables.

#### Attributes

**name**

`str`

**optional**

`bool`

### Schema ConfigMapKeySelector

Selects a key from a ConfigMap.

#### Attributes

**key** *required*

`str`

The key to select.

**name**

`str`

Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

**optional**

`bool`

Specify whether the ConfigMap or its key must be defined

### Schema ConfigMapNodeConfigSource

ConfigMapNodeConfigSource contains the information to reference a ConfigMap as a config source for the Node. This API is deprecated since 1.22: https://git.k8s.io/enhancements/keps/sig-node/281-dynamic-kubelet-configuration

#### Attributes

**kubeletConfigKey** *required*

`str`

KubeletConfigKey declares which key of the referenced ConfigMap corresponds to the KubeletConfiguration structure This field is required in all cases.

**name** *required*

`str`

Name is the metadata.name of the referenced ConfigMap. This field is required in all cases.

**namespace** *required*

`str`

Namespace is the metadata.namespace of the referenced ConfigMap. This field is required in all cases.

**resourceVersion**

`str`

ResourceVersion is the metadata.ResourceVersion of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.

**uid**

`str`

UID is the metadata.UID of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.

### Schema ConfigMapProjection

Adapts a ConfigMap into a projected volume. The contents of the target ConfigMap&#39;s Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.

#### Attributes

**items**

`[KeyToPath]`

**name**

`str`

**optional**

`bool`

### Schema ConfigMapVolumeSource

Adapts a ConfigMap into a volume. The contents of the target ConfigMap&#39;s Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. ConfigMap volumes support ownership management and SELinux relabeling.

#### Attributes

**defaultMode**

`int`

**items**

`[KeyToPath]`

**name**

`str`

**optional**

`bool`

### Schema Container

A single application container that you want to run within a pod.

#### Attributes

**args**

`[str]`

Arguments to the entrypoint. The docker image&#39;s CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container&#39;s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. &#34;$$(VAR_NAME)&#34; will produce the string literal &#34;$(VAR_NAME)&#34;. Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

**command**

`[str]`

Entrypoint array. Not executed within a shell. The docker image&#39;s ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container&#39;s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. &#34;$$(VAR_NAME)&#34; will produce the string literal &#34;$(VAR_NAME)&#34;. Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

**env**

`[EnvVar]`

List of environment variables to set in the container. Cannot be updated.

**envFrom**

`[EnvFromSource]`

List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.

**image**

`str`

Docker image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.

**imagePullPolicy**

`str`

Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images

**lifecycle**

`Lifecycle`

Actions that the management system should take in response to container lifecycle events. Cannot be updated.

**livenessProbe**

`Probe`

Periodic probe of container liveness. Container will be restarted if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

**name** *required*

`str`

Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.

**ports**

`[ContainerPort]`

List of ports to expose from the container. Exposing a port here gives the system additional information about the network connections a container uses, but is primarily informational. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default &#34;0.0.0.0&#34; address inside a container will be accessible from the network. Cannot be updated.

**readinessProbe**

`Probe`

Periodic probe of container service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

**resources**

`ResourceRequirements`

Compute Resources required by this container. Cannot be updated. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

**securityContext**

`SecurityContext`

SecurityContext defines the security options the container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext. More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

**startupProbe**

`Probe`

StartupProbe indicates that the Pod has successfully initialized. If specified, no other probes are executed until this completes successfully. If this probe fails, the Pod will be restarted, just as if the livenessProbe failed. This can be used to provide different probe parameters at the beginning of a Pod&#39;s lifecycle, when it might take a long time to load data or warm a cache, than during steady-state operation. This cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

**stdin**

`bool`

Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.

**stdinOnce**

`bool`

Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false

**terminationMessagePath**

`str`

Optional: Path at which the file to which the container&#39;s termination message will be written is mounted into the container&#39;s filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.

**terminationMessagePolicy**

`str`

Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.

**tty**

`bool`

Whether this container should allocate a TTY for itself, also requires &#39;stdin&#39; to be true. Default is false.

**volumeDevices**

`[VolumeDevice]`

volumeDevices is the list of block devices to be used by the container.

**volumeMounts**

`[VolumeMount]`

Pod volumes to mount into the container&#39;s filesystem. Cannot be updated.

**workingDir**

`str`

Container&#39;s working directory. If not specified, the container runtime&#39;s default will be used, which might be configured in the container image. Cannot be updated.

### Schema ContainerPort

ContainerPort represents a network port in a single container.

#### Attributes

**containerPort** *required*

`int`

Number of port to expose on the pod&#39;s IP address. This must be a valid port number, 0 &lt; x &lt; 65536.

**hostIP**

`str`

What host IP to bind the external port to.

**hostPort**

`int`

Number of port to expose on the host. If specified, this must be a valid port number, 0 &lt; x &lt; 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.

**name**

`str`

If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.

**protocol**

`str`

### Schema DownwardAPIProjection

Represents downward API info for projecting into a projected volume. Note that this is identical to a downwardAPI volume source without the default mode.

#### Attributes

**items**

`[DownwardAPIVolumeFile]`

Items is a list of DownwardAPIVolume file

### Schema DownwardAPIVolumeFile

DownwardAPIVolumeFile represents information to create the file containing the pod field

#### Attributes

**fieldRef**

`ObjectFieldSelector`

Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.

**mode**

`int`

Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

**path** *required*

`str`

Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the &#39;..&#39; path. Must be utf-8 encoded. The first item of the relative path must not start with &#39;..&#39;

**resourceFieldRef**

`ResourceFieldSelector`

Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.

### Schema DownwardAPIVolumeSource

DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.

#### Attributes

**defaultMode**

`int`

Optional: mode bits to use on created files by default. Must be a Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

**items**

`[DownwardAPIVolumeFile]`

Items is a list of downward API volume file

### Schema EmptyDirVolumeSource

Represents an empty directory for a pod. Empty directory volumes support ownership management and SELinux relabeling.

#### Attributes

**medium**

`str`

What type of storage medium should back this directory. The default is &#34;&#34; which means to use the node&#39;s default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir

**sizeLimit**

`str`

Total amount of local storage required for this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers in a pod. The default is nil which means that the limit is undefined. More info: http://kubernetes.io/docs/user-guide/volumes#emptydir

### Schema EnvFromSource

EnvFromSource represents the source of a set of ConfigMaps

#### Attributes

**configMapRef**

`ConfigMapEnvSource`

The ConfigMap to select from

**prefix**

`str`

An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.

**secretRef**

`SecretEnvSource`

The Secret to select from

### Schema EnvVar

EnvVar represents an environment variable present in a Container.

#### Attributes

**name** *required*

`str`

Name of the environment variable. Must be a C_IDENTIFIER.

**value**

`str`

Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. &#34;$$(VAR_NAME)&#34; will produce the string literal &#34;$(VAR_NAME)&#34;. Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to &#34;&#34;.

**valueFrom**

`EnvVarSource`

Source for the environment variable&#39;s value. Cannot be used if value is not empty.

### Schema EnvVarSource

EnvVarSource represents a source for the value of an EnvVar.

#### Attributes

**configMapKeyRef**

`ConfigMapKeySelector`

Selects a key of a ConfigMap.

**fieldRef**

`ObjectFieldSelector`

Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels[&#39;&lt;KEY&gt;&#39;]`, `metadata.annotations[&#39;&lt;KEY&gt;&#39;]`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.

**resourceFieldRef**

`ResourceFieldSelector`

Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.

**secretKeyRef**

`SecretKeySelector`

Selects a key of a secret in the pod&#39;s namespace

### Schema EphemeralContainer

An EphemeralContainer is a container that may be added temporarily to an existing pod for user-initiated activities such as debugging. Ephemeral containers have no resource or scheduling guarantees, and they will not be restarted when they exit or when a pod is removed or restarted. If an ephemeral container causes a pod to exceed its resource allocation, the pod may be evicted. Ephemeral containers may not be added by directly updating the pod spec. They must be added via the pod&#39;s ephemeralcontainers subresource, and they will appear in the pod spec once added. This is an alpha feature enabled by the EphemeralContainers feature flag.

#### Attributes

**args**

`[str]`

Arguments to the entrypoint. The docker image&#39;s CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container&#39;s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. &#34;$$(VAR_NAME)&#34; will produce the string literal &#34;$(VAR_NAME)&#34;. Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

**command**

`[str]`

Entrypoint array. Not executed within a shell. The docker image&#39;s ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container&#39;s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. &#34;$$(VAR_NAME)&#34; will produce the string literal &#34;$(VAR_NAME)&#34;. Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

**env**

`[EnvVar]`

List of environment variables to set in the container. Cannot be updated.

**envFrom**

`[EnvFromSource]`

List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.

**image**

`str`

Docker image name. More info: https://kubernetes.io/docs/concepts/containers/images

**imagePullPolicy**

`str`

Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images

**lifecycle**

`Lifecycle`

Lifecycle is not allowed for ephemeral containers.

**livenessProbe**

`Probe`

Probes are not allowed for ephemeral containers.

**name** *required*

`str`

Name of the ephemeral container specified as a DNS_LABEL. This name must be unique among all containers, init containers and ephemeral containers.

**ports**

`[ContainerPort]`

Ports are not allowed for ephemeral containers.

**readinessProbe**

`Probe`

Probes are not allowed for ephemeral containers.

**resources**

`ResourceRequirements`

Resources are not allowed for ephemeral containers. Ephemeral containers use spare resources already allocated to the pod.

**securityContext**

`SecurityContext`

Optional: SecurityContext defines the security options the ephemeral container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.

**startupProbe**

`Probe`

Probes are not allowed for ephemeral containers.

**stdin**

`bool`

Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.

**stdinOnce**

`bool`

Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false

**targetContainerName**

`str`

If set, the name of the container from PodSpec that this ephemeral container targets. The ephemeral container will be run in the namespaces (IPC, PID, etc) of this container. If not set then the ephemeral container is run in whatever namespaces are shared for the pod. Note that the container runtime must support this feature.

**terminationMessagePath**

`str`

Optional: Path at which the file to which the container&#39;s termination message will be written is mounted into the container&#39;s filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.

**terminationMessagePolicy**

`str`

Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.

**tty**

`bool`

Whether this container should allocate a TTY for itself, also requires &#39;stdin&#39; to be true. Default is false.

**volumeDevices**

`[VolumeDevice]`

volumeDevices is the list of block devices to be used by the container.

**volumeMounts**

`[VolumeMount]`

Pod volumes to mount into the container&#39;s filesystem. Cannot be updated.

**workingDir**

`str`

Container&#39;s working directory. If not specified, the container runtime&#39;s default will be used, which might be configured in the container image. Cannot be updated.

### Schema EphemeralVolumeSource

Represents an ephemeral volume that is handled by a normal storage driver.

#### Attributes

**volumeClaimTemplate**

`PersistentVolumeClaimTemplate`

### Schema ExecAction

ExecAction describes a &#34;run in container&#34; action.

#### Attributes

**command**

`[str]`

Command is the command line to execute inside the container, the working directory for the command  is root (&#39;/&#39;) in the container&#39;s filesystem. The command is simply exec&#39;d, it is not run inside a shell, so traditional shell instructions (&#39;|&#39;, etc) won&#39;t work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.

### Schema FCVolumeSource

Represents a Fibre Channel volume. Fibre Channel volumes can only be mounted as read/write once. Fibre Channel volumes support ownership management and SELinux relabeling.

#### Attributes

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified.

**lun**

`int`

Optional: FC target lun number

**readOnly**

`bool`

Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

**targetWWNs**

`[str]`

Optional: FC target worldwide names (WWNs)

**wwids**

`[str]`

Optional: FC volume world wide identifiers (wwids) Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.

### Schema FlexVolumeSource

FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.

#### Attributes

**driver** *required*

`str`

Driver is the name of the driver to use for this volume.

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. The default filesystem depends on FlexVolume script.

**options**

`{str:str}`

Optional: Extra command options if any.

**readOnly**

`bool`

Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

**secretRef**

`LocalObjectReference`

Optional: SecretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.

### Schema FlockerVolumeSource

Represents a Flocker volume mounted by the Flocker agent. One and only one of datasetName and datasetUUID should be set. Flocker volumes do not support ownership management or SELinux relabeling.

#### Attributes

**datasetName**

`str`

Name of the dataset stored as metadata -&gt; name on the dataset for Flocker should be considered as deprecated

**datasetUUID**

`str`

UUID of the dataset. This is unique identifier of a Flocker dataset

### Schema GCEPersistentDiskVolumeSource

Represents a Persistent Disk resource in Google Compute Engine. A GCE PD must exist before mounting to a container. The disk must also be in the same GCE project and zone as the kubelet. A GCE PD can only be mounted as read/write once or read-only many times. GCE PDs support ownership management and SELinux relabeling.

#### Attributes

**fsType**

`str`

**partition**

`int`

**pdName** *required*

`str`

**readOnly**

`bool`

### Schema GitRepoVolumeSource

Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling. DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod&#39;s container.

#### Attributes

**directory**

`str`

**repository** *required*

`str`

**revision**

`str`

### Schema GlusterfsVolumeSource

Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.

#### Attributes

**endpoints** *required*

`str`

EndpointsName is the endpoint name that details Glusterfs topology. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

**path** *required*

`str`

Path is the Glusterfs volume path. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

**readOnly**

`bool`

ReadOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

### Schema HTTPGetAction

HTTPGetAction describes an action based on HTTP Get requests.

#### Attributes

**host**

`str`

Host name to connect to, defaults to the pod IP. You probably want to set &#34;Host&#34; in httpHeaders instead.

**httpHeaders**

`[HTTPHeader]`

Custom headers to set in the request. HTTP allows repeated headers.

**path**

`str`

Path to access on the HTTP server.

**port** *required*

`int | str`

Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.

**scheme**

`str`

Scheme to use for connecting to the host. Defaults to HTTP.

### Schema HTTPHeader

HTTPHeader describes a custom header to be used in HTTP probes

#### Attributes

**name** *required*

`str`

The header field name

**value** *required*

`str`

The header field value

### Schema Handler

Handler defines a specific action that should be taken

#### Attributes

**exec**

`ExecAction`

One and only one of the following should be specified. Exec specifies the action to take.

**httpGet**

`HTTPGetAction`

HTTPGet specifies the http request to perform.

**tcpSocket**

`TCPSocketAction`

TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported

### Schema HostAlias

HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod&#39;s hosts file.

#### Attributes

**hostnames**

`[str]`

Hostnames for the above IP address.

**ip**

`str`

IP address of the host file entry.

### Schema HostPathVolumeSource

Represents a host path mapped into a pod. Host path volumes do not support ownership management or SELinux relabeling.

#### Attributes

**path** *required*

`str`

Path of the directory on the host. If the path is a symlink, it will follow the link to the real path. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath

**type**

`str`

### Schema ISCSIVolumeSource

Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.

#### Attributes

**chapAuthDiscovery**

`bool`

whether support iSCSI Discovery CHAP authentication

**chapAuthSession**

`bool`

whether support iSCSI Session CHAP authentication

**fsType**

`str`

Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi

**initiatorName**

`str`

Custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface &lt;target portal&gt;:&lt;volume name&gt; will be created for the connection.

**iqn** *required*

`str`

Target iSCSI Qualified Name.

**iscsiInterface**

`str`

iSCSI Interface Name that uses an iSCSI transport. Defaults to &#39;default&#39; (tcp).

**lun** *required*

`int`

iSCSI Target Lun number.

**portals**

`[str]`

iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).

**readOnly**

`bool`

ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.

**secretRef**

`LocalObjectReference`

CHAP Secret for iSCSI target and initiator authentication

**targetPortal** *required*

`str`

iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).

### Schema KeyToPath

Maps a string key to a path within a volume.

#### Attributes

**key** *required*

`str`

The key to project.

**mode**

`int`

Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

**path** *required*

`str`

The relative path of the file to map the key to. May not be an absolute path. May not contain the path element &#39;..&#39;. May not start with the string &#39;..&#39;.

### Schema Lifecycle

Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.

#### Attributes

**postStart**

`Handler`

PostStart is called immediately after a container is created. If the handler fails, the container is terminated and restarted according to its restart policy. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks

**preStop**

`Handler`

PreStop is called immediately before a container is terminated due to an API request or management event such as liveness/startup probe failure, preemption, resource contention, etc. The handler is not called if the container crashes or exits. The reason for termination is passed to the handler. The Pod&#39;s termination grace period countdown begins before the PreStop hooked is executed. Regardless of the outcome of the handler, the container will eventually terminate within the Pod&#39;s termination grace period. Other management of the container blocks until the hook completes or until the termination grace period is reached. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks

### Schema LocalObjectReference

LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.

#### Attributes

**name**

`str`

Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

### Schema NFSVolumeSource

Represents an NFS mount that lasts the lifetime of a pod. NFS volumes do not support ownership management or SELinux relabeling.

#### Attributes

**path** *required*

`str`

Path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs

**readOnly**

`bool`

ReadOnly here will force the NFS export to be mounted with read-only permissions. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs

**server** *required*

`str`

Server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs

### Schema Namespace

Namespace provides a scope for Names. Use of multiple namespaces is optional.

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Namespace"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**spec**

`NamespaceSpec`

Spec defines the behavior of the Namespace. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

### Schema NamespaceSpec

NamespaceSpec describes the attributes on a Namespace.

#### Attributes

**finalizers**

`[str]`

Finalizers is an opaque list of values that must be empty to permanently remove object from storage. More info: https://kubernetes.io/docs/tasks/administer-cluster/namespaces/

### Schema Node

Node is a worker node in Kubernetes. Each node will have a unique identifier in the cache (i.e. in etcd).

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Node"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**spec**

`NodeSpec`

Spec defines the behavior of a node. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

### Schema NodeAffinity

Node affinity is a group of node affinity scheduling rules.

#### Attributes

**preferredDuringSchedulingIgnoredDuringExecution**

`[PreferredSchedulingTerm]`

The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding &#34;weight&#34; to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.

**requiredDuringSchedulingIgnoredDuringExecution**

`NodeSelector`

If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.

### Schema NodeConfigSource

NodeConfigSource specifies a source of node configuration. Exactly one subfield (excluding metadata) must be non-nil. This API is deprecated since 1.22

#### Attributes

**configMap**

`ConfigMapNodeConfigSource`

ConfigMap is a reference to a Node&#39;s ConfigMap

### Schema NodeSelector

A node selector represents the union of the results of one or more label queries over a set of nodes; that is, it represents the OR of the selectors represented by the node selector terms.

#### Attributes

**nodeSelectorTerms** *required*

`[NodeSelectorTerm]`

Required. A list of node selector terms. The terms are ORed.

### Schema NodeSelectorRequirement

A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.

#### Attributes

**key** *required*

`str`

The label key that the selector applies to.

**operator** *required*

`str`

Represents a key&#39;s relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.

**values**

`[str]`

An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.

### Schema NodeSelectorTerm

A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.

#### Attributes

**matchExpressions**

`[NodeSelectorRequirement]`

A list of node selector requirements by node&#39;s labels.

**matchFields**

`[NodeSelectorRequirement]`

A list of node selector requirements by node&#39;s fields.

### Schema NodeSpec

NodeSpec describes the attributes that a node is created with.

#### Attributes

**configSource**

`NodeConfigSource`

Deprecated. If specified, the source of the node&#39;s configuration. The DynamicKubeletConfig feature gate must be enabled for the Kubelet to use this field. This field is deprecated as of 1.22: https://git.k8s.io/enhancements/keps/sig-node/281-dynamic-kubelet-configuration

**externalID**

`str`

Deprecated. Not all kubelets will set this field. Remove field after 1.13. see: https://issues.k8s.io/61966

**podCIDR**

`str`

PodCIDR represents the pod IP range assigned to the node.

**podCIDRs**

`[str]`

podCIDRs represents the IP ranges assigned to the node for usage by Pods on that node. If this field is specified, the 0th entry must match the podCIDR field. It may contain at most 1 value for each of IPv4 and IPv6.

**providerID**

`str`

ID of the node assigned by the cloud provider in the format: &lt;ProviderName&gt;://&lt;ProviderSpecificNodeID&gt;

**taints**

`[Taint]`

If specified, the node&#39;s taints.

**unschedulable**

`bool`

Unschedulable controls node schedulability of new pods. By default, node is schedulable. More info: https://kubernetes.io/docs/concepts/nodes/node/#manual-node-administration

### Schema ObjectFieldSelector

ObjectFieldSelector selects an APIVersioned field of an object.

#### Attributes

**apiVersion**

`str`

Version of the schema the FieldPath is written in terms of, defaults to &#34;v1&#34;.

**fieldPath** *required*

`str`

Path of the field to select in the specified API version.

### Schema ObjectReference

ObjectReference contains enough information to let you inspect or modify the referred object.

#### Attributes

**apiVersion**

`str`

API version of the referent.

**fieldPath**

`str`

If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: &#34;spec.containers{name}&#34; (where &#34;name&#34; refers to the name of the container that triggered the event) or if no container name is specified &#34;spec.containers[2]&#34; (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.

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

### Schema PersistentVolumeClaim

PersistentVolumeClaim is a user&#39;s request for and claim to a persistent volume

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"PersistentVolumeClaim"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**spec**

`PersistentVolumeClaimSpec`

Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims

### Schema PersistentVolumeClaimSpec

PersistentVolumeClaimSpec describes the common attributes of storage devices and allows a Source for provider-specific attributes

#### Attributes

**accessModes**

`[str]`

**dataSource**

`TypedLocalObjectReference`

**dataSourceRef**

`TypedLocalObjectReference`

**resources**

`ResourceRequirements`

**selector**

`LabelSelector`

**storageClassName**

`str`

**volumeMode**

`str`

**volumeName**

`str`

### Schema PersistentVolumeClaimTemplate

PersistentVolumeClaimTemplate is used to produce PersistentVolumeClaim objects as part of an EphemeralVolumeSource.

#### Attributes

**metadata**

`ObjectMeta`

May contain labels and annotations that will be copied into the PVC when creating it. No other fields are allowed and will be rejected during validation.

**spec** *required*

`PersistentVolumeClaimSpec`

The specification for the PersistentVolumeClaim. The entire content is copied unchanged into the PVC that gets created from this template. The same fields as in a PersistentVolumeClaim are also valid here.

### Schema PersistentVolumeClaimVolumeSource

PersistentVolumeClaimVolumeSource references the user&#39;s PVC in the same namespace. This volume finds the bound PV and mounts that volume for the pod. A PersistentVolumeClaimVolumeSource is, essentially, a wrapper around another type of volume that is owned by someone else (the system).

#### Attributes

**claimName** *required*

`str`

ClaimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims

**readOnly**

`bool`

Will force the ReadOnly setting in VolumeMounts. Default false.

### Schema PhotonPersistentDiskVolumeSource

Represents a Photon Controller persistent disk resource.

#### Attributes

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified.

**pdID** *required*

`str`

ID that identifies Photon Controller persistent disk

### Schema Pod

Pod is a collection of containers that can run on a host. This resource is created by clients and scheduled onto hosts.

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Pod"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**spec**

`PodSpec`

Specification of the desired behavior of the pod. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

### Schema PodAffinity

Pod affinity is a group of inter pod affinity scheduling rules.

#### Attributes

**preferredDuringSchedulingIgnoredDuringExecution**

`[WeightedPodAffinityTerm]`

The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding &#34;weight&#34; to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.

**requiredDuringSchedulingIgnoredDuringExecution**

`[PodAffinityTerm]`

If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.

### Schema PodAffinityTerm

Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key &lt;topologyKey&gt; matches that of any node on which a pod of the set of pods is running

#### Attributes

**labelSelector**

`LabelSelector`

A label query over a set of resources, in this case pods.

**namespaceSelector**

`LabelSelector`

A label query over the set of namespaces that the term applies to. The term is applied to the union of the namespaces selected by this field and the ones listed in the namespaces field. null selector and null or empty namespaces list means &#34;this pod&#39;s namespace&#34;. An empty selector ({}) matches all namespaces. This field is beta-level and is only honored when PodAffinityNamespaceSelector feature is enabled.

**namespaces**

`[str]`

namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means &#34;this pod&#39;s namespace&#34;

**topologyKey** *required*

`str`

This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.

### Schema PodAntiAffinity

Pod anti affinity is a group of inter pod anti affinity scheduling rules.

#### Attributes

**preferredDuringSchedulingIgnoredDuringExecution**

`[WeightedPodAffinityTerm]`

The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding &#34;weight&#34; to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.

**requiredDuringSchedulingIgnoredDuringExecution**

`[PodAffinityTerm]`

If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.

### Schema PodDNSConfig

PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.

#### Attributes

**nameservers**

`[str]`

A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.

**options**

`[PodDNSConfigOption]`

A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.

**searches**

`[str]`

A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.

### Schema PodDNSConfigOption

PodDNSConfigOption defines DNS resolver options of a pod.

#### Attributes

**name**

`str`

Required.

**value**

`str`

value

### Schema PodReadinessGate

PodReadinessGate contains the reference to a pod condition

#### Attributes

**conditionType** *required*

`str`

ConditionType refers to a condition in the pod&#39;s condition list with matching type.

### Schema PodSecurityContext

PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.

#### Attributes

**fsGroup**

`int`

**fsGroupChangePolicy**

`str`

**runAsGroup**

`int`

**runAsNonRoot**

`bool`

**runAsUser**

`int`

**seLinuxOptions**

`SELinuxOptions`

**seccompProfile**

`SeccompProfile`

**supplementalGroups**

`[int]`

**sysctls**

`[Sysctl]`

**windowsOptions**

`WindowsSecurityContextOptions`

### Schema PodSpec

PodSpec is a description of a pod.

#### Attributes

**activeDeadlineSeconds**

`int`

Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.

**affinity**

`Affinity`

If specified, the pod&#39;s scheduling constraints

**automountServiceAccountToken**

`bool`

AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.

**containers** *required*

`[Container]`

List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.

**dnsConfig**

`PodDNSConfig`

Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.

**dnsPolicy**

`str`

Set DNS policy for the pod. Defaults to &#34;ClusterFirst&#34;. Valid values are &#39;ClusterFirstWithHostNet&#39;, &#39;ClusterFirst&#39;, &#39;Default&#39; or &#39;None&#39;. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to &#39;ClusterFirstWithHostNet&#39;.

**enableServiceLinks**

`bool`

EnableServiceLinks indicates whether information about services should be injected into pod&#39;s environment variables, matching the syntax of Docker links. Optional: Defaults to true.

**ephemeralContainers**

`[EphemeralContainer]`

List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod&#39;s ephemeralcontainers subresource. This field is alpha-level and is only honored by servers that enable the EphemeralContainers feature.

**hostAliases**

`[HostAlias]`

HostAliases is an optional list of hosts and IPs that will be injected into the pod&#39;s hosts file if specified. This is only valid for non-hostNetwork pods.

**hostIPC**

`bool`

Use the host&#39;s ipc namespace. Optional: Default to false.

**hostNetwork**

`bool`

Host networking requested for this pod. Use the host&#39;s network namespace. If this option is set, the ports that will be used must be specified. Default to false.

**hostPID**

`bool`

Use the host&#39;s pid namespace. Optional: Default to false.

**hostname**

`str`

Specifies the hostname of the Pod If not specified, the pod&#39;s hostname will be set to a system-defined value.

**imagePullSecrets**

`[LocalObjectReference]`

ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. For example, in the case of docker, only DockerConfig type secrets are honored. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod

**initContainers**

`[Container]`

List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/

**nodeName**

`str`

NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.

**nodeSelector**

`{str:str}`

NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node&#39;s labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

**overhead**

`{str:str}`

Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md This field is beta-level as of Kubernetes v1.18, and is only honored by servers that enable the PodOverhead feature.

**preemptionPolicy**

`str`

PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset. This field is beta-level, gated by the NonPreemptingPriority feature-gate.

**priority**

`int`

The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.

**priorityClassName**

`str`

If specified, indicates the pod&#39;s priority. &#34;system-node-critical&#34; and &#34;system-cluster-critical&#34; are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.

**readinessGates**

`[PodReadinessGate]`

If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to &#34;True&#34; More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates

**restartPolicy**

`str`

Restart policy for all containers within the pod. One of Always, OnFailure, Never. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy

**runtimeClassName**

`str`

RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the &#34;legacy&#34; RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class This is a beta feature as of Kubernetes v1.14.

**schedulerName**

`str`

If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.

**securityContext**

`PodSecurityContext`

SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.

**serviceAccount**

`str`

DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.

**serviceAccountName**

`str`

ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/

**setHostnameAsFQDN**

`bool`

If true the pod&#39;s hostname will be configured as the pod&#39;s FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.

**shareProcessNamespace**

`bool`

Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.

**subdomain**

`str`

If specified, the fully qualified Pod hostname will be &#34;&lt;hostname&gt;.&lt;subdomain&gt;.&lt;pod namespace&gt;.svc.&lt;cluster domain&gt;&#34;. If not specified, the pod will not have a domainname at all.

**terminationGracePeriodSeconds**

`int`

Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.

**tolerations**

`[Toleration]`

If specified, the pod&#39;s tolerations.

**topologySpreadConstraints**

`[TopologySpreadConstraint]`

TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.

**volumes**

`[Volume]`

List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes

### Schema PodTemplateSpec

PodTemplateSpec describes the data a pod should have when created from a template

#### Attributes

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**spec**

`PodSpec`

Specification of the desired behavior of the pod. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

### Schema PortworxVolumeSource

PortworxVolumeSource represents a Portworx volume resource.

#### Attributes

**fsType**

`str`

FSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified.

**readOnly**

`bool`

Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

**volumeID** *required*

`str`

VolumeID uniquely identifies a Portworx volume

### Schema PreferredSchedulingTerm

An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it&#39;s a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).

#### Attributes

**preference** *required*

`NodeSelectorTerm`

A node selector term, associated with the corresponding weight.

**weight** *required*

`int`

Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.

### Schema Probe

Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.

#### Attributes

**exec**

`ExecAction`

One and only one of the following should be specified. Exec specifies the action to take.

**failureThreshold**

`int`

Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.

**httpGet**

`HTTPGetAction`

HTTPGet specifies the http request to perform.

**initialDelaySeconds**

`int`

Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

**periodSeconds**

`int`

How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.

**successThreshold**

`int`

Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.

**tcpSocket**

`TCPSocketAction`

TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported

**terminationGracePeriodSeconds**

`int`

Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod&#39;s terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.

**timeoutSeconds**

`int`

Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

### Schema ProjectedVolumeSource

Represents a projected volume source

#### Attributes

**defaultMode**

`int`

Mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

**sources**

`[VolumeProjection]`

list of volume projections

### Schema QuobyteVolumeSource

Represents a Quobyte mount that lasts the lifetime of a pod. Quobyte volumes do not support ownership management or SELinux relabeling.

#### Attributes

**group**

`str`

Group to map volume access to Default is no group

**readOnly**

`bool`

ReadOnly here will force the Quobyte volume to be mounted with read-only permissions. Defaults to false.

**registry** *required*

`str`

Registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes

**tenant**

`str`

Tenant owning the given Quobyte volume in the Backend Used with dynamically provisioned Quobyte volumes, value is set by the plugin

**user**

`str`

User to map volume access to Defaults to serivceaccount user

**volume** *required*

`str`

Volume is a string that references an already created Quobyte volume by name.

### Schema RBDVolumeSource

Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.

#### Attributes

**fsType**

`str`

Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd

**image** *required*

`str`

The rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

**keyring**

`str`

Keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

**monitors** *required*

`[str]`

A collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

**pool**

`str`

The rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

**readOnly**

`bool`

ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

**secretRef**

`LocalObjectReference`

SecretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

**user**

`str`

The rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

### Schema ResourceFieldSelector

ResourceFieldSelector represents container resources (cpu, memory) and their output format

#### Attributes

**containerName**

`str`

Container name: required for volumes, optional for env vars

**divisor**

`str`

Specifies the output format of the exposed resources, defaults to &#34;1&#34;

**resource** *required*

`str`

Required: resource to select

### Schema ResourceRequirements

ResourceRequirements describes the compute resource requirements.

#### Attributes

**limits**

`{str:str}`

Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

**requests**

`{str:str}`

Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

### Schema SELinuxOptions

SELinuxOptions are the labels to be applied to the container

#### Attributes

**level**

`str`

Level is SELinux level label that applies to the container.

**role**

`str`

Role is a SELinux role label that applies to the container.

**type**

`str`

**user**

`str`

User is a SELinux user label that applies to the container.

### Schema ScaleIOVolumeSource

ScaleIOVolumeSource represents a persistent ScaleIO volume

#### Attributes

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Default is &#34;xfs&#34;.

**gateway** *required*

`str`

The host address of the ScaleIO API Gateway.

**protectionDomain**

`str`

The name of the ScaleIO Protection Domain for the configured storage.

**readOnly**

`bool`

Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

**secretRef** *required*

`LocalObjectReference`

SecretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.

**sslEnabled**

`bool`

Flag to enable/disable SSL communication with Gateway, default false

**storageMode**

`str`

Indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.

**storagePool**

`str`

The ScaleIO Storage Pool associated with the protection domain.

**system** *required*

`str`

The name of the storage system as configured in ScaleIO.

**volumeName**

`str`

The name of a volume already created in the ScaleIO system that is associated with this volume source.

### Schema SeccompProfile

SeccompProfile defines a pod/container&#39;s seccomp profile settings. Only one profile source may be set.

#### Attributes

**localhostProfile**

`str`

**type** *required*

`str`

### Schema Secret

Secret holds secret data of a certain type. The total bytes of the values in the Data field must be less than MaxSecretSize bytes.

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**data**

`{str:str}`

Data contains the secret data. Each key must consist of alphanumeric characters, &#39;-&#39;, &#39;_&#39; or &#39;.&#39;. The serialized form of the secret data is a base64 encoded string, representing the arbitrary (possibly non-string) data value here. Described in https://tools.ietf.org/html/rfc4648#section-4

**immutable**

`bool`

Immutable, if set to true, ensures that data stored in the Secret cannot be updated (only object metadata can be modified). If not set to true, the field can be modified at any time. Defaulted to nil.

**kind** *required* *readOnly*

`"Secret"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**stringData**

`{str:str}`

stringData allows specifying non-binary secret data in string form. It is provided as a write-only input field for convenience. All keys and values are merged into the data field on write, overwriting any existing values. The stringData field is never output when reading from the API.

**type**

`str`

### Schema SecretEnvSource

SecretEnvSource selects a Secret to populate the environment variables with. The contents of the target Secret&#39;s Data field will represent the key-value pairs as environment variables.

#### Attributes

**name**

`str`

**optional**

`bool`

### Schema SecretKeySelector

SecretKeySelector selects a key of a Secret.

#### Attributes

**key** *required*

`str`

The key of the secret to select from.  Must be a valid secret key.

**name**

`str`

Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

**optional**

`bool`

Specify whether the Secret or its key must be defined

### Schema SecretProjection

Adapts a secret into a projected volume. The contents of the target Secret&#39;s Data field will be presented in a projected volume as files using the keys in the Data field as the file names. Note that this is identical to a secret volume source without the default mode.

#### Attributes

**items**

`[KeyToPath]`

**name**

`str`

**optional**

`bool`

### Schema SecretVolumeSource

Adapts a Secret into a volume. The contents of the target Secret&#39;s Data field will be presented in a volume as files using the keys in the Data field as the file names. Secret volumes support ownership management and SELinux relabeling.

#### Attributes

**defaultMode**

`int`

**items**

`[KeyToPath]`

**optional**

`bool`

**secretName**

`str`

### Schema SecurityContext

SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.

#### Attributes

**allowPrivilegeEscalation**

`bool`

AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN

**capabilities**

`Capabilities`

The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime.

**privileged**

`bool`

Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false.

**procMount**

`str`

procMount denotes the type of proc mount to use for the containers. The default is DefaultProcMount which uses the container runtime defaults for readonly paths and masked paths. This requires the ProcMountType feature flag to be enabled.

**readOnlyRootFilesystem**

`bool`

Whether this container has a read-only root filesystem. Default is false.

**runAsGroup**

`int`

The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

**runAsNonRoot**

`bool`

Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

**runAsUser**

`int`

The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

**seLinuxOptions**

`SELinuxOptions`

The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

**seccompProfile**

`SeccompProfile`

The seccomp options to use by this container. If seccomp options are provided at both the pod &amp; container level, the container options override the pod options.

**windowsOptions**

`WindowsSecurityContextOptions`

The Windows specific settings applied to all containers. If unspecified, the options from the PodSecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

### Schema Service

Service is a named abstraction of software service (for example, mysql) consisting of local port (for example 3306) that the proxy listens on, and the selector that determines which pods will answer requests sent through the proxy.

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Service"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**spec**

`ServiceSpec`

Spec defines the behavior of a service. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

### Schema ServiceAccount

ServiceAccount binds together: * a name, understood by users, and perhaps by peripheral systems, for an identity * a principal that can be authenticated and authorized * a set of secrets

#### Attributes

**apiVersion** *required* *readOnly*

`"v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**automountServiceAccountToken**

`bool`

AutomountServiceAccountToken indicates whether pods running as this service account should have an API token automatically mounted. Can be overridden at the pod level.

**imagePullSecrets**

`[LocalObjectReference]`

ImagePullSecrets is a list of references to secrets in the same namespace to use for pulling any images in pods that reference this ServiceAccount. ImagePullSecrets are distinct from Secrets because Secrets can be mounted in the pod, but ImagePullSecrets are only accessed by the kubelet. More info: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod

**kind** *required* *readOnly*

`"ServiceAccount"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

**secrets**

`[ObjectReference]`

Secrets is the list of secrets allowed to be used by pods running using this ServiceAccount. More info: https://kubernetes.io/docs/concepts/configuration/secret

### Schema ServiceAccountTokenProjection

ServiceAccountTokenProjection represents a projected service account token volume. This projection can be used to insert a service account token into the pods runtime filesystem for use against APIs (Kubernetes API Server or otherwise).

#### Attributes

**audience**

`str`

Audience is the intended audience of the token. A recipient of a token must identify itself with an identifier specified in the audience of the token, and otherwise should reject the token. The audience defaults to the identifier of the apiserver.

**expirationSeconds**

`int`

ExpirationSeconds is the requested duration of validity of the service account token. As the token approaches expiration, the kubelet volume plugin will proactively rotate the service account token. The kubelet will start trying to rotate the token if the token is older than 80 percent of its time to live or if the token is older than 24 hours.Defaults to 1 hour and must be at least 10 minutes.

**path** *required*

`str`

Path is the path relative to the mount point of the file to project the token into.

### Schema ServicePort

ServicePort contains information on service&#39;s port.

#### Attributes

**appProtocol**

`str`

The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.

**name**

`str`

The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the &#39;name&#39; field in the EndpointPort. Optional if only one ServicePort is defined on this service.

**nodePort**

`int`

The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport

**port** *required*

`int`

The port that will be exposed by this service.

**protocol**

`str`

**targetPort**

`int | str`

Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod&#39;s container ports. If this is not specified, the value of the &#39;port&#39; field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the &#39;port&#39; field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service

### Schema ServiceSpec

ServiceSpec describes the attributes that a user creates on a service.

#### Attributes

**allocateLoadBalancerNodePorts**

`bool`

**clusterIP**

`str`

**clusterIPs**

`[str]`

**externalIPs**

`[str]`

**externalName**

`str`

**externalTrafficPolicy**

`str`

**healthCheckNodePort**

`int`

**internalTrafficPolicy**

`str`

**ipFamilies**

`[str]`

**ipFamilyPolicy**

`str`

**loadBalancerClass**

`str`

**loadBalancerIP**

`str`

**loadBalancerSourceRanges**

`[str]`

**ports**

`[ServicePort]`

**publishNotReadyAddresses**

`bool`

**selector**

`{str:str}`

**sessionAffinity**

`str`

**sessionAffinityConfig**

`SessionAffinityConfig`

**type**

`str`

### Schema SessionAffinityConfig

SessionAffinityConfig represents the configurations of session affinity.

#### Attributes

**clientIP**

`ClientIPConfig`

clientIP contains the configurations of Client IP based session affinity.

### Schema StorageOSVolumeSource

Represents a StorageOS persistent volume resource.

#### Attributes

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified.

**readOnly**

`bool`

Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

**secretRef**

`LocalObjectReference`

SecretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.

**volumeName**

`str`

VolumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.

**volumeNamespace**

`str`

VolumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod&#39;s namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to &#34;default&#34; if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.

### Schema Sysctl

Sysctl defines a kernel parameter to be set

#### Attributes

**name** *required*

`str`

Name of a property to set

**value** *required*

`str`

Value of a property to set

### Schema TCPSocketAction

TCPSocketAction describes an action based on opening a socket

#### Attributes

**host**

`str`

Optional: Host name to connect to, defaults to the pod IP.

**port** *required*

`int | str`

Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.

### Schema Taint

The node this Taint is attached to has the &#34;effect&#34; on any pod that does not tolerate the Taint.

#### Attributes

**effect** *required*

`str`

Required. The effect of the taint on pods that do not tolerate the taint. Valid effects are NoSchedule, PreferNoSchedule and NoExecute.

**key** *required*

`str`

Required. The taint key to be applied to a node.

**timeAdded**

`str`

TimeAdded represents the time at which the taint was added. It is only written for NoExecute taints.

**value**

`str`

The taint value corresponding to the taint key.

### Schema Toleration

The pod this Toleration is attached to tolerates any taint that matches the triple &lt;key,value,effect&gt; using the matching operator &lt;operator&gt;.

#### Attributes

**effect**

`str`

Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.

**key**

`str`

Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.

**operator**

`str`

Operator represents a key&#39;s relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.

**tolerationSeconds**

`int`

TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.

**value**

`str`

Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.

### Schema TopologySpreadConstraint

TopologySpreadConstraint specifies how to spread matching pods among the given topology.

#### Attributes

**labelSelector**

`LabelSelector`

**maxSkew** *required*

`int`

**topologyKey** *required*

`str`

**whenUnsatisfiable** *required*

`str`

### Schema TypedLocalObjectReference

TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.

#### Attributes

**apiGroup**

`str`

APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.

**kind** *required*

`str`

Kind is the type of resource being referenced

**name** *required*

`str`

Name is the name of resource being referenced

### Schema Volume

Volume represents a named volume in a pod that may be accessed by any container in the pod.

#### Attributes

**awsElasticBlockStore**

`AWSElasticBlockStoreVolumeSource`

**azureDisk**

`AzureDiskVolumeSource`

**azureFile**

`AzureFileVolumeSource`

**cephfs**

`CephFSVolumeSource`

**cinder**

`CinderVolumeSource`

**configMap**

`ConfigMapVolumeSource`

**csi**

`CSIVolumeSource`

**downwardAPI**

`DownwardAPIVolumeSource`

**emptyDir**

`EmptyDirVolumeSource`

**ephemeral**

`EphemeralVolumeSource`

**fc**

`FCVolumeSource`

**flexVolume**

`FlexVolumeSource`

**flocker**

`FlockerVolumeSource`

**gcePersistentDisk**

`GCEPersistentDiskVolumeSource`

**gitRepo**

`GitRepoVolumeSource`

**glusterfs**

`GlusterfsVolumeSource`

**hostPath**

`HostPathVolumeSource`

**iscsi**

`ISCSIVolumeSource`

**name** *required*

`str`

**nfs**

`NFSVolumeSource`

**persistentVolumeClaim**

`PersistentVolumeClaimVolumeSource`

**photonPersistentDisk**

`PhotonPersistentDiskVolumeSource`

**portworxVolume**

`PortworxVolumeSource`

**projected**

`ProjectedVolumeSource`

**quobyte**

`QuobyteVolumeSource`

**rbd**

`RBDVolumeSource`

**scaleIO**

`ScaleIOVolumeSource`

**secret**

`SecretVolumeSource`

**storageos**

`StorageOSVolumeSource`

**vsphereVolume**

`VsphereVirtualDiskVolumeSource`

### Schema VolumeDevice

volumeDevice describes a mapping of a raw block device within a container.

#### Attributes

**devicePath** *required*

`str`

devicePath is the path inside of the container that the device will be mapped to.

**name** *required*

`str`

name must match the name of a persistentVolumeClaim in the pod

### Schema VolumeMount

VolumeMount describes a mounting of a Volume within a container.

#### Attributes

**mountPath** *required*

`str`

Path within the container at which the volume should be mounted.  Must not contain &#39;:&#39;.

**mountPropagation**

`str`

mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.

**name** *required*

`str`

This must match the Name of a Volume.

**readOnly**

`bool`

Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.

**subPath**

`str`

Path within the volume from which the container&#39;s volume should be mounted. Defaults to &#34;&#34; (volume&#39;s root).

**subPathExpr**

`str`

Expanded path within the volume from which the container&#39;s volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container&#39;s environment. Defaults to &#34;&#34; (volume&#39;s root). SubPathExpr and SubPath are mutually exclusive.

### Schema VolumeProjection

Projection that may be projected along with other supported volume types

#### Attributes

**configMap**

`ConfigMapProjection`

information about the configMap data to project

**downwardAPI**

`DownwardAPIProjection`

information about the downwardAPI data to project

**secret**

`SecretProjection`

information about the secret data to project

**serviceAccountToken**

`ServiceAccountTokenProjection`

information about the serviceAccountToken data to project

### Schema VsphereVirtualDiskVolumeSource

Represents a vSphere volume resource.

#### Attributes

**fsType**

`str`

Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. &#34;ext4&#34;, &#34;xfs&#34;, &#34;ntfs&#34;. Implicitly inferred to be &#34;ext4&#34; if unspecified.

**storagePolicyID**

`str`

Storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.

**storagePolicyName**

`str`

Storage Policy Based Management (SPBM) profile name.

**volumePath** *required*

`str`

Path that identifies vSphere volume vmdk

### Schema WeightedPodAffinityTerm

The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)

#### Attributes

**podAffinityTerm** *required*

`PodAffinityTerm`

Required. A pod affinity term, associated with the corresponding weight.

**weight** *required*

`int`

weight associated with matching the corresponding podAffinityTerm, in the range 1-100.

### Schema WindowsSecurityContextOptions

WindowsSecurityContextOptions contain Windows-specific options and credentials.

#### Attributes

**gmsaCredentialSpec**

`str`

GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.

**gmsaCredentialSpecName**

`str`

GMSACredentialSpecName is the name of the GMSA credential spec to use.

**hostProcess**

`bool`

HostProcess determines if a container should be run as a &#39;Host Process&#39; container. This field is alpha-level and will only be honored by components that enable the WindowsHostProcessContainers feature flag. Setting this field without the feature flag will result in errors when validating the Pod. All of a Pod&#39;s containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).  In addition, if HostProcess is true then HostNetwork must also be set to true.

**runAsUserName**

`str`

The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

<!-- Auto generated by kcl-doc tool, please do not edit. -->
