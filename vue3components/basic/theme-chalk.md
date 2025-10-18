# 样式

```md
jdream-plus/
 └─ docs/
 └─ node_modules/
 └─ packages/
    └─ components/
    └─ theme-chalk/
        └─ src/
        |   └─ font/
        |   └─ mixins/
        |   |   └─ mixins.scss ->公共方法
        |   |   └─ config.scss ->命名规范BEM
        |   └─ index.scss ->导出
        └─ package.json
```


## 获取设置图标

1. 去iconfont 选择图标，添加到项目

2. 项目设置里设置 FontClass/Symbol 前缀 为`jd-icon`

3. 项目设置里设置 Font Family 为 `jd-ui-icons`

4. 字体格式 `WOFF2`、`WOFF`、`TTF`

5. 选择 Font class 下载到本地

6. 将`iconfont.woff2`、`iconfont.woff`、`iconfont.ttf`文件放到 font目录下

7. 将iconfont.css 文件内容粘贴到icon.scss 里边进行修改

```scss [icon.scss]
@use './mixins/mixins.scss' as *;

@font-face {
  font-family: "jd-ui-icons"; /* Project id 5034410 */
  src: url('./fonts/iconfont.woff2') format('woff2'),  //修改三个路径
       url('./fonts/iconfont.woff') format('woff'),
       url('./fonts/iconfont.ttf') format('truetype');
}

[class^='#{$namespace}-icon'],[class*='#{$namespace}-icon'] { 
  font-family: "jd-ui-icons" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.#{$namespace}-icon-phone-filled:before {
  content: "\ea7a";
}

//[class^='.#{$namespace}-icon'],[class*='.#{$namespace}-icon']  修改family 
//匹配 类名#{$namespace}-icon  相当于 
//.#{$namespace}-icon-phone-filled 图标名字前缀修改
```
8. index.scss下引入 icon.scss

```scss [index.scss] 
@use 'icon';
```

9. play目录下 的main.ts中引入

```ts main.ts
import {createApp} from 'vue'
import App from './App.vue'
import '@jdream-plus/theme-chalk/src/index.scss'
import JdIcon from '@jdream-plus/components/icon'
const app = createApp(App)

app.use(JdIcon)
app.mount('#app')
```

10. play 目录下App.vue 文件里使用

```vue [App.vue]
<template>
<jd-icon :size="12" color="red" class="jd-icon-close">hello word</jd-icon>
</template>
```

安装sass

```bash
pnpm install sass -D -w
```


