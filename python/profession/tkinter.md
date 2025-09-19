# tkinter GUI界面开发库  

`tkinter` 是 Python 标准库自带的 GUI 界面开发库，跨平台（Windows / Mac / Linux 都能用），安装 Python 时自带，无需额外安装。  

## 基础使用  

👉 打开一个 400×300 的窗口。  

```py
import tkinter as tk

# 创建主窗口
root = tk.Tk()
root.title("我的第一个窗口")
root.geometry("400x300")  # 宽x高

# 进入消息循环
root.mainloop()

```


## 布局  

Tkinter 主要有 三种布局管理器：pack、grid、place，每种都有不同特点和适用场景。  

<br>

### Pack 布局  

pack 是最简单的布局方式，把控件按顺序“打包”到父容器中，默认从上到下堆叠。  

基本参数：

- side：控件停靠的位置，值为 TOP（默认）、BOTTOM、LEFT、RIGHT

- fill：控件是否填充父容器，可选 NONE（默认）、X、Y、BOTH

- expand：布尔值，是否在父容器剩余空间中扩展

- padx / pady：控件周围的水平/垂直间距  padx 和 pady 是 控件与它周围空间之间的额外填充（padding），用来让控件不要紧贴其它控件或窗口边缘

```py
import tkinter as tk

root = tk.Tk()
root.geometry("300x200")

btn1 = tk.Button(root, text="按钮1")
btn2 = tk.Button(root, text="按钮2")
btn3 = tk.Button(root, text="按钮3")

btn1.pack(side=tk.TOP, fill=tk.X, padx=10, pady=5)
btn2.pack(side=tk.LEFT, fill=tk.Y, padx=5, pady=5)
btn3.pack(side=tk.RIGHT, expand=True, padx=5, pady=5)

root.mainloop()
```

>✅ Pack 适合简单的垂直或水平堆叠布局，但难以精确控制行列。 

- expand=True → 分配剩余空间给按钮所在的 pack 区域

- 没有设置 fill → 按钮本身不会拉伸，只保持内容大小  

<br>

### Grid 布局（表格布局）

grid 按行列来放置控件，可以精确指定控件位置，适合复杂布局。

基本参数：

- row：行号（从 0 开始）

- column：列号（从 0 开始）

- rowspan / columnspan：控件跨越的行数/列数

- sticky：控件在单元格的对齐方式，可组合 N、S、E、W

- padx / pady：控件周围间距  padx 和 pady 是 控件与它周围空间之间的额外填充（padding），用来让控件不要紧贴其它控件或窗口边缘

- ipadx / ipady：控件内部填充


```py
import tkinter as tk

root = tk.Tk()
root.geometry("300x200")

tk.Label(root, text="用户名").grid(row=0, column=0, padx=5, pady=5)
tk.Entry(root).grid(row=0, column=1, padx=5, pady=5)

tk.Label(root, text="密码").grid(row=1, column=0, padx=5, pady=5)
tk.Entry(root, show="*").grid(row=1, column=1, padx=5, pady=5)

tk.Button(root, text="登录").grid(row=2, column=0, columnspan=2, pady=10)

root.mainloop()
```

✅ Grid 非常适合表单、棋盘、表格等规则布局。

<br>

### Place 布局（绝对/相对定位）  

place 可以直接指定控件的绝对坐标或者相对父容器位置，适合对控件位置要求精确的情况。

常用参数：  

- x, y：控件左上角绝对坐标

- width, height：控件大小

- relx, rely：相对父容器的水平/垂直位置（0~1）

- relwidth, relheight：相对父容器的宽度/高度（0~1）

- anchor：定位点，例如 NW（左上角，默认）、CENTER（中心）

```perl
n   - 北（上）
ne  - 东北（右上）
e   - 东（右）
se  - 东南（右下）
s   - 南（下）
sw  - 西南（左下）
w   - 西（左）
nw  - 西北（左上）
center - 中心
```

```py
import tkinter as tk

root = tk.Tk()
root.geometry("300x200")

btn1 = tk.Button(root, text="左上")
btn1.place(x=10, y=10)

btn2 = tk.Button(root, text="右下")
btn2.place(relx=1.0, rely=1.0, anchor="se")

btn3 = tk.Button(root, text="中心")
btn3.place(relx=0.5, rely=0.5, anchor="center")

root.mainloop()
```

>✅ Place 最灵活，但不适合自动适配窗口大小或动态布局。

<br>

### 三种布局混合使用  

- 同一个父容器中 不要混用 pack 和 grid，会报错

- 可以不同父容器（Frame）里使用不同布局

```py
import tkinter as tk

root = tk.Tk()
root.geometry("400x300")

frame_top = tk.Frame(root, bg="red")
frame_top.pack(fill=tk.X)

frame_bottom = tk.Frame(root, bg="blue")
frame_bottom.pack(fill=tk.BOTH, expand=True)

tk.Button(frame_top, text="顶部按钮1").pack(side=tk.LEFT, padx=5)
tk.Button(frame_top, text="顶部按钮2").pack(side=tk.LEFT, padx=5)

tk.Label(frame_bottom, text="底部中心").place(relx=0.5, rely=0.5, anchor="center")

root.mainloop()
```

<br>

### 布局技巧  

- Frame 嵌套：复杂布局通常使用 Frame 分区，每个 Frame 使用不同布局管理器

- 自动适应大小：使用 fill + expand 或 relwidth / relheight

- 统一间距：尽量使用 padx/pady 和 ipadx/ipady，避免手动调坐标


## 控件示例  

```py
import tkinter as tk
from tkinter import messagebox

# 创建主窗口
root = tk.Tk()
root.title("Tkinter 基本控件示例")

# 窗口大小
w, h = 400, 800

# 获取屏幕宽高
sw = root.winfo_screenwidth()
sh = root.winfo_screenheight()

# 计算居中位置
x = (sw - w) // 2
y = (sh - h) // 2

# 设置窗口大小和位置 window.geometry("宽x高+X坐标+Y坐标")
root.geometry(f"{w}x{h}+{x}+{y}")

# ---------------- Label ----------------
label = tk.Label(root, text="标签示例", fg="blue", font=("Arial", 14))
label.pack(pady=10)

# ---------------- Button ----------------
def button_clicked():
    messagebox.showinfo("提示", "按钮被点击了！")

btn = tk.Button(root, text="点击我", command=button_clicked)
btn.pack(pady=5)

# ---------------- Entry ----------------
entry_label = tk.Label(root, text="输入框示例")
entry_label.pack()
entry = tk.Entry(root)
entry.pack(pady=5)

def get_entry_text():
    text = entry.get()
    messagebox.showinfo("输入框内容", text)

btn_entry = tk.Button(root, text="获取输入内容", command=get_entry_text)
btn_entry.pack(pady=5)

# ---------------- Text ----------------
text_label = tk.Label(root, text="多行文本框示例")
text_label.pack()
text = tk.Text(root, width=40, height=5)
text.pack(pady=5)
text.insert("1.0", "这里是初始文本\n可以编辑多行内容")

def get_text_content():
    content = text.get("1.0", "end").strip()
    messagebox.showinfo("多行文本内容", content)

btn_text = tk.Button(root, text="获取文本框内容", command=get_text_content)
btn_text.pack(pady=5)

# ---------------- Radiobutton ----------------
radio_label = tk.Label(root, text="单选框示例")
radio_label.pack()
radio_var = tk.StringVar(value="A")  # 默认选中A
rb1 = tk.Radiobutton(root, text="选项A", variable=radio_var, value="A")
rb2 = tk.Radiobutton(root, text="选项B", variable=radio_var, value="B")
rb1.pack()
rb2.pack()

def get_radio_value():
    messagebox.showinfo("单选框选择", f"选择了: {radio_var.get()}")

btn_radio = tk.Button(root, text="获取单选框值", command=get_radio_value)
btn_radio.pack(pady=5)

# ---------------- Checkbutton ----------------
check_label = tk.Label(root, text="多选框示例")
check_label.pack()
check_var1 = tk.IntVar()
check_var2 = tk.IntVar()
cb1 = tk.Checkbutton(root, text="选项1", variable=check_var1)
cb2 = tk.Checkbutton(root, text="选项2", variable=check_var2)
cb1.pack()
cb2.pack()

def get_check_values():
    selected = []
    if check_var1.get() == 1:
        selected.append("选项1")
    if check_var2.get() == 1:
        selected.append("选项2")
    messagebox.showinfo("多选框选择", f"选择了: {', '.join(selected)}" if selected else "没有选择")

btn_check = tk.Button(root, text="获取多选框值", command=get_check_values)
btn_check.pack(pady=5)

# ---------------- Listbox + Scrollbar ----------------
list_label = tk.Label(root, text="列表框示例")
list_label.pack()
frame_list = tk.Frame(root)
frame_list.pack()
scrollbar = tk.Scrollbar(frame_list)
scrollbar.pack(side="right", fill="y")

listbox = tk.Listbox(frame_list, yscrollcommand=scrollbar.set, height=5)
for item in ["苹果", "香蕉", "橘子", "草莓", "西瓜", "梨", "葡萄"]:
    listbox.insert("end", item)
listbox.pack(side="left", fill="both")
scrollbar.config(command=listbox.yview)

def get_listbox_selection():
    selected_indices = listbox.curselection()
    selected_items = [listbox.get(i) for i in selected_indices]
    messagebox.showinfo("列表选择", f"选择了: {', '.join(selected_items)}" if selected_items else "没有选择")

btn_list = tk.Button(root, text="获取列表选择", command=get_listbox_selection)
btn_list.pack(pady=5)

# ---------------- Frame ----------------
frame_label = tk.Label(root, text="框架示例")
frame_label.pack()
frame = tk.Frame(root, bg="lightgray", width=400, height=50)
frame.pack(pady=10)
frame.pack_propagate(False)  # 固定Frame大小
btn_frame1 = tk.Button(frame, text="框架按钮1")
btn_frame2 = tk.Button(frame, text="框架按钮2")
btn_frame1.pack(side="left", padx=5)
btn_frame2.pack(side="left", padx=5)

# ---------------- 主循环 ----------------
root.mainloop()
```

✅ 功能说明

- Label：显示文字

- Button：点击弹窗提示

- Entry：获取单行输入

- Text：获取多行输入

- Radiobutton：单选，获取选中值

- Checkbutton：多选，获取选中值

- Listbox + Scrollbar：列表选择，可多选（selectmode="multiple" 可以启用多选）

- Frame：容器，用于分组控件


