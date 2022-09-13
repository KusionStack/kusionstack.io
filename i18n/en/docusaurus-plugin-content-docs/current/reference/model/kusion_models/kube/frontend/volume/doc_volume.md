# volume

Source: [base/pkg/kusion_models/kube/frontend/volume/volume.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/volume/volume.k)

## Schema Volume

Volume represents a named volume and corresponding mounts in containers.

### Attributes

| Name and Description                                                                                                                                                                          | Type                                   | Default Value                      | Required                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**<br />Volume's name. Must be a DNS\_LABEL and unique within the pod. <br />More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/\#names | str                                    | Undefined                          | **required**                                                                                                                                                                                                                 |
| **volumeSource**<br />VolumeSource represents the location and type of the mounted volume.                                                                                              | [volume.EmptyDir](#schema-emptydir) \ | [volume.Secret](#schema-secret) \ | [volume.ConfigMap](#schema-configmap) \| [volume.FlexVolume](#schema-flexvolume) \| [volume.HostPath](#schema-hostpath) \| [volume.DownwardAPI](#schema-downwardapi) \| [volume.CSI](#schema-csi)|Undefined|**required** |
| **mounts**<br />Volumes to mount into the container's filesystem.                                                                                                                       | [[volume.Mount](#schema-mount)]        | Undefined                          | optional                                                                                                                                                                                                                     |
### Examples
```python
volume = v.Volume {
    name = "kubeconfig"
    volumeSource = v.Secret {
        secretName = "kubeconfig"
        defaultMode =  420
    }
    mounts = [
        v.Mount {
            path = "/etc/kubernetes/kubeconfig"
            readOnly = true
        }
    ]
}
```

## Schema Mount

Mount represents a mounting of a Volume within a container.

### Attributes

| Name and Description                                                                                                                       | Type | Default Value | Required     |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------------- | ------------ |
| **container**<br />A Pod-level attribute.<br />Name of container to mount, \* represents all containers.                     | str  | *             | **required** |
| **path**<br />A Container-level attribute.<br />Path within the container at which the volume should be mounted.               | str  | Undefined     | **required** |
| **subPath**<br />A Container-level attribute.<br />Path within the volume from which the container's volume should be mounted. | str  | Undefined     | optional     |
| **readOnly**<br />A Container-level attribute.<br />Mounted read-only if true, read-write otherwise.                           | bool | False         | optional     |
## Schema EmptyDir

EmptyDir represents a temporary directory that shares a pod's lifetime.

### Attributes

| Name and Description                                                                                                        | Type  | Default Value | Required        |
| --------------------------------------------------------------------------------------------------------------------------- | ----- | ------------- | --------------- |
| **medium**<br />A Pod-level attribute.<br />What type of storage medium should back this directory.             | "" \ | "Memory"      | ""|**required** |
| **sizeLimit**<br />A Pod-level attribute.<br />Total amount of local storage required for this EmptyDir volume. | str   | Undefined     | optional        |
## Schema Secret

Secret represents a secret that should populate this volume.

### Attributes

| Name and Description                                                                                                        | Type         | Default Value | Required     |
| --------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------- | ------------ |
| **secretName**<br />A Pod-level attribute.<br />Name of the secret in the pod's namespace to use.               | str          | Undefined     | **required** |
| **items**<br />A Pod-level attribute.<br />Key-value pairs projected into the volume.                           | [{str: str}] | Undefined     | optional     |
| **defaultMode**<br />A Pod-level attribute.<br />Mode bits used to set permissions on created files by default. | int          | Undefined     | optional     |
## Schema ConfigMap

ConfigMap represents a secret that should populate this volume.

### Attributes

| Name and Description                                                                                                        | Type         | Default Value | Required     |
| --------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------- | ------------ |
| **name**<br />A Pod-level attribute.<br />Name of the configMap in the pod's namespace to use.                  | str          | Undefined     | **required** |
| **items**<br />A Pod-level attribute.<br />Key-value pairs projected into the volume.                           | [{str: str}] | Undefined     | optional     |
| **defaultMode**<br />A Pod-level attribute.<br />Mode bits used to set permissions on created files by default. | int          | Undefined     | optional     |
## Schema FlexVolume

FlexVolume represents a secret that should populate this volume.

### Attributes

| Name and Description                                                                                                                                                                                                                            | Type       | Default Value | Required     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------- | ------------ |
| **driver**<br />A Pod-level attribute.<br />Driver is the name of the driver to use for this volume.                                                                                                                                | str        | Undefined     | **required** |
| **fsType**<br />A Pod-level attribute.<br />Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". <br />The default filesystem depends on FlexVolume script. | str        | Undefined     | optional     |
| **options**<br />A Pod-level attribute.<br />Extra command options if any.                                                                                                                                                          | {str: str} | Undefined     | optional     |
| **readOnly**<br />A Pod-level attribute.<br />Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.                                                                              | bool       | False         | optional     |
## Schema HostPath

HostPath represents a secret that should populate this volume.

### Attributes

| Name and Description                                                                                                                                                                                                                                | Type | Default Value | Required     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------- | ------------ |
| **path**<br />A Pod-level attribute.<br />Path of the directory on the host. If the path is a symlink, it will follow the link to the real path. <br />More info: https://kubernetes.io/docs/concepts/storage/volumes\#hostpath | str  | Undefined     | **required** |
| **type**<br />A Pod-level attribute.<br />Type for HostPath Volume Defaults to "" <br />More info: https://kubernetes.io/docs/concepts/storage/volumes\#hostpath                                                                | str  | Undefined     | optional     |
## Schema DownwardAPI

DownwardAPI represents a secret that should populate this volume.

### Attributes

| Name and Description                                                                                                        | Type         | Default Value | Required |
| --------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------- | -------- |
| **defaultMode**<br />A Pod-level attribute.<br />Mode bits used to set permissions on created files by default. | int          | Undefined     | optional |
| **items**<br />A Pod-level attribute.<br />Items is a list of downward API volume file                          | [{str: any}] | Undefined     | optional |
## Schema CSI

CSI (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers (Beta feature).

### Attributes

| Name and Description                                                                                                                                                                                                                            | Type       | Default Value | Required |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------- | -------- |
| **driver**<br />A Pod-level attribute.<br />Driver is the name of the driver to use for this volume.                                                                                                                                | str        | Undefined     | optional |
| **fsType**<br />A Pod-level attribute.<br />Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". <br />The default filesystem depends on FlexVolume script. | str        | Undefined     | optional |
| **readOnly**<br />A Pod-level attribute.<br />Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.                                                                              | bool       | False         | optional |
| **volumeAttributes**<br />A Pod-level attribute.<br />Extra command options if any.                                                                                                                                                 | {str: str} | Undefined     | optional |
<!-- Auto generated by kcl-doc tool, please do not edit. -->
