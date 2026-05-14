# Java 概述

## 行情

Java是目前国内IT研发岗位最多的

主要岗位，web服务端开发

国内，web服务端java是第一，java生态、应用案例，在这一块强很多，这个是先发优势和时间积累的，

企业的实践证明了可靠性，也提供了很多优秀的业务处理方案

Spring 框架的积累

## 开发版本

企业主流 jdk版本 任然是 8

企业的旧代码，旧业务的历史负担，为了稳定，基本就使用jdk8

比如：分布式业务 阿里的seata,只支持jdk8

Spring Boot 2.X 支持jdk8

Spring Boot 3.X 不支持jdk8

企业版本有一定的滞后性

MYSQL 5/8

Redis 缓存数据库

Spring Cloud 微服务

Java 基础 打基础 单机

JavaWeb 用Java做web开发，Servlet,Java EE，旧项目的维护可能用到

框架

Spring 全家桶

Spring、SSM、MyBatis Plus、Shiro、Spring Boot、Spring Cloud

实操

做项目

## JDK

JDk: Java Development Kit (Java 开发工具包)

JRE: Java Runtime Environment (Java 运行环境)

只需要运行Java 项目，安装JRE

需要开发Java项目，必须安装JDK,包含JRE

Java 不是解释型语言

Java 需要先编译成字节码文件，再通过JVM(Java虚拟机) 对字节码文件进行进一步的解析，
生成机器码，底层操作系统才能识别机器猫进行程序运行

为啥Java需要先编译？

为了实现跨平台

如何实现跨平台

通过编译的方式
java源代码编译成字节码文件
字节码文件分别放到不同操作系统中，由JVM将它们解析成对应操作系统的机器码，进行执行

test.java->test.class->运行

Java 源代码编译成字节码的命令是什么？

```bash
    javac test.java
```

Java 字节码运行的命令是什么？

```bash
    java test
```

这两个都省略了，开发工具帮我执行

## 基础

### 1. Java基础

变量、运算符、数组、流程控制

### 2. Java面向对象

封装、继承、多态、接口

### 3. Java核心类库

集合、实用类

### 4. Java并发

多线程、IUC

### 5. Java 高级

IO 流、Java 网络编程
