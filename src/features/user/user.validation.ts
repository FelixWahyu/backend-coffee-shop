import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username must not exceed 100 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must not exceed 100 characters")
      .regex(/^[\p{L} ]+$/u, "Name can only contain letter and spaces"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username must not exceed 100 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(3).max(100).optional(),
    username: z.string().min(3).max(100).optional(),
    password: z.string().min(8).max(100).optional(),
  });

  static readonly ADMIN_CREATE: ZodType = z.object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username must not exceed 100 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must not exceed 100 characters")
      .regex(/^[\p{L} ]+$/u, "Name can only contain letter and spaces"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
    role: z.enum(["USER", "ADMIN"], {
      message: "Role must be USER or ADMIN",
    }),
  });

  static readonly ADMIN_UPDATE: ZodType = z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must not exceed 100 characters")
      .regex(/^[\p{L} ]+$/u, "Name can only contain letter and spaces")
      .optional(),
    password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters").optional().or(z.literal("")),
    role: z
      .enum(["USER", "ADMIN"], {
        message: "Role must be USER or ADMIN",
      })
      .optional(),
  });
}
