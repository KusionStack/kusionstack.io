# Contributing Guide

Contributing Guide that introduces how to participate and contribute to the community.

To help us create a safe and positive community experience for all, we require all participants adhere to the CNCF Community [Code of Conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md).

## Before contributing


### Find a Contribution Point

You can contribute to Karpor in several ways including code and non-code contributions,
we appreciate every effort you contribute to the community. 

Here are some examples:

* Contribute to the codebase and docs.
* Report and triage issues.
* Organize meetups and user groups in your local area.
* Help others by answering questions about Karpor.

And:

- If you don’t know what issues start, we have prepared a [Community tasks | 新手任务清单 🎖︎](https://github.com/KusionStack/karpor/issues/463), or you can filter [help wanted](https://github.com/KusionStack/karpor/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or [good first issue](https://github.com/KusionStack/karpor/issues?q=is%3Aopen+is%3Aissue++label%3A%22good+first+issue%22) label in issue tracker. you can choose the issue you like.
- If you have any questions, please [Submit the Issue](https://github.com/KusionStack/karpor/issues/new/choose) or [Post on the discussions](https://github.com/KusionStack/karpor/discussions/new/choose), we will answer as soon as possible.

### How to Contribute Non-code

We regard non-coding contribution as equally important with code contribution for the community's very existence and its future growth.

- Refer to [Non-code Contribution Guide](./non-code-contribute) to know how you could help.

### How to Contribute Code

Unsure where to begin contributing to Karpor codebase? Start by browsing issues labeled `good first issue` or `help wanted`.

- [Good first issue](https://github.com/KusionStack/karpor/labels/good%20first%20issue) issues are generally straightforward to complete.
- [Help wanted](https://github.com/KusionStack/karpor/labels/help%20wanted) issues are problems we would like the community to help us with regardless of complexity.
- Refer to [Code Contribution Guide](./code-contribute) for more details.

Learn [Code Conventions](../conventions/code-conventions) and [Test Conventions](../conventions/test-conventions) and understand what to pay attention to when writing code. 

And learn the [Release Process And Cadence](../conventions/release-process) to know when your code changes will be released.

## Contribute a Pull Request

After opening or claiming an issue, you could contribute codes or non-codes to karpor by a pull request. Here are the steps you should follow:

### Fork Repository

Karpor adopts trunk-based development, i.e., the code used for release is maintained on the main branch.

Thus, to develop karpor, you have to fork one project in [karpor](https://github.com/KusionStack/karpor) repository to your workspace, and then check out a new branch to develop coding.

### Develop Code/Non-Code

Now you can start writing to solve the issue. To maintain the quality of karpor, after submitting the PR, some necessary checks will be triggered.

After the development is completed, commit and push to your forked repository. Since the PR Title will be used as a merging commit message, we ask your PR Title to meet the [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/).

PR Title should be organized following this structure:
```
<type>[optional scope]: <subject>

[optional body]
```

The required type helps better capture the area of the commit, based on the [Angular guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

We use lowercase for `<type>` to avoid spending time on case-sensitive issues. `<type>` can be one of the following:
```
feat: A new feature
fix: A bug fix
docs: Documentation only changes
build: Changes that affect the build system or external dependencies
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing tests or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
```

More see: [Commit Conventions](../2-conventions/4-commit-conventions.md)

### Open a Pull Request

[Open a pull request](https://github.com/KusionStack/karpor/pulls) from the develop branch of your forked repository to the main branch of karpor. You should clearly describe what you do in the PR, and link it to an issue. Besides, the PR title should also follow the commit conventions described above, and must be 5-256 characters in length, prefix `WIP` and `[WIP]` are not allowed.

### Sign CLA

If it was your first pull request, you need to sign our [CLA(Contributor License Agreement)](https://github.com/KusionStack/.github/blob/main/CLA.md). The only thing you need to do is to post a pull request comment same as the below format:

`I have read the CLA Document and I hereby sign the CLA`

If your CLA signature failed, you may find the solutions below:

* The comment must be in the same format as above, with no extra spaces, line breaks, etc.
* The git committer must be the same one who created the Karpor PR

### PR Checks

To keep the reliability of the karpor project, the following check will get triggered automatically:

* Unit Test
* Golang Lint
* Commit Lint
* PR Title Lint
* License Lint
* Markdown Link Lint

Please make sure your PR passes these checks.

## Become a Community Member

If you're interested to become a community member or learn more about the governance, please check the [ROLES](https://github.com/KusionStack/community/blob/main/ROLES.md) for details.

Enjoy coding and collaboration in Karpor world!

