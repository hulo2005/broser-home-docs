import { defineConfig } from 'vitepress';
// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  transformHead(context) {
    return [
      [
        'script',
        {
          src: 'https://w1022.ttkefu.com/k/?fid=2H7EBD1',
          charset: 'utf-8',
        },
      ],
    ]
  },
  description: '专注于调查测试,安检以及ip质量筛选为一体的指纹浏览器',
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
      { text: '下载', link: '/docs/install'},
      {text: '关于', link: '/docs/about'}


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
      message: '合肥绍禹计算机科技有限公司 联系电话:18930261249',
      copyright: 'Copyright © 2022-2025 备案号：皖ICP备2024059545号 地址：安徽省合肥市双凤开发区光明金座618室',
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
          {text:'代理模板', link:'/docs/proxy'},
          {text:'创建PC端浏览器', link: '/docs/browser/pc'},
          {text:'创建安卓浏览器', link: '/docs/browser/android'},
          {text:'团队管理', link: '/docs/teammanage'}
        ]
       }
    ],
  },
});
