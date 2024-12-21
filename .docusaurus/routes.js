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
    component: ComponentCreator('/docs', 'ffe'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'd98'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'ee0'),
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
                path: '/docs/2',
                component: ComponentCreator('/docs/2', '529'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/2/1',
                component: ComponentCreator('/docs/2/1', 'f00'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/2/2',
                component: ComponentCreator('/docs/2/2', '8af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/2/3',
                component: ComponentCreator('/docs/2/3', '87e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3',
                component: ComponentCreator('/docs/3', '10e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/1',
                component: ComponentCreator('/docs/3/1', 'aa0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/1',
                component: ComponentCreator('/docs/3/1', 'dc5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/10',
                component: ComponentCreator('/docs/3/10', '747'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/11',
                component: ComponentCreator('/docs/3/11', 'a0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/12',
                component: ComponentCreator('/docs/3/12', '47a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/13',
                component: ComponentCreator('/docs/3/13', '193'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/14',
                component: ComponentCreator('/docs/3/14', '434'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/15',
                component: ComponentCreator('/docs/3/15', 'f92'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/2',
                component: ComponentCreator('/docs/3/2', 'a0d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/2',
                component: ComponentCreator('/docs/3/2', 'ccd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/3',
                component: ComponentCreator('/docs/3/3', '84f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/3',
                component: ComponentCreator('/docs/3/3', '86f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/4',
                component: ComponentCreator('/docs/3/4', 'c0c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/4',
                component: ComponentCreator('/docs/3/4', '29b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/5',
                component: ComponentCreator('/docs/3/5', '528'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/6',
                component: ComponentCreator('/docs/3/6', '860'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/7',
                component: ComponentCreator('/docs/3/7', 'cf8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/8',
                component: ComponentCreator('/docs/3/8', '75f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/3/9',
                component: ComponentCreator('/docs/3/9', '310'),
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
                path: '/docs/pendahuluan/survei/',
                component: ComponentCreator('/docs/pendahuluan/survei/', 'c2b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pendahuluan/survei/metode',
                component: ComponentCreator('/docs/pendahuluan/survei/metode', 'fa2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pendahuluan/survei/surveior',
                component: ComponentCreator('/docs/pendahuluan/survei/surveior', '6b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/pendahuluan/tdd',
                component: ComponentCreator('/docs/pendahuluan/tdd', '81f'),
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
