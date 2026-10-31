import { z, ZodType } from "zod";

export class OrderValidation {
  static readonly CREATE: ZodType = z.object({
    items: z
      .array(
        z.object({
          product_id: z.number().int().positive(),
          quantity: z.number().int().positive(),
        }),
      )
      .min(1, "At least one item is required"),
  });

  static readonly UPDATE: ZodType = z.object({
    status: z.enum(["PENDING", "PAID", "CANCELLED"]),
  });
}
