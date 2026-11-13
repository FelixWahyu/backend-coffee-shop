"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
class ReviewController {
    static async create(req, res, next) {
        try {
            const request = {
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            const response = await review_service_1.ReviewService.create(req.user, request);
            res.status(200).json({
                success: true,
                message: "Success create review",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllReview(req, res, next) {
        try {
            const response = await review_service_1.ReviewService.getAllReview();
            res.status(200).json({
                success: true,
                message: "Success get all review",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const reviewId = Number(req.params.id);
            await review_service_1.ReviewService.delete(req.user, reviewId);
            res.status(200).json({
                success: true,
                message: "Success delete review",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReviewController = ReviewController;
