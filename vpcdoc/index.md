# vitepress 组件  



## 展示  
>[!TIP] 说明 
>vitepress 组件可以直接在md文件中使用，因此就不用展示插件了  

>[!TIP] 说明 
>vue组件说明文档中可以用 `vitepress`展示组件的插件 `vitepress-demo-plugin`

- 安装

:::code-group
```sh [pnpm]
pnpm add vitepress-demo-plugin -D
```

```sh [yarn]
yarn add vitepress-demo-plugin -D
```

```sh [npm]
npm install vitepress-demo-plugin -D
```
:::

- 配置 

```js [在 .vitepress/config.mjs 中添加如下代码以引入 vitepressDemoPlugin 插件：]
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'; // [!code ++]
import path from 'path';

export default defineConfig({
  // other configs...
  markdown: { 
    config(md) { 
      md.use(vitepressDemoPlugin); // [!code ++]
    }, 
  }, 
});
```

- 使用

```md
<demo vue="../demos/demo.vue" />
```

```md
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
/>
```

- 详细配置使用参考官方网站

<LinkCard url="https://vitepress-demo.fe-dev.cn/" title="官方演示页面" 
description="https://vitepress-demo.fe-dev.cn/" />  

<LinkCard url="https://github.com/zh-lx/vitepress-demo-plugin" title="GitHub 仓库" 
description="https://github.com/zh-lx/vitepress-demo-plugin" logo="/JDream/imgs/logo/github.png" />

<LinkCard url="https://www.npmjs.com/package/vitepress-demo-plugin" title="NPM 包页面" 
description="https://www.npmjs.com/package/vitepress-demo-plugin" logo="/JDream/imgs/logo/npm.png" />


