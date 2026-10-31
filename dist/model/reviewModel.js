"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReviewResponse = toReviewResponse;
function toReviewResponse(review) {
    return {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user: {
            name: review.user?.name || "",
            username: review.user?.username || review.username || "",
            contacts: review.user?.contacts
                ? review.user.contacts.map((contact) => ({
                    email: contact.email,
                }))
                : [],
        },
        createdAt: review.createdAt,
    };
}
