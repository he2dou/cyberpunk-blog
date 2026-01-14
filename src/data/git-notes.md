---
title: "Git 高级工作流与技巧"
date: "2026-01-14"
excerpt: "探索 Git 内部原理，掌握 Rebase、Cherry-pick 等高级命令，以及 Git Flow 和 Trunk Based Development 工作流。"
readTime: "8 分钟"
wordCount: 2500
views: 520
comments: 12
category: "开发工具"
tags: ["Git", "版本控制", "团队协作"]
isSticky: false
---

# Git 高级工作流与技巧

## 1. 常用高级命令

### Cherry-pick
将特定提交应用到当前分支。

```bash
git cherry-pick <commit-hash>
```

### Rebase (变基)
保持提交历史整洁。

```bash
git checkout feature
git rebase main
```

## 2. 工作流模型

### Git Flow
经典的双主分支（main, develop）模型，适合版本发布周期较长的项目。

### Trunk Based Development
主干开发，频繁集成，适合 CI/CD 和快速迭代的团队。

## 3. 常见问题解决

- **修改最后一次提交**: `git commit --amend`
- **撤销本地修改**: `git checkout -- <file>`
- **强制推送 (慎用)**: `git push -f`

## 4. 性能优化
- **使用 shallow clone**: `git clone --depth 1 <repo>`
- **配置 Git 缓存**: `git config --global core.preloadindex true`

### 撤消合并
如果不小心合并了错误的分支，使用 `git reset --hard HEAD~1 或者 git reset --merge HEAD~1 ` 可以撤消最近一次合并。
- **`--hard`**: 丢弃所有未提交的更改。
- **`--merge`**: 尝试合并更改，保留提交历史。

暂存未提交的代码
```bash
#保存：
git stash

#显示：
git stash list

#导入：
git stash pop

```
