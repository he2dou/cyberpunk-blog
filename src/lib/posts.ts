import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/data');

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  readTime?: string;
  wordCount?: number;
  views?: number;
  comments?: number;
  category?: string;
  tags?: string[];
  isSticky?: boolean;
}

export function getSortedPostsData() {
  // Get file names under /src/data
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
        date: matterResult.data.date instanceof Date ? matterResult.data.date.toISOString().split('T')[0] : matterResult.data.date,
      } as PostData;
    });

  // Sort posts by sticky then date
  return allPostsData.sort((a, b) => {
    // 1. Sort by isSticky (true comes first)
    if (a.isSticky && !b.isSticky) return -1;
    if (!a.isSticky && b.isSticky) return 1;

    // 2. Sort by date (newest comes first)
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...matterResult.data,
    date: matterResult.data.date instanceof Date ? matterResult.data.date.toISOString().split('T')[0] : matterResult.data.date,
  } as PostData;
}
