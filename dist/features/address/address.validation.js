"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidation = void 0;
const zod_1 = require("zod");
class AddressValidation {
    static CREATE = zod_1.z.object({
        contact_id: zod_1.z.number().positive(),
        street: zod_1.z.string().min(1).max(255).optional(),
        city: zod_1.z.string().min(1).max(100),
        province: zod_1.z.string().min(1).max(100),
        country: zod_1.z.string().min(1).max(100).optional(),
        postal_code: zod_1.z.string().min(1).max(10).optional(),
    });
    static GET = zod_1.z.object({
        contact_id: zod_1.z.number().positive(),
        id: zod_1.z.number().positive(),
    });
    static UPDATE = zod_1.z.object({
        id: zod_1.z.number().positive(),
        contact_id: zod_1.z.number().positive(),
        street: zod_1.z.string().min(1).max(255).optional(),
        city: zod_1.z.string().min(1).max(100),
        province: zod_1.z.string().min(1).max(100),
        country: zod_1.z.string().min(1).max(100).optional(),
        postal_code: zod_1.z.string().min(1).max(10).optional(),
    });
    static REMOVE = zod_1.z.object({
        contact_id: zod_1.z.number().positive(),
        id: zod_1.z.number().positive(),
    });
}
exports.AddressValidation = AddressValidation;
