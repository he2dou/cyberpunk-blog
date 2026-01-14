import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getSortedPostsData, PostData } from "@/lib/posts";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";

interface CategoriesProps {
  allPostsData: PostData[];
}

export default function Categories({ allPostsData }: CategoriesProps) {
  // Extract categories from posts
  const categories = Array.from(new Set(allPostsData.map(post => post.category).filter(Boolean))) as string[];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <h1 className="text-4xl font-display font-bold text-neon-blue">分类</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => {
             const count = allPostsData.filter(p => p.category === cat).length;
             return (
              <Link key={cat} href={`/categories/${cat}`}>
                <div className="p-6 border border-border/50 bg-card/50 backdrop-blur hover:border-neon-blue transition-all cursor-pointer group rounded-lg h-full">
                  <h2 className="text-xl font-bold group-hover:text-neon-blue transition-colors">{cat}</h2>
                  <p className="text-muted-foreground mt-2 text-sm">{count} 篇文章</p>
                </div>
              </Link>
             );
          })}
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
