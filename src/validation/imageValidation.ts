import { z, ZodType } from "zod";

export class ImageValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(3).max(100),
  });

  static readonly IMAGECREATE: ZodType = z.object({
    images: z.string().max(255),
  });
}
