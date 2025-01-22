# Runs

:::tip
Run is a concept only applicable in Kusion server.
:::

A `Run` represents an operation performed on a given [Stack](./2-stack/1-overview.md) to a target [workspace](./4-workspace/1-overview.md). 

## APIs

The APIs to manage runs can be found in the swagger docs under `{server-endpoint}/docs/index.html#/run`.

:::tip
Please note that in the case of APIs the runs APIs are asynchronous. An external system interacting with runs API is expected to query the status of runs on a polling basis.
:::

## Types of Runs

There are 4 types of runs:

- Generate: Generate the resource-facing desired state, or [Spec](./6-specs.md) for the given stack and workspace
- Preview: Preview the resource changes for the given stack and workspace based on the difference between desired state and current state
- Apply: Apply the desired state to the target workspace
- Destroy: Destroy the resources for the given stack in the target workspace

## Run History

- Run history are persisted in Kusion Server. To check all runs for a given stack, click on the `Project` tab, select a project, click on the stack tab, then select the Runs tab to locate all runs for this stack.

![run-history](/img/docs/concept/run-history.png)

## Run Results and Logs

- Each run persisted also includes the run result and its corresponding logs.

The run result may differ based on the different types of runs:

- `Generate` runs yield a `Spec` in the YAML format on success.
![generate-result](/img/docs/concept/generate-result.png)

- `Preview` runs yield a structured json that represents the resource changes calculated based on desired state and current state. In the case of a developer portal, this is visualized with a left-right comparison.
![preview-result](/img/docs/concept/preview-result.png)

- `Apply` and `Destroy` runs produces a message that says "apply/destroy completed".

The run logs are used for troubleshooting in case of any errors during the run.

## Exception Handling

Kusion workflow includes the execution of out-of-tree go-plugins in the form of [Kusion Module](../3-concepts/3-module/1-overview.md) Generators. If any of the plugin code causes a panic, the stack trace is expected to be printed in the run log for closer examination.