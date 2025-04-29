// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import jdreamUI from 'jdream-ui'
import 'jdream-ui/lib/index.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import { useLive2d } from 'vitepress-theme-website'
import backtotop from "./component/backtotop.vue"
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useData,useRoute } from 'vitepress';
// import giscusTalk from 'vitepress-plugin-comment-with-giscus';
/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  setup() {
    //看板娘 //
    // useLive2d()
    // useLive2d({
    //   enable: true,
    //   model: {
    //     url: "https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/kesshouban/model.json"
    //   },
    //   display: {
    //     position: 'left',
    //     width: '135px',
    //     height: '300px',
    //     xOffset: '35px',
    //     yOffset: '5px'
    //   },
    //   mobile: {
    //     show: true
    //   },
    //   react: {
    //     opacity: 0.8
    //   }
    // })
    

    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };

    // Get frontmatter and route
    // const { frontmatter } = useData();
    
        
    // giscus配置
    // giscusTalk({
    //   repo: 'thoughtsonfire/JDream', //仓库
    //   repoId: 'R_kgDOMAsV9g', //仓库ID
    //   category: 'General', // 讨论分类
    //   categoryId: 'DIC_kwDOMAsV9s4CplMI', //讨论分类ID
    //   mapping: 'pathname',
    //   inputPosition: 'bottom',
    //   lang: 'zh-CN',
    //   }, 
    //   {
    //     frontmatter, route
    //   },
    //   //默认值为true，表示已启用，此参数可以忽略；
    //   //如果为false，则表示未启用
    //   //您可以使用“comment:true”序言在页面上单独启用它
    //   true
    // );
    
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(backtotop), // 使用doc-footer-before插槽
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(ElementPlus)
    app.use(jdreamUI)
  },
}


