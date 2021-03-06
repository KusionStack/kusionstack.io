# aws_elastic_block_store_volume_source

Source: [base/pkg/kusion_kubernetes/api/core/v1/aws_elastic_block_store_volume_source.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/aws_elastic_block_store_volume_source.k)

This is the aws\_elastic\_block\_store\_volume\_source module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema AWSElasticBlockStoreVolumeSource

Represents a Persistent Disk resource in AWS.<br />An AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**fsType**<br />     Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes\#awselasticblockstore<br />partition : int, default is Undefined, optional<br />     The partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).<br />readOnly : bool, default is Undefined, optional<br />     Specify "true" to force and set the ReadOnly property in VolumeMounts to "true". If omitted, the default is "false". More info: https://kubernetes.io/docs/concepts/storage/volumes\#awselasticblockstore<br />volumeID : str, default is Undefined, required<br />     Unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes\#awselasticblockstore|str|Undefined|optional|
|**partition**|int|Undefined|optional|
|**readOnly**|bool|Undefined|optional|
|**volumeID**|str|Undefined|**required**|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
