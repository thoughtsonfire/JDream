# 搭建

- 需要node环境  （目前我所使用的node v22.17.8）

- 项目用的pnpm包管理工具（目前我所使用的 pnpm 10.12.4）


## 创建文件夹


```bash
mkdir jdream-plus

cd jdream-plus
```

## 初始化包管理

```bash
pnpm init
```

```md
jdream-plus/
 └─package.json

```

1. 生成package.json文件

```json [package.json]
{
  "name": "jdream-plus",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4"
}

```

2. 修改package.json*   

- 删除 "name": "jdream-plus",   只发布组件不是发布整个项目

- 添加 "private": true

- 删除 "version": "1.0.0",     不需要项目版本，只需要后边组件库的版本

- 删除描述  "description": "",

- 删除入口  "main": "index.js",

- 修改 "license": "MIT",

```json [package.json]
{
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "packageManager": "pnpm@10.12.4"
}
```

## 配置`.npmrc`文件

新建`.npmrc` 文件

```npmrc [.npmrc]
shamefully-hoist = true
```

pnpm 默认是软链

使用pnpm必须要建立.npmrc文件，shamefully-hoist = true，否则安装的模块无法放置到node_modules目录下  

[pnpm官网](https://pnpm.io/zh/) 查看详细说明

```md
jdream-plus/
 └─ .nmprc
 └─ package.json
```

## 安装基础依赖

```bash
pnpm install vue typescript -D # 添加开发依赖
```

```md
jdream-plus/
 └─ node_modules/
 └─ .nmprc
 └─ package.json
 └─ pnpm-lock.yaml
```

## 生成配置 tsconfig.json

```bash
npx tsc --init
```

修改 tsconfig.json,直接把element-plus的搬过来

```json [tsconfig.json]
{
  "compilerOptions": {
    "module": "ESNext", // 打包模块类型ESNext
    "declaration": false, // 默认不要声明文件 
    "noImplicitAny": false, // 支持类型不标注可以默认any
    "removeComments": true, // 删除注释
    "moduleResolution": "node", // 按照node模块来解析
    "esModuleInterop": true, // 支持es6,commonjs模块
    "jsx": "preserve", // jsx 不转
    "noLib": false, // 不处理类库
    "target": "es6", // 遵循es6版本
    "sourceMap": true,
    "lib": [ // 编译时用的库
      "ESNext",
      "DOM"
    ],
    "allowSyntheticDefaultImports": true, // 允许没有导出的模块中导入
    "experimentalDecorators": true, // 装饰器语法
    "forceConsistentCasingInFileNames": true, // 强制区分大小写
    "resolveJsonModule": true, // 解析json模块
    "strict": true, // 是否启动严格模式
    "skipLibCheck": true // 跳过类库检测
  },
  "exclude": [ // 排除掉哪些类库
    "node_modules",
    "**/__tests__",
    "dist/**"
  ]
}
```

```md
jdream-plus/
 └─ node_modules/
 └─ .nmprc
 └─ package.json
 └─ pnpm-lock.yaml
 └─ tsconfig.json
```

## 搭建monorepo环境

- 在项目根目录下建立pnpm-workspace.yaml配置文件

```yaml [pnpm-workspace.yaml]
packages:
  - 'packages/**' # 存放编写组件的
  - docs # 存放文档的
  - play # 测试组件的
```
- 在项目根目录下建立`packages`文件夹用来存放组件

- 在项目根目录下建立`docs`文件夹用来存放组件说明文档

- 在项目根目录下建立`play`文件夹用来测试组件

```md
jdream-plus/
 └─ docs/
 └─ node_modules/
 └─ packages/
 └─ paly/
 └─ .nmprc
 └─ package.json
 └─ pnpm-lock.yaml
 └─ pnpm-workspace.yaml
 └─ tsconfig.json
```

### 子项目play

1. 初始化

```bash
cd play
pnpm init
```

```md
jdream-plus/
 └─ docs/
 └─ node_modules/
 └─ packages/
 └─ paly/
 |   └─ package.json
 └─ .nmprc
 └─ package.json
 └─ pnpm-lock.yaml
 └─ pnpm-workspace.yaml
 └─ tsconfig.json
```

2. 修改`play`子项下的`package.json`  

-  修改name 在jdream-plus下

- 删除main.js

- 添加私有"private": true,测试用的，不需要发布

```json [package.json]
{
  "name": "@jdream-plus/play", 
  "private": true,
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4"
}
```

3. play下安装测试用的依赖

```bash
pnpm install vite @vitejs/plugin-vue -D
```

4. 创建vite.config.ts 

- @vitejs/plugin-vue 帮助编译vue

```ts [vite.config.ts]
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins:[vue()]
})
```

- 如果import vue from '@vitejs/plugin-vue'报红，但不影响运行，可以查一下vite和vitejs/plugin-vue 适配的版本切换一下

5. 创建`index.html`、`main.ts`、`App.vue` 文件


```md
 └─ paly/
    └─ node_modules
    └─ App.vue
    └─ index.html
    └─ main.ts
    └─ package.json
    └─ vite.config.json
```
:::code-group
```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="/main.ts" type="module"></script>
</body>
</html>
```

```ts [main.ts]
import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')
```

```vue [App.vue]
<script setup>

</script>

<template>
测试
</template>

<style scoped>

</style>
```
:::

6. 配置package.json 运行命令

```json [package.json]
{
  "name": "@jdream-plus/play",
  "private": true,
  "description": "",
  "scripts": {
    "dev": "vite"  //[!code focus]
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4",
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1",
    "vite": "^7.1.7"
  }
}

```

7. 在play目录下运行

```bash
pnpm run dev
```
8. 修改jdream-plus 目录下运行play项目

修改 jdream-plus 目录下的`package.json` 文件

```json [package.json]
{
  "private": true,
  "scripts": {
    "dev": "pnpm -C play dev"  //[!code focus]
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4",
  "devDependencies": {
    "typescript": "^5.9.2",
    "vue": "^3.5.22"
  }
}

```


- `"dev": "pnpm -C play dev"` pnpm 运行 play项目下的dev指令 

`-C` 选项的意思是：  

👉 切换工作目录（Change directory）  

相当于告诉 pnpm：  
“在指定的目录里执行命令，而不是当前目录”。  

- 现在可以在根目录 jdream-plus 目录下运行命令 运行play项目了

```bash
pnpm run dev
```

### 组件packages

在packages目录下  

- 新建 components文件夹 存放组件

- 新建 theme-chalk文件夹 存放样式

- 新建 utils文件夹 存放组件公共的库

- 这三个都是模块都需要初始化

```md
jdream-plus/
 └─ docs/
 └─ node_modules/
 └─ packages/
 |  └─ components/
 |  └─ theme-chalk/
 |  └─ utils/
 └─ paly/
 └─ .nmprc
 └─ package.json
 └─ pnpm-lock.yaml
 └─ pnpm-workspace.yaml
 └─ tsconfig.json
```

1. components 

components 初始化  

```bash
pnpm init
```

修改 package.json  

```json [components/package.json]
{
  "name": "@jdream-plus/components",  //[!code focus]
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4"
}
```

2. theme-chalk

theme-chalk 初始化  

```bash
pnpm init
```

修改 package.json  

```json [theme-chalk/package.json]
{
  "name": "@jdream-plus/theme-chalk", //[!code focus]
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4"
}
```


3. utils

utils 初始化  

```bash
pnpm init
```

修改 package.json  

```json [utils/package.json]
{
  "name": "@jdream-plus/utils", //[!code focus]
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4"
}
```

> 将三个模块安装到根目录下

- 在jdream-plus目录下

```bash
pnpm i @jdream-plus/components -w
pnpm i @jdream-plus/utils -w
pnpm i @jdream-plus/theme-chalk -w
```

-w 是 pnpm 的 workspace（工作区）相关选项  

```bash
pnpm i <包名> -w
```

- -w / --workspace-root：把依赖安装到 整个工作区的根目录，而不是某个子包（子项目）。

> 将三个包安装到根目录下，查看根目录下package.json   
> 查看根目录下package.json ,会发现依赖进去了  
> 查看根目录下node_modules 里边可以发现软链  

```json [package.json]
{
  "private": true,
  "scripts": {
    "dev": "pnpm -C play dev"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4",
  "devDependencies": {
    "typescript": "^5.9.2",
    "vue": "^3.5.22"
  },
  "dependencies": {
    "@jdream-plus/components": "workspace:^",
    "@jdream-plus/theme-chalk": "workspace:^",
    "@jdream-plus/utils": "workspace:^"
  }
}

```

>[!NOTE] 报错
>可能-w 的时候去npm线上找了
>那就再`.npmrc` 文件里加上 `link-workspace-packages=true`
>以前项目没报这个错误，还有详细版本号，
>这次报错了，修改后 "@jdream-plus/components": "workspace:^",这里还没有详细版本号了，不过是本地依赖，软链到本地，不影响

## 简写第一个组件

在components文件夹下

```md
jdream-plus/
 └─ docs/
 └─ node_modules/
 └─ packages/
    └─ components/
       └─icon/
          └─ src
          |   └─ icon.ts
          |   └─ icon.vue
          └─ index.ts
```

:::code-groups
```ts [icon.ts]
//这里放置组件的props 以及公共方法

import type { ExtractPropTypes } from "vue";

export const iconProps = {
    size: {
        type: Number,
    },
    color: {
        type: String,
    }
}

export type IconProps = ExtractPropTypes<typeof iconProps>;
```

```vue [icon.vue]
<template>
    <i class="jd-icon" :style="style">
        <slot></slot>
    </i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { iconProps } from './icon'

export default defineComponent({
    name: 'jd-icon',
    props: iconProps,
    setup(props) {
        const style = computed(() => {
            if (!props.color && !props.size) {
                return {}
            }
            return {
                ...(props.size ? { 'fon-size': props.size + 'px' } : {}),
                ...(props.color ? { 'color': props.color } : {})
            }
        })
        return { style }
    }
})
</script>
```

```ts [index.ts]

// 后续把withInstall 提出来，还要写自动导入
import Icon from "./src/icon.vue";
import type { App,Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(comp:T)=>{
    (comp as SFCWithInstall<T>).install = function(app:App){
        app.component((comp as any).name,comp as SFCWithInstall<T>)
    }
    return comp as SFCWithInstall<T> 
}


const JdIcon = withInstall(Icon)

export {JdIcon}
export default JdIcon

// 在 Vue 3 里，app.use(xxx) 做的事情是：

// if (isFunction(xxx.install)) {
//   xxx.install(app, ...options)
// } else if (isFunction(xxx)) {
//   xxx(app, ...options)
// }


// 👉 所以 app.use() 要么接收一个函数，要么接收一个对象，这个对象必须有 install(app) 方法。

// install 方法在Plugin 类型上
```
:::

## 测试第一个组件

play 文件夹下的main.ts

```ts
import {createApp} from 'vue'
import App from './App.vue'
import JdIcon from '@jdream-plus/components/icon'
const app = createApp(App)

app.use(JdIcon)
app.mount('#app')
```

play 文件夹下的App.vue

```vue
<template>
<jd-icon :size="12" color="red">hello word</jd-icon>
</template>
```

根目录下  

```bash
pnpm run dev
```

可以看到红色斜体12px 的 `hello word`

