import { useState } from "react";
import { useRoute } from "wouter";
import heroImg from "@/assets/hero.jpg";
import { getPostById } from "@/data/posts";
import { Clock, Calendar, FileText, Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import RelatedPosts from "@/components/RelatedPosts";

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

export default function PostDetail() {
  const [, params] = useRoute("/post/:id");
  const id = params?.id;
  const post = id ? getPostById(id) : null;

  if (!post) {
    return <div className="p-8 text-center text-neon-pink">ERROR 404: DATA NOT FOUND</div>;
  }

  return (
    <article className="animate-in fade-in duration-500">
      <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-8 border border-border group">
        <img src={heroImg} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
        prose-headings:font-display prose-headings:text-foreground prose-headings:scroll-mt-20
        prose-h1:text-3xl prose-h1:text-neon-blue prose-h1:border-b prose-h1:border-border prose-h1:pb-4
        prose-h2:text-2xl prose-h2:text-neon-pink prose-h2:mt-12
        prose-h3:text-xl prose-h3:text-neon-yellow
        prose-a:text-neon-blue prose-a:no-underline hover:prose-a:text-neon-pink prose-a:transition-colors
        prose-strong:text-neon-yellow
        prose-blockquote:border-l-4 prose-blockquote:border-neon-blue prose-blockquote:bg-accent/5 prose-blockquote:p-4 prose-blockquote:rounded-r
        prose-code:text-neon-pink prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-lg prose-img:border prose-img:border-border/50
        prose-th:text-neon-blue prose-th:border-b prose-th:border-border
        prose-td:border-b prose-td:border-border/30
      ">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlock
          }}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>

      {/* Recommended Articles */}
      <RelatedPosts 
        currentPostId={post.id} 
        category={post.category} 
        tags={post.tags} 
      />
    </article>
  );
}
