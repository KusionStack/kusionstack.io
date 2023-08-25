# Package v1

## Index

- [APIServerConfig](#schema-apiserverconfig)
- [AlertingSpec](#schema-alertingspec)
- [Alertmanager](#schema-alertmanager)
- [AlertmanagerConfiguration](#schema-alertmanagerconfiguration)
- [AlertmanagerEndpoints](#schema-alertmanagerendpoints)
- [AlertmanagerGlobalConfig](#schema-alertmanagerglobalconfig)
- [AlertmanagerSpec](#schema-alertmanagerspec)
- [AlertmanagerStatus](#schema-alertmanagerstatus)
- [AlertmanagerWebSpec](#schema-alertmanagerwebspec)
- [ArbitraryFSAccessThroughSMsConfig](#schema-arbitraryfsaccessthroughsmsconfig)
- [Argument](#schema-argument)
- [AttachMetadata](#schema-attachmetadata)
- [Authorization](#schema-authorization)
- [BasicAuth](#schema-basicauth)
- [CommonPrometheusFields](#schema-commonprometheusfields)
- [EmbeddedObjectMetadata](#schema-embeddedobjectmetadata)
- [EmbeddedPersistentVolumeClaim](#schema-embeddedpersistentvolumeclaim)
- [Endpoint](#schema-endpoint)
- [Exemplars](#schema-exemplars)
- [HTTPConfig](#schema-httpconfig)
- [HostAlias](#schema-hostalias)
- [MetadataConfig](#schema-metadataconfig)
- [NamespaceSelector](#schema-namespaceselector)
- [OAuth2](#schema-oauth2)
- [ObjectReference](#schema-objectreference)
- [PodMetadata](#schema-podmetadata)
- [PodMetricsEndpoint](#schema-podmetricsendpoint)
- [PodMonitor](#schema-podmonitor)
- [PodMonitorSpec](#schema-podmonitorspec)
- [Probe](#schema-probe)
- [ProbeSpec](#schema-probespec)
- [ProbeTLSConfig](#schema-probetlsconfig)
- [ProbeTargetIngress](#schema-probetargetingress)
- [ProbeTargetStaticConfig](#schema-probetargetstaticconfig)
- [ProbeTargets](#schema-probetargets)
- [ProberSpec](#schema-proberspec)
- [Prometheus](#schema-prometheus)
- [PrometheusCondition](#schema-prometheuscondition)
- [PrometheusRule](#schema-prometheusrule)
- [PrometheusRuleExcludeConfig](#schema-prometheusruleexcludeconfig)
- [PrometheusRuleSpec](#schema-prometheusrulespec)
- [PrometheusSpec](#schema-prometheusspec)
- [PrometheusStatus](#schema-prometheusstatus)
- [PrometheusWebSpec](#schema-prometheuswebspec)
- [QuerySpec](#schema-queryspec)
- [QueueConfig](#schema-queueconfig)
- [RelabelConfig](#schema-relabelconfig)
- [RemoteReadSpec](#schema-remotereadspec)
- [RemoteWriteSpec](#schema-remotewritespec)
- [Rule](#schema-rule)
- [RuleGroup](#schema-rulegroup)
- [Rules](#schema-rules)
- [RulesAlert](#schema-rulesalert)
- [SafeAuthorization](#schema-safeauthorization)
- [SafeTLSConfig](#schema-safetlsconfig)
- [SecretOrConfigMap](#schema-secretorconfigmap)
- [ServiceMonitor](#schema-servicemonitor)
- [ServiceMonitorSpec](#schema-servicemonitorspec)
- [ShardStatus](#schema-shardstatus)
- [Sigv4](#schema-sigv4)
- [StorageSpec](#schema-storagespec)
- [TLSConfig](#schema-tlsconfig)
- [ThanosSpec](#schema-thanosspec)
- [WebHTTPConfig](#schema-webhttpconfig)
- [WebHTTPHeaders](#schema-webhttpheaders)
- [WebTLSConfig](#schema-webtlsconfig)


## Schemas

### Schema APIServerConfig

APIServerConfig allows specifying a host and auth methods to access apiserver. If left empty, Prometheus is assumed to run inside of the cluster and will discover API servers automatically and use the pod&#39;s CA certificate and bearer token file at /var/run/secrets/kubernetes.io/serviceaccount/.

#### Attributes

**authorization**

`Authorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerToken**

`str`

Bearer token for accessing apiserver.

**bearerTokenFile**

`str`

File to read bearer token for accessing apiserver.

**host** *required*

`str`

Host of apiserver. A valid string consisting of a hostname or IP followed by an optional port number

**tlsConfig**

`TLSConfig`

tls config

### Schema AlertingSpec

Define details regarding alerting.

#### Attributes

**alertmanagers** *required*

`[AlertmanagerEndpoints]`

AlertmanagerEndpoints Prometheus should fire alerts against.

### Schema Alertmanager

Alertmanager describes an Alertmanager cluster.

#### Attributes

**apiVersion** *required* *readOnly*

`"monitoring.coreos.com/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Alertmanager"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec** *required*

`AlertmanagerSpec`

spec

**status**

`AlertmanagerStatus`

status

### Schema AlertmanagerConfiguration

EXPERIMENTAL: alertmanagerConfiguration specifies the configuration of Alertmanager. If defined, it takes precedence over the `configSecret` field. This field may change in future releases.

#### Attributes

**global**

`AlertmanagerGlobalConfig`

global

**name** *required*

`str`

The name of the AlertmanagerConfig resource which is used to generate the Alertmanager configuration. It must be defined in the same namespace as the Alertmanager object. The operator will not enforce a `namespace` label for routes and inhibition rules.

**templates**

`[SecretOrConfigMap]`

Custom notification templates.

### Schema AlertmanagerEndpoints

AlertmanagerEndpoints defines a selection of a single Endpoints object containing alertmanager IPs to fire alerts against.

#### Attributes

**apiVersion**

`str`

Version of the Alertmanager API that Prometheus uses to send alerts. It can be &#34;v1&#34; or &#34;v2&#34;.

**authorization**

`SafeAuthorization`

authorization

**bearerTokenFile**

`str`

BearerTokenFile to read from filesystem to use when authenticating to Alertmanager.

**name** *required*

`str`

Name of Endpoints object in Namespace.

**namespace** *required*

`str`

Namespace of Endpoints object.

**pathPrefix**

`str`

Prefix for the HTTP path alerts are pushed to.

**port** *required*

`int | str`

Port the Alertmanager API is exposed on.

**scheme**

`str`

Scheme to use when firing alerts.

**timeout**

`str`

Timeout is a per-target Alertmanager timeout when pushing alerts.

**tlsConfig**

`TLSConfig`

tls config

### Schema AlertmanagerGlobalConfig

Defines the global parameters of the Alertmanager configuration.

#### Attributes

**httpConfig**

`HTTPConfig`

http config

**resolveTimeout**

`str`

ResolveTimeout is the default value used by alertmanager if the alert does not include EndsAt, after this time passes it can declare the alert as resolved if it has not been updated. This has no impact on alerts from Prometheus, as they always include EndsAt.

### Schema AlertmanagerSpec

Specification of the desired behavior of the Alertmanager cluster. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

#### Attributes

**additionalPeers**

`[str]`

AdditionalPeers allows injecting a set of additional Alertmanagers to peer with to form a highly available cluster.

**affinity**

`Affinity`

affinity

**alertmanagerConfigNamespaceSelector**

`LabelSelector`

alertmanager config namespace selector

**alertmanagerConfigSelector**

`LabelSelector`

alertmanager config selector

**alertmanagerConfiguration**

`AlertmanagerConfiguration`

alertmanager configuration

**baseImage**

`str`

Base image that is used to deploy pods, without tag. Deprecated: use &#39;image&#39; instead

**clusterAdvertiseAddress**

`str`

ClusterAdvertiseAddress is the explicit address to advertise in cluster. Needs to be provided for non RFC1918 [1] (public) addresses. [1] RFC1918: https://tools.ietf.org/html/rfc1918

**clusterGossipInterval**

`str`

Interval between gossip attempts.

**clusterPeerTimeout**

`str`

Timeout for cluster peering.

**clusterPushpullInterval**

`str`

Interval between pushpull attempts.

**configMaps**

`[str]`

ConfigMaps is a list of ConfigMaps in the same namespace as the Alertmanager object, which shall be mounted into the Alertmanager Pods. Each ConfigMap is added to the StatefulSet definition as a volume named `configmap-&lt;configmap-name&gt;`. The ConfigMaps are mounted into /etc/alertmanager/configmaps/&lt;configmap-name&gt; in the &#39;alertmanager&#39; container.

**configSecret**

`str`

ConfigSecret is the name of a Kubernetes Secret in the same namespace as the Alertmanager object, which contains the configuration for this Alertmanager instance. If empty, it defaults to &#39;alertmanager-&lt;alertmanager-name&gt;&#39;.
The Alertmanager configuration should be available under the `alertmanager.yaml` key. Additional keys from the original secret are copied to the generated secret.
If either the secret or the `alertmanager.yaml` key is missing, the operator provisions an Alertmanager configuration with one empty receiver (effectively dropping alert notifications).

**containers**

`[Container]`

Containers allows injecting additional containers. This is meant to allow adding an authentication proxy to an Alertmanager pod. Containers described here modify an operator generated container if they share the same name and modifications are done via a strategic merge patch. The current container names are: `alertmanager` and `config-reloader`. Overriding containers is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice.

**externalUrl**

`str`

The external URL the Alertmanager instances will be available under. This is necessary to generate correct URLs. This is necessary if Alertmanager is not served from root of a DNS name.

**forceEnableClusterMode**

`bool`

ForceEnableClusterMode ensures Alertmanager does not deactivate the cluster mode when running with a single replica. Use case is e.g. spanning an Alertmanager cluster across Kubernetes clusters with a single replica in each.

**hostAliases**

`[HostAlias]`

Pods&#39; hostAliases configuration

**image**

`str`

Image if specified has precedence over baseImage, tag and sha combinations. Specifying the version is still necessary to ensure the Prometheus Operator knows what version of Alertmanager is being configured.

**imagePullSecrets**

`[LocalObjectReference]`

An optional list of references to secrets in the same namespace to use for pulling prometheus and alertmanager images from registries see http://kubernetes.io/docs/user-guide/images#specifying-imagepullsecrets-on-a-pod

**initContainers**

`[Container]`

InitContainers allows adding initContainers to the pod definition. Those can be used to e.g. fetch secrets for injection into the Alertmanager configuration from external sources. Any errors during the execution of an initContainer will lead to a restart of the Pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/ Using initContainers for any use case other then secret fetching is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice.

**listenLocal**

`bool`

ListenLocal makes the Alertmanager server listen on loopback, so that it does not bind against the Pod IP. Note this is only for the Alertmanager UI, not the gossip communication.

**logFormat**

`"" | "logfmt" | "json"`

Log format for Alertmanager to be configured with.

**logLevel**

`"" | "debug" | "info" | "warn" | "error"`

Log level for Alertmanager to be configured with.

**minReadySeconds**

`int`

Minimum number of seconds for which a newly created pod should be ready without any of its container crashing for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready) This is an alpha field and requires enabling StatefulSetMinReadySeconds feature gate.

**nodeSelector**

`{str:str}`

Define which Nodes the Pods are scheduled on.

**paused**

`bool`

If set to true all actions on the underlying managed objects are not goint to be performed, except for delete actions.

**podMetadata**

`EmbeddedObjectMetadata`

pod metadata

**portName**

`str`

Port name used for the pods and governing service. This defaults to web

**priorityClassName**

`str`

Priority class assigned to the Pods

**replicas**

`int`

Size is the expected size of the alertmanager cluster. The controller will eventually make the size of the running cluster equal to the expected size.

**resources**

`ResourceRequirements`

resources

**retention**

`str`

Time duration Alertmanager shall retain data for. Default is &#39;120h&#39;, and must match the regular expression `[0-9]+(ms|s|m|h)` (milliseconds seconds minutes hours).

**routePrefix**

`str`

The route prefix Alertmanager registers HTTP handlers for. This is useful, if using ExternalURL and a proxy is rewriting HTTP routes of a request, and the actual ExternalURL is still true, but the server serves requests under a different route prefix. For example for use with `kubectl proxy`.

**secrets**

`[str]`

Secrets is a list of Secrets in the same namespace as the Alertmanager object, which shall be mounted into the Alertmanager Pods. Each Secret is added to the StatefulSet definition as a volume named `secret-&lt;secret-name&gt;`. The Secrets are mounted into /etc/alertmanager/secrets/&lt;secret-name&gt; in the &#39;alertmanager&#39; container.

**securityContext**

`PodSecurityContext`

security context

**serviceAccountName**

`str`

ServiceAccountName is the name of the ServiceAccount to use to run the Prometheus Pods.

**sha**

`str`

SHA of Alertmanager container image to be deployed. Defaults to the value of `version`. Similar to a tag, but the SHA explicitly deploys an immutable container image. Version and Tag are ignored if SHA is set. Deprecated: use &#39;image&#39; instead.  The image digest can be specified as part of the image URL.

**storage**

`StorageSpec`

storage

**tag**

`str`

Tag of Alertmanager container image to be deployed. Defaults to the value of `version`. Version is ignored if Tag is set. Deprecated: use &#39;image&#39; instead.  The image tag can be specified as part of the image URL.

**tolerations**

`[Toleration]`

If specified, the pod&#39;s tolerations.

**topologySpreadConstraints**

`[TopologySpreadConstraint]`

If specified, the pod&#39;s topology spread constraints.

**version**

`str`

Version the cluster should be on.

**volumeMounts**

`[VolumeMount]`

VolumeMounts allows configuration of additional VolumeMounts on the output StatefulSet definition. VolumeMounts specified will be appended to other VolumeMounts in the alertmanager container, that are generated as a result of StorageSpec objects.

**volumes**

`[Volume]`

Volumes allows configuration of additional volumes on the output StatefulSet definition. Volumes specified will be appended to other volumes that are generated as a result of StorageSpec objects.

**web**

`AlertmanagerWebSpec`

web

### Schema AlertmanagerStatus

Most recent observed status of the Alertmanager cluster. Read-only. Not included when requesting from the apiserver, only from the Prometheus Operator API itself. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

#### Attributes

**availableReplicas** *required*

`int`

Total number of available pods (ready for at least minReadySeconds) targeted by this Alertmanager cluster.

**paused** *required*

`bool`

Represents whether any actions on the underlying managed objects are being performed. Only delete actions will be performed.

**replicas** *required*

`int`

Total number of non-terminated pods targeted by this Alertmanager cluster (their labels match the selector).

**unavailableReplicas** *required*

`int`

Total number of unavailable pods targeted by this Alertmanager cluster.

**updatedReplicas** *required*

`int`

Total number of non-terminated pods targeted by this Alertmanager cluster that have the desired version spec.

### Schema AlertmanagerWebSpec

Defines the web command line flags when starting Alertmanager.

#### Attributes

**httpConfig**

`WebHTTPConfig`

http config

**tlsConfig**

`WebTLSConfig`

tls config

### Schema ArbitraryFSAccessThroughSMsConfig

ArbitraryFSAccessThroughSMs configures whether configuration based on a service monitor can access arbitrary files on the file system of the Prometheus container e.g. bearer token files.

#### Attributes

**deny**

`bool`

deny

### Schema Argument

Argument as part of the AdditionalArgs list.

#### Attributes

**name** *required*

`str`

Name of the argument, e.g. &#34;scrape.discovery-reload-interval&#34;.

**value**

`str`

Argument value, e.g. 30s. Can be empty for name-only arguments (e.g. --storage.tsdb.no-lockfile)

### Schema AttachMetadata

Attaches node metadata to discovered targets. Only valid for role: pod. Only valid in Prometheus versions 2.35.0 and newer.

#### Attributes

**node**

`bool`

When set to true, Prometheus must have permissions to get Nodes.

### Schema Authorization

Authorization section for remote write

#### Attributes

**credentials**

`SecretKeySelector`

credentials

**credentialsFile**

`str`

File to read a secret from, mutually exclusive with Credentials (from SafeAuthorization)

**type**

`str`

### Schema BasicAuth

BasicAuth allow an endpoint to authenticate over basic authentication More info: https://prometheus.io/docs/operating/configuration/#endpoints

#### Attributes

**password**

`SecretKeySelector`

password

**username**

`SecretKeySelector`

username

### Schema CommonPrometheusFields

CommonPrometheusFields are the options available to both the Prometheus server and agent.

#### Attributes

**additionalArgs**

`[Argument]`

AdditionalArgs allows setting additional arguments for the Thanos container. The arguments are passed as-is to the Thanos container which may cause issues if they are invalid or not supported the given Thanos version. In case of an argument conflict (e.g. an argument which is already set by the operator itself) or when providing an invalid argument the reconciliation will fail and an error will be logged.

**additionalScrapeConfigs**

`SecretKeySelector`

additional scrape configs

**affinity**

`Affinity`

affinity

**apiserverConfig**

`APIServerConfig`

apiserver config

**arbitraryFSAccessThroughSMs**

`ArbitraryFSAccessThroughSMsConfig`

arbitrary f s access through s ms

**configMaps**

`[str]`

ConfigMaps is a list of ConfigMaps in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods. Each ConfigMap is added to the StatefulSet definition as a volume named `configmap-&lt;configmap-name&gt;`. The ConfigMaps are mounted into /etc/prometheus/configmaps/&lt;configmap-name&gt; in the &#39;prometheus&#39; container.

**containers**

`[Container]`

Containers allows injecting additional containers or modifying operator generated containers. This can be used to allow adding an authentication proxy to a Prometheus pod or to change the behavior of an operator generated container. Containers described here modify an operator generated container if they share the same name and modifications are done via a strategic merge patch. The current container names are: `prometheus`, `config-reloader`, and `thanos-sidecar`. Overriding containers is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice.

**enableFeatures**

`[str]`

Enable access to Prometheus disabled features. By default, no features are enabled. Enabling disabled features is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice. For more information see https://prometheus.io/docs/prometheus/latest/disabled_features/

**enableRemoteWriteReceiver**

`bool`

Enable Prometheus to be used as a receiver for the Prometheus remote write protocol. Defaults to the value of `false`. WARNING: This is not considered an efficient way of ingesting samples. Use it with caution for specific low-volume use cases. It is not suitable for replacing the ingestion via scraping and turning Prometheus into a push-based metrics collection system. For more information see https://prometheus.io/docs/prometheus/latest/querying/api/#remote-write-receiver Only valid in Prometheus versions 2.33.0 and newer.

**enforcedBodySizeLimit**

`str`

EnforcedBodySizeLimit defines the maximum size of uncompressed response body that will be accepted by Prometheus. Targets responding with a body larger than this many bytes will cause the scrape to fail. Example: 100MB. If defined, the limit will apply to all service/pod monitors and probes. This is an experimental feature, this behaviour could change or be removed in the future. Only valid in Prometheus versions 2.28.0 and newer.

**enforcedLabelLimit**

`int`

Per-scrape limit on number of labels that will be accepted for a sample. If more than this number of labels are present post metric-relabeling, the entire scrape will be treated as failed. 0 means no limit. Only valid in Prometheus versions 2.27.0 and newer.

**enforcedLabelNameLengthLimit**

`int`

Per-scrape limit on length of labels name that will be accepted for a sample. If a label name is longer than this number post metric-relabeling, the entire scrape will be treated as failed. 0 means no limit. Only valid in Prometheus versions 2.27.0 and newer.

**enforcedLabelValueLengthLimit**

`int`

Per-scrape limit on length of labels value that will be accepted for a sample. If a label value is longer than this number post metric-relabeling, the entire scrape will be treated as failed. 0 means no limit. Only valid in Prometheus versions 2.27.0 and newer.

**enforcedNamespaceLabel**

`str`

EnforcedNamespaceLabel If set, a label will be added to
1. all user-metrics (created by `ServiceMonitor`, `PodMonitor` and `Probe` objects) and
2. in all `PrometheusRule` objects (except the ones excluded in `prometheusRulesExcludedFromEnforce`) to
* alerting &amp; recording rules and
* the metrics used in their expressions (`expr`).
Label name is this field&#39;s value. Label value is the namespace of the created object (mentioned above).

**enforcedSampleLimit**

`int`

EnforcedSampleLimit defines global limit on number of scraped samples that will be accepted. This overrides any SampleLimit set per ServiceMonitor or/and PodMonitor. It is meant to be used by admins to enforce the SampleLimit to keep overall number of samples/series under the desired limit. Note that if SampleLimit is lower that value will be taken instead.

**enforcedTargetLimit**

`int`

EnforcedTargetLimit defines a global limit on the number of scraped targets.  This overrides any TargetLimit set per ServiceMonitor or/and PodMonitor.  It is meant to be used by admins to enforce the TargetLimit to keep the overall number of targets under the desired limit. Note that if TargetLimit is lower, that value will be taken instead, except if either value is zero, in which case the non-zero value will be used.  If both values are zero, no limit is enforced.

**excludedFromEnforcement**

`[ObjectReference]`

List of references to PodMonitor, ServiceMonitor, Probe and PrometheusRule objects to be excluded from enforcing a namespace label of origin. Applies only if enforcedNamespaceLabel set to true.

**externalLabels**

`{str:str}`

The labels to add to any time series or alerts when communicating with external systems (federation, remote storage, Alertmanager).

**externalUrl**

`str`

The external URL the Prometheus instances will be available under. This is necessary to generate correct URLs. This is necessary if Prometheus is not served from root of a DNS name.

**hostAliases**

`[HostAlias]`

Pods&#39; hostAliases configuration

**hostNetwork**

`bool`

Use the host&#39;s network namespace if true.

**ignoreNamespaceSelectors**

`bool`

IgnoreNamespaceSelectors if set to true will ignore NamespaceSelector settings from all PodMonitor, ServiceMonitor and Probe objects. They will only discover endpoints within the namespace of the PodMonitor, ServiceMonitor and Probe objects. Defaults to false.

**initContainers**

`[Container]`

InitContainers allows adding initContainers to the pod definition. Those can be used to e.g. fetch secrets for injection into the Prometheus configuration from external sources. Any errors during the execution of an initContainer will lead to a restart of the Pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/ InitContainers described here modify an operator generated init containers if they share the same name and modifications are done via a strategic merge patch. The current init container name is: `init-config-reloader`. Overriding init containers is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice.

**listenLocal**

`bool`

ListenLocal makes the Prometheus server listen on loopback, so that it does not bind against the Pod IP.

**logFormat**

`"" | "logfmt" | "json"`

Log format for Prometheus to be configured with.

**logLevel**

`"" | "debug" | "info" | "warn" | "error"`

Log level for Prometheus to be configured with.

**minReadySeconds**

`int`

Minimum number of seconds for which a newly created pod should be ready without any of its container crashing for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready) This is an alpha field and requires enabling StatefulSetMinReadySeconds feature gate.

**nodeSelector**

`{str:str}`

Define which Nodes the Pods are scheduled on.

**overrideHonorLabels**

`bool`

When true, Prometheus resolves label conflicts by renaming the labels in the scraped data to &#34;exported_&lt;label value&gt;&#34; for all targets created from service and pod monitors. Otherwise the HonorLabels field of the service or pod monitor applies.

**overrideHonorTimestamps**

`bool`

When true, Prometheus ignores the timestamps for all the targets created from service and pod monitors. Otherwise the HonorTimestamps field of the service or pod monitor applies.

**paused**

`bool`

When a Prometheus deployment is paused, no actions except for deletion will be performed on the underlying objects.

**podMetadata**

`PodMetadata`

pod metadata

**podMonitorNamespaceSelector**

`LabelSelector`

pod monitor namespace selector

**podMonitorSelector**

`LabelSelector`

pod monitor selector

**portName**

`str`

Port name used for the pods and governing service. This defaults to web

**priorityClassName**

`str`

Priority class assigned to the Pods

**probeNamespaceSelector**

`LabelSelector`

probe namespace selector

**probeSelector**

`LabelSelector`

probe selector

**prometheusExternalLabelName**

`str`

Name of Prometheus external label used to denote Prometheus instance name. Defaults to the value of `prometheus`. External label will _not_ be added when value is set to empty string (`&#34;&#34;`).

**remoteWrite**

`[RemoteWriteSpec]`

remoteWrite is the list of remote write configurations.

**replicaExternalLabelName**

`str`

Name of Prometheus external label used to denote replica name. Defaults to the value of `prometheus_replica`. External label will _not_ be added when value is set to empty string (`&#34;&#34;`).

**replicas**

`int`

Number of replicas of each shard to deploy for a Prometheus deployment. Number of replicas multiplied by shards is the total number of Pods created.

**resources**

`ResourceRequirements`

resources

**routePrefix**

`str`

The route prefix Prometheus registers HTTP handlers for. This is useful, if using ExternalURL and a proxy is rewriting HTTP routes of a request, and the actual ExternalURL is still true, but the server serves requests under a different route prefix. For example for use with `kubectl proxy`.

**scrapeInterval**

`str`

Interval between consecutive scrapes. Default: `30s`

**scrapeTimeout**

`str`

Number of seconds to wait for target to respond before erroring.

**secrets**

`[str]`

Secrets is a list of Secrets in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods. Each Secret is added to the StatefulSet definition as a volume named `secret-&lt;secret-name&gt;`. The Secrets are mounted into /etc/prometheus/secrets/&lt;secret-name&gt; in the &#39;prometheus&#39; container.

**securityContext**

`PodSecurityContext`

security context

**serviceAccountName**

`str`

ServiceAccountName is the name of the ServiceAccount to use to run the Prometheus Pods.

**serviceMonitorNamespaceSelector**

`LabelSelector`

service monitor namespace selector

**serviceMonitorSelector**

`LabelSelector`

service monitor selector

**shards**

`int`

EXPERIMENTAL: Number of shards to distribute targets onto. Number of replicas multiplied by shards is the total number of Pods created. Note that scaling down shards will not reshard data onto remaining instances, it must be manually moved. Increasing shards will not reshard data either but it will continue to be available from the same instances. To query globally use Thanos sidecar and Thanos querier or remote write data to a central location. Sharding is done on the content of the `__address__` target meta-label.

**storage**

`StorageSpec`

Storage defines the configured storage for a group Prometheus servers.

**tolerations**

`[Toleration]`

If specified, the pod&#39;s tolerations.

**topologySpreadConstraints**

`[TopologySpreadConstraint]`

If specified, the pod&#39;s topology spread constraints.

**version**

`str`

Version of Prometheus to be deployed.

**volumeMounts**

`[VolumeMount]`

VolumeMounts allows configuration of additional VolumeMounts on the output StatefulSet definition. VolumeMounts specified will be appended to other VolumeMounts in the prometheus container, that are generated as a result of StorageSpec objects.

**volumes**

`[Volume]`

Volumes allows configuration of additional volumes on the output StatefulSet definition. Volumes specified will be appended to other volumes that are generated as a result of StorageSpec objects.

**walCompression**

`bool`

Enable compression of the write-ahead log using Snappy. This flag is only available in versions of Prometheus &gt;= 2.11.0.

**web**

`PrometheusWebSpec`

web

### Schema EmbeddedObjectMetadata

PodMetadata configures Labels and Annotations which are propagated to the alertmanager pods.

#### Attributes

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations

**labels**

`{str:str}`

Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels

**name**

`str`

Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names

### Schema EmbeddedPersistentVolumeClaim

A PVC spec to be used by the Prometheus StatefulSets.

#### Attributes

**apiVersion**

`str`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind**

`str`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`EmbeddedObjectMetadata`

metadata

**spec**

`PersistentVolumeClaimSpec`

spec

### Schema Endpoint

Endpoint defines a scrapeable endpoint serving Prometheus metrics.

#### Attributes

**authorization**

`SafeAuthorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerTokenFile**

`str`

File to read bearer token for scraping targets.

**bearerTokenSecret**

`SecretKeySelector`

bearer token secret

**enableHttp2**

`bool`

Whether to enable HTTP2.

**followRedirects**

`bool`

FollowRedirects configures whether scrape requests follow HTTP 3xx redirects.

**honorLabels**

`bool`

HonorLabels chooses the metric&#39;s labels on collisions with target labels.

**honorTimestamps**

`bool`

HonorTimestamps controls whether Prometheus respects the timestamps present in scraped data.

**interval**

`str`

Interval at which metrics should be scraped If not specified Prometheus&#39; global scrape interval is used.

**metricRelabelings**

`[RelabelConfig]`

MetricRelabelConfigs to apply to samples before ingestion.

**oauth2**

`OAuth2`

oauth2

**params**

`{str:[str]}`

Optional HTTP URL parameters

**path**

`str`

HTTP path to scrape for metrics. If empty, Prometheus uses the default value (e.g. `/metrics`).

**port**

`str`

Name of the service port this endpoint refers to. Mutually exclusive with targetPort.

**proxyUrl**

`str`

ProxyURL eg http://proxyserver:2195 Directs scrapes to proxy through this endpoint.

**relabelings**

`[RelabelConfig]`

RelabelConfigs to apply to samples before scraping. Prometheus Operator automatically adds relabelings for a few standard Kubernetes fields. The original scrape job&#39;s name is available via the `__tmp_prometheus_job_name` label. More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config

**scheme**

`str`

HTTP scheme to use for scraping.

**scrapeTimeout**

`str`

Timeout after which the scrape is ended If not specified, the Prometheus global scrape timeout is used unless it is less than `Interval` in which the latter is used.

**targetPort**

`int`

Name or number of the target port of the Pod behind the Service, the port must be specified with container port property. Mutually exclusive with port.

**tlsConfig**

`TLSConfig`

tls config

### Schema Exemplars

Exemplars related settings that are runtime reloadable. It requires to enable the exemplar storage feature to be effective.

#### Attributes

**maxSize**

`int`

Maximum number of exemplars stored in memory for all series. If not set, Prometheus uses its default value. A value of zero or less than zero disables the storage.

### Schema HTTPConfig

HTTP client configuration.

#### Attributes

**authorization**

`SafeAuthorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerTokenSecret**

`SecretKeySelector`

bearer token secret

**followRedirects**

`bool`

FollowRedirects specifies whether the client should follow HTTP 3xx redirects.

**oauth2**

`OAuth2`

oauth2

**proxyURL**

`str`

Optional proxy URL.

**tlsConfig**

`SafeTLSConfig`

tls config

### Schema HostAlias

HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod&#39;s hosts file.

#### Attributes

**hostnames** *required*

`[str]`

Hostnames for the above IP address.

**ip** *required*

`str`

IP address of the host file entry.

### Schema MetadataConfig

MetadataConfig configures the sending of series metadata to the remote storage.

#### Attributes

**send**

`bool`

Whether metric metadata is sent to the remote storage or not.

**sendInterval**

`str`

How frequently metric metadata is sent to the remote storage.

### Schema NamespaceSelector

Selector to select which namespaces the Kubernetes Endpoints objects are discovered from.

#### Attributes

**any**

`bool`

Boolean describing whether all namespaces are selected in contrast to a list restricting them.

**matchNames**

`[str]`

List of namespace names to select from.

### Schema OAuth2

OAuth2 for the URL. Only valid in Prometheus versions 2.27.0 and newer.

#### Attributes

**clientId** *required*

`SecretOrConfigMap`

client Id

**clientSecret** *required*

`SecretKeySelector`

client secret

**endpointParams**

`{str:str}`

Parameters to append to the token URL

**scopes**

`[str]`

OAuth2 scopes used for the token request

**tokenUrl** *required*

`str`

The URL to fetch the token from

### Schema ObjectReference

ObjectReference references a PodMonitor, ServiceMonitor, Probe or PrometheusRule object.

#### Attributes

**group** *readOnly*

`"monitoring.coreos.com"`

Group of the referent. When not specified, it defaults to `monitoring.coreos.com`

**name**

`str`

Name of the referent. When not set, all resources are matched.

**namespace** *required*

`str`

Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

**resource** *required*

`"prometheusrules" | "servicemonitors" | "podmonitors" | "probes"`

Resource of the referent.

### Schema PodMetadata

PodMetadata configures Labels and Annotations which are propagated to the prometheus pods.

#### Attributes

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations

**labels**

`{str:str}`

Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels

**name**

`str`

Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names

### Schema PodMetricsEndpoint

PodMetricsEndpoint defines a scrapeable endpoint of a Kubernetes Pod serving Prometheus metrics.

#### Attributes

**authorization**

`SafeAuthorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerTokenSecret**

`SecretKeySelector`

bearer token secret

**enableHttp2**

`bool`

Whether to enable HTTP2.

**followRedirects**

`bool`

FollowRedirects configures whether scrape requests follow HTTP 3xx redirects.

**honorLabels**

`bool`

HonorLabels chooses the metric&#39;s labels on collisions with target labels.

**honorTimestamps**

`bool`

HonorTimestamps controls whether Prometheus respects the timestamps present in scraped data.

**interval**

`str`

Interval at which metrics should be scraped If not specified Prometheus&#39; global scrape interval is used.

**metricRelabelings**

`[RelabelConfig]`

MetricRelabelConfigs to apply to samples before ingestion.

**oauth2**

`OAuth2`

oauth2

**params**

`{str:[str]}`

Optional HTTP URL parameters

**path**

`str`

HTTP path to scrape for metrics. If empty, Prometheus uses the default value (e.g. `/metrics`).

**port**

`str`

Name of the pod port this endpoint refers to. Mutually exclusive with targetPort.

**proxyUrl**

`str`

ProxyURL eg http://proxyserver:2195 Directs scrapes to proxy through this endpoint.

**relabelings**

`[RelabelConfig]`

RelabelConfigs to apply to samples before scraping. Prometheus Operator automatically adds relabelings for a few standard Kubernetes fields. The original scrape job&#39;s name is available via the `__tmp_prometheus_job_name` label. More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config

**scheme**

`str`

HTTP scheme to use for scraping.

**scrapeTimeout**

`str`

Timeout after which the scrape is ended If not specified, the Prometheus global scrape interval is used.

**targetPort**

`int`

Deprecated: Use &#39;port&#39; instead.

**tlsConfig**

`TLSConfig`

tls config

### Schema PodMonitor

PodMonitor defines monitoring for a set of pods.

#### Attributes

**apiVersion** *required* *readOnly*

`"monitoring.coreos.com/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"PodMonitor"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec** *required*

`PodMonitorSpec`

spec

### Schema PodMonitorSpec

Specification of desired Pod selection for target discovery by Prometheus.

#### Attributes

**attachMetadata**

`AttachMetadata`

attach metadata

**jobLabel**

`str`

The label to use to retrieve the job name from.

**labelLimit**

`int`

Per-scrape limit on number of labels that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**labelNameLengthLimit**

`int`

Per-scrape limit on length of labels name that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**labelValueLengthLimit**

`int`

Per-scrape limit on length of labels value that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**namespaceSelector**

`NamespaceSelector`

namespace selector

**podMetricsEndpoints** *required*

`[PodMetricsEndpoint]`

A list of endpoints allowed as part of this PodMonitor.

**podTargetLabels**

`[str]`

PodTargetLabels transfers labels on the Kubernetes Pod onto the target.

**sampleLimit**

`int`

SampleLimit defines per-scrape limit on number of scraped samples that will be accepted.

**selector** *required*

`LabelSelector`

selector

**targetLimit**

`int`

TargetLimit defines a limit on the number of scraped targets that will be accepted.

### Schema Probe

Probe defines monitoring for a set of static targets or ingresses.

#### Attributes

**apiVersion** *required* *readOnly*

`"monitoring.coreos.com/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Probe"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec** *required*

`ProbeSpec`

spec

### Schema ProbeSpec

Specification of desired Ingress selection for target discovery by Prometheus.

#### Attributes

**authorization**

`SafeAuthorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerTokenSecret**

`SecretKeySelector`

bearer token secret

**interval**

`str`

Interval at which targets are probed using the configured prober. If not specified Prometheus&#39; global scrape interval is used.

**jobName**

`str`

The job name assigned to scraped metrics by default.

**labelLimit**

`int`

Per-scrape limit on number of labels that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**labelNameLengthLimit**

`int`

Per-scrape limit on length of labels name that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**labelValueLengthLimit**

`int`

Per-scrape limit on length of labels value that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**metricRelabelings**

`[RelabelConfig]`

MetricRelabelConfigs to apply to samples before ingestion.

**module**

`str`

The module to use for probing specifying how to probe the target. Example module configuring in the blackbox exporter: https://github.com/prometheus/blackbox_exporter/blob/master/example.yml

**oauth2**

`OAuth2`

oauth2

**prober**

`ProberSpec`

prober

**sampleLimit**

`int`

SampleLimit defines per-scrape limit on number of scraped samples that will be accepted.

**scrapeTimeout**

`str`

Timeout for scraping metrics from the Prometheus exporter. If not specified, the Prometheus global scrape interval is used.

**targetLimit**

`int`

TargetLimit defines a limit on the number of scraped targets that will be accepted.

**targets**

`ProbeTargets`

targets

**tlsConfig**

`ProbeTLSConfig`

tls config

### Schema ProbeTLSConfig

TLS configuration to use when scraping the endpoint.

#### Attributes

**ca**

`SecretOrConfigMap`

ca

**cert**

`SecretOrConfigMap`

cert

**insecureSkipVerify**

`bool`

Disable target certificate validation.

**keySecret**

`SecretKeySelector`

key secret

**serverName**

`str`

Used to verify the hostname for the targets.

### Schema ProbeTargetIngress

ingress defines the Ingress objects to probe and the relabeling configuration. If `staticConfig` is also defined, `staticConfig` takes precedence.

#### Attributes

**namespaceSelector**

`NamespaceSelector`

namespace selector

**relabelingConfigs**

`[RelabelConfig]`

RelabelConfigs to apply to the label set of the target before it gets scraped. The original ingress address is available via the `__tmp_prometheus_ingress_address` label. It can be used to customize the probed URL. The original scrape job&#39;s name is available via the `__tmp_prometheus_job_name` label. More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config

**selector**

`LabelSelector`

selector

### Schema ProbeTargetStaticConfig

staticConfig defines the static list of targets to probe and the relabeling configuration. If `ingress` is also defined, `staticConfig` takes precedence. More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#static_config.

#### Attributes

**labels**

`{str:str}`

Labels assigned to all metrics scraped from the targets.

**relabelingConfigs**

`[RelabelConfig]`

RelabelConfigs to apply to the label set of the targets before it gets scraped. More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config

**static**

`[str]`

The list of hosts to probe.

### Schema ProbeTargets

Targets defines a set of static or dynamically discovered targets to probe.

#### Attributes

**ingress**

`ProbeTargetIngress`

ingress

**staticConfig**

`ProbeTargetStaticConfig`

static config

### Schema ProberSpec

Specification for the prober to use for probing targets. The prober.URL parameter is required. Targets cannot be probed if left empty.

#### Attributes

**path**

`str`

Path to collect metrics from. Defaults to `/probe`.

**proxyUrl**

`str`

Optional ProxyURL.

**scheme**

`str`

HTTP scheme to use for scraping. Defaults to `http`.

**url** *required*

`str`

Mandatory URL of the prober.

### Schema Prometheus

Prometheus defines a Prometheus deployment.

#### Attributes

**apiVersion** *required* *readOnly*

`"monitoring.coreos.com/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Prometheus"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec** *required*

`PrometheusSpec`

spec

**status**

`PrometheusStatus`

status

### Schema PrometheusCondition

PrometheusCondition represents the state of the resources associated with the Prometheus resource.

#### Attributes

**lastTransitionTime** *required*

`str`

lastTransitionTime is the time of the last update to the current status property.

**message**

`str`

Human-readable message indicating details for the condition&#39;s last transition.

**observedGeneration**

`int`

ObservedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.

**reason**

`str`

Reason for the condition&#39;s last transition.

**status** *required*

`str`

status of the condition.

**type** *required*

`str`

### Schema PrometheusRule

PrometheusRule defines recording and alerting rules for a Prometheus instance

#### Attributes

**apiVersion** *required* *readOnly*

`"monitoring.coreos.com/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"PrometheusRule"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec** *required*

`PrometheusRuleSpec`

spec

### Schema PrometheusRuleExcludeConfig

PrometheusRuleExcludeConfig enables users to configure excluded PrometheusRule names and their namespaces to be ignored while enforcing namespace label for alerts and metrics.

#### Attributes

**ruleName** *required*

`str`

RuleNamespace - name of excluded rule

**ruleNamespace** *required*

`str`

RuleNamespace - namespace of excluded rule

### Schema PrometheusRuleSpec

Specification of desired alerting rule definitions for Prometheus.

#### Attributes

**groups**

`[RuleGroup]`

Content of Prometheus rule file

### Schema PrometheusSpec

Specification of the desired behavior of the Prometheus cluster. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

#### Attributes

**additionalAlertManagerConfigs**

`SecretKeySelector`

additional alert manager configs

**additionalAlertRelabelConfigs**

`SecretKeySelector`

additional alert relabel configs

**additionalArgs**

`[Argument]`

AdditionalArgs allows setting additional arguments for the Thanos container. The arguments are passed as-is to the Thanos container which may cause issues if they are invalid or not supported the given Thanos version. In case of an argument conflict (e.g. an argument which is already set by the operator itself) or when providing an invalid argument the reconciliation will fail and an error will be logged.

**additionalScrapeConfigs**

`SecretKeySelector`

additional scrape configs

**affinity**

`Affinity`

affinity

**alerting**

`AlertingSpec`

alerting

**allowOverlappingBlocks**

`bool`

AllowOverlappingBlocks enables vertical compaction and vertical query merge in Prometheus. This is still experimental in Prometheus so it may change in any upcoming release.

**apiserverConfig**

`APIServerConfig`

apiserver config

**arbitraryFSAccessThroughSMs**

`ArbitraryFSAccessThroughSMsConfig`

arbitrary f s access through s ms

**baseImage**

`str`

Base image to use for a Prometheus deployment. Deprecated: use &#39;image&#39; instead

**configMaps**

`[str]`

**containers**

`[Container]`

Containers allows injecting additional containers or modifying operator generated containers. This can be used to allow adding an authentication proxy to a Prometheus pod or to change the behavior of an operator generated container. Containers described here modify an operator generated container if they share the same name and modifications are done via a strategic merge patch. The current container names are: `prometheus`, `config-reloader`, and `thanos-sidecar`. Overriding containers is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice.

**disableCompaction**

`bool`

Disable prometheus compaction.

**enableAdminAPI**

`bool`

Enable access to prometheus web admin API. Defaults to the value of `false`. WARNING: Enabling the admin APIs enables mutating endpoints, to delete data, shutdown Prometheus, and more. Enabling this should be done with care and the user is advised to add additional authentication authorization via a proxy to ensure only clients authorized to perform these actions can do so. For more information see https://prometheus.io/docs/prometheus/latest/querying/api/#tsdb-admin-apis

**enableFeatures**

`[str]`

Enable access to Prometheus disabled features. By default, no features are enabled. Enabling disabled features is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice. For more information see https://prometheus.io/docs/prometheus/latest/disabled_features/

**enableRemoteWriteReceiver**

`bool`

**enforcedBodySizeLimit**

`str`

EnforcedBodySizeLimit defines the maximum size of uncompressed response body that will be accepted by Prometheus. Targets responding with a body larger than this many bytes will cause the scrape to fail. Example: 100MB. If defined, the limit will apply to all service/pod monitors and probes. This is an experimental feature, this behaviour could change or be removed in the future. Only valid in Prometheus versions 2.28.0 and newer.

**enforcedLabelLimit**

`int`

Per-scrape limit on number of labels that will be accepted for a sample. If more than this number of labels are present post metric-relabeling, the entire scrape will be treated as failed. 0 means no limit. Only valid in Prometheus versions 2.27.0 and newer.

**enforcedLabelNameLengthLimit**

`int`

Per-scrape limit on length of labels name that will be accepted for a sample. If a label name is longer than this number post metric-relabeling, the entire scrape will be treated as failed. 0 means no limit. Only valid in Prometheus versions 2.27.0 and newer.

**enforcedLabelValueLengthLimit**

`int`

Per-scrape limit on length of labels value that will be accepted for a sample. If a label value is longer than this number post metric-relabeling, the entire scrape will be treated as failed. 0 means no limit. Only valid in Prometheus versions 2.27.0 and newer.

**enforcedNamespaceLabel**

`str`

EnforcedNamespaceLabel If set, a label will be added to
1. all user-metrics (created by `ServiceMonitor`, `PodMonitor` and `Probe` objects) and
2. in all `PrometheusRule` objects (except the ones excluded in `prometheusRulesExcludedFromEnforce`) to
* alerting &amp; recording rules and
* the metrics used in their expressions (`expr`).
Label name is this field&#39;s value. Label value is the namespace of the created object (mentioned above).

**enforcedSampleLimit**

`int`

EnforcedSampleLimit defines global limit on number of scraped samples that will be accepted. This overrides any SampleLimit set per ServiceMonitor or/and PodMonitor. It is meant to be used by admins to enforce the SampleLimit to keep overall number of samples/series under the desired limit. Note that if SampleLimit is lower that value will be taken instead.

**enforcedTargetLimit**

`int`

EnforcedTargetLimit defines a global limit on the number of scraped targets.  This overrides any TargetLimit set per ServiceMonitor or/and PodMonitor.  It is meant to be used by admins to enforce the TargetLimit to keep the overall number of targets under the desired limit. Note that if TargetLimit is lower, that value will be taken instead, except if either value is zero, in which case the non-zero value will be used.  If both values are zero, no limit is enforced.

**evaluationInterval**

`str`

Interval between consecutive evaluations. Default: `30s`

**excludedFromEnforcement**

`[ObjectReference]`

List of references to PodMonitor, ServiceMonitor, Probe and PrometheusRule objects to be excluded from enforcing a namespace label of origin. Applies only if enforcedNamespaceLabel set to true.

**exemplars**

`Exemplars`

exemplars

**externalLabels**

`{str:str}`

The labels to add to any time series or alerts when communicating with external systems (federation, remote storage, Alertmanager).

**externalUrl**

`str`

The external URL the Prometheus instances will be available under. This is necessary to generate correct URLs. This is necessary if Prometheus is not served from root of a DNS name.

**hostAliases**

`[HostAlias]`

Pods&#39; hostAliases configuration

**hostNetwork**

`bool`

Use the host&#39;s network namespace if true.

**ignoreNamespaceSelectors**

`bool`

IgnoreNamespaceSelectors if set to true will ignore NamespaceSelector settings from all PodMonitor, ServiceMonitor and Probe objects. They will only discover endpoints within the namespace of the PodMonitor, ServiceMonitor and Probe objects. Defaults to false.

**initContainers**

`[Container]`

InitContainers allows adding initContainers to the pod definition. Those can be used to e.g. fetch secrets for injection into the Prometheus configuration from external sources. Any errors during the execution of an initContainer will lead to a restart of the Pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/ InitContainers described here modify an operator generated init containers if they share the same name and modifications are done via a strategic merge patch. The current init container name is: `init-config-reloader`. Overriding init containers is entirely outside the scope of what the maintainers will support and by doing so, you accept that this behaviour may break at any time without notice.

**listenLocal**

`bool`

ListenLocal makes the Prometheus server listen on loopback, so that it does not bind against the Pod IP.

**logFormat**

`"" | "logfmt" | "json"`

Log format for Prometheus to be configured with.

**logLevel**

`"" | "debug" | "info" | "warn" | "error"`

Log level for Prometheus to be configured with.

**minReadySeconds**

`int`

Minimum number of seconds for which a newly created pod should be ready without any of its container crashing for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready) This is an alpha field and requires enabling StatefulSetMinReadySeconds feature gate.

**nodeSelector**

`{str:str}`

Define which Nodes the Pods are scheduled on.

**overrideHonorLabels**

`bool`

When true, Prometheus resolves label conflicts by renaming the labels in the scraped data to &#34;exported_&lt;label value&gt;&#34; for all targets created from service and pod monitors. Otherwise the HonorLabels field of the service or pod monitor applies.

**overrideHonorTimestamps**

`bool`

When true, Prometheus ignores the timestamps for all the targets created from service and pod monitors. Otherwise the HonorTimestamps field of the service or pod monitor applies.

**paused**

`bool`

When a Prometheus deployment is paused, no actions except for deletion will be performed on the underlying objects.

**podMetadata**

`PodMetadata`

pod metadata

**podMonitorNamespaceSelector**

`LabelSelector`

pod monitor namespace selector

**podMonitorSelector**

`LabelSelector`

pod monitor selector

**portName**

`str`

Port name used for the pods and governing service. This defaults to web

**priorityClassName**

`str`

Priority class assigned to the Pods

**probeNamespaceSelector**

`LabelSelector`

probe namespace selector

**probeSelector**

`LabelSelector`

probe selector

**prometheusExternalLabelName**

`str`

Name of Prometheus external label used to denote Prometheus instance name. Defaults to the value of `prometheus`. External label will _not_ be added when value is set to empty string (`&#34;&#34;`).

**prometheusRulesExcludedFromEnforce**

`[PrometheusRuleExcludeConfig]`

PrometheusRulesExcludedFromEnforce - list of prometheus rules to be excluded from enforcing of adding namespace labels. Works only if enforcedNamespaceLabel set to true. Make sure both ruleNamespace and ruleName are set for each pair. Deprecated: use excludedFromEnforcement instead.

**query**

`QuerySpec`

query

**queryLogFile**

`str`

QueryLogFile specifies the file to which PromQL queries are logged. If the filename has an empty path, e.g. &#39;query.log&#39;, prometheus-operator will mount the file into an emptyDir volume at `/var/log/prometheus`. If a full path is provided, e.g. /var/log/prometheus/query.log, you must mount a volume in the specified directory and it must be writable. This is because the prometheus container runs with a read-only root filesystem for security reasons. Alternatively, the location can be set to a stdout location such as `/dev/stdout` to log query information to the default Prometheus log stream. This is only available in versions of Prometheus &gt;= 2.16.0. For more details, see the Prometheus docs (https://prometheus.io/docs/guides/query-log/)

**remoteRead**

`[RemoteReadSpec]`

remoteRead is the list of remote read configurations.

**remoteWrite**

`[RemoteWriteSpec]`

remoteWrite is the list of remote write configurations.

**replicaExternalLabelName**

`str`

**replicas**

`int`

**resources**

`ResourceRequirements`

resources

**retention**

`str`

Time duration Prometheus shall retain data for. Default is &#39;24h&#39; if retentionSize is not set, and must match the regular expression `[0-9]+(ms|s|m|h|d|w|y)` (milliseconds seconds minutes hours days weeks years).

**retentionSize**

`str`

Maximum amount of disk space used by blocks.

**routePrefix**

`str`

**ruleNamespaceSelector**

`LabelSelector`

rule namespace selector

**ruleSelector**

`LabelSelector`

rule selector

**rules**

`Rules`

rules

**scrapeInterval**

`str`

Interval between consecutive scrapes. Default: `30s`

**scrapeTimeout**

`str`

Number of seconds to wait for target to respond before erroring.

**secrets**

`[str]`

Secrets is a list of Secrets in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods. Each Secret is added to the StatefulSet definition as a volume named `secret-&lt;secret-name&gt;`. The Secrets are mounted into /etc/prometheus/secrets/&lt;secret-name&gt; in the &#39;prometheus&#39; container.

**securityContext**

`PodSecurityContext`

security context

**serviceAccountName**

`str`

ServiceAccountName is the name of the ServiceAccount to use to run the Prometheus Pods.

**serviceMonitorNamespaceSelector**

`LabelSelector`

service monitor namespace selector

**serviceMonitorSelector**

`LabelSelector`

service monitor selector

**sha**

`str`

SHA of Prometheus container image to be deployed. Defaults to the value of `version`. Similar to a tag, but the SHA explicitly deploys an immutable container image. Version and Tag are ignored if SHA is set. Deprecated: use &#39;image&#39; instead.  The image digest can be specified as part of the image URL.

**shards**

`int`

EXPERIMENTAL: Number of shards to distribute targets onto. Number of replicas multiplied by shards is the total number of Pods created. Note that scaling down shards will not reshard data onto remaining instances, it must be manually moved. Increasing shards will not reshard data either but it will continue to be available from the same instances. To query globally use Thanos sidecar and Thanos querier or remote write data to a central location. Sharding is done on the content of the `__address__` target meta-label.

**storage**

`StorageSpec`

Storage defines the configured storage for a group Prometheus servers.

**tag**

`str`

Tag of Prometheus container image to be deployed. Defaults to the value of `version`. Version is ignored if Tag is set. Deprecated: use &#39;image&#39; instead.  The image tag can be specified as part of the image URL.

**thanos**

`ThanosSpec`

thanos

**tolerations**

`[Toleration]`

If specified, the pod&#39;s tolerations.

**topologySpreadConstraints**

`[TopologySpreadConstraint]`

If specified, the pod&#39;s topology spread constraints.

**version**

`str`

Version of Prometheus to be deployed.

**volumeMounts**

`[VolumeMount]`

VolumeMounts allows configuration of additional VolumeMounts on the output StatefulSet definition. VolumeMounts specified will be appended to other VolumeMounts in the prometheus container, that are generated as a result of StorageSpec objects.

**volumes**

`[Volume]`

Volumes allows configuration of additional volumes on the output StatefulSet definition. Volumes specified will be appended to other volumes that are generated as a result of StorageSpec objects.

**walCompression**

`bool`

Enable compression of the write-ahead log using Snappy. This flag is only available in versions of Prometheus &gt;= 2.11.0.

**web**

`PrometheusWebSpec`

web

### Schema PrometheusStatus

Most recent observed status of the Prometheus cluster. Read-only. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

#### Attributes

**availableReplicas** *required*

`int`

Total number of available pods (ready for at least minReadySeconds) targeted by this Prometheus deployment.

**conditions**

`[PrometheusCondition]`

The current state of the Prometheus deployment.

**paused** *required*

`bool`

Represents whether any actions on the underlying managed objects are being performed. Only delete actions will be performed.

**replicas** *required*

`int`

Total number of non-terminated pods targeted by this Prometheus deployment (their labels match the selector).

**shardStatuses**

`[ShardStatus]`

The list has one entry per shard. Each entry provides a summary of the shard status.

**unavailableReplicas** *required*

`int`

Total number of unavailable pods targeted by this Prometheus deployment.

**updatedReplicas** *required*

`int`

Total number of non-terminated pods targeted by this Prometheus deployment that have the desired version spec.

### Schema PrometheusWebSpec

Defines the web command line flags when starting Prometheus.

#### Attributes

**httpConfig**

`WebHTTPConfig`

http config

**pageTitle**

`str`

The prometheus web page title

**tlsConfig**

`WebTLSConfig`

tls config

### Schema QuerySpec

QuerySpec defines the query command line flags when starting Prometheus.

#### Attributes

**lookbackDelta**

`str`

The delta difference allowed for retrieving metrics during expression evaluations.

**maxConcurrency**

`int`

Number of concurrent queries that can be run at once.

**maxSamples**

`int`

Maximum number of samples a single query can load into memory. Note that queries will fail if they would load more samples than this into memory, so this also limits the number of samples a query can return.

**timeout**

`str`

Maximum time a query may take before being aborted.

### Schema QueueConfig

QueueConfig allows tuning of the remote write queue parameters.

#### Attributes

**batchSendDeadline**

`str`

BatchSendDeadline is the maximum time a sample will wait in buffer.

**capacity**

`int`

Capacity is the number of samples to buffer per shard before we start dropping them.

**maxBackoff**

`str`

MaxBackoff is the maximum retry delay.

**maxRetries**

`int`

MaxRetries is the maximum number of times to retry a batch on recoverable errors.

**maxSamplesPerSend**

`int`

MaxSamplesPerSend is the maximum number of samples per send.

**maxShards**

`int`

MaxShards is the maximum number of shards, i.e. amount of concurrency.

**minBackoff**

`str`

MinBackoff is the initial retry delay. Gets doubled for every retry.

**minShards**

`int`

MinShards is the minimum number of shards, i.e. amount of concurrency.

**retryOnRateLimit**

`bool`

Retry upon receiving a 429 status code from the remote-write storage. This is experimental feature and might change in the future.

### Schema RelabelConfig

RelabelConfig allows dynamic rewriting of the label set, being applied to samples before ingestion. It defines `&lt;metric_relabel_configs&gt;`-section of Prometheus configuration. More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#metric_relabel_configs

#### Attributes

**action**

`"replace" | "Replace" | "keep" | "Keep" | "drop" | "Drop" | "hashmod" | "HashMod" | "labelmap" | "LabelMap" | "labeldrop" | "LabelDrop" | "labelkeep" | "LabelKeep" | "lowercase" | "Lowercase" | "uppercase" | "Uppercase"`

Action to perform based on regex matching. Default is &#39;replace&#39;. uppercase and lowercase actions require Prometheus &gt;= 2.36.

**modulus**

`int`

Modulus to take of the hash of the source label values.

**regex**

`str`

Regular expression against which the extracted value is matched. Default is &#39;(.*)&#39;

**replacement**

`str`

Replacement value against which a regex replace is performed if the regular expression matches. Regex capture groups are available. Default is &#39;$1&#39;

**separator**

`str`

Separator placed between concatenated source label values. default is &#39;;&#39;.

**sourceLabels**

`[str]`

The source labels select values from existing labels. Their content is concatenated using the configured separator and matched against the configured regular expression for the replace, keep, and drop actions.

**targetLabel**

`str`

Label to which the resulting value is written in a replace action. It is mandatory for replace actions. Regex capture groups are available.

### Schema RemoteReadSpec

RemoteReadSpec defines the configuration for Prometheus to read back samples from a remote endpoint.

#### Attributes

**authorization**

`Authorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerToken**

`str`

Bearer token for remote read.

**bearerTokenFile**

`str`

File to read bearer token for remote read.

**headers**

`{str:str}`

Custom HTTP headers to be sent along with each remote read request. Be aware that headers that are set by Prometheus itself can&#39;t be overwritten. Only valid in Prometheus versions 2.26.0 and newer.

**name**

`str`

The name of the remote read queue, it must be unique if specified. The name is used in metrics and logging in order to differentiate read configurations.  Only valid in Prometheus versions 2.15.0 and newer.

**oauth2**

`OAuth2`

oauth2

**proxyUrl**

`str`

Optional ProxyURL.

**readRecent**

`bool`

Whether reads should be made for queries for time ranges that the local storage should have complete data for.

**remoteTimeout**

`str`

Timeout for requests to the remote read endpoint.

**requiredMatchers**

`{str:str}`

An optional list of equality matchers which have to be present in a selector to query the remote read endpoint.

**tlsConfig**

`TLSConfig`

tls config

**url** *required*

`str`

The URL of the endpoint to query from.

### Schema RemoteWriteSpec

RemoteWriteSpec defines the configuration to write samples from Prometheus to a remote endpoint.

#### Attributes

**authorization**

`Authorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerToken**

`str`

Bearer token for remote write.

**bearerTokenFile**

`str`

File to read bearer token for remote write.

**headers**

`{str:str}`

Custom HTTP headers to be sent along with each remote write request. Be aware that headers that are set by Prometheus itself can&#39;t be overwritten. Only valid in Prometheus versions 2.25.0 and newer.

**metadataConfig**

`MetadataConfig`

metadata config

**name**

`str`

The name of the remote write queue, it must be unique if specified. The name is used in metrics and logging in order to differentiate queues. Only valid in Prometheus versions 2.15.0 and newer.

**oauth2**

`OAuth2`

oauth2

**proxyUrl**

`str`

Optional ProxyURL.

**queueConfig**

`QueueConfig`

queue config

**remoteTimeout**

`str`

Timeout for requests to the remote write endpoint.

**sendExemplars**

`bool`

Enables sending of exemplars over remote write. Note that exemplar-storage itself must be enabled using the enableFeature option for exemplars to be scraped in the first place.  Only valid in Prometheus versions 2.27.0 and newer.

**sigv4**

`Sigv4`

sigv4

**tlsConfig**

`TLSConfig`

tls config

**url** *required*

`str`

The URL of the endpoint to send samples to.

**writeRelabelConfigs**

`[RelabelConfig]`

The list of remote write relabel configurations.

### Schema Rule

Rule describes an alerting or recording rule. See Prometheus documentation: [alerting](https://www.prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) or [recording](https://www.prometheus.io/docs/prometheus/latest/configuration/recording_rules/#recording-rules) rule

#### Attributes

**alert**

`str`

alert

**annotations**

`{str:str}`

annotations

**expr** *required*

`int | str`

expr

**for**

`str`

**labels**

`{str:str}`

labels

**record**

`str`

record

### Schema RuleGroup

RuleGroup is a list of sequentially evaluated recording and alerting rules. Note: PartialResponseStrategy is only used by ThanosRuler and will be ignored by Prometheus instances. Valid values for this field are &#39;warn&#39; or &#39;abort&#39;. More info: https://github.com/thanos-io/thanos/blob/main/docs/components/rule.md#partial-response

#### Attributes

**interval**

`str`

interval

**name** *required*

`str`

name

**partial_response_strategy**

`str`

partial response strategy

**rules** *required*

`[Rule]`

rules

### Schema Rules

/--rules.*/ command-line arguments.

#### Attributes

**alert**

`RulesAlert`

alert

### Schema RulesAlert

/--rules.alert.*/ command-line arguments

#### Attributes

**forGracePeriod**

`str`

Minimum duration between alert and restored &#39;for&#39; state. This is maintained only for alerts with configured &#39;for&#39; time greater than grace period.

**forOutageTolerance**

`str`

Max time to tolerate prometheus outage for restoring &#39;for&#39; state of alert.

**resendDelay**

`str`

Minimum amount of time to wait before resending an alert to Alertmanager.

### Schema SafeAuthorization

Authorization section for this endpoint

#### Attributes

**credentials**

`SecretKeySelector`

credentials

**type**

`str`

### Schema SafeTLSConfig

TLS configuration for the client.

#### Attributes

**ca**

`SecretOrConfigMap`

ca

**cert**

`SecretOrConfigMap`

cert

**insecureSkipVerify**

`bool`

Disable target certificate validation.

**keySecret**

`SecretKeySelector`

key secret

**serverName**

`str`

Used to verify the hostname for the targets.

### Schema SecretOrConfigMap

The secret or configmap containing the OAuth2 client id

#### Attributes

**configMap**

`ConfigMapKeySelector`

config map

**secret**

`SecretKeySelector`

secret

### Schema ServiceMonitor

ServiceMonitor defines monitoring for a set of services.

#### Attributes

**apiVersion** *required* *readOnly*

`"monitoring.coreos.com/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"ServiceMonitor"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec** *required*

`ServiceMonitorSpec`

spec

### Schema ServiceMonitorSpec

Specification of desired Service selection for target discovery by Prometheus.

#### Attributes

**endpoints** *required*

`[Endpoint]`

A list of endpoints allowed as part of this ServiceMonitor.

**jobLabel**

`str`

JobLabel selects the label from the associated Kubernetes service which will be used as the `job` label for all metrics.
For example: If in `ServiceMonitor.spec.jobLabel: foo` and in `Service.metadata.labels.foo: bar`, then the `job=&#34;bar&#34;` label is added to all metrics.  If the value of this field is empty or if the label doesn&#39;t exist for the given Service, the `job` label of the metrics defaults to the name of the Kubernetes Service.

**labelLimit**

`int`

Per-scrape limit on number of labels that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**labelNameLengthLimit**

`int`

Per-scrape limit on length of labels name that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**labelValueLengthLimit**

`int`

Per-scrape limit on length of labels value that will be accepted for a sample. Only valid in Prometheus versions 2.27.0 and newer.

**namespaceSelector**

`NamespaceSelector`

namespace selector

**podTargetLabels**

`[str]`

PodTargetLabels transfers labels on the Kubernetes `Pod` onto the created metrics.

**sampleLimit**

`int`

SampleLimit defines per-scrape limit on number of scraped samples that will be accepted.

**selector** *required*

`LabelSelector`

selector

**targetLabels**

`[str]`

TargetLabels transfers labels from the Kubernetes `Service` onto the created metrics.

**targetLimit**

`int`

TargetLimit defines a limit on the number of scraped targets that will be accepted.

### Schema ShardStatus

monitoring coreos com v1 prometheus status shard statuses items0

#### Attributes

**availableReplicas** *required*

`int`

Total number of available pods (ready for at least minReadySeconds) targeted by this shard.

**replicas** *required*

`int`

Total number of pods targeted by this shard.

**shardID** *required*

`str`

Identifier of the shard.

**unavailableReplicas** *required*

`int`

Total number of unavailable pods targeted by this shard.

**updatedReplicas** *required*

`int`

Total number of non-terminated pods targeted by this shard that have the desired spec.

### Schema Sigv4

Configures AWS&#39;s Signature Verification 4 signing process to sign requests.

#### Attributes

**accessKey**

`SecretKeySelector`

access key

**profile**

`str`

Profile is the named AWS profile used to authenticate.

**region**

`str`

Region is the AWS region. If blank, the region from the default credentials chain used.

**roleArn**

`str`

RoleArn is the named AWS profile used to authenticate.

**secretKey**

`SecretKeySelector`

secret key

### Schema StorageSpec

Storage is the definition of how storage will be used by the Alertmanager instances.

#### Attributes

**disableMountSubPath**

`bool`

Deprecated: subPath usage will be disabled by default in a future release, this option will become unnecessary. DisableMountSubPath allows to remove any subPath usage in volume mounts.

**emptyDir**

`EmptyDirVolumeSource`

empty dir

**ephemeral**

`EphemeralVolumeSource`

ephemeral

**volumeClaimTemplate**

`EmbeddedPersistentVolumeClaim`

volume claim template

### Schema TLSConfig

TLS configuration to use when scraping the endpoint

#### Attributes

**ca**

`SecretOrConfigMap`

ca

**caFile**

`str`

Path to the CA cert in the Prometheus container to use for the targets.

**cert**

`SecretOrConfigMap`

cert

**certFile**

`str`

Path to the client cert file in the Prometheus container for the targets.

**insecureSkipVerify**

`bool`

Disable target certificate validation.

**keyFile**

`str`

Path to the client key file in the Prometheus container for the targets.

**keySecret**

`SecretKeySelector`

key secret

**serverName**

`str`

Used to verify the hostname for the targets.

### Schema ThanosSpec

Thanos configuration allows configuring various aspects of a Prometheus server in a Thanos environment. This section is experimental, it may change significantly without deprecation notice in any release.  This is experimental and may change significantly without backward compatibility in any release.

#### Attributes

**additionalArgs**

`[Argument]`

AdditionalArgs allows setting additional arguments for the Thanos container. The arguments are passed as-is to the Thanos container which may cause issues if they are invalid or not supported the given Thanos version. In case of an argument conflict (e.g. an argument which is already set by the operator itself) or when providing an invalid argument the reconciliation will fail and an error will be logged.

**baseImage**

`str`

Thanos base image if other than default. Deprecated: use &#39;image&#39; instead

**grpcServerTlsConfig**

`TLSConfig`

grpc server Tls config

**image**

`str`

Image if specified has precedence over baseImage, tag and sha combinations. Specifying the version is still necessary to ensure the Prometheus Operator knows what version of Thanos is being configured.

**listenLocal**

`bool`

ListenLocal makes the Thanos sidecar listen on loopback, so that it does not bind against the Pod IP.

**logFormat**

`"" | "logfmt" | "json"`

LogFormat for Thanos sidecar to be configured with.

**logLevel**

`"" | "debug" | "info" | "warn" | "error"`

LogLevel for Thanos sidecar to be configured with.

**minTime**

`str`

MinTime for Thanos sidecar to be configured with. Option can be a constant time in RFC3339 format or time duration relative to current time, such as -1d or 2h45m. Valid duration units are ms, s, m, h, d, w, y.

**objectStorageConfig**

`SecretKeySelector`

object storage config

**objectStorageConfigFile**

`str`

ObjectStorageConfigFile specifies the path of the object storage configuration file. When used alongside with ObjectStorageConfig, ObjectStorageConfigFile takes precedence.

**readyTimeout**

`str`

ReadyTimeout is the maximum time Thanos sidecar will wait for Prometheus to start. Eg 10m

**resources**

`ResourceRequirements`

resources

**sha**

`str`

SHA of Thanos container image to be deployed. Defaults to the value of `version`. Similar to a tag, but the SHA explicitly deploys an immutable container image. Version and Tag are ignored if SHA is set. Deprecated: use &#39;image&#39; instead.  The image digest can be specified as part of the image URL.

**tag**

`str`

Tag of Thanos sidecar container image to be deployed. Defaults to the value of `version`. Version is ignored if Tag is set. Deprecated: use &#39;image&#39; instead.  The image tag can be specified as part of the image URL.

**tracingConfig**

`SecretKeySelector`

tracing config

**tracingConfigFile**

`str`

TracingConfig specifies the path of the tracing configuration file. When used alongside with TracingConfig, TracingConfigFile takes precedence.

**version**

`str`

Version describes the version of Thanos to use.

**volumeMounts**

`[VolumeMount]`

VolumeMounts allows configuration of additional VolumeMounts on the output StatefulSet definition. VolumeMounts specified will be appended to other VolumeMounts in the thanos-sidecar container.

### Schema WebHTTPConfig

Defines HTTP parameters for web server.

#### Attributes

**headers**

`WebHTTPHeaders`

headers

**http2**

`bool`

Enable HTTP/2 support. Note that HTTP/2 is only supported with TLS. When TLSConfig is not configured, HTTP/2 will be disabled. Whenever the value of the field changes, a rolling update will be triggered.

### Schema WebHTTPHeaders

List of headers that can be added to HTTP responses.

#### Attributes

**contentSecurityPolicy**

`str`

Set the Content-Security-Policy header to HTTP responses. Unset if blank.

**strictTransportSecurity**

`str`

Set the Strict-Transport-Security header to HTTP responses. Unset if blank. Please make sure that you use this with care as this header might force browsers to load Prometheus and the other applications hosted on the same domain and subdomains over HTTPS. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security

**xContentTypeOptions**

`"" | "NoSniff"`

Set the X-Content-Type-Options header to HTTP responses. Unset if blank. Accepted value is nosniff. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options

**xFrameOptions**

`"" | "Deny" | "SameOrigin"`

Set the X-Frame-Options header to HTTP responses. Unset if blank. Accepted values are deny and sameorigin. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options

**xXSSProtection**

`str`

Set the X-XSS-Protection header to all responses. Unset if blank. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection

### Schema WebTLSConfig

Defines the TLS parameters for HTTPS.

#### Attributes

**cert** *required*

`SecretKeySelector`

cert

**cipherSuites**

`[str]`

List of supported cipher suites for TLS versions up to TLS 1.2. If empty, Go default cipher suites are used. Available cipher suites are documented in the go documentation: https://golang.org/pkg/crypto/tls/#pkg-constants

**clientAuthType**

`str`

Server policy for client authentication. Maps to ClientAuth Policies. For more detail on clientAuth options: https://golang.org/pkg/crypto/tls/#ClientAuthType

**client_ca**

`SecretKeySelector`

client ca

**curvePreferences**

`[str]`

Elliptic curves that will be used in an ECDHE handshake, in preference order. Available curves are documented in the go documentation: https://golang.org/pkg/crypto/tls/#CurveID

**keySecret** *required*

`SecretKeySelector`

key secret

**maxVersion**

`str`

Maximum TLS version that is acceptable. Defaults to TLS13.

**minVersion**

`str`

Minimum TLS version that is acceptable. Defaults to TLS12.

**preferServerCipherSuites**

`bool`

Controls whether the server selects the client&#39;s most preferred cipher suite, or the server&#39;s most preferred cipher suite. If true then the server&#39;s preference, as expressed in the order of elements in cipherSuites, is used.

<!-- Auto generated by kcl-doc tool, please do not edit. -->
