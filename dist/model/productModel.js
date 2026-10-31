"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProductResponse = toProductResponse;
function toProductResponse(product) {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category
            ? {
                id: product.category.id,
                name: product.category.name,
            }
            : null,
        createdAt: product.createdAt,
    };
}
