# mongoDB 基本使用

非关系型数据库

## 基础概念

MongoDB 是 文档型数据库，存储的数据是 JSON / BSON 文档。
核心概念：

| 名称       | 对应 SQL | 说明                              |
| ---------- | -------- | --------------------------------- |
| Database   | 数据库   | 存放集合（表）的容器              |
| Collection | 表       | 存放文档                          |
| Document   | 行/记录  | 一个 JSON/BSON 对象               |
| Field      | 列       | 文档的字段                        |
| ObjectId   | 主键     | MongoDB 自动生成的 `_id` 唯一标识 |

## 登录

- 本地无认证：

```bash
mongosh
```

- 本地或远程带用户认证：

```bash
mongosh "mongodb://admin:123456@127.0.0.1:27017/?authSource=admin"
```

解释：

    - admin:123456 → 用户名和密码

    - 127.0.0.1:27017 → IP 和端口

    - authSource=admin → 指定认证数据库

## 创建、切换数据库

> [!NOTE] MongoDB 不会创建空数据库，只有插入集合或数据后才真正生成。

```bash
use my_test_db
```

- use 数据库名 → 切换到指定数据库，如果不存在，会在第一次写入时创建

## 创建集合（Collection / 表）

```bash
db.createCollection("users")
```

- db → 当前数据库

- "users" → 集合名

也可以直接插入文档，集合会自动创建：

```bash
db.users.insertOne({name:"Alice", age:25})
```

## CRUD 基本语法

### 插入数据（Insert）

```js
db.users.insertOne({ name: "Alice", age: 25 });
db.users.insertMany([
  { name: "Bob", age: 27 },
  { name: "Charlie", age: 30 },
]);
```

- `db.users` → 选择集合

- `insertOne()` → 插入单个文档

- `insertMany([])` → 批量插入

- MongoDB 会自动生成 `_id` 字段作为主键

### 查询数据（Find）

```js
db.users.find({ age: { $gt: 25 } });
db.users.findOne({ name: "Alice" });
```

- `find(filter)` → 返回匹配的所有文档，类似 `SQL SELECT * FROM users WHERE ...`

- `findOne(filter)` → 返回第一条匹配的文档

- 常用操作符：

| 操作符   | 作用       | 示例                             |
| -------- | ---------- | -------------------------------- |
| `$eq`    | 等于       | `{age: {$eq: 25}}`               |
| `$ne`    | 不等于     | `{age: {$ne: 25}}`               |
| `$gt`    | 大于       | `{age: {$gt: 25}}`               |
| `$gte`   | 大于等于   | `{age: {$gte: 25}}`              |
| `$lt`    | 小于       | `{age: {$lt: 25}}`               |
| `$lte`   | 小于等于   | `{age: {$lte: 25}}`              |
| `$in`    | 在集合中   | `{name: {$in: ["Alice","Bob"]}}` |
| `$nin`   | 不在集合中 | `{name: {$nin: ["Alice"]}}`      |
| `$regex` | 正则匹配   | `{name:{$regex:"^M.*"}}`         |

- 投影（显示或隐藏字段）：

```js
db.users.find({ age: { $gt: 25 } }, { name: 1, _id: 0 });
```

只显示 `name` 字段，不显示 `_id`

### 更新数据（Update）

更新单条（updateOne）

```js
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } });
```

- $set → 设置字段

- $inc → 自增/自减字段

- $unset → 删除字段

- $rename → 重命名字段

更新多条（updateMany）

```js
db.users.updateMany({ age: { $lt: 28 } }, { $inc: { age: 1 } });
```

- 批量修改匹配的文档

- 类似 `SQL UPDATE users SET age = age+1 WHERE age<28;`

### 删除数据（Delete）

```js
db.users.deleteOne({ name: "Bob" });
db.users.deleteMany({ age: { $lt: 25 } });
```

- `deleteOne()` → 删除第一条匹配的文档

- `deleteMany()` → 删除所有匹配的文档

## 聚合操作（Aggregation）

MongoDB 的聚合类似 SQL 的 GROUP BY、SUM、AVG。

```js
db.users.aggregate([
  { $match: { age: { $gte: 25 } } }, // 筛选条件
  { $group: { _id: null, avgAge: { $avg: "$age" } } }, // 聚合操作
  { $sort: { avgAge: -1 } }, // 排序
]);
```

- `$match` → 筛选文档（类似 WHERE）

- `$group` → 分组（类似 GROUP BY）

- `$avg` → 求平均值

- `$sum` → 求和

- `$sort` → 排序

- `$project` → 选择或计算输出字段

- `$limit` / `$skip` → 分页

## 索引（Index）

创建索引，加速查询：

```js
db.users.createIndex({ name: 1 }); // 1 升序，-1 降序
```

- 可以创建复合索引： `{name:1, age:-1}`

- 查看索引：

```js
db.users.getIndexes();
```

## 其他常用命令

| 命令                               | 作用                     |
| ---------------------------------- | ------------------------ |
| `show dbs`                         | 显示所有数据库           |
| `use my_test_db`                   | 切换数据库               |
| `show collections`                 | 显示当前数据库下所有集合 |
| `db.dropDatabase()`                | 删除数据库               |
| `db.collection.drop()`             | 删除集合                 |
| `db.collection.countDocuments({})` | 统计文档数量             |
| `db.collection.distinct("age")`    | 获取某字段去重值         |

## 小结

- **CRUD**：`insert`, `find`, `update`, `delete`

- **聚合**：`aggregate` + `pipeline`

- **条件操作符**：`$gt`, `$lt`, `$in`, `$ne` 等

- **更新操作符**：`$set`, `$inc`, `$unset`, `$rename`

- **索引**：提高查询性能
