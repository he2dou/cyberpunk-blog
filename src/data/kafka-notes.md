---
title: "Kafka 消息队列深度解析"
date: "2026-01-14"
excerpt: "深入理解 Kafka 的高吞吐架构、分区机制、消费者组以及 Exactly-once 语义实现。"
readTime: "18 分钟"
wordCount: 5000
views: 600
comments: 15
category: "中间件"
tags: ["Kafka", "消息队列", "分布式系统"]
isSticky: false
---

# Kafka 消息队列深度解析

## 1. 核心架构

Kafka 是一个分布式流处理平台。

- **Producer**: 生产者，发送消息。
- **Broker**: 存储消息的服务器节点。
- **Consumer**: 消费者，读取消息。
- **Zookeeper/KRaft**: 负责集群元数据管理。

## 2. 高性能设计

### 顺序写磁盘
Kafka 利用磁盘顺序读写的高性能（接近内存随机读写）来保证吞吐量。

### Zero Copy (零拷贝)
利用 `sendfile` 系统调用，减少内核态与用户态的数据拷贝。

## 3. 消息可靠性

- **acks=all**: 确保所有 ISR (In-Sync Replicas) 都收到消息。
- **幂等性 Producer**: 保证消息不重复发送。
- **事务支持**: 实现跨分区写入的原子性。
