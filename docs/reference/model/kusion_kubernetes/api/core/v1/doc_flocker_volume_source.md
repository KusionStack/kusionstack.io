# flocker_volume_source

Source: [base/pkg/kusion_kubernetes/api/core/v1/flocker_volume_source.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/flocker_volume_source.k)

This is the flocker\_volume\_source module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema FlockerVolumeSource

Represents a Flocker volume mounted by the Flocker agent. One and only one of datasetName and datasetUUID should be set. Flocker volumes do not support ownership management or SELinux relabeling.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**datasetName**<br />Name of the dataset stored as metadata -\> name on the dataset for Flocker should be considered as deprecated|str|Undefined|optional|
|**datasetUUID**<br />UUID of the dataset. This is unique identifier of a Flocker dataset|str|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
