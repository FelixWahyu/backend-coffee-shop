"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const statsService_1 = require("../services/statsService");
class StatsController {
    static async get(req, res, next) {
        try {
            const response = await statsService_1.StatsService.getStats();
            res.status(200).json({
                success: true,
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StatsController = StatsController;
