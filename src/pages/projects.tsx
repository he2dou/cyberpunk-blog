import { GetStaticProps } from 'next';
import { getSortedPostsData, PostData } from "@/lib/posts";
import ArchiveCard from "@/components/sidebar/ArchiveCard";
import CategoryStatsCard from "@/components/sidebar/CategoryStatsCard";
import RecentPostsCard from "@/components/sidebar/RecentPostsCard";
import ProfileCard from "@/components/sidebar/ProfileCard";

interface ProjectsProps {
  allPostsData: PostData[];
}

export default function Projects({ allPostsData }: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <h1 className="text-4xl font-display font-bold text-neon-blue">项目</h1>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative border border-border bg-card overflow-hidden rounded-lg">
              <div className="aspect-video bg-muted/20 flex items-center justify-center text-muted-foreground">
                Project Preview Image {i}
              </div>
              <div className="p-6">
                 <h2 className="text-2xl font-bold mb-2 group-hover:text-neon-yellow transition-colors">Cyber Project {i}</h2>
                 <p className="text-muted-foreground mb-4">A futuristic project built with next-gen tech stack. Features neon aesthetics and high performance.</p>
                 <div className="flex gap-2">
                   <span className="text-xs border border-border px-2 py-1 rounded">React</span>
                   <span className="text-xs border border-border px-2 py-1 rounded">WebGL</span>
                 </div>
              </div>
            </div>
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
