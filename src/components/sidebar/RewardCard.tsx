import avatarImg from "@/assets/avatar.jpg";

export default function RewardCard() {
  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6">
       <h3 className="text-lg font-bold mb-4 font-display text-foreground border-l-4 border-neon-yellow pl-3">
        微信打赏
      </h3>
      
      <div className="flex justify-center p-4 bg-white/5 rounded-lg border border-dashed border-border/50">
         <div className="w-48 h-48 bg-white p-2 rounded relative group cursor-pointer">
            {/* Using avatar as QR placeholder with effect */}
            <div className="w-full h-full relative overflow-hidden">
               <img src={avatarImg} className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-bold text-4xl text-black">X</span>
               </div>
               
               {/* Scan line effect */}
               <div className="absolute top-0 left-0 w-full h-1 bg-neon-yellow shadow-[0_0_10px_#fcee0a] animate-[scan_2s_linear_infinite]" />
            </div>
            
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-neon-yellow rounded-full flex items-center justify-center text-black font-bold">
               👍
            </div>
         </div>
      </div>
    </div>
  );
}
