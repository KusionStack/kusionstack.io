# opsrule 

`opsrule` can be used to define workspace-level operational rule configurations.

## Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**maxUnavailable**<br />The maximum percentage of the total pod instances in the component that can be<br />simultaneously unhealthy.|int \| str|Undefined|optional|


### Examples

```yaml
modules:
    kusionstack/opsrule@0.1.0:
        default:
            maxUnavailable: "40%"
```