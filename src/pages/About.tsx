import { GetStaticProps } from 'next';
import { getSortedPostsData, PostData } from "@/lib/posts";
import avatarImg from "@/assets/avatar.jpg";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";

interface AboutProps {
  allPostsData: PostData[];
}

export default function About({ allPostsData }: AboutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-display font-bold text-neon-blue">关于</h1>
        <div className="prose prose-invert max-w-none">
          <div className="float-right ml-6 mb-6 w-48 h-48 relative group">
             <div className="absolute inset-0 bg-neon-pink/20 blur-xl rounded-full group-hover:bg-neon-pink/40 transition-all duration-500"></div>
             <img src={avatarImg.src} alt="Avatar" className="relative w-full h-full object-cover rounded-full border-2 border-neon-blue p-1" />
          </div>
          
          <p className="text-lg leading-relaxed">
            你好，我是来自 2077 年的全栈开发者。热衷于构建沉浸式数字体验，探索 AI 与人类创造力的边界。
            这个博客是我用来记录技术探索、设计灵感和生活碎片的数据终端。
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-neon-pink">技能矩阵</h2>
          <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neon-blue rounded-full"></span>Frontend: React, Vue, WebGL</li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neon-blue rounded-full"></span>Backend: Node.js, Go, Python</li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neon-pink rounded-full"></span>Design: Figma, Blender</li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neon-pink rounded-full"></span>AI: LLM Tuning, Diffusion Models</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-neon-yellow">联系方式</h2>
          <p>
            如果你对赛博朋克美学或前沿技术感兴趣，欢迎通过量子网络连接我：
            <br/>
            <span className="font-mono text-neon-blue">admin@cyberlog.net</span>
          </p>
        </div>
      </div>

      <aside className="lg:col-span-4 space-y-6">
        <ProfileCard />
        <RecentPostsCard posts={allPostsData} />
        <CategoryStatsCard posts={allPostsData} />
        <ArchiveCard posts={allPostsData} />
      </aside>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
