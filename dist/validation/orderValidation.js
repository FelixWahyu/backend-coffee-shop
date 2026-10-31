"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
class OrderValidation {
    static CREATE = zod_1.z.object({
        items: zod_1.z
            .array(zod_1.z.object({
            product_id: zod_1.z.number().int().positive(),
            quantity: zod_1.z.number().int().positive(),
        }))
            .min(1, "At least one item is required"),
    });
    static UPDATE = zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "PAID", "CANCELLED"]),
    });
}
exports.OrderValidation = OrderValidation;
