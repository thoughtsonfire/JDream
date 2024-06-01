# button按钮
## 基础用法
<div class="ui-button">
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">绿色按钮</el-button>
  <el-button type="info">灰色按钮</el-button>
  <el-button type="warning">黄色按钮</el-button>
  <el-button type="danger">红色按钮</el-button>
</div>
<template>
  <div>
    <hx-button :title="title"></hx-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:"按钮"
    }
  } 
}
</script>
<!-- <template>
  <el-button type="primary">Primary Button</el-button>
</template> -->
:::demo

```vue
<!-- 
<template>
  <div>
    <hxButton :title="title"></hxButton>
  </div>
</template>

<script>
export default {
  name: 'App', 
  data(){
    return{
      title:"按钮"
    }
  } 
}
</script> -->

```
:::

## 参数
|参数|说明|类型|可选值|默认值|
|:---|:---|:---|----|:---|
|title|按钮文字|String|——|——|



