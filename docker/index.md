# docker

## 常用命令

1. 修改docker-compose.yml 文件重启

```bash
docker-compose up -d
```

2. 启动某个容器

```bash
docker start 容器名
```

3. 修改完 docker-compose.yaml 后

- 检查

```bash
docker compose config --quiet
```

- 重启

```bash
docker compose up -d --force-recreate
```

- docker compose up
  - 创建并启动服务（根据 docker-compose.yml）
  - 如果容器已经存在，会尝试重用现有容器（默认行为）
- -d / --detach
- 后台运行容器，不占用当前终端
- 你可以用 docker ps 查看运行状态
- --force-recreate
  - 强制重新创建容器，即使配置没有改动
  - 默认情况下，如果镜像或配置没变化，Compose 会重用老容器
  - 加了这个参数，每次都会删除旧容器再新建

| 方法                              | 启动范围                | 优点                                |
| --------------------------------- | ----------------------- | ----------------------------------- |
| `docker start $(docker ps -a -q)` | 系统里所有容器          | 简单粗暴，和 Compose 无关           |
| `docker compose up -d`            | 当前目录 Compose 项目   | 配置可控，支持依赖和网络            |
| 循环启动多个 Compose              | 多个目录的 Compose 项目 | 可以模拟“一次启动所有 Compose 项目” |
| Swarm / K8s                       | 集群级别                | 专业部署，大规模管理                |

| 分类               | 命令                                    | 说明                         |
| ------------------ | --------------------------------------- | ---------------------------- |
| **镜像管理**       | `docker images`                         | 查看本地镜像                 |
|                    | `docker pull <镜像>`                    | 拉取镜像                     |
|                    | `docker build -t <标签> .`              | 从 Dockerfile 构建镜像       |
|                    | `docker rmi <镜像>`                     | 删除镜像                     |
|                    | `docker tag <镜像> <新标签>`            | 给镜像打标签                 |
|                    | `docker push <仓库>/<镜像>`             | 上传镜像到仓库               |
| **容器管理**       | `docker ps`                             | 查看运行中的容器             |
|                    | `docker ps -a`                          | 查看所有容器                 |
|                    | `docker run -d --name <容器名> <镜像>`  | 后台启动新容器               |
|                    | `docker run -it <镜像> sh`              | 交互模式启动容器             |
|                    | `docker stop <容器>`                    | 停止容器                     |
|                    | `docker start <容器>`                   | 启动已停止容器               |
|                    | `docker restart <容器>`                 | 重启容器                     |
|                    | `docker rm <容器>`                      | 删除容器                     |
|                    | `docker logs <容器>`                    | 查看容器日志                 |
|                    | `docker exec -it <容器> sh`             | 进入运行中的容器             |
|                    | `docker stats`                          | 查看容器实时资源占用         |
| **卷管理**         | `docker volume ls`                      | 查看卷                       |
|                    | `docker volume create <卷名>`           | 创建卷                       |
|                    | `docker volume rm <卷名>`               | 删除卷                       |
| **网络管理**       | `docker network ls`                     | 查看网络                     |
|                    | `docker network create <网名>`          | 创建网络                     |
|                    | `docker network rm <网名>`              | 删除网络                     |
| **Docker Compose** | `docker compose up -d`                  | 启动 Compose 服务（后台）    |
|                    | `docker compose down`                   | 停止并删除服务、网络、卷     |
|                    | `docker compose logs`                   | 查看服务日志                 |
|                    | `docker compose ps`                     | 查看服务状态                 |
|                    | `docker compose build`                  | 构建镜像                     |
|                    | `docker compose up -d --force-recreate` | 强制重建容器                 |
|                    | `docker compose config`                 | 展示最终配置                 |
|                    | `docker compose config --quiet`         | 校验 Compose 文件是否有效    |
| **系统命令**       | `docker system prune`                   | 清理无用容器、镜像、网络、卷 |
|                    | `docker info`                           | 查看 Docker 系统信息         |
|                    | `docker version`                        | 查看 Docker 版本             |

## 导出容器，加载容器

### 导出镜像为 tar 包

```bash
docker save -o node-server.tar node-server:latest
```

### 在目标机器加载镜像

```bash
docker load -i node-server.tar
```

## MinIO

```bash
docker pull minio/minio:RELEASE.2025-04-08T15-41-24Z
```
