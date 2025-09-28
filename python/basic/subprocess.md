# subprocess库

## 作用  

subprocess 是 Python 标准库，用来 启动子进程（比如调用系统命令、运行其他脚本），并与子进程交互（输入、输出、错误信息、返回码）。  

以前常用 os.system，但功能太弱；现在推荐用 subprocess。  

## 常见用法  

### 最简单：直接运行命令  

```py
import subprocess

subprocess.run(["echo", "Hello, World!"],shell=True)
```

输出：  

```
Hello, World!
```

<br>

### 捕获输出

```py
result = subprocess.run(
    ["echo", "Hello"],
    shell=True,       # 用 shell 执行（Windows 会调用 cmd.exe）
    capture_output=True,  # 捕获 stdout/stderr
    text=True             # 解码为字符串（默认是字节）
)

print("stdout:", result.stdout)
print("stderr:", result.stderr)
print("return code:", result.returncode)
```

输出：  

```lua
stdout: Hello
stderr:
return code: 0
```

<br>

### 传入输入（stdin）  

```py
result = subprocess.run(
    ["python", "-c", "print(input())"], 
    input="Hello from parent",  # 给子进程输入
    capture_output=True,
    text=True
)

print(result.stdout)
```

输出：  

```csharp
Hello from parent
```

<br>

### 错误处理  

默认情况下，即使命令失败也不会抛异常，只会返回非零 returncode。  

如果你要让错误直接抛出，可以加 check=True：  

```py
try:
    subprocess.run(["ls", "not_exist"], check=True)
except subprocess.CalledProcessError as e:
    print("命令执行失败:", e)
```

<br>

### 和 Node.js 配合

Python 调用 Node 脚本并传 JSON 参数：  

```py
import subprocess
import json

payload = {"foo": "bar"}
input_data = json.dumps(payload)

result = subprocess.run(
    ["node", "QQMusic.js", input_data],
    capture_output=True,
    text=True
)

print("stdout:", result.stdout) # 获取js的控制台输出
print("stderr:", result.stderr)
output_data = result.stdout.strip().split('\n')  # 处理输出
```

Node.js 接收：  

```js
let arg = process.argv[2];
console.log("收到参数:", arg);

let data = JSON.parse(arg);
console.log("解析:", data);
```

## 总结  

- subprocess.run([...]) → 执行命令

- capture_output=True → 捕获输出

- text=True → 自动解码为字符串

- check=True → 失败抛异常

- input="..." → 传给子进程 stdin