# pod_security_context

Source: [base/pkg/kusion_kubernetes/api/core/v1/pod_security_context.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/pod_security_context.k)

This is the pod\_security\_context module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema PodSecurityContext

PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**fsGroup**<br />A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:|int|Undefined|optional|
|**fsGroupChangePolicy**|str|Undefined|optional|
|**runAsGroup**|int|Undefined|optional|
|**runAsNonRoot**|bool|Undefined|optional|
|**runAsUser**|int|Undefined|optional|
|**supplementalGroups**|[int]|Undefined|optional|
|**sysctls**|[[v1.Sysctl](doc_sysctl#schema-sysctl)]|Undefined|optional|
|**seLinuxOptions**|[SELinuxOptions](doc_se_linux_options#schema-selinuxoptions)|Undefined|optional|
|**seccompProfile**|[SeccompProfile](doc_seccomp_profile#schema-seccompprofile)|Undefined|optional|
|**windowsOptions**|[WindowsSecurityContextOptions](doc_windows_security_context_options#schema-windowssecuritycontextoptions)|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
