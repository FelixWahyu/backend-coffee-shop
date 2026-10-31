"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
class BlogValidation {
    static CREATE = zod_1.z.object({
        title: zod_1.z.string().min(1).max(200),
        excerpt: zod_1.z.string().min(1).max(500),
        content: zod_1.z.string().min(1),
        image: zod_1.z.string().min(1).max(255),
        category: zod_1.z.string().min(1).max(100),
        author: zod_1.z.string().min(1).max(100),
        tags: zod_1.z.string().min(1).max(500),
        readingTime: zod_1.z.number().int().positive(),
    });
    static UPDATE = zod_1.z.object({
        title: zod_1.z.string().min(1).max(200).optional(),
        excerpt: zod_1.z.string().min(1).max(500).optional(),
        content: zod_1.z.string().min(1).optional(),
        image: zod_1.z.string().min(1).max(255).optional(),
        category: zod_1.z.string().min(1).max(100).optional(),
        author: zod_1.z.string().min(1).max(100).optional(),
        tags: zod_1.z.string().min(1).max(500).optional(),
        readingTime: zod_1.z.number().int().positive().optional(),
    });
}
exports.BlogValidation = BlogValidation;
