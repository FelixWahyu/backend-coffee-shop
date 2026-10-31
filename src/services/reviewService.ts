import type { User } from "@prisma/client";
import { toReviewResponse, type CreateReviewRequest, type ReviewResponse } from "../model/reviewModel";
import { ReviewValidation } from "../validation/reviewsValidation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/responseError";

export class ReviewService {
  static async create(user: User, request: CreateReviewRequest): Promise<ReviewResponse> {
    const createRequest = Validation.validate(ReviewValidation.CREATE, request);

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const review = await prismaClient.review.create({
      data: record,
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
}
