"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImageController = void 0;
// import { CreateImageRequest } from "../model/imageModel";
class UploadImageController {
    static async create(req, res, next) {
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
            const fileUrl = `/public/uploads/images/${req.file.filename}`;
            //   const response = await ImageService.create({ images: fileUrl });
            res.status(201).json({
                success: true,
                message: "Success create image",
                data: {
                    url: fileUrl,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UploadImageController = UploadImageController;
