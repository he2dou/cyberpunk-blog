---
title: "SQLite 轻量级数据库实战指南"
date: "2026-01-13"
excerpt: "为什么 SQLite 是世界上部署最广泛的数据库？从嵌入式设备到移动应用，探索 SQLite 的零配置魅力与 WAL 模式优化。"
readTime: "10 分钟"
wordCount: 3200
views: 210
comments: 2
category: "数据库"
tags: ["SQLite", "嵌入式", "移动开发"]
isSticky: false
---

# SQLite 轻量级数据库实战指南

## 1. 简介：不仅仅是玩具

很多人误以为 SQLite 只能用于玩具项目或测试环境。实际上，SQLite 是世界上部署最广泛的数据库引擎。从 Android/iOS 系统核心到浏览器内部，到处都有它的身影。

**核心特点：**
*   **Serverless**: 不需要单独的服务器进程。
*   **Zero Configuration**: 无需配置，即插即用。
*   **Single File**: 整个数据库存储在一个磁盘文件中。

## 2. WAL 模式 (Write-Ahead Logging)

默认情况下，SQLite 使用 rollback journal 来实现原子提交。但在高并发读写场景下，性能可能受限。

开启 **WAL 模式** 可以显著提升并发性能：

```sql
PRAGMA journal_mode=WAL;
```

**WAL 的优势：**
1.  写操作不再阻塞读操作，读操作也不阻塞写操作。
2.  磁盘 I/O 通常更顺序，性能更好。

## 3. JSON 支持

现代 SQLite 版本（3.9.0+）内置了强大的 JSON 支持。你可以像操作 NoSQL 一样操作 SQLite。

```sql
-- 创建表
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  data JSON
);

-- 插入 JSON 数据
INSERT INTO users (data) VALUES (json('{"name": "Alice", "age": 30}'));

-- 查询 JSON 字段
SELECT json_extract(data, '$.name') FROM users WHERE json_extract(data, '$.age') > 20;
```

## 4. 常见坑点与最佳实践

*   **写入并发**: 虽然 WAL 改善了并发，但 SQLite 同一时刻仍然只允许一个写操作。对于极高写入并发的 Web 应用，可能不是最佳选择。
*   **事务管理**: 显式使用事务 `BEGIN TRANSACTION` 和 `COMMIT` 可以极大提高批量插入的速度（从每秒几十条提升到每秒数万条）。
*   **VACUUM**: 定期执行 `VACUUM` 命令可以重建数据库文件，回收未使用的空间并减少碎片。

## 5. 结语

SQLite 证明了"小而美"的哲学。在边缘计算和本地优先（Local-First）软件架构日益流行的今天，SQLite 的价值正在被重新评估。
