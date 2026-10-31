"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const reviewService_1 = require("../services/reviewService");
class ReviewController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const response = await reviewService_1.ReviewService.create(req.user, request);
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
            const response = await reviewService_1.ReviewService.getAllReview();
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
}
exports.ReviewController = ReviewController;
