import { getAllPosts, getPost } from '$lib/posts';

export const load = async () => {
  const posts = getAllPosts();
  const latest = posts.length ? getPost(posts[0].slug) : null;
  return { posts, latest };
};
