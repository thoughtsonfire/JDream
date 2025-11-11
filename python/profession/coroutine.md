# 协程 (Coroutine)

> [!NOTE] 协程  
> 又称微线程、纤程，协程是一种用户态的轻量级线程  
> 拥有自己的寄存器上下文和栈，**本质上是个单进程**  
> 相对于多进程，无需线程上下文切换的开销，无需原子操作、锁定及同步的开销  
> 编程模型非常简单

## 协程是什么？

> 💬 简单一句话：  
> 协程就是一种可以在执行过程中暂停、并在需要时恢复执行的函数。

它是一种比线程更轻量的“并发”实现方式。

在 Python 中，协程常用于 IO 密集型任务（网络请求、文件读写、数据库操作） 的并发加速。

## 与普通函数的区别

- 普通函数：

```py
def foo():
    print("start")
    print("end")
```

执行时从头到尾一次性运行完。

- 协程函数：

```py
async def foo():
    print("start")
    await asyncio.sleep(1)
    print("end")
```

执行时可以在 await 处“暂停”，等异步操作完成后再继续。

这就是“协程”的本质 —— 可中断的函数。

## 协程的三层概念

| 层级 | 名称         | 示例                          | 含义                                   |
| ---- | ------------ | ----------------------------- | -------------------------------------- |
| ①    | 协程函数     | `async def func(): ...`       | 定义一个可异步执行的函数               |
| ②    | 协程对象     | `func()`                      | 调用协程函数返回的对象（未执行）       |
| ③    | 任务（Task） | `asyncio.create_task(func())` | 包装协程对象，使其能被事件循环调度执行 |

## 事件循环（Event Loop）

事件循环是协程的“调度器”：

- 它控制哪些协程何时执行；

- 当一个协程遇到 await 时让出控制权；

- 切换执行其他任务；

- 等待异步操作完成后再切回来。

Python 的 asyncio 模块就是一个事件循环驱动的协程框架。

## 协程的基本语法结构

```py
import asyncio

async def foo():
    print("start")
    await asyncio.sleep(1)
    print("end")
    return "done"

async def main():
    task = asyncio.create_task(foo())
    result = await task
    print(result)

asyncio.run(main())
```

说明：

- async def：定义协程函数；

- await：暂停当前协程等待另一个协程结果；

- asyncio.create_task()：把协程注册到事件循环；

- asyncio.run()：启动事件循环（Python 3.7+ 推荐）。

## 协程的并发执行

```py
import asyncio

async def foo(i):
    print(f"Task {i} start")
    await asyncio.sleep(1)
    print(f"Task {i} end")
    return i

async def main():
    tasks = [asyncio.create_task(foo(i)) for i in range(3)]
    results = await asyncio.gather(*tasks)
    print(results)

asyncio.run(main())
```

输出：

```arduino
Task 0 start
Task 1 start
Task 2 start
Task 0 end
Task 1 end
Task 2 end
[0, 1, 2]
```

✨ 虽然每个 foo() 都有 await asyncio.sleep(1)，

但事件循环会在等待期间切换任务，实现“并发执行”。

## 协程 vs 多线程 vs 多进程

| 特性       | 协程（Coroutine）  | 线程（Thread） | 进程（Process）  |
| ---------- | ------------------ | -------------- | ---------------- |
| 切换方式   | 程序控制（await）  | 操作系统调度   | 操作系统调度     |
| 是否并行   | ❌ 单线程并发      | ✅ 可并行      | ✅ 可并行        |
| 适用场景   | IO 密集型          | IO 密集型      | CPU 密集型       |
| 内存开销   | 极小               | 中等           | 较大             |
| 上下文切换 | 极快（无系统调用） | 慢             | 最慢             |
| GIL 影响   | 在一个线程内执行   | 有             | 无（独立解释器） |

## 核心语法速查表

| 关键字 / 函数               | 作用                             |
| --------------------------- | -------------------------------- |
| `async def`                 | 定义协程函数                     |
| `await`                     | 挂起当前协程等待另一个协程完成   |
| `asyncio.run(coro)`         | 启动事件循环并运行协程           |
| `asyncio.create_task(coro)` | 把协程包装为可调度的任务         |
| `asyncio.gather(*tasks)`    | 并发执行多个任务并返回结果       |
| `asyncio.wait(tasks)`       | 等待一组任务完成（更底层控制）   |
| `asyncio.sleep(n)`          | 异步版 sleep（不会阻塞事件循环） |

## 总结

| 概念                   | 含义                                    |
| ---------------------- | --------------------------------------- |
| 协程（Coroutine）      | 可以在执行中暂停/恢复的函数             |
| 事件循环（Event Loop） | 管理和调度协程运行的核心机制            |
| `await`                | 协程让出控制权的关键语句                |
| `asyncio`              | Python 内置异步协程框架                 |
| 优势                   | 单线程高并发、轻量高效                  |
| 适用场景               | 网络请求、爬虫、异步 IO、数据库连接池等 |

## 概念介绍

- event_loop

**老版本使用，新版本直接`asyncio.run()`自动控制**

事件循环，相当于一个无限循环

可以把一些函数注册到这个事件循环上

当满足条件发生的时候，就会调用对应的处理方法

- coroutine(协程)

在 Python 中常指代为协程对象类型

可以将协程对象注册到时间循环中，它会被事件循环调用

可以使用 async 关键字来定义一个方法

这个方法在调用时不会立即被执行，而是返回一个协程对象

- task

任务，它是对协程的进一步封装，包含了任务的各个状态

- future

代表将来执行或没有执行的任务的结果，实际上和 task 没有本质区别
