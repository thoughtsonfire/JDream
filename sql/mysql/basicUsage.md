# 基础使用

关系型数据库

## 登录 MySQL

```bash
mysql -u 用户名 -p
```

## 数据库操作

| 功能                 | 命令                        |
| -------------------- | --------------------------- |
| 查看所有数据库       | `SHOW DATABASES;`           |
| 创建数据库           | `CREATE DATABASE 数据库名;` |
| 删除数据库           | `DROP DATABASE 数据库名;`   |
| 使用数据库           | `USE 数据库名;`             |
| 查看当前使用的数据库 | `SELECT DATABASE();`        |

## 表操作

| 功能                   | 命令                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- |
| 查看当前数据库中所有表 | `SHOW TABLES;`                                                                         |
| 查看表结构             | `DESC 表名;` 或 `SHOW COLUMNS FROM 表名;`                                              |
| 创建表                 | `sql CREATE TABLE 表名 (id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(100),age INT);` |
| 删除表                 | `DROP TABLE 表名;`                                                                     |
| 修改表结构（加字段）   | `ALTER TABLE 表名 ADD 列名 数据类型;`                                                  |
| 修改字段类型           | `ALTER TABLE 表名 MODIFY 列名 新数据类型;`                                             |
| 删除字段               | `ALTER TABLE 表名 DROP 列名;`                                                          |
| 重命名表               | `RENAME TABLE 原表名 TO 新表名;`                                                       |

## 数据操作

| 功能         | 命令                                                 |
| ------------ | ---------------------------------------------------- |
| 插入数据     | `INSERT INTO 表名 (字段1, 字段2) VALUES (值1, 值2);` |
| 查询所有数据 | `SELECT * FROM 表名;`                                |
| 条件查询     | `SELECT * FROM 表名 WHERE 条件;`                     |
| 更新数据     | `UPDATE 表名 SET 字段=新值 WHERE 条件;`              |
| 删除数据     | `DELETE FROM 表名 WHERE 条件;`                       |
| 排序查询     | `SELECT * FROM 表名 ORDER BY 字段 ASC \| DESC;`      |
| 限制条数     | `SELECT * FROM 表名 LIMIT 10;`                       |

## 高级查询

| 功能     | 命令                                                     |
| -------- | -------------------------------------------------------- |
| 模糊匹配 | `SELECT * FROM 表名 WHERE 字段 LIKE '%值%';`             |
| 去重     | `SELECT DISTINCT 字段 FROM 表名;`                        |
| 统计总数 | `SELECT COUNT(*) FROM 表名;`                             |
| 分组统计 | `SELECT 字段, COUNT(*) FROM 表名 GROUP BY 字段;`         |
| 多条件   | `SELECT * FROM 表名 WHERE 条件1 AND/OR 条件2;`           |
| 联表查询 | `sql SELECT * FROM 表1 JOIN 表2 ON 表1.字段 = 表2.字段;` |

## 用户与权限（略基础）

| 功能     | 命令                                                   |
| -------- | ------------------------------------------------------ |
| 查看用户 | `SELECT user, host FROM mysql.user;`                   |
| 创建用户 | `CREATE USER '用户名'@'主机' IDENTIFIED BY '密码';`    |
| 授权     | `GRANT ALL PRIVILEGES ON 数据库.* TO '用户名'@'主机';` |
| 撤销权限 | `REVOKE 权限 ON 数据库.* FROM '用户名'@'主机';`        |
| 刷新权限 | `FLUSH PRIVILEGES;`                                    |

## 常见数据类型

| 类型                     | 说明                    |
| ------------------------ | ----------------------- |
| `INT`                    | 整数                    |
| `VARCHAR(n)`             | 字符串（最大 n 个字符） |
| `TEXT`                   | 长文本                  |
| `DATE`                   | 日期（YYYY-MM-DD）      |
| `DATETIME`               | 日期时间                |
| `DECIMAL(m,d)`           | 定点小数                |
| `FLOAT`, `DOUBLE`        | 浮点数                  |
| `BOOLEAN` / `TINYINT(1)` | 布尔值                  |

## 示例

```sql
-- 创建数据库
CREATE DATABASE test_db;

-- 使用数据库
USE test_db;

-- 创建表
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  age INT
);

-- 插入数据
INSERT INTO users (name, age) VALUES ('Tom', 20);

-- 查询数据
SELECT * FROM users WHERE age > 18;

```
