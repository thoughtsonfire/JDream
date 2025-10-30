# 多线程

> [!NOTE]1. 什么是多线程
>
> 线程 (Thread) 是操作系统能调度的最小执行单位，一个进程可以包含多个线程。
>
> 在 Python 里，默认运行的代码就是主线程，你可以再开启多个子线程，和主线程并发执行。

> [!NOTE]2. Python（CPython 实现）有 全局解释器锁 GIL，它保证同一时间只有一个线程在执行 Python 字节码。
>
> 所以多线程 不能真正利用多核 CPU 来做计算密集型任务（比如大规模数学计算）。
>
> 但是在 I/O 密集型任务（网络请求、文件读写）中，多线程仍然能大幅提升效率，因为等待 I/O 时，线程会让出 GIL。

> [!NOTE]3. 常见应用场景
>
> ✅ 适合：
>
> - 网络爬虫（同时请求多个网页）
>
> - 文件下载/上传
>
> - Socket 服务端处理多个客户端
>
> - GUI 程序保持界面响应（主线程负责 UI，子线程负责耗时任务）
>
> ❌ 不适合：
>
> - 大规模数值计算（推荐用 多进程 multiprocessing 或者 NumPy/Cython 等绕过 GIL

> [!NOTE]4. 线程锁（避免冲突）
>
> 多个线程可能会同时修改共享数据，导致数据不一致 → 需要用锁 threading.Lock。

## 多线程与多进程

> 多线程 (threading)
>
> - 多线程在 I/O 密集型任务 中 → 并发效果很好
>
> - 但在 CPU 密集型任务 中 → 不能并行，只能并发
>
> 多进程 (multiprocessing)
>
> - 每个进程有独立的 Python 解释器 + GIL
>
> - 可以在多核 CPU 上真正做到 并行计算
>
> - 适合 CPU 密集型任务（大规模计算、图像处理等）

## 并发和并行

> 并发 (Concurrency)
>
> - 多个任务在同一时间段内交替执行。
>
> - 它不一定是“真正同时”，可能是任务切换得很快，看起来像同时在跑。
>
> - 类比：一个人同时和多人聊天，其实是快速在不同对话窗口之间切换。
>
> 并行 (Parallelism)
>
> - 多个任务在同一时刻真正同时执行。
>
> - 必须依赖多核 CPU 或多台机器。
>
> - 类比：多个人分别和不同人聊天，确实是同时进行。

## Python 多线程 vs 多进程 对比表

📝 Python 多线程 vs 多进程 对比表

| 特性                | 多线程 (threading) 🧵                                | 多进程 (multiprocessing) 🔥                                 |
| ------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| **运行机制**        | 一个进程里开启多个线程，共享同一块内存空间           | 开启多个进程，每个进程有独立的内存和 Python 解释器          |
| **并发 / 并行能力** | 受 GIL 限制 → 只能并发，不能真正利用多核 CPU         | 每个进程有独立 GIL，可以真正并行利用多核 CPU                |
| **适用场景**        | I/O 密集型任务（网络请求、文件 I/O、数据库）         | CPU 密集型任务（计算、加密、图像处理）                      |
| **内存消耗**        | 较低（线程共享内存）                                 | 较高（进程独立内存空间）                                    |
| **数据共享**        | 简单（共享全局变量、数据结构）                       | 复杂（需要 Queue、Pipe、Manager 等 IPC 机制）               |
| **启动速度**        | 快（轻量级，线程上下文切换开销小）                   | 慢（进程启动和上下文切换开销大）                            |
| **安全性**          | 容易出现线程安全问题（需要 Lock 保护共享数据）       | 进程间数据隔离，天然更安全                                  |
| **调试难度**        | 相对容易                                             | 较难，特别是跨进程调试                                      |
| **跨平台支持**      | 全平台支持                                           | Windows 上开销更大（进程复制机制不同于 Linux）              |
| **典型库**          | `threading`、`concurrent.futures.ThreadPoolExecutor` | `multiprocessing`、`concurrent.futures.ProcessPoolExecutor` |

## threading 库

- 来源：Python 标准库（自带，不需安装）。

- 功能：用于创建和管理多线程程序，比底层 \_thread 提供更高层次的接口。

- 适用场景：I/O 密集型任务（网络请求、文件读写、日志处理等）。

- 限制：受 GIL（全局解释器锁） 影响，Python 同一时间只有一个线程能执行字节码，因此 CPU 密集型任务用 multiprocessing 更合适。

<br>

### 基础用法

```py
import threading

def worker(num):
    print(f"线程 {num} 正在运行")

t = threading.Thread(target=worker, args=(1,))
t.start()
t.join()  # 等待线程结束
```

常用属性和方法

- start()：启动线程

- join(timeout=None)：等待线程结束

- is_alive()：判断线程是否存活

- name：线程名字，可读写

- ident：线程 ID

- daemon：设置是否为守护线程（主线程退出时，守护线程会被杀掉）

### 实例

```py [多线程下载小说]
# 多线程下载小说

import threading
import requests
from lxml import etree
from queue import Queue
import os
import time
import random

# 全局变量
gen_urls_done = False
chapters = {}
lock = threading.Lock()

headers = {
    "Referer": "https://7dc64f1f.de2a0a8.xyz",
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
}

# 获取不同章节的地址
def getUrls(index_url, q):
    global gen_urls_done
    r = requests.get(index_url, headers=headers)
    # print(r.text)
    tree = etree.HTML(r.text)
    links = tree.xpath("//div[@class='book_last']//dd[position()>1]/a/@href")
    titles = tree.xpath("//div[@class='book_last']//dd[position()>1]/a/text()")

    baseUrl = "https://7dc64f1f.de2a0a8.xyz"
    for i, link in enumerate(links):
        link = baseUrl + link
        q.put((i, titles[i], link))  # 加上标题一起保存
        # print(link)

    gen_urls_done = True


# 下载不同章节的小说
def downloads(q):
    while True:
        if q.empty() and gen_urls_done:
            break

        try:
            id, title, url = q.get(timeout=1)
        except:
            continue
        retries = 0
        while retries<3:
            try:
                r = requests.get(url, headers=headers)
                result = has_content(r.text)

                has_text, content = result
                i = 2
                while has_text:
                    url_p = url[:-5] + '_' + str(i) + '.html'
                    try:
                        r1 = requests.get(url_p, headers=headers)
                        result = has_content(r1.text)
                        has_text, more_content = result
                        content += more_content
                        i += 1
                    except Exception as e:
                        print(f"{url} 下载失败，重试 {retries}: {e}")
                        time.sleep(random.uniform(1, 2))

                # 🔹 多线程安全写入
                with lock:
                    # chapters[id] = content  #正文游标题
                    chapters[id] = f"{title}\n{content}"  #正文无标题

                print(f"下载完成：{title}")
                retries=3
            except Exception as e:
                retries += 1
                print(f"{url} 下载失败，重试 {retries}: {e}")
                time.sleep(random.uniform(1, 2))


# 保存为 TXT 文件
def save_to_txt(filename, chapters):
    os.makedirs("data", exist_ok=True)
    filepath = os.path.join("data", filename + '.txt')

    with open(filepath, "w", encoding="utf-8") as f:
        for i in sorted(chapters.keys()):
            f.write(chapters[i] + "\n\n")

    print(f"保存成功：{filepath}")


# 判断章节 HTML 是否有正文
def has_content(html):
    tree = etree.HTML(html)
    div = tree.xpath('//div[@id="chaptercontent"]')
    if not div:
        return False, ""
    div = div[0]

    # 删除提示文字
    for p in div.xpath('.//p[@class="noshow"]'):
        p.getparent().remove(p)

    texts = div.xpath('.//text()')
    texts = [t.strip() for t in texts if t.strip()]

    if texts:
        texts.pop()  # 删除最后的“请收藏...”提示

    content = '\n'.join(texts)
    if content.strip():
        return True, content
    else:
        return False, ""


# 主函数
def main():
    index_url = "https://7eb674b5b32.de2a0a8.xyz/book/135128/list.html"
    q = Queue()

    th1 = threading.Thread(target=getUrls, args=(index_url, q))
    th1.start()
    th1.join()

    threads = []
    for i in range(10):  # 10 个下载线程
        th = threading.Thread(target=downloads, args=(q,))
        threads.append(th)
        th.start()

    for th in threads:
        th.join()

    save_to_txt('我在综武世界当剑仙', chapters)


if __name__ == '__main__':
    main()

```
