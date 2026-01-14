import { Link, useLocation } from "wouter";
import CyberpunkOverlay from "@/components/ui/CyberpunkOverlay";
import { cn } from "@/lib/utils";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import avatarImg from "@/assets/avatar.jpg";
import ProfileCard from "@/components/sidebar/ProfileCard";
import PromoCard from "@/components/sidebar/PromoCard";
import RewardCard from "@/components/sidebar/RewardCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import ArchiveCard from "@/components/sidebar/ArchiveCard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "首页", href: "/" },
    { label: "分类", href: "/categories" },
    { label: "标签", href: "/tags" },
    { label: "热门", href: "/hot" },
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
                <img src={avatarImg} alt="Logo" className="object-cover w-full h-full" />
             </div>
             <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink group-hover:from-neon-pink group-hover:to-neon-blue transition-all duration-500">
               CYBERLOG
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "hover:text-neon-blue transition-colors relative py-1",
                  location === item.href ? "text-neon-blue" : "text-muted-foreground"
                )}>
                  {item.label}
                  {location === item.href && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-blue shadow-[0_0_8px_#00f3ff]" />
                  )}
                </a>
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-border" />

            {secondaryNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                 <a className="hover:text-neon-pink transition-colors text-muted-foreground">
                   {item.label}
                 </a>
              </Link>
            ))}
            
            <button className="p-2 hover:bg-accent/10 rounded-full text-muted-foreground hover:text-neon-yellow transition-colors">
              <Search className="w-5 h-5" />
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
                <Link key={item.href} href={item.href}>
                  <a 
                    className="block text-lg font-medium hover:text-primary pl-2 border-l-2 border-transparent hover:border-primary transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Content) */}
        <div className="lg:col-span-8 space-y-8 min-w-0">
          {children}
        </div>

        {/* Right Column (Sidebar) */}
        <aside className="lg:col-span-4 space-y-8 hidden lg:block">
           {/* Sidebar placeholder content - will be replaced by components later */}
           <div className="sticky top-24 space-y-8">
             <ProfileCard />
             <RecentPostsCard />
             <CategoryStatsCard />
             <PromoCard />
             <RewardCard />
             <ArchiveCard />
           </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center text-muted-foreground text-sm font-mono">
          <p>© 2026 CYBERLOG. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-60">System Status: ONLINE // Secure Connection Established</p>
        </div>
      </footer>
    </div>
  );
}
