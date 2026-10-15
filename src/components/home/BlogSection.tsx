'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '@/types/blog';
import { site } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import Skeleton from '@/components/ui/Skeleton';

interface RawPost {
  title?: string;
  link?: string;
  published?: string | number;
  description?: string;
  image?: string;
  thumbnail?: string;
  content?: string;
}

const PostSkeleton = () => (
  <div className="card overflow-hidden">
    <Skeleton className="h-48 w-full !rounded-none" />
    <div className="space-y-3 p-6">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  </div>
);

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        const items: RawPost[] = data.items ?? [];
        setPosts(
          items.map((post) => ({
            title: post.title || 'Untitled Post',
            link: post.link || '#',
            published: post.published ? new Date(post.published).toISOString() : new Date().toISOString(),
            description: post.description || '',
            image:
              post.image ||
              post.thumbnail ||
              post.content?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
              '/blog-placeholder.jpg',
          }))
        );
      } catch {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2" aria-busy="true" aria-label="Loading posts">
        {[0, 1, 2, 3].map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="card px-6 py-16 text-center">
        <BookOpenIcon className="mx-auto h-12 w-12 text-muted" />
        <h3 className="mt-4 text-xl font-semibold text-fg">Couldn&apos;t load posts right now</h3>
        <p className="mt-2 text-muted">The Medium feed isn&apos;t responding. You can read everything on my profile directly.</p>
        <a
          href={site.links.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg"
        >
          Visit Medium <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.slice(0, 4).map((post, i) => (
        <Reveal key={post.link} delay={i * 70}>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card group block h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >
            <div className="relative h-48 w-full overflow-hidden bg-surface-2">
              <Image
                src={post.image ?? '/blog-placeholder.jpg'}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <article className="p-6">
              <p className="font-mono text-xs text-primary">
                {new Date(post.published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-fg transition-colors group-hover:text-primary">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {post.description?.replace(/<[^>]*>/g, '')}
              </p>
            </article>
          </a>
        </Reveal>
      ))}
    </div>
  );
};

export default BlogSection;
