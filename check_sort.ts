import { getSortedPostsData } from './src/lib/posts';

const posts = getSortedPostsData();
console.log(JSON.stringify(posts.map(p => ({ id: p.id, isSticky: p.isSticky, date: p.date })), null, 2));
