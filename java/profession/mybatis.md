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

## 新建数据表对应的实体类

新建entity文件夹，里面放数据表对应的实体类

```java
package com.test.entity;

import lombok.Data;

@Data
public class Accout {
    private long id;
    private String username;
    private String password;
    private int age;
}

```

## 创建mybatis的配置文件

在resource下创建mybatis的配置文件config.xml,文件名可以自定义

- 文件头部别和mapper的搞混了，这个是configuration的

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
```

- 完整配置文件

```xml [config.xml]
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!-- 配置mybatis的运行环境    -->
    <environments default="development">
        <environment id="development">
            <!-- 配置JDBC事务管理-->
            <transactionManager type="JDBC"></transactionManager>
            <!--POOLED配置JDBC数据源连接处-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc://mysql://localhost:3306/mybatis?useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
</configuration>
```

## 使用原生接口

### 新建mapper.xml文件

Mybatis框架需要开发者自定义SQL语句，写在Mapper.xml文件中，实际开发中，会为每个实体类创建对对应的Mapper.xml,定义管理该对象的SQL。

新建mapper文件夹，存放文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="com.test.mapper.AccountMapper">
    <insert id="save" parameterType="com.test.entity.Account">
        insert into t_account(username,password,age) values (#{username},#{password},#{age})
    </insert>
</mapper>
```

> 虽然namespace,没有对应的接口，但还是建议写上
> 因为 MyBatis 内部存储 SQL 的 key 本来就是：
>
> ```
> namespace.id
> ```
>
> 例如：
>
> ```java
> com.test.mapper.AccountMapper.save
> com.test.mapper.UserMapper.save
> ```
>
> 如果没有 namespace：
>
> ```
> save
> ```
>
> 容易冲突。

### 注册mapper.xml

```xml [config.xml]{23-26}
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!-- 配置mybatis的运行环境    -->
    <environments default="development">
        <environment id="development">
            <!-- 配置JDBC事务管理-->
            <transactionManager type="JDBC"/>
            <!--POOLED配置JDBC数据源连接处-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc://mysql://localhost:3306/mybatis?useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <!-- 注册mapper.xml-->
    <mappers>
        <mapper resource="com/test/mapper/AccountMapper.xml" />
    </mappers>
</configuration>
```

### 配置maven 打包读取java下的xml文件

```xml [pom.xml]
    <build>
        <resources>
            <!-- 默认资源目录 -->
            <resource>
                <directory>src/main/resources</directory>
            </resource>
            <!--扫描>src/main/java下的xml文件-->
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
    </build>
```

刷新 Maven 资源

```
右侧 Maven
    ↓
Lifecycle
    ↓
clean
    ↓
compile
```

Maven 把项目构建过程分成多个阶段（Phase），Lifecycle 就是这些阶段的集合。

clean 删除之前编译生成的文件。

相当于：

```bash
mvn clean
```

compile 编译 Java 源代码。

相当于：

```bash
mvn compile
```

| 操作                 | 是否重新编译        |
| -------------------- | ------------------- |
| 停止再运行 IDEA 项目 | 可能增量编译        |
| 修改 Java 后运行     | 通常会编译修改文件  |
| Maven compile        | 重新执行 Maven 编译 |
| Maven clean          | 删除旧编译结果      |
| Maven clean compile  | 彻底重新编译        |

### 调用mybatis原生接口

```java
package com.test;

import com.test.entity.Account;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

public class Main {
    public static void main(String[] args) {
        //加载 MyBatis 配置文件
        InputStream resourceAsStream = Main.class.getClassLoader().getResourceAsStream("config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(resourceAsStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        String statement = "com.test.mapper.AccountMapper.save";
        Account account = new Account();
        account.setUsername("admin");
        account.setPassword("123456");
        account.setAge(18);
        sqlSession.insert(statement, account);
        sqlSession.commit();
    }
}
```

> 类加载器本来主要负责加载 Java 类（.class），同时也提供了从 classpath 查找资源文件的能力。

这里是类加载器找配置文件的资源，读取成流

## 通过mapper代理实现自定义接口

- 自定义接口，定义相关业务方法。

- 编写与方法相对应的 Mapper.xml。

### 编写自定义接口

新建一个repository文件夹用来存自定义接口(实际项目里，接口写在mapper文件夹里；xml文件写在mapper/xml文件夹下，或者resources/mapper下)

```java
package com.test.repository;
import com.test.entity.Account;
import java.util.List;

public interface AccountRepostory {
    public void save(Account account);
    public void update(Account account);
    public void delete(long id);
    public List<Account> findAll();
    public Account findById(long id);
}
```

### 创造接口对应的Mapper.xml

创造接口对应的Mapper.xml，定义接口方法对应的SQL语句。

statement标签可根据SQL执行的业务选择insert、delete、update、select。

MyBatis 框架会根据规则自动创建接口实现类的代理对象。

规则：

- Mapper.xml 中 namesapce为接口的全类名。
- Mapper.xml 中 statement 的 id 为接口中对应的方法名。
- Mapper.xml 中 statement 的 parameterType 和接口中对应的方法的参数类型一致。
- Mapeer.xml 中 statement 中的 resultType 描述的是单条记录的类型，不是最终返回类型。

这里为了方便直接写在了repository 文件夹里了，实际项目，要按约定俗成的规则来

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="com.test.repository.AccountRepository">

    <insert id="save">
        insert into t_account(username,password,age) values(#{username},#{password},#{age})
    </insert>
    <update id="update">
        update t_account set username = #{username},password = #{password},age=#{age} where id = #{id}
    </update>
    <delete id="delete">
        delete from t_account where id = #{id}
    </delete>
    <select id="findAll" resultType="com.test.entity.Account">
        select * from t_account
    </select>
    <select id="findById" resultType="com.test.entity.Account">
        select * from t_account where id = #{id}
    </select>
</mapper>

```

### 注册mapper.xml

在config.xml文件中注册

```xml {26}
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!-- 配置mybatis的运行环境    -->
    <environments default="development">
        <environment id="development">
            <!-- 配置JDBC事务管理-->
            <transactionManager type="JDBC"/>
            <!--POOLED配置JDBC数据源连接处-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <!-- 注册mapper.xml-->
    <mappers>
        <mapper resource="com/test/mapper/AccountMapper.xml" />
        <mapper resource="com/test/repository/AccountRepository.xml" />
    </mappers>
</configuration>
```

### 调用接口代理对象，完成对应业务

```java
package com.test;

import com.test.entity.Account;
import com.test.repository.AccountRepository;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        //加载 MyBatis 配置文件
        InputStream resourceAsStream = Test.class.getClassLoader().getResourceAsStream("config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(resourceAsStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        //获取实现接口的代理对象
        AccountRepository accountRepository = sqlSession.getMapper(AccountRepository.class);

        List<Account> accounts = accountRepository.findAll();
        for (Account account : accounts) {
            System.out.println(account);
        }

        Account account = new Account();
        account.setUsername("super");
        account.setPassword("123456");
        account.setAge(18);
        accountRepository.save(account);
        sqlSession.commit(); //修改数据库的必须提交

        sqlSession.close();

    }
}
```
