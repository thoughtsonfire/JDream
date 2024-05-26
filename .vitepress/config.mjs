import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: "JDream",
  description: "A VitePress Site",
  themeConfig: {
    logo:'/study.png',
    outline:[2,6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'JDream-ui使用文档', link: '/' },
      { text: '学习笔记', items:[
        {text:'uni-app',link:'/'},
        {text:'java',link:'/'}
      ] }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/thoughtsonfire' }
    ],
    footer:{
      copyright:"Copyright @ 2024-present My Name"
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },
})
