import type { Product } from "@prisma/client";

export type ProductResponse = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  category: {
    id: number;
    name: string;
  } | null;
  createdAt: Date;
};

type ProductWithCategory = Product & {
  category: {
    id: number;
    name: string;
  } | null;
};

export type CreateProductRequest = {
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image?: string | null;
};

export type UpdateProductRequest = {
  id: number;
  name?: string;
  description?: string | null;
  price?: number;
  category_id?: number;
  image?: string | null;
};

export function toProductResponse(product: ProductWithCategory): ProductResponse {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
        }
      : null,
    createdAt: product.createdAt,
  };
}
