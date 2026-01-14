export default function Categories() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold text-neon-blue">文章分类</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Placeholder Categories */}
        {["前端开发", "后端架构", "AI 探索", "赛博朋克", "生活随笔"].map((cat) => (
          <div key={cat} className="p-6 border border-border/50 bg-card/50 backdrop-blur hover:border-neon-blue transition-all cursor-pointer group rounded-lg">
            <h2 className="text-xl font-bold group-hover:text-neon-blue transition-colors">{cat}</h2>
            <p className="text-muted-foreground mt-2 text-sm">12 篇文章</p>
          </div>
        ))}
      </div>
    </div>
  );
}
