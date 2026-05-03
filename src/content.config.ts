import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    location: z.string().optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
  }),
});

export const collections = { trips };
