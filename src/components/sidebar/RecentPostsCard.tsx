import Link from "next/link";
import { PostData } from "@/lib/posts";
import { Calendar } from "lucide-react";

interface RecentPostsCardProps {
  posts: PostData[];
}

export default function RecentPostsCard({ posts }: RecentPostsCardProps) {
  // Sort posts by date descending and take the first 5
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 relative overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]">
      <h3 className="text-lg font-bold mb-4 font-display text-foreground border-l-4 border-neon-pink pl-3">
        最近文章
      </h3>
      
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="group relative pl-2">
            {/* Decoration line */}
            {/* <div className="absolute left-0 top-1.5 w-[2px] h-[calc(100%-6px)] bg-border group-hover:bg-neon-blue transition-colors duration-300" /> */}
            
            <Link href={`/posts/${post.id}`} className="block">
                <h4 className="text-sm font-medium text-foreground/90 group-hover:text-neon-blue transition-colors line-clamp-2 leading-relaxed">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground group-hover:text-neon-blue/70 transition-colors">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
