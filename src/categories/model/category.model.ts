import type { Category } from "@prisma/client";

export type CategoryResponse = {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
};

export type CreateCategoryRequest = {
  name: string;
  description?: string;
  image?: string | null;
};

export type UpdateCategoryRequest = {
  id: number;
  name?: string;
  description?: string;
  image?: string | null;
};

export function toCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    image: category.image,
    createdAt: category.createdAt,
  };
}
