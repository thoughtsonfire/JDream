# logging 库

Python 的 logging 模块是做日志记录的核心工具，它是标准库自带的，不需要安装任何第三方包。

## 为什么要用 logging（而不是 print）

`print()` 只是简单地输出文本，不适合生产环境。

`logging` 则提供了更强大的功能：

    - 可以按级别（INFO、DEBUG、ERROR...）分类；

    - 可以输出到文件、控制台、网络、甚至邮箱；

    - 可以控制输出格式（带时间、模块名、行号等）；

    - 可以同时有多个输出目标；

    - 可以动态调整日志级别，而不用改代码。

## 日志系统的四个核心组件

| 组件          | 类名                | 作用                                          |
| ------------- | ------------------- | --------------------------------------------- |
| **Logger**    | `logging.Logger`    | 日志记录器，对外接口，调用 `logger.info()` 等 |
| **Handler**   | `logging.Handler`   | 负责输出日志到不同地方（控制台、文件等）      |
| **Formatter** | `logging.Formatter` | 定义日志内容的显示格式                        |
| **Filter**    | `logging.Filter`    | （可选）做细粒度的日志筛选                    |

它们的关系可以这样理解：

```nginx
Logger 产生日志 → Handler 决定输出到哪 → Formatter 决定输出样式
```

## 日志等级（Level）

| 级别名     | 数值 | 含义                       |
| ---------- | ---- | -------------------------- |
| `DEBUG`    | 10   | 调试信息，最详细           |
| `INFO`     | 20   | 正常运行时的关键信息       |
| `WARNING`  | 30   | 警告，不影响运行但值得注意 |
| `ERROR`    | 40   | 错误，功能不能正常执行     |
| `CRITICAL` | 50   | 致命错误，程序可能要终止   |

你可以设置全局或单个 Logger 的等级来过滤日志。

例如，等级设置为 INFO，则 DEBUG 日志不会输出。

## 最简单的用法

```py
import logging

logging.basicConfig(level=logging.INFO)
logging.info("程序开始运行")
logging.warning("警告：磁盘空间不足！")
logging.error("发生错误！")
```

basicConfig() 是简化配置的方法，一般用于脚本或小项目。

输出示例：

```py
INFO:root:程序开始运行
WARNING:root:警告：磁盘空间不足！
ERROR:root:发生错误！
```

## 常见配置参数

```py
logging.basicConfig(
    level=logging.INFO,                  # 日志级别
    format='%(asctime)s - %(levelname)s - %(message)s',  # 日志格式
    datefmt='%Y-%m-%d %H:%M:%S',         # 时间格式
    filename='app.log',                  # 输出到文件（不写则输出到控制台）
    filemode='a'                         # 写入模式：'a' 追加，'w' 覆盖
)
```

输出示例：

```py
2025-10-31 10:23:45 - INFO - 程序开始运行
```

## 自定义 Logger（多 Handler）

复杂项目中常常这样配置：

```py
import logging

# 1️⃣ 创建 logger
logger = logging.getLogger("myapp")
logger.setLevel(logging.DEBUG)

# 2️⃣ 创建 handler：控制台 + 文件
console_handler = logging.StreamHandler()
file_handler = logging.FileHandler("app.log", encoding='utf-8')

# 3️⃣ 设置输出格式
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

# 4️⃣ 绑定 handler
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# 5️⃣ 开始使用
logger.debug("调试信息")
logger.info("启动成功")
logger.warning("警告！")
logger.error("出错了")
```

这样日志会同时输出到控制台和文件中。

## 日志格式（Format）

常见的格式化变量：

| 占位符          | 含义        |
| --------------- | ----------- |
| `%(asctime)s`   | 时间        |
| `%(levelname)s` | 日志等级    |
| `%(filename)s`  | 文件名      |
| `%(lineno)d`    | 行号        |
| `%(message)s`   | 日志正文    |
| `%(name)s`      | Logger 名字 |
| `%(process)d`   | 进程 ID     |
| `%(thread)d`    | 线程 ID     |

## 使用配置文件（YAML / dictConfig）

推荐在中大型项目中使用配置文件集中管理：

```py
import logging
import logging.config

LOGGING_CONFIG = {
    'version': 1,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'DEBUG',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': 'app.log',
            'formatter': 'standard',
            'level': 'INFO',
        },
    },
    'loggers': {
        '': {  # root logger
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
        },
    }
}

logging.config.dictConfig(LOGGING_CONFIG)
logger = logging.getLogger(__name__)
logger.info("这是 INFO 日志")
logger.debug("这是 DEBUG 日志")
```

## 日志的滚动（自动分文件）

使用 `RotatingFileHandler` 或 `TimedRotatingFileHandler`：

```py
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler

# 按大小滚动
rotating = RotatingFileHandler('app.log', maxBytes=5*1024*1024, backupCount=3)

# 按时间滚动
timed = TimedRotatingFileHandler('app.log', when='midnight', interval=1, backupCount=7)
```

这样日志文件太大或过期时会自动分卷保存。

## 最佳实践建议

- 不要在库代码中使用 basicConfig()，而是用 `getLogger(__name__)`；

- 模块内用 `__name__` 命名 `logger`，这样主程序可统一配置；

- 控制台输出级别高，文件输出级别低；

- 异常用 `logger.exception()`：

```py
try:
    1 / 0
except Exception as e:
    logger.exception("出现异常")
```

会自动带上完整的 traceback。

## 总结结构图

```md
┌────────────┐
│ Logger │
│ (产生日志) │
└────┬───────┘
│
┌────▼─────┐
│ Handler │───► 输出到文件/控制台/网络
└────┬─────┘
│
┌────▼─────┐
│Formatter │───► 格式化输出文本
└──────────┘
```

## python logging 的标准做法

- 整个项目只配置一次 logging（通常在入口文件 main.py 或 app.py）

- 各个模块只获取自己的 logger，不重复配置

### 项目结构示例

```md 2
myproject/
├── main.py
├── logging_config.py
├── db.py
└── network.py
```

### 统一配置日志 (logging_config.py)

```py [logging_config.py]

import logging
import os
from logging.handlers import TimedRotatingFileHandler

# 日志目录
log_dir = 'logs'
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, 'app.log')

# 创建 logger
logger = logging.getLogger()   # root logger
logger.setLevel(logging.DEBUG) # 全局最低级别

# 1️⃣ 控制台 Handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)  # 控制台只显示 INFO 及以上
console_formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
console_handler.setFormatter(console_formatter)

# 2️⃣ 文件 Handler（按天滚动）
file_handler = TimedRotatingFileHandler(
    log_file, when='midnight', interval=1, backupCount=7, encoding='utf-8'
)
file_handler.setLevel(logging.DEBUG)  # 文件记录 DEBUG 及以上
file_formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s'
)
file_handler.setFormatter(file_formatter)

# 3️⃣ 添加 Handler 到 root logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)
```

### 主程序入口 (main.py)

```py [main.py]
import logging_config  # 引入日志配置
import logging
import db
import network

logger = logging.getLogger(__name__)  # 获取当前模块 logger

def main():
    logger.info("主程序启动")
    db.connect_db()
    network.start_network()

if __name__ == "__main__":
    main()
```

### 模块内日志 (db.py)

```py [db.py]
import logging

logger = logging.getLogger(__name__)  # 模块名作为 logger 名

def connect_db():
    logger.debug("正在连接数据库...")
    try:
        # 模拟数据库操作
        logger.info("数据库连接成功")
    except Exception as e:
        logger.exception("数据库连接失败")
```

### 模块内日志 (network.py)

```py [network.py]
import logging

logger = logging.getLogger(__name__)

def start_network():
    logger.info("网络模块启动")
    logger.warning("网络延迟较高")
```
