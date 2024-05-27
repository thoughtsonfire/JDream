import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";	// 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/JDream/",
  head: [['link', { rel: 'icon', href: '/JDream/favicon.ico' }]],
  title: "JDream",
  description: "A VitePress Site",
  themeConfig: {
    logo:'/study.png',
    outlineTitle:'目录',
    outline:[2,6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'JDream-ui使用文档', link: '/jdream-ui/' },
      { text: '学习笔记', items:[
        {text:'uni-app',link:'/uni-app/'},
        {text:'java',link:'/java/'},
        {text:'文档编写',items:[
          {text:'vitepress',link:'/vitepress/'},
          {text:'vuepress',link:'/vuepress/'}
        ]}
      ] }
    ],

    sidebar: {
      "/jdream-ui/":set_sidebar("/jdream-ui/"),
      "/java/":set_sidebar("/java/"),
      "/uni-app/":set_sidebar("/uni-app/"),
    },
    

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
  optimizeDeps: {
    include: ['vue/dist/vue.esm.js'] // 引入 Vue 2 的 ESM 版本
  }
})
