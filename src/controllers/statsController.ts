import type { Request, Response, NextFunction } from "express";
import { StatsService } from "../services/statsService";

export class StatsController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await StatsService.getStats();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
