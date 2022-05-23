// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const math = require('remark-math');
const katex = require('rehype-katex');
const mermaid = require('mdx-mermaid');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KusionStack',
  tagline: '一站式可编程配置技术栈',

  url: 'https://kusionstack.io',
  organizationName: 'KusionStack', // Usually your GitHub org/user name.
  projectName: 'kusionstack.io', // Usually your repo name.

  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/kcl-logo.png',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
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
          remarkPlugins: [math, mermaid],
          rehypePlugins: [katex],
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
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ',
      crossorigin: 'anonymous',
    },
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
        appId: '5JTIY9OTXT',
        apiKey: '83c022f4ad19bf018860b768f23f879d',
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
            label: '使用文档',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'reference',
            label: '参考手册',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'develop',
            label: '开发文档',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'governance',
            label: '治理',
          },

          {to: '/blog', label: '博客', position: 'left'},

          //{
          //  type: 'docsVersionDropdown',
          //  position: 'right',
          //  dropdownActiveClassDisabled: true
          //},
          {type: 'localeDropdown', position: 'right'},
          {
            href: 'https://github.com/KusionStack',
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
            title: '文档',
            items: [
              {
                label: 'KusionStack 简介',
                to: '/docs/user_docs/intro/kusion-intro',
              },
              {
                label: 'KusionStack 与社区工具异同',
                to: '/docs/user_docs/intro/vs-x',
              },
            ],
          },
          {
            title: '资源',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: 'Github',
                href: 'https://github.com/KusionStack',
              },
              {
                label: 'Slack',
                href: 'https://KusionStack.slack.com',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '常见问题',
                to: '/docs/user_docs/support',
              },
              {
                label: '更新日志',
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
        copyright: `版权 © ${new Date().getFullYear()} KusionStack Authors`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

    plugins: [
      //[
      //  require.resolve('docusaurus-lunr-search'), {
      //    // indexBaseUrl: true,
      //    // languages: ['zh-CN'],
      //  },
      //],
      [
        require.resolve('./src/plugins/changelog/index.js'),
        {
          blogTitle: 'KusionStack 更新日志',
          blogDescription:
            'Keep yourself up-to-date about new features in every release',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '更新日志',
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
            language: 'zh',
          },
        },
      ],
    ],
};

module.exports = config;
