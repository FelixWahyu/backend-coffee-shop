"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
class ReviewValidation {
    static CREATE = zod_1.z.object({
        rating: zod_1.z.coerce.number().int().min(1, "Rating minimal 1 bintang").max(5, "Rating maksimal 5 bintang"),
        comment: zod_1.z.string().trim().min(3, "Ulasan minimal 3 karakter").max(1000, "Ulasan maksimal 1000 karakter"),
    });
}
exports.ReviewValidation = ReviewValidation;
