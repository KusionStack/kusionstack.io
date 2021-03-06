# lifecycle

Source: [base/pkg/kusion_models/kube/frontend/container/lifecycle/lifecycle.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/container/lifecycle/lifecycle.k)

## Schema Lifecycle

Lifecycle describes actions that the management system should take in response <br />to container lifecycle events.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**preStop**<br />A Container-level attribute.<br />The PreStop action is called immediately before a container is terminated.|[probe.Exec](../probe/doc_probe#schema-exec) \| [probe.Http](../probe/doc_probe#schema-http)|Undefined|optional|
|**postStart**<br />A Container-level attribute.<br />The PostStart action is called immediately after a container is created.|[probe.Exec](../probe/doc_probe#schema-exec) \| [probe.Http](../probe/doc_probe#schema-http)|Undefined|optional|
### Examples
```python
import base.pkg.kusion_models.kube.frontend.container.lifecycle as lc
import base.pkg.kusion_models.kube.frontend.container.probe as p

p = lc.Lifecycle {
    preStop = p.Exec {
        command = [
            "timeout"
            "--signal=9"
            "1800s"
            "sh"
            "-c"
            "bash -x /tmp/image-builder/boot/boot.sh"
        ]
    }
}
```

<!-- Auto generated by kcl-doc tool, please do not edit. -->
