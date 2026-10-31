import { prismaClient } from "../application/database";
import { ResponseError } from "../error/responseError";
import { toOrderResponse, type CreateOrderRequest, type OrderResponse } from "../model/orderModel";
import { OrderValidation } from "../validation/orderValidation";
import { Validation } from "../validation/validation";

export class OrderService {
  static async create(request: CreateOrderRequest): Promise<OrderResponse> {
    const createRequest = Validation.validate(OrderValidation.CREATE, request);

    const productsId = createRequest.items.map((item) => item.product_id);
    const products = await prismaClient.product.findMany({
      where: {
        id: {
          in: productsId,
        },
      },
    });

    if (products.length !== createRequest.items.length) {
      throw new ResponseError(404, "Some of the products are not found");
    }

    let total = 0;

    const orderItemsData = createRequest.items.map((item) => {
      const product = products.find((product) => product.id === item.product_id);

      const subTotal = product!.price * item.quantity;
      total += subTotal;

      return {
        product_id: item.product_id,
        quantity: item.quantity,
        price: product!.price,
      };
    });

    const order = await prismaClient.$transaction(async (tx) => {
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
      throw new ResponseError(500, "Failed to create order");
    }

    return toOrderResponse(order);
  }
}
