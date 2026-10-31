"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const validation_1 = require("../../validation/validation");
const image_validation_1 = require("./image.validation");
const image_model_1 = require("./image.model");
const database_1 = require("../../application/database");
class ImageService {
    static async create(request) {
        const imageCreate = validation_1.Validation.validate(image_validation_1.ImageValidation.IMAGECREATE, request);
        const images = await database_1.prismaClient.latihanImage.create({
            data: {
                images: imageCreate.images,
            },
        });
        return (0, image_model_1.toImageResponse)(images);
    }
}
exports.ImageService = ImageService;
