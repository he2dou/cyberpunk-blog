import Link from "next/link";
import { PostData } from "@/lib/posts";
import { ArrowRight, FileText } from "lucide-react";

interface RecommendedPostsProps {
  currentPostId: string;
  currentCategory?: string;
  posts: PostData[];
}

export default function RecommendedPosts({ currentPostId, currentCategory, posts }: RecommendedPostsProps) {
  // Simple recommendation logic:
  // 1. Filter out current post
  // 2. Prioritize same category
  // 3. Take up to 2 posts
  const recommendations = posts
    .filter(p => p.id !== currentPostId)
    .sort((a, b) => {
      // If category matches, give higher priority (simple sort)
      if (a.category === currentCategory && b.category !== currentCategory) return -1;
      if (a.category !== currentCategory && b.category === currentCategory) return 1;
      return 0;
    })
    .slice(0, 2);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-border/40">
      <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
        <span className="text-neon-blue">//</span> 相关推荐
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`} className="group block h-full bg-card/40 border border-border/50 rounded-lg p-5 hover:border-neon-blue/50 hover:bg-card/60 transition-all duration-300 relative overflow-hidden">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/5 to-neon-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-muted-foreground">
                   <span className="bg-accent/10 px-2 py-0.5 rounded text-neon-blue border border-neon-blue/20">
                     {post.category}
                   </span>
                   <span className="flex items-center gap-1">
                     <FileText className="w-3 h-3" />
                     {post.readTime}
                   </span>
                </div>
                
                <h4 className="text-lg font-bold group-hover:text-neon-blue transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h4>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-xs font-bold text-neon-pink opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  READ MORE <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
