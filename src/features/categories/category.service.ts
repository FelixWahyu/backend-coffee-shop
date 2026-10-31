import { type CreateCategoryRequest, type CategoryResponse, toCategoryResponse, type UpdateCategoryRequest } from "./category.model";
import { Validation } from "../../validation/validation";
import { CategoryValidation } from "./category.validation";
import { prismaClient } from "../../application/database";
import { type User } from "@prisma/client";
import { ResponseError } from "../../error/responseError";
import { deleteFile } from "../../utils/deleteFile";

export class CategoryService {
  static async create(request: CreateCategoryRequest): Promise<CategoryResponse> {
    const createRequest = Validation.validate(CategoryValidation.CREATE, request);
    const category = await prismaClient.category.create({
      data: createRequest,
    });

    return toCategoryResponse(category);
  }

  static async list(search?: string, page?: number, size: number = 10): Promise<{ data: Array<CategoryResponse>; paging?: { size: number; total_page: number; current_page: number } }> {
    const where = search
      ? {
          OR: [{ name: { contains: search } }],
        }
      : {};

    const queryOptions: any = {
      where,
      orderBy: { createdAt: "desc" },
    };

    if (page !== undefined) {
      queryOptions.skip = (page - 1) * size;
      queryOptions.take = size;
    }

    const categories = await prismaClient.category.findMany(queryOptions);

    if (page !== undefined) {
      const total = await prismaClient.category.count({
        where,
      });
      return {
        data: categories.map((category) => toCategoryResponse(category)),
        paging: {
          size,
          total_page: Math.ceil(total / size),
          current_page: page,
        },
      };
    }

    return {
      data: categories.map((category) => toCategoryResponse(category)),
    };
  }

  static async getById(id: number) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });
    if (!category) throw new ResponseError(404, "Category not found.");
    return toCategoryResponse(category);
  }

  static async update(id: number, request: UpdateCategoryRequest): Promise<CategoryResponse> {
    const updateRequest = Validation.validate(CategoryValidation.UPDATE, request);
    const isExist = await prismaClient.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      throw new ResponseError(404, "Category not found");
    }
    const category = await prismaClient.category.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });

    if (updateRequest.image !== undefined && isExist.image && isExist.image !== updateRequest.image) {
      deleteFile(isExist.image);
    }

    return toCategoryResponse(category);
  }

  static async delete(id: number): Promise<CategoryResponse> {
    const isExistCategory = await prismaClient.category.findFirst({
      where: {
        id: id,
      },
    });

    if (!isExistCategory) {
      throw new ResponseError(404, "Category is not found.");
    }

    const category = await prismaClient.category.delete({
      where: {
        id: id,
      },
    });

    if (category.image) {
      deleteFile(category.image);
    }

    return toCategoryResponse(category);
  }
}
