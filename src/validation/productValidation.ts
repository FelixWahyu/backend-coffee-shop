import { z, ZodType } from "zod";

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(255).optional().nullable(),
    price: z.number().positive(),
    category_id: z.number().positive(),
    image: z.string().max(255).optional().nullable(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().max(255).optional().nullable(),
    price: z.number().positive().optional(),
    category_id: z.number().positive().optional(),
    image: z.string().max(255).optional().nullable(),
  });
}
