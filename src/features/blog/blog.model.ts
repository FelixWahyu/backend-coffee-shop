import type { BlogArticle } from "@prisma/client";

export type BlogResponse = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBlogRequest = {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
  readingTime: number;
};

export type UpdateBlogRequest = {
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  author?: string;
  tags?: string[];
  readingTime?: number;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function toBlogResponse(article: BlogArticle): BlogResponse {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image,
    category: article.category,
    author: article.author,
    tags: JSON.parse(article.tags),
    readingTime: article.readingTime,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}

export { slugify };
