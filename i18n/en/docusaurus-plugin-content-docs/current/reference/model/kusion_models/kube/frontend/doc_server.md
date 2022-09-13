# server

Source: [base/pkg/kusion_models/kube/frontend/server.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/server.k)

## Schema Server

Server is abstaction of Deployment and StatefulSet.

### Attributes

| Name and Description                                                                                                                                                                                                                              | Type                                                                                              | Default Value | Required                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------- | ------------------------- |
| **workloadType**<br />Application workload type, default to 'Deployment'                                                                                                                                                                    | "Deployment" \                                                                                   | "StatefulSet" | "Deployment"|**required** |
| **replicas**<br />Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.                                                                                                          | int                                                                                               | 1             | **required**              |
| **image**<br />Docker image name.<br />More info: https://kubernetes.io/docs/concepts/containers/images                                                                                                                               | str                                                                                               | Undefined     | **required**              |
| **schedulingStrategy**<br />SchedulingStrategy represents scheduling strategy.                                                                                                                                                              | [strategy.SchedulingStrategy](strategy/doc_scheduling_strategy#schema-schedulingstrategy)         | Undefined     | **required**              |
| **mainContainer**<br />MainContainer describes the main container configuration that is expected to be run on the host.                                                                                                                     | [container.Main](container/doc_container#schema-main)                                             | Undefined     | **required**              |
| **sidecarContainers**<br />SidecarContainers describes the list of sidecar container configuration that is expected to be run on the host.                                                                                                  | [[sidecar.Sidecar](sidecar/doc_sidecar#schema-sidecar)]                                           | Undefined     | optional                  |
| **initContainers**<br />InitContainers describes the list of sidecar container configuration that is expected to be run on the host.                                                                                                        | [[sidecar.Sidecar](sidecar/doc_sidecar#schema-sidecar)]                                           | Undefined     | optional                  |
| **useBuiltInLabels**<br />UseBuiltInLabels indicates use built-in labels or not.                                                                                                                                                            | bool                                                                                              | False         | optional                  |
| **labels**<br />Labels is a map of string keys and values that can be used to organize and categorize (scope and select) objects.<br />More info: http://kubernetes.io/docs/user-guide/labels                                         | {str: str}                                                                                        | Undefined     | optional                  |
| **annotations**<br />Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata.<br />More info: http://kubernetes.io/docs/user-guide/annotations | {str: str}                                                                                        | Undefined     | optional                  |
| **useBuiltInSelector**<br />UseBuiltInSelector indicates use built-in selector or not.                                                                                                                                                      | bool                                                                                              | False         | optional                  |
| **selector**<br />Label selector for pods. Existing ReplicaSets/ whose pods are selected by this will be the ones affected by this deployment.                                                                                              | {str: str}                                                                                        | Undefined     | optional                  |
| **podMetadata**<br />PodMetadata is metadata that all persisted resources must have, which includes all objects users must create.                                                                                                          | [apis.ObjectMeta](../../../kusion_kubernetes/apimachinery/apis/doc_object_meta#schema-objectmeta) | Undefined     | optional                  |
| **volumes**<br />Volumes represents a named volume and corresponding mounts in containers.                                                                                                                                                  | [[volume.Volume](volume/doc_volume#schema-volume)]                                                | Undefined     | optional                  |
| **needNamespace**<br />NeedNamespace mark server is namespace scoped or not.                                                                                                                                                                | bool                                                                                              | True          | optional                  |
| **enableMonitoring**<br />EnableMonitoring mark server is enable monitor or not.                                                                                                                                                            | bool                                                                                              | False         | optional                  |
| **configMaps**<br />ConfigMaps is a list of ConfigMap which holds configuration data for server to consume.                                                                                                                                 | [[configmap.ConfigMap](configmap/doc_configmap#schema-configmap)]                                 | Undefined     | optional                  |
| **secrets**<br />Secrets is a list of Secret which hold secret data of a certain type.                                                                                                                                                      | [[secret.Secret](secret/doc_secret#schema-secret)]                                                | Undefined     | optional                  |
| **services**<br />Services is a list of Service which partition a single Kubernetes cluster into multiple virtual clusters.                                                                                                                 | [[service.Service](service/doc_service#schema-service)]                                           | Undefined     | optional                  |
| **ingresses**<br />Ingresses is a list of Ingress which is collection of rules that allow inbound connections to reach the endpoints defined by a backend.                                                                                  | [[ingress.Ingress](ingress/doc_ingress#schema-ingress)]                                           | Undefined     | optional                  |
| **serviceAccount**<br />ServiceAccount is used to run this pod.                                                                                                                                                                             | [sa.ServiceAccount](serviceaccount/doc_service_account#schema-serviceaccount)                     | Undefined     | optional                  |
### Examples
```python
import base.pkg.kusion_models.kube.frontend
import base.pkg.kusion_models.kube.frontend.container
import base.pkg.kusion_models.kube.templates.resource as res_tpl

appConfiguration: frontend.Server {
    mainContainer = container.Main {
        name = "php-redis"
        env = [
            {
                name = "GET_HOSTS_FROM"
                value = "dns"
            }
        ]
        ports = [{containerPort = 80}]
    }
    selector = {
        tier = "frontend"
    }
    podMetadata.labels: {
        tier = "frontend"
    }
    schedulingStrategy.resource = res_tpl.tiny
}
```

<!-- Auto generated by kcl-doc tool, please do not edit. -->
