import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";	
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
      { text: 'JDream-plus使用文档', link: '/jdream-plus/' },
      { text: 'JDream-ui使用文档', link: 'https://thoughtsonfire.github.io/jdream-ui-ed/' },
      { text: '学习笔记', items:[
        {text:'uni-app',link:'/uni-app/'},
        {text:'java',link:'/java/'},
      ] },
      {text:'文档编写',items:[
        {text:'vitepress',link:'/vitepress/'},
        {text:'vuepress',link:'/vuepress/'},
        {text:'vue2组件库快速搭建',link:'/vue2components/'}
      ]}
    ],

    sidebar: {
      "/jdream-plus/":set_sidebar("/jdream-plus/"),
      "/java/":set_sidebar("/java/"),
      "/uni-app/":set_sidebar("/uni-app/"),
      "/vuepress/":set_sidebar("/vuepress/"),
      "/vitepress/":set_sidebar("/vitepress/"),
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
    },
  },
  optimizeDeps: {
    include: ['vue/dist/vue.esm.js'] // 引入 Vue 2 的 ESM 版本
  },
  markdown: {
    lineNumbers: true
  }
})
