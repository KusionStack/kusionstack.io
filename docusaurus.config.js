// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KusionStack',
  tagline: 'A Unified Programmable Configuration Tech Stack',

  url: 'https://kusionstack.io',
  organizationName: 'KusionStack', // Usually your GitHub org/user name.
  projectName: 'kusionstack.io', // Usually your repo name.

  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/kcl-logo.png',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
  },
  scripts: [],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // default version: Next
          // lastVersion: 'current',

          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/KusionStack/kusionstack.io/blob/main',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          postsPerPage: 2,
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/KusionStack/kusionstack.io/blob/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // hideableSidebar: true,
      autoCollapseSidebarCategories: true,
      announcementBar: {
        id: 'announcementBar-1', // Increment on change
        content: `⭐️ If you like KusionStack, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/KusionStack/kusion">Github</a>`,
      },
      
      algolia: {
        appId: 'RE5E6BQUZV',
        apiKey: 'e9703ec3fe7856ddb5a1321fd17a5425',
        indexName: 'kusionstack',
        contextualSearch: true,
      },
      navbar: {
        title: 'KusionStack',
        logo: {
          alt: 'KusionStack Logo',
          src: 'img/kcl-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            docId: 'intro/kusion-intro',
            position: 'left',
            sidebarId: 'user_docs',
            label: 'UserDoc',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'reference',
            label: 'Reference',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'develop',
            label: 'DevDoc',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'governance',
            label: 'Governance',
          },

          {to: '/blog', label: 'Blog', position: 'left'},

          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'events',
            label: 'Events',
          },

          //{
          //  type: 'docsVersionDropdown',
          //  position: 'right',
          //  dropdownActiveClassDisabled: true
          //},
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                href: 'https://github.com/KusionStack/kusionstack.io/issues/25',
                label: 'Help Us Translate',
              },
            ],
          },
          {
            href: 'https://github.com/KusionStack/kusion',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
          },
        ].filter(item => true),
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Document',
            items: [
              {
                label: 'Introduction',
                to: '/docs/user_docs/intro/kusion-intro',
              },
            ],
          },
          {
            title: 'Resource',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Github',
                href: 'https://github.com/KusionStack',
              },
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/kusionstack/shared_invite/zt-19lqcc3a9-_kTNwagaT5qwBE~my5Lnxg',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'FAQ',
                to: '/docs/user_docs/support',
              },
              {
                label: 'Changelog',
                to: '/changelog',
              },
            ],
          },
        ],
        logo: {
          alt: 'AntGroup Open Source Logo',
          src: 'img/oss_logo.svg',
          width: 160,
          height: 51,
          href: 'https://opensource.antgroup.com/',
        },
        copyright: `Copyright © ${new Date().getFullYear()} KusionStack Authors`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

    plugins: [
      [
        require.resolve('./src/plugins/changelog/index.js'),
        {
          blogTitle: 'KusionStack Changelog',
          blogDescription:
            'Keep yourself up-to-date about new features in every release',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Changelog',
          routeBasePath: '/changelog',
          showReadingTime: false,
          postsPerPage: 20,
          archiveBasePath: null,
          authorsMapPath: 'authors.json',
          feedOptions: {
            type: 'all',
            title: 'KusionStack changelog',
            description:
              'Keep yourself up-to-date about new features in every release',
            copyright: `Copyright © ${new Date().getFullYear()} KusionStack Authors.`,
            language: 'en',
          },
        },
      ],
    ],
};

module.exports = config;
