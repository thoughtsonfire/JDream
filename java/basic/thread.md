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

### 重入锁

ReentrantLock 是对 synchronized的升级，synchronized是通过JVM实现，ReentrantLock是通过JDK实现（用方法调用的形式来使用）

重入锁的特点是可以重复上锁

synchronized 是自动上锁，自动解锁

ReentrantLock 是手动上锁，手动解锁，可以上多次锁，解锁也需要多次

```java
import java.util.concurrent.locks.ReentrantLock;

public class UseReentrantLockRannable implements Runnable{

    private static int num;

    private ReentrantLock reentrantLock = new ReentrantLock();

    @Override
    public void run() {
        reentrantLock.lock();
        num++;
        try{
            Thread.sleep(1);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
        System.out.println(Thread.currentThread().getName() + "是当前的第" + num + "位访客");
        reentrantLock.unlock();
    }
}
```

```java
public class Test10 {
    public static void main(String[] args) {
        UseReentrantLockRannable useReentrantLockRannable = new UseReentrantLockRannable();

        Thread thread1 = new Thread(useReentrantLockRannable,"张三");
        Thread thread2 = new Thread(useReentrantLockRannable,"李四");

        thread1.start();
        thread2.start();
    }
}
```

`ReentrantLock` 还具备限时性的特点，指可以判断某个线程在一定时间内能否获取锁

`tryLock(Long timeout,TimeUnit unit)`

```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class TimeLock implements Runnable{

    private ReentrantLock reentrantLock = new ReentrantLock();

    @Override
    public void run() {
        try{
            if(reentrantLock.tryLock(3, TimeUnit.SECONDS)){
                System.out.println(Thread.currentThread().getName() + "获取到了锁");
                Thread.sleep(5000);
            }
        }catch (InterruptedException e){
            e.printStackTrace();
        }finally {
            if(reentrantLock.isHeldByCurrentThread()){
                reentrantLock.unlock();
            }
        }
    }
}
```

```java
public class Test11 {
    public static void main(String[] args) {
        TimeLock timeLock = new TimeLock();
        Thread t1 = new Thread(timeLock,"张三");
        Thread t2 = new Thread(timeLock,"李四");
        t1.start();
        t2.start();
    }
}
```

### 生产者消费者模式

```java
package product_custom_model;

public class Hamburger {
    private int id;

    public Hamburger(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Hamburger{" +
                "id=" + id +
                '}';
    }
}
```

```java
package product_custom_model;

public class Container {
    public Hamburger[] array = new Hamburger[6];
    public int index = 0;

    public synchronized void push(Hamburger hamburger) {
        while (index == array.length) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        this.notify();
        array[index] = hamburger;
        index++;
        System.out.println("生产了一个汉堡"+hamburger);
    }
    public synchronized Hamburger pop() {
        while (index == 0) {
            try{
                this.wait();
            }catch (InterruptedException e){
                e.printStackTrace();
            }
        }
        this.notify();
        index--;
        System.out.println("消费一个汉堡"+array[index]);
        return array[index];
    }
}
```

```java
package product_custom_model;

public class Producer implements Runnable {

    private Container container;

    public Producer(Container container) {
        this.container = container;
    }

    @Override
    public void run() {
        for (int i = 0; i < 30; i++) {
            Hamburger hamburger = new Hamburger(i);
            this.container.push(hamburger);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
```

```java
package product_custom_model;

public class Customer implements Runnable{

    private Container container;

    public Customer(Container container) {
        this.container = container;
    }

    @Override
    public void run() {
        for (int i = 0; i < 30; i++) {
            this.container.pop();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```

```java
package product_custom_model;

public class Test {
    public static void main(String[] args) {
        Container container = new Container();
        Producer producer = new Producer(container);
        Customer customer = new Customer(container);
        new Thread(producer).start();
        new Thread(producer).start();
        new Thread(customer).start();
    }
}
```

### sleep和wait

sleep 和 wait 的功能类似，都是让线程暂停执行任务。

sleep 是Thread 类提供的方法，wait是Object 类提供的方法

sleep 是直接作用于线程对象本身的，wait 作用于线程正在访问的资源

调用A对象的wait： 让当前正在访问A对象的线程休眠，同时它有一个前提，当前线程必须拥有A对象，所以wait方法只能在同步方法或同步代码块中调用。

wait 会释放锁，sleep不会释放锁

```java
package wait;

import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        A a = new A();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                a.test(i);
            }
        }).start();
    }
}

class A {
    public synchronized void test(int i){
        if(i ==5){
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println(i+"________________");
    }
}
```

- i==5，调用A的wait方法，会让正在访问A的线程休眠，并且永远不会解除阻塞。

如何让线程解除阻塞？

1. 指定wait的时间，wait(long millis),millis 之后会自动解除阻塞，类似sleep

wait 来自 Object

A 继承了Object，A中自带wait方法

sleep 是来自 Thread 的静态方法

2. 通过调用notify 方法唤醒线程

```java
package wait;

import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        A a = new A();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                a.test(i);
            }
        }).start();

        new Thread(()->{
            try {
                TimeUnit.SECONDS.sleep(7);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            a.test2();
        }).start();
    }
}

class A {
    public synchronized void test(int i){
        if(i ==5){
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println(i+"________________");
    }

    public synchronized void test2(){
        this.notify();
    }
}
```

无论 wait 还是notify方法，都必须放到同步方法或者同步代码块中才能正常调用，否则会抛出异常。

### synchronized 锁定的是谁

> synchronized 修饰非静态方法，锁定的是方法的调用者

```java
package _synchronized;

import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        Data data = new Data();
        new Thread(() -> {
            data.func1();
        },"A").start();

        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        new Thread(() -> {
            data.func2();
        },"B").start();
    }
}

class Data {
    public synchronized void func1(){
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("1...");
    }
    public synchronized void func2(){
        System.out.println("2...");
    }
}

// 1...
// 2...
```

首先判断方法是否添加了`synchronized`关键字，如果没有添加，则不需要考虑线程同步的问题，如果添加了，则需要考虑线程同步的问题，看当前锁定的资源在内存中有几分，如果只有一份，则多个线程会同步，如果有多分，则多个线程不需要同步。

> 如果`synchronized`修饰的是静态方法，则锁定的是类，无论有多少个对象，都会同步

```java
package _synchronized;

import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        Data data1 = new Data();
        Data data2 = new Data();
        new Thread(() -> {
            data1.func1();
        },"A").start();

        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        new Thread(() -> {
            data2.func2();
        },"B").start();
    }
}

class Data {
    public synchronized static void func1(){
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("1...");
    }
    public synchronized static void func2(){
        System.out.println("2...");
    }
}
```

> 如果synchronized 静态方法和实例方法同时存在，静态方法锁定的是类，实例方法锁定的是对象。

```java
package _synchronized;

import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        Data data1 = new Data();
        Data data2 = new Data();
        new Thread(() -> {
            data1.func1();
        },"A").start();

        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        new Thread(() -> {
            data1.func2();
        },"B").start();
    }
}

class Data {
    public synchronized static void func1(){
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("1...");
    }
    public synchronized  void func2(){
        System.out.println("2...");
    }
}
// 2...
// 1...
```

> 如果synchronized 修饰的是代码块，则锁定的是传入的对象。

```java
package _synchronized;

import java.util.concurrent.TimeUnit;

public class Test2 {
    public static void main(String[] args) {
        Data2 data2 = new Data2();
        for (int i = 0; i < 5; i++) {
            Integer num = Integer.valueOf(i);
            new Thread(()->{
                data2.func(num);
            }).start();
        }
    }
}

class Data2 {
    public void func(Integer num){
        synchronized (num){
            System.out.println("start...");
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("end...");
        }
    }
}

// start...
// start...
// start...
// start...
// start...
// end...
// end...
// end...
// end...
// end...
```

```java
package _synchronized;

import java.util.concurrent.TimeUnit;

public class Test2 {
    public static void main(String[] args) {
        Data2 data2 = new Data2();
        for (int i = 0; i < 5; i++) {
            Integer num = 1;
            new Thread(()->{
                data2.func(num);
            }).start();
        }
    }
}

class Data2 {
    public void func(Integer num){
        synchronized (num){
            System.out.println("start...");
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("end...");
        }
    }
}
// start...
// end...
// start...
// end...
// start...
// end...
// start...
// end...
// start...
// end...
```

### ConcurrentModificationException 并发修改异常

ArrayList 是线程不安全的集合，当多个线程同时操作集合时，会出现数据不准确的情况

如何解决？

1. 将ArrayList 替换成线程安全的集合Vector

```java [ArrayList]
    public boolean add(E e) {
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }
```

```java [Vector]
    public synchronized boolean add(E e) {
        modCount++;
        ensureCapacityHelper(elementCount + 1);
        elementData[elementCount++] = e;
        return true;
    }
```

2. 使用Collections.synchronizedList

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        List<String> list = Collections.synchronizedList(new ArrayList<String>());

        for (int i = 0; i < 10; i++) {
            new Thread(()->{
                try {
                    TimeUnit.MILLISECONDS.sleep(1);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                list.add("1");
                System.out.println(list);
            }).start();
        }
    }
}
```

3. JUC 工具类 CopyOnWriteArrayList

java.util.concurrent JDK的一个包，存放的都是关于并发的工具类

CopyOnWriteArrayList 写时复制,当我们往一个容器中添加元素的时候，不直接往当前容器中添加，而是将当前容器进行复制，向新容器中添加元素，添加完成之后，再将原容器的引用指向新容器

可以对CopyOnWrite容器进行并发的读，而不需要加锁，因为当前容器不会添加任何元素，添加元素都是针对复制出来的新集合进行操作，所以CopyOnWrite容器也是一种读写分离的思想，读和写操作的是不同的容器。（读的时候，要么读到旧地址，要么读到新地址，因为 Java 规范保证对象引用的读写是原子的，这是 JVM 和 CPU 共同保证的）

```java
    public boolean add(E e) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] elements = getArray();
            int len = elements.length;
            Object[] newElements = Arrays.copyOf(elements, len + 1);
            newElements[len] = e;
            setArray(newElements);
            return true;
        } finally {
            lock.unlock();
        }
    }
```

```java
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        List<String> list = new CopyOnWriteArrayList<>();

        for (int i = 0; i < 10; i++) {
            new Thread(()->{
                try {
                    TimeUnit.MILLISECONDS.sleep(1);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                list.add("1");
                System.out.println(list);
            }).start();
        }
    }
}
```

## JUC 并发编程工具包

java.util.concurrent JDK的一个包，存放的都是关于并发的工具类

### CountDownLatch

减法计数器，JUC的工具类，可以用来倒计时，当两个线程同时执行时，如果我们要确保一个线程先执行，设置一个计数器，当计数器清零的时候，再执行另一个线程。

```java
import java.util.concurrent.CountDownLatch;

public class CountDownLatchTest {
    public static void main(String[] args) {

        CountDownLatch countDownLatch = new CountDownLatch(100);
        new Thread(()->{
            for (int i = 0; i < 100; i++) {
                System.out.println("++++++++++++++Thread");
                countDownLatch.countDown();
            }
        }).start();

        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        for (int i = 0; i < 100; i++) {
            System.out.println("main------------------------");
        }
    }
}
```

### CyclicBarrier

加法计数器

```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierTest {
    public static void main(String[] args) {
        CyclicBarrier cyclicBarrier = new CyclicBarrier(10,()->{
            System.out.println("放行");
        });

        for (int i = 0; i < 30; i++) {
            final int temp = i;
            new Thread(()->{
                System.out.println("-->" + temp);

                try {
                    cyclicBarrier.await();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                } catch (BrokenBarrierException e) {
                    throw new RuntimeException(e);
                }
            }).start();
        }
    }
}
//输出三次放行
```

### Semaphore

计数信号量，实际开发中主要用来完成限流操作，即限制可以访问某些资源的线程数量。

- 初始化
- 获取许可
- 释放

```java
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

public class SemaphoreTest {
    public static void main(String[] args) {
        Semaphore semaphore = new Semaphore(5);

        for (int i = 0; i < 15; i++) {
            new Thread(()->{
                try {
                    semaphore.acquire();
                    System.out.println(Thread.currentThread().getName()+"进店消费...");
                    TimeUnit.SECONDS.sleep(2);
                    System.out.println(Thread.currentThread().getName()+"出店...");
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }finally {
                    semaphore.release();
                }
            },String.valueOf(i)).start();
        }
    }
}
// 1进店消费...
// 2进店消费...
// 0进店消费...
// 3进店消费...
// 6进店消费...
// 1出店...
// 0出店...
// 6出店...
// 2出店...
// 3出店...
// 10进店消费...
// 5进店消费...
// 4进店消费...
// 7进店消费...
// 11进店消费...
// 7出店...
// 11出店...
// 5出店...
// 4出店...
// 10出店...
// 13进店消费...
// 12进店消费...
// 9进店消费...
// 8进店消费...
// 14进店消费...
// 13出店...
// 12出店...
// 8出店...
// 14出店...
// 9出店...
```

### ReentrantReadWriteLock

读写锁

接口 ReadWriteLock, 实现类ReentrantReadWriteLock，可以多线程同时读，但是同一时间只能有一个线程进行写入操作。

```java
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReadWriteLockTest {
    public static void main(String[] args) {
        Cache cache = new Cache();
        for (int i = 0; i < 5; i++) {
            //Lambda 捕获的是局部变量的值，而不是变量本身。
            //Lambda 表达式只能捕获 final 或 effectively final 的局部变量
            final int temp = i;
            new Thread(()-> {
                cache.write(temp,String.valueOf(temp));
            }).start();
        }
        for (int i = 0; i < 5; i++) {
            final int temp = i;
            new Thread(()-> {
                cache.read(temp);
            }).start();
        }
    }
}

class Cache{
    private Map<Integer,String> map = new HashMap<>();
    ReadWriteLock lock = new ReentrantReadWriteLock();

    //写操作
    public void write(Integer key,String value){
        lock.writeLock().lock();
        System.out.println(key + "开始写入");
        map.put(key,value);
        System.out.println(key + "写入完毕");
        lock.writeLock().unlock();
    }

    //读操作
    public void read(Integer key){
        lock.readLock().lock();
        System.out.println(key + "开始读取");
        map.get(key);
        System.out.println(key + "读取完毕");
        lock.readLock().unlock();
    }
}
```

### ForkJoin 框架

ForkJoin 框架是JDK1.7 之后提供的一个多线程并发处理框架，本质上是对线程池的一种补充，它的核心思想是将一个大型任务拆分成多个小任务，分别执行，最终将小任务的结果进行汇总，形成最终的结果。

拆分

多个任务+多个线程

- ForkJoinTask 表示任务
- ForkJoinPool 表示线程（线程池的一种扩展）

1. 创建ForkJoinTask任务，ForkJoinTask 是一个抽象类，需要创建一个类来继承ForkJoinTask子类RecursiveTask，实现抽象方法compute，拆分的逻辑写在compute方法里。

2. 任务要通过ForkJoinPool来执行，将任务直接放入ForkJoinPool中，直接获取结果即可。

```java
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.RecursiveTask;

public class ForkJoinDemo extends RecursiveTask<Long> {

    private Long start;
    private Long end;
    private Long temp = 100_0000L;

    public ForkJoinDemo(Long start, Long end) {
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        if(end - start <= temp) {
            Long sun = 0L;
            for(Long i = start;i <= end;i++) {
                sun += i;
            }
            return sun;
        }else{
            Long avg = (end + start) / 2;
            ForkJoinDemo task1 = new ForkJoinDemo(start, avg);
            ForkJoinDemo task2 = new ForkJoinDemo(avg+1, end);
            task1.fork();
            task2.fork();
            return task1.join() + task2.join();
        }

    }
}
```

```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;

public class Test1 {
    public static void main(String[] args) {
        Long sun = 0L;
        Long startTime = System.currentTimeMillis();
        ForkJoinPool forkJoinPool = new ForkJoinPool();
        ForkJoinTask<Long> task = new ForkJoinDemo(0L,20_000_000L);
        forkJoinPool.execute(task);
        try {
            sun = task.get();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
        Long endTime = System.currentTimeMillis();
        Long totalTime = endTime - startTime;
        System.out.println(sun+"消耗了"+totalTime+"毫秒");

    }
}
```

## 线程池

预先创建好一定数量的线程对象，存入缓冲池，需要用的时候直接从缓冲池中取出，用完之后不要销毁，还回到缓冲池中，供下次任务使用。

优点：

- 提高线程的利用率
- 提高响应速度
- 便于统一管理线程对象
- 可控制最大并发量

工作流程：

- 初始化线程池，创建默认数量的线程对象
- 当任务过多的时候，额外补充线程数量
- 当任务趋于正常的时候，额外补充的线程自动销毁

初始化线程数量
最大化线程数量

### 线程池的实现有三种方式：

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceTest {
    public static void main(String[] args) {
        //单例线程池，只有一个线程对象
//        ExecutorService executorService = Executors.newSingleThreadExecutor();

        //多力线程池，手动指定数量
//        ExecutorService executorService = Executors.newFixedThreadPool(5);


        //缓存线程池，根据电脑配置，自行决定线程数量
        ExecutorService executorService = Executors.newCachedThreadPool();

        for (int i = 0; i < 10; i++) {
            final int temp = i;
            executorService.execute(()->{
                System.out.println(Thread.currentThread().getName() + ":" + temp);
            });
        }
        executorService.shutdown();
    }
}
```

::: code-group

```java [newSingleThreadExecutor]
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
```

```java [newFixedThreadPool]
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>());
}
```

```java [newCachedThreadPool]
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                    60L, TimeUnit.SECONDS,
                                    new SynchronousQueue<Runnable>());
}
```

:::

### ThreadPoolExecutor

`ThreadPoolExecutor` 才是线程池的原生类

核心参数：

- corePoolSize: 核心池大小
- maximumPoolSize: 线程池最大线程数
- keepAliveTime: 空闲线程的存活时间
- unit: 时间单位
- workQueue: 阻塞队列
- threadFactory: 线程工厂
- handler: 拒绝策略

### 自定义线程池

```java
import java.util.concurrent.*;

public class CustomThreadPool {
    public static void main(String[] args) {
        ExecutorService executorService = new ThreadPoolExecutor(
                2,5,1L, TimeUnit.SECONDS,new ArrayBlockingQueue<>(3),
                Executors.defaultThreadFactory(),new ThreadPoolExecutor.AbortPolicy()
        );

        for (int i = 0; i < 8; i++) {
            executorService.execute(()->{
                try {
                    TimeUnit.MILLISECONDS.sleep(200);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                System.out.println(Thread.currentThread().getName() + "===>正在办理业务");
            });
        }
        executorService.shutdown();
    }
}
```

## volatile 关键字

```java
package _volatile;

public class SingletonDemo {
    private volatile static SingletonDemo singletonDemo;
    private SingletonDemo() {
        System.out.println("创建了singletonDemo");
    }

    public static SingletonDemo getInstance() {
        synchronized (SingletonDemo.class) {
            if (singletonDemo == null) {
                singletonDemo = new SingletonDemo();
            }
        }
        return singletonDemo;
    }

}
```

volatile 关键字的作用是可以使内存中的数据对线程可见

Java 内存模型 JMM Java Memory Model

一个线程在访问内存数据的时候，其实不是拿到数据本身，而是将数据复制保存到工作内存中，相当于使用的是一个副本，对工作内存中的数据进行修改，修改完成之后再保存到主内存中，主内存对线程不可见

```java
import java.util.concurrent.TimeUnit;

public class Test1 {
    private static Integer num = 0;
    public static void main(String[] args) {
        new Thread(()->{
            while (num==0){

            }
        }).start();
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        num = 1;
        System.out.println(num);
    }
}
```

输出1，子线程不会结束，主内存对线程不可见，子线程从主内存中取出num=0 放到工作内存中，主线程从主内存中取出num=0,放到工作内存中，执行num=1,然后将num=1还回到主内存中，但此时，子线程的工作内存中的num=0,所以循环不会结束。

解决方法

```java
private static volatile Integer num = 0;
```

直接操作主内存中的，省掉了复制到工作内存的步骤
