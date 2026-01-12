import { set_sidebar } from "../utils/auto_sidebar.mjs";
const sidebar = {
  "/js/": [
    {
      text: "介绍",
      collapsed: false,
      items: [{ text: "前言", link: "/js/introduce/foreword.md" }],
    },
    {
      text: "基础知识",
      collapsed: false,
      items: [
        { text: "常见概念", link: "/js/basicKnowledge/commonConcepts.md" },
        { text: "对象方法", link: "/js/basicKnowledge/object.md" },
        { text: "字符串方法", link: "/js/basicKnowledge/string.md" },
        { text: "数组方法", link: "/js/basicKnowledge/array.md" },
        { text: "函数方法", link: "/js/basicKnowledge/function.md" },
        { text: "元素", link: "/js/basicKnowledge/element.md" },
        { text: "ES6", link: "/js/basicKnowledge/es6.md" },
        { text: "HTML5", link: "/js/basicKnowledge/html5.md" },
      ],
    },
    {
      text: "函数",
      collapsed: false,
      items: [
        { text: "this", link: "/js/function/this.md" },
        { text: "闭包", link: "/js/function/closure.md" },
        { text: "垃圾回收", link: "/js/function/GC.md" },
        { text: "arguments和...args", link: "/js/function/args.md" },
        { text: "防抖、节流", link: "/js/function/DebounceAndThrottle.md" },
        { text: "Promise", link: "/js/function/promise.md" },
      ],
    },
    {
      text: "通讯",
      collapsed: false,
      items: [
        { text: "WebSocket", link: "/js/communication/websocket.md" },
        { text: "postMessage", link: "/js/communication/postMessage.md" },
        {
          text: "BroadcastChannel",
          link: "/js/communication/broadcastChannel.md",
        },
      ],
    },
    {
      text: "常用封装",
      collapsed: false,
      items: [{ text: "axios封装", link: "/js/commonEncapsulation/axios.md" }],
    },
    {
      text: "实用方法",
      collapsed: false,
      items: [
        { text: "导出/下载", link: "/js/practicalMethod/export.md" },
        { text: "实用js", link: "/js/practicalMethod/practicalJs.md" },
        { text: "不切片上传进度条", link: "/js/practicalMethod/progress.md" },
      ],
    },
    {
      text: "简便JS包",
      collapsed: true,
      items: [
        { text: "纸屑", link: "/js/greatJs/confetti.md" },
        { text: "Lodash", link: "/js/greatJs/lodash.md" },
      ],
    },
    {
      text: "TS",
      collapsed: true,
      items: [
        { text: "常见情况", link: "/js/ts/commonSituations.md" },
        { text: "declare", link: "/js/ts/declare.md" },
      ],
    },
    {
      text: "NodeJs",
      collapsed: true,
      items: [{ text: "process", link: "/js/nodejs/process.md" }],
    },
  ],
  "/css": [
    {
      text: "介绍",
      collapsed: false,
      items: [{ text: "前言", link: "/css/introduce/foreword.md" }],
    },
    {
      text: "基础知识",
      collapsed: false,
      items: [
        { text: "常见概念", link: "/css/basicKnowledge/commonConcepts.md" },
        { text: "选择器", link: "/css/basicKnowledge/selector.md" },
        { text: "实用属性", link: "/css/basicKnowledge/practicalAttribute.md" },
      ],
    },
    {
      text: "布局",
      collapsed: false,
      items: [
        { text: "Flex", link: "/css/layout/flex.md" },
        { text: "Grid", link: "/css/layout/grid.md" },
      ],
    },
    {
      text: "Sass",
      collapsed: false,
      items: [
        { text: "运算符", link: "/css/sass/operator.md" },
        { text: "公共样式", link: "/css/sass/commonStyle.md" },
      ],
    },
  ],
  "/vue/": [
    {
      text: "随记",
      link: "/vue/index.md",
    },
    {
      text: "vue3",
      collapsed: false,
      items: [{ text: "自定义指令", link: "/vue/vue3/customDirectives.md" }],
    },
  ],
  "/sql": [
    {
      text: "mysql",
      collapsed: false,
      items: [{ text: "基础使用", link: "/sql/mysql/basicUsage.md" }],
    },
    {
      text: "mongo",
      collapsed: false,
      items: [{ text: "基础使用", link: "/sql/mongo/basic.md" }],
    },
  ],
  "/jdream-plus/": {
    text: "jdream-plus",
    items: [
      { text: "jdream-plus", link: "/jdream-plus/" },
      { text: "button", link: "/jdream-plus/button" },
    ],
  },
  "/uni-app/": set_sidebar("/uni-app/"),
  "/vuepress/": {
    text: "vuepress",
    items: [
      { text: "vuepress", link: "/vuepress/" },
      { text: "vue2press快速上手", link: "/vuepress/vuepress2快速上手" },
      { text: "vuepress1注意事项", link: "/vuepress/vuepress1注意事项" },
      {
        text: "vuepress1组件展示插件",
        link: "/vuepress/vuepress1组件展示插件",
      },
      { text: "搜索", link: "/vuepress/搜索" },
      { text: "行号", link: "/vuepress/行号" },
      { text: "修改样式", link: "/vuepress/修改样式" },
    ],
  },
  "/vitepress/": {
    text: "vitepress",
    items: [
      { text: "vitepress", link: "/vitepress/" },
      { text: "快速上手", link: "/vitepress/快速上手" },
      { text: "搜索", link: "/vitepress/搜索" },
    ],
  },
  "/english/": set_sidebar("/english/"),
  //"/java/":set_sidebar("/java/"),//自动生成侧边栏，效果不佳
  "/java/": {
    text: "java",
    items: [
      { text: "java", link: "/java/" },
      { text: "常用cmd命令", link: "/java/常用cmd命令" },
      { text: "常用字符", link: "/java/常用字符" },
      { text: "jdk", link: "/java/jdk" },
      { text: "IDEA", link: "/java/IDEA" },
      { text: "数据类型", link: "/java/数据类型" },
      { text: "switch", link: "/java/switch" },
      { text: "常用方法", link: "/java/常用方法" },
      { text: "抽象类和接口", link: "/java/抽象类和接口" },
      { text: "easylive_study", link: "/java/easylive_study.md" },
      { text: "struct2项目", link: "/java/struct2.md" },
    ],
  },
  "/shortcut": [
    { text: "vscode", link: "/shortcut/vscode/index.md" },
    { text: "chorme", link: "/shortcut/chorme/index.md" },
    { text: "markdown", link: "/shortcut/markdown/index.md" },
    { text: "cmd", link: "/shortcut/cmd/index.md" },
    { text: "linux", link: "/shortcut/linux/index.md" },
  ],
  "/vpcdoc/": [
    {
      text: "介绍",
      collapsed: false,
      items: [{ text: "前言", link: "/vpcdoc/" }],
    },
    {
      text: "组件",
      collapsed: false,
      items: [{ text: "链接卡片", link: "/vpcdoc/linkCard.md" }],
    },
  ],
  "/script/": [
    {
      text: "开始",
      collapsed: false,
      items: [{ text: "快速上手", link: "/script/start.md" }],
    },
    {
      text: "基础",
      collapsed: false,
      items: [
        { text: "puppeteer", link: "/script/puppeteer.md" },
        { text: "promise并发", link: "/script/promiseConcurrency.md" },
      ],
    },
  ],
  "/python/": [
    {
      text: "基础",
      collapsed: true,
      items: [
        { text: "环境", link: "/python/basic/install.md" },
        { text: "基础语法", link: "/python/basic/instruction.md" },
        { text: "数据类型", link: "/python/basic/dataType.md" },
        { text: "python 数字", link: "/python/basic/number.md" },
        { text: "python casting", link: "/python/basic/casting.md" },
        { text: "python 字符串", link: "/python/basic/string.md" },
        { text: "yield 关键字", link: "/python/basic/yield.md" },
        { text: "文件处理", link: "/python/basic/fileHandling.md" },
        { text: "re库", link: "/python/basic/re.md" },
        { text: "os库", link: "/python/basic/os.md" },
        { text: "logging库", link: "/python/basic/logging.md" },
        { text: "subprocess库", link: "/python/basic/subprocess.md" },
      ],
    },
    {
      text: "进阶",
      collapsed: true,
      items: [
        { text: "xPath", link: "/python/profession/xPath.md" },
        { text: "pyquery", link: "/python/profession/pyquery.md" },
        { text: "requests库", link: "/python/profession/requests.md" },
        { text: "BeautifulSoup (bs4)库", link: "/python/profession/bs4.md" },
        { text: "协程", link: "/python/profession/coroutine.md" },
        { text: "aiohttp库", link: "/python/profession/aiohttp.md" },
        { text: "多线程", link: "/python/profession/threading.md" },
        { text: "多进程", link: "/python/profession/multiprocessing.md" },
        { text: "tkinter库", link: "/python/profession/tkinter.md" },
        { text: "selenium库", link: "/python/profession/selenium.md" },
        { text: "pyppeteer库", link: "/python/profession/pyppeteer.md" },
        { text: "execjs库", link: "/python/profession/execjs.md" },
        { text: "pymongo", link: "/python/profession/pymongo.md" },
        { text: "pandas", link: "/python/profession/pandas.md" },
        { text: "plotly", link: "/python/profession/plotly.md" },
        { text: "drissionpage", link: "/python/profession/drissionpage.md" },
      ],
    },
    {
      text: "积累",
      collapsed: true,
      items: [
        { text: "网络请求", link: "/python/accumulation/network-request.md" },
      ],
    },
  ],
  "/vue3components/": [
    {
      text: "搭建",
      collapsed: false,
      items: [
        { text: "环境", link: "/vue3components/basic/build.md" },
        { text: "样式", link: "/vue3components/basic/theme-chalk.md" },
        { text: "打包", link: "/vue3components/basic/pack.md" },
        { text: "注意事项", link: "/vue3components/basic/note.md" },
      ],
    },
    {
      text: "积累",
      collapsed: false,
      items: [
        { text: "随笔", link: "/vue3components/accumulate/jottings.md" },
        { text: "gulp", link: "/vue3components/accumulate/gulp.md" },
      ],
    },
  ],
};

export default sidebar;
