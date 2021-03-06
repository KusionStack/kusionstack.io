# storage_os_volume_source

Source: [base/pkg/kusion_kubernetes/api/core/v1/storage_os_volume_source.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/storage_os_volume_source.k)

This is the storage\_os\_volume\_source module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema StorageOSVolumeSource

Represents a StorageOS persistent volume resource.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**fsType**<br />Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.|str|Undefined|optional|
|**readOnly**<br />Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.|bool|Undefined|optional|
|**volumeName**<br />VolumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.|str|Undefined|optional|
|**volumeNamespace**<br />VolumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.|str|Undefined|optional|
|**secretRef**<br />SecretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.|[LocalObjectReference](doc_local_object_reference#schema-localobjectreference)|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
