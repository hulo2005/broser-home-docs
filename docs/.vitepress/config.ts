import { defineConfig } from 'vitepress';
// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  description: 'Vite & Vue powered static site generator.',
  locales: {
    root: {
      label: '简体中文',
      lang: 'cn-ZH',
      title: '调查浏览器',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'Surveybrowser',
    },
  },

  themeConfig: {
    logo: '/icon/logo.png',
    outlineTitle: '页面导航',
    nav: [
      { text: '文档', link: '/docs' },
      { text: '下载', link: '/docs/install'}

      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' },
      //   ],
      // },

      // ...
    ],
    footer: {
      message: '合肥绍禹计算机科技有限公司',
      copyright: 'Copyright © 2022-2024 备案号：皖ICP备2024059545号',
    },

    sidebar: [
      {
         text: '介绍',
        items: [
          { text: '什么是Surveybrowser?', link: '/docs' },
          { text: '下载安装', link: '/docs/install' }
          // ...
        ],
      },
       {
        text:'教程',
        items:[
          {text:'代理模板', link:'/docs/proxy'}
        ]
       }
    ],
  },
});
