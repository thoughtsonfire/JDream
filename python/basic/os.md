# os 库

📌 Python os 库常用方法对照表

## 路径与目录操作

| 功能             | 方法/属性                                          | 示例                                                                                                                                                           |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 获取当前工作目录 | `os.getcwd()`                                      | `os.getcwd()` → `C:\Users\jack`                                                                                                                                |
| 修改工作目录     | `os.chdir(path)`                                   | `os.chdir("C:/Users")`                                                                                                                                         |
| 拼接路径         | `os.path.join(a, b, ...)`                          | `os.path.join("C:/Users", "jack")`                                                                                                                             |
| 绝对路径         | `os.path.abspath(path)`                            | `os.path.abspath("test.txt")` <br> 如果 `path` 本来就是绝对路径 → 直接返回它，<br>如果 `path` 是相对路径 → 以当前工作目录 (`os.getcwd()`) 为基础拼出完整路径。 |
| 分离目录和文件名 | `os.path.dirname(path)` / `os.path.basename(path)` | `dirname("a/b/c.txt")` → `a/b`                                                                                                                                 |
| 拆分路径         | `os.path.split(path)`                              | `split("a/b/c.txt")` → `("a/b", "c.txt")`                                                                                                                      |
| 获取文件扩展名   | `os.path.splitext(path)`                           | `splitext("c.txt")` → `("c", ".txt")`                                                                                                                          |

## 文件/文件夹管理

| 功能               | 方法                               | 示例                                     |
| ------------------ | ---------------------------------- | ---------------------------------------- |
| 判断路径是否存在   | `os.path.exists(path)`             | `os.path.exists("file.txt")`             |
| 判断是否是文件     | `os.path.isfile(path)`             | `os.path.isfile("file.txt")`             |
| 判断是否是文件夹   | `os.path.isdir(path)`              | `os.path.isdir("folder")`                |
| 创建文件夹         | `os.mkdir(path)`                   | `os.mkdir("newdir")`                     |
| 创建多级文件夹     | `os.makedirs(path, exist_ok=True)` | `os.makedirs("a/b/c")`                   |
| 删除文件           | `os.remove(path)`                  | `os.remove("file.txt")`                  |
| 删除空文件夹       | `os.rmdir(path)`                   | `os.rmdir("empty")`                      |
| 删除文件夹（非空） | `shutil.rmtree(path)`              | `shutil.rmtree("dir")`                   |
| 列出目录内容       | `os.listdir(path)`                 | `os.listdir(".")`                        |
| 遍历目录树         | `os.walk(path)`                    | `for root, dirs, files in os.walk("."):` |

## 系统信息

| 功能            | 方法/属性                | 示例                                  |
| --------------- | ------------------------ | ------------------------------------- |
| 操作系统类型    | `os.name`                | `"nt"`(Windows), `"posix"`(Linux/Mac) |
| 系统平台        | `os.uname()` (Linux/Mac) | `os.uname().sysname`                  |
| 当前登录用户名  | `os.getlogin()`          | `os.getlogin()`                       |
| 当前进程 ID     | `os.getpid()`            | `os.getpid()`                         |
| 父进程 ID       | `os.getppid()`           | `os.getppid()`                        |
| 获取 CPU 核心数 | `os.cpu_count()`         | `os.cpu_count()`                      |

## 环境变量

| 功能             | 方法                          | 示例                          |
| ---------------- | ----------------------------- | ----------------------------- |
| 获取所有环境变量 | `os.environ`                  | `os.environ["PATH"]`          |
| 获取指定环境变量 | `os.environ.get("VAR")`       | `os.environ.get("JAVA_HOME")` |
| 设置环境变量     | `os.environ["VAR"] = "value"` | `os.environ["MYAPP"] = "123"` |

## 文件属性

| 功能             | 方法                     | 示例                           |
| ---------------- | ------------------------ | ------------------------------ |
| 获取文件大小     | `os.path.getsize(path)`  | `os.path.getsize("file.txt")`  |
| 获取最后修改时间 | `os.path.getmtime(path)` | `os.path.getmtime("file.txt")` |
| 获取最后访问时间 | `os.path.getatime(path)` | `os.path.getatime("file.txt")` |
| 获取创建时间     | `os.path.getctime(path)` | `os.path.getctime("file.txt")` |

## shutil 常用方法对照表

| 方法                                               | 功能说明                                                   | 示例                                                 |
| -------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| `shutil.copy(src, dst)`                            | 复制文件到目标路径（保留内容，不保留权限/元数据）          | `shutil.copy("a.txt", "backup/a.txt")`               |
| `shutil.copy2(src, dst)`                           | 复制文件到目标路径，**保留元信息**（如修改时间、权限等）   | `shutil.copy2("a.txt", "backup/a.txt")`              |
| `shutil.copyfile(src, dst)`                        | 复制文件内容到目标（**目标必须是文件**，且已存在会被覆盖） | `shutil.copyfile("a.txt", "b.txt")`                  |
| `shutil.copytree(src, dst)`                        | 递归复制整个目录树（默认要求 `dst` 不存在）                | `shutil.copytree("project", "project_backup")`       |
| `shutil.move(src, dst)`                            | 移动文件或目录（类似 `mv` 命令）                           | `shutil.move("a.txt", "new_dir/")`                   |
| `shutil.rmtree(path)`                              | 递归删除整个目录（危险 ⚠️，相当于 `rm -rf`）               | `shutil.rmtree("temp_folder")`                       |
| `shutil.disk_usage(path)`                          | 获取磁盘使用情况（总空间、已用、可用）                     | `total, used, free = shutil.disk_usage("/")`         |
| `shutil.chown(path, user=None, group=None)`        | 修改文件/目录的用户和用户组（Linux/Unix）                  | `shutil.chown("file.txt", user="jack")`              |
| `shutil.which(cmd)`                                | 在系统 PATH 中查找可执行文件路径                           | `shutil.which("python")`                             |
| `shutil.make_archive(base_name, format, root_dir)` | 创建压缩包（zip/tar/gztar 等）                             | `shutil.make_archive("backup", "zip", "project")`    |
| `shutil.unpack_archive(filename, extract_dir)`     | 解压压缩包到指定目录                                       | `shutil.unpack_archive("backup.zip", "restore_dir")` |
| `shutil.get_archive_formats()`                     | 获取支持的压缩格式                                         | `shutil.get_archive_formats()`                       |
| `shutil.get_terminal_size()`                       | 获取终端大小（列数、行数）                                 | `shutil.get_terminal_size()`                         |
