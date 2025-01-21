---
id: release
sidebar_label: Releases
---

# Release

Release is used to indicate a single operation, triggered only by `apply` and `destroy`, providing users with a more coherent and consistent operation experience with Kusion. Release also provides audit and rollback capabilities, which is currently under development.

Every time an `apply` or `destroy` operation is executed, it will trigger the generation of a `release` file. The combination of a `project` and `workspace` corresponds to a set of `release` files, which also relates to a set of the real application resources. The `release` file is stored in the same `backend` as the `workspace`, and the default path is `releases/$PROJECT_NAME/$WORKSPACE_NAME`, whose revision starts from 1 and increments.

:::tip
For kusion server, the default release path is `releases/server/$SOURCE_NAME/$PROJECT_NAME/$WORKSPACE_NAME`
:::

The release file contains the [Spec](./6-spec.md) and [State](./8-release.md#state) of an application, both of which are composed of `Resources`, representing the expected description from the configuration code and the actual state of the resources respectively. In addition, the release file also contains the information of creation and modification time, operation phase, and application metadata, etc.

## State

State is a record of an operation's result. It is a mapping between `resources` managed by `Kusion` and the actual infra resources. State is often used as a data source for three-way merge/diff in operations like `Apply` and `Preview`.

A `resource` here represents an individual unit of infrastructure or application component, serving as a fundamental building block for defining and managing the actual state of your `project`. These `resources` are defined within the `State` and accurately reflect the actual states of the infrastructure. By providing a unified and consistent approach, `Kusion` enables seamless management of diverse resource types, encompassing Kubernetes objects and Terraform resources.Importantly, the structure of these resources in the `State` mirrors that of the `resources` in the `Spec`, ensuring coherence and facilitating efficient state management throughout the lifecycle of your `project`.

State can be stored in many storage [backend](./7-backend/1-overview.md) mediums like filesystems, S3, and OSS, etc.

## Concurrency Control

Release supports collaboration among multiple users and implements the concurrency control through operation `phase`. When the field of `phase` in the release file is not `succeeded` or `failed`, kusion will not be able to execute `apply` or `destroy` operation to the corresponding stack. For example, if a user unexpectedly exits during the `apply` or `destroy` process, the `phase` of the release file may be kept as `applying` or `destroying`. In this case, the user can use the command of `kusion release unlock` to unlock the release file for a specified application and workspace, setting the `phase` to `failed`.
