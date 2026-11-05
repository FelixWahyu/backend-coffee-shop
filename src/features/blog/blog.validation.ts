import { z, ZodType } from "zod";

export class BlogValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(200),
    excerpt: z.string().min(1).max(500),
    content: z.string().min(1),
    image: z.string().min(1).max(255),
    category: z.string().min(1).max(100),
    author: z.string().min(1).max(100),
    tags: z.string().min(1).max(500),
    readingTime: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().min(1).max(200).optional(),
    excerpt: z.string().min(1).max(500).optional(),
    content: z.string().min(1).optional(),
    image: z.string().min(1).max(255).optional(),
    category: z.string().min(1).max(100).optional(),
    author: z.string().min(1).max(100).optional(),
    tags: z.string().min(1).max(500).optional(),
    readingTime: z.number().int().positive().optional(),
  });
}
