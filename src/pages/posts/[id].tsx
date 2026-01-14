import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData, getSortedPostsData, PostData } from "@/lib/posts";
import heroImg from "@/assets/hero.jpg";
import { Clock, Calendar, FileText, Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";
import RecommendedPosts from "@/components/RecommendedPosts";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!inline && match) {
    return (
      <div className="relative group my-6">
        <div className="absolute -top-3 left-4 text-xs font-mono text-neon-blue bg-background px-2 py-0.5 rounded border border-neon-blue/30 z-10">
          {match[1].toUpperCase()}
        </div>
        
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-card/80 text-muted-foreground hover:text-neon-blue hover:bg-background border border-transparent hover:border-neon-blue/30 transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
          title="Copy code"
        >
          {isCopied ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
        </button>

        <SyntaxHighlighter
          {...props}
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{
            background: 'rgba(5, 5, 10, 0.6)', 
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            fontSize: '0.9rem',
            margin: 0,
          }}
        >
          {codeContent}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code {...props} className={className}>
      {children}
    </code>
  );
};

export default function Post({ post, allPosts }: { post: PostData; allPosts: PostData[] }) {
  if (!post) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <article className="animate-in fade-in duration-500">
          <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-8 border border-border group">
            <img src={heroImg.src} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
               <div className="flex gap-2 mb-4">
                 <span className="bg-neon-blue/20 text-neon-blue border border-neon-blue/50 px-3 py-1 text-xs font-mono rounded">{post.category}</span>
                 {post.tags?.map(t => (
                   <span key={t} className="bg-neon-pink/20 text-neon-pink border border-neon-pink/50 px-3 py-1 text-xs font-mono rounded">{t}</span>
                 ))}
               </div>
               <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight max-w-3xl text-glow">
                 {post.title}
               </h1>
               <div className="flex items-center gap-4 mt-4 text-sm font-mono text-muted-foreground">
                 <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</span>
                 <span>•</span>
                 <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime}</span>
                 <span>•</span>
                 <span className="flex items-center gap-1"><FileText className="w-3 h-3"/> {post.wordCount}</span>
               </div>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-muted-foreground/90 prose-p:leading-relaxed
            prose-a:text-neon-blue prose-a:no-underline hover:prose-a:text-neon-pink prose-a:transition-colors
            prose-strong:text-foreground prose-strong:font-bold
            prose-code:text-neon-pink prose-code:bg-neon-pink/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-blockquote:border-l-4 prose-blockquote:border-neon-blue prose-blockquote:bg-neon-blue/5 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:text-muted-foreground
            prose-ul:list-disc prose-ul:marker:text-neon-blue
            prose-ol:list-decimal prose-ol:marker:text-neon-pink
            prose-hr:border-border
            prose-img:rounded-xl prose-img:border prose-img:border-border
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <RecommendedPosts currentPostId={post.id} currentCategory={post.category} posts={allPosts} />
      </div>

      <aside className="lg:col-span-4 space-y-6">
        <ProfileCard />
        <RecentPostsCard posts={allPosts} />
        <CategoryStatsCard posts={allPosts} />
        <ArchiveCard posts={allPosts} />
      </aside>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  const allPosts = getSortedPostsData(); // Fetch all posts for sidebar and recommendations
  
  return {
    props: {
      post: postData,
      allPosts,
    },
  };
};
