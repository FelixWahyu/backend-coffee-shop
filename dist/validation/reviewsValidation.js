"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
class ReviewValidation {
    static CREATE = zod_1.z.object({
        rating: zod_1.z.number().min(1).max(5),
        comment: zod_1.z.string().min(1).max(255),
    });
}
exports.ReviewValidation = ReviewValidation;
