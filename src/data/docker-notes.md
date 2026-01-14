---
title: "Docker 容器化实战笔记"
date: "2026-01-14"
excerpt: "全面掌握 Docker 的核心概念、镜像构建优化、容器编排以及在 CI/CD 流水线中的应用实践。"
readTime: "12 分钟"
wordCount: 3800
views: 450
comments: 8
category: "运维"
tags: ["Docker", "容器化", "DevOps"]
isSticky: false
---

# Docker 容器化实战笔记

## 1. 核心概念回顾

Docker 改变了软件交付的方式。

### 镜像与容器
- **镜像 (Image)**: 只读模板，包含运行应用所需的所有环境。
- **容器 (Container)**: 镜像的运行实例，轻量级、隔离性好。

## 2. Dockerfile 最佳实践

编写高效的 Dockerfile 可以显著减小镜像体积。

```dockerfile
# 使用多阶段构建
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
CMD ["./main"]
```

## 3. Docker Compose 编排

使用 `docker-compose.yml` 管理多容器应用。

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```
