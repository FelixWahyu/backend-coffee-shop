import type { User } from "@prisma/client";
import { toReviewResponse, type CreateReviewRequest, type ReviewResponse } from "../model/reviewModel";
import { ReviewValidation } from "../validation/reviewsValidation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/responseError";

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

  static async getAllReview(): Promise<Array<ReviewResponse>> {
    const reviews = await prismaClient.review.findMany({
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
    });

    return reviews.map((review) => toReviewResponse(review));
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
