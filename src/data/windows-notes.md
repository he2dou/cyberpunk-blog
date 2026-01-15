---
title: "Windows 开发与效率指南"
date: "2026-01-15"
excerpt: "Windows 不再是开发者的噩梦。从 WSL 2 到 Windows Terminal，再到 PowerToys，探索如何将 Windows 打造成终极开发机器。"
readTime: "7 分钟"
wordCount: 2300
views: 650
comments: 15
category: "操作系统"
tags: ["Windows", "WSL", "PowerShell", "效率", "PowerToys"]
isSticky: false
---

# Windows 开发与效率指南

曾几何时，Windows 被认为是 Web 开发的二等公民。但随着 WSL 2 (Windows Subsystem for Linux) 和 Windows Terminal 的推出，情况发生了翻天覆地的变化。

## 1. WSL 2: 拥抱 Linux 内核

WSL 2 是在 Windows 上进行现代 Web 开发的基石。它允许你在 Windows 上直接运行原生的 Linux 二进制文件。

### 安装与常用命令
```powershell
# 安装 WSL (默认 Ubuntu)
wsl --install

# 列出已安装的分发版
wsl --list --verbose

# 关闭 WSL
wsl --shutdown
```

### 最佳实践
*   **文件系统**: 始终在 Linux 文件系统 (`\\wsl$\Ubuntu\home\username`) 中存储项目代码，而不是在 Windows 挂载盘 (`/mnt/c/`) 下，以获得最佳 I/O 性能。
*   **Docker集成**: 启用 Docker Desktop 的 WSL 2 后端，享受近乎原生的容器性能。

## 2. Windows Terminal

告别丑陋的 CMD 窗口。Windows Terminal 支持多标签、GPU 加速文本渲染和高度自定义。

*   **快捷键**:
    *   `Ctrl + Shift + T`: 新标签页
    *   `Ctrl + Shift + W`: 关闭标签页
    *   `Alt + Shift + +`: 垂直拆分窗格
*   **美化**: 推荐安装 "Cascadia Code" 字体和 "Oh My Posh" 来美化 PowerShell 提示符。

## 3. PowerShell 核心技巧

PowerShell 是一个基于对象的强大 Shell。

```powershell
# 查找进程
Get-Process | Where-Object {$_.CPU -gt 10}

# 类似于 grep
Select-String -Path "*.txt" -Pattern "Error"

# 别名
# ls -> Get-ChildItem
# cat -> Get-Content
# curl -> Invoke-WebRequest
```

## 4. PowerToys: 效率神器

微软官方出品的效率工具集，必装！

*   **FancyZones**: 强大的窗口平铺管理器，超宽屏用户必备。
*   **PowerToys Run** (`Alt + Space`): 快速启动器，替代原生搜索。
*   **Color Picker** (`Win + Shift + C`): 全局屏幕取色器。
*   **Image Resizer**: 右键菜单批量调整图片大小。

## 5. 常用快捷键

*   `Win + V`: 剪贴板历史（再也不用担心复制覆盖了）。
*   `Win + Shift + S`: 强大的截图工具。
*   `Win + .`: 表情符号选择器。
*   `Win + X`: 快速访问系统管理工具（终端管理员、磁盘管理等）。

## 常用命令

设置cmd命令行终端的代理

```bash
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890

```
## 总结

现在的 Windows + WSL 2 组合，既拥有 Windows 强大的桌面应用生态（Office, Adobe），又拥有完美的 Linux 开发环境。对于全栈开发者来说，这可能就是最好的选择。
