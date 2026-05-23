# 多线程（Thread）

使用多线程可以让程序充分利用CPU的资源，提高CPU的使用效率，从而解决高并发所带来的负载均衡问题

> 优点：
>
> - 资源得到更合理的利用
> - 程序设计更加简洁
> - 程序响应速度更快，运行效率更高

> 缺点：
>
> - 需要更多的内存空间支持多线程
> - 多线程并发访问的情况可能会影响数据的准确性
> - 数据被多线程共享，可能会出现死锁的情况

应该将程序设计得更加合理有效，避免多线程的缺点，充分发挥多线程的优点，从而提高程序的性能

## 进程和线程

什么是进程

进程是操作系统正在运行的一个独立的应用程序，进程是一个动态概念

什么是线程

线程是进程的基本单位，一个进程中包含一个或多个线程，线程可以完成特定的功能

进程和线程都是应用程序在执行过程中的概念，动态存在，如果应用程序没有执行，则不存在进程和线程

应用程序是静态概念，进程和线程是动态概念，有创造就有销毁，存在也是暂时的，不是永久的

进程和线程的区别

进程在运行时拥有独立的内存空间，每个进程所占的内存都是独立的，互不干扰。

多线程是共享内存空间的，但是每个线程的执行是相对独立的，只不过公用内存空间。

线程必须依赖于进程才能执行，单独的线程是无法执行的，由进程来控制多个线程的执行。

多线程：一个进程中，多个线程同时执行。

单核CPU的情况下，多线程并不是真正的同时执行，而是多线程交替占用CPU,执行自己的业务，并发。

多核CPU,可以真正同时执行

|                  | Java | Python(CPython) |
| ---------------- | ---- | --------------- |
| 线程是否是真线程 | 是   | 是              |
| 能否多核并行     | 能   | 默认不能        |
| 是否有GIL        | 没有 | 有              |
| CPU密集型多线程  | 强   | 弱              |
| IO密集型多线程   | 强   | 强              |

```java
public class Test0 {
    public static void main(String[] args) {
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                System.out.println("++++++++"+i);
            }
        }).start();

        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                System.out.println(i+"=========");
            }
        }).start();
    }
}

// ++++++++0
// ++++++++1
// 0=========
// 1=========
// 2=========
// ++++++++2
// ++++++++3
// ++++++++4
// ++++++++5
// ++++++++6
// ++++++++7
// 3=========
// 4=========
// 5=========
// 6=========
// 7=========
// 8=========
// 9=========
// ++++++++8
// ++++++++9
```

`() -> { ... }`是一个 Lambda 表达式。目标类型是“函数式接口”。

这里 Thread 的构造器参数类型是：

```java
Runnable
```

所以 Lambda 会自动变成：

```
Runnable 的实现类对象
```

```java
 new Thread(()->{
            for (int i = 0; i < 10; i++) {
                System.out.println("++++++++"+i);
            }
        }).start();
```

等价于：

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("++++++++" + i);
        }
    }
};

new Thread(r).start();
```

## Java中线程的使用

1. 继承Thread类

Thread 的Java中线程的父类

Exception 是Java提供的异常的父类

实现程序的扩展，基于JDK基础类开发者可以扩展出其他的相关的类。

对修改封闭（不能修改JDK源码），对扩展开放（自定义类，通过继承的形式融入到JDK中）

线程一定要跟任务绑定，一个线程必须要执行一个任务，一个空的线程没有意义，一个空的任务也没有意义，一定要线程+任务绑定在一起

```java
class Thread implements Runnable{
    ...

    /* What will be run. */
    private Runnable target;


    public Thread(Runnable target) {
        init(null, target, "Thread-" + nextThreadNum(), 0);
    }

    @Override
    public void run() {
        if (target != null) {
            target.run();
        }
    }
}
```

```java
@FunctionalInterface
public interface Runnable {
    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see     java.lang.Thread#run()
     */
    public abstract void run();
}
```

Thread 构造器

基本只用

```java
Thread(Runnable target)

Thread(Runnable target, String name)
```

Thread类是JDK线程父类，Runnable接口是JDK定义任务的接口。任务的具体实现写在run方法里。

1. 创建Thread对象的时候，从外部传入一个Runnable对象（创建线程的时候，需要绑定一个任务）

2. 当线程执行的时候，会调线程的run方法。

3. 如果创建线程对象的时候，传入了任务，则会执行任务，否则线程什么都不做。执行任务的run方法。

- 创建线程类,将任务重写进run方法。这种做法高耦合，不推荐

```java
public class MyThread extends Thread{

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("++++++++"+i);
        }
    }
}
```

```java
public class Test1 {
    public static void main(String[] args) {
        //创建线程
        MyThread myThread = new MyThread();

        //启动线程
        myThread.start();
    }
}
```

- 解耦合，只创建任务传入任务

```java
public class MyRunnable implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + " " + i);
        }
    }
}
```

```java
public class Test3 {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);

        thread.start();
    }
}
```

```java
public class MyThread1 extends Thread{

    private Runnable target;

    public MyThread1(Runnable runnable) {
        this.target = runnable;
    }

    @Override
    public void run() {
        if(target == null){
            System.out.println("没有给当前线程指定任务");
        }else{
            target.run();
        }
    }
}
```

## 线程的状态

线程一共由5种状态,在特定的情况下，线程可以在不同状态之间切换

- 创建状态：实例化了一个新的线程对象，还未启动
- 就绪状态：创建好的线程对象调用start()方法完成启动，进入线程池等待抢占CPU资源
- 运行状态：线程对象获取CPU资源，在规定时间内执行任务
- 阻塞状态：正在运行的线程暂停任务，释放所占CPU资源
- 终止状态：线程运行完毕或者因为异常导致线程终止运行

![示意图](/public/imgs/java/thread.png)

## lamdba 表达式

函数式编程，将方法的实现作为参数进行传递

可以简化代码的开发

Lambda 能成立的前提是：目标类型是“函数式接口”。

> Java 里的“函数式接口”（Functional Interface），本质上就是：
>
> 只包含一个抽象方法的接口
>
> 这样它才能被 Lambda 表达式替代。

## 线程调度

### 线程休眠

线程休眠是指让当前线程暂停执行，从运行状态进入阻塞状态，从而将CPU资源让给其他线程的一种调度方式，通过sleep方法来实现。

> 线程对象 和 真正运行的线程
>
> 不是完全等价的东西。
>
> 比如：
>
> ```java
> Thread t = new Thread(...);
> ```
>
> 这里只是：
>
> ```
> Java里的一个 Thread对象
> ```
>
> 真正运行时：
>
> ```
> 是 JVM + 操作系统线程
> ```
>
> 在执行。

```java
    public static native void sleep(long millis) throws InterruptedException;
```

sleep 是本地静态方法，sleep 永远睡的是“当前线程”，由Tread直接调用

```java
public class Test4 {
    public static void main(String[] args) {
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                if(i==5){
                    try{
                        Thread.sleep(5000);
                    }catch(InterruptedException e){
                        e.printStackTrace();
                    }
                }
                System.out.println(i);
            }
        }).start();
    }
}
```

### 线程合并

合并是指将指定的某个线程加入到当前线程中，合并为一个线程

由两个线程交替执行变成，一个线程执行完毕，再执行第二个线程，通过join方法来实现。

```java
public class Test5 {
    public static void main(String[] args){
        JoinRannable joinRannable = new JoinRannable();
        Thread thread = new Thread(joinRannable);
        thread.start();

        for (int i = 0; i < 10; i++) {

            if(i==5){
                try{
                    thread.join();
                }catch(InterruptedException e){
                    e.printStackTrace();
                }
            }
            System.out.println("mainRannable+"+i);
        }
    }
}
```

join()方法存在重载`join(long millis)`

区别？

通过`join()`进行的，则并挤奶的线程会一直占用CPU资源，直到结束才会释放CPU资源

通过`join(long millis)`,会占用`millis`时间，或者该线程结束。如果没结束，就继续并发执行。

### 线程同步

多线程同时访问同一资源，可能会导致数据不准确的情况1出现，所以需要线程同步来解决这一问题。

```java
public class Account implements Runnable {

    private static int num;

    @Override
    public void run() {
        num++;
        System.out.println(Thread.currentThread().getName()+"是当前的第"+num+"位访客");
    }
}

public class Test6 {
    public static void main(String[] args) {
        Account account = new Account();
        Thread t1 = new Thread(account,"线程1");
        Thread t2 = new Thread(account,"线程2");

        t1.start();
        t2.start();
    }
}


// 线程2是当前的第2位访客
// 线程1是当前的第2位访客

```

通过线程锁 `synchronized` 来锁定

#### 方法一 锁类对象（推荐理解）

```java
public class Account implements Runnable {

    private static int num;

    @Override
    public void run() {
        synchronized (Account.class) {
            num++;
            System.out.println(Thread.currentThread().getName()
                    + "是当前的第" + num + "位访客");
        }//锁类
    }
}
```

这里：

```java
synchronized (Account.class)
```

表示：

```
锁的是 Account 这个类
JVM 中类对象只有一份
所有线程都会竞争同一把锁
```

因此真正保护了：

```java
static int num
```

#### 方法二 使用 static synchronized

```java
public class Account implements Runnable {

    private static int num;

    @Override
    public void run() {
        add();
    }

    public static synchronized void add() {
        num++;
        System.out.println(Thread.currentThread().getName()
                + "是当前的第" + num + "位访客");
    }
}
```

这里：

```java
static synchronized
```

锁的也是：

```java
Account.class
```

本质和上面一样。

| 数据           | 应该锁什么          |
| -------------- | ------------------- |
| 普通成员变量   | this                |
| static静态变量 | 类对象（xxx.class） |

`synchronized` 可以修饰实例方法，也可以修饰静态方法

```java
public class SynchronizedTest {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(()->{
                SynchronizedTest.test();
            });
            thread.start();
        }
    }

    public static synchronized  void test() {
        System.out.println("start...");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("end...");
    }
}
```

### 线程安全的单例模式

单例模式，核心思想是一个类只有一个实例化对象。

如何实现单例模式

1. 禁止通过构造器来创建对象，如何实现？

如何禁止外部调用构造器？把构造器私有化。

2. 如何确保对象只有一个？

创建对象的方法，先验证是否有对象

```java
//只有单线程这样可以，多线程就不行了
public class Sample {

    private static Sample sample;

    private  Sample(){
        System.out.println("创建了Sample对象");
    }

    public static Sample getInstance(){
        if(sample == null){  //可能多个线程进入了判断里边，但创建对象并未开始
            sample = new Sample();
        }
        return sample;
    }
}
```

```java
//多线程也行了
public class Sample {

    private static Sample sample;

    private  Sample(){
        System.out.println("创建了Sample对象");
    }

    public static synchronized Sample getInstance(){
        if(sample == null){
            sample = new Sample();
        }
        return sample;
    }
}
```

### 死锁

死锁：多个线程因为争夺统一资源，而形成的一种互斥状态，导致每个线程都无法继续执行。
如：A、B需要data1,data2,它们一人拿了一个

```java
package thread;

public class DeadLockRannable implements Runnable {
    public int num;

    private static Data data1 = new Data();
    private static Data data2 = new Data();

    @Override
    public void run() {

        if(num ==1){
            synchronized (data1){
                System.out.println(Thread.currentThread().getName()+"获取了data1,等待data2");
                try {
                    Thread.sleep(100);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }

                synchronized (data2){
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println(Thread.currentThread().getName()+"任务完成");
                }
            }
        }

        if(num ==2){
            synchronized (data2){
                System.out.println(Thread.currentThread().getName()+"获取了data2,等待data1");
                try {
                    Thread.sleep(100);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }

                synchronized (data1){
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println(Thread.currentThread().getName()+"任务完成");
                }
            }
        }
    }
}
```

```java
package thread;

public class Test9 {
    public static void main(String[] args) {
        DeadLockRannable rannable1 = new DeadLockRannable();
        rannable1.num=1;
        DeadLockRannable rannable2 = new DeadLockRannable();
        rannable2.num=2;
        Thread thread1 = new Thread(rannable1,"Thread1");
        Thread thread2 = new Thread(rannable2,"Thread2");
        thread1.start();
        thread2.start();
    }
}
//卡住
```
