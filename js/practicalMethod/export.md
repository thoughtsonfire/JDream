# 导出


## 后端返回数据为字符串，前端导出为表格

```js
/** 表格数据为val */
function export(val,fileName){
    const utf8Bom = '\uFEFF' //解决乱码
    const fullVal = val.trim() //解决表头可能空一格的情况，删除多余空格
    const blob = new Blob([utf8Bom+fullVal],{type:'text/csv;chart=utf-8'})
    const url = URL.createObjectURL(blob).
    const a = document.createElement('a')
    a.href = url
    a.download = fileName  //XXX.csv
    a.click()
    URL.revokeObjectURL(url)
}
```

## 后端返回数据为blob

```js
/** 类型为blob */
/**请求config需要设置，{responseType:'blob'} */
function export(blob,fileName){
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName  //XXX.csv
    a.click()
    URL.revokeObjectURL(url)
}
```

## 后端返回数据为地址

```js
/** 后端添加了响应头允许下载*/
function export(url,fileName){
    const a = document.createElement('a')
    a.href = url
    a.download = fileName  //XXX.csv
    a.click()
    URL.revokeObjectURL(url)
}
```

```js
/**后端没添加响应头允许下载 */
function export(url,fileName){
    fetch(url)
    .then(response=>{
        if(!response.ok) throw new Error('网络异常')
        return response.blob()
    }).then(blob=>{
        const downloadUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(downloadUrl)
    }).catch(error=>{
        console.log('下载失败',error)
    })
}
```