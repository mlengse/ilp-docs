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
    component: ComponentCreator('/docs', 'd1f'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'fa9'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '619'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '4a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1',
                component: ComponentCreator('/docs/1', '1d8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1/1',
                component: ComponentCreator('/docs/1/1', '416'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1/2',
                component: ComponentCreator('/docs/1/2', '2d8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1/3',
                component: ComponentCreator('/docs/1/3', '941'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/1/4',
                component: ComponentCreator('/docs/1/4', '66a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pendahuluan/',
                component: ComponentCreator('/docs/pendahuluan/', 'd74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pendahuluan/referensi',
                component: ComponentCreator('/docs/pendahuluan/referensi', '55a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pendahuluan/tdd',
                component: ComponentCreator('/docs/pendahuluan/tdd', '81f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/',
                component: ComponentCreator('/docs/pkp/', 'd64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/1',
                component: ComponentCreator('/docs/pkp/1', 'e6c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/10',
                component: ComponentCreator('/docs/pkp/10', '4f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/11',
                component: ComponentCreator('/docs/pkp/11', 'a79'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/12',
                component: ComponentCreator('/docs/pkp/12', 'a20'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/13',
                component: ComponentCreator('/docs/pkp/13', '571'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/14',
                component: ComponentCreator('/docs/pkp/14', '4e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/15',
                component: ComponentCreator('/docs/pkp/15', '0ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/2',
                component: ComponentCreator('/docs/pkp/2', '149'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/3',
                component: ComponentCreator('/docs/pkp/3', '0cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/4',
                component: ComponentCreator('/docs/pkp/4', 'a95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/5',
                component: ComponentCreator('/docs/pkp/5', '858'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/6',
                component: ComponentCreator('/docs/pkp/6', '066'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/7',
                component: ComponentCreator('/docs/pkp/7', '71f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/8',
                component: ComponentCreator('/docs/pkp/8', '51b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pkp/9',
                component: ComponentCreator('/docs/pkp/9', '27b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pmkp/',
                component: ComponentCreator('/docs/pmkp/', '5a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pmkp/1',
                component: ComponentCreator('/docs/pmkp/1', '249'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pmkp/2',
                component: ComponentCreator('/docs/pmkp/2', '3e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pmkp/3',
                component: ComponentCreator('/docs/pmkp/3', '0db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/referensi',
                component: ComponentCreator('/docs/referensi', '206'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/survei/',
                component: ComponentCreator('/docs/survei/', '129'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/survei/metode',
                component: ComponentCreator('/docs/survei/metode', 'a12'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/survei/surveior',
                component: ComponentCreator('/docs/survei/surveior', '636'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tdd',
                component: ComponentCreator('/docs/tdd', '18d'),
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
