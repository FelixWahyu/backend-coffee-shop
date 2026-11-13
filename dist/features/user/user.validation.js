"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
    static REGISTER = zod_1.z.object({
        username: zod_1.z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters")
            .max(100, "Username must not exceed 100 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
        name: zod_1.z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name must not exceed 100 characters")
            .regex(/^[\p{L} ]+$/u, "Name can only contain letter and spaces"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
    });
    static LOGIN = zod_1.z.object({
        username: zod_1.z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters")
            .max(100, "Username must not exceed 100 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
    });
    static UPDATE = zod_1.z.object({
        name: zod_1.z.string().min(3).max(100).optional(),
        username: zod_1.z.string().min(3).max(100).optional(),
        password: zod_1.z.string().min(8).max(100).optional(),
    });
    static ADMIN_CREATE = zod_1.z.object({
        username: zod_1.z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters")
            .max(100, "Username must not exceed 100 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
        name: zod_1.z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name must not exceed 100 characters")
            .regex(/^[\p{L} ]+$/u, "Name can only contain letter and spaces"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
        role: zod_1.z.enum(["USER", "ADMIN"], {
            message: "Role must be USER or ADMIN",
        }),
    });
    static ADMIN_UPDATE = zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name must not exceed 100 characters")
            .regex(/^[\p{L} ]+$/u, "Name can only contain letter and spaces")
            .optional(),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters").optional().or(zod_1.z.literal("")),
        role: zod_1.z
            .enum(["USER", "ADMIN"], {
            message: "Role must be USER or ADMIN",
        })
            .optional(),
    });
    static CONTACT_CREATE = zod_1.z.object({
        first_name: zod_1.z.string().trim().min(1, "First name is required").max(100),
        last_name: zod_1.z.string().trim().min(1, "Last name is required").max(100),
        email: zod_1.z.string().trim().email("Invalid email").optional().nullable().or(zod_1.z.literal("")),
        phone: zod_1.z.string().trim().max(20).optional().nullable().or(zod_1.z.literal("")),
        address: zod_1.z
            .object({
            street: zod_1.z.string().trim().max(255).optional().nullable().or(zod_1.z.literal("")),
            city: zod_1.z.string().trim().min(1, "City is required").max(100),
            province: zod_1.z.string().trim().min(1, "Province is required").max(100),
            country: zod_1.z.string().trim().max(100).optional().nullable().or(zod_1.z.literal("")),
            postal_code: zod_1.z.string().trim().max(10).optional().nullable().or(zod_1.z.literal("")),
        })
            .optional(),
    });
    static CONTACT_UPDATE = zod_1.z.object({
        first_name: zod_1.z.string().trim().min(1, "First name is required").max(100).optional(),
        last_name: zod_1.z.string().trim().min(1, "Last name is required").max(100).optional(),
        email: zod_1.z.string().trim().email("Invalid email").optional().nullable().or(zod_1.z.literal("")),
        phone: zod_1.z.string().trim().max(20).optional().nullable().or(zod_1.z.literal("")),
    });
    static ADDRESS_CREATE = zod_1.z.object({
        street: zod_1.z.string().trim().max(255).optional().nullable().or(zod_1.z.literal("")),
        city: zod_1.z.string().trim().min(1, "City is required").max(100),
        province: zod_1.z.string().trim().min(1, "Province is required").max(100),
        country: zod_1.z.string().trim().max(100).optional().nullable().or(zod_1.z.literal("")),
        postal_code: zod_1.z.string().trim().max(10).optional().nullable().or(zod_1.z.literal("")),
    });
    static ADDRESS_UPDATE = zod_1.z.object({
        street: zod_1.z.string().trim().max(255).optional().nullable().or(zod_1.z.literal("")),
        city: zod_1.z.string().trim().min(1, "City is required").max(100).optional(),
        province: zod_1.z.string().trim().min(1, "Province is required").max(100).optional(),
        country: zod_1.z.string().trim().max(100).optional().nullable().or(zod_1.z.literal("")),
        postal_code: zod_1.z.string().trim().max(10).optional().nullable().or(zod_1.z.literal("")),
    });
}
exports.UserValidation = UserValidation;
