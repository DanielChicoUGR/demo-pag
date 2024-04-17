import { defineCollection, z } from 'astro:content';

const experiment = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
  }),
});

export const collections = { experiment };
