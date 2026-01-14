export const posts = [
  {
    id: "1",
    title: "阿小信的自由职业周记：2025年第51周 (12.15-12.21)",
    excerpt: "2年自由职业独立开发者的第51周周记：4个小工具 + 87.9公里骑行 + 3篇干货输出，在代码、运动与内容创作中平衡，吐槽 AdSense 限制与设备痛点，分享冷门赛道深耕思路与自由职业真实日常~",
    date: "2025-12-21",
    readTime: "8 分钟",
    wordCount: 3895,
    views: 140,
    comments: 0,
    category: "日常碎片",
    tags: ["周记", "自由职业", "独立开发"],
    isSticky: true,
    content: `
# 自由职业周记：第51周

## 本周概览

这周的主要精力花在了几个小工具的开发上，同时坚持了骑行运动。

### 🛠️ 开发进展

1.  **CyberNote**: 完成了 Markdown 编辑器的核心功能。
2.  **TimeTrack**: 修复了 iOS 端的数据同步 bug。
3.  **Blog Theme**: 也就是现在你看到的这个主题，进行了大改版。

### 🚴 运动记录

本周骑行总里程 **87.9km**。
- 周二：20km 夜骑
- 周五：30km 沿河骑行
- 周日：37.9km 城市探索

## 💡 思考与感悟

> "自由职业不是逃避工作的避风港，而是对自我管理能力的终极考验。"

AdSense 的限制确实让人头疼，但这也是倒逼我们寻找更多元化收入来源的契机。
    `
  },
  {
    id: "2",
    title: "深度解析：为什么赛博朋克风格在 2026 年再次流行？",
    excerpt: "随着 AI 技术的爆发和虚拟现实的普及，赛博朋克所描绘的‘高科技低生活’似乎正在成为现实。本文从视觉设计、社会心理学和技术美学三个维度分析这一现象。",
    date: "2026-01-10",
    readTime: "12 分钟",
    wordCount: 5200,
    views: 2350,
    comments: 42,
    category: "设计美学",
    tags: ["Cyberpunk", "Design", "Trend"],
    content: `
# 赛博朋克复兴：2026

## 视觉设计的回归

在经历了极简主义的长期统治后，人们开始渴望**视觉上的刺激**和**信息的密度**。

- **霓虹色**: 不再是廉价的装饰，而是情绪的表达。
- **故障艺术**: 象征着系统的脆弱性和不确定性。

\`\`\`css
.cyber-glitch {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  animation: glitch 1s infinite linear alternate-reverse;
}
\`\`\`

## 社会心理学动因

AI 的普及让我们重新审视"人"的定义。当算法比我们更了解自己，赛博朋克作品中的身份危机便成为了现实的投影。

| 维度 | 2020s 早期 | 2026 现状 |
| :--- | :--- | :--- |
| 技术 | 辅助工具 | 决策主体 |
| 隐私 | 数据泄露 | 算法透明人 |
| 美学 | 扁平化 | 高保真/故障风 |
    `
  },
  {
    id: "3",
    title: "React 19 Server Components 实战指南",
    excerpt: "摆脱 hydration 的烦恼，拥抱原生流式传输。React 19 带来的不仅仅是性能提升，更是开发范式的彻底转变。让我们一起构建一个零 JS 负担的博客系统。",
    date: "2026-01-05",
    readTime: "15 分钟",
    wordCount: 6800,
    views: 5120,
    comments: 128,
    category: "前端技术",
    tags: ["React", "RSC", "Performance"],
    content: `
# React 19: Server Components 实战

## 为什么需要 RSC?

传统的 SSR (Server Side Rendering) 虽然解决了首屏渲染问题，但在 Hydration 阶段仍然需要下载和执行大量 JS。

**RSC (React Server Components)** 允许我们在服务器端运行 React 组件，直接发送 HTML 给客户端，且**不需要**在客户端 Hydrate 这些组件。

## 代码示例

\`\`\`tsx
// NoteList.server.tsx
import db from './db';

export default async function NoteList() {
  const notes = await db.posts.findAll();
  
  return (
    <div className="space-y-4">
      {notes.map(note => (
        <SidebarNote key={note.id} note={note} />
      ))}
    </div>
  );
}
\`\`\`

## 性能对比

1. **Bundle Size**: 减少 30% - 50%
2. **TTI (Time to Interactive)**: 显著提升
    `
  }
];

export const getPostById = (id: string) => posts.find(p => p.id === id);
