# Module Registration

After a module is published, it needs to be registered before it can be used in **Kusion server**. This is to help the server to accurately generate a necessary `kcl.mod` file that describes the dependency of a configurations (i.e. what modules can I use as a developer).

This step is not required when using Kusion CLI.

## APIs

The APIs to manage workspaces can be found in the swagger docs under `{server-endpoint}/docs/index.html#/module`.

## Register a module via Developer Portal

To register a new module via the developer portal, switch to the `Modules` tab and click on `New Module`.

![module-create](/img/docs/concept/module-create.png)

Fill out the module details. It's always recommended to provide a link to the module's documentation for developers to read.

![module-details](/img/docs/concept/module-details.png)

## Edit a registered module

To edit a registered module, click the `edit` button.

![module-edit](/img/docs/concept/module-edit.png)

## Delete a registered module

To delete a registered module, click the `delete` button.

![module-delete](/img/docs/concept/module-delete.png)

## Generate kcl.mod

To generate the `kcl.mod` for a stack targeting a workspace, go the workspace page and select `Available Modules`, then click on `Generate kcl.mod`.

![generate-kcl-mod](/img/docs/concept/generate-kcl-mod.png)

A text box appears with the module dependency content generated. This should be copied and pasted into the `kcl.mod` file in the stack folder.

![kcl-mod-generated](/img/docs/concept/kcl-mod-generated.png)
