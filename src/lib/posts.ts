import { render } from 'svelte/server';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  author: string;
};

export type Post = PostMeta & {
  body: string;
};

const modules = import.meta.glob('../posts/*.md', { eager: true });

function slugFromPath(path: string) {
  return path.split('/').pop()?.replace('.md', '') ?? '';
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules).map(([path, mod]: [string, any]) => ({
    slug: slugFromPath(path),
    ...mod.metadata
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | null {
  const module = (modules as Record<string, any>)[`../posts/${slug}.md`];
  if (!module) return null;

  const { body } = render(module.default);
  return { slug, ...module.metadata, body };
}
