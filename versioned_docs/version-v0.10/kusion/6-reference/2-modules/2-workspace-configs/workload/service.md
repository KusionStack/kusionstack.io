# service

`service` can be used to define workspace-level service configuration.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
| **replicas**<br />Number of container replicas based on this configuration that should be ran.                                                         |int|2| optional |
| **labels**<br />Labels are key/value pairs that are attached to the workload.                                                                          |{str: str}|Undefined| optional |
| **annotations**<br />Annotations are key/value pairs that attach arbitrary non-identifying metadata to the workload.                                   |{str: str}|Undefined| optional |
| **type**<br />Type represents the type of workload used by this Service. Currently, it supports several<br />types, including Deployment and CollaSet. |"Deployment" \| "CollaSet"| Deployment |**required**|

### Examples
```yaml
modules:
  service:
    default:
      replicas: 3
      labels:
        label-key: label-value
      annotations:
        annotation-key: annotation-value
      type: CollaSet
```