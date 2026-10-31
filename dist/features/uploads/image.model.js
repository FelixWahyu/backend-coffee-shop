"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toImageResponse = toImageResponse;
function toImageResponse(images) {
    return {
        id: images.id,
        images: images.images,
    };
}
