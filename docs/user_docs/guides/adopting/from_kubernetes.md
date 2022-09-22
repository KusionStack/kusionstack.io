# From Kubernetes

## 1. Kubernetes OpenAPI Spec

Starting with Kubernetes 1.4, alpha support for the OpenAPI specification (called swagger 2.0 before it was donated to the Open API Initiative) was introduced, API descriptions follow the [OpenAPI specification 2.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md). Since Kubernetes 1.5, Kubernetes can automatically extract models directly from source code and generate The OpenAPI specification , which automatically ensures that the specification and documentation are fully synchronized with updates to operations and models.

In addition, Kubernetes CRD uses [OpenAPI v3.0 validation](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#validation) to describe the custom schema (except built-in attributes apiVersion, kind, metadata), and APIServer will use this schema to verify the content of CR during the creation and update phases of CR.

## 2. KCL OpenAPI

KCLOpenAPI tool supports to extract and generate KCL schema from OpenAPI/CRD definition. The mapping relationship between OpenAPI specification and KCL language is clearly defined in [KCLOpenapi Spec](/docs/reference/cli/openapi/spec).

The KCLOpenapi tool will be installed by default when the [Kusion toolkit](/docs/user_docs/getting-started/install) is installed. For the usage and examples of the [KCLOpenapi tool](/docs/reference/cli/openapi), please refer to the KCLOpenAPI tool


## 3. Migrating from the Kubernetes model to KusionStack

The complete OpenAPI definition of the Kubernetes built-in model is stored in the [Kubernetes openapi-spec file](https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/swagger.json). Using this file as input, the KCLOpenapi tool can generate all model schemas of the corresponding version. Next, take the release deployment scenario as an example to demonstrate the process of migrating from Kubernetes to Kusion. Assuming your project is using a [Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to define a release deployment configuration, migrating to Kusion requires only the following steps:


### 1. Use the existing kusion_models model

A well-abstracted model, the Server model, has been included in the kusion_models directory of Konfig. Click here to view the [Server Schema](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/server.k). As for the existing Kubernetes configuration data, Kusion plans to provide a kube2kcl conversion tool to convert it into a configuration instance based on the above Server model described by KCL. This tool is under development and will be available for use in the near future. After completing the configuration model and data migration, you only need to define and deploy the project according to the guidelines in [Kubernetes - Application Deployment and Maintenance with Kusion](/docs/user_docs/guides/working-with-k8s/).

### 2. Create custom models front-end 

When the existing kusion_models model package is not enough to meet the business needs, you can also design a custom front-end model package. A generated Kubernetes 1.22 version model has been saved in the kusion_kubernetes directory of Konfig, and you can directly write a custom front-end model on this basis. And you can follow the mode of kusion_models to develop custom scripts to complete the migration of configuration data. After that, please refer to the [Kubernetes - Application Deployment Operation and Maintenance Guide with Kusion](/docs/user_docs/guides/working-with-k8s/) for project deployment.

#### 1. Convert Kubernetes Deployment to KCL 


In Konfig's base/pkg/kusion_kubernetes directory, we have saved a generated [KCL file (Kubernetes 1.22 version)](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/apps/v1/deployment.k) and generated the corresponding model document. You can skip this step and use the generated model package, or you can generate a specific version yourself.

From the [openapi-spec file of Kubernetes version 1.23](https://github.com/kubernetes/kubernetes/blob/release-1.23/api/openapi-spec/swagger.json), you can find the definitions related to the apps/v1.Deployment model. The snippet is as follows:


```json
{
    "definitions": {
        "io.k8s.api.apps.v1.Deployment": {
            "description": "Deployment enables declarative updates for Pods and ReplicaSets.",
            "properties": {
                "apiVersion": {
                    "description": "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
                    "type": "string"
                },
                "kind": {
                    "description": "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                    "type": "string"
                },
                "metadata": {
                    "$ref": "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
                    "description": "Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata"
                },
                "spec": {
                    "$ref": "#/definitions/io.k8s.api.apps.v1.DeploymentSpec",
                    "description": "Specification of the desired behavior of the Deployment."
                },
                "status": {
                    "$ref": "#/definitions/io.k8s.api.apps.v1.DeploymentStatus",
                    "description": "Most recently observed status of the Deployment."
                }
            },
            "type": "object",
            "x-kubernetes-group-version-kind": [
                {
                    "group": "apps",
                    "kind": "Deployment",
                    "version": "v1"
                }
            ]
        }
    },
    "info": {
        "title": "Kubernetes",
        "version": "unversioned"
    },
    "paths": {},
    "swagger": "2.0"
}
```

Save the above spec as deployment.json, execute `kclopenapi generate model -f deployment.json` command, and all relevant KCL schema files will be generated in the current workspace, as shown in the [KCL Deployment file (Kubernetes 1.22 version)](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/apps/v1/deployment.k).



#### 2. Write a custom front-end model

Since the built-in model of Kubernetes is relatively atomic and complex, we recommend using the native model of Kubernetes as the back-end output model, further abstracting it, and exposing a more friendly and simple front-end model interface to users. For details, you can refer to the Konfig repository. The design of the [kusion_models Server](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/server.k) model is done.


#### 3. Batch migration of configuration 

For the existing Kubernetes configuration data, you can follow the practice of the kube2Kcl tool, write a custom conversion script, and perform one-click migration. Kusion will provide the scripting scaffolding and writing guidelines in the future.


## 4. Migrating from Kubernetes CRD to KusionStack

If CRD is used in your project, you can also use a similar schema, generate the KCL schema corresponding to the CRD, and declare CR based on the schema.


* Generate KCL Schema from CRD

    ```
    kclopenapi generate model --crd --skip-validation -f your_crd.yaml
    ```

* Declare CR using KCL

    The pattern of declaring CR using KCL is the same as that of declaring Kubernetes built-in model configuration, so I won't go into details here.

