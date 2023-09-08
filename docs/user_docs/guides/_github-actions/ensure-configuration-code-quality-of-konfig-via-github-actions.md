---
sidebar_position: 1
---

# Ensure Configuration Code Quality of Konfig via GitHub Actions

In the scenario of multi-person collaboration, the application configuration codes in Konfig are completed by Developer and Platform from different teams. Hence, the correctness of the configurations needs to be guaranteed through a reliable mechanism. As a CI/CD platform, [GitHub Actions](https://docs.github.com/en/actions) can automate pipelines such as building, testing, and deploying. By customizing the [GitHub Actions workflow](https://docs.github.com/en/actions/using-workflows/about-workflows), you can guarantee the correctness and reliability of the configuration codes in the Konfig repository.

KusionStack provides a variety of tools integrating with GitHub Actions. This tutorial will demonstrate how to co ensure quality of the configuration codes through GitHub Actions.

## Create Konfig Repository

KusionStack provides an official application configuration repository [KusionStack/konfig](https://github.com/KusionStack/konfig), which mainly includes:

- **Base models**, such as [Server](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_models/kube/frontend/server.k), located in `/base`;
- **Sample application configuration codes**, such as [Wordpress](https://github.com/KusionStack/konfig/tree/main/appops/wordpress) and [Guestbook](https://github.com/KusionStack/konfig/tree/main/appops/guestbook), located in `/appops`;
- **Configuration code management tools**, such as [directory structure verification](https://github.com/KusionStack/konfig/blob/main/hack/verify-project-structure.py), [code correctness test](https://github.com/KusionStack/konfig/blob/main/hack/test_konfig.py) and [lint style check](https://github.com/KusionStack/konfig/blob/main/hack/lint_check.py), located in `/hack`.

Fork KusionStack/konfig, and create your own Konfig repository, to maintain your application configuration codes.

:::info
KusionStack/konfig is looking forward to your [contributions](https://github.com/KusionStack/konfig#contribution-guidelines) to enhance the base models and management tools.
:::

## Create GitHub Actions Workflow

KusionStack/konfig provides the GitHub Actions workflow [main.yml](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml), which is triggered by a push or pull request on the main branch. The main.yml includes multiple jobs, ensuring the reliability of configuration codes on the main branch.

Next, this tutorial will introduce the usages and functions of these jobs. To show how they work more visually, an example, [adding environment variables for application Wordpress](https://github.com/KusionStack/konfig/pull/113) (referred to "the example" in the below), is also given.

![wordpress-workflow](/img/docs/user_docs/guides/github-actions/wordpress-workflow.png)

### Analyze Affected Application

There are two types of code maintained in the Konfig repository, **application configurations** and **base models**. When the codes of the former case get changed, only the corresponding applications are affected, while for the latter case, all the applications that depend on these codes are affected. If you want to ensure the correctness of all the application configurations after each change, analyzing the affected applications is the first step.

The jobs, [diff](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L10) and [deps](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L20), perfectly accomplish the affected application analysis. The main steps are as follows:

- Obtain the list of changed files through `git diff`;
- Based on the changed file list, use `kusion deps` to obtain the list of projects and stacks affected by the changed file.

The [example](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234827063?pr=113) changes the file `/appops/wordpress/dev/main.k`, where the affected project is `/appops/wordpress`, and the stack is `/appops/wordpress/dev`. Delightfully, the result, which is shown below, meets our expectation.

![deps](/img/docs/user_docs/guides/github-actions/deps.png)

### Verify Directory Structure

The Konfig repository should be orginized according to the [correct directory structure](https://github.com/KusionStack/konfig#directory-structure). The job [structure-check](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L121) guarantees the directory structure legality of the changed applications. The check items are as follows:

- There must be the files `project.yaml` and `OWNERS` under the project directory;
- There must be the files `stack.yaml`, `main.k`, `ci-test/settings.yaml` and `ci-test/stdout.golden.yaml` under the stack directory;
- The field `name` is required in project.yaml;
- The field `name` is required in stack.yaml, and must be the same as stack directory name.

The success of structure-check means the correctness of directory structure. A [pytest](https://docs.pytest.org/en/7.3.x/) report `structure-check-report` is also generated, and you can get it from [GithHub Actions Artifacts](https://docs.github.com/en/actions/managing-workflow-runs/downloading-workflow-artifacts) .

The [example](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234834632) passes the directory structure verification. It is clear from the report that the affected application `appops/wordpress` has get checked, and the result is passed.

![structure-check](/img/docs/user_docs/guides/github-actions/structure-check.png)

### Test Code Correctness

Besides a rightful directory structure, the codes must have correct syntax and semantics, and the configuration changes should meet the expectation of Developer or Platform. The `ci-test` directory under the path of stack ensures the correctness. The workflow is as follows:

- The Developer or Platform completes configuration code development locally, and executes `make check-${changedProject}` or `make check-all` (that is, executes `kusion compile` under the affected stacks' pathes), to update `ci-test/stdout.golden.yaml`. The Developer or Platform needs to confirm the changes of `ci-test/stdout.golden.yaml` meet its expectation, which means the correctness of configuration changes is acknowledged;
- Then, push or pull request to the main branch. The job [test](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L144) executes `kusion compile` on the changed stacks to generate new compilation results, and compare them with `ci-test/stdout.golden.yaml`. If the comparison results are consistent, the correctness is confirmed. It means the changes of configuration codes meet expectation. If `kusion compile` fails or the comparison results are inconsistent, the check fails. It means there are syntax errors, or the changes are not expected by Developer or Platform.

The report whose name is `test-report` get generated.

The [example](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234834490) passes the code correctness test. The report shows that the tested stack is `appops/wordpress/dev`, and the result is passed.

![test](/img/docs/user_docs/guides/github-actions/test.png)

### Check Lint Style

For the maintainability and scalability of the Konfig reposiroty, the job [lint](https://github.com/KusionStack/konfig/blob/main/.github/workflows/main.yml#L89) is provided, which performs lint style check for the changed codes. The job lint is based on [kcl lint](https://kusionstack.io/docs/reference/cli/kcl/lint/), which checks import compliance, etc.

Similar to the above jobs, the job lint will also generate a report named `link-report`.

The [example](https://github.com/KusionStack/konfig/actions/runs/5132912522/jobs/9234834286) passes the lint style check and its report is as follows.

![lint](/img/docs/user_docs/guides/github-actions/lint.png)

## Summary
This tutorial demonstrates how the Konfig repository integrates with GitHub Actions, to manage the quality of configuration codes. In the scenario of multi-person collaboration, Konfig with GitHub Actions enables you manage application configurations efficiently and reliably.
