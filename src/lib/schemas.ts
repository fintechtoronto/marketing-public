import { z } from 'zod';

// Schema for blog posts
export const BlogSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  author: z.string(),
  date: z.string(),
  excerpt: z.string(),
  content: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
});

// Schema for events
export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string().optional(),
  registrationLink: z.string(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()),
});

// Types derived from schemas
export type Blog = z.infer<typeof BlogSchema>;
export type Event = z.infer<typeof EventSchema>;
