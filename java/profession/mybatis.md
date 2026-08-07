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

aaa
