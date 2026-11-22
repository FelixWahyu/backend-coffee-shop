import type { User } from "@prisma/client";
import { toReviewResponse, type CreateReviewRequest, type ReviewResponse } from "./review.model";
import { ReviewValidation } from "./review.validation";
import { Validation } from "../../validation/validation";
import { prismaClient } from "../../application/database";
import { ResponseError } from "../../error/responseError";

export class ReviewService {
  static async create(user: User, request: CreateReviewRequest): Promise<ReviewResponse> {
    const createRequest = Validation.validate(ReviewValidation.CREATE, request);

    const record = {
      ...createRequest,
      username: user.username,
    };

    const review = await prismaClient.review.create({
      data: record,
      include: {
        user: {
          select: {
            name: true,
            username: true,
            contacts: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    return toReviewResponse(review);
  }

  static async getAllReview(
    search?: string,
    page?: number,
    size: number = 10,
    rating?: number
  ): Promise<{ data: Array<ReviewResponse>; paging?: { size: number; total_page: number; current_page: number; total_item: number } }> {
    const where: any = {};

    if (search) {
      where.OR = [
        { comment: { contains: search } },
        { username: { contains: search } },
        { user: { name: { contains: search } } },
      ];
    }

    if (rating !== undefined && !isNaN(rating) && rating > 0) {
      where.rating = rating;
    }

    const queryOptions: any = {
      where,
      include: {
        user: {
          select: {
            name: true,
            username: true,
            contacts: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (page !== undefined) {
      queryOptions.skip = (page - 1) * size;
      queryOptions.take = size;
    }

    const reviews = await prismaClient.review.findMany(queryOptions);

    if (page !== undefined) {
      const total = await prismaClient.review.count({ where });
      return {
        data: reviews.map((review) => toReviewResponse(review)),
        paging: {
          size,
          total_page: Math.ceil(total / size),
          current_page: page,
          total_item: total,
        },
      };
    }

    return {
      data: reviews.map((review) => toReviewResponse(review)),
    };
  }

  static async delete(user: User, id: number): Promise<void> {
    const review = await prismaClient.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new ResponseError(404, "Ulasan tidak ditemukan");
    }

    if (review.username !== user.username && user.role !== "ADMIN") {
      throw new ResponseError(403, "Anda tidak memiliki izin untuk menghapus ulasan ini");
    }

    await prismaClient.review.delete({
      where: { id },
    });
  }
}
