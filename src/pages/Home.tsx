import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

export default function Home() {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}

      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 bg-card border border-border rounded-full hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-mono text-sm group">
          <span className="group-hover:animate-pulse">LOAD MORE</span> // 加载更多
        </button>
      </div>
    </div>
  );
}
