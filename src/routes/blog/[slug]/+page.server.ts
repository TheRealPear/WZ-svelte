import { error } from '@sveltejs/kit';
import { getPost } from '$lib/posts';

export const load = async ({ params }) => {
  const post = getPost(params.slug);
  if (!post) throw error(404, 'Post not found');
  return { post };
};
