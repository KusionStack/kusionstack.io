# node_selector_term

Source: [base/pkg/kusion_kubernetes/api/core/v1/node_selector_term.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/node_selector_term.k)

This is the node\_selector\_term module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema NodeSelectorTerm

A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**matchExpressions**<br />A list of node selector requirements by node's labels.|[[v1.NodeSelectorRequirement](doc_node_selector_requirement#schema-nodeselectorrequirement)]|Undefined|optional|
|**matchFields**<br />A list of node selector requirements by node's fields.|[[v1.NodeSelectorRequirement](doc_node_selector_requirement#schema-nodeselectorrequirement)]|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
