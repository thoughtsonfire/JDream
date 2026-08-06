# Spring

Spring 框架是java 开发的行业标准

Spring 全家桶: Spring MVC、Spring Boot、Spring Cloud、Spring Data JPA、Spring Security、Spring AI

## Maven

Maven 帮助工程进行jar包管理以及父子工程构建的服务

jar 包自动管理

由Maven 自动给程序导入jar

pom.xml 中配置工程中所需的jar

Maven 有一个远程仓库，包含了所有的jar，本地只需要连接到远程仓库，就可以自动将相应的jar包下载到本地，再自动导入到工程中

Maven 默认本地仓库的位置是：

```
C:\Users\你的用户名\.m2\repository
```

![代替图片](/public/imgs/java/create_javaweb4.png)

配置仓库本地地址和仓库远程地址，这里可以看到

可以自己配镜像

```
.m2
 └── settings.xml
```

有就配置，没有就自己建`settings.xml`

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
          https://maven.apache.org/xsd/settings-1.0.0.xsd">

    <mirrors>
        <mirror>
            <id>aliyun</id>
            <name>aliyun maven</name>
            <mirrorOf>*</mirrorOf>
            <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
    </mirrors>

</settings>
```

### maven 配置

![代替图片](/public/imgs/java/maven_setting.png)

内存不足 改这里
![代替图片](/public/imgs/java/maven_setting1.png)

## Spring

```xml [pom.xml]
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.23</version>
    </dependency>
```

Spring 不是业务层框架，它是构建业务层框架的框架

Spring 提供的是底层的容器，该容器来构建业务层框架

框架本质上也是由各个对象组成的，Spring 提供的容器就是管理这些对象的

IoC:控制反转

AOP:面向切面

Spring 的两大核心组件 IoC + AOP

## IoC

将对象的创建方式进行反转，由原来的手动new 变成现在的 Spring 框架自动创建

lombok 自动创建get、set、toString等方法的工具

IoC 创建对象，只需要再配置文件中设置你要的创建对象即可

> 在xml 文件中创建bean

依赖 `spring-context` 包

```xml
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.23</version>
        </dependency>
```

在resources里面加配置文件，没有的话自己建，并且给它设置成 Sources Root

新建配置文件，选项里有 `XML Configuration File` ->`spring config` 会自动生成对应格式

- 将类配置成bean,并设置初始值

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
        <bean id="user" class="com.example.testjavaweb.User">
            <property name="id" value="1"/>
            <property name="name" value="张三"/>
            <property name="address" ref="address" />
        </bean>
        <bean id="address" class="com.example.testjavaweb.Address">
            <property name="city" value="北京" />
            <property name="country" value="中国" />
        </bean>
</beans>

```

```java [User]
package com.example.testjavaweb;

import lombok.Data;

@Data
public class User {
    private int id;
    private String name;
    private Address address;
}

```

```java [Test]
package com.example.testjavaweb;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("spring.xml");
        System.out.println(classPathXmlApplicationContext.getBean("user"));
    }
}
```

> 通过注解的方式配置

```java
package com.example.testjavaweb;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class Cat {
    @Value("kity")
    private String name;
    @Value("1")
    private int age;
    @Autowired
    private Address address;
}
```

```java
package com.example.testjavaweb;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Test1 {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext("com.example.testjavaweb");
        System.out.println(annotationConfigApplicationContext.getBean("cat"));
    }
}
```

1. 实体类必须添加注解

2. 包必须覆盖实体类

3. 注解一个类只能配一个bean ，xml一个类可以配多个bean

> 基于配置类 056 19:45

## Spring boot

### 创建项目

现在 IDEA 默认的spring boot 是 4 的 ，可以先创建后续再改pom.xml

可以先选一些基础依赖

- Developer tools

  lombok

- Web(看需求,这里写的是前后端一体的，方便测试练习的)

  Spring Web

- Template Engines

  Thymeleaf(看需求,这里写的是前后端一体的，方便测试练习的)

- SQL

  MyBit FrameWork
  Mysql Driver

> springboot 2的一些基本依赖和配置

```xml [pom.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <!-- Spring Boot版本 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.12.RELEASE</version>
        <relativePath/>
    </parent>


    <groupId>com.example</groupId>
    <artifactId>testspringboot</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>testspringboot</name>


    <properties>
        <java.version>1.8</java.version>
    </properties>


    <dependencies>

        <!-- Spring MVC + Thymeleaf -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>


        <!-- MyBatis -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.2</version>
        </dependency>


        <!-- MySQL驱动 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>


        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>


        <!-- 测试 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>


    </dependencies>


    <build>
        <plugins>

            <!-- Spring Boot打包插件 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>


        </plugins>

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

</project>
```

```yml [application.yml]
server:
  port: 9051
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/koa_db
    username: root
    password: 123456
```

### 配置

```java
@MapperScan("com.example.testspringboot.mapper")
@SpringBootApplication
public class TestspringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestspringbootApplication.class, args);
    }

}
```

`@MapperScan("com.example.testspringboot.mapper")` 将路径下的文件注入Ioc

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

> 把 src/main/java 下所有 XML 文件复制到 target/classes。

> 不推荐这么做，只是了解一下

themeleaf 模型提示加上`<html lang="en"  xmlns:th="http://www.thymeleaf.org">`

:::code-group

```java [entity.User]
import lombok.Data;

@Data
public class User {
    private Integer id;
    private String username;
    private String nickname;
    private String password;
}
```

```java [UserMapper]
 public interface UserMapper {
    public List<User> list();
}
```

```xml [UserMapper.xml]
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="com.example.testspringboot.mapper.UserMapper">
    <select id="list" resultType="com.example.testspringboot.entity.User">
        select * from user
    </select>
</mapper>
```

```java [TestspringbootApplication]
@MapperScan("com.example.testspringboot.mapper")
@SpringBootApplication
public class TestspringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestspringbootApplication.class, args);
    }

}
```

```html [resources/templates/index]
<!DOCTYPE html>

<html lang="en" xmlns:th="http://www.thymeleaf.org">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <table border>
      <tr>
        <td>id</td>
        <td>昵称</td>
      </tr>
      <tr th:each="person:${list}">
        <td th:text="${person.id}"></td>
        <td th:text="${person.username}"></td>
      </tr>
    </table>
  </body>
</html>
```

:::

## Mybits Plus

实际开发中会使用Mybits Plus 来替代 Mybits

MyBatis Plus 是基于MyBatis 进行了更加细致的封装，进一步减少代码量

Mybatis 需要开发者手动定义SQL,MyBatis Plus 可以自动生成SQL语句，不需要开发者手动编写

MyBatis Plus 除了可以自动生成SQL之外，还可以自动生成(Controller、Servie、Mapper、Entity )

Mybits Plus 依赖

```xml
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.4.3.1</version>
    </dependency>
```

Mybit Plus 逆向工程依赖

```xml
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-generator</artifactId>
        <version>3.3.2</version>
    </dependency>

    <dependency>
        <groupId>org.apache.velocity</groupId>
        <artifactId>velocity</artifactId>
        <version>1.7</version>
    </dependency>
```

Mybit Plus 自动生成代码

```java [Main]
package com.test.mybitsplus;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

public class Main {
    public static void main(String[] args) {
        AutoGenerator autoGenerator = new AutoGenerator();
        //配置数据源
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDbType(DbType.MYSQL);
        dataSourceConfig.setDriverName("com.mysql.cj.jdbc.Driver");
        dataSourceConfig.setUsername("root");
        dataSourceConfig.setPassword("123456");
        dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/koa_db?useUnicode=true&characterEncoding=utf8");
        autoGenerator.setDataSource(dataSourceConfig);
        //全局配置（将来生成的文件放哪里）
        GlobalConfig globalConfig = new GlobalConfig();
        globalConfig.setOpen(false);//不需要打开目录
        globalConfig.setServiceName("%sService");//不让service名称前面带I
        globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java");//存放路径
        autoGenerator.setGlobalConfig(globalConfig);
        //设置包
        PackageConfig packageConfig = new PackageConfig();
        packageConfig.setParent("com.test.mybitsplus");
        packageConfig.setEntity("entity");
        packageConfig.setMapper("mapper");
        packageConfig.setController("controller");
        packageConfig.setService("service");
        packageConfig.setServiceImpl("service.impl");
        autoGenerator.setPackageInfo(packageConfig);
        //生成策略
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig.setEntityLombokModel(true);//使用lombok
        strategyConfig.setNaming(NamingStrategy.underline_to_camel);//生成文件，根据表名下划线转驼峰
        strategyConfig.setColumnNaming(NamingStrategy.underline_to_camel);//字段名，下划线转驼峰
        strategyConfig.setInclude("user","article");//包含的表
        autoGenerator.setStrategy(strategyConfig);
        //启动
        autoGenerator.execute();
    }
}
```

输出控制台sql

```yml [application]
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

Service 分接口和实现类的原因

- 解耦合，降低controller 层的修改，可以分开测试环境和正式环境，方便单元测试和mock数据
- 方便AOP代理

```java
@Qualifier("aliPayService")
private PayService payService;
```

| 情况                   | 接口和实现类区别 |
| ---------------------- | ---------------- |
| 只有一个实现，永远不换 | 基本没区别       |
| 业务逻辑修改           | 都改实现类       |
| 换一种实现方式         | 接口优势明显     |
| 多人协作大型项目       | 接口更规范       |
| 单元测试               | 接口更方便       |

## springboot整合jdbcTemplate

jdbcTemplate 是一个轻量级的JDBC 封装组件

## SpringBoot 整合 Spring Data JPA

Spring Data JPA 是Spring 框架提供的持久层解决方案

## Spring Boot 整合Spring Security

Spring Security 、Shiro 安全框架、判断是否登录等

```xml [pom]
    <!-- security-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
```

未配置密码的情况是，自动生成密码，账号是user,密码Using generated security password: d83df67c-6fe1-48a2-997e-e125df109767

配置账号密码

```yml [application]
spring:
  security:
    user:
      name: admin
      password: 123456
```

除了最基本的登录认证，还可以使用Pring Security 来完成资源权限管理：当请求某个资源时，对角色进行验证，如果该角色拥有访问权限则正常访问，否则无法访问

```java
package com.test.mybitsplus.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    //权限
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/index").access("hasRole('ADMIN') or hasRole('USER')")
                .anyRequest().authenticated() //任何请求都要校验
                .and()
                .formLogin()
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and()
                .csrf().disable(); //取消csrf 的校验
    }

    //登录
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().passwordEncoder(
                new PasswordEncoderImpl())
                .withUser("user")
                .password(new PasswordEncoderImpl().encode("password"))
                .roles("USER")
                .and()
                .withUser("admin")
                .password(new PasswordEncoderImpl().encode("123456"))
                .roles("USER", "ADMIN");
    }
}
```

```java
package com.test.mybitsplus.configuration;

import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderImpl implements PasswordEncoder {

    //返回用户密码
    @Override
    public String encode(CharSequence charSequence) {
        return charSequence.toString();
    }

    //用户密码和当前密码对比
    @Override
    public boolean matches(CharSequence charSequence, String s) {
        return s.equals(charSequence.toString());
    }
}
```

## Spring Boot 2.x + Knife4j 3.x

Maven 依赖

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

它里面已经包含：

- Swagger UI
- Springfox
- Knife4j增强功能

不需要再单独引入 SpringDoc。

Swagger 配置类

```java
@Configuration
@EnableSwagger2
public class Knife4jConfig {

    @Bean
    public Docket createRestApi() {

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.controller"))
                .paths(PathSelectors.any())
                .build();
    }


    private ApiInfo apiInfo() {

        return new ApiInfoBuilder()
                .title("后台管理系统接口")
                .description("接口文档")
                .version("1.0")
                .build();
    }
}
```

application.yml

```yml
knife4j:
  enable: true
```

访问地址

```
http://localhost:8080/doc.html
```

DTO 参数说明

Spring Boot 2 + Knife4j：

```java
@ApiModel(description = "用户对象")
@Data
public class UserDTO {


    @ApiModelProperty(value = "用户名", required = true)
    private String username;


    @ApiModelProperty(value = "年龄")
    private Integer age;

}
```

## Spring Boot 2.6+ + SpringDoc + Knife4j

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-spring-boot-starter</artifactId>
    <version>4.4.0</version>
</dependency>
```

```yml
springdoc:
  api-docs:
    enabled: true
  swagger-ui:
    enabled: true
knife4j:
  enable: true
  setting:
    language: zh_cn
```

```java
import io.swagger.v3.oas.models.info.Info;
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("后台管理系统 API")
                        .description("接口文档")
                        .version("1.0.0"));
    }
}
```

```java
@RestController
@RequestMapping("/user")
@Tag(name = "用户管理")
public class UserController {

    @Operation(summary = "查询用户")
    @GetMapping("/{id}")
    public Result<UserVO> getUser(
            @Parameter(description = "用户ID")
            @PathVariable Long id) {

        return Result.success(new UserVO());
    }
}
```

```java
@Data
@Schema(description = "新增用户")
public class UserAddDTO {

    @NotBlank
    @Schema(description = "用户名", example = "jack")
    private String username;

    @Schema(description = "年龄", example = "18")
    private Integer age;

    @Schema(description = "手机号")
    private String phone;
}
```

```java
@Data
@Schema(description = "用户信息")
public class UserVO {

    @Schema(description = "用户ID")
    private Long id;

    @Schema(description = "用户名")
    private String username;

    @Schema(description = "年龄")
    private Integer age;
}
```

## 文档相关问题

1. 字段排序只能按写的dto来

2. 复用DTO 参数必填不一样

```
com.test.start
│
├── controller
│
├── service
│
├── mapper
│
├── entity
│
├── dto
│   ├── StudentAddDTO.java
│   └── StudentUpdateDTO.java
│
├── validation
│   ├── AddGroup.java
│   └── UpdateGroup.java
│
└── config
```

这里接口不用写任何代码，它只是一个标记接口。

::: code-group

```java [validation/AddGroup]
package com.test.start.validation;

/**
 * 新增校验分组
 */
public interface AddGroup {
}
```

```java [validation/UpdateGroup]
package com.test.start.validation;

/**
 * 修改校验分组
 */
public interface UpdateGroup {
}
```

:::

```java
@Data
public class StudentDTO {


    @NotNull(
        message = "修改时id不能为空",
        groups = UpdateGroup.class
    )
    private Integer id;


    @NotBlank(
        message = "姓名不能为空",
        groups = AddGroup.class
    )
    private String name;


    @NotNull(
        message = "生日不能为空",
        groups = AddGroup.class
    )
    private LocalDate birthday;

}
```

3. 日期的默认值设置

```java
    @NotNull(message = "生日不能为空")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Schema(
            description = "生日",
            type = "string",
            format = "date",
            example = "2022-11-24"
    )
    private Date birthday;
```

4. 隐藏字段`@Schema(hidden = true)`

```java
    /**
     * MySQL分页偏移量
     */
    @Schema(hidden = true)
    public Integer getOffset() {

        if (pageNum == null || pageSize == null) {
            return null;
        }

        return (pageNum - 1) * pageSize;
    }
```

## spting boot + vue

前后端分离

由原来的单体架构变为前后端分离的

## redis

基于内存进行存储，支持key-value的存储形式，底层是用C语言编写的。

基于key-value 形式的数据字典，结构非常简单，没有数据表的概念，直接用键值对的形式完成数据的管理。

Redis 支持5种数据类型：

- 字符串
- 列表
- 集合
- 有序集合
- 哈希

### 安装Redis

下载解压包就行

### 依赖

```xml
    <!-- redis依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
```

### 使用

```yml
spring:
  redis:
    database: 0
    host: localhost
    port: 6379
```

redis存储的对象需要序列化

```java
package com.test.start.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Student implements Serializable {
    private Integer id;
    private String name;
    private Double score;
    private Date birthday;
}

```

```java
package com.test.start.controller;

import com.test.start.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class StudentHandler {

    @Autowired
    private RedisTemplate redisTemplate;

    @PostMapping("/set")
    public void set(@RequestBody Student student) {
        redisTemplate.opsForValue().set(student.getId(), student);
    }

    @GetMapping("/get/{key}")
    public Student get(@PathVariable("key") Integer id) {
        return (Student) redisTemplate.opsForValue().get(id);
    }

    @DeleteMapping("/del/{key}")
    public boolean del(@PathVariable("key") Integer key) {
        redisTemplate.delete(key);
        return redisTemplate.hasKey(key);
    }
}
```

### 序列化配置

```java
package com.test.start.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * Redis 里看到乱码，通常不是数据坏了，而是序列化方式不同导致的。
 * 如果没有配置序列化器，Spring Data Redis 默认可能使用：
 *
 * JdkSerializationRedisSerializer
 *
 * 存进去的数据类似：
 *
 * \xac\xed\x00\x05sr\x00...
 *
 * Navicat 看到就是乱码。
 *
 * 因为它存的是 Java 对象的二进制序列化结果。
 */

@Configuration
public class RedisConfig {

    /**
     * 创建并配置 RedisTemplate Bean
     *
     * RedisTemplate 是 Spring Data Redis 提供的 Redis 操作工具类，
     * 类似于 MyBatis 的 SqlSessionTemplate。
     *
     * Spring Boot 默认也会自动创建一个 RedisTemplate，
     * 但是默认序列化方式通常是 JDK 序列化：
     *
     * Java对象
     *     |
     *     | JDK序列化
     *     ↓
     * 二进制数据
     *
     * 存入 Redis 后使用 Redis-cli / Navicat 查看会出现乱码。
     *
     * 所以这里手动创建 RedisTemplate，
     * 修改它的序列化方式，让 Redis 中的数据以 JSON 形式保存。
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory factory) {


        /*
         * 创建 RedisTemplate 对象
         *
         * 这里调用的是 RedisTemplate 的无参构造方法。
         *
         * 此时只是创建了一个空对象：
         *
         * RedisTemplate
         *      |
         *      +-- connectionFactory = null
         *      +-- keySerializer = null
         *      +-- valueSerializer = null
         *
         * 还不能操作 Redis。
         */
        RedisTemplate<String, Object> template =
                new RedisTemplate<>();


        /*
         * 设置 Redis 连接工厂
         *
         * RedisTemplate 本身不会直接连接 Redis，
         * 它需要 RedisConnectionFactory 来创建 Redis 连接。
         *
         * Spring Boot 启动时会根据配置：
         *
         * spring.redis.host
         * spring.redis.port
         *
         * 创建 RedisConnectionFactory（通常是 LettuceConnectionFactory）。
         *
         * 这里的方法参数：
         *
         * RedisConnectionFactory factory
         *
         * 是 Spring 自动注入进来的。
         *
         * 设置之后：
         *
         * RedisTemplate
         *       |
         *       +-- RedisConnectionFactory
         *                |
         *                +-- LettuceConnectionFactory
         *                         |
         *                         +-- Redis服务器
         */
        template.setConnectionFactory(factory);



        /*
         * 设置 Redis Key 的序列化方式
         *
         * Redis 中所有数据最终都是字符串/二进制保存。
         *
         * 如果不设置：
         *
         * key
         *  |
         * JDK序列化
         *  |
         * \xac\xed\x00...
         *
         * 查看 Redis 时可能出现乱码。
         *
         * 使用 StringRedisSerializer：
         *
         * Java String
         *      |
         * UTF-8
         *      |
         * Redis中的普通字符串
         *
         * 例如：
         *
         * Java:
         * "student:1"
         *
         * Redis:
         * student:1
         */
        template.setKeySerializer(
                new StringRedisSerializer()
        );



        /*
         * 设置 Redis Value 的序列化方式
         *
         * Value 通常保存 Java 对象。
         *
         * 默认：
         *
         * Student对象
         *      |
         * JDK序列化
         *      |
         * 二进制数据
         *
         * 使用 GenericJackson2JsonRedisSerializer：
         *
         * Student对象
         *      |
         * Jackson JSON序列化
         *      |
         * JSON字符串
         *
         * Redis中类似：
         *
         * {
         *   "@class":"com.test.Student",
         *   "name":"张三",
         *   "score":90
         * }
         *
         */
        template.setValueSerializer(
                new GenericJackson2JsonRedisSerializer()
        );



        /*
         * 设置 Hash 类型数据的 Key 序列化方式
         *
         * Redis除了普通的 key-value：
         *
         * SET user  xxx
         *
         * 还有 Hash：
         *
         * HSET user name 张三
         *
         * Hash内部也有：
         *
         * hash key
         * hash value
         *
         * 所以需要单独设置。
         */
        template.setHashKeySerializer(
                new StringRedisSerializer()
        );



        /*
         * 设置 Hash 类型数据 Value 的序列化方式
         *
         * Hash里面如果保存对象，
         * 也需要使用 JSON 序列化。
         *
         * 例如：
         *
         * user:
         *     student -> {
         *          "name":"张三"
         *     }
         */
        template.setHashValueSerializer(
                new GenericJackson2JsonRedisSerializer()
        );



        /*
         * 初始化 RedisTemplate
         *
         * RedisTemplate 实现了 InitializingBean 接口。
         *
         * Spring 在创建 Bean 时会自动调用：
         *
         * afterPropertiesSet()
         *
         * 这里手动调用，
         * 是因为这个对象是我们自己 new 出来的。
         *
         * 它内部会检查必要配置，
         * 并完成默认配置初始化。
         *
         * 如果是 Spring 自动创建 Bean，
         * Spring 生命周期会自动调用。
         */
        template.afterPropertiesSet();



        /*
         * 返回对象
         *
         * 因为有 @Bean 注解，
         * Spring 会把返回的 RedisTemplate 对象放入 IoC 容器。
         *
         * 后续：
         *
         * @Autowired
         * private RedisTemplate redisTemplate;
         *
         * 注入的就是这里创建的对象。
         */
        return template;
    }
}
```

### redis 存储五种数据类型

- String

```java
    @GetMapping("/string")
    public String stringTest(){
        redisTemplate.opsForValue().set("hello", "world");
        return (String) redisTemplate.opsForValue().get("hello");
    }
```

- List

```java
    @GetMapping("/list")
    public List<String> listTest(){
        ListOperations listOperations = redisTemplate.opsForList();
        listOperations.leftPush("list", "hello");
        listOperations.leftPush("list", "world");
        listOperations.leftPush("list", "java");
        List list = listOperations.range("list", 0, 1);
        return list;
    }

//  [
// 	"java",
// 	"world"
// ]
// 反的
```

- set

```java
    @GetMapping("/set")
    public Set<String> setTest() {
        SetOperations setOperations = redisTemplate.opsForSet();
        setOperations.add("set", "hello");
        setOperations.add("set", "world");
        setOperations.add("set", "java");
        setOperations.add("set", "java");
        return setOperations.members("set");
    }
//无序的
```

- zset 有序的set

```java
    @GetMapping("/zset")
    public Set<String> zestTest() {
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();
        zSetOperations.add("aa", "Hello", 1);
        zSetOperations.add("aa", "Word", 2);
        zSetOperations.add("aa", "Java", 3);
        Set set = zSetOperations.range("aa", 0, 2);
        return set;
    }
//有序的
```

- 哈希

HashMap key value

key 是每一组数据的ID,hashkey和value是一组完整的HashMap 数据，通过key来区分不同的HashMap.

```java
HashMap hashMap1 = new HashMap();
hashMap1.put(key1,value1);
HashMap hashMap2 = new HashMap();
hashMap2.put(key2,value2);
HashMap hashMap3 = new HashMap();
hashMap3.put(key3,value3);
HashOperation hashOperations = redisTemplate.opsForHash();
hashOperations.put(hashMap1,key1,value1);
hashOperations.put(hashMap2,key2,value2);
hashOperations.put(hashMap3,key3,value3);
```

```java
    @GetMapping("/hash")
    public Map<String, String> hashTest() {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.put("hash", "hello", "world");
        hashOperations.put("hash", "word", "java");
        Object o = hashOperations.get("hash", "word");
        System.out.println(o);
        return hashOperations.entries("hash");
    }
```

## 参数验证

| 注解        | 作用                       |
| ----------- | -------------------------- |
| `@NotNull`  | 不能为 null                |
| `@NotBlank` | 字符串不能为空且不能全空格 |
| `@NotEmpty` | 集合、数组、字符串不能为空 |
| `@Min`      | 最小值                     |
| `@Max`      | 最大值                     |
| `@Size`     | 长度限制                   |
| `@Pattern`  | 正则                       |

## 全局错误处理

- 统一返回,这个比较垃圾，可以优化

```java
package com.test.start.common.result;

/**
 * 向客户端响应的数据类型
 *
 * @param <T> 向客户端响应的数据类型
 * @author
 * @date 2021.12.21
 */

@SuppressWarnings("all")
public class JsonResult<T> {

    /**
     * 处理成功状态码
     */
    public static final Integer SUCCESS = 2000;
    /**
     * 系统异常状态码
     */
    public static final Integer FAIL = 6000;
    public static final Integer INVALID = 10000;   //用户失效
    public static final Integer DATAEMPTY = 6006;  // 数据为空

    private Integer state;
    private String message;
    private T data;

    public JsonResult() {
        super();
    }

    public JsonResult(Integer state) {
        super();
        this.state = state;
    }

    public JsonResult(Integer state, T data) {
        super();
        this.state = state;
        this.data = data;
    }

    public JsonResult(Integer state, String message) {
        this.state = state;
        this.message = message;
    }

    public JsonResult(Integer state, String message, T data) {
        super();
        this.state = state;
        this.message = message;
        this.data = data;
    }

    public static <T> JsonResult ok() {
        return new JsonResult<T>(SUCCESS, "操作成功", null);
    }

    public static <T> JsonResult ok(T data) {
        return new JsonResult<T>(SUCCESS, "操作成功", data);
    }

    public static <T> JsonResult success(T data) {
        return new JsonResult<T>(SUCCESS, "操作成功", data);
    }

    public static <T> JsonResult ok(String message, T data) {
        return new JsonResult<T>(SUCCESS, message, data);
    }

    public static <T> JsonResult invalid() {
        return new JsonResult<>(INVALID, "INVALID", "用户失效");
    }

    public static <T> JsonResult fail() {
        return new JsonResult<Object>(SUCCESS, "系统错误", null);
    }

    public static <T> JsonResult fail(String message) {
        return new JsonResult<T>(FAIL, message, null);
    }

    public static <T> JsonResult error(String message) {
        return new JsonResult<T>(FAIL, message, null);
    }

    public static <T> JsonResult notFound(String message) {
        return new JsonResult<T>(FAIL, message, null);
    }


    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
```

- 错误处理 `@RestControllerAdvice` 是增强， `@ExceptionHandler` 是对应错误，进入对应的地方

- 这个也可以进行优化，搞清晰点

```java
package com.test.start.common.exception.handler;


import com.test.start.common.exception.*;
import com.test.start.common.result.JsonResult;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    private static Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    /**
     * 处理成功状态码
     */
    public static final Integer SUCCESS = 2000;
    public static final Integer FAIL = 6000;

    @ExceptionHandler(Throwable.class)
    public JsonResult<String> handlerException(Throwable e) {
        // 打印堆栈信息
        e.printStackTrace();
        return new JsonResult<>(FAIL, "请求失败", "内部异常");
    }

    /**
     * excel文件报错
     */
    @ExceptionHandler(ExcelException.class)
    public JsonResult<Boolean> excelException(ExcelException e) {
        // 打印堆栈信息
        logger.error(e.getMessage());
        return new JsonResult<>(e.getStatus(), e.getMessage(), e.isSuccess());
    }

    /**
     * 数据库已存在该名称
     */
    @ExceptionHandler(RepeatException.class)
    public JsonResult<Boolean> RepeatException(RepeatException e) {
        // 打印堆栈信息
        logger.error(e.getMessage());
        return new JsonResult<>(e.getStatus(), e.getMessage(), e.isSuccess());
    }

    /**
     * 数据库已存在该名称
     */
    @ExceptionHandler(LevelException.class)
    public JsonResult<Boolean> RepeatException(LevelException e) {
        // 打印堆栈信息
        logger.error(e.getMessage());
        return new JsonResult<>(e.getStatus(), e.getMessage(), e.isSuccess());
    }


    /**
     * 注解校验异常
     */
    @ExceptionHandler(ThrowJsonException.class)
    public JsonResult<Boolean> ThrowJsonException(ThrowJsonException e) {
        // 打印堆栈信息
        logger.error(e.getMessage());
        return new JsonResult<>(e.getStatus(), e.getMessage(), e.isSuccess());
    }


    /**
     * 应用报错提示
     */
    @ExceptionHandler(AppException.class)
    public JsonResult<Boolean> AppException(AppException e) {
        // 打印堆栈信息
        logger.error(e.getMessage());
        return new JsonResult<>(e.getStatus(), e.getMessage(), e.isSuccess());
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public JsonResult<Object> handleValidException(MethodArgumentNotValidException me) {
        String msg = me.getBindingResult().getFieldErrors().stream().map(FieldError::getDefaultMessage).collect(Collectors.joining("，"));

        return JsonResult.fail(msg);
    }
}
```

## token 验证和允许跨域

```
Spring Boot启动
        |
        ↓
创建 ApplicationContext（IOC容器）
        |
        ↓
扫描@Component
        |
        ↓
创建 TokenInterceptor Bean
        |
        ↓
创建 WebConfig Bean
        |
        ↓
调用 WebConfig.addInterceptors()
        |
        ↓
注册 TokenInterceptor 到 Spring MVC拦截器链
        |
        ↓
启动完成
        |
        ↓
接收HTTP请求
        |
        ↓
调用 TokenInterceptor.preHandle()
```

- 简单的拦截器

```java
package com.test.start.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.start.common.constant.SystemConst;
import com.test.start.common.result.JsonResult;
import com.test.start.utils.RedisUtil;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    RedisUtil redisUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if(Strings.isNotEmpty(token)) {
            //获取用户信息
            Object account = redisUtil.get(SystemConst.WEBPATH+token);
            if(account != null) {
                Object newAccount = (Object) account;
                redisUtil.set(SystemConst.WEBPATH+token, newAccount,60*60);
                return true;
            }
        }
        // 设置响应类型
        response.setContentType(
                "application/json;charset=UTF-8"
        );


        // 设置状态码
        response.setStatus(
                HttpServletResponse.SC_UNAUTHORIZED
        );


        // 返回JSON
        response.getWriter().write(
                objectMapper.writeValueAsString(
                        JsonResult.invalid()
                )
        );
        return false;
    }
}
```

- 注册到拦截器注册表

```java
package com.test.start.configuration;

import com.test.start.interceptor.TokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Web相关配置
 *
 * 包括：
 * 1. 跨域
 * 2. 拦截器
 * 3. 静态资源映射
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * 拦截器
     */
    @Autowired
    private TokenInterceptor tokenInterceptor;

    /**
     * 配置跨域
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {


        registry.addMapping("/**") // 允许所有接口路径

                // 允许访问的前端地址
                // .allowedOrigins(
                //      "http://localhost:5173",
                //      "http://localhost:8080"
                //  )
                .allowedOriginPatterns("*") // 允许所有来源


                // 允许请求方式
                .allowedMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )


                // 允许请求头
                .allowedHeaders("*")


                // 是否允许携带 Cookie
                .allowCredentials(true)


                // 预检请求缓存时间
                .maxAge(3600);
    }

    /**
     * Spring MVC 会自动调这个方法
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenInterceptor)
                //包含的接口
                .addPathPatterns("/**")
                //排除的接口
                .excludePathPatterns("/login");
    }
}

```
