# network

`network` can be used to define workspace-level networking configurations.

## Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**type**<br />The specific cloud vendor that provides load balancer.| "alicloud" \| "aws"|Undefined|**required**|
| **labels**<br />The attached labels of the port.|{str:str}|Undefined|optional|
| **annotations**<br />The attached annotations of the port.|{str:str}|Undefined|optional|

### Examples

```yaml
modules:
  path: oci://ghcr.io/kusionstack/network
  version: 0.2.0
  configs:
    default:
      type: alicloud
      labels:
        kusionstack.io/control: "true"
      annotations:
        service.beta.kubernetes.io/alibaba-cloud-loadbalancer-spec: slb.s1.small
```