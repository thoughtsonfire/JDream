# Mybatis

## 概述

简单理解，MyBatis 就是对JDBC进行封装。

MyBatis是apache的一个开源项目iBatis,后续迁移改名MyBatis。

> [!TIP]
>
> ORMapping:Object Relationship Mapping 对象关系映射
>
> 对象指面向对象
>
> 关系指关系型数据库
>
> 如Java到Mysql的映射，开发者可以以面向对象的思想来管理数据库

## 创建简单maven项目

![代替图片](/public/imgs/java/create_easy_maven_project.png)

**添加mybatis依赖，mysql数据库连接依赖**

```xml [pom.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.test</groupId>
    <artifactId>learnmybatis</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.5</version>
        </dependency>
        <!--mysql-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.6</version>
        </dependency>
        <!-- lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.16</version>
        </dependency>
    </dependencies>

</project>
```

## 创建练习用的数据库表

- 建库

```sql
create database mybatis;
```

- 建表

```sql
use mybatis;
create table t_account(
    id int primary key auto_increment,
    username varchar(11),
    password varchar(11),
    age int
)
```
