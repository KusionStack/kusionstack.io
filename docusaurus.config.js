// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Evolve your Internal Developer Platform with KusionStack',
    tagline: 'Build a more efficient and secure enterprise-grade Internal Developer Platform in Kubernetes and Clouds',

    url: 'https://kusionstack.io',
    organizationName: 'KusionStack', // Usually your GitHub org/user name.
    projectName: 'kusionstack.io', // Usually your repo name.

    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/kusionstack-icon-square.png',

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
            docs: {
                sidebar: {
                    autoCollapseCategories: true
                }
            },
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
                    alt: 'KusionStack Icon',
                    src: 'img/kusionstack-icon.png',
                    srcDark: 'img/kusionstack-icon-white.png',
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
                    // {
                    //     type: 'docSidebar',
                    //     position: 'left',
                    //     sidebarId: 'governance',
                    //     label: 'Governance',
                    // },

                    { to: 'https://medium.com/@kusionstack', label: 'Blog', position: 'left' },

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
                            {
                                label: 'Get Started',
                                to: '/docs/user_docs/getting-started',
                            },
                            {
                                label: 'FAQ',
                                to: '/docs/user_docs/support',
                            }
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
                                label: 'KCL',
                                to: 'https://kcl-lang.io',
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
};

module.exports = config;
