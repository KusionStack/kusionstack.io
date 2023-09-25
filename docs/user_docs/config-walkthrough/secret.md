---
sidebar_position: 7
---

# Secret Management

You can manage application secrets via the `secrets` attribute in the `workload` schema. Depending on the context of your application, this might include pieces of credentials required to access a third-party application.

If your application depends on any cloud resources that are managed by Kusion, their credentials are automatically managed by Kusion (generated and injected into application runtime environment variable). You shouldn't have to manually create those.

:::info
If your application workloads are also running on the cloud, it's recommended to leverage identity-based keyless authentication as much as possible to minimize the nuisance of secret management. Application identities will be supported in a future version of Kusion.

:::

## Import

In the examples below, we are using schemas defined in the `catalog` package. For more details on KCL package import, please refer to the [Configuration File Overview](/docs/user_docs/config-walkthrough/overview.md).

The `import` statements needed for the following walkthrough:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.secret as sec
```

## Creating a secret

As of version 0.9.0, Kusion supports creating secrets by turning the `secrets` declared in the configuration files into Kubernetes secrets.

:::info

As a general principle, storing secrets in a plain text configuration file is highly discouraged. The recommended approach is to store the secrets in a third-party vault (such as Hashicorp Vault, AWS Secrets Manager and KMS, Azure Key Vault, etc) and retrieve the secret in the runtime only.
:::

Create a secret with the type `Opaque`:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        secrets: {
            "my-secret": sec.Secret {
                type: "opaque"
                data: {
                    "hello": "world"
                    "foo": "bar"
                }
            }
        }
    }
}
```

Create a secret with the type `kubernetes.io/basic-auth`:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        secrets: {
            "my-secret": sec.Secret {
                type: "basic"
                data: {
                    "username": "admin"
                    "password": "******"
                }
            }
        }
    }
}
```

When creating a `kubernetes.io/basic-auth` type secret, the `data` field must have at least one of `username` or `password`.

For more details about the secret types, please see the [Kubernetes secret documentation](https://kubernetes.io/docs/concepts/configuration/secret/).

## Immutable secrets

You can also declare a secret as immutable to prevent it from being changed accidentally.

To declare a secret as immutable:
```
myapp: ac.AppConfiguration {
    workload: wl.Service {
        # ...
        secrets: {
            "my-secret": sec.Secret {
                # ...
                immutable: True
            }
        }
    }
}
```

You can change a secret from mutable to immutable but not the other way around. That is because the Kubelet will stop watching secrets that are immutable. As the name suggests, you can only delete and re-create immutable secrets but you cannot change them.