---
id: release
sidebar_label: Releases
---

# Release

Release is used to indicate a single operation, triggered by `kusion apply` and `kusion destroy`, providing users with a more coherent and consistent operation experience with Kusion. Release also provides audit and rollback capabilities, which is currently under development. 

Every time `kusion apply` or `kusion destroy` is executed, it will trigger the generation of a `release` file. The combination of a `project` and `workspace` corresponds to a set of `release` files, which also relates to a set of the real application resources. The `release` file is stored in the same `backend` as the `workspace`, and the default path is `$HOME/.kusion/releases/$PROJECT_NAME/$WORKSPACE_NAME`, whose revision starts from 1 and increments. 

The release file contains the [Spec](./6-spec.md) and [State](./9-release.md#state) of an application, both of which are composed of `Resources`, representing the expected description from the configuration code and the actual state of the resources respectively. In addition, the release file also contains the information of creation and modification time, operation phase, and application metadata, etc. 

### State 

State is a record of an operation's result. It is a mapping between resources managed by Kusion and the actual infra resources. State is often used as a data source for three-way merge/diff in operations like `Apply` and `Preview`. 

State can be stored in many storage [backend](./7-backend.md) mediums like filesystems, S3, and OSS, etc. 

## Concurrency Control

Release supports collaboration among multiple users and implements the concurrency control through operation `phase`. When the field of `phase` in the release file is not `succeeded` or `failed`, kusion will not be able to execute `kusion apply` or `kusion destroy` operation to the corresponding stack. For example, if a user unexpectedly exits during the `kusion apply` or `kusion destroy` process, the `phase` of the release file may be kept as `applying` or `destroying`. In this case, the user can use the command of `kusion release unlock` to unlock the release file for a specified application and workspace, setting the `phase` to `failed`. 
