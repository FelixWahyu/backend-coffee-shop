"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCategoryResponse = toCategoryResponse;
function toCategoryResponse(category) {
    return {
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
        createdAt: category.createdAt,
    };
}
