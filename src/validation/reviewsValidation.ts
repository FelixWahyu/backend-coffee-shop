import { z, ZodType } from "zod";

export class ReviewValidation {
  static readonly CREATE: ZodType = z.object({
    rating: z.coerce.number().int().min(1, "Rating minimal 1 bintang").max(5, "Rating maksimal 5 bintang"),
    comment: z.string().trim().min(3, "Ulasan minimal 3 karakter").max(1000, "Ulasan maksimal 1000 karakter"),
  });
}
