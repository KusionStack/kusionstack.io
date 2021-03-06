# pod_template_spec

Source: [base/pkg/kusion_kubernetes/api/core/v1/pod_template_spec.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/pod_template_spec.k)

This is the pod\_template\_spec module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema PodTemplateSpec

PodTemplateSpec describes the data a pod should have when created from a template

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**metadata**<br />Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md\#metadata|[apis.ObjectMeta](../../../apimachinery/apis/doc_object_meta#schema-objectmeta)|Undefined|optional|
|**spec**<br />Specification of the desired behavior of the pod. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md\#spec-and-status|[PodSpec](doc_pod_spec#schema-podspec)|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
