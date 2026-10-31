"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
class CategoryValidation {
    static CREATE = zod_1.z.object({
        name: zod_1.z.string().min(1).max(100),
        description: zod_1.z.preprocess((val) => (val === "" ? undefined : val), zod_1.z.string().max(255).optional()),
        image: zod_1.z.string().max(255).optional().nullable(),
    });
    static UPDATE = zod_1.z.object({
        name: zod_1.z.string().min(1).max(100).optional(),
        description: zod_1.z.string().max(255).optional().or(zod_1.z.literal("")),
        image: zod_1.z.string().max(255).optional().nullable(),
    });
}
exports.CategoryValidation = CategoryValidation;
