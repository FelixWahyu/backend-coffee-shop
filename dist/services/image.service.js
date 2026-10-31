"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const validation_1 = require("../validation/validation");
const imageValidation_1 = require("../validation/imageValidation");
const imageModel_1 = require("../model/imageModel");
const database_1 = require("../application/database");
class ImageService {
    static async create(request) {
        const imageCreate = validation_1.Validation.validate(imageValidation_1.ImageValidation.IMAGECREATE, request);
        const images = await database_1.prismaClient.latihanImage.create({
            data: {
                images: imageCreate.images,
            },
        });
        return (0, imageModel_1.toImageResponse)(images);
    }
}
exports.ImageService = ImageService;
