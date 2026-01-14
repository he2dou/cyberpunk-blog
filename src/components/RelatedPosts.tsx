import { Link } from "wouter";
import { posts } from "@/data/posts";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
  tags?: string[];
}

export default function RelatedPosts({ currentPostId, category, tags = [] }: RelatedPostsProps) {
  // Logic to find related posts
  const recommendations = posts
    .filter(post => post.id !== currentPostId) // Exclude current post
    .map(post => {
      let score = 0;
      // 1. Tag match (highest priority)
      if (post.tags) {
        const matchingTags = post.tags.filter(t => tags.includes(t));
        score += matchingTags.length * 2;
      }
      // 2. Category match
      if (post.category === category) {
        score += 1;
      }
      return { ...post, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score; // Higher score first
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Then newer first
    })
    .slice(0, 3); // Take top 3

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-border/50">
      <h3 className="text-2xl font-display font-bold mb-6 text-foreground flex items-center gap-2">
        <span className="w-2 h-8 bg-neon-blue rounded-full" />
        推荐阅读
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map(post => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <a className="group block h-full bg-card/40 border border-border/50 rounded-lg overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)]">
              <div className="p-5 flex flex-col h-full">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                    {post.category}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold leading-tight mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                  {post.title}
                </h4>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-neon-blue transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
