import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getSortedPostsData, PostData } from "@/lib/posts";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";

interface TagsProps {
  allPostsData: PostData[];
}

export default function Tags({ allPostsData }: TagsProps) {
  // Extract tags from posts
  const tags = Array.from(new Set(allPostsData.flatMap(post => post.tags || [])));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <h1 className="text-4xl font-display font-bold text-neon-blue">标签</h1>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <span className="px-4 py-2 border border-border bg-accent/10 hover:bg-neon-pink/20 hover:border-neon-pink hover:text-neon-pink transition-all cursor-pointer rounded-full text-sm font-mono inline-block">
                #{tag}
              </span>
            </Link>
          ))}
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
