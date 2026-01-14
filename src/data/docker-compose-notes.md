---
title: "Docker Compose 容器编排指南"
date: "2026-01-14"
excerpt: "深入理解 Docker Compose 的配置文件结构、常用命令以及多容器应用的最佳实践。"
readTime: "12 分钟"
wordCount: 3000
views: 380
comments: 4
category: "运维"
tags: ["Docker", "Docker Compose", "容器编排"]
isSticky: false
---

# Docker Compose 容器编排指南

## 1. 简介

Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YAML 文件来配置应用程序的服务。

### docker-compose 安装
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

docker-compose --version
```

## 2. docker-compose.yml 结构

一个典型的 `docker-compose.yml` 文件包含 version, services, networks, volumes 等部分。

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
    networks:
      - backend

  db:
    image: postgres:15
    volumes:
      - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: example
    networks:
      - backend

networks:
  backend:

volumes:
  db_data:
```

## 3. 常用命令

- **启动服务**: `docker-compose up -d` (后台运行)
- **停止服务**: `docker-compose down` (停止并移除容器、网络)
- **查看日志**: `docker-compose logs -f [service_name]`
- **构建镜像**: `docker-compose build`
- **查看状态**: `docker-compose ps`
- **进入容器**: `docker-compose exec [service_name] /bin/bash`

## 4. 进阶技巧

### 环境变量
支持读取 `.env` 文件中的变量，方便在不同环境中切换配置。

### 依赖控制
使用 `depends_on` 控制启动顺序，但要注意它只等待容器启动，不等待服务就绪。建议配合 `healthcheck` 使用。

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
```

### 扩展服务
使用 `--scale` 参数快速扩展服务实例数量。
```bash
docker-compose up -d --scale app=3
```
