# persistent_volume_claim

Source: [base/pkg/kusion_kubernetes/api/core/v1/persistent_volume_claim.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/persistent_volume_claim.k)

This is the persistent\_volume\_claim module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema PersistentVolumeClaim

PersistentVolumeClaim is a user's request for and claim to a persistent volume

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**apiVersion**<br />APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md\#resources|"v1"|"v1"|**required**|
|**kind**<br />Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md\#types-kinds|"PersistentVolumeClaim"|"PersistentVolumeClaim"|**required**|
|**metadata**<br />Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md\#metadata|[apis.ObjectMeta](../../../apimachinery/apis/doc_object_meta#schema-objectmeta)|Undefined|optional|
|**spec**<br />Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes\#persistentvolumeclaims|[PersistentVolumeClaimSpec](doc_persistent_volume_claim_spec#schema-persistentvolumeclaimspec)|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
