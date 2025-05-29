import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'; 
import taskLists from 'markdown-it-task-checkbox'
import nav  from './config/nav';
import sidebar from './config/sidebar';
export default defineConfig({
  base:"/JDream/",//github上部署
  // base:"/",//nginx 上部署
  head: [
    ['link', { rel: 'icon', href: '/JDream/favicon.ico' }],//github上部署
    // ['link', { rel: 'icon', href: '/favicon.ico' }],//nginx上部署
  ],
  title: "JDream",
  description: "A VitePress Site",
    //启用深色模式
  appearance: 'dark',
  themeConfig: {
    logo:'/study.png',
    outlineTitle:'目录',
    outline:[2,6],
    nav,

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/thoughtsonfire' }
    ],
    footer:{
      copyright:"Copyright © 2024-present JDREAM"
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
    },
    returnToTopLabel:'返回顶部',
  },
  optimizeDeps: {
    include: ['vue/dist/vue.esm.js'] // 引入 Vue 2 的 ESM 版本//可以不要了
  },
  markdown: {
    lineNumbers: true,
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    config: (md) => {
      // 启用 Mermaid 配置
      md.use(MermaidMarkdown); 

      md.use(groupIconMdPlugin) //代码组图标

      md.use(taskLists ) //todo

      md.use(vitepressDemoPlugin)  //代码demo

      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      }
    }
  },
  vite: {
    plugins: [
      MermaidPlugin(),
      groupIconVitePlugin() //代码组图标
    ],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },

})
