import { defineConfig } from 'vitepress';
// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  description: 'Vite & Vue powered static site generator.',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Surveybrowser',
    },
    zh: {
      label: '简体中文',
      lang: 'cn-ZH', // optional, will be added  as `lang` attribute on `html` tag
      link: '/zh/', // default /fr/ -- shows on navbar translations menu, can be external
      title: '调查浏览器',

      // other locale specific properties...
    },
  },

  themeConfig: {
    logo: '/icon/logo.png',
    nav: [
      { text: 'Example', link: '/example' },

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
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You',
    },

    sidebar: [
      {
        // text: 'Guide',
        items: [
          { text: 'Example', link: '/example' },
          // ...
        ],
      },
    ],
  },
});
