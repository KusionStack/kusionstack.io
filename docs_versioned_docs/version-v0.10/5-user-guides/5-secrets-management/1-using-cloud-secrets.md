# Using Cloud Secrets Manager

Applications usually store sensitive data in secrets by using centralized secrets management solutions. For example, you authenticate databases, services, and external systems with passwords, API keys, tokens, and other credentials stored in a secret store, e.g. Hashicorp Vault, AWS Secrets Manager, Azure Key Vault, etc

Kusion provides out-of-the-box support to reference existing external secrets management solution, this tutorial introduces that how to pull the secret from AWS Secrets Manager to make it available to applications.

## Prerequisites

Please refer to the [prerequisites](../working-with-k8s/deploy-application#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](../working-with-k8s/deploy-application#initializing) using the `kusion init` command, which will generate a [`kcl.mod` file](../working-with-k8s/deploy-application#kclmod) under the project directory.

Additionally, you also need to configure the obtained AccessKey and SecretKey as environment variables: 

```bash
export AWS_ACCESS_KEY_ID="AKIAQZDxxxx" # replace it with your AccessKey
export AWS_SECRET_ACCESS_KEY="oE/xxxx" # replace it with your SecretKey
```

![aws iam account](/img/docs/user_docs/getting-started/aws-iam-account.png)

## Setting up workspace

Since v0.10.0, we have introduced the concept of [workspaces](../../3-concepts/4-workspace.md), whose configurations represent the part of the application behaviors that platform teams are interested in standardizing, or the ones to eliminate from developer's mind to make their lives easier.

In the case of setting up cloud secrets manager, platform teams need to specify which secrets management solution to use and necessary information to access on the workspace level.

A sample `workspace.yaml` with AWS Secrets Manager settings:

```
modules:
  ...
secretStore:
  provider:
    aws:
      region: us-east-1
      profile: The optional profile to be used to interact with AWS Secrets Manager.
...
```

## Update AppConfiguration

At this point we are set up for good! Now you can declare external type of secrets via the `secrets` field in the `AppConfiguration` model to consume sensitive data stored in AWS Secrets Manager.

See the example below for a full, deployable AppConfiguration.

```
import models.schema.v1 as ac
import models.schema.v1.workload as wl
import models.schema.v1.workload.container as c
import models.schema.v1.workload.secret as sec

gitsync: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "syncer": c.Container {
                image: "dyrnq/git-sync"
                # Run the following command as defined
                command: [
                    "--repo=https://github.com/KusionStack/kusion"
                    "--ref=HEAD"
                    "--root=/mnt/git"
                ]
                # Consume secrets in environment variables
                env: {
                    "GIT_SYNC_USERNAME": "secret://git-auth/username"
                    "GIT_SYNC_PASSWORD": "secret://git-auth/password"
                }
            }
        }
        # Secrets used to retrieve secret data from AWS Secrets Manager
        secrets: {
            "git-auth": sec.Secret {
                type: "external"
                data: {
                    "username": "ref://git-auth-info/username"
                    "password": "ref://git-auth-info/password"
                }
            }
        }
    }
}
```

## Apply and Verify

Run `kusion apply` command to deploy above application, then use the below command to verify if the secret got deployed:

```
kubectl get secret -n secretdemo
```

You will find `git-auth` of type Opaque automatically created and contains sensitive information pulled from AWS Secrets Manager.