# Overview

Workspace is a logical concept that maps to an actual target environment to deploy a stack to. In today's context, this _usually_ represents a Kubernetes cluster for the application workload and an optional cloud account to provision infrastructure resources that the workload depends on (A database, for example). Aside from the deployment destination, workspaces are also designed to be associated with a series of platform configurations that are used by all the stacks deployed to said workspace.

When executing the command `kusion generate`, Kusion will "match" the AppConfiguration and the approriate workspace configuration to dynamically generate the `Spec`, which contains the complete manifest to describe the resources in the stack. The relationship of the Project, Stack and Workspace is shown as below. Notice that all three ways to organize stacks are valid.

![project-stack-workspace](/img/docs/concept/project-stack-workspace.png)

Workspace is designed to address separation of concerns. As opposed to the development-time concept of a "stack", a workspace is a deploy-time concept that represents a deployment target, a.k.a an actual runtime environment. Workspaces should be entirely managed by Platform Engineers to alleviate the burden on developers to understand environment-specific details.

To dig a little deeper, a workspace represents the need for a distinct set of "platform opinions". That includes things that application developer either don't want to or shouldn't need to worry about, such as which Kubernetes cluster to deploy to, the credentials to deploy to said clusters, and other infrastructure details like what database instance to provision.

Workspace is intended to be flexible so you can map them as your see fit to the boundaries that are relevant to your use case. For example, you can map a workspace to a cloud region (aws-us-east-1), provided that regional isolation is sufficient for you (this is an extreme case). Alternatively, a workspace can be map to the combination of a cloud region and an SDLC phase (aws-dev-us-east-1), provided that it represents the right boundary from a platform perspective.

The workspace configuration is in a deterministic format and currently written in YAML. The subcommands of `kusion workspace` are provided to manage the workspaces. When using `kusion workspace`, the workspace configuration will be saved as YAML file in local file system. To avoid the possible risks, the environment variables are provided to hold the sensitive data such as Access Keys and Secret keys.

## Workspace Configuration

The configuration of a Workspace is stored in a single YAML file, which consists of `modules`, `secretStore`, and `context`. An example of Workspace configuration is shown as below.

:::tip
The workspace configuration files are stored in [Backends](../7-backend/1-overview.md).
:::

```yaml
# The platform configuration for Modules or KAMs.
# For each Module or KAM, the configuration format is as below. 
# # ${module_identifier} or ${KAM_name}:
# #   path: oci://ghcr.io/kusionstack/module-name # url of the module artifact
# #   version: 0.2.0 # version of the module
# #   configs: 
# #     default: # default configuration, applied to all projects
# #       ${field1}: ${value1}
# #       #{field2}: ${value2}
# #       ...
# #     ${patcher_name}: #patcher configuration, applied to the projects assigned in projectSelector
# #       ${field1}: ${value1_override}
# #       ...
# #       projectSelector:
# #       - ${project1_name}
# #       - ${project2_name}
# #       ...
modules:
   mysql: 
    path: oci://ghcr.io/kusionstack/mysql
    version: 0.2.0
    configs:
      default:
         cloud: alicloud
         size: 20
         instanceType: mysql.n2.serverless.1c
         category: serverless_basic
         privateRouting: false
         subnetID: ${mysql_subnet_id}
         databaseName: kusion
      largeSize:
        size: 50
        projectSelector:
        - foo
        - bar
      importDBInstance: 
        importedResources: 
          "aliyun:alicloud:alicloud_db_instance:wordpress-demo": "your-imported-resource-id"
        projectSelector: 
        - baz

secretStore:
  provider:
    aws:
      region: us-east-1
      profile: The optional profile to be used to interact with AWS Secrets Manager.

context: 
   KUBECONFIG_PATH: $HOME/.kube/config
   AWS_ACCESS_KEY_ID: ref://secrets-manager-name/key-for-ak
   AWS_SECRET_ACCESS_KEY: ref://secrets-manager-name/key-for-sk
```

### modules

The `modules` are the platform-part configurations of Modules and KAMs, where the identifier of them are `${namespace}/${module_name}@${module_tag}` and `${kam_name}`. For each Module or KAM configuration, it is composed of a `default` and several `patcher` blocks. The `default` block contains the universal configuration of the Workspace, and can be applied to all Stacks in the Workspace, which is composed of the values of the Module's or KAM's fields. The `patcher` block contains the exclusive configuration for certain Stacks, which includes not only the fields' values, but also the applied Projects.

The `patcher` block is designed to increase the flexibility for platform engineers managing Workspaces. Cause the Workspace should map to the real physical environment, in the actual production practice, it's almost impossible that all the Stacks share the same platform configuration, although we want them the same. 

The values of the same fields in `patcher` will override the `default`, and one field in multiple patchers is forbidden to assign to the same Project. That is, if there are more than one `patcher` declaring the same field with different values, the applied Projects are prohibited to overlap. And, The name of `patcher` must not be `default`.

In the `patcher`, the applied Projects are assigned by the field `ProjectSelector`, which is an array of the Project names. The `ProjectSelector` is provided rather than something may like `StackSelector`, which specifies the applied Stacks. Here are the reasons. Explaining from the perspective of using Workspace, the mapping of Workspace and Stack is specified by the Kusion operation commands' users. While explaining from the perspective of the relationship among Project, Stack and Workspace, Workspace is designed for the reuse of platform-level configuration among multiple Projects. When a Project "encounters" a Workspace, it becomes a "Stack instance", which can be applied to a series of real resources. If using something like `StackSelector`, the reuse would not get realized, and Workspace would also lose its relevance. For more information of the relationship, please refer to [Project](../1-project/1-overview.md) and [Stack](../2-stack/1-overview.md). 

Different Module and KAM has different name, fields, and corresponding format and restrictions. When writing the configuration, check the corresponding Module's or KAM's description, and make sure all the requisite Modules and KAMs have correctly configured. Please refer to [Kuiosn Module](../3-module/1-overview.md) and find more information. The example above gives a sample of the Module `mysql`.

The `importedResources` block is designed to declare the import of existing cloud resources. The `importedResources` is a `map` where you can declare the mapping from `id` of the resource in Kusion `Spec` to the Terraform ID of the resource to be imported. Kusion will automatically synchronize the state of the existing cloud resource for the Kusion resource. 

### secretStore

The `secretStore` field can be used to access the sensitive data stored in a cloud-based secrets manager. More details can be found in [here](../5-user-guides/1-using-kusion-cli/4-secrets-management/1-using-cloud-secrets.md). 

### context

The `context` field can be used to declare the information such as Kubernetes `kubeconfig` path or content, and the AK/SK of the Terraform providers. Below shows the configurable attributes. 

- `KUBECONFIG_PATH`: the local path of the `kubeConfig` file
- `KUBECONFIG_CONTENT`: the content of the `kubeConfig` file, can be used with cloud-based secrets management (e.g. `ref://secrets-management-name/secrets-key-for-kubeconfig`)
- `AWS_ACCESS_KEY_ID`: the access key ID of the AWS provider
- `AWS_SECRET_ACCESS_KEY`: the secret key of the AWS provider
- `ALICLOUD_ACCESS_KEY`: the access key ID of the Alicloud provider
- `ALICLOUD_SECRET_KEY`: the secret key of the Alicloud provider