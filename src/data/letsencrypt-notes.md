---
title: "Let's Encrypt 免费证书申请实战"
date: "2026-01-14"
excerpt: "使用 Certbot 申请和自动续期 Let's Encrypt 免费 SSL 证书，实现全站 HTTPS 安全访问。"
readTime: "10 分钟"
wordCount: 2800
views: 350
comments: 6
category: "运维"
tags: ["HTTPS", "SSL", "Security", "Let's Encrypt"]
isSticky: false
---

# Let's Encrypt 免费证书申请实战

## 1. 简介

Let's Encrypt 是一个免费、自动化和开放的证书颁发机构（CA），由 ISRG（Internet Security Research Group）运行。通过 Certbot 工具，我们可以轻松地为网站启用 HTTPS。

## 2. 安装 Certbot

在 Ubuntu/Debian 系统上：

```bash
sudo apt update
sudo apt install snapd
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## 3. Nginx 自动配置

如果你的 Nginx 已经配置好了 80 端口的站点，Certbot 可以自动检测并修改配置。

```bash
sudo certbot --nginx
```

按照提示选择要启用 HTTPS 的域名，Certbot 会自动修改 Nginx 配置文件，添加 SSL 相关的配置项，并强制重定向 HTTP 到 HTTPS。

## 4. 泛域名证书申请

如果需要申请 `*.example.com` 这样的泛域名证书，通常需要使用 DNS 验证方式。

```bash
sudo certbot certonly --manual --preferred-challenges dns -d "*.example.com" -d "example.com"
```

按照提示在 DNS 提供商处添加 TXT 记录进行验证。

## 5. 自动续期

Let's Encrypt 证书有效期为 90 天。Certbot 通常会自动设置定时任务来检查和续期证书。

手动测试自动续期是否正常：

```bash
sudo certbot renew --dry-run
```

## 6. 常见问题

- **Nginx 重载**: 证书更新后，需要重载 Nginx 才能生效。Certbot 的自动任务通常包含此步骤，也可以手动添加 hook。
- **防火墙**: 确保 80 和 443 端口已开放。
