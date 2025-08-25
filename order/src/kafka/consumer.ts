import { Kafka } from "kafkajs";
import { OrderService } from "../services/OrderService";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9094"],
});

export const orderStatusConsumer = kafka.consumer({ groupId: "order-status-group" });

export async function initOrderStatusConsumer() {
  await orderStatusConsumer.connect();
  await orderStatusConsumer.subscribe({ topic: "order-status", fromBeginning: true });

  await orderStatusConsumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const { status } = JSON.parse(message.value.toString());

      console.log(`📥 Order Service received status update: ${status} for order ${message.key}`);
      OrderService.updateOrderStatus(message.key ? message.key.toString() : "", status);
    },
  });

  console.log("✅ Order Service subscribed to order-status topic");
}
