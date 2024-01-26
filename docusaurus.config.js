// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const versions = require('./versions.json');

function getLastReleasedVersion() {
  return versions[0];
}

function getNextVersionName() {
    const expectedPrefix = 'v0.';
    const lastReleasedVersion = getLastReleasedVersion();
    if (!lastReleasedVersion.includes(expectedPrefix)) {
        throw new Error(
            'this code is only meant to be used during the 1.0 phase.',
        );
    }
    const version = parseInt(lastReleasedVersion.replace(expectedPrefix, ''), 10);
    return `${expectedPrefix}${version + 1}`;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Evolve Your Internal Developer Platform with KusionStack',
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
        locales: ['en'],
    },
    scripts: [],

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),

                    // Versionning related configs
                    lastVersion: getLastReleasedVersion(),
                    versions: {
                        current: {
                            label: `${getNextVersionName()} 🚧`,
                        },
                    },
                    // includeCurrentVersion: true,
                    // onlyIncludeVersions: (() => {
                    //     return ['current', ...versions.slice(0, 2)];
                    // })(),

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
                // The default Global Site Tag (gtag.js) plugin.
                // It is a JavaScript tagging framework and API that allows you to send event data to 
                // Google Analytics, Google Ads, and Google Marketing Platform.
                //
                // More see: https://docusaurus.io/docs/3.0.1/api/plugins/@docusaurus/plugin-google-gtag
                gtag: {
                    trackingID: 'G-XC4Z27TLBR',
                    anonymizeIP: false,
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
                        position: 'left',
                        sidebarId: 'kusion',
                        label: 'Kusion',
                    },
                    {
                        type: 'docSidebar',
                        position: 'left',
                        sidebarId: 'operating',
                        label: 'Operating',
                    },
                    {
                        type: 'docSidebar',
                        position: 'left',
                        sidebarId: 'ctrlmesh',
                        label: 'Ctrlmesh',
                    },
                    {
                        type: 'docSidebar',
                        position: 'left',
                        sidebarId: 'community',
                        label: 'Community',
                    },
                    {
                        to: 'https://blog.kusionstack.io',
                        label: 'Blog',
                        position: 'left',
                        target: '_self'
                    },
                    {
                        type: 'docsVersionDropdown',
                        position: 'right'
                    },
                    // {
                    //     type: 'localeDropdown',
                    //     position: 'right',
                    //     dropdownItemsAfter: [
                    //         {
                    //             href: 'https://github.com/KusionStack/kusionstack.io/issues/25',
                    //             label: 'Help Us Translate',
                    //         },
                    //     ],
                    // },
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
                        title: 'Document',
                        items: [
                            {
                                label: 'Kusion',
                                to: '/docs',
                            },
                            {
                                label: 'ControllerMesh',
                                to: '/docs/ctrlmesh/intro/',
                            },
                        ],
                    },
                    {
                        title: 'Resource',
                        items: [
                            {
                                label: 'Blog',
                                to: "https://blog.kusionstack.io/",
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
