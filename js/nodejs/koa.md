# Koa

## 1. 安装

```npm
npm install koa
```

## 2. 简单Koa服务

```js
import Koa from "koa";
const app = new Koa();

//中间件
app.use(async (ctx) => {
  ctx.body = "Hellow Koa!";
});
//启动服务
app.listen("7000", () => {
  console.log("koa server start:http://localhost:7000");
});
```

## 3. 核心概念

### 3.1 上下文(Context)

koa 封装了Node.js 的req和res ,提供统一的ctx对象，常用方法属性：

| 属性/方法         | 说明                   | 等价Node.js写法       |
| :---------------- | :--------------------- | :-------------------- |
| ctx.request.url   | 获取请求URL            | req.url               |
| ctx.response.body | 设置响应体             | res.end()\res.write() |
| ctx.status        | 设置响应状态码         | res.statusCode        |
| ctx.method        | 获取请求方法(GET/POST) | req.method            |
| ctx.headers       | 获取请求头             | req.headers           |
| ctx.cookies       | 操作Cookie(读/写)      | 需要手动解析          |

```js
import Koa from "koa";
const app = new Koa();

//中间件
app.use(async (ctx) => {
  console.log("请求完整URL", ctx.request.href);
  console.log("请求URL", ctx.request.url);
  console.log("请求方法", ctx.method);
  console.log("请求头", ctx.headers["user-agent"]);
  //设置响应体
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: "成果",
    data: "Hello Koa 这里是上下文",
  };
});

//启动服务
app.listen("7000", () => {
  console.log("koa server start:http://localhost:7000");
});
```

### 3.2 中间件（洋葱模型）

Koa中间是一个async函数，接收ctx和next参数：

- ctx: 上下文对象；
- next():执行下一个中间件（必须调用，否则后续中间件不执行）

**洋葱模型原理：**中间件从外到内执行，再从内到外返回，类型洋葱层层包裹

```js
import Koa from "koa";
const app = new Koa();

//第1个中间件
app.use(async (ctx, next) => {
  console.log("第1个中间件开始");
  await next();
  ctx.body += `|中间1处理`;
  console.log("第1个中间件结束");
});

//第2个中间件
app.use(async (ctx, next) => {
  console.log("第2个中间件开始");
  await next();
  ctx.body += `|中间2处理`;
  console.log("第2个中间件结束");
});

app.use(async (ctx) => {
  console.log("第3个中间件开始");
  ctx.body = `中间3处理`;
  console.log("第3个中间件结束");
});

//启动服务
app.listen("7000", () => {
  console.log("koa server start:http://localhost:7000");
});
```

- 输出

```
第1个中间件开始
第2个中间件开始
第3个中间件开始
第3个中间件结束
第2个中间件结束
第1个中间件结束
```

### 3.3 常用中间件

| 中间件           | 功能                      | 安装命令                     |
| :--------------- | :------------------------ | :--------------------------- |
| `koa-router`     | 路由管理                  | `npm install koa-router`     |
| `koa-bodyparser` | 解析POST请求体(JSON/表单) | `npm install koa-bodyparser` |
| `koa-static`     | 静态文件服务（如图片/JS） | `npm install koa-static`     |
| `koa-cors`       | 跨域处理                  | `npm install koa-cors`       |

#### 3.3.1 路由管理

```js
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

//配置body解析
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"],
    jsonLimit: "1mb",
    formLimit: "1mb",
  }),
);

//定义路由
router.get("/", async (ctx) => {
  ctx.body = "首页";
});

router.get("/user/:id", async (ctx) => {
  const id = ctx.params.id;
  ctx.body = `用户ID:${id}`;
});

router.post("/login", async (ctx) => {
  console.log(ctx.request);

  const { username, password } = ctx.request.body;
  ctx.body = { username, password };
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

//启动服务
app.listen("7000", () => {
  console.log("koa server start:http://localhost:7000");
});
```

#### 3.3.2 静态资源

```js
import Koa from "koa";
import koaStatic from "koa-static";
import path from "path";

const app = new Koa();

const publicPath = path.resolve(process.cwd(), "public");

//托管public目录下静态文件
app.use(koaStatic(publicPath));

//启动服务
app.listen("7000", () => {
  console.log("koa server start:http://localhost:7000");
});
```

#### 3.3.4 错误处理

```js
import Koa from "koa";

const app = new Koa();

//全局错误捕获

app.on("error", (err, ctx) => {
  console.log("全局错误", err.message);
  ctx.status = err.status || 500;
  ctx.body = {
    code: -1,
    message: err.message || "服务器内部错误",
  };
});

//中间件手动捕获

app.use(async (ctx) => {
  if (ctx.query.id === "0") {
    const err = new Error("id 不能为0");
    err.status = 400;
    throw err;
  }
  ctx.body = "正常响应";
});

//try catch 捕获
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = `捕获错误：${err.message}`;
  }
});

app.use(async (ctx) => {
  throw Error("测试错误");
});

//启动服务
app.listen("7000", () => {
  console.log("koa server start:http://localhost:7000");
});
```

## 4. Koa 操作mysql数据库

### 4.1 安装mysql2库

```npm
npm install mysql2
```

- 可选，安装环境变量包，安装路由控制包

```npm
npm install dotenv koa-router
```

### 4.2 配置mysql连接信息

#### 4.2.1 创建.env 存储连接信息

```env
# .env 文件

MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USER = root
MYSQL_PASSWORD = 123456
MYSQL_DATABASE = koa_db
```

#### 4.2.2 创建mysql连接池

推荐使用连接池（而非单连接），提升性能，避免频繁创建/销毁连接,创建db/index.js文件：

```js
// db/index.js

import mysql from "mysql2/promise";
import "dotenv/config"; // 👈 更简洁写法 // 加载环境变量

//创建连接池

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true, //连接不足时等待
  connectionLimit: 10, //最大连接数
  queueLimit: 0, //等待队列无限制
});

//测试连接

const testConnection = async () => {
  try {
    const [rows] = await pool.execute("SELECT 1 + 1 AS result");
    console.log("mysql 连接成果", rows[0].result);
  } catch (err) {
    console.error("mysql 连接失败", err.message);
  }
};

testConnection();

//导出连接池

export { testConnection };
```

### 4.3 Koa 中执行mysql的基础操作

```js
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import pool from "./db/index.js";

const app = new Koa();
const router = new Router();

//配置body解析
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"],
    jsonLimit: "1mb",
    formLimit: "1mb",
  }),
);

//1.查询数据
router.get("/user", async (ctx) => {
  try {
    //执行查询（防止sql注入，使用？占位符）
    let [row] = await pool.execute("select * from user where id = ?", [
      ctx.request.query.id || 1,
    ]);
    if (row) {
      row = row[0];
    }
    ctx.body = {
      code: 200,
      data: row,
      msg: "查询成功",
    };
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: "查询失败" + err.message,
    };
  }
});

// 新增数据
router.post("/user/add", async (ctx) => {
  const { id, name } = ctx.request.body;
  if (id && name) {
    try {
      const [result] = await pool.execute(
        "insert into user (id,name) values (?,?) ",
        [id, name],
      );
      ctx.body = {
        code: 200,
        data: result,
        msg: "添加成功",
      };
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: "添加失败" + err.message,
      };
    }
  } else {
    ctx.body = {
      code: 500,
      msg: "参数错误",
    };
  }
});

//更新数据
router.post("/user/update", async (ctx) => {
  const { id, name } = ctx.request.body;
  if (!id || !name) {
    ctx.body = {
      code: 500,
      msg: "参数错误",
    };
  } else {
    try {
      const result = await pool.execute(
        "update user set name = ? where id = ?",
        [name, id],
      );
      ctx.body = {
        code: 200,
        data: result,
        msg: "更新成功",
      };
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: "更新失败" + err.message,
      };
    }
  }
});

//删除数据
router.post("/user/delete", async (ctx) => {
  const { id } = ctx.request.body;
  if (!id) {
    ctx.body = {
      code: 500,
      msg: "参数错误",
    };
  } else {
    try {
      const [result] = await pool.execute("delete from user where id = ?", [
        id,
      ]);
      ctx.body = {
        code: 200,
        data: result,
        msg: "删除成功",
      };
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: "删除失败" + err.message,
      };
    }
  }
});

app.use(router.routes()).use(router.allowedMethods);

//启动服务
app.listen("7000", () => {
  console.log("koa server start:http://localhost:7000");
});
```

### 4.4 封装通用CRUD 方法（提升复用性）

```js
//db/crud.js

import pool from "./index.js";

/**
 * 通用查询方法
 * @param {string} sql
 * @param {array} params
 * @returns {Promise<array>}
 */
export const query = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return {
      success: true,
      data: rows,
    };
  } catch (err) {
    console.error("查询异常", err);
    return { success: false, msg: err.message };
  }
};

/**
 * 通用新增方法
 * @param {string} table
 * @param {object} data
 * @returns {Promise<array>}
 */
export const add = async (table, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => "?").join(",");
  const sql = `insert into ${table} (${keys.join(",")}) values (${placeholders})`;

  try {
    const [result] = await pool.execute(sql, values);
    return {
      success: true,
      insertId: result.insertId,
    };
  } catch (err) {
    console.error("新增异常", err);
    return {
      success: false,
      msg: err.message,
    };
  }
};

/**
 * 通用更新方法
 * @param {string} table
 * @param {object} data
 * @param {object} where
 * @returns  {Promise<array>}
 */
export const update = async (table, data, where) => {
  const setStr = Object.keys(data)
    .map((key) => `${key}=?`)
    .join(",");
  const whereStr = Object.keys(where)
    .map((key) => `${key}=?`)
    .join(",");
  const params = [...Object.values(data), ...Object.values(where)];
  const sql = `update ${table} set ${setStr} where ${whereStr}`;

  try {
    const [result] = await pool.execute(sql, params);
    return {
      success: true,
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    console.error("更新异常", err);
    return {
      success: false,
      msg: err.message,
    };
  }
};

/**
 * 通用删除方法
 * @param {string} table
 * @param {object} where
 * @returns  {Promise<array>}
 */
export const del = async (table, where) => {
  const whereStr = Object.keys(where)
    .map((key) => `${key}=?`)
    .join(",");
  const params = [...Object.values(where)];
  const sql = `delete from ${table} where ${whereStr}`;

  try {
    const [result] = await pool.execute(sql, params);
    return {
      success: true,
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    console.error("删除异常", err);
    return {
      success: false,
      msg: err.message,
    };
  }
};
```

## 5. 服务热加载

### 5.1 安装依赖包

```npm
npm install nodemon
```

### 5.2 修改package.json指令

```json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
```

## 6. 模块化路由

### 6.1 安装依赖

```npm
npm install @koa/router
```

```npm
npm install koa-router koa-bodyparser
```

### 6.2 基础使用

```js
//routers/user.js

import Router from "@koa/router";
import * as userController from "../controller/user.js";

const router = new Router({ prefix: "/user" });

router.post("/getUserById", userController.getUserById);
export default router;
```

```js
//routers/index.js
import Router from "@koa/router";
import userRouter from "./user.js";

const router = new Router();

router.get("/", (ctx) => {
  ctx.body = { ok: true, service: "node-koa" };
});

router.use(userRouter.routes(), userRouter.allowedMethods());

export default router;
```

```js
//app.js
import path from "path";
import { fileURLToPath } from "url";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import { port } from "./config/index.js";
import { errorHandler } from "./middleware/error.js";
import apiRouter from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = new Koa();

app.use(errorHandler());
app.use(bodyParser());
app.use(serve(path.join(__dirname, "public")));
app.use(apiRouter.routes(), apiRouter.allowedMethods());

app.on("error", (err, ctx) => {
  if (ctx?.status === 404) return;
  console.error("server error", err);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

## 7. 项目分层

route → controller → service → db

```bash
project/
├── app.js
├── routes/
│   ├── index.js
│   ├── user.js
│   └── article.js
├── controller/
│   ├── user.js
│   └── article.js
├── service/
│   ├── user.js
│   └── article.js
├── db/
│   ├── index.js
│   └── user.js
```

### 7.1 app.js

```js
//app.js

//app.js

import path from "path";
import { fileURLToPath } from "url";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import { errorHandler } from "./middleware/error.js";
import apiRouter from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = new Koa();

app.use(errorHandler());
app.use(bodyParser());
app.use(serve(path.join(__dirname, "public")));
app.use(apiRouter.routes(), apiRouter.allowedMethods());

app.on("error", (err, ctx) => {
  if (ctx?.status === 404) return;
  console.error("server error", err);
});

app.listen(7001, () => {
  console.log(`http://localhost:7001`);
});
```

### 7.2 controller

```js
//controller/user.js

import * as userServices from "../services/user.js";

export const getUserById = async (ctx) => {
  try {
    const { id } = ctx.request.body;
    const user = await userServices.getUserById(id);
    ctx.body = {
      code: 200,
      data: user,
    };
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: err.message,
    };
  }
};
```

### 7.3 services

```js
//services/user.js

import * as userDb from "../db/user";
export const getUserById = async (id) => {
  const user = await userDb.getUserById(id);
  return user;
};
```

### 7.4 db

```js
//db/user.js

import { query, add, update, del } from "./crud.js";

export const getUserById = async (id) => {
  const sql = `select * from user where id = ?`;
  const res = await query(sql, [id]);
  if (!res.success) {
    throw new Error("用户不存在");
  }
  const user = res.data[0];
  return user;
};
```
