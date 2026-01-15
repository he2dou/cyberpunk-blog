import Link from "next/link";
import { useRouter } from "next/router";
import CyberpunkOverlay from "@/components/ui/CyberpunkOverlay";
import { cn } from "@/lib/utils";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import avatarImg from "@/assets/avatar.jpg";
// Note: We might need to handle image imports differently in Next.js if we want optimization, 
// but for now standard import works if configured or using next/image with static import.
// Using standard img tag for now to minimize changes.
import Image from "next/image"; 
import { SearchCommand } from "@/components/SearchCommand";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const location = router.pathname;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const navItems = [
    { label: "首页", href: "/" },
    { label: "分类", href: "/categories" },
    { label: "标签", href: "/tags" },
    { label: "项目", href: "/projects" },
    { label: "关于", href: "/about" },
  ];

  const secondaryNavItems = [
    { label: "订阅", href: "/subscribe" },
    { label: "留言", href: "/guestbook" },
    { label: "更多", href: "/more" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body text-foreground relative overflow-x-hidden">
      {/* Background Overlay for better readability if bg image is too busy */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-[2px] -z-10 pointer-events-none" />
      <CyberpunkOverlay />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
             <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary group-hover:border-neon-pink transition-colors duration-300">
                <img src={avatarImg.src} alt="Logo" className="object-cover w-full h-full" />
             </div>
             <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink group-hover:from-neon-pink group-hover:to-neon-blue transition-all duration-500">
               CYBERLOG
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                  "hover:text-neon-blue transition-colors relative py-1",
                  location === item.href ? "text-neon-blue" : "text-muted-foreground"
                )}>
                  {item.label}
                  {location === item.href && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-blue shadow-[0_0_8px_#00f3ff]" />
                  )}
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-border" />

            {secondaryNavItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-neon-pink transition-colors text-muted-foreground">
                   {item.label}
              </Link>
            ))}
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-accent/10 rounded-full text-muted-foreground hover:text-neon-yellow transition-colors flex items-center gap-2 group"
            >
              <Search className="w-5 h-5" />
              <span className="hidden lg:inline text-xs border border-border px-1.5 rounded text-muted-foreground/50 group-hover:border-neon-yellow/50 group-hover:text-neon-yellow/80 transition-colors">⌘K</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background p-4 animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-4">
              {[...navItems, ...secondaryNavItems].map((item) => (
                <Link key={item.href} href={item.href} className={cn(
                    "hover:text-neon-blue transition-colors p-2 rounded hover:bg-accent/10",
                     location === item.href ? "text-neon-blue bg-accent/10" : "text-muted-foreground"
                  )}>
                    {item.label}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center gap-2 hover:text-neon-yellow transition-colors p-2 rounded hover:bg-accent/10 text-muted-foreground text-left"
              >
                 <Search className="w-5 h-5" />
                 <span>搜索文章...</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink mb-4">
              CYBERLOG
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Exploring the digital frontier. Code, design, and thoughts on the future of technology.
            </p>
          </div>
          
          <div className="flex justify-center gap-6 mb-8 text-sm text-muted-foreground">
             <Link href="/rss" className="hover:text-neon-blue transition-colors">RSS</Link>
             <Link href="/about" className="hover:text-neon-blue transition-colors">About</Link>
             <Link href="/contact" className="hover:text-neon-blue transition-colors">Contact</Link>
          </div>

          <p className="text-xs text-muted-foreground/50 font-mono">
            © {new Date().getFullYear()} CyberLog. All systems operational.
          </p>
        </div>
      </footer>

      <SearchCommand open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  );
}
