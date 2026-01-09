# Linux 常用命令（终端 / shell）

## 常用命令

| 功能              | 命令                                        | 说明                          |
| ----------------- | ------------------------------------------- | ----------------------------- |
| 查看当前目录      | `ls` / `ls -l`                              | 列出文件（详细信息）          |
| 切换目录          | `cd 目录名`                                 | 进入指定目录                  |
| 返回上一级目录    | `cd ..`                                     | 回上一级目录                  |
| 当前路径          | `pwd`                                       | 显示当前所在路径              |
| 创建文件夹        | `mkdir 文件夹名`                            | 创建目录                      |
| 删除文件          | `rm 文件名`                                 | 删除文件                      |
| 删除文件夹        | `rm -r 文件夹名` / `rm -rf 文件夹名`        | 删除目录及内容（强制）        |
| 创建文件          | `touch 文件名`                              | 创建空文件                    |
| 编辑文件          | `nano/vim 文件名`                           | 编辑文件                      |
| 查看文件内容      | `cat 文件名` / `less 文件名` / `tail -n 20` | 查看文件内容（支持分页/尾部） |
| 复制文件          | `cp 源 目标`                                | 复制文件                      |
| 移动/重命名文件   | `mv 源 目标`                                | 移动或重命名文件              |
| 查找文件          | `find . -name 文件名`                       | 在当前目录下查找文件          |
| 搜索文本          | `grep "关键词" 文件名`                      | 在文件中查找关键字            |
| 查看进程          | `ps aux` / `top` / `htop`                   | 查看进程信息                  |
| 杀死进程          | `kill PID` / `kill -9 PID`                  | 结束指定进程                  |
| 查看磁盘空间      | `df -h`                                     | 查看磁盘使用情况              |
| 查看内存          | `free -h`                                   | 显示内存使用情况              |
| 网络信息          | `ifconfig` / `ip a`                         | 查看 IP 地址                  |
| 网络测试          | `ping 地址`                                 | 测试连通性                    |
| 权限变更          | `chmod` / `chown`                           | 修改权限和所有者              |
| 安装软件 (Debian) | `apt install 软件名`                        | 安装软件包                    |
| 安装软件 (RedHat) | `yum install 软件名`                        | 安装软件包                    |

### 系统与权限类

| 命令       | 英文原意      | 中文含义                      |
| ---------- | ------------- | ----------------------------- |
| `sudo`     | super user do | 以管理员身份执行命令          |
| `su`       | switch user   | 切换用户（常用于切换到 root） |
| `whoami`   | who am i      | 显示当前登录用户              |
| `passwd`   | password      | 修改密码                      |
| `chmod`    | change mode   | 修改文件权限                  |
| `chown`    | change owner  | 修改文件拥有者                |
| `exit`     | exit          | 退出当前 shell 或用户         |
| `shutdown` | shut down     | 关机                          |
| `reboot`   | reboot        | 重启                          |
| `hostname` | host name     | 查看或设置主机名              |

### 文件与目录操作

| 命令     | 英文原意                | 中文含义                     |
| -------- | ----------------------- | ---------------------------- |
| `ls`     | list                    | 列出目录内容                 |
| `cd`     | change directory        | 切换目录                     |
| `pwd`    | print working directory | 显示当前工作目录路径         |
| `mkdir`  | make directory          | 创建新目录                   |
| `rmdir`  | remove directory        | 删除空目录                   |
| `rm`     | remove                  | 删除文件或目录               |
| `cp`     | copy                    | 复制文件或目录               |
| `mv`     | move                    | 移动或重命名文件             |
| `touch`  | touch                   | 创建空文件 / 修改文件时间戳  |
| `cat`    | concatenate             | 查看文件内容                 |
| `more`   | more                    | 分页查看文件内容（从头开始） |
| `less`   | less                    | 分页查看（可上下翻页）       |
| `head`   | head                    | 查看文件前几行               |
| `tail`   | tail                    | 查看文件后几行               |
| `find`   | find                    | 查找文件或目录               |
| `locate` | locate                  | 快速按名称查找文件           |
| `tree`   | tree                    | 以树状结构显示目录内容       |

### 系统管理与软件管理

| 命令      | 英文原意              | 中文含义                 |
| --------- | --------------------- | ------------------------ |
| `apt`     | advanced package tool | 软件包管理工具（Ubuntu） |
| `apt-get` | advanced package get  | 旧版软件安装工具         |
| `dpkg`    | Debian package        | 安装/管理 `.deb` 软件包  |
| `ps`      | process status        | 查看进程                 |
| `top`     | top                   | 实时查看系统运行状态     |
| `kill`    | kill                  | 结束指定进程             |
| `df`      | disk free             | 查看磁盘空间使用情况     |
| `du`      | disk usage            | 查看文件或目录大小       |
| `free`    | free                  | 查看内存使用情况         |
| `uptime`  | up time               | 查看系统运行时间         |
| `uname`   | unix name             | 显示系统信息             |
| `history` | history               | 查看命令历史记录         |
| `clear`   | clear                 | 清屏                     |

### 网络与远程操作

| 命令                   | 英文原意           | 中文含义                     |
| ---------------------- | ------------------ | ---------------------------- |
| `ping`                 | ping (声呐信号)    | 测试网络连通性               |
| `ifconfig` / `ip addr` | interface config   | 查看或配置网络接口           |
| `curl`                 | client URL         | 发送 HTTP 请求（测试接口等） |
| `wget`                 | web get            | 从网络下载文件               |
| `scp`                  | secure copy        | 远程安全复制文件             |
| `ssh`                  | secure shell       | 远程登录服务器               |
| `netstat`              | network statistics | 查看网络连接状态             |
| `ss`                   | socket statistics  | 查看网络端口和连接           |
| `telnet`               | teletype network   | 测试端口连通性               |

### 压缩与打包

| 命令     | 英文原意     | 中文含义            |
| -------- | ------------ | ------------------- |
| `tar`    | tape archive | 打包或解包文件      |
| `gzip`   | GNU zip      | 压缩文件            |
| `gunzip` | GNU unzip    | 解压 gzip 文件      |
| `zip`    | zip          | 压缩文件为 zip 格式 |
| `unzip`  | unzip        | 解压 zip 文件       |

### 文本处理类

| 命令   | 英文原意                            | 中文含义                   |
| ------ | ----------------------------------- | -------------------------- |
| `echo` | echo                                | 输出内容到终端             |
| `grep` | global regular expression print     | 按模式匹配搜索文本         |
| `awk`  | Alfred Aho / Weinberger / Kernighan | 文本分析处理工具           |
| `sed`  | stream editor                       | 流式文本编辑器             |
| `cut`  | cut                                 | 按列剪切文本               |
| `sort` | sort                                | 排序文本                   |
| `uniq` | unique                              | 去重行                     |
| `wc`   | word count                          | 统计文件字数、行数、字节数 |

### 其他有用命令

| 命令    | 英文原意 | 中文含义           |
| ------- | -------- | ------------------ |
| `man`   | manual   | 查看命令手册       |
| `date`  | date     | 显示或设置系统时间 |
| `cal`   | calendar | 显示日历           |
| `alias` | alias    | 创建命令别名       |
| `top`   | top      | 动态监控系统状态   |
| `which` | which    | 查看命令的实际路径 |

## vim

`vim` 是一种强大的文本编辑器，广泛应用于代码编写和文件编辑。它有丰富的功能，支持多种编辑模式。以下是一些基本的 `vim` 使用方法：

### 1. 启动 `vim`

在终端中输入 `vim <文件名>`，如果文件不存在，`vim` 会创建新文件。

```
vim filename.txt
```

### 2. 基本模式

`vim` 有三种基本模式：

- **普通模式**：你进入 `vim` 后，默认处于普通模式，可以用来浏览和编辑文件。
- **插入模式**：在普通模式下按 `i` 进入插入模式，允许你输入文本。按 `Esc` 键返回普通模式。
- **命令模式**：在普通模式下输入冒号（`:`）进入命令模式，用于执行保存、退出等操作。

### 3. 常用命令

- **移动光标**：
  - `h`：左移一格
  - `j`：下移一格
  - `k`：上移一格
  - `l`：右移一格
- **保存文件**：
  - 在命令模式下输入 `:w` 然后回车保存文件。
- **退出 `vim`**：
  - 输入 `:q` 退出。
  - 输入 `:wq` 保存并退出。
  - 输入 `:q!` 强制退出而不保存。
- **删除内容**：
  - `dd` 删除当前行。
  - `dw` 删除当前光标所在位置到单词末尾的内容。
  - `d$` 删除从光标位置到行尾的内容。
- **复制粘贴**：
  - `yy` 复制当前行。
  - `p` 在光标后粘贴内容。

### 4. 查找与替换

- **查找**：在命令模式下输入 `/`，然后输入要查找的内容，按回车查找。例如，`/text` 查找 “text”。
- **替换**：在命令模式下输入 `:%s/old/new/g` 来替换文件中的所有 “old” 为 “new”。

### 5. 其他功能

- **撤销**：按 `u` 撤销上一步操作。
- **重做**：按 `Ctrl + r` 重做撤销的操作。

### nano 与 vim 区别

| 特性       | nano                         | vim                                      |
| ---------- | ---------------------------- | ---------------------------------------- |
| 操作模式   | 只有一种模式（直接编辑）     | 有三种模式：普通模式、插入模式、命令模式 |
| 进入编辑   | 打开后即可输入文字           | 需先按 `i` 进入插入模式                  |
| 保存退出   | Ctrl + O 保存，Ctrl + X 退出 | 输入 `:wq` 保存并退出                    |
| 退出不保存 | Ctrl + X，然后按 `N`         | 输入 `:q!` 退出不保存                    |

## zip、tar

### 压缩文件

- **tar 格式**（常见于 Linux 和 macOS）：
  ```bash
  tar -czvf archive_name.tar.gz folder_or_file_to_compress
  ```
  其中：
  - `-c` 创建新档案
  - `-z` 使用 gzip 压缩
  - `-v` 显示压缩过程
  - `-f` 指定档案文件名
- **zip 格式**：
  ```bash
  zip -r archive_name.zip folder_or_file_to_compress
  ```
  其中：
  - `-r` 递归压缩整个文件夹及其内容。

### 解压文件

- **tar 格式**：
  ```bash
  tar -xzvf archive_name.tar.gz
  ```
  其中：
  - `-x` 解压文件
  - `-z` 使用 gzip 解压
  - `-v` 显示解压过程
  - `-f` 指定档案文件名
  ```bash
  tar -xzf filename.tar.gz -C filename
  ```
- **zip 格式**：

  ```bash
  unzip archive_name.zip
  ```

  ```bash
  unzip filename.zip -d filename
  ```

  - `filename.zip` 是压缩文件名

  - `-d filename` 表示解压到 `filename/` 文件夹中（会自动创建）

## 设置环境变量

| 文件               | 生效范围 | 用途                   |
| ------------------ | -------- | ---------------------- |
| `~/.bashrc`        | 当前用户 | 常规环境变量、命令别名 |
| `/etc/bash.bashrc` | 所有用户 | 全局 Shell 配置        |
| `/etc/environment` | 所有用户 | 登录时全局环境变量     |

设置系统级环境变量

1️⃣ 打开文件（需要管理员权限）:

```bash
sudo nano /etc/environment
```

2️⃣ 将需要添加的路径加进去，每个路径间用`:`分隔

3️⃣ 保存退出（Ctrl+O → 回车 → Ctrl+X）

4️⃣ 让更改生效：

```bash
source /etc/environment
```

## 应用菜单中添加安装的应用

`/usr/share/applications/` 目录下放的都是 系统级的桌面快捷方式 (.desktop 文件)，用于在 Ubuntu 的「应用程序菜单」里显示图标，比如在 Activities 搜索栏里输入 “PyCharm” 就能打开。

1️⃣ 打开终端，创建一个 .desktop 文件（如果之前没创建过）：

```bash
sudo nano /usr/share/applications/pycharm.desktop
```

2️⃣ 内容示例（Community 版本）：

```ini [pycharm.desktop]
[Desktop Entry]
Version=1.0
Type=Application
Name=PyCharm Community
Icon=/opt/pycharm/bin/pycharm.png
Exec="/opt/pycharm/bin/pycharm.sh" %F
Comment=Python IDE
Categories=Development;IDE;
Terminal=false
StartupWMClass=jetbrains-pycharm
MimeType=inode/directory;text/plain;application/x-python-code;
NoDisplay=false
```

> [!NOTE] 关键点：
>
> Icon 和 Exec 路径改成你实际安装路径
>
> MimeType=inode/directory; → 支持打开文件夹
>
> %F → 支持传入多个文件或文件夹
>
> NoDisplay=false → 让应用显示在菜单中

3️⃣ 保存退出：`Ctrl+O → Enter → Ctrl+X `

4️⃣ 更新桌面数据库：

```bash
sudo update-desktop-database
```

5️⃣ 重启文件管理器（确保更改生效）：

```bash
nautilus -q
nautilus &
```

## 配置为系统服务

创建修改文件

```bash
sudo nano /etc/systemd/system/mongod.service
```

```ini [mongod.service]
[Unit]
Description=MongoDB Database Server
After=network.target

[Service]
User=jin
Group=jin
ExecStart=/home/jin/jin/sofeware/mongodb-linux-x86_64-amazon2023-8.2.1/bin/mongod -f /home/jin/jin/sofeware/mongodb-linux-x86_64-amazon2023-8.2.1/conf/mongod.conf
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
LimitNOFILE=64000

[Install]
WantedBy=multi-user.target
```

重新加载 systemd 并启用服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable mongod      # 开机自启
sudo systemctl restart mongod     # 启动服务
sudo systemctl status mongod      # 查看状态
```

## 命令实例

### 找到文件位置

```bash
sudo find / -type f -name nginx 2>/dev/null
```

超实用速查表

| 目的         | 命令                          |
| ------------ | ----------------------------- |
| 模糊查 nginx | `find / -iname '*nginx*'`     |
| 忽略大小写   | `-iname`                      |
| 只找文件     | `-type f`                     |
| 只找目录     | `-type d`                     |
| 全系统查     | `sudo find / ... 2>/dev/null` |
| 精确查       | `-name nginx`                 |

- `sudo` 以管理员（root）权限执行

普通用户很多目录（如 /root、/proc、/var/lib）没权限
不加 sudo 会大量报错：Permission denied
👉 加 sudo = 查得更全

- `find` 查找
  在指定目录中，按条件递归查找文件或目录

- `/` 表示从系统根目录开始找
  查找起点目录

```text
/
├── bin
├── etc
├── home
├── usr
├── var
└── ...
```

- `-type f` 只查找“普通文件”

| 参数 | 含义     |
| ---- | -------- |
| `f`  | 普通文件 |
| `d`  | 目录     |
| `l`  | 软链接   |
| `c`  | 字符设备 |
| `b`  | 块设备   |

- `-name nginx`

按文件名精确匹配

- 只匹配 文件名正好等于 nginx

- 不包含路径

- 区分大小写

比如能找到：

```text
/usr/sbin/nginx
/home/jack/nginx
```

但找不到：

```text
nginx.conf
nginx.exe
nginx.old
```

- `2>/dev/null`

把错误信息“丢掉”

这是很多人不太懂的一段，重点来了 👇

Linux 的三种标准流

| 编号 | 含义               |
| ---- | ------------------ |
| `0`  | stdin（输入）      |
| `1`  | stdout（正常输出） |
| `2`  | stderr（错误输出） |

这段的意思：

```bash
2> /dev/null
```

- `2>`：重定向 错误输出

- `/dev/null`：Linux 的“黑洞”

所有权限错误、警告信息直接丢弃

👉 效果：

- 终端只显示 真正找到的结果

- 不被 Permission denied 刷屏
