# node_config_source

Source: [base/pkg/kusion_kubernetes/api/core/v1/node_config_source.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/node_config_source.k)

This is the node\_config\_source module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema NodeConfigSource

NodeConfigSource specifies a source of node configuration. Exactly one subfield (excluding metadata) must be non-nil. This API is deprecated since 1.22

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**configMap**<br />ConfigMap is a reference to a Node's ConfigMap|[ConfigMapNodeConfigSource](doc_config_map_node_config_source#schema-configmapnodeconfigsource)|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
