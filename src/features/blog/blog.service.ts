import { prismaClient } from "../../application/database";
import { slugify, toBlogResponse, type BlogResponse, type CreateBlogRequest, type UpdateBlogRequest } from "./blog.model";
import { BlogValidation } from "./blog.validation";
import { Validation } from "../../validation/validation";
import { ResponseError } from "../../error/responseError";
import { deleteFile } from "../../utils/deleteFile";

export class BlogService {
  static async create(request: CreateBlogRequest): Promise<BlogResponse> {
    const tagsString = JSON.stringify(request.tags);

    const validated = Validation.validate(BlogValidation.CREATE, {
      title: request.title,
      excerpt: request.excerpt,
      content: request.content,
      image: request.image,
      category: request.category,
      author: request.author,
      tags: tagsString,
      readingTime: request.readingTime,
    });

    const slug = slugify(validated.title);

    const existingSlug = await prismaClient.blogArticle.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      throw new ResponseError(400, "Article with this title already exists");
    }

    const article = await prismaClient.blogArticle.create({
      data: {
        ...validated,
        slug,
      },
    });

    return toBlogResponse(article);
  }

  static async list(search?: string, page?: number, size: number = 10): Promise<{ data: Array<BlogResponse>; paging?: { size: number; total_page: number; current_page: number } }> {
    const where = search
      ? {
          OR: [{ title: { contains: search } }, { excerpt: { contains: search } }, { category: { contains: search } }],
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

    const articles = await prismaClient.blogArticle.findMany(queryOptions);

    if (page !== undefined) {
      const total = await prismaClient.blogArticle.count({
        where,
      });
      return {
        data: articles.map((article) => toBlogResponse(article)),
        paging: {
          size,
          total_page: Math.ceil(total / size),
          current_page: page,
        },
      };
    }

    return {
      data: articles.map((article) => toBlogResponse(article)),
    };
  }

  static async getBySlug(slug: string): Promise<BlogResponse> {
    const article = await prismaClient.blogArticle.findUnique({
      where: { slug },
    });

    if (!article) {
      throw new ResponseError(404, "Article not found");
    }

    return toBlogResponse(article);
  }

  static async getById(id: number): Promise<BlogResponse> {
    const article = await prismaClient.blogArticle.findUnique({
      where: { id },
    });

    if (!article) {
      throw new ResponseError(404, "Article not found");
    }

    return toBlogResponse(article);
  }

  static async update(id: number, request: UpdateBlogRequest): Promise<BlogResponse> {
    const updateRequest = Validation.validate(BlogValidation.UPDATE, {
      ...request,
      tags: request.tags ? JSON.stringify(request.tags) : undefined,
    });

    const existing = await prismaClient.blogArticle.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new ResponseError(404, "Article not found");
    }

    const data: any = {};

    if (updateRequest.title !== undefined) {
      data.title = updateRequest.title;
      data.slug = slugify(updateRequest.title);

      const slugExists = await prismaClient.blogArticle.findUnique({
        where: { slug: data.slug },
      });

      if (slugExists && slugExists.id !== id) {
        throw new ResponseError(400, "Another article with this title already exists");
      }
    }

    if (updateRequest.excerpt !== undefined) data.excerpt = updateRequest.excerpt;
    if (updateRequest.content !== undefined) data.content = updateRequest.content;
    if (updateRequest.image !== undefined) data.image = updateRequest.image;
    if (updateRequest.category !== undefined) data.category = updateRequest.category;
    if (updateRequest.author !== undefined) data.author = updateRequest.author;
    if (updateRequest.tags !== undefined) data.tags = updateRequest.tags;
    if (updateRequest.readingTime !== undefined) data.readingTime = updateRequest.readingTime;

    const article = await prismaClient.blogArticle.update({
      where: { id },
      data,
    });

    if (updateRequest.image !== undefined && existing.image && existing.image !== updateRequest.image) {
      deleteFile(existing.image);
    }

    return toBlogResponse(article);
  }

  static async delete(id: number): Promise<void> {
    const existing = await prismaClient.blogArticle.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new ResponseError(404, "Article not found");
    }

    await prismaClient.blogArticle.delete({
      where: { id },
    });

    if (existing.image) {
      deleteFile(existing.image);
    }
  }
}
