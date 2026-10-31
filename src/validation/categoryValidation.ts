import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.preprocess((val) => (val === "" ? undefined : val), z.string().max(255).optional()),
    image: z.string().max(255).optional().nullable(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().max(255).optional().or(z.literal("")),
    image: z.string().max(255).optional().nullable(),
  });
}
