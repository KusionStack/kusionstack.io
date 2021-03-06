# label_selector

Source: [base/pkg/kusion_kubernetes/apimachinery/apis/label_selector.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/apimachinery/apis/label_selector.k)

This is the label\_selector module in kusion\_kubernetes.apimachinery.apis package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema LabelSelector

A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**matchExpressions**<br />matchExpressions is a list of label selector requirements. The requirements are ANDed.|[[apis.LabelSelectorRequirement](doc_label_selector_requirement#schema-labelselectorrequirement)]|Undefined|optional|
|**matchLabels**<br />matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.|{str: str}|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
