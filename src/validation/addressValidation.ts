import { z, ZodType } from "zod";
import { id } from "zod/v4/locales";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100),
    province: z.string().min(1).max(100),
    country: z.string().min(1).max(100).optional(),
    postal_code: z.string().min(1).max(10).optional(),
  });

  static readonly GET: ZodType = z.object({
    contact_id: z.number().positive(),
    id: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    contact_id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100),
    province: z.string().min(1).max(100),
    country: z.string().min(1).max(100).optional(),
    postal_code: z.string().min(1).max(10).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    contact_id: z.number().positive(),
    id: z.number().positive(),
  });
}
