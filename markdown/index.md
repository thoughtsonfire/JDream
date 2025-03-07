# **markdown**

## 快捷键

功能|快捷键
:-:|:-:
加粗|Ctrl + B
斜体|Ctrl + I
引用|Ctrl + Q
插入链接|Ctrl + L
插入代码|Ctrl + K
插入图片|Ctrl + G
提升标题|Ctrl + H
有序列表|Ctrl + O
无序列表|Ctrl + U
横线|Ctrl + R
撤销|Ctrl + Z
重做|Ctrl + Y

## 基本语法

### 字体
- 斜体  
  *这里是文字*  
  `*这里是文字*`  
  _这里是文字_  
  `_这里是文字_`
- 加粗  
  **这里是文字**  
  `**这里是文字**`  
- 删除线  
  ~~这里是文字~~  
  `~~这里是文字~~`
- 粗斜  
  ***这里是文字***  
  `***这里是文字***`

### 图片、链接  
`![](/public/imgs/vitepress/githubsettings.png)`  

`![图片描述](图片路径)`  

`[链接描述](链接地址)`   

### 分割线  

***
`***`   

---   
`---`  

___  
`___`  

### 表格  

<table>
    <tr>
        <th rowspan="2">值日人员</th>
        <th>周一</th>
        <th>周二</th>
        <th>周三</th>
    </tr>
    <tr>
        <td>张三</td>
        <td>李四</td>
        <td>王五</td>
    </tr>
</table>

```
  <table>
      <tr>
          <th rowspan="2">值日人员</th>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
      </tr>
      <tr>
          <td>张三</td>
          <td>李四</td>
          <td>王五</td>
      </tr>
  </table>

```
功能|快捷键
:-:|:-:
加粗|Ctrl + B
斜体|Ctrl + I
引用|Ctrl + Q
插入链接|Ctrl + L
插入代码|Ctrl + K
插入图片|Ctrl + G
提升标题|Ctrl + H
有序列表|Ctrl + O
无序列表|Ctrl + U
横线|Ctrl + R
撤销|Ctrl + Z
重做|Ctrl + Y

```
功能|快捷键
:-:|:-:
加粗|Ctrl + B
斜体|Ctrl + I
引用|Ctrl + Q
插入链接|Ctrl + L
插入代码|Ctrl + K
插入图片|Ctrl + G
提升标题|Ctrl + H
有序列表|Ctrl + O
无序列表|Ctrl + U
横线|Ctrl + R
撤销|Ctrl + Z
重做|Ctrl + Y
```

### 引用

> 文字  
> 文字  
> 文字  

```
> 文字
> 文字
> 文字
```
- 分级引用
  >>> 文字  
  >> 啊  
  > 这  

  ```
    >>> 文字  
    >> 啊  
    > 这  
  ```

 ### 注脚

 ` 添加注脚的文字后加上脚注名字[^1]`  

 `[^1]:注脚1跳转位置`

 *vitepress无法直接显示，插件需要*

### 流程图

- 代办事项

  - [x] 已办事项  
  - [ ] 未办事项
 *vitepress无法直接显示*

- 流程图
  
  ``` flow
  st=>start: 开始
  opl=>operation: My Operation
  c=>condition: Yes or No?
  e=>end: 结束

  st->opl->c
  c(yes)->e
  c(no)->opl
  ```

