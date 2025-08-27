# 快速上手  

此章节为快速上手流程，具体api请看其他章节

## 基础环境  

- 安装好node

- 配置好node  


## 新建项目  

```bash
    mkdir auto-scrape
    cd batch-rename
    npm init -y
```

## 安装依赖包  

- 安装`exceljs`  

```bash
npm install  exceljs
```

- 安装`puppeteer `

```bash
npm install  puppeteer
```

报错 Puppeteer 在安装时下载 Chromium 失败  

- 跳过下载Chromium
 
```bash
set PUPPETEER_SKIP_DOWNLOAD=true
npm install puppeteer
```
- 手动下载浏览器，也可以不下载使用本地的浏览器，下载是为了打包成exe后不依赖客户电脑浏览器，根据Puppeteer的版本选择

[Chromium 浏览器快照索引](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html)

下载后解压放到这个路径下  

```md
auto-scrape/
 ├─ node_modules/
 │   └─ puppeteer/
 │       └─ .local-chromium/
 │           └─ win64-139.0.7258.138/
 │               └─ chrome-win/
 │                   └─ chrome.exe
 └─ package.json

```

## 编写脚本

- 新建一个script文件夹用来放脚本

```bash
mkdir script
```

- 在script文件夹新建`auto-scrape.js` 开始编写脚本，目录结构如下  

```md
auto-scrape/
 ├─ script/
 │   └─ auto-scrape.js
 ├─ node_modules/
 │   └─ puppeteer/
 │       └─ .local-chromium/
 │           └─ win64-139.0.7258.138/
 │               └─ chrome-win/
 │                   └─ chrome.exe
 └─ package.json

```

- 该脚本爬取的网站是转为爬虫练习者使用的网站，是给国外网站，需要梯子 

```js [auto-scrape.js]
#!/usr/bin/env node

const path = require('path');
const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs');
const basePath = process.execPath.includes('node')
  ? path.join(__dirname, '..')       // 开发环境，回到项目根目录
  : path.dirname(process.execPath);  // 打包后 exe 所在目录

const chromePath = path.join(
  basePath,
  'node_modules',
  'puppeteer',
  '.local-chromium',
  'win64-139.0.7258.138',
  'chrome-win',
  'chrome.exe'
);
(async () => {
  const browser = await puppeteer.launch({
    //   executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // 改成你本机 Chrome 路径
    executablePath: chromePath, 
    headless: false
  }); // 可见浏览器，调试用
  const page = await browser.newPage();

  // 打开登录页
  await page.goto('https://quotes.toscrape.com/login',{ 
  timeout: 6000000,           // 不限制时间
  waitUntil: 'networkidle2'  // 等待网络空闲
  });

  // 输入账号密码（示例站点随便输入都行）
  await page.type('input[name="username"]', 'testuser', { delay: 50 });
  await page.type('input[name="password"]', '123456', { delay: 50 });
  await page.click('input[type="submit"]');
  await page.waitForNavigation();

  console.log('登录成功');

  // 抓取多页内容
  const allQuotes = [];
  let pageNum = 1;

  while (pageNum <= 3) {  // 爬取前 3 页
    const quotes = await page.$$eval('.quote', nodes => {
      return nodes.map(node => ({
        text: node.querySelector('.text').innerText,
        author: node.querySelector('.author').innerText
      }));
    });

    allQuotes.push(...quotes);
    console.log(`已抓取第 ${pageNum} 页`);

    const nextButton = await page.$('.next > a');
    if (nextButton) {
      await Promise.all([
        page.click('.next > a'),
        page.waitForNavigation()
      ]);
      pageNum++;
    } else {
      break;
    }
  }

  // 保存到 Excel
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Quotes');
  sheet.columns = [
    { header: 'Text', key: 'text', width: 60 },
    { header: 'Author', key: 'author', width: 30 }
  ];
  sheet.addRows(allQuotes);
  await workbook.xlsx.writeFile('quotes.xlsx');

  console.log('数据已保存到 quotes.xlsx');

  await browser.close();
})();

```

## 运行

- node运行js

```bash
node ./script/auto-scrape.js
```

可以看到控制台输出

```md
登录成功
已抓取第 1 页
已抓取第 2 页
已抓取第 3 页
数据已保存到 quotes.xlsx
```

- auto-scrape文件夹下生成了一个quotes.xlsx文件


## 打包

- 安装pkg

```bash
npm install -g pkg
```

```bash
pkg script/auto-scrape.js --targets node18-win-x64 --output auto-scrape.exe --assets "node_modules/puppeteer/.local-chromium/**/*"

```

- 打包完成后，会生成`auto-scrape.exe`程序，可直接运行。


::::details pkg基础用法

- 最简单的命令：

```bash
pkg index.js

```

- 指定目标平台：  

```bash
pkg index.js --targets node18-win-x64,node18-linux-x64,node18-macos-x64
```

- 指定输出文件名：  

```bash
pkg index.js --output myapp
```

::::

:::details 打包失败
- 打包失败，第一次打包pkg会下载二进制node到缓存，用于运行exe，网不行就会失败
- 我们可以提前帮它下好，这样就能直接打包了
- [https://github.com/vercel/pkg-fetch/releases/tag/v3.4](https://github.com/vercel/pkg-fetch/releases/tag/v3.4)
- 需要对应版本号的，pkg会验证，找到对应版号下载
- 如我这里下载`node-v14.20.0-win-x64`，将文件名更改`fetched-v14.20.0-win-x64`
- 我这里的缓存地址为`C:\Users\A\.pkg-cache\v3.4`,将`fetched-v14.20.0-win-x64`放进去就行
:::


## 配置package.json

```json [package.json]
{
  "name": "auto-scrape",
  "version": "1.0.0",
  "description": "自动爬取并导出 Excel",
  "main": "script/auto-scrape.js",
  "bin": "script/auto-scrape.js",
  "scripts": {
    "start": "node script/auto-scrape.js",
    "build": "pkg . --targets node18-win-x64 --output auto-scrape.exe"
  },
  "dependencies": {
    "exceljs": "^4.4.0",
    "puppeteer": "^24.17.0"
  },
  "pkg": {
    "assets": [
      "node_modules/puppeteer/.local-chromium/**/*"
    ]
  },
  "author": "你的名字",
  "license": "MIT"
}

```

- 此时就可以使用配置好的命令了

- 运行

```bash
npm run start
```

- 打包

```bash
npm run build
```


