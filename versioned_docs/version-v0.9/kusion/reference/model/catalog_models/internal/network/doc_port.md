# port

## Schema Port

Port defines the exposed port of Service, which can be used to describe how the Service<br />get accessed.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**port**<br />The exposed port of the Service.|int|80|**required**|
|**targetPort**<br />The backend container port. If empty, set it the same as the port.|int|Undefined|optional|
|**protocol**<br />The protocol to access the port.|"TCP" \| "UDP"|"TCP"|**required**|
|**public**<br />Public defines whether the port can be accessed through Internet.|bool|False|**required**|
### Examples
```python
import catalog.models.schema.v1.workload.network as n

port = n.Port {
    port: 80
    targetPort: 8080
    protocol: "TCP"
    public: True
}
```

<!-- Auto generated by kcl-doc tool, please do not edit. -->
