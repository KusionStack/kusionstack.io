---
title: Commit Conventions
---

## Commit Message Structure

Karpor adheres to [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/).

Commit messages should be organized following this structure:

```
<type>[optional scope]: <subject>

[optional body]
```

## Example

Commit message with scope:

```
feat(lang): add polish language
```

Commit message without body:

```
docs: correct spelling of CHANGELOG
```

Commit message with multiple body paragraphs:：

```
fix: correct minor typos in code

see the issue for details

on typos fixed.

reviewed-by: Z
refs #133
```

## `<type>`(Required)
The required type helps better capture the area of the commit, based on the [Angular guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

We use lowercase for `<type>` to avoid spending time on case-sensitive issues. `<type>` can be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **build**: Changes that affect the build system or external dependencies
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

## `<scope>`(Optional)

Scope is optional and can be provided to the type of commit to provide additional contextual information, enclosed in parentheses. It can be anything specifying the place of the commit change. Github issue links are also valid scopes e.g., fix(ui), feat(api), fix(#233), etc.

When the change affects multiple scopes, `*` can be used.

## `<subject>`(Required)

The subject must come immediately after the type/scope prefix, followed by a colon and space. It is a concise summary of the code changes, for example, "fix: array parsing issue when multiple spaces were contained in string", rather than "fix: bug".

## `<body>`(Required)

A longer commit body can be provided after the brief subject, giving additional context information about the code change. The body must begin one line after the description.

