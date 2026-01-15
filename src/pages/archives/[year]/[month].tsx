import { GetStaticProps, GetStaticPaths } from 'next';
import { getSortedPostsData, PostData } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

interface ArchivePageProps {
  year: string;
  month: string;
  posts: PostData[];
  allPosts: PostData[]; // For sidebar
}

export default function ArchivePage({ year, month, posts, allPosts }: ArchivePageProps) {
  const { currentItems, currentPage, totalPages, goToPage } = usePagination(posts, 5, `${year}-${month}`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border/50">
          <h1 className="text-3xl font-display font-bold text-neon-yellow">
            归档: {year}年{month}月
          </h1>
          <span className="text-muted-foreground text-lg font-mono">
            ({posts.length})
          </span>
        </div>

        {currentItems.map(post => (
          <PostCard key={post.id} {...post} />
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        {posts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            该月份下暂无文章
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className="lg:col-span-4 space-y-6">
        <ProfileCard />
        <RecentPostsCard posts={allPosts} />
        <CategoryStatsCard posts={allPosts} />
        <ArchiveCard posts={allPosts} />
      </aside>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getSortedPostsData();
  const archives = new Set<string>();

  allPosts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    archives.add(`${year}/${month}`);
  });
  
  const paths = Array.from(archives).map(archive => {
    const [year, month] = archive.split('/');
    return {
      params: { year, month },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;
  const month = params?.month as string;
  const allPosts = getSortedPostsData();
  
  const filteredPosts = allPosts.filter(post => {
    const date = new Date(post.date);
    return date.getFullYear().toString() === year && (date.getMonth() + 1).toString() === month;
  });

  return {
    props: {
      year,
      month,
      posts: filteredPosts,
      allPosts,
    },
  };
};
