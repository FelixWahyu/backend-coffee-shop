"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOrderResponse = toOrderResponse;
function toOrderResponse(order) {
    return {
        id: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        items: order.order_items.map((item) => ({
            product_id: item.product_id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
        })),
    };
}
