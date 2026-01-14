---
title: "MySQL 高级特性与性能优化笔记"
date: "2026-01-14"
excerpt: "深入探讨 MySQL 的索引优化、事务隔离级别以及在高并发场景下的锁机制。包含 Explain 分析实战与分库分表策略。"
readTime: "15 分钟"
wordCount: 4500
views: 320
comments: 5
category: "数据库"
tags: ["MySQL", "后端开发", "性能优化"]
isSticky: false
---

# MySQL 高级特性与性能优化笔记

## 1. 索引优化实战

在处理千万级数据时，索引的正确使用至关重要。

### B+树原理
MySQL 的 InnoDB 存储引擎使用 B+ 树作为索引结构。相比 B 树，B+ 树的叶子节点存储了所有数据，并且通过双向链表连接，非常适合范围查询。

### 联合索引与最左前缀原则
建立联合索引 `(a, b, c)` 时，相当于建立了 `(a)`, `(a, b)`, `(a, b, c)` 三个索引。
查询时必须遵循**最左前缀原则**，否则索引可能失效。

```sql
-- 索引生效
SELECT * FROM table WHERE a = 1 AND b = 2;

-- 索引失效（跳过了 a）
SELECT * FROM table WHERE b = 2 AND c = 3;
```

## 2. Explain 执行计划分析

使用 `EXPLAIN` 关键字可以查看 SQL 的执行计划。

*   **type**: 访问类型，性能从好到坏依次是：`system > const > eq_ref > ref > range > index > all`。
*   **key**: 实际使用的索引。
*   **rows**: 预计扫描的行数。
*   **Extra**: 额外信息，如 `Using index` (覆盖索引，好), `Using filesort` (需要文件排序，坏), `Using temporary` (需要临时表，坏)。

## 3. 事务隔离级别

MySQL 默认的隔离级别是 **REPEATABLE-READ (可重复读)**。

*   **READ UNCOMMITTED**: 读未提交，存在脏读。
*   **READ COMMITTED**: 读已提交，解决脏读，存在不可重复读。
*   **REPEATABLE READ**: 可重复读，解决不可重复读，通过 MVCC + Next-Key Lock 解决幻读。
*   **SERIALIZABLE**: 串行化，效率最低。

## 4. 锁机制

*   **乐观锁**: 基于版本号实现，适用于多读少写。
*   **悲观锁**: `SELECT ... FOR UPDATE`。
*   **间隙锁 (Gap Lock)**: 锁定一个范围，但不包括记录本身，用于防止幻读。

## 5. 总结

性能优化是一个系统工程，除了 SQL 层面，还需要考虑硬件配置、参数调优以及架构层面的缓存策略（如 Redis）和读写分离。
