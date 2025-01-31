import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkHyphenopoly from './src/remark/hyphenopoly';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeInferDescription from 'rehype-infer-description-meta'
import 'dotenv/config'


const config: Config = {
  title: 'ILP Puskesmas',
  tagline: 'Integrasi Pelayanan Kesehatan Primer',
  favicon: 'img/favicon.ico',

  url: 'https://ilp.jyg.my.id',
  baseUrl: '/',

  organizationName: 'mlengse', // Usually your GitHub org/user name.
  projectName: 'ilp-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
  },
  future: {
    experimental_faster: true
  },
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
  ],
  plugins: [
    'pdf-loaders',
    process.env.NODE_ENV === 'production' && '@docusaurus/plugin-debug',
  ].filter(Boolean),
  presets: [
    [
      'classic',
      {
        docs: {
          exclude:['**.json', '**/_*.{js,jsx,ts,tsx,md,mdx}', '_**/*.{js,jsx,ts,tsx,md,mdx}'],
          showLastUpdateTime: true,
          routeBasePath: '/',
          path: 'docs',
          sidebarPath: './sidebars.ts',
          rehypePlugins: [
            rehypeKatex,
            [rehypeInferDescription, {
              selector: '.theme-doc-markdown.markdown'
            }]
          ],
          remarkPlugins: [
            remarkMath,
            [remarkHyphenopoly, {
              lang: 'id',
              minWordLength: 5
            }]
          ],
          editUrl:
          'https://github.com/mlengse/ilp-docs/blob/master/',
          
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        property: 'og:type',
        content: 'website'
      },
      {
        content: 'ILP Puskesmas',
        itemprop: 'name'
      },
      {
        content: '300',
        property: 'og:image:width'
      },
      {
        content: '300',
        property: 'og:image:width'
      },
      {
        content: 'image/png',
        property: 'og:image:type'
      },
      {
        content: 'ILP Puskesmas',
        property: 'og:site_name'
      }
    ],
    
    algolia: process.env.ALGOLIA_APP_ID ? {
      // The application ID provided by Algolia
      appId: process.env.ALGOLIA_APP_ID,

      // Public API key: it is safe to commit it
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY,

      indexName: process.env.ALGOLIA_INDEX_NAME,

      // Optional: see doc section below
      contextualSearch: true,

      insights: false,

    } : null ,
    image: 'img/download.png',
    navbar: {
      // title: 'Referensi',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ILP',
          position: 'left',
          label: 'ILP',
        },
        {
          type: 'docSidebar',
          sidebarId: 'PPK',
          position: 'left',
          label: 'PPK',
        }
      ],
    },
    footer: {
      style: 'dark',
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
