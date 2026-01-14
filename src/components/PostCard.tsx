import Link from "next/link";
import { Clock, Calendar, FileText, Eye, MessageSquare, Folder, Tag } from "lucide-react";

interface PostCardProps {
  id: string | number;
  title: string;
  excerpt?: string;
  date: string;
  readTime?: string;
  wordCount?: number;
  views?: number;
  comments?: number;
  category?: string;
  tags?: string[];
  isSticky?: boolean;
}

export default function PostCard({
  id,
  title,
  excerpt,
  date,
  readTime,
  wordCount,
  views,
  comments,
  category,
  tags = [],
  isSticky = false,
}: PostCardProps) {
  return (
    <article className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]">
      {/* Decorative top line for sticky posts */}
      {isSticky && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-pink" />}

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
           <span className="flex items-center gap-1 text-neon-blue">
             <Folder className="w-3 h-3" /> {category}
           </span>
           {isSticky && (
             <span className="ml-auto px-2 py-0.5 rounded bg-accent/20 text-accent-foreground border border-accent/30">
               #置顶
             </span>
           )}
        </div>

        <Link href={`/posts/${id}`}>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 cursor-pointer group-hover:text-neon-blue transition-colors leading-tight">
            {title}
          </h2>
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 font-mono">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date}</span>
          {readTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime}</span>}
          {wordCount && <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {wordCount} 字</span>}
          {views && <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {views} 阅读</span>}
          {comments && <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {comments} 评论</span>}
        </div>

        <p className="text-muted-foreground/80 leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        {tags.length > 0 && (
          <div className="flex gap-2">
            {tags.map(tag => (
              <Link key={tag} href={`/tags`}>
                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/30 text-secondary-foreground hover:bg-neon-pink/20 hover:text-neon-pink transition-colors cursor-pointer border border-transparent hover:border-neon-pink/30">
                   <Tag className="w-3 h-3 mr-1" /> {tag}
                 </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
