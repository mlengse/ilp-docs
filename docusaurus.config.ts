import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkHyphenopoly from './src/remark/hyphenopoly';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'dotenv/config'
// import remarkHypher from 'remark-hypher'
// import pattern from './hyphenation'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ILP Puskesmas',
  tagline: 'Integrasi Pelayanan Kesehatan Primer',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ilp.jyg.my.id',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mlengse', // Usually your GitHub org/user name.
  projectName: 'ilp-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
  },
  markdown: {
    mermaid: true
  },
  themes: [
    '@docusaurus/theme-mermaid',
    // [docusaurusSearchLocal, ({
    //   hashed: true,
    //   language: ['id']
    // })]
  ],
  plugins: [
    process.env.NODE_ENV === 'production' && '@docusaurus/plugin-debug',
  ].filter(Boolean),
  presets: [
    [
      'classic',
      {
        docs: {
          showLastUpdateTime: true,
          routeBasePath: '/',
          path: 'docs',
          sidebarPath: './sidebars.ts',
          rehypePlugins: [rehypeKatex],
          remarkPlugins: [
            remarkMath,
            // remarkHyphenopoly
            [remarkHyphenopoly, {
            //   // file: './patterns/id.wasm',
              lang: 'id',
              minWordLength: 5
            }]
            // [remarkHypher, {
            //   language: pattern,
            //   leftmin: 2,
            //   rightmin: 3,
            //   minLength: 5,
            // }]
          ],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
          'https://github.com/mlengse/ilp-docs/blob/master/',
          // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          
        },
        blog: false
      //   blog: {
      //     showReadingTime: true,
      //     feedOptions: {
      //       type: ['rss', 'atom'],
      //       xslt: true,
      //     },
      //     // Please change this to your repo.
      //     // Remove this to remove the "edit this page" links.
      //     editUrl:
      //       'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
      //     // Useful options to enforce blogging best practices
      //     onInlineTags: 'warn',
      //     onInlineAuthors: 'warn',
      //     onUntruncatedBlogPosts: 'warn',
      //   },
      //   theme: {
      //     customCss: './src/css/custom.css',
      //   },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: process.env.ALGOLIA_APP_ID,

      // Public API key: it is safe to commit it
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY,

      indexName: process.env.ALGOLIA_INDEX_NAME,

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
    // Replace with your project's social card
    image: 'img/download.png',
    navbar: {
      title: 'Referensi',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'ILP',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Tutorial',
      //         to: '/docs',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //       {
      //         label: 'X',
      //         href: 'https://x.com/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'More',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: '/blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      copyright: `© ${new Date().getFullYear()} Puskesmas Jayengan`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
