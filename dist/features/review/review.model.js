"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReviewResponse = toReviewResponse;
function toReviewResponse(review) {
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
                ? review.user.contacts.map((contact) => ({
                    email: contact.email,
                }))
                : [],
        },
        createdAt: review.createdAt,
    };
}
