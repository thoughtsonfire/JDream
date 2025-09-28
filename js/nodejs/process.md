# process  

在 Node.js 里，process 是一个全局对象（不需要 require 就能直接用）。  

## 常见功能  

### 访问命令行参数  

```js
console.log(process.argv);
```

- process.argv 是一个数组，保存了运行 Node 命令时的参数。

比如：  

```js
node app.js hello world
```  

得到：  

```js
[
  'C:\\Program Files\\nodejs\\node.exe', // Node 可执行文件路径
  'D:\\path\\app.js',                    // 当前脚本路径
  'hello',                               // 第一个参数
  'world'                                // 第二个参数
]
```

<br>

### 退出程序

```js
process.exit(0); // 正常退出
process.exit(1); // 异常退出
```

<br>

### 环境变量

```js
console.log(process.env.PATH);  // 系统环境变量 PATH
```

<br>

### 当前工作目录  

```js
console.log(process.cwd()); // 类似 Python 的 os.getcwd()
```

<br>

### 标准输入输出  

```js
process.stdout.write("Hello\n"); // 输出
process.stdin.on("data", (data) => {
  console.log("收到输入:", data.toString());
});
```

## 简单总结：

- process = Node 里代表“当前进程”的对象

- argv = 进程的命令行参数（数组）

- exit = 结束进程

- env = 环境变量
