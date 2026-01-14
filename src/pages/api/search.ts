import { NextApiRequest, NextApiResponse } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const allPosts = getSortedPostsData();
  
  // Return only necessary fields for search to reduce payload size
  const searchResults = allPosts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    tags: post.tags,
  }));

  res.status(200).json(searchResults);
}
