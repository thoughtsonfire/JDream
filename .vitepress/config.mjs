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
        {text:'sql',link:'/sql/'},
        {text:'vue',link:'/vue/'},
        {text:'html',link:'/html/'},
        {text:'css',link:'/css/'},
        {text:'js',link:'/js/'},
        {text:'ol',link:'/ol/'},
        {text:'three.js',link:'/three-js/'},
        {text:'vite',link:'/vite/'},
        {text:'webpack',link:'/webpack/'},
        {text:'antv_x6',link:'/antv_x6/'},
        {text:'svg',link:'/svg/'},
        {text:'blender',link:'/blender/'},
        {text:'english',link:'/english/'},
      ] },
      {text:'文档编写',items:[
        {text:'vitepress',link:'/vitepress/'},
        {text:'vuepress',link:'/vuepress/'},
        {text:'vue2组件库快速搭建',link:'/vue2components/'}
      ]}
    ],

    sidebar: 
    {
      "/jdream-plus/":{
        text:'jdream-plus',items:[
          {text:'jdream-plus',link:'/jdream-plus/'},
          {text:'button',link:'/jdream-plus/button'},
        ]
      },
      "/uni-app/":set_sidebar("/uni-app/"),
      "/vuepress/":{
        text:'vuepress',items:[
          {text:'vuepress',link:'/vuepress/'},
          {text:'vue2press快速上手',link:'/vuepress/vuepress2快速上手'},
          {text:'vuepress1注意事项',link:'/vuepress/vuepress1注意事项'},
          {text:'vuepress1组件展示插件',link:'/vuepress/vuepress1组件展示插件'},
          {text:'搜索',link:'/vuepress/搜索'},
          {text:'行号',link:'/vuepress/行号'},
          {text:'修改样式',link:'/vuepress/修改样式'},
        ]
        },
        "/vitepress/":{
          text:'vitepress',items:[
            {text:'vitepress',link:'/vitepress/'},
            {text:'快速上手',link:'/vitepress/快速上手'},
            {text:'搜索',link:'/vitepress/搜索'},
          ]
        },
        "/english/":set_sidebar("/english/"),
        //"/java/":set_sidebar("/java/"),//自动生成侧边栏，效果不佳
        "/java/":{
          text:'java',items:[
            {text:'java',link:'/java/'},
            {text:'常用cmd命令',link:'/java/常用cmd命令'},
            {text:'常用字符',link:'/java/常用字符'},
            {text:'jdk',link:'/java/jdk'},
            {text:'IDEA',link:'/java/IDEA'},
            {text:'数据类型',link:'/java/数据类型'},
            {text:'switch',link:'/java/switch'},
            {text:'常用方法',link:'/java/常用方法'},
            {text:'抽象类和接口',link:'/java/抽象类和接口'},
          ]
        }
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
    editLink: {
      pattern: 'https://github.com/thoughtsonfire/JDream/edit/master/:path',
      text: '在 GitHub 上编辑此页面',
    },
    lastUpdated: {
      text:'最后更新于'
    }
  },
  optimizeDeps: {
    include: ['vue/dist/vue.esm.js'] // 引入 Vue 2 的 ESM 版本//可以不要了
  },
  markdown: {
    lineNumbers: true
  }
})
