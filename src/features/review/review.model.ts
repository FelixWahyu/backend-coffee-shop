import type { Review } from "@prisma/client";

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
  const userName = review.user?.name || review.username || "Pelanggan";
  const userUsername = review.user?.username || review.username || "";

  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    user: {
      name: userName,
      username: userUsername,
      contacts: review.user?.contacts
        ? review.user.contacts.map((contact: any) => ({
            email: contact.email,
          }))
        : [],
    },
    createdAt: review.createdAt,
  };
}
