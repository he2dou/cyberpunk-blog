import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { FileText, Calendar, Tag, Loader2 } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
}

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && data.length === 0) {
      setLoading(true);
      fetch('/api/search')
        .then(res => res.json())
        .then(posts => {
          setData(posts);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch search data:', err);
          setLoading(false);
        });
    }
  }, [open, data.length]);

  const handleSelect = (id: string) => {
    router.push(`/posts/${id}`);
    onOpenChange(false);
  };

  const filteredData = data.filter((post) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      post.category?.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="搜索文章..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
            {loading ? (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">加载索引中...</span>
                </div>
            ) : (
                "未找到相关文章。"
            )}
        </CommandEmpty>
        
        {!loading && filteredData.length > 0 && (
          <CommandGroup heading="文章">
            {filteredData.map((post) => (
              <CommandItem
                key={post.id}
                value={`${post.title} ${post.tags?.join(' ')}`}
                onSelect={() => handleSelect(post.id)}
                className="cursor-pointer bg-transparent data-[selected=true]:bg-accent/10"
              >
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-neon-blue" />
                        <span className="font-bold text-foreground">{post.title}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground ml-6">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                        </span>
                        {post.category && (
                             <span className="text-neon-blue">{post.category}</span>
                        )}
                    </div>
                    {post.excerpt && (
                        <p className="text-xs text-muted-foreground/80 ml-6 line-clamp-1">
                            {post.excerpt}
                        </p>
                    )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
