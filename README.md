[![Contributors](https://img.shields.io/github/contributors/kusionstack/kusionstack.io.svg?style=for-the-badge)](https://github.com/kusionstack/kusionstack.io/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/kusionstack/kusionstack.io.svg?style=for-the-badge)](https://github.com/kusionstack/kusionstack.io/network/members)
[![GitHub stars](https://img.shields.io/github/stars/kusionstack/kusionstack.io.svg?style=for-the-badge&label=Stars)](https://github.com/kusionstack/kusionstack.io/)
[![license](https://img.shields.io/github/license/kusionstack/kusionstack.io.svg?style=for-the-badge)](https://github.com/kusionstack/kusionstack.io)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FKusionStack%2Fkusionstack.io.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FKusionStack%2Fkusionstack.io?ref=badge_shield)

# kusionstack.io

Source for kusionstack.io site <https://kusionstack.io>.

Powered by [Docusaurus 2](https://docusaurus.io/).

## Write documentation for each sub product

Write documentation for sub products in the `./docs/[subProductName]` directory.

## Build locally

```shell
$ rm -rf .docusaurus
$ npm install
$ npm run start
```

Open http://localhost:3000 in the browser.

## Build locally with i18n

```shell
$ npm run build
$ npx http-server ./build
```

Open http://localhost:8080 in the browser.

## Tagging a new version for each sub product

1. First, make sure the current docs version (the `./docs/[subProductName]` directory) is ready to be frozen.
2. Enter the specified sub product name and a new version number:

```bash
npm run docusaurus docs:version:[subProductName] [vMAJOR.MINOR]

# If the sub product has an international document and needs to execute the command again, 
# it will generate the i18n directory corresponding to that version.
npm run write-translations -- --locale [localeName] --override
```

Example:

```bash
npm run docusaurus docs:version:docs v0.12
npm run docusaurus docs:version:kuperator v0.2
npm run docusaurus docs:version:ctrlmesh v0.3
npm run docusaurus docs:version:karpor v0.4

# If the sub product has an international document and needs to execute the command again, 
# it will generate the i18n directory corresponding to that version.
npm run write-translations -- --locale zh --override
```

Use karpor as an example, when preparing to officially release version v0.6.0, execute the following commands in sequence:
```bash
npm run docusaurus docs:version:karpor v0.6
npm run write-translations -- --locale zh --override && npm run write-translations -- --locale en --override
# Note: After execution, version declaration files will be automatically updated.
# For example, the next version in current.json will be changed to v0.7.0.
# And, you need to remove any file changes unrelated to Karpor here.
```

Optional sub product names:

-   `docs` (alias for kusion)
-   `kuperator`
-   `ctrlmesh`
-   `karpor`

Format of version number: `[vMAJOR.MINOR]`, e.g. `v0.3`, `v0.13`.

When tagging a new version of sub product, the document versioning mechanism will:

-   Copy the full `docs/[subProductName]` folder contents into a new `[subProductName]_versioned_docs/version-[versionName]/` folder.
-   Create a versioned sidebars file based from your current [sidebar](docs-introduction.mdx#sidebar) configuration (if it exists) - saved as `[subProductName]_versioned_sidebars/version-[versionName]-sidebars.json`.
-   Append the new version number to `[subProductName]_versions.json`.

More see:

-   [Versioning](https://docusaurus.io/docs/versioning)
-   [Docs Multi-instance](https://docusaurus.io/zh-CN/docs/2.x/docs-multi-instance#tagging-new-versions)

## Notice

This website is built under Docusaurus version 2.4.1. There may be unknown errors when compiling on other versions.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FKusionStack%2Fkusionstack.io.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FKusionStack%2Fkusionstack.io?ref=badge_large)