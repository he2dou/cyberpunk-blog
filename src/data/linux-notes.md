---
title: "Linux 运维与开发生存手册"
date: "2026-01-15"
excerpt: "掌握 Linux 命令行是每个开发者的必修课。涵盖文件权限、进程管理、SSH 技巧以及 Systemd 服务配置的核心知识点。"
readTime: "9 分钟"
wordCount: 3100
views: 890
comments: 28
category: "操作系统"
tags: ["Linux", "Shell", "Ubuntu", "运维", "SSH"]
isSticky: false
---

# Linux 运维与开发生存手册

无论你是后端开发、运维工程师，还是使用 WSL 的前端，Linux 都是绕不开的基础设施。

## 1. 文件权限与所有权

理解 `rwx` (Read, Write, Execute) 是基础。

```bash
# 修改权限 (数字法)
# 7 = 4(r) + 2(w) + 1(x)
chmod 755 script.sh  # 所有者rwx，组rx，其他人rx

# 修改所有者
chown user:group filename
chown -R user:group directory/  # 递归修改
```

## 2. 进程管理

当服务卡死或需要监控性能时：

*   `top` / `htop`: 实时查看系统资源占用。
*   `ps aux | grep nginx`: 查找特定进程。
*   `kill -9 <PID>`: 强制终止进程（慎用）。
*   `lsof -i :8080`: 查看谁占用了 8080 端口。

## 3. SSH 高级技巧

SSH 不仅仅是远程登录。

```bash
# 生成密钥对
ssh-keygen -t ed25519 -C "email@example.com"

# 免密登录配置 (~/.ssh/config)
Host myserver
    HostName 192.168.1.100
    User root
    IdentityFile ~/.ssh/id_ed25519

# 端口转发 (将远程 8080 映射到本地 3000)
ssh -L 3000:localhost:8080 user@remote
```

## 4. Systemd 服务管理

现代 Linux 发行版的主流初始化系统。

创建一个简单的服务文件 `/etc/systemd/system/myapp.service`:

```ini
[Unit]
Description=My Node App
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/app
ExecStart=/usr/bin/node index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

常用命令：
```bash
systemctl start myapp
systemctl enable myapp  # 开机自启
systemctl status myapp
journalctl -u myapp -f  # 查看实时日志
```

## 5. 文本处理三剑客

虽然现在有 AI，但掌握基础的文本处理依然高效：

*   **grep**: 过滤内容
    *   `grep -r "TODO" .`: 递归查找当前目录下的 "TODO"。
*   **awk**: 列处理
    *   `docker ps | awk '{print $1}'`: 打印 Docker 容器 ID（第一列）。
*   **sed**: 流编辑
    *   `sed -i 's/old/new/g' file.txt`: 替换文件中的字符串。

## 总结

Linux 的哲学是 "Everything is a file" 和 "组合小程序完成大任务"。熟练掌握命令行，能让你在服务器上如履平地。
