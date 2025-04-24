// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const fs = require("fs");

function getLastReleasedVersion(current) {
  if (fs.existsSync(`./${current}_versions.json`)) {
    const versions = require(`./${current}_versions.json`);
    return versions[0];
  } else {
    return null;
  }
}

function getNextVersionName(current) {
  const expectedPrefix = "v0.";
  const lastReleasedVersion = getLastReleasedVersion(current);
  if (!lastReleasedVersion) {
    return "v0.1";
  }
  if (!lastReleasedVersion?.includes(expectedPrefix)) {
    throw new Error("this code is only meant to be used during the 1.0 phase.");
  }

  const version = parseInt(
    lastReleasedVersion?.replace(expectedPrefix, ""),
    10,
  );
  return `${expectedPrefix}${version + 1}`;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Transform Your Internal Developer Platform with KusionStack",
  tagline:
    "Create a robust, secure, and enterprise-ready Internal Developer Platform on Kubernetes and cloud infrastructures.",

  url: "https://kusionstack.io",
  organizationName: "KusionStack", // Usually your GitHub org/user name.
  projectName: "kusionstack.io", // Usually your repo name.

  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/kusionstack-icon-square.png",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    localeConfigs: {
      en: {
        label: "English",
      },
      zh: {
        label: "简体中文",
      },
    },
  },
  scripts: [],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: "docs",
          path: "docs/kusion",
          routeBasePath: "docs",
          sidebarPath: require.resolve("./sidebars/kusion.js"),

          // Versionning related configs
          lastVersion: getLastReleasedVersion("docs"),
          versions: {
            current: {
              label: `${getNextVersionName("docs")} 🚧`,
            },
          },
          // includeCurrentVersion: true,
          // onlyIncludeVersions: (() => {
          //     return ['current', ...versions.slice(0, 2)];
          // })(),

          // Please change this to your repo.
          editUrl: "https://github.com/KusionStack/kusionstack.io/blob/main",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          postsPerPage: 2,
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/KusionStack/kusionstack.io/blob/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        // The default Global Site Tag (gtag.js) plugin.
        // It is a JavaScript tagging framework and API that allows you to send event data to
        // Google Analytics, Google Ads, and Google Marketing Platform.
        //
        // More see: https://docusaurus.io/docs/3.0.1/api/plugins/@docusaurus/plugin-google-gtag
        gtag: {
          trackingID: "G-XC4Z27TLBR",
          anonymizeIP: false,
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "karpor",
        path: "docs/karpor",
        routeBasePath: "karpor",
        sidebarPath: "./sidebars/karpor.js",
        versions: {
          current: {
            label: `${getNextVersionName("karpor")} 🚧`,
          },
        },
        editUrl: "https://github.com/KusionStack/kusionstack.io/edit/main",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "kuperator",
        path: "docs/kuperator",
        routeBasePath: "kuperator",
        sidebarPath: "./sidebars/kuperator.js",
        versions: {
          current: {
            label: `${getNextVersionName("kuperator")} 🚧`,
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "ctrlmesh",
        path: "docs/ctrlmesh",
        routeBasePath: "ctrlmesh",
        sidebarPath: "./sidebars/ctrlmesh.js",
        versions: {
          current: {
            label: `${getNextVersionName("ctrlmesh")} 🚧`,
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "docs/community",
        routeBasePath: "community",
        sidebarPath: "./sidebars/community.js",
        // ... other options
      },
    ],
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        language: ["en", "zh"],
      }
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // hideableSidebar: true,
      docs: {
        sidebar: {
          autoCollapseCategories: false,
        },
      },
      announcementBar: {
        id: "announcementBar-1", // Increment on change
        content: `⭐️ If you like KusionStack, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/KusionStack/kusion">Github</a>`,
      },

      algolia: {
        appId: "RE5E6BQUZV",
        apiKey: "e9703ec3fe7856ddb5a1321fd17a5425",
        indexName: "kusionstack",
        contextualSearch: true,
      },
      navbar: {
        title: "KusionStack",
        logo: {
          alt: "KusionStack Icon",
          src: "img/kusionstack-icon.png",
          srcDark: "img/kusionstack-icon-white.png",
        },
        items: [
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "kusion",
            label: "Kusion",
            docsPluginId: "docs",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "karpor",
            label: "Karpor",
            docsPluginId: "karpor",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "kuperator",
            label: "Kuperator",
            docsPluginId: "kuperator",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "ctrlmesh",
            label: "Ctrlmesh",
            docsPluginId: "ctrlmesh",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "community",
            label: "Community",
            docsPluginId: "community",
          },
          {
            to: "https://blog.kusionstack.io",
            label: "Blog",
            position: "left",
            target: "_self",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            docsPluginId: "docs",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            docsPluginId: "karpor",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            docsPluginId: "kuperator",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            docsPluginId: "ctrlmesh",
          },
          {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                href: "https://github.com/KusionStack/karpor/issues/468",
                label: "Help Us Translate",
              },
            ],
          },
          {
            href: "https://github.com/KusionStack",
            className: "header-github-link",
            "aria-label": "GitHub repository",
            position: "right",
          },
        ].filter((item) => true),
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Document",
            items: [
              {
                label: "Kusion",
                to: "/docs",
              },
              {
                label: "Karpor",
                to: "/karpor/",
              },
              {
                label: "Kuperator",
                to: "/kuperator/introduction/",
              },
              {
                label: "CtrlMesh",
                to: "/ctrlmesh/intro/",
              },
            ],
          },
          {
            title: "Resource",
            items: [
              {
                label: "Blog",
                to: "https://blog.kusionstack.io/",
              },
              {
                label: "Github",
                href: "https://github.com/KusionStack",
              },
              {
                label: "Slack",
                href: "https://join.slack.com/t/kusionstack/shared_invite/zt-19lqcc3a9-_kTNwagaT5qwBE~my5Lnxg",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "KCL",
                to: "https://kcl-lang.io",
              },
            ],
          },
        ],
        // logo: {
        //   alt: "AntGroup Open Source Logo",
        //   src: "img/oss_logo.svg",
        //   width: 160,
        //   height: 51,
        //   href: "https://opensource.antgroup.com/",
        // },
        copyright: `Copyright © ${new Date().getFullYear()} KusionStack a Series of LF Projects, LLC. For website terms of use, trademark policy and other project policies please see <a href="https://lfprojects.org/policies/"> LF Projects, LLC Policies</a> page.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
