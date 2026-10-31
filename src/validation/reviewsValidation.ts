import { z, ZodType } from "zod";

export class ReviewValidation {
  static readonly CREATE: ZodType = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(1).max(255),
  });
}
