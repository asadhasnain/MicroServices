import { publishOrderCreatedEvent } from "../kafka/producer";
import { Order } from "../models/Order";
import { randomUUID } from "crypto";

// In-memory store (replace with DB later)
let orders: Order[] = [];

export class OrderService {
  static async createOrder(productId: string, quantity: number): Promise<Order> {
    const order: Order = {
      id: randomUUID(),
      productId,
      quantity,
      status: "PENDING",
      createdAt: new Date(),
    };

    orders.push(order);
    await publishOrderCreatedEvent(order);
    return order;
  }

  static async getOrders(): Promise<Order[]> {
    return orders;
  }

  static async getOrderById(id: string): Promise<Order | undefined> {
    return orders.find(o => o.id === id);
  }

  static async updateOrderStatus(id: string, status: "CONFIRMED" | "PENDING" | "CANCELLED" = "CONFIRMED"): Promise<Order | undefined> {
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
    }
    console.log(id, status);
    return order;
  }


  static async cancelOrder(id: string): Promise<Order | undefined> {
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = "CANCELLED";
    }
    return order;
  }
}
