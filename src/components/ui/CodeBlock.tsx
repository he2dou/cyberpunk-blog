import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language: string;
  children: string;
  className?: string;
  [key: string]: any;
}

export default function CodeBlock({ language, children, className, ...props }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-border/50 bg-[#1e1e1e]">
      {/* Language Badge & Actions Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/30">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
           </div>
           <span className="ml-2 text-xs font-mono text-muted-foreground uppercase">
             {language || 'text'}
           </span>
        </div>
        
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all duration-200",
            isCopied 
              ? "text-neon-green bg-neon-green/10" 
              : "text-muted-foreground hover:text-foreground hover:bg-white/10"
          )}
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          {...props}
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.9rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            className: "font-mono"
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
