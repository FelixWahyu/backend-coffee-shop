import type { Category } from "@prisma/client";
import { prismaClient } from "../../application/database";
import { toProductResponse, type CreateProductRequest, type ProductResponse, type UpdateProductRequest } from "./product.model";
import { ProductValidation } from "./product.validation";
import { Validation } from "../../validation/validation";
import { ResponseError } from "../../error/responseError";
import { deleteFile } from "../../utils/deleteFile";

export class ProductService {
  static async create(request: CreateProductRequest): Promise<ProductResponse> {
    const createRequest = Validation.validate(ProductValidation.CREATE, request);

    const isCheckCategory = await prismaClient.category.findUnique({
      where: {
        id: createRequest.category_id,
      },
    });

    if (!isCheckCategory) {
      throw new ResponseError(404, "Category not found");
    }

    const product = await prismaClient.product.create({
      data: {
        name: createRequest.name,
        description: createRequest.description ?? null,
        price: createRequest.price,
        image: createRequest.image ?? null,
        category: {
          connect: {
            id: createRequest.category_id,
          },
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return toProductResponse(product);
  }

  static async list(search?: string, categoryId?: number, page?: number, size: number = 10): Promise<{ data: Array<ProductResponse>; paging?: { size: number; total_page: number; current_page: number } }> {
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        {
          name: {
            contains: search.toLowerCase(),
          },
        },
        {
          category: {
            name: {
              contains: search.toLowerCase(),
            },
          },
        },
      ];
    }

    if (categoryId) {
      whereClause.category_id = categoryId;
    }

    const products = await prismaClient.product.findMany({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(page !== undefined
        ? {
            skip: (page - 1) * size,
            take: size,
          }
        : {}),
    });

    if (page !== undefined) {
      const total = await prismaClient.product.count({
        where: whereClause,
      });
      return {
        data: products.map((product) => toProductResponse(product)),
        paging: {
          size,
          total_page: Math.ceil(total / size),
          current_page: page,
        },
      };
    }

    return {
      data: products.map((product) => toProductResponse(product)),
    };
  }

  static async get(id: number): Promise<ProductResponse> {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    return toProductResponse(product);
  }

  static async update(id: number, request: UpdateProductRequest): Promise<ProductResponse> {
    const updateRequest = Validation.validate(ProductValidation.UPDATE, request);

    const existing = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!existing) {
      throw new ResponseError(404, "Product not found");
    }

    const data: any = {};

    if (updateRequest.image !== undefined) {
      data.image = updateRequest.image;
    }

    if (updateRequest.name !== undefined) {
      data.name = updateRequest.name;
    }

    if (updateRequest.description !== undefined) {
      data.description = updateRequest.description;
    }

    if (updateRequest.price !== undefined) {
      data.price = updateRequest.price;
    }

    if (updateRequest.category_id !== undefined) {
      const isCheckCategory = await prismaClient.category.findUnique({
        where: {
          id: updateRequest.category_id,
        },
      });

      if (!isCheckCategory) {
        throw new ResponseError(404, "Category not found");
      }

      data.category = {
        connect: {
          id: updateRequest.category_id,
        },
      };
    }

    const product = await prismaClient.product.update({
      where: {
        id: id,
      },
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (updateRequest.image !== undefined && existing.image && existing.image !== updateRequest.image) {
      deleteFile(existing.image);
    }

    return toProductResponse(product);
  }

  static async delete(id: number): Promise<ProductResponse> {
    const product = await prismaClient.product.delete({
      where: {
        id: id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (product.image) {
      deleteFile(product.image);
    }

    return toProductResponse(product);
  }
}
