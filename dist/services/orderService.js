"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const database_1 = require("../application/database");
const responseError_1 = require("../error/responseError");
const orderModel_1 = require("../model/orderModel");
const orderValidation_1 = require("../validation/orderValidation");
const validation_1 = require("../validation/validation");
class OrderService {
    static async create(request) {
        const createRequest = validation_1.Validation.validate(orderValidation_1.OrderValidation.CREATE, request);
        const productsId = createRequest.items.map((item) => item.product_id);
        const products = await database_1.prismaClient.product.findMany({
            where: {
                id: {
                    in: productsId,
                },
            },
        });
        if (products.length !== createRequest.items.length) {
            throw new responseError_1.ResponseError(404, "Some of the products are not found");
        }
        let total = 0;
        const orderItemsData = createRequest.items.map((item) => {
            const product = products.find((product) => product.id === item.product_id);
            const subTotal = product.price * item.quantity;
            total += subTotal;
            return {
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.price,
            };
        });
        const order = await database_1.prismaClient.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    total: total,
                    status: "PENDING",
                },
            });
            await tx.orderItem.createMany({
                data: orderItemsData.map((item) => ({
                    ...item,
                    order_id: newOrder.id,
                })),
            });
            return tx.order.findUnique({
                where: {
                    id: newOrder.id,
                },
                include: {
                    order_items: {
                        include: {
                            product: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
        });
        if (!order) {
            throw new responseError_1.ResponseError(500, "Failed to create order");
        }
        return (0, orderModel_1.toOrderResponse)(order);
    }
}
exports.OrderService = OrderService;
