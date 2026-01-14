import avatarImg from "@/assets/avatar.jpg";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileCard() {
  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 relative overflow-hidden">
      <h3 className="text-lg font-bold mb-4 font-display text-foreground border-l-4 border-neon-pink pl-3">
        关注博主
      </h3>
      
      <div className="flex gap-2 mb-6">
        {[
          { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
          { icon: <Github className="w-4 h-4" />, label: "GitHub" },
          { icon: <Instagram className="w-4 h-4" />, label: "INS" },
          { icon: <Youtube className="w-4 h-4" />, label: "Bilibili" },
        ].map((social, idx) => (
          <Button key={idx} variant="outline" size="sm" className="flex-1 h-9 px-0 hover:border-neon-blue hover:text-neon-blue bg-background/50">
             {social.icon}
          </Button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border border-neon-blue/30 rounded-lg p-4 flex items-center gap-4">
         <div className="w-20 h-20 bg-white p-1 rounded">
            {/* Placeholder QR Code */}
            <div className="w-full h-full bg-black/10 flex items-center justify-center">
               <span className="text-[10px] text-black font-mono">QR CODE</span>
            </div>
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-neon-blue mb-1">微信搜一搜</h4>
            <div className="bg-background rounded px-3 py-1 border border-border text-sm flex items-center">
               <span className="mr-2">🔍</span> 人言兑
            </div>
         </div>
      </div>
      
      <p className="mt-4 text-xs text-muted-foreground">
        📢 广告合作：本站提供优质广告位，覆盖技术、生活等多领域受众，欢迎私信联系。
      </p>
    </div>
  );
}
