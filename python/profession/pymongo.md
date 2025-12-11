# pymongo

## 安装

```bash
pip install pymongo
```

## 连接数据库

```py
from pymongo import MongoClient

# 本地连接
client = MongoClient("mongodb://localhost:27017")

# 或远程带账号密码
# client = MongoClient("mongodb://admin:123456@192.168.19.255:27017")

# 选择数据库
db = client["my_test_db"]

# 选择集合（表）
collection = db["users"]
```

## 插入数据

```py
# 插入一条文档
collection.insert_one({"name": "Alice", "age": 25})

# 插入多条文档
collection.insert_many([
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 28}
])
```

## 查询数据

```py
# 查询所有
for doc in collection.find():
    print(doc)

# 按条件查询
user = collection.find_one({"name": "Alice"})
print(user)

# 查询年龄大于 26 的所有人
for doc in collection.find({"age": {"$gt": 26}}):
    print(doc)

```

- find(filter)：返回一个游标（Cursor），可迭代。

- 条件操作符：

  - $gt：大于

  - $lt：小于

  - $gte：大于等于

  - $lte：小于等于

  - $ne：不等于

  - $in：在某些值里

  - $regex: 正则匹配

例：`{"age": {"$gt": 26, "$lt": 35}}` → 年龄大于 26 且小于 35。

## 更新数据

```py
# 更新一条
collection.update_one(
    {"name": "Alice"},
    {"$set": {"age": 26}}
)

# 更新多条
collection.update_many(
    {"age": {"$lt": 28}},
    {"$inc": {"age": 1}}  # 年龄 +1
)
```

- update_one(filter, update)：更新匹配的第一条文档。

- $set：修改指定字段，如果字段不存在会新增。

- update_many(filter, update, upsert=False)

  - upsert

  - 默认 False → 如果没有匹配文档，不会插入新文档

  - 如果 True → 没匹配到会新建一个文档（根据 update 的内容生成）

- 还有：

  - $inc：增减字段数值

  - $unset：删除字段

  - $rename：重命名字段

## 删除数据

```py
# 删除一条
collection.delete_one({"name": "Bob"})

# 删除多条
collection.delete_many({"age": {"$lt": 25}})
```

- delete_one(filter)：删除符合条件的第一条。

- delete_many(filter)：删除所有符合条件的文档。

## 统计与聚合

```py
# 统计数量
count = collection.count_documents({})
print("总记录数:", count)

# 简单聚合
pipeline = [
    {"$group": {"_id": None, "平均年龄": {"$avg": "$age"}}}
]
result = list(collection.aggregate(pipeline))
print(result)
```

- $group：聚合分组

- \_id: None → 不分组，全部聚合

- $avg: "$age" → 求字段 age 的平均值

- aggregate(pipeline) → 聚合操作，pipeline 是一个阶段列表，每个阶段都是字典

## 排序、分页

```py
# 排序 age 从大到小
for doc in collection.find().sort("age", -1):
    print(doc)

# 分页：跳过前 2 条，取 3 条
for doc in collection.find().skip(2).limit(3):
    print(doc)
```

- sort(field, 1) → 升序

- sort(field, -1) → 降序

- skip(n) → 跳过前 n 条

- limit(n) → 最多取 n 条

## 关闭连接（可选）

```py
client.close()
```

## 完整示例脚本

```py
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["my_test_db"]
collection = db["users"]

# 插入数据
collection.insert_one({"name": "Jack", "age": 22})

# 查询数据
for user in collection.find():
    print(user)

client.close()
```

## 封装成类

```py
from pymongo import MongoClient
from config import CLIENT_PATH,DB_NAME
import time
class MongoDB:
    def __init__(self, uri=CLIENT_PATH, db_name=DB_NAME):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.products = self.db["products"]


    def save_record(self, data):
        """
        data 包括：
                'sku':sku,
                'goods_name': goods_name,
                'goods_url':goods_url,
                'goods_price': goods_price,
                'goods_img': goods_img,
                'shop_name' : shop_name,
                'shop_url' : shop_url,
        """

        base_info = {
            "goods_name": data["goods_name"],
            "goods_url": data["goods_url"],
            "goods_img": data["goods_img"],
            "shop_name": data["shop_name"],
            "shop_url": data["shop_url"],
        }

        price_record = {
            "goods_price": data["goods_price"],
            "time": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        self.products.update_one(
            {"sku": data["sku"]},
            {
                # 更新商品基础信息（不重复）
                "$set": base_info,
                # 往价格数组添加一条
                "$push": {"history_prices": price_record}
            },
            upsert=True
        )

    def get_all(self):
        product_list = list(self.products.find())
        return product_list
```
