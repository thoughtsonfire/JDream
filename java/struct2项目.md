# struct

## 项目启动

## 配置 Project Structure

### Project Settings

1. Project 配置一下 SDK 和 Language level 版本

2. Module 会自动识别到项目，如果没事别到 WEB 就添加 WEB

先加下面的 WEB Resource Directories 添加路径为项目的 Web 路径，可能叫其他名字

再加 Type 会自动识别到

点击项目的那一层 选 Dependencies `+` Library 把 tomcat 加上，依赖就不报错了

3. Facets 下 Web 先加下面的 WEB Resource Directories 添加路径为项目的 Web 路径，可能叫其他名字

4. Artifacts 点`+` Web Application: Exploded 直接加就行

### 添加 tomcat

在启动那里

1. On 'Update' action: 选 Update classes and resources

2. On frame deactivation: 选 Update classes and resources

3. Server JRE 选一下

4. 选择 Deployments `Deploy at the server startup` `+` 选 `Aritfact`

5. 选择 Startup/Connection 下面的 Run ,Environment Variables 下面添加 JAVA_HOME 和 jdk 的地址

## 配置数据库

在 WebContent 目录下 的 META-INF 目录下的 content.xml

## 渲染页面方法

@namespace 那里配置路径和返回
