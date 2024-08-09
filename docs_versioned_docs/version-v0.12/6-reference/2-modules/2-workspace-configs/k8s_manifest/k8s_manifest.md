# k8s_manifest

## Module K8sManifest

K8sManifest defines the paths of the YAML files, or the directories of the raw Kubernetes manifests, which will be jointly appended to the Resources of Spec.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**paths**<br />The paths of the YAML files, or the directories of the raw Kubernetes manifests. |[str]|Undefined|**optional**|

### Examples

```yaml
modules: 
    k8s_manifest: 
        path: oci://ghcr.io/kusionstack/k8s_manifest
        version: 0.1.0
        configs: 
            default: 
                paths: 
                    # The default paths to apply for the raw K8s manifest YAML files. 
                    - /path/to/k8s_manifest.yaml
                    - /dir/to/k8s_manifest/
```