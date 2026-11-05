"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const reviewModel_1 = require("../model/reviewModel");
const reviewsValidation_1 = require("../validation/reviewsValidation");
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const responseError_1 = require("../error/responseError");
class ReviewService {
    static async create(user, request) {
        const createRequest = validation_1.Validation.validate(reviewsValidation_1.ReviewValidation.CREATE, request);
        const record = {
            ...createRequest,
            username: user.username,
        };
        const review = await database_1.prismaClient.review.create({
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
        return (0, reviewModel_1.toReviewResponse)(review);
    }
    static async getAllReview() {
        const reviews = await database_1.prismaClient.review.findMany({
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
        return reviews.map((review) => (0, reviewModel_1.toReviewResponse)(review));
    }
    static async delete(user, id) {
        const review = await database_1.prismaClient.review.findUnique({
            where: { id },
        });
        if (!review) {
            throw new responseError_1.ResponseError(404, "Ulasan tidak ditemukan");
        }
        if (review.username !== user.username && user.role !== "ADMIN") {
            throw new responseError_1.ResponseError(403, "Anda tidak memiliki izin untuk menghapus ulasan ini");
        }
        await database_1.prismaClient.review.delete({
            where: { id },
        });
    }
}
exports.ReviewService = ReviewService;
