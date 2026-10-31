import { Request, Response, NextFunction } from "express";
import { ImageService } from "./image.service";
// import { CreateImageRequest } from "../model/imageModel";

export class ImageController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Upload image diterima.");
      console.log("Body:", req.body);
      console.log("Body:", req.file);
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: "No image file provided.",
        });
        return;
      }

      // const fileUrl = `/public/uploads/images/${req.file.filename}`;
      // const request: CreateImageRequest = req.body as CreateImageRequest;
      const fileUrl = `/uploads/images/${req.file.filename}`;
      const response = await ImageService.create({ images: fileUrl });
      res.status(201).json({
        success: true,
        message: "Success create image",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
