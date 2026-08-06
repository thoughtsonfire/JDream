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
