---
id: spec
sidebar_label: Spec
---

# Spec

The spec is a system-generated, immutable, declarative representation of the resources involved in a particular deployment. As opposed to the static configurations that are stored in a stack folder in a git repository, which may or may not be scoped to a given deploy target, a spec is dynamically rendered from the aggregated intents from multiple sources, including those that are target-specific, and those aren't (e.g. global configs, constraints posed by security, compliance and so on, for example what kind of application may have Internet access). Specs are resource-facing desired states and are always rendered on the spot based on all the relevant inputs.

The Specs are designed to be **THE** intermediate data layer between configuration code and actual resources. It is designed to be a structured data format that is both machine-friendly (so that we can use the proper libraries to process and actualize them) and human-friendly (so that it provides a readable reference to the resource perspective of an application). 

## Generators

The rendering logic that transforms the static configuration to the **Spec** are produced by "Generators", which are pieces of code written and distributed in Go. Generators are in charge of converting configuration code written in KCL into resource specifications in the Spec. They are packaged and wrapped inside a GRPC server whose lifecycle are dynamically managed as individual go-plugins.

## Runtimes

In this workflow, the component that processes the resources in the Spec is called a Runtime. Runtimes are in charge of bridging the resource specification to the actual infrastructure API. For Kubernetes resources, its runtime uses client-go to connect to the clusters. For the cloud resources, we are using IAC tools like Terraform/Crossplane and their providers to connect to the cloud control APIs. Runtimes are also extensible.

![intent-flow](/img/docs/concept/intent-flow.png)

## Purpose of Spec

### Single Source of Truth

In Kusion's workflow, the platform engineer builds Kusion modules and provides environment configurations, application developers choose Kusion modules they need and deploy operational intentions to an environment with related environment configurations. They can also input dynamic parameters like the container image when executing the `kusion generate` command. So the final operational intentions include configurations written by application developers, environment configurations and dynamic inputs. Due to this reason, we introduce **Spec** to represent the SSoT(Single Source of Truth) of Kusion. It is the result of `kusion generate` which contains all operational intentions from different sources.

### Consistency

Delivering an application to different environments with identical configurations is a common practice, especially for applications that require scalable distribution. In such cases, an immutable configuration package is helpful. By utilizing the Spec, all configurations and changes are stored in a single file. As the Spec is the input of Kusion, it ensures consistency across different environments whenever you execute Kusion with the same Spec file.

### Rollback and Disaster Recovery

The ability to roll back is crucial in reducing incident duration. Rolling back the system to a previously validated version is much faster compared to attempting to fix it during an outage. We regard a validated Spec as a snapshot of the system and recommend storing the Spec in a version control system like Git. This enables better change management practices and makes it simpler to roll back to previous versions if needed. In case of a failure or outage, having a validated Spec simplifies the rollback process, ensuring that the system can be quickly recovered.

## Example

The API definition of the `Spec` structure in Kusion can be found [here](https://github.com/KusionStack/kusion/blob/main/pkg/apis/api.kusion.io/v1/types.go#L862). Below is an example `Spec` file generated from the `quickstart` demo application (more details can be found [here](../2-getting-started/2-getting-started-with-kusion-cli/1-deliver-quickstart.md)). 

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

From the example above, we can see that the `Spec` contains a list of `resources` required by the application.

A `resource` is a concept in `Kusion` that abstract infrastructure. It represents an individual unit of infrastructure or application component managed by the `Kusion`, serving as a fundamental building block for defining the desired state of the infrastructure. They provide a unified way to define various types of resources, including `Kubernetes` objects and `Terraform` resources. Each `resource` in the `Spec` needs to have `id`, `type`, `attributes`, `dependsOn`, and `extensions` fields:

- `id` is the unique key of this resource. An idiomatic way for `Kubernetes` resources is `apiVersion:kind:namespace:name`, and for `Terraform` resources is `providerNamespace:providerName:resourceType:resourceName`.
- `type` represents the type of runtime Kusion supports, and currently includes `Kubernetes` and `Terraform`.
- `attributes` represents all specified attributes of this resource, basically the manifest and argument attributes for the `Kubernetes` and `Terraform` resources.
- `dependsOn` contains all the other resources the resource depends on.
- `extensions` specifies the arbitrary metadata of the resource, where you can declare information such as Kubernetes GVK, Terraform provider, and imported resource id, etc.

Besides the `resources`, Spec also records the `secretStore` and `context` field in the corresponding workspace. The former can be used to access sensitive data stored in an external secrets manager, while the latter can be used to declare the workspace-level configurations such as Kubernetes `kubeconfig` file path or content, and Terraform providers' AK/SK. More information can be found [here](./4-workspace/1-overview.md#secretstore).

## Apply with Spec File

When using the CLI, Kusion supports using the Spec file directly as input. Users can place the Spec file in the stack directory and execute `kusion preview --spec-file spec.yaml` and `kusion apply --spec-file spec.yaml` to preview and apply the resources.
