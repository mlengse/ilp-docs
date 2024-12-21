import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/blog/authors/all-sebastien-lorber-articles', '4a1'),
    exact: true
  },
  {
    path: '/blog/authors/yangshun',
    component: ComponentCreator('/blog/authors/yangshun', 'a68'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '89a'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9ad'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'e9f'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '704'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '858'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '299'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '00d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'd2b'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '189'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '76c'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'cef'),
            routes: [
              {
                path: '/docs/1',
                component: ComponentCreator('/docs/1', 'e2f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/2',
                component: ComponentCreator('/docs/2', 'dd9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/2/1',
                component: ComponentCreator('/docs/2/1', '9de'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/2/2',
                component: ComponentCreator('/docs/2/2', 'd4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/2/3',
                component: ComponentCreator('/docs/2/3', 'ee5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3',
                component: ComponentCreator('/docs/3', 'd7e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/1',
                component: ComponentCreator('/docs/3/1', 'c36'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/1',
                component: ComponentCreator('/docs/3/1', 'f96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/10',
                component: ComponentCreator('/docs/3/10', '85f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/11',
                component: ComponentCreator('/docs/3/11', 'af0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/12',
                component: ComponentCreator('/docs/3/12', '93e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/13',
                component: ComponentCreator('/docs/3/13', '500'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/14',
                component: ComponentCreator('/docs/3/14', '3aa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/15',
                component: ComponentCreator('/docs/3/15', '0f8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/2',
                component: ComponentCreator('/docs/3/2', 'cbb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/2',
                component: ComponentCreator('/docs/3/2', '102'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/3',
                component: ComponentCreator('/docs/3/3', 'b17'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/3',
                component: ComponentCreator('/docs/3/3', 'f39'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/4',
                component: ComponentCreator('/docs/3/4', '415'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/4',
                component: ComponentCreator('/docs/3/4', 'b90'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/5',
                component: ComponentCreator('/docs/3/5', 'c4e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/6',
                component: ComponentCreator('/docs/3/6', 'a00'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/7',
                component: ComponentCreator('/docs/3/7', 'cc9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/8',
                component: ComponentCreator('/docs/3/8', '46b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/9',
                component: ComponentCreator('/docs/3/9', 'e1e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ilp/',
                component: ComponentCreator('/docs/ilp/', '6c9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ilp/pendahuluan/',
                component: ComponentCreator('/docs/ilp/pendahuluan/', '282'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ilp/pendahuluan/dasar-hukum',
                component: ComponentCreator('/docs/ilp/pendahuluan/dasar-hukum', '88b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/klinik/',
                component: ComponentCreator('/docs/klinik/', '7b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/klinik/pendahuluan/',
                component: ComponentCreator('/docs/klinik/pendahuluan/', '4c0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/klinik/pendahuluan/referensi',
                component: ComponentCreator('/docs/klinik/pendahuluan/referensi', 'c20'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/klinik/pendahuluan/survei/',
                component: ComponentCreator('/docs/klinik/pendahuluan/survei/', '90d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/klinik/pendahuluan/survei/metode',
                component: ComponentCreator('/docs/klinik/pendahuluan/survei/metode', '74b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/klinik/pendahuluan/survei/surveior',
                component: ComponentCreator('/docs/klinik/pendahuluan/survei/surveior', 'ade'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/klinik/pendahuluan/tdd',
                component: ComponentCreator('/docs/klinik/pendahuluan/tdd', 'b9f'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
