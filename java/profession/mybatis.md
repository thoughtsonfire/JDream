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

    <settings>
        <!--打印SQL-->
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>

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

```xml [config.xml]{29-35}
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <settings>
        <!--打印SQL-->
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>

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
        <!-- 单个文件注册 -->
        <mapper resource="com/test/mapper/AccountMapper.xml" />
        <!-- 也可以，注册整个文件夹自动扫描 -->
        <!-- <package name="com.test.repository"/> -->
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

```xml {23-27}
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

## 语法

### 标签

#### insert

insert 标签表示只想添加操作。

#### select

select 标签表示执行查询操作。

#### update

update 标签表示执行更新操作。

#### delete

delete 标签表示执行删除操作。

#### id

> [!NOTE] id 标签
>
> `<id>`：表示主键字段
>
> `<result>`：表示普通字段
>
> 为什么主键要单独用`id`
>
> 标识唯一对象.
>
> 如果主键也写 `<result>` 可以吗？
>
> 可以
>
> 复杂映射，mybatis判断同一对象更麻烦

#### association

> [!NOTE] association 标签
>
> 是 MyBatis 结果映射（resultMap）中的标签，用于处理一对一关联关系。
>
> 一个对象里面包含另一个对象时，用 association。
>
> | 属性      | 作用                |
> | --------- | ------------------- |
> | property  | Java对象属性名      |
> | javaType  | 关联对象类型        |
> | select    | 调用另一个查询      |
> | column    | 传给select的字段    |
> | resultMap | 指定另一个resultMap |
>
> **嵌套查询**
>
> :::code-group
>
> ```xml
> <resultMap id="studentMap" type="Student">
>
>    <id property="id" column="id"/>
>
>    <result property="name" column="name"/>
>
>
>    <association
>        property="clazz"
>        javaType="Clazz"
>        select="selectClazz"
>        column="clazz_id"/>
>
> </resultMap>
> ```
>
> ```xml
> <select id="selectClazz" resultType="Clazz">
>
>    select *
>    from clazz
>    where id=#{id}
>
> </select>
> ```
>
> :::
>
> 多参，字段映射
>
> `column="{classId=class_id,schoolId=school_id}"`
>
> `column="{Java参数名=数据库字段}"`
>
> 结果字段映射，可以用`resultMap`
>
> ` <association property="clazz" resultMap="clazzMap"/>`

#### collection

> [!NOTE] collection 标签
>
> collection 是 MyBatis resultMap 中用于处理一对多关系映射的标签。
>
> 简单理解：
>
> 一个对象里面包含一个集合（List、Set）时，用 collection。
>
> 对应关系：
>
> - association → 一个对象里面嵌套一个对象（一对一）
> - collection → 一个对象里面嵌套一个集合（一对多）
>
> 嵌套查询
>
> :::code-group
>
> ```xml
> <resultMap id="clazzMap" type="Clazz">
>
>    <id property="id" column="id"/>
>
>    <result property="name" column="name"/>
>
>
>    <collection
>        property="students"
>        ofType="Student"
>        select="selectStudents"
>        column="id"/>
>
> </resultMap>
> ```
>
> ```xml
> <select id="selectStudents" resultType="Student">
>
>    select *
>    from student
>    where clazz_id=#{id}
>
> </select>
> ```
>
> :::

|          | association     | collection       |
| -------- | --------------- | ---------------- |
| 关系     | 一对一          | 一对多           |
| Java字段 | 对象            | 集合             |
| 示例     | Student → Clazz | Clazz → Students |
| 属性     | javaType        | ofType           |
| 标签内部 | result          | result           |
| 常见问题 | N+1             | 数据重复         |

####

### 属性

#### parameterType

入参（parameterType）,现在很多项目都省略。

> 1.  不写 parameterType（推荐）
>
> Mapper:
>
> ```xml
> <select id="selectById" resultType="com.test.User">
>    select *
>    from user
>    where id = #{id}
> </select>
> ```
>
> 接口:
>
> ```java
> User selectById(Long id);
> ```
>
> MyBatis 会根据接口方法参数自动推断类型。

> 2.  写 parameterType
>
> 以前常见：
>
> ```xml
> <select id="selectById"
>        parameterType="java.lang.Long"
>        resultType="com.test.User">
>    select *
>    from user
>    where id = #{id}
> </select>
> ```
>
> 也可以运行。

> 3. 多参数时要注意
>
> 比如：
>
> ```java
> User selectByIdAndName(Long id, String name);
> ```
>
> XML:
>
> ```xml
> <select id="select">
>    select *
>    from user
>    where id = #{id}
>    and name = #{name}
> </select>
> ```
>
> 这里如果没有加：
>
> ```java
> @Param
> ```
>
> 可能找不到参数名。
>
> 所以要这样写（可读性差）
>
> ```xml
> <select id="select">
>    select *
>    from user
>    where id = #{param1}
>    and name = #{param2}
> </select>
> ```
>
> 或
>
> ```xml
> <select id="select">
>    select *
>    from user
>    where id = #{arg1}
>    and name = #{arg2}
> </select>
> ```
>
> 推荐：
>
> ```java
> User selectByIdAndName(
>    @Param("id") Long id,
>    @Param("name") String name
> );
> ```
>
> XML：
>
> ```xml
> where id = #{id}
> and name = #{name}
> ```

> 4.  对象参数也不用写
>
> DTO：
>
> ```java
> @Data
> public class UserQueryDTO {
>    private String name;
>    private Integer age;
> }
> ```
>
> Mapper：
>
> ```java
> List<User> query(UserQueryDTO dto);
> ```
>
> XML：
>
> ```xml
> <select id="query">
>    select *
>    from user
>    <where>
>        <if test="name != null">
>            and name = #{name}
>        </if>
>    </where>
> </select>
> ```
>
> 也可以正常识别。

> 5.  哪些情况建议写？
>
> 现在一般：
> | 情况 | 建议 |
> | -------- | ------------------------------ |
> | 单个简单参数 | 不用写 |
> | DTO/VO参数 | 不用写 |
> | 多个参数 | 用 `@Param`，不用写 `parameterType` |
> | 老项目规范 | 可能要求写 |
>
> 所以 Spring Boot + MyBatis 项目里，通常只写：
>
> ```xml
> <select id="xxx" resultType="xxx">
> ```
>
> 不写：
>
> ```xml
> parameterType="xxx"
> ```

#### resultType

`resultType` 是 MyBatis Mapper XML 中 `<select>` 等标签的属性（attribute）。

作用：

> 指定 SQL 查询结果中每一条数据映射成的 Java 类型。

注意：

`resultType` 描述的是单条记录的类型，不是最终返回类型。

> MyBatis 根据 Mapper 接口方法的返回值类型，自动决定最终返回的是单个对象、List、Map 等包装形式。

不是根据 `resultType`推断，而是根据方法签名推断。

> 记忆口诀
>
> ```
> resultType 管一行数据长什么样
>
> 返回值类型管最后返回几个、怎么装
> ```
>
> 或者：
>
> ```
> resultType = 数据 → Java对象
>
> 返回值 = Java对象 → 容器形式
>
> ```

### 级联查询

#### 一对多

- entity

:::code-group

```java [Student]
package com.test.entity;

import lombok.Data;

@Data
public class Student {
    private int id;
    private String name;
    private int classId;
}

```

```java [Class]
package com.test.entity;

import lombok.Data;

@Data
public class Class {
    private int id;
    private String name;
}
```

:::

- vo

:::code-group

```java [StudentVO]
package com.test.vo;

import com.test.entity.Class;
import lombok.Data;

@Data
public class StudentVO {
    private int id;
    private String name;
    private Class clazz;
}
```

```java [ClassVO]
package com.test.vo;

import com.test.entity.Student;
import lombok.Data;

import java.util.List;

@Data
public class ClassVO {
    private int id;
    private String name;
    private List<Student> students;
}
```

:::

- repository

:::code-group

```java [StudentRepository.java]
package com.test.repository;

import com.test.vo.StudentVO;

public interface StudentRepository {
    public StudentVO findById(int id);
}
```

```xml [StudentRepository.xml]
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="com.test.repository.StudentRepository">
    <resultMap id="studentMap" type="com.test.vo.StudentVO">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <association property="clazz" javaType="com.test.entity.Class">
            <id column="c_id" property="id" />
            <result column="c_name" property="name" />
        </association>
    </resultMap>
    <select id="findById" resultMap="studentMap">
        select s.id,s.name,c.id as c_id,c.name as c_name from student s,class c where s.id=#{id} and s.class_id = c.id
    </select>
</mapper>
```

```java [ClassRepository.java]
package com.test.repository;

import com.test.vo.ClassVO;

public interface ClassRepository {
    ClassVO getClassById(int id);
}
```

```xml [ClassRepository.xml]
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="com.test.repository.ClassRepository">
    <resultMap id="classMap" type="com.test.vo.ClassVO">
        <id property="id" column="cid" />
        <result property="name" column="cname" />
        <collection property="students" ofType="com.test.entity.Student">
            <id property="id" column="id"/>
            <result property="name" column="name" />
            <result property="classId" column="class_id" />
        </collection>
    </resultMap>



    <select id="getClassById" resultMap="classMap">
        select c.id as cid,c.name as cname,s.id,s.name from class c inner join student s on c.id = s.class_id where c.id = #{id}
    </select>
</mapper>
```

:::

**相关标签**

- [`<id/>`](#id)
- [`<association/>`](#association)
- [`<collection/>`](#collection)

#### 多对多

- sql

:::code-group

```sql [customer]
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户id',
  `name` varchar(255) DEFAULT NULL COMMENT '客户姓名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户表';
```

```sql [goods]
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

```sql [customer_goods]
CREATE TABLE `customer_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cid` int(11) NOT NULL COMMENT '客户id',
  `gid` int(11) NOT NULL COMMENT '商品id',
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  KEY `gid` (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

:::

- entity

:::code-group

```java [Customer]
package com.test.entity;

import lombok.Data;

@Data
public class Customer {
    private int id;
    private String name;
}
```

```java [Goods]
package com.test.entity;

import lombok.Data;

@Data
public class Goods {
    private int id;
    private String name;
}
```

```java [CustomerGoods]
package com.test.entity;

import lombok.Data;

@Data
public class CustomerGoods {
    private int id;
    private int cid;
    private int gid;
}
```

:::

- vo

:::code-group

```java [CustomerVO]
package com.test.vo;

import com.test.entity.Goods;
import lombok.Data;

import java.util.List;

@Data
public class CustomerVO {
    private int id;
    private String name;
    private List<Goods> goods;
}
```

```java [GoodsVO]
package com.test.vo;

import com.test.entity.Customer;
import lombok.Data;

import java.util.List;

@Data
public class GoodsVO {
    private int id;
    private String name;
    private List<Customer> customers;
}
```

:::

- repository

:::code-group

```java [CustomerRepository.java]
package com.test.repository;

import com.test.vo.CustomerVO;

public interface CustomerRepository {
    public CustomerVO findCustomerById(int id);
}
```

```xml [CustomerRepository.xml]
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="com.test.repository.CustomerRepository">
    <resultMap id="CustomerMap" type="com.test.vo.CustomerVO">
        <id column="id" property="id" />
        <result property="name" column="name" />
        <collection property="goods" ofType="com.test.entity.Goods">
            <id column="gid" property="id" />
            <result property="name" column="gname" />
        </collection>
    </resultMap>
    <select id="findCustomerById" resultMap="CustomerMap">
        select c.id,c.name,g.id as gid,g.name as gname
        from customer c
        left join customer_goods cg on c.id = cg.cid
        left join goods g on cg.gid = g.id
        where c.id = #{id}
    </select>
</mapper>
```

```java [GoodsRepository.java]
package com.test.repository;

import com.test.vo.GoodsVO;

public interface GoodsRepository {
    public GoodsVO findGoodsById(int id);
}
```

```xml [GoodsRepository.xml]
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="com.test.repository.GoodsRepository">

    <resultMap id="GoodsMap" type="com.test.vo.GoodsVO">
        <id column="id" property="id"/>
        <result property="name" column="name"/>
        <collection property="customers" ofType="com.test.entity.Customer">
            <id column="cid" property="id"/>
            <result property="name" column="cname"/>
        </collection>
    </resultMap>

    <select id="findGoodsById" resultMap="GoodsMap">
        select g.id,g.name,c.id as cid,c.name as cname
        from goods g
        left join customer_goods gc on g.id = gc.gid
        left join customer c on gc.cid = c.id
        where g.id = #{id}
    </select>
</mapper>
```

:::

- 相关知识 [`连接查询 SQL JOIN`](/sql/mysql/basicUsage.html#join)

## 延迟加载

- 什么是延迟加载？

延迟加载也叫懒加载、惰性加载，使用延迟加载可以提高程序的运行效率，针对数据持久层的操作，在某些特定的情况下去访问特定的数据库，在其他情况下可以不访问某些表，从一定程度上减少Java应用与数据库的交互次数。

查询学生和班级的时候，学生和班级是两张不同的表，如果当前需求只获取学生的信息，那么查询学生单表即可，如果需要通过学生获取对应的班级信息，则必须查询两张表。

不同业务需求，需要查询不同的表，根据具体业务需求来动态减少查询的工作就是延迟加载。

- 在配置文件中开启懒加载

```xml [config] {13}
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <settings>
        <!--打印SQL-->
        <setting name="logImpl" value="STDOUT_LOGGING"/>
        <!--开启延迟加载-->
        <setting name="lazyLoadingEnabled" value="true"/>
    </settings>

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
<!--        <mapper resource="com/test/mapper/AccountMapper.xml" />-->
<!--        <mapper resource="com/test/repository/AccountRepository.xml" />-->
<!--        <mapper resource="com/test/repository/StudentRepository.xml" />-->
<!--        <mapper resource="com/test/repository/ClassRepository.xml" />-->
<!--        <mapper resource="com/test/repository/CustomerRepository.xml" />-->
<!--        <mapper resource="com/test/repository/GoodsRepository.xml" />-->
        <package name="com.test.repository"/>
    </mappers>
</configuration>
```

- 使用嵌套查询，系统自动判断需不需要后续查询

::: code-group

```xml [StudentRepository.xml]
    <resultMap id="StudentLazyMap" type="com.test.vo.StudentVO">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <association property="clazz" javaType="com.test.entity.Class" column="class_id" select="com.test.repository.ClassRepository.findClassById" />
    </resultMap>
    <select id="findByIdLazy" resultMap="StudentLazyMap">
        select * from student where id = #{id}
    </select>
```

```xml [ClassRepository.xml]
    <select id="findClassById" resultType="com.test.entity.Class">
        select * from class where id = #{id}
    </select>
```

```java [StudentTest.java]
package com.test;

import com.test.repository.StudentRepository;
import com.test.vo.StudentVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

public class StudentTest {
    public static void main(String[] args) {
        //加载 MyBatis 配置文件
        InputStream resourceAsStream = Test.class.getClassLoader().getResourceAsStream("config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(resourceAsStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        //获取实现接口的代理对象
        StudentRepository mapper = sqlSession.getMapper(StudentRepository.class);
        StudentVO student = mapper.findByIdLazy(1);
        System.out.println(
                student.getName()
        );
        sqlSession.close();
    }
}

```

:::

输出：

```bash
==>  Preparing: select * from student where id = ?
==> Parameters: 1(Integer)
<==    Columns: id, name, class_id
<==        Row: 1, 张三, 1
<==      Total: 1
张三
```

只调用一次sql

相关知识 [`<association/>`](#association)

## MyBatis 缓存

- 什么是MyBatis 缓存

使用缓存可以减少Java应用与数据库的交互次数，从而提升程序的运行效率。比如查询出 id=1 的对象，第一次查询出来之后会自动将该对象保存到缓存中，当下一次查询时，直接从缓存中取出对象即可，无需再次访问数据库。

- MyBatis 缓存分类

### 一级缓存

一级缓存：SqlSession 级别，默认开启，并且不能关闭。

操作数据库时需要创建SqlSession对象，在对象中有一个HashMap 用于存储缓存数据，不同的SqlSession 之间缓存数据区域互不影响。

一级缓存的作用域是SqlSession 范围的，当在同一个SqlSession 中执行两次相同的SQL 语句时，第一次执行完毕会将结果保存到缓存中，第二次查询时直接从缓存中获取。

需要注意的是，如果SqlSession执行了DML操作（insert、update、delete），MyBatis 必须将缓存清空以保证数据的准确性。

```java
package com.test;

import com.test.entity.Account;
import com.test.repository.AccountRepository;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;
import java.util.List;

public class AccountTest {
    public static void main(String[] args) {
        //加载 MyBatis 配置文件
        InputStream resourceAsStream = Test.class.getClassLoader().getResourceAsStream("config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(resourceAsStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        //获取实现接口的代理对象
        AccountRepository mapper = sqlSession.getMapper(AccountRepository.class);
        List<Account> accounts = mapper.findAll();
        List<Account> accounts1 = mapper.findAll();
        //两个实际只调用了一次sql
        System.out.println(accounts);
        System.out.println(accounts1);

        sqlSession.close();
    }
}
```

### 二级缓存

二级缓存：Mapper级别，默认关闭，可以开启。

使用二级缓存时，多个SqlSession使用同一个Mapper的SQL语句操作数据库，得到的数据会存在二级缓存区，同样是使用HashMap进行数据存储，相比较于一级缓存，二级缓存的范围更大，多个SqlSession可以共用二级缓存，二级缓存是跨SqlSession的。

二级缓存是多个SqlSession共享的，其作用域是Mapper的同一个namespace,不同的SqlSession再次执行相同的namespace下的SQL语句，参数也相等，则第一次执行成功之后会将数据保存到二级缓存中，第二次可直接从二级缓存中取出数据。

> [!Note] MyBatis 自带的二级缓存
>
> 1.  config.xml 配置开启二级缓存
>
> ```xml [config.xml]
>     <!--开启二级缓存-->
>     <setting name="cacheEnabled" value="true"/>
> ```
>
> 2.  Mapper.xml 中配置二级缓存
>
> 就添加个`<cache/>`标签就行
>
> ```xml [AccountRepository]{9-10}
> <?xml version="1.0" encoding="UTF-8" ?>
>
> <!DOCTYPE mapper
>        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
>        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
>
>
> <mapper namespace="com.test.repository.AccountRepository">
>    <!--添加二级缓存-->
>    <cache/>
>
>    <insert id="save">
>        insert into t_account(username,password,age) values(#{username},#{password},#{age})
>    </insert>
>    <update id="update">
>        update t_account set username = #{username},password = #{password},age=#{age} where id = #{id}
>    </update>
>    <delete id="delete">
>        delete from t_account where id = #{id}
>    </delete>
>    <select id="findAll" resultType="com.test.entity.Account">
>        select * from t_account
>    </select>
>    <select id="findById" resultType="com.test.entity.Account">
>        select * from t_account where id = #{id}
>    </select>
>    <select id="findByNameAndAge" resultType="com.test.entity.Account">
>        select * from t_account where username = #{arg0} and age = #{arg1}
>    </select>
> </mapper>
> ```
>
> 3.  实体类序列化
>
> ```java [Account]
> package com.test.entity;
>
> import lombok.Data;
>
> import java.io.Serializable;
>
> @Data
> public class Account implements Serializable {
>    private long id;
>    private String username;
>    private String password;
>    private int age;
> }
> ```
>
> 例子：
>
> ```java [AccountTest]
> package com.test;
>
> import com.test.entity.Account;
> import com.test.repository.AccountRepository;
> import org.apache.ibatis.session.SqlSession;
> import org.apache.ibatis.session.SqlSessionFactory;
> import org.apache.ibatis.session.SqlSessionFactoryBuilder;
>
> import java.io.InputStream;
> import java.util.List;
>
> public class AccountTest {
>    public static void main(String[] args) {
>        //加载 MyBatis 配置文件
>        InputStream resourceAsStream = Test.class.getClassLoader().getResourceAsStream("config.xml");
>        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
>        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(resourceAsStream);
>        SqlSession sqlSession = sqlSessionFactory.openSession();
>
>        //获取实现接口的代理对象
>        AccountRepository mapper = sqlSession.getMapper(AccountRepository.class);
>        List<Account> accounts = mapper.findAll();
>        List<Account> accounts1 = mapper.findAll();
>        System.out.println(accounts);
>        System.out.println(accounts1);
>
>        sqlSession.close();
>
>        sqlSession = sqlSessionFactory.openSession();
>        mapper = sqlSession.getMapper(AccountRepository.class);
>        accounts = mapper.findAll();
>        System.out.println(accounts);
>        sqlSession.close();
>    }
> }
> ```
>
> 结果：
>
> 总共只调用了一次sql，sqlSession关闭重启，缓存还在

> [!NOTE] 第三方 Ehcache
>
> 1.  安装依赖
>
> ```xml [pom.xml]
>        <!--ehcache二级缓存-->
>        <dependency>
>            <groupId>org.mybatis</groupId>
>            <artifactId>mybatis-ehcache</artifactId>
>            <version>1.0.0</version>
>        </dependency>
> ```
>
> 2.  添加ehcache.xml 配置文件
>
> ```xml
> <?xml version="1.0" encoding="UTF-8" ?>
>
> <ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
>    <diskStore/>
>    <!-- 默认缓存配置 -->
>    <defaultCache
>            maxElementsInMemory="1000"
>            maxElementsOnDisk="10000000"
>            eternal="false"
>            overflowToDisk="true"
>            timeToIdleSeconds="300"
>            timeToLiveSeconds="600"
>            diskExpiryThreadIntervalSeconds="120"
>            memoryStoreEvictionPolicy="LRU"/>
>
> </ehcache>
> ```
>
> 3.  config.xml 配置开启二级缓存
>
> ```xml
>    <!--开启二级缓存-->
>    <setting name="cacheEnabled" value="true"/>
> ```
