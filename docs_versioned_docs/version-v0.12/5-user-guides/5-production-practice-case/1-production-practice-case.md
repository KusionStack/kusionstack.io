---
id: collaborate-with-github-actions
---

# Achieving Team Collaboration in Production Practice with GitHub Actions

In this article, we will introduce how to use Kusion CLI in combination with GitHub Actions to achieve team collaboration in production practice. 

Adopting the concept of separation of concerns, we divide the staff involved in application delivery and operation into two groups: **Platform Engineers (PEs)** and **Developers (Devs)**. As the builders of the Internal Developer Platform (IDP), platform engineers are primarily responsible for creating the [storage backend](../../3-concepts/7-backend.md) for the Kusion CLI in team collaborative scenarios (e.g. AWS S3 or Alicloud OSS), developing custom reusable [Kusion modules](../../3-concepts/3-kusion-module/1-overview.md), and creating and maintaining standardized platform configurations in [workspace](../../3-concepts/4-workspace.md). While application developers can focus on writing the application business logic and the configuration codes, self-serving the application delivery and operation by triggering the automated CI/CD pipelines. [GitHub Actions](https://github.com/features/actions) is such a CI/CD platform, and by customizing [GitHub Actions workflow](https://docs.github.com/en/actions/using-workflows), the pipeline such as building, testing, and deploying will be executed automatically. 

In the following sections, we will demonstrate the specific workflow from the perspectives of both PEs and Devs with the sample workflows from our [konfg](https://github.com/KusionStack/konfig) and [catalog](https://github.com/KusionStack/catalog) repository. 

## Perspective of PE

### Setup Kusion Storage Backend

In order to enable multiple people to collaboratively edit and modify application configuration code within a team, PEs need to create a centralized remote storage backend for Kusion CLI, such as [AWS S3](https://aws.amazon.com/pm/serv-s3/) or [Alicloud OSS](https://www.alibabacloud.com/en/product/object-storage-service). Below is an example OSS bucket, we can see that it is mainly used to store application **releases** and **workspace** configurations. 

![alicloud oss bucket for storage backend](/img/docs/user_docs/guides/github-actions/alicloud_oss_storage_backend.png)

Suppose PEs have set up the Alicloud OSS storage backend and get the AK/SK with the permission to read and write the bucket, they can use the following commands to set up the remote storage backend. 

```shell
# please replace the env with actual AK/SK
export OSS_ACCESS_KEY_ID=LTAxxxxxxxxxxxxxx
export OSS_ACCESS_KEY_SECRET=uUPxxxxxxxxxx

# set up backend
kusion config set backends.oss_test '{"type":"oss","configs":{"bucket":"kusion-test","endpoint":"oss-cn-shanghai.aliyuncs.com"}}'
kusion config set backends.current oss_test
```

### Develop Customized Kusion Modules

In the production practice of an enterprise, a common scenario is that PEs need to abstract and encapsulate the on-premises infrastructural computing, storage and networking resources to reduce the cognitive burden of the developers. And they can develop customized Kusion modules, a kind of reusable building blocks to achieve this goal. Below shows an example [GitHub Actions workflow](https://github.com/KusionStack/catalog/actions/runs/9398478367/job/25883893076) for pushing the module artifacts provided by KusionStack Official with multiple os/arch to [GitHub Packages](https://github.com/features/packages).

![upload kusion modules through github actions](/img/docs/user_docs/guides/github-actions/upload_modules.png)

### Create and Update Workspace

Moreover, PEs also need to create and update the workspace configurations, where they can declare the Kusion modules available in the workspace, and add some standardized default or application-specific configurations across the entire scope of the workspace. 

Suppose PEs have set up the remote storage backend, they can use the following commands to create and update workspace. 

```shell
# create workspace with the name of 'dev'
kusion workspace create dev

# update workspace with 'dev.yaml'
kusion workspace update dev -f dev.yaml

# switch to the 'dev' workspace
kusion workspace switch dev
```

```yaml
# dev.yaml declares 'mysql' and 'network' modules in the workspace
modules:
    mysql:
        path: oci://ghcr.io/kusionstack/mysql
        version: 0.2.0
    network:
        path: oci://ghcr.io/kusionstack/network
        version: 0.2.0
```

So far, PE has almost completed the fundamental work for setting up the IDP. 

## Perspective of Dev

### Setup Kusion Storage Backend

In order to get the available modules of the workspace and validate the generated [spec](../../3-concepts/6-spec.md), developers need to communicate with PEs to obtain the AK/SK (usually with **Read-Only** permission), bucket name, and the endpoint to access the remote storage backend. And similar to the PEs, developers can set up the backend configs with the following commands. 

```shell
# please replace the env with actual AK/SK
export OSS_ACCESS_KEY_ID=LTAxxxxxxxxxxxxxx
export OSS_ACCESS_KEY_SECRET=uUPxxxxxxxxxx

# set up backend
kusion config set backends.oss_test '{"type":"oss","configs":{"bucket":"kusion-test","endpoint":"oss-cn-shanghai.aliyuncs.com"}}'
kusion config set backends.current oss_test
```

### Create and Update Project and Stack

Next, developers can create and update the [Project](../../3-concepts/1-project/1-overview.md) and [Stack](../../3-concepts/2-stack/1-overview.md) configurations with `kusion project` and `kusion stack` command. 

```shell
# create a new project named quickstart
mkdir quickstart && cd quickstart
kusion project create

# create a stack named dev
kusion stack create dev
```

Below shows the initiated project and stack contents. 

```yaml
# quickstart/project.yaml
name: quickstart
```

```yaml
# quickstart/dev/stack.yaml
# The metadata information of the stack.
name: dev
```

```python
# kcl.mod
# Please add the modules you need in 'dependencies'.
[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.2.0" }
service = {oci = "oci://ghcr.io/kusionstack/service", tag = "0.1.0" }
```

```python
# main.k
# The configuration codes in perspective of developers.
import kam.v1.app_configuration as ac
import service
import service.container as c

# Please replace the ${APPLICATION_NAME} with the name of your application, and complete the
# 'AppConfiguration' instance with your own workload and accessories.
${APPLICATION_NAME}: ac.AppConfiguration {
	workload: service.Service {
		containers: {

		}
	}
	accessories: {

	}
}
```

Developers can use `kusion mod list` to get the available modules in current workspace and use `kusion mod add` to add a specified module to current stack. 

```shell
# list the available modules in the current workspace
➜ kusion mod list
Name     Version  URL
mysql    0.2.0    oci://ghcr.io/kusionstack/mysql
network  0.2.0    oci://ghcr.io/kusionstack/network
```

```shell
# add the specified modules to the current stack
kusion mod add mysql && kusion mod add network
```

The corresponding module artifacts will be downloaded and the declaration of the modules will be added to `kcl.mod`, which can be compared to `go mod tidy` and `go.mod`. 

```python
# kcl.mod after executing 'kusion mod add'
[package]

[dependencies]
kam = { git = "https://github.com/KusionStack/kam.git", tag = "0.2.0" }
service = { oci = "oci://ghcr.io/kusionstack/service", tag = "0.1.0" }
mysql = { oci = "oci://ghcr.io/kusionstack/mysql", tag = "0.2.0" }
network = { oci = "oci://ghcr.io/kusionstack/network", tag = "0.2.0" }
```

After this, developers can edit the application configuration codes according to the actual needs. 

### Trigger Preview and Apply Pipeline

[KusionStack/konfig](https://github.com/KusionStack/konfig) is the official example repository, and provides a set of GitHub Actions workflows [preview.yml](https://github.com/KusionStack/konfig/blob/main/.github/workflows/preview.yml) and [apply.yml](https://github.com/KusionStack/konfig/blob/main/.github/workflows/apply.yml). The `preview.yml` is triggered by a pull request to the main branch, while `apply.yml` is triggered by a push to the main branch. 

![preview workflow](/img/docs/user_docs/guides/github-actions/github_actions_preview.png)

![apply workflow](/img/docs/user_docs/guides/github-actions/github_actions_apply.png)

The previewing workflow will first get the changed projects and stacks. 

![get changed projects and stacks](/img/docs/user_docs/guides/github-actions/github_actions_get_changed_projects_stacks.png)

Then the previewing workflow will execute the `kusion preview` command to all of the changed stacks, and open an issue for manual approval to merge the changes after the approvers check the preview result artifact. 

![preview workflow details](/img/docs/user_docs/guides/github-actions/github_actions_preview_details.png)

![mannual approval](/img/docs/user_docs/guides/github-actions/github_actions_mannual_approval.png)

Once the code review is completed and the pull request is merged into the main branch, it will trigger the apply workflow, which will deploy the changes to the affected Projects and Stacks, and upload the respective results to the GitHub Actions Artifacts.

![apply workflow details](/img/docs/user_docs/guides/github-actions/github_actions_apply_details.png)