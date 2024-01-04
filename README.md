[![Contributors](https://img.shields.io/github/contributors/kusionstack/kusionstack.io.svg?style=for-the-badge)](https://github.com/kusionstack/kusionstack.io/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/kusionstack/kusionstack.io.svg?style=for-the-badge)](https://github.com/kusionstack/kusionstack.io/network/members)
[![GitHub stars](https://img.shields.io/github/stars/kusionstack/kusionstack.io.svg?style=for-the-badge&label=Stars)](https://github.com/kusionstack/kusionstack.io/)
[![license](https://img.shields.io/github/license/kusionstack/kusionstack.io.svg?style=for-the-badge)](https://github.com/kusionstack/kusionstack.io)

# kusionstack.io

Source for kusionstack.io site <https://kusionstack.io>.

Powered by [Docusaurus 2](https://docusaurus.io/).

## Build locally

```shell
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

## Tagging a new version

1. First, make sure the current docs version (the `./docs` directory) is ready to be frozen.
2. Enter a new version number.

```bash
npm run docusaurus docs:version v0.10
```

When tagging a new version, the document versioning mechanism will:

- Copy the full `docs/` folder contents into a new `versioned_docs/version-[versionName]/` folder.
- Create a versioned sidebars file based from your current [sidebar](docs-introduction.mdx#sidebar) configuration (if it exists) - saved as `versioned_sidebars/version-[versionName]-sidebars.json`.
- Append the new version number to `versions.json`.

More see: [Versioning](https://docusaurus.io/docs/versioning)

## Notice

This website is built under Docusaurus version 2.4.1. There may be unknown errors when compiling on other versions.
