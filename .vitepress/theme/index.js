// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import jdreamUI from 'jdream-ui'
import 'jdream-ui/lib/index.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { useLive2d } from 'vitepress-theme-website'
import backtotop from "./component/backtotop.vue"
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  setup() {
    //看板娘 //
    // useLive2d()
    useLive2d({
      enable: true,
      model: {
        url: "https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/kesshouban/model.json"
      },
      display: {
        position: 'left',
        width: '135px',
        height: '300px',
        xOffset: '35px',
        yOffset: '5px'
      },
      mobile: {
        show: true
      },
      react: {
        opacity: 0.8
      }
    })

    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
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


