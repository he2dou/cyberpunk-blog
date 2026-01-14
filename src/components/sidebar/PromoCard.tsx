import { ArrowRight } from "lucide-react";

export default function PromoCard() {
  return (
    <div className="group relative bg-[#1a1b2e] rounded-xl overflow-hidden h-48 flex flex-col justify-end p-6 border border-border/50">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
       
       {/* Background noise/pattern */}
       <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>
       
       <div className="relative z-20">
         <h3 className="text-xl font-bold text-white mb-2">网络IP代理连接</h3>
         <p className="text-sm text-gray-300 mb-0">增强网络连接的稳定性，保护您的数据隐私。</p>
         
         <div className="absolute right-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
               <ArrowRight />
            </div>
         </div>
       </div>
    </div>
  );
}
