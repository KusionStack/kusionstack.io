# photon_persistent_disk_volume_source

Source: [base/pkg/kusion_kubernetes/api/core/v1/photon_persistent_disk_volume_source.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/photon_persistent_disk_volume_source.k)

This is the photon\_persistent\_disk\_volume\_source module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema PhotonPersistentDiskVolumeSource

Represents a Photon Controller persistent disk resource.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**fsType**<br />Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.|str|Undefined|optional|
|**pdID**<br />ID that identifies Photon Controller persistent disk|str|Undefined|**required**|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
