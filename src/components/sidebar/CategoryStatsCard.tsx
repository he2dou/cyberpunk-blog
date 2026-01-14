import Link from "next/link";
import { PostData } from "@/lib/posts";
import { Folder, ChevronRight } from "lucide-react";

interface CategoryStatsCardProps {
  posts: PostData[];
}

export default function CategoryStatsCard({ posts }: CategoryStatsCardProps) {
  // Calculate category counts
  const categoryCounts = posts.reduce((acc, post) => {
    if (post.category) {
      acc[post.category] = (acc[post.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Sort by count descending
  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 relative overflow-hidden">
      <h3 className="text-lg font-bold mb-4 font-display text-foreground border-l-4 border-neon-purple pl-3">
        分类统计
      </h3>
      
      <div className="space-y-2">
        {categories.map(([category, count]) => (
          <Link key={category} href={`/categories/${category}`} className="flex items-center justify-between p-2 rounded hover:bg-accent/10 group transition-all duration-300 border border-transparent hover:border-neon-purple/30">
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                <Folder className="w-4 h-4 text-neon-purple" />
                <span className="text-sm font-medium">{category}</span>
              </div>
              <div className="flex items-center gap-1">
                 <span className="text-xs font-mono bg-background/50 px-2 py-0.5 rounded border border-border group-hover:border-neon-purple/50 group-hover:text-neon-purple transition-all">
                   {count}
                 </span>
                 <ChevronRight className="w-3 h-3 text-muted-foreground/50 group-hover:text-neon-purple opacity-0 group-hover:opacity-100 transition-all -ml-3 group-hover:ml-0" />
              </div>
          </Link>
        ))}
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-neon-purple/5 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}
