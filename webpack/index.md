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
   const path = require('path');

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
          },
          ],
      },
    };
   ```
 - webpack.dev.js（开发环境配置）
   ```js
   const { merge } = require('webpack-merge');
    const common = require('./webpack.common.js');
    
    module.exports = merge(common, {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        contentBase: './dist',
      },
    });
   ```
 - webpack.prod.js（生产环境配置）
  ```js
  const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');
  
  module.exports = merge(common, {
    mode: 'production',
    optimization: {
      minimize: true,
    },
  });
  ```
 package.json 中定义不同的构建命令来运行开发或生产环境的构建：
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
