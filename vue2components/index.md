# vue2 组件库快速搭建

### 脚手架创建项目

```sh
vue create j-ui
```
- 图为最基础版，需要什么额外配置可自行添加

![](/public/imgs//vue2/1.png)
![](/public/imgs//vue2/2.png)
![](/public/imgs//vue2/3.png)
![](/public/imgs//vue2/4.png)
![](/public/imgs//vue2/5.png)

- 修改目录结构
![](/public/imgs//vue2/6.png)

###  修改`vue.config.js`文件配置：

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
        // 修改入口
        entry: 'examples/main.js',
        template: 'public/index.html',
        filename: 'index.html'
    }
},
chainWebpack: config => {
    config.module
        .rule('js')
        .include
        .add('/packages')
        .end()
        .use('babel')
        .loader('babel-loader')
        .tap(options => {
            return options
        })
}
})
```
### 修改 `package.json`文件配置

```json
"lib": "vue-cli-service build --target lib --name index --dest lib packages/index.js"
```

![](/public/imgs//vue2/7.png)

### 配置`packages`文件下的index.js，用于导出所有组件

![](/public/imgs//vue2/8.png)

```js
import hxButton from './hxButton/index'
// 存放组件的数组
const components = [
    hxButton
]

// 定义 install 方法，接收 Vue 作为参数。
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历 components 数组，来进行全局注册
    components.map(component => {
        Vue.component(component.name, component)
    })
}

export{
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    hxButton
}
export default {
    install
}
```
- packages 目录结构
![](/public/imgs/vue2/9.png)
![](/public/imgs/vue2/10.png)
### 配置组件下index.js，用于导出单个组件实现按需加载

```js
import hxButton from './src/index'

hxButton.install = function (Vue){
    Vue.component(hxButton.name, hxButton);
}

export default hxButton;
```
### 组件内容自行编写，这里只介绍快速搭建组件库

### 打包组件库
```sh
npm run lib
```
### 打包后引用
![](/public/imgs/vue2/11.png)
### 上传npm 
全局安装nrm(npm镜像源管理工具，有时国外资源太慢，使用这个可以快速地在npm源间切换)，npm install -g nrm，执行nrm ls命令查看可选的源，必选保证当前的源是npm源，如果是其他源，如cnpm淘宝源，必须改到npm源，否则不能上传到npm;
npm登录，在根目录下执行npm login命令，输入账号密码邮箱，进行登录；
npm发布，在根目录下执行npm publish。

### npm安装组件包后引用
``` js
import jdreamUI from 'jdream-ui';
import 'jdream-ui/lib/index.css';
```