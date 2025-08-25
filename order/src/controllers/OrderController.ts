import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({ error: "productId and quantity are required" });
      }

      const order = await OrderService.createOrder(productId, quantity);
      return res.status(201).json(order);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create order" });
    }
  }

  static async getOrders(req: Request, res: Response) {
    const orders = await OrderService.getOrders();
    res.json(orders);
  }

  static async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  }

  static async cancelOrder(req: Request, res: Response) {
    const { id } = req.params;
    const order = await OrderService.cancelOrder(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  }
}
