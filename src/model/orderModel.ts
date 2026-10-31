import type { Order, OrderStatus } from "@prisma/client";

export type OrderWithItems = Order & {
  order_items: {
    product_id: number;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
};

export type OrderResponse = {
  id: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  items: {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export type CreateOrderRequest = {
  items: {
    product_id: number;
    quantity: number;
  }[];
};

export type UpdateOrderRequest = {
  id: number;
  status: OrderStatus;
};

export function toOrderResponse(order: OrderWithItems): OrderResponse {
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
