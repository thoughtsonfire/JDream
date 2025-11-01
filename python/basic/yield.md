# yield 关键字

## 核心概念（一句话）

`yield` 出现在函数内部时，把这个函数变成 生成器函数（`generator function`）。调用它不会立刻执行函数体，只会返回一个 生成器对象（可迭代、惰性生成值）。遇到 `yield` 会 暂停函数并返回一个值，下一次继续从暂停处恢复其局部状态。

## 最简单的例子（理解控制流）

```py
def gen():
    yield 1
    yield 2
    yield 3

g = gen()          # 仅创建生成器对象，不执行函数体
print(next(g))     # 输出 1 — 从函数开始运行，遇到第一个 yield 返回
print(next(g))     # 输出 2
print(next(g))     # 输出 3
# next(g) 再调用会抛 StopIteration
```

要点

- gen() 返回一个生成器对象 g。

- 只有在迭代（next()、for、list() 等）时，函数体才执行并在 yield 处暂停。

- 生成器保持局部变量与执行位置（状态被“冻结”），下次继续。

## yield 是表达式（可以接收值）

`yield` 既能“发出”值，也可以“接收”外部传入的值（通过 `.send()` 或 `next()`）。注意：第一次用 `.send()` 前必须先“启动”生成器（即先调用 `next(g)` 或 `g.send(None)`）。

```py
def echo():
    received = yield "first yield"
    print("received:", received)
    received2 = yield "second yield"
    print("received2:", received2)

g = echo()
print(next(g))        # 启动并得到 "first yield"
print(g.send("hi"))   # 把 "hi" 传入赋给 received，继续执行到下个 yield 并返回 "second yield"
try:
    g.send("bye")     # 传入 "bye"，函数执行完，抛 StopIteration
except StopIteration:
    print("generator finished")
```

执行顺序要记住：

- `next(g)` / `g.send(None)` 启动到第一个 `yield` 并返回值。

- `g.send(value)` 会把 `value` “送回”给上一条 `yield` 表达式作为返回值，然后继续执行到下一个 `yield`。

## `yield from`（代理子生成器，来自 PEP 380）

当你需要把另一个可迭代/生成器的所有值“透传”出来，并希望拿到子生成器的 return 值时，使用 yield from 非常方便。

```py
def sub():
    yield 1
    yield 2
    return "sub done"

def main():
    result = yield from sub()
    print("sub returned:", result)
    yield 99

g = main()
print(next(g))   # 1
print(next(g))   # 2
try:
    print(next(g))  # prints "sub returned: sub done" then yields 99
except StopIteration:
    pass
```

- `yield from X` 会把 `X` 的元素全部依次产出（等价于显式的 for 循环 yield）。

- 如果子生成器 `return value`，`yield from` 会把这个 `value` 作为表达式的结果（可以赋值给变量）。

## 生成器返回值（return 在生成器中的作用）

在生成器中使用 `return something` 会结束生成器，并在抛出的 `StopIteration` 中把 `something` 放到 `.value`（Python 3.3+）

```py
def g():
    yield 1
    return 42

it = g()
print(next(it))   # 1
try:
    next(it)
except StopIteration as e:
    print("returned:", e.value)  # returned: 42
```

注意：在普通的 for x in g(): 下不能直接拿到这个返回值，需要捕获 StopIteration 或使用 yield from。

## generator object 的方法：next(), send(), throw(), close()

- next(g)：请求下一个值（等于 g.send(None)）。

- g.send(value)：把 value 发送到生成器内部，作为上一个 yield 表达式的值，并继续执行到下一个 yield 返回新值。首次需先 next() 或 send(None)。

- g.throw(exc_type, value=None, traceback=None)：在生成器暂停处抛出异常，生成器可以捕获并处理，也会向外抛出。

- g.close()：向生成器抛入 GeneratorExit，如果生成器捕获并不关闭，会导致 RuntimeError。

简单示例（throw）：

```py
def g():
    try:
        yield 1
    except ValueError:
        print("caught ValueError inside generator")
        yield 99
    yield 2

it = g()
print(next(it))        # 1
print(it.throw(ValueError))  # 触发 except，输出并 yield 99
print(next(it))        # 2
```

## 生成器表达式 vs 列表推导式

- 列表推导式 [...] 会一次性计算并返回列表（占用内存）。

- 生成器表达式 ( ... ) 返回生成器，按需计算。

```py
L = [i*i for i in range(1000)]   # 占内存
G = (i*i for i in range(1000))   # 惰性，不占内存
```

## 常见使用场景（为什么用 yield）

- 节省内存：处理大数据集（日志、文件、数据库结果）时按需生成。

- 流式处理：边抓边处理（抓取一个链接就处理一个），减少延迟与内存压力。

- 管道化：把多个生成器串成 pipeline（类似 Unix 管道）。

- 协程（旧式）：在 asyncio 出现前，yield/yield from 可用于协作式并发（现在推荐 async/await）。

- 无限序列：轻松实现无限生成器（如斐波那契、自然数流）。

示例：按行处理大文件

```py
def read_lines(path):
    with open(path, 'r', encoding='utf8') as f:
        for line in f:
            yield line.rstrip('\n')

for line in read_lines('bigfile.txt'):
    process(line)   # 不会把整个文件读入内存
```

## 常见错误与坑

1. 没迭代就以为函数不执行

   - g = parse_index(html) 本身不会调用内部 logging.info；必须迭代（for / list() / next()）来触发。

2. 把生成器消费掉后再使用

   - lst = list(g) 会把生成器完全耗尽；再次迭代不会返回任何值。

3. 第一次用 send() 必须先 next()

   - g = gen(); g.send(1) 会抛 TypeError（除非你 send(None) 或 next() 先“启动”）。

4. 误以为 yield 等同 return

   - yield 多次返回（每次暂停），return 结束生成器并抛 StopIteration。

5. yield 在 lambda 中不可用

   - yield 只能在函数定义内使用，不能在 lambda 中。

6. 线程/并发注意

   - 生成器对象不是线程安全的；在多线程环境不要无同步共享同一生成器。

## 进阶示例：把生成器用于爬虫

把 yield 用在爬虫里非常常见：解析器产出 URL，爬虫循环消费并请求详情页。

```py
# parse_index 只负责从 index html 产生 detail url
def parse_index(html):
    doc = pq(html)
    for a in doc('ul>li>a').items():
        yield urljoin(baseurl, a.attr('href'))

# main 中逐条消费，并即时抓取详情
def main():
    for i in range(1, total_page+1):
        index_html = scrape_index(i)
        for detail_url in parse_index(index_html):   # 逐条迭代生成器
            logging.info('fetching %s', detail_url)
            detail_html = scrape_detail(detail_url)
            parse_detail(detail_html)
```

好处：边解析边请求，避免一次性把所有 URL 存到列表里（节约内存与延迟）。

## 调试技巧（如何看清生成器发生了什么）

- 在生成器内部多 logging.debug(...)，但记住：日志只在生成器被迭代时才会输出。

- 用 inspect.getgeneratorstate(g) 可以查看生成器状态（GEN_CREATED, GEN_RUNNING, GEN_SUSPENDED, GEN_CLOSED）。

- 在 shell 里逐步 next() 看执行流程，或用 pdb 断点。

示例：

```py
import inspect
g = gen()
print(inspect.getgeneratorstate(g))  # GEN_CREATED
next(g)
print(inspect.getgeneratorstate(g))  # GEN_SUSPENDED
```

## 与 async/await 的关系

- 现代异步使用 async def + await。yield 和生成器可以实现协作式调度（像早期的 yield from 用法），但现在建议用 asyncio / async。

- async 函数返回 coroutine，不能用 next()，要用事件循环运行（asyncio.run()、await 等）。

## list() 包裹后

```py
def gen():
    print("start gen()")
    yield 1
    print("yielded 1")
    yield 2
    print("yielded 2")
    yield 3
    print("yielded 3")
    print("gen() done")

g = gen()
print("g =", g)
# g = <generator object gen at 0x...>
```

```py
print(list(g))
# start gen()
# yielded 1
# yielded 2
# yielded 3
# gen() done
# [1, 2, 3]
```

- list() 会自动迭代整个生成器，直到抛出 StopIteration。

- 所以它会一次性执行完所有的 yield。

- 每次 yield 的值都会被收集进一个新列表中。

- 执行完后生成器就耗尽了，状态是 GEN_CLOSED。

再 list(g) 一次？什么都不会输出：

```py
print(list(g))  # []
```

## 小结（便于记忆的要点）

- yield：让函数变成生成器；每次 yield 返回一个值并暂停执行，保留局部状态。

- 生成器是惰性的，只有被迭代时才执行。

- yield 既可以产出值，也可以接收外部通过 .send() 传入的值（yield 是表达式）。

- yield from 用于委托子生成器，能拿到子生成器的 return 值。

- 常用于大数据流、爬虫、流水线、无限序列等场景。

- 常见坑：没有迭代、不正确使用 send()、把生成器消费掉后再用。

## yield 和普通 return 的区别：

| 对比点             | `return`       | `yield`                        |
| ------------------ | -------------- | ------------------------------ |
| 所属类型           | 语句关键字     | 语句关键字                     |
| 是否立即结束函数   | 是             | 否（只是暂停）                 |
| 返回值             | 单次返回一个值 | 每次暂停返回一个值，可继续执行 |
| 函数类型           | 普通函数       | 生成器函数                     |
| 是否可迭代         | 否             | 是                             |
| 是否自动创建迭代器 | 否             | 是（返回 `generator` 对象）    |
