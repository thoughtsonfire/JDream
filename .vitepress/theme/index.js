import 'virtual:group-icons.css' //代码组样式 //
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import { h } from 'vue'
import jdreamUI from 'jdream-ui'
import 'jdream-ui/lib/index.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import update from "./component/update.vue"
import ArticleMetadata from "./component/ArticleMetadata.vue"
import HomeUnderLine from './component/HomeUnderLine.vue'
import confetti from './component/confetti.vue'
import MyLayout from './component/MyLayout.vue'
import LinkCard from './component/LinkCard.vue'
import Live2D from './component/live2D/Live2D.vue'
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import { inBrowser } from 'vitepress'
export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    // Get frontmatter and route
    const { frontmatter } = useData();
    
        
    // giscus配置
    giscusTalk({
      repo: 'thoughtsonfire/JDream', //仓库
      repoId: 'R_kgDOMAsV9g', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOMAsV9s4CplMI', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

  },
  Layout:  () => {
    const props = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    // return h(DefaultTheme.Layout, props, {
    //   'layout-bottom': () => h(bsz), //不蒜子layout-bottom插槽
    //   'doc-footer-before': () => h(backtotop), // 返回顶部doc-footer-before插槽
    //   'layout-top': () => h(notice), // 公告layout-top插槽
    // })

    return h(MyLayout,props)
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(ElementPlus)
    app.use(jdreamUI)
    app.component('ArticleMetadata' , ArticleMetadata)
    app.component('HomeUnderLine' , HomeUnderLine)
    app.component('update' , update)
    app.component('confetti' , confetti)
    app.component('MyLayout' , MyLayout)
    app.component('LinkCard',LinkCard)
    app.component('Live2D',Live2D)
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
         NProgress.done() // 停止进度条
      }
    }
  },
}


