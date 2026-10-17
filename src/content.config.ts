import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_KEYS } from './config/site';
import { BOOK_CATEGORIES } from './config/books';

// 시리즈: src/content/series/<category>/<series-slug>.md
// id 예: "robotics/modern-robotics"
const series = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(CATEGORY_KEYS),
    description: z.string(),
    order: z.number().optional(),
  }),
});

// 글: src/content/posts/<category>/<series-slug>/<post-slug>.md
// series 필드에는 시리즈 id(예: "robotics/modern-robotics")를 적습니다.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    series: reference('series'),
    order: z.number().optional(),
    tags: z.array(z.string()).optional(),
    youtube: z.url().optional(),
    draft: z.boolean().optional(),
  }),
});

// 책: src/content/books/<book-slug>/index.md + cover.jpg
// id는 폴더 이름(<book-slug>)입니다.
const books = defineCollection({
  loader: glob({
    pattern: '*/index.{md,mdx}',
    base: './src/content/books',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx?$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      category: z.enum(BOOK_CATEGORIES),
      cover: image().optional(),
      readDate: z.coerce.date().optional(),
      rating: z.number().min(0).max(5).optional(),
      oneLine: z.string().optional(),
    }),
});

export const collections = { series, posts, books };
