# 打包

打包使用gulp  

安装依赖

```bash
pnpm install gulp @types/gulp sucrase -w -D
```

- gulp 打包库

- @types/gulp 类型声明

- sucrase运行ts形式的gulp

## 配置打包文件

根目录 jdream-plus 下新建 build文件夹，下面新建gulpfile.ts 用于写打包指令

```md
jdream-plus/
 └─ build/
 |  └─ gulpfile.ts
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

```ts [gulpfile.ts]
import { series, parallel } from "gulp";

//打包方式，串行并行

export default series(
    async()=>console.log('打包')
) //将里边的代码依次执行
```

配置根目录下`package.json`

```json [package.json]
{
  "private": true,
  "scripts": {
    "dev": "pnpm -C play dev",
    "build": "gulp -f build/gulpfile.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4",
  "devDependencies": {
    "@types/gulp": "^4.0.17",
    "gulp": "^5.0.1",
    "sass": "^1.93.2",
    "sucrase": "^3.35.0",
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

- `gulp -f build/gulpfile.ts` 执行build下的gulpfile.ts 文件 ，sucrase直接帮忙执行了默认导出


结果  

```bash
> gulp -f build/gulpfile.ts

[22:25:13] Loaded external module: sucrase/register/ts
[22:25:13] Working directory changed to F:\20240426start\jdream-plus\build
[22:25:14] Using gulpfile F:\20240426start\jdream-plus\build\gulpfile.ts
[22:25:14] Starting 'default'...
[22:25:14] Starting '<anonymous>'...
打包
[22:25:14] Finished '<anonymous>' after 1.4 ms
[22:25:14] Finished 'default' after 3.57 ms
```

给任务添加名字  

```ts [gulpfile.ts]
import { series, parallel } from "gulp";
import type { TaskFunction } from "gulp";
//打包方式，串行并行


const withTaskName = (name:string,fn:TaskFunction)=>Object.assign(fn,{displayName:name})
export default series(
    withTaskName('提示',async()=>{console.log('提示')})
) //将里边的代码依次执行


//ts 类型检测series参数 是TaskFunction
//Gulp 里 TaskFunction 的定义大概是：
//type TaskFunction =
//  ((done: TaskFunctionCallback) => void)
//  | (() => void | Promise<void>);
```

结果  

```bash
> gulp -f build/gulpfile.ts

[23:04:39] Loaded external module: sucrase/register/ts
[23:04:39] Working directory changed to F:\20240426start\jdream-plus\build
[23:04:39] Using gulpfile F:\20240426start\jdream-plus\build\gulpfile.ts
[23:04:39] Starting 'default'...
[23:04:39] Starting '提示'...
提示
[23:04:39] Finished '提示' after 2.35 ms
[23:04:39] Finished 'default' after 4.9 ms
```

build 下新建utils文件夹，将gulp的公共方法放进去  




```md
jdream-plus/
 └─ build/
 |  └─ utils/
 |  |   └─ index.ts
 |  └─ gulpfile.ts
```

将withTaskName 提取进去

```ts [index.ts]
import type { TaskFunction } from "gulp";

export const withTaskName = (name:string,fn:TaskFunction)=>Object.assign(fn,{displayName:name})
```



## 使用node 的 child_process 

在utils 目录下新建paths.ts 文件用于维护路径

```ts [paths.ts]
import path from 'path'

export const projectRoot = path.resolve(__dirname,'../../')
```

封装run 方法执行命令

```ts [index.ts]
import type { TaskFunction } from "gulp";
import {spawn} from 'child_process'
import { projectRoot } from "./paths";

// 在 Gulp 里，每个任务函数可以带一个可选的 displayName 属性，这样在 CLI 输出的时候，就能看到自定义的名字，而不是 anonymous。
export const withTaskName = (name:string,fn:TaskFunction)=>Object.assign(fn,{displayName:name})  


export const run = async (command:string)=>{
    // rf -rf   
    return new Promise((resolve)=>{
        const [cmd,...args] = command.split(" ")  //第一个是命令，后边的是参数

        const app = spawn(cmd,args,{
            cwd:projectRoot,
            stdio:"inherit",    //直接将这个子进程的输出共享给父进程
            shell:true,        //默认情况下 linux 才支持rf -rf 开启shell，让可以在git bash中执行
        })
        app.on('close',resolve)  
        //spawn 是 Node.js 里的 child_process.spawn   
        // app.on(eventName, listener) → 给子进程绑定一个事件监听器
        // 'close' 事件 → 当子进程的 stdio 流关闭 时触发（通常意味着进程退出了）
        // 当子进程执行完毕、关闭时，调用 resolve()，让外层 Promise 完成。
    })
}

//  这里为什么要赢promise
// 了把 子进程的异步执行过程 包装成一个 await 可以等待的东西。
// 为啥要return呢，执行不就行了？
// 不 return：函数外部拿不到 Promise，await 不生效 → 命令还没执行完，程序就继续往下走了。 子进程的异步执行
```

1. 打包样式
2. 打包工具方法
3. 打包所有组件
4. 打包每个组件
5. 生成一个组件库
6. 发布组件


```ts
//执行packages 下面每个模块的打包命令  
//gulp 默认执行同目录下的gulpfile.ts
withTaskName('buildPackages',async()=>run('pnpm run --filter packages --parallel build')) 
```
packages 下的三个模块的package.json 配置打包命令

```json
"build": "gulp"
```

package.json同级目录下创建gulpfile.ts文件

## 安装相关依赖包

```bash
pnpm install gulp-sass @types/gulp-sass @types/sass @types/gulp-autoprefixer gulp-autoprefixer @types/gulp-clean-css gulp-clean-css sass -D -w
```
- `gulp-sass`  gulp打包sass 用的
- `@types/gulp-sass`  gulp-sass的类型
- `@types/sass` sass 的类型   (sass 自带类型的可以不装)
- `gulp-autoprefixer` 自动加浏览器前缀
- `@types/gulp-autoprefixer` 类型
- `gulp-clean-css` 压缩css
- `@types/gulp-clean-css` 类型
- `sass` sass

```ts [gulpfile.ts]
// series 串行 src 入口 dest 出口
import { series, src, dest } from "gulp"
import { projectRoot } from "../../build/utils/paths"
import path from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoPrefixer from "gulp-autoprefixer"
import cleanCss from 'gulp-clean-css'
function compile() {
    const sass = gulpSass(dartSass)
    return src(path.resolve(__dirname, './src/*.scss'))
        .pipe(sass.sync()) //把sass文件用gulpSass 处理
        .pipe(autoPrefixer())//自动添加前缀
        .pipe(cleanCss())//压缩css
        .pipe(dest('./dist/css'))//输出
}

function copyfont() {
    return src(path.resolve(__dirname, './src/fonts/**'))
        .pipe(dest('./dist/fonts'))
}

function copyfullstyle() {
    return src(path.resolve(__dirname, './dist/**'))
        .pipe(dest(path.resolve(projectRoot, './dist/theme-chalk')))
}
//默认执行 default
export default series(
    compile,
    copyfont,
    copyfullstyle
)
```


安装 依赖

```bash
pnpm install gulp-typescript -D -w
```

安装 rollup相关依赖

```bash
pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w
```

安装 fast-glob  快速匹配文件

```bash
pnpm install fast-glob -w -D
```

安装ts声明文件输出

```bash
pnpm install ts-morph -w -D
```

安装编译单文本文件

```bash
pnpm install @vue/compiler-sfc -w -D
```

```bash
pnpm install gulp-replace -w -D
```