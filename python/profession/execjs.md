# execjs 库  

## execjs库执行js编码异常问题

`execjs`库执行`js`编码异常问题  

在使用 `Python` 进行开发时，有时需要调用 `JavaScript` 代码以实现某些特定的功能。`execjs` 是一个非常方便的库，它可以让你在 `Python` 中直接执行 `JavaScript` 代码。然而，在使用 `execjs` 时，开发者可能会遇到编码异常的问题，这通常是由于 `Python` 的默认编码设置与 `JavaScript` 的编码方式之间的不兼容导致的。本文将探讨这一问题，并提供一种解决方案。  

一、问题描述  

在某些情况下，当你尝试使用 `execjs` 执行 JavaScript 代码时，可能会遇到类似如下的错误：  

```
UnicodeEncodeError: 'gbk' codec can't encode character ...
```

这通常发生在以下情况：  

- 系统默认编码为 `GBK`：在 `Windows` 系统中，如果你的 `Python` 环境默认编码为 `GBK`，而你尝试处理包含非 `GBK` 字符的 `JavaScript` 代码或数据时，便可能出现编码异常。  

- 跨语言编码不一致：`Python` 和 `JavaScript` 使用不同的默认编码方式。当 `Python` 的默认编码与 `JavaScript` 的编码方式不一致时，也会导致编码错误。  

这种编码问题会导致你的程序无法正常执行，从而影响开发效率和程序的稳定性。  

二、解决方案  

1. 导入相关模块：  

首先，导入 `subprocess` 和 `functools.partial` 模块。  

```py
import subprocess
from functools import partial
```

2. 修改 `subprocess.Popen` 的编码设置：  

通过 `partial` 函数，设置 `subprocess.Popen` 的默认编码为 `utf-8`。  

```py
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
```

这样，所有通过 `subprocess.Popen` 调用的子进程（包括 `execjs` 内部使用的进程）都会默认使用 `utf-8` 编码，从而避免了编码不兼容的问题。  

3. 正常使用 `execjs` 执行 `JavaScript` 报错的代码：  

完成上述设置后，你可以继续使用 `execjs` 库来执行 `JavaScript` 代码，而不会遇到编码异常问题。  

```py
import execjs

js_code = open('xxx.js','r').read()

ctx = execjs.compile(js_code)
result = ctx.call("hello")
print(result) 
# 输出：UnicodeEncodeError: 'gbk' codec can't encode character ...
```

4. 优化后的 execjs 执行 JavaScript 代码：  

```py
# 在引入execjs前导入
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
import execjs

js_code = open('xxx.js','r').read()

ctx = execjs.compile(js_code)
result = ctx.call("hello")
print(result) 
```

三、总结  

在跨语言开发中，编码问题是一个常见的挑战。通过调整 `Python` 的子进程编码设置，我们可以有效地避免由于编码不兼容引发的问题。在使用 `execjs` 库时，确保 `subprocess.Popen` 以 `utf-8` 编码方式运行，可以使得你的 `JavaScript` 代码顺利执行，避免不必要的编码异常。  

这一解决方案不仅适用于 `execjs`，也可以推广到其他使用 `subprocess.Popen` 调用外部进程的场景中。如果你在使用 `execjs` 时遇到了编码问题，希望这篇文章能够为你提供帮助，确保你的程序更加健壮和稳定。  




