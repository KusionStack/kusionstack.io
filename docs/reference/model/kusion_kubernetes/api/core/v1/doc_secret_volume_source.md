# secret_volume_source

Source: [base/pkg/kusion_kubernetes/api/core/v1/secret_volume_source.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/core/v1/secret_volume_source.k)

This is the secret\_volume\_source module in kusion\_kubernetes.api.core.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema SecretVolumeSource

Adapts a Secret into a volume.<br />The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names. Secret volumes support ownership management and SELinux relabeling.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**defaultMode**<br />     Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.<br />items : [KeyToPath], default is Undefined, optional<br />     If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.<br />optional : bool, default is Undefined, optional<br />     Specify whether the Secret or its keys must be defined<br />secretName : str, default is Undefined, optional<br />     Name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes\#secret|int|Undefined|optional|
|**items**|[[v1.KeyToPath](doc_key_to_path#schema-keytopath)]|Undefined|optional|
|**optional**|bool|Undefined|optional|
|**secretName**|str|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
