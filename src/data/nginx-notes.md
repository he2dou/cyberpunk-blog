---
title: "Nginx 高性能配置与调优"
date: "2026-01-14"
excerpt: "Nginx 核心配置详解，反向代理、负载均衡策略、HTTPS 配置及性能优化参数指南。"
readTime: "14 分钟"
wordCount: 4200
views: 780
comments: 20
category: "运维"
tags: ["Nginx", "负载均衡", "Web服务器"]
isSticky: false
---

# Nginx 高性能配置与调优

## 1. 基础架构

Nginx 采用事件驱动、异步非阻塞架构，能够处理海量并发连接。

- **Master Process**: 管理 Worker 进程。
- **Worker Process**: 处理网络请求。

## 2. 常用配置场景

### 反向代理
```nginx
location /api/ {
    proxy_pass http://backend_server;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### 负载均衡
```nginx
upstream backend {
    server 10.0.0.1:8080 weight=3;
    server 10.0.0.2:8080;
    server 10.0.0.3:8080 backup;
}
```

## 3. 性能优化

- **worker_processes**: 设置为 CPU 核心数。
- **worker_connections**: 每个 Worker 的最大连接数。
- **keepalive_timeout**: 保持连接的时间。
- **gzip**: 开启 Gzip 压缩减少传输流量。
