"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
class ProductValidation {
    static CREATE = zod_1.z.object({
        name: zod_1.z.string().min(1).max(100),
        description: zod_1.z.string().max(255).optional().nullable(),
        price: zod_1.z.number().positive(),
        category_id: zod_1.z.number().positive(),
        image: zod_1.z.string().max(255).optional().nullable(),
    });
    static UPDATE = zod_1.z.object({
        name: zod_1.z.string().min(1).max(100).optional(),
        description: zod_1.z.string().max(255).optional().nullable(),
        price: zod_1.z.number().positive().optional(),
        category_id: zod_1.z.number().positive().optional(),
        image: zod_1.z.string().max(255).optional().nullable(),
    });
}
exports.ProductValidation = ProductValidation;
