import type { Review } from "@prisma/client";
import Prisma = require("@prisma/client");

type ReviewWithUser = Review & {
  user: {
    name: string;
    username: string;
    contacts: {
      email: string | null;
    }[];
  };
};

export type ReviewResponse = {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
    username: string;
    contacts: {
      email?: string | null;
    }[];
  };
  createdAt: Date;
};

export type CreateReviewRequest = {
  rating: number;
  comment: string;
};

export function toReviewResponse(review: any): ReviewResponse {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    user: {
      name: review.user?.name || "",
      username: review.user?.username || review.username || "",
      contacts: review.user?.contacts
        ? review.user.contacts.map((contact: any) => ({
            email: contact.email,
          }))
        : [],
    },
    createdAt: review.createdAt,
  };
}
