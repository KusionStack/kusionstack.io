# resource_field_selector

Source: [base/pkg/kusion_kubernetes/api/core/v1/resource_field_selector.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/resource_field_selector.k)

This is the resource\_field\_selector module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema ResourceFieldSelector

ResourceFieldSelector represents container resources (cpu, memory) and their output format

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**containerName**<br />Container name: required for volumes, optional for env vars|str|Undefined|optional|
|**divisor**<br />Specifies the output format of the exposed resources, defaults to "1"|str|Undefined|optional|
|**resource**<br />Required: resource to select|str|Undefined|**required**|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
