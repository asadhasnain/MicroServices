import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderById);
router.patch("/:id/cancel", OrderController.cancelOrder);

export default router;