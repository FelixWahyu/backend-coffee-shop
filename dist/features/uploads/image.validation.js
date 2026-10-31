"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidation = void 0;
const zod_1 = require("zod");
class ImageValidation {
    static CREATE = zod_1.z.object({
        name: zod_1.z.string().min(3).max(100),
    });
    static IMAGECREATE = zod_1.z.object({
        images: zod_1.z.string().max(255),
    });
}
exports.ImageValidation = ImageValidation;
