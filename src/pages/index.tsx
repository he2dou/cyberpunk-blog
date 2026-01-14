import { GetStaticProps } from 'next';
import PostCard from "@/components/PostCard";
import { getSortedPostsData, PostData } from "@/lib/posts";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HomeProps {
  allPostsData: PostData[];
}

export default function Home({ allPostsData }: HomeProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const currentItems = allPostsData.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-6">
        {currentItems.map(post => (
          <PostCard key={post.id} {...post} />
        ))}

        {visibleCount < allPostsData.length && (
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleLoadMore}
              variant="outline"
              className="w-full md:w-auto px-8 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 group"
            >
              加载更多
              <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar */}
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
