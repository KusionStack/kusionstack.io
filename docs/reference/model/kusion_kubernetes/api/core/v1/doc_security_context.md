# security_context

Source: [base/pkg/kusion_kubernetes/api/core/v1/security_context.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/security_context.k)

This is the security\_context module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema SecurityContext

SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**allowPrivilegeEscalation**<br />AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no\_new\_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP\_SYS\_ADMIN|bool|Undefined|optional|
|**privileged**<br />Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false.|bool|Undefined|optional|
|**procMount**<br />procMount denotes the type of proc mount to use for the containers. The default is DefaultProcMount which uses the container runtime defaults for readonly paths and masked paths. This requires the ProcMountType feature flag to be enabled.|str|Undefined|optional|
|**readOnlyRootFilesystem**<br />Whether this container has a read-only root filesystem. Default is false.|bool|Undefined|optional|
|**runAsGroup**<br />The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.|int|Undefined|optional|
|**runAsNonRoot**<br />Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.|bool|Undefined|optional|
|**runAsUser**<br />The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.|int|Undefined|optional|
|**capabilities**<br />The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime.|[Capabilities](doc_capabilities#schema-capabilities)|Undefined|optional|
|**seLinuxOptions**<br />The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.|[SELinuxOptions](doc_se_linux_options#schema-selinuxoptions)|Undefined|optional|
|**seccompProfile**<br />The seccomp options to use by this container. If seccomp options are provided at both the pod & container level, the container options override the pod options.|[SeccompProfile](doc_seccomp_profile#schema-seccompprofile)|Undefined|optional|
|**windowsOptions**<br />The Windows specific settings applied to all containers. If unspecified, the options from the PodSecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.|[WindowsSecurityContextOptions](doc_windows_security_context_options#schema-windowssecuritycontextoptions)|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
