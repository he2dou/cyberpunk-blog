export default function Tags() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold text-neon-pink">标签云</h1>
      <div className="flex flex-wrap gap-3">
        {/* Placeholder Tags */}
        {["React", "Tailwind", "Cyberpunk", "TypeScript", "Vite", "AI", "Design", "Life", "Music", "Node.js"].map((tag) => (
          <span key={tag} className="px-4 py-2 border border-border bg-accent/10 hover:bg-neon-pink/20 hover:border-neon-pink hover:text-neon-pink transition-all cursor-pointer rounded-full text-sm font-mono">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
