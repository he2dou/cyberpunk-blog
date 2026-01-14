import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-full border border-border bg-card transition-all duration-300",
          currentPage === 1
            ? "opacity-50 cursor-not-allowed text-muted-foreground"
            : "hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_10px_rgba(0,243,255,0.3)]"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-muted-foreground">Page</span>
        <span className="flex items-center justify-center w-8 h-8 rounded border border-neon-blue/30 bg-neon-blue/5 text-neon-blue font-bold shadow-[0_0_10px_rgba(0,243,255,0.1)]">
          {currentPage}
        </span>
        <span className="text-muted-foreground">of {totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-full border border-border bg-card transition-all duration-300",
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed text-muted-foreground"
            : "hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_10px_rgba(0,243,255,0.3)]"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
