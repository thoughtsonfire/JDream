# webpack

## 创建无框架项目(手动)

1. 创建一个新的项目目录，并使用 npm 初始化一个新的 Node.js 项目：
   
```bash
mkdir my-webpack-project
cd my-webpack-project
npm init -y
```

2. 安装 Webpack 和 Webpack CLI

```bash
npm install --save-dev webpack webpack-cli
```

3. 在本地安装 lodash 以在 index.js 中打包它

```bash
npm install --save lodash
```

4. 安装开发和构建工具
根据你的需求，你可能还需要安装其他工具。以下是一些常见的工具：
- Babel（用于转译 ES6+ 代码到浏览器兼容的代码）
- webpack-dev-server（用于开发时自动刷新浏览器）
- style-loader 和 css-loader（用于加载和打包 CSS 文件）

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env webpack-dev-server style-loader css-loader
```

- webpack-merge 是一个用于合并多个 Webpack 配置文件的工具，特别适用于当你需要在不同环境（如开发环境和生产环境）中使用不同配置时。
在 Webpack 项目中，通常会有多个配置文件，比如：
 - webpack.common.js：包含所有环境都通用的配置。
 - webpack.dev.js：包含开发环境的特有配置。
 - webpack.prod.js：包含生产环境的特有配置。
这些配置文件可以通过 webpack-merge 进行合并，这样你就不需要手动在每个配置中复制粘贴通用的设置，也可以根据环境需要灵活地修改配置。
安装 webpack-merge：

```bash
npm install --save-dev webpack-merge
```

使用 webpack-merge：
 - webpack.common.js（公共配置）
   ```js
    // webpack.common.js
   const path = require('path');
   
   module.exports = {
     entry: './src/index.ts', // 入口文件
     output: {
       filename: 'index.js',   // 使用动态名称（如：chunk名称 + contenthash）
       path: path.resolve(__dirname, 'dist'), // 输出路径
       libraryTarget: 'umd',//libraryTarget: 'umd' 使得你的库能够兼容浏览器、Node.js 和 AMD 等多种模块加载系统
       clean: true, // 自动清理 dist 文件夹
       publicPath: '/', // 确保访问时使用正确的根路径
     },
     module: {
       rules: [
         {
           test: /\.ts$/, // 匹配所有 .ts 文件
           use: 'ts-loader', // 使用 ts-loader 处理 TypeScript 文件
           exclude: /node_modules/, // 排除 node_modules 目录
         },
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: 'babel-loader', // 使用 Babel 转换 JavaScript
         },
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'], // 处理 CSS 文件
         },
         {
           test: /\.(png|jpg|gif|svg)$/,
           use: ['file-loader'], // 处理图片文件
         },
       ],
     },
     resolve: {
       extensions: ['.js', '.json', '.css','.ts'], // 默认解析文件扩展名
     },
     optimization: {
       splitChunks: false, // 禁用代码拆分
       // splitChunks: {
       //   chunks: 'all', // 自动拆分共享代码
         
       // },
     },
   };
   ```
 - webpack.dev.js（开发环境配置）
    ```js
    // webpack.prod.js
    const { merge } = require('webpack-merge');
    const commonConfig = require('./webpack.common');
    const TerserPlugin = require('terser-webpack-plugin'); // 用于压缩 JavaScript
    
    module.exports = merge(commonConfig, {
      mode: 'production', // 设置生产模式
      devtool: 'source-map', // 配置生产环境的源映射
      optimization: {
        minimize: true, // 启用最小化
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // 删除 console.log 语句
              },
            },
          }),
        ],
      },
    });
    ```
 - package.json 中定义不同的构建命令来运行开发或生产环境的构建：

    ```json
      {
        "scripts": {
          "dev": "webpack --config webpack.dev.js",
          "prod": "webpack --config webpack.prod.js"
        }
      }
    ```

- 安装ts  

  ```bash  
  npm install --save-dev typescript
  ```  

  ts-loader 是一个 Webpack 加载器，用于将 TypeScript 编译成 JavaScript。如果你正在使用 Webpack 来构建项目，并且希望集成 TypeScript，使用 ts-loader 是一个常见的做法。  


  ```bash
  npm install --save-dev ts-loader
  ```
- 根目录下创建tsconfig.json  

  ```json
   {
       "compilerOptions": {
         "module": "commonjs",
         "target": "es5",
         "moduleResolution": "node",
         "declaration": true,
         "declarationDir": "dist/types",
         "baseUrl": ".",
         "esModuleInterop": true
       },
       "include": [
         "src/**/*.ts"
       ]
     }
  ```  

- 创建public文件夹，下创建index.html  

  ```
  <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>ThreeGame</title>
   </head>
   <body>
       <!-- dist文件夹下路径,webpack中设置了publicPath: '/',所以直接/,运行dev时并不会实际写入dist,但内存中的虚拟文件系统（内存中存储的文件）提供文件，所以能找到 -->
       <script src="/index.js"></script>
   </body>
   </html>
  ```
