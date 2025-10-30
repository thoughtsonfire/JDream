# 多进程

每个进程有独立 GIL，可以真正并行利用多核 CPU

## 基本使用

```py
import multiprocessing

def process(index):
    print(f'Process: {index}')

if __name__ == '__main__':
    for i in range(10):
        p = multiprocessing.Process(target=process, args=(i,))
        p.start()
```

## 通过继承创建多进程

```py
from multiprocessing import Process
import time

class MyProcess(Process):
    def __init__(self, loop):
        Process.__init__(self)
        self.loop = loop
    # Process中的run，方法会自动调用，这里重构run方法
    def run(self):
        for count in range(self.loop):
            time.sleep(1)
            print(f'Pid: {self.pid} LoopCount: {count}')

if __name__ == '__main__':
    for i in range(2,5):
        p = MyProcess(i)
        p.daemon=True
        p.start()
```

## 守护进程

- 如果一个进程被设置为守护进程，当父进程结束后，子进程会被终止

- 可以通过设置 daemon 属性来控制是否为守护进程

- 通过 join 设置守护进程最长被等待时间

```py
from multiprocessing import Process
import time

class MyProcess(Process):
    def __init__(self, loop):
        Process.__init__(self)
        self.loop = loop
    # Process中的run，方法会自动调用，这里重构run方法
    def run(self):
        for count in range(self.loop):
            time.sleep(1)
            print(f'Pid: {self.pid} LoopCount: {count}')


if __name__ == '__main__':
    process = []
    for i in range(2,5):
        p = MyProcess(i)
        process.append(p)
        p.daemon=True
        p.start()
    for p in process:
        p.join(1)
    print('end')

```

## 进程互斥锁

```py
from multiprocessing import Process,Lock
import time

class MyProcess(Process):
    def __init__(self,loop,lock):
        Process.__init__(self)
        self.loop = loop
        self.lock = lock

    def run(self):
        for count in range(self.loop):
            time.sleep(0.1)
            self.lock.acquire()
            print(f'Pid: {self.pid} LoopCount: {count}')
            self.lock.release()

if __name__ == '__main__':
    lock = Lock()
    for i in range(10,15):
        p = MyProcess(i,lock)
        p.start()
```

## 信号量

信号量是进程同步过程中一个比较重要的角色，可以控制临界资源的数量，实现多个进程同时访问共享资源，限制进程的并发量

可以用 multiprocessing 库中的 Semaphore 来实现

```py
from multiprocessing import Process,Queue,Lock,Semaphore
import time


class Consumer(Process):
    def __init__(self,buffer,empty,full,lock):
        Process.__init__(self)
        self.buffer = buffer
        self.empty = empty
        self.full = full
        self.lock = lock

    def run(self):
        while True:
            self.full.acquire() # 占用一个空位
            self.lock.acquire()
            self.buffer.get()#从里边取出‘1’
            print('Cunsumer pop an element')
            time.sleep(1)
            self.lock.release()
            self.empty.release() # 获得一个空位

class Producer(Process):
    def __init__(self,buffer,empty,full,lock):
        Process.__init__(self)
        self.buffer = buffer
        self.empty = empty
        self.full = full
        self.lock = lock

    def run(self):

        while True:
            self.empty.acquire()
            self.lock.acquire()
            self.buffer.put(1)#往里边放入‘1’
            print('Producer append an element')
            time.sleep(1)
            self.lock.release()
            self.full.release()

if __name__ == '__main__':
    buffer = Queue(10)
    empty = Semaphore(2) #Semaphore(2) 表示两个空位
    full = Semaphore(0) #Semaphore(0) 0个空位，阻塞
    lock = Lock()

    p = Producer(buffer,empty,full,lock)
    c = Consumer(buffer,empty,full,lock)
    p.daemon = c.daemon = True
    c.start()
    p.start()
    p.join()
    c.join()
    print('Main Process end')

    #Queue.qsize(), empty(), full() 在 Windows 上可能不准确

```

## window 和 Linux/macOS 差异

| 平台              | 启动方式 | 启动行为                                                                                                                         |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Linux / macOS** | `fork`   | 子进程几乎完全复制父进程的内存空间（包括所有全局变量、导入的模块、对象状态等）。所以**子进程可以直接访问父进程创建的全局变量**。 |
| **Windows**       | `spawn`  | 子进程从头启动一个新的 Python 解释器，**重新导入主模块（`__main__`）**，不继承父进程的内存。也就是说，全局变量不会自动复制。     |

```py
from multiprocessing import Process, Queue

buffer = Queue()

def worker():
    buffer.put(1)

if __name__ == '__main__':
    p = Process(target=worker)
    p.start()
    p.join()
    print(buffer.qsize())
```

**🔍 在 Linux 下：**

- fork 启动；

- 子进程直接复制父进程的内存；

- 子进程拿到的 buffer 是同一个队列对象；

- 最终 buffer.qsize() 会输出 1。

🔍 在 Windows 下：

**spawn 启动；**

- 子进程重新执行整个脚本；

- 子进程中的 buffer 是一个新创建的队列对象，和主进程的完全不同；

- 子进程执行完后退出；

- 主进程的 buffer 依然是空的；

- 所以输出 0。

| 系统                            | 子进程如何获得父进程的内存（包括全局变量）                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Linux / macOS（POSIX 系统）** | 子进程通过 **fork()** 复制父进程的整个内存空间（采用写时复制 Copy-on-Write），初始时“共享同一份”内存页；但修改时会各自分离。                            |
| **Windows**                     | 子进程是通过 **CreateProcess()** 创建的，新进程会获得一块全新的内存空间，**父进程的全局变量不会被复制或共享**，除非显式通过 IPC（进程间通信）机制共享。 |

## 线程和进程的区别

| 特性     | 线程             | 进程                                       |
| -------- | ---------------- | ------------------------------------------ |
| 内存空间 | 共享             | 独立（Windows spawn 下完全不共享）         |
| 全局变量 | 可以直接访问     | Linux fork 可以，Windows spawn 不行        |
| 启动开销 | 小               | 大（需要复制或重新创建 Python 解释器）     |
| 数据通信 | 直接读写共享对象 | 需要 Queue / Pipe / Manager / SharedMemory |

> 所有线程共享进程的全局变量和内存空间。 window 和 Linux/macOS 写法没什么明显区别

## 队列（multiprocessing.Queue ）

> [!NOTE]
> multiprocessing.Queue 并不是直接共享内存对象，而是通过 操作系统提供的进程间通信机制（IPC） 来“传递数据”，
> 所以不管是 Linux 还是 Windows，它都能“共享”——实际上是在拷贝数据、不是共享引用。

| 对比点           | Linux (fork)           | Windows (spawn)           |
| ---------------- | ---------------------- | ------------------------- |
| 全局变量是否复制 | ✅ 复制一份副本        | ✅ 重新执行模块（新变量） |
| 是否共享内存     | ❌ 不共享              | ❌ 不共享                 |
| 性能             | 启动快                 | 启动慢（重新导入模块）    |
| 内存机制         | 写时复制 (COW)         | 全新空间                  |
| 最安全通信方式   | Queue / Pipe / Manager | 同上                      |

> 子进程修改的 x 只影响自己那一份，主进程里的 x 完全不变。

当你创建一个新进程时，操作系统会：

- 复制（不是共享） 当前父进程的内存；

- 子进程得到的是一份副本；

- 两个进程在物理上访问不同的内存页。

> [!NOTE]linux
> 子进程拿到的 Queue 与父进程的 Queue 共享同一底层 Pipe  
> 父子进程操作 put()/get() 都能互相看到  
> 效率高，因为 Pipe 描述符直接继承，不需要额外序列化连接信息  
> Pipe 是 内核提供的进程间通信通道，不在 Python 内存中，而在操作系统内核中。  
> 当你在 Linux 上调用 fork() 创建子进程时：  
> 内存页：父进程的内存被 Copy-On-Write（写时复制）  
> 文件描述符（File Descriptor, FD）：  
> 直接继承父进程的所有打开文件、套接字、管道等  
> 每个子进程的 FD 指向 同一内核对象（内核缓冲区）  
> 因此子进程和父进程都能操作同一个 Pipe 的读写端  
> 重点：继承的是 文件描述符指针，而不是 Python 对象本身

> [!NOTE]window
> 子进程重新启动 Python 解释器，重新执行模块顶层代码  
> 全局变量、对象都会 重新创建  
> 父进程的 Queue 对象 不会被直接继承

## 管道（Pipe）

两个进程之间通信的通道

可以是单向的，即`half-duplex`:

一个进程负责发消息，另一个进程负责收消息

也可以是双向的`duplex`,即互相收发消息

默认声明 Pipe 对象是双向管道

如果要创建单向管道，可以在初始化的时候传入`deplex`参数为 False

```py
from multiprocessing import Process,Pipe

class Consumer(Process):
    def __init__(self,pipe):
        Process.__init__(self)
        self.pipe = pipe

    def run(self):
        self.pipe.send('Consumer Words')
        print(f'Consumer Received: {self.pipe.recv()}')

class Producer(Process):
    def __init__(self,pipe):
        Process.__init__(self)
        self.pipe = pipe
    def run(self):
        print(f'Producer Received: {self.pipe.recv()}')
        self.pipe.send('Producer Words')

if __name__ == '__main__':
    pipe = Pipe()
    p = Producer(pipe[0])
    c = Consumer(pipe[1])
    # [0][1]区分管道两端，双向的，一边一端就行
    # 下面这样也行
    # conn1, conn2 = Pipe()
    # p = Producer(conn1)
    # c = Consumer(conn2)
    p.daemon=c.daemon=True
    p.start()
    c.start()
    p.join()
    c.join()
    print('Main Process Ended')
```

## 进程池（Pool）

`multiprocessing`中的`Pool`

可以提供指定数量的进程，供用户调用

当有新的请求提交到 pool 中时

如果池还没满，就会创建一个新的进程来执行该请求

如果池中进程数已达到规定最大值

那么该请求就会等待直到池中有进程结束，才会创建新的进程来执行它

```py
from multiprocessing import Pool
import time

def function(index):
    print(f'Start process: {index}')
    time.sleep(3)
    print(f'End process: {index}')

if __name__ == '__main__':
    pool = Pool(3)
    for i in range(4):
        pool.apply_async(function,args=(i,))
    print('Main process started')
    pool.close() #关闭进程池
    pool.join() #等待进程池里的进程结束
    print('Main process ended')
```

map 方法的使用

- 第一个参数，需要启动的进程对应的执行方法

- 第二个参数，是一个可迭代对象，其中每个元素会被传递给这个执行方法

```py
from multiprocessing import Pool
import urllib.request
import urllib.error

def scrape(url):
    try:
        urllib.request.urlopen(url)
        print(f'URL: {url} Scraped')
    except (urllib.error.HTTPError, urllib.error.URLError):
        print(f'URL: {url} not Scraped')

if __name__ == '__main__':
    pool = Pool(3)
    urls = [
        'https://www.baidu.com/',
        'https://www.meituan.com/',
        'https://blog.csdn.net/',
        'https://xxxyxxx.net/',
    ]
    pool.map(scrape, urls)
    pool.close()
    pool.join()
    print('Main process finished')
```
