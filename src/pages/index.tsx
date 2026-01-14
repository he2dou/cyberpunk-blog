import { GetStaticProps } from 'next';
import PostCard from "@/components/PostCard";
import { getSortedPostsData, PostData } from "@/lib/posts";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";

interface HomeProps {
  allPostsData: PostData[];
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-6">
        {allPostsData.map(post => (
          <PostCard key={post.id} {...post} />
        ))}

        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-card border border-border rounded-full hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-mono text-sm group">
            <span className="group-hover:animate-pulse">LOAD MORE</span>
          </button>
        </div>
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
