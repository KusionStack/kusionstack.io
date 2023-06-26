# Differentiated Configurations

In the KCL code of the application, you can set the required differential configuration by adding an `if-else` statement with magic variables, 
such as setting different labels according to the actual deployed cluster name.

:::tip

About KCL semantics, please visit [KCL](https://kcl-lang.io/) for more details.
:::

## Prerequisites

Please refer to the [prerequisites](/docs/user_docs/guides/working-with-k8s/deploy-server#prerequisites) in the guide for deploying an application.

## Example

Pod Label in `base/bask.k`:

```py
appConfiguration: frontend.Server {
    podMetadata.labels = {
        if __META_CLUSTER_NAME in ["minikube", "kind"]:
            cluster = __META_CLUSTER_NAME
        else:
            cluster = "other"
    }
}
```

Through the above KCL code, you can get the actual cluster name according to the magic variables in the Konfig library,
and selectively inject labels into the application container to be recognized by 3rd services or for other purposes.
