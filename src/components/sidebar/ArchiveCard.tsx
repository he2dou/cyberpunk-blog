import Link from "next/link";
import { PostData } from "@/lib/posts";
import { CalendarClock, ChevronRight } from "lucide-react";

interface ArchiveCardProps {
  posts: PostData[];
}

export default function ArchiveCard({ posts }: ArchiveCardProps) {
  // Group posts by Year and Month
  const archiveData = posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const monthLabel = `${month}月`;

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = { count: 0, label: monthLabel, value: month };
    }
    acc[year][month].count++;
    return acc;
  }, {} as Record<string, Record<string, { count: number; label: string; value: string }>>);

  // Convert to array and sort descending
  const sortedYears = Object.keys(archiveData).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 relative overflow-hidden">
      <h3 className="text-lg font-bold mb-4 font-display text-foreground border-l-4 border-neon-pink pl-3">
        文章归档
      </h3>
      
      <div className="space-y-4">
        {sortedYears.map((year) => {
          const months = Object.values(archiveData[year]).sort((a, b) => Number(b.value) - Number(a.value));
          
          return (
            <div key={year} className="relative">
              <div className="flex items-center gap-2 mb-2 text-neon-yellow/80 font-bold font-mono">
                <CalendarClock className="w-4 h-4" />
                <span>{year}</span>
                <div className="h-[1px] flex-1 bg-neon-yellow/20" />
              </div>
              
              <div className="pl-4 space-y-1 border-l border-border/50 ml-2">
                {months.map((monthData) => (
                  <Link key={`${year}-${monthData.value}`} href={`/archives/${year}/${monthData.value}`} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-accent/10 group transition-all text-sm">
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {monthData.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground/60 group-hover:text-neon-yellow transition-colors">
                          {monthData.count} 篇
                        </span>
                        <ChevronRight className="w-3 h-3 text-muted-foreground/30 group-hover:text-neon-yellow opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
