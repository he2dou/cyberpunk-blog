---
title: "Percona Toolkit 数据库运维神器"
date: "2026-01-14"
excerpt: "掌握 Percona Toolkit 常用工具，轻松应对 MySQL 数据校验、在线架构变更和慢查询分析。"
readTime: "10 分钟"
wordCount: 3200
views: 280
comments: 3
category: "数据库工具"
tags: ["MySQL", "运维", "Percona"]
isSticky: false
---

# Percona Toolkit 数据库运维神器

## 1. pt-online-schema-change

在线修改大表结构而不锁表，是 DBA 的必备技能。

```bash
pt-online-schema-change \
  --alter "ADD COLUMN status TINYINT DEFAULT 0" \
  --execute \
  D=mydatabase,t=users
```

## 2. pt-table-checksum & pt-table-sync

用于主从复制数据一致性校验与修复。

- **pt-table-checksum**: 在主库执行，检查从库数据是否一致。
- **pt-table-sync**: 根据校验结果修复不一致的数据。

## 3. pt-query-digest

分析慢查询日志，生成详细的查询报告。

```bash
pt-query-digest /var/lib/mysql/slow.log > report.txt
```
