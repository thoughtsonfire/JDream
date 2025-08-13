# 实用属性  

## 光标插入

`selectionStart` 和 `selectionEnd` 是 原生 `DOM` 属性，主要用来表示在 `<textarea>` 或 `<input type="text">` 里的光标位置或选中文本的范围。  

1. `selectionStart`  

- 代表选区的起始位置（基于字符下标，从 `0` 开始计数）。

- 如果没有选中文本，而是单纯光标在某个位置，它就等于光标的位置。  

例子：  
假设文本是

```nginx
Hello world
```

光标放在 `H` 后面（`H|ello world`）  
则：  

```js
textarea.selectionStart  // 1
```

2. `selectionEnd`  

- 代表选区的结束位置（同样基于字符下标，从 `0` 开始计数）。

- 如果没有选区而只是单点光标，它的值等于 `selectionStart`。  

例子：  
还是 "`Hello world`"，如果选中 "`ello`"：  

```css
H[ello] world
```  

则：  

```js
textarea.selectionStart // 1   (H 后面的 e)
textarea.selectionEnd   // 5   (o 后面的位置)
```
> 注意：结束位置是最后一个字符的下一个位置，也就是选区的右边界。  

3. 小结  

| 情况         | selectionStart | selectionEnd | 含义             |
| ---------- | -------------- | ------------ | -------------- |
| 光标在某个位置    | n              | n            | 光标位置           |
| 选中文本       | startIndex     | endIndex     | 选区的起止字符下标      |
| 全选 `"abc"` | 0              | 3            | 从第 0 个到第 3 个字符 |


**参考示例**   

```js
   //获取光标位置
    handleBlur() {
        this.cursorStart = this.$refs.textarea.selectionStart;
        this.cursorEnd = this.$refs.textarea.selectionEnd;
    },
    //插入表情符号
    insertEmoji(emoji) {
        const textarea = this.$refs.textarea;

        this.content = this.content.substring(0, this.cursorStart) + emoji.name + this.content.substring(this.cursorEnd);
        this.$nextTick(() => {
            textarea.selectionStart = this.cursorStart + emoji.name.length;
            textarea.selectionEnd = textarea.selectionStart;
            this.cursorStart = textarea.selectionStart;
            this.cursorEnd = textarea.selectionEnd;
            textarea.focus();
        });
    },
    //通过表情符号转换成对应图片
```
