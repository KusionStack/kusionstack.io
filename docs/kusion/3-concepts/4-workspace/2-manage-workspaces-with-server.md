# Managing Workspace With Kusion Server

When using Kusion server, workspaces are managed via the `/api/v1/workspaces` API. You can either access the APIs directly or if you have the Dev Portal enabled (`--dev-portal-enabled`, default to true), workspaces can be managed via the portal. The workspace configurations are also stored in the backends when using Kusion server.

:::Tip
There are no "default" workspace when using the Kusion server. A workspace needs to be specified every time an operation (generate/preview/apply/destroy) is triggered.
:::

## APIs

The APIs to manage workspaces can be found in the swagger docs under `{server-endpoint}/docs/index.html#/workspace`.

## Developer Portal

### Creating Workspace

Create a workspace by clicking on the `Create Workspace` button in the top right corner.

![workspace-create-new](/img/docs/concept/workspace-create-new.png)

Select the backend to store the workspace configurations.

![workspace-select-backend](/img/docs/concept/workspace-select-backend.png)

The Workspaces are generally managed by the platform engineers. We recommend that they are organized by the following rules:

- **SDLC phases**, such as `dev`, `pre`, `prod`;
- **cloud vendors**, such as `aws`, `alicloud`;
- combination of the two above, such as `dev-aws`, `prod-alicloud`.

In design, Kusion does not support deploying Stack to multiple clouds or regions within a single Workspace. While users can technically define a Module that provisions resources across multiple clouds or regions, Kusion does not recommend this practice, and will not provide technical support for such configuration. If the platform engineers need to manage resources across multiple clouds or regions, they should create separate Workspaces.

### Listing Workspace

List workspaces by clicking on the `Workspace` tab.

## Showing Workspace

Clicking on individual workspace to display the [workspace configurations](./1-overview.md#workspace-configuration).

![workspace-configurations](/img/docs/concept/workspace-configurations.png)

## Updating Workspace

Update workspaces by clicking on the edit button on each workspace card.

![workspace-edit](/img/docs/concept/workspace-edit.png)

## Deleting Workspace

![workspace-delete](/img/docs/concept/workspace-delete.png)

## Using Workspace

Workspace is used when creating [Runs](../9-runs.md). When creating each run, no matter what type, a workspace must be selected to represent the target environment.

![workspace-select](/img/docs/concept/workspace-select.png)