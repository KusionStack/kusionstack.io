# opensearch 

`opensearch` can be used to define an AWS OpenSearch Service. 

## Attributes

### Schema OpenSearch

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**clusterConfig**<br />The configurations for the cluster of the domain.<br />|[ClusterConfig](#schema-clusterconfig)|Undefined|False|
|**ebsOptions**<br />The options for EBS volumes attached to data nodes in the domain.<br />|[EbsOptions](#schema-ebsoptions)|Undefined|False|
|**region**<br />The AWS region.<br />|str|Undefined|True|
|**statement**<br />The statement of the OpenSearch Service.<br />|[Statement](#schema-statement)[]||True|

### Schema ClusterConfig

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**instanceType**<br />The instance type of data nodes in the cluster.<br />|str|Undefined|False|

### Schema EbsOptions

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**ebsEnabled**<br />Whether EBS volumes are attached to data nodes in the domain.<br />|bool|False|False|
|**volumeSize**<br />The size of EBS volumes attached to data nodes (in GiB).<br />|int|Undefined|Required if ebsEnabled is set to True|

### Schema Statement

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**effect**<br />Whether this statement allows or denies the given actions. Valid values are Allow and Deny.<br />|"Allow" or "Deny"|"Allow"|True|
|**principles**<br />The configuration block for principals.<br />|[Principal](#schema-principal)|Undefined|False|
|**action**<br />The list of actions that this statement either allows or denies.<br />|[]str|Undefined|False|

### Schema Principal

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**type**<br />The type of principal. Valid values include AWS, Service, Federated, CanonicalUser and *.<br />|str|Undefined|False|
|**identifiers**<br />The list of identifiers for principals.<br />|[]str|Undefined|False|

## Examples

```yaml
modules: 
    opensearch:
        path: oci://ghcr.io/kusionstack/opensearch
        version: 0.1.0
        configs:
            default:
                region: us-east-1
                clusterConfig:
                    instanceType: r6g.large.search
                ebsEnabled: true
                volumeSize: 10
                statement:
                - effect: Allow
                principals:
                - type: AWS
                    identifiers:
                    - "*"
                action:
                - es:*
```
