import type { NextFunction, Request, Response } from "express";
import type { UserRequest } from "../type/userRequest";
import type { CreateReviewRequest } from "../model/reviewModel";
import { ReviewService } from "../services/reviewService";

export class ReviewController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateReviewRequest = req.body as CreateReviewRequest;
      const response = await ReviewService.create(req.user!, request);
      res.status(200).json({
        success: true,
        message: "Success create review",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllReview(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ReviewService.getAllReview();
      res.status(200).json({
        success: true,
        message: "Success get all review",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
