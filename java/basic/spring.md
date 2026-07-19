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
