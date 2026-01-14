import { GetStaticProps, GetStaticPaths } from 'next';
import { getSortedPostsData, PostData } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

interface CategoryPageProps {
  category: string;
  posts: PostData[];
  allPosts: PostData[]; // For sidebar
}

export default function CategoryPage({ category, posts, allPosts }: CategoryPageProps) {
  const { currentItems, currentPage, totalPages, goToPage } = usePagination(posts, 5, category);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border/50">
          <h1 className="text-4xl font-display font-bold text-neon-blue">
            分类: {category}
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
            该分类下暂无文章
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
  const categories = new Set(allPosts.map(post => post.category).filter(Boolean));
  
  const paths = Array.from(categories).map(category => ({
    params: { category: category as string },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const allPosts = getSortedPostsData();
  const filteredPosts = allPosts.filter(post => post.category === category);

  return {
    props: {
      category,
      posts: filteredPosts,
      allPosts,
    },
  };
};
