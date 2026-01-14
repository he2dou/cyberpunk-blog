export default function Projects() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold text-neon-yellow">项目展示</h1>
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group relative border border-border bg-card overflow-hidden rounded-lg">
            <div className="aspect-video bg-muted/20 flex items-center justify-center text-muted-foreground">
              Project Preview Image {i}
            </div>
            <div className="p-6">
               <h2 className="text-2xl font-bold mb-2 group-hover:text-neon-yellow transition-colors">Cyber Project {i}</h2>
               <p className="text-muted-foreground mb-4">A futuristic project built with next-gen tech stack. Features neon aesthetics and high performance.</p>
               <div className="flex gap-2">
                 <span className="text-xs border border-border px-2 py-1 rounded">React</span>
                 <span className="text-xs border border-border px-2 py-1 rounded">WebGL</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
