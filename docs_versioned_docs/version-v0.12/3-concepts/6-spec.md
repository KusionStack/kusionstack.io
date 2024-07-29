---
id: spec
sidebar_label: Spec
---

# Spec

The Spec represents the operational intentions that you aim to deliver using Kusion. These intentions are expected to contain all components throughout the DevOps lifecycle, including resources (workload, database, load balancer, etc.), dependencies, and policies. The Kusion module generators are responsible for converting all AppConfigurations and environment configurations into the Spec. Once the Spec is generated, the Kusion Engine takes charge of updating the actual infrastructures to match the Spec.

## Purpose

### Single Source of Truth

In Kusion's workflow, the platform engineer builds Kusion modules and provides environment configurations, application developers choose Kusion modules they need and deploy operational intentions to an environment with related environment configurations. They can also input dynamic parameters like the container image when executing the `kusion generate` command. So the final operational intentions include configurations written by application developers, environment configurations and dynamic inputs. Due to this reason, we introduce **Spec** to represent the SSoT(Single Source of Truth) of Kusion. It is the result of `kusion generate` which contains all operational intentions from different sources.

### Consistency

Delivering an application to different environments with identical configurations is a common practice, especially for applications that require scalable distribution. In such cases, an immutable configuration package is helpful. By utilizing the Spec, all configurations and changes are stored in a single file. As the Spec is the input of Kusion, it ensures consistency across different environments whenever you execute Kusion with the same Spec file.

### Rollback and Disaster Recovery

The ability to roll back is crucial in reducing incident duration. Rolling back the system to a previously validated version is much faster compared to attempting to fix it during an outage. We regard a validated Spec as a snapshot of the system and recommend storing the Spec in a version control system like Git. This enables better change management practices and makes it simpler to roll back to previous versions if needed. In case of a failure or outage, having a validated Spec simplifies the rollback process, ensuring that the system can be quickly recovered.

## Example

The API definition of the `Spec` structure in Kusion can be found [here](https://github.com/KusionStack/kusion/blob/main/pkg/apis/api.kusion.io/v1/types.go#L862). Below is an example `Spec` file generated from the `quickstart` demo application (more details can be found [here](../2-getting-started/2-deliver-quickstart.md)). 

```yaml
resources:
    - id: v1:Namespace:quickstart
      type: Kubernetes
      attributes:
        apiVersion: v1
        kind: Namespace
        metadata:
            creationTimestamp: null
            name: quickstart
        spec: {}
        status: {}
      extensions:
        GVK: /v1, Kind=Namespace
    - id: apps/v1:Deployment:quickstart:quickstart-default-quickstart
      type: Kubernetes
      attributes:
        apiVersion: apps/v1
        kind: Deployment
        metadata:
            creationTimestamp: null
            labels:
                app.kubernetes.io/name: quickstart
                app.kubernetes.io/part-of: quickstart
            name: quickstart-default-quickstart
            namespace: quickstart
        spec:
            selector:
                matchLabels:
                    app.kubernetes.io/name: quickstart
                    app.kubernetes.io/part-of: quickstart
            strategy: {}
            template:
                metadata:
                    creationTimestamp: null
                    labels:
                        app.kubernetes.io/name: quickstart
                        app.kubernetes.io/part-of: quickstart
                spec:
                    containers:
                        - image: kusionstack/kusion-quickstart:latest
                          name: quickstart
                          resources: {}
        status: {}
      dependsOn:
        - v1:Namespace:quickstart
        - v1:Service:quickstart:quickstart-default-quickstart-private
      extensions:
        GVK: apps/v1, Kind=Deployment
    - id: v1:Service:quickstart:quickstart-default-quickstart-private
      type: Kubernetes
      attributes:
        apiVersion: v1
        kind: Service
        metadata:
            creationTimestamp: null
            labels:
                app.kubernetes.io/name: quickstart
                app.kubernetes.io/part-of: quickstart
            name: quickstart-default-quickstart-private
            namespace: quickstart
        spec:
            ports:
                - name: quickstart-default-quickstart-private-8080-tcp
                  port: 8080
                  protocol: TCP
                  targetPort: 8080
            selector:
                app.kubernetes.io/name: quickstart
                app.kubernetes.io/part-of: quickstart
            type: ClusterIP
        status:
            loadBalancer: {}
      dependsOn:
        - v1:Namespace:quickstart
      extensions:
        GVK: /v1, Kind=Service
secretStore: null
context: {}
```

From the example above, we can see that the `Spec` contains a list of `resources` required by the application. Each resource in the `Spec` needs to have `id`, `type`, `attributes`, `dependsOn`, and `extensions` fields: 

- `id` is the unique key of this resource. An idiomatic way for Kubernetes resources is `apiVersion:kind:namespace:name`, and for Terraform resources is `providerNamespace:providerName:resourceType:resourceName`. 
- `type` represents the type of runtime Kusion supports, and currently includes `Kubernetes` and `Terraform`. 
- `attributes` represents all specified attributes of this resource, basically the manifest and argument attributes for the `Kubernetes` and `Terraform` resources. 
- `dependsOn` contains all the other resources the resource depends on. 
- `extensions` specifies the arbitrary metadata of the resource, where you can declare information such as Kubernetes GVK, Terraform provider, and imported resource id, etc. 

Besides the `resources`, Spec also records the `secretStore` and `context` field in the corresponding workspace. The former can be used to access sensitive data stored in an external secrets manager, while the latter can be used to declare the workspace-level configurations such as Kubernetes `kubeconfig` file path or content, and Terraform providers' AK/SK. More information can be found [here](4-workspace.md#secretstore). 

## Apply with Spec File

Kusion supports using the Spec file directly as input. Users can place the Spec file in the stack directory and execute `kusion preview --spec-file spec.yaml` and `kusion apply --spec-file spec.yaml` to preview and apply the resources. 
