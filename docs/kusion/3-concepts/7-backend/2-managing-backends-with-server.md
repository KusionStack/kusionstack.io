# Managing backends with Kusion Server

When using Kusion server, backends are managed via the `/api/v1/backends` API. You can either access the APIs directly or if you have the Dev Portal enabled (`--dev-portal-enabled`, default to true), backends can be also managed via the portal. The backend configurations are also stored in the database when using Kusion server.

## APIs

The APIs to manage backends can be found in the swagger docs under `{server-endpoint}/docs/index.html#/backend`.

## Developer Portal

### Creating Backend

Create a backend by clicking on the `Create Backend` button in the top right corner.

![backend-create](/img/docs/concept/backend-create.png)

The Backends are generally managed by the platform engineers.

### Listing Backend

List backends by clicking on the `Backend` tab.

## Showing Backend

Clicking on individual backend to display the backend configurations.

![backend-details](/img/docs/concept/backend-details.png)

## Updating Backend

Update backends by clicking on the edit button on each backend.

![backend-edit](/img/docs/concept/backend-edit.png)

## Deleting Backend

![backend-delete](/img/docs/concept/backend-delete.png)

## Using Backend

Backend is used when creating [Workspaces](../4-workspace/1-overview.md). When creating each workspace, a backend must be selected to represent the storage to keep the workspace related configurations.

![workspace-select-backend](/img/docs/concept/workspace-select-backend.png)