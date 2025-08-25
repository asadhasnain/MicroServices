import { Kafka } from "kafkajs";
import { createItem, deleteItem, updateItem } from "../services/InventoryService";
import { sendOrderStatus, sendToDLQ } from "./producer";

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: ["localhost:9094"],
});

export const consumer = kafka.consumer({ groupId: "inventory-group" });

export async function initConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
     const msg = JSON.parse(message.value!.toString());
     try {
       
        console.log(`📦 Inventory Service received:`, msg);

        switch (msg.action) {
          case "create":
            createItem(msg.data);
            console.log("✅ Item created:", msg.data);
            break;

          case "update":
            updateItem(msg.data.id, msg.data);
            console.log("✅ Item updated:", msg.data);
            sendOrderStatus(message.key ? message.key.toString() : msg.data.id.toString(), "CONFIRMED");
            break;

          case "delete":
            deleteItem(msg.data.id);
            console.log("✅ Item deleted:", msg.data.id);
            break;

          default:
            throw new Error(`Unknown action: ${msg.action}`);
        }
    } catch (err: any) {
      console.error(err.message);
      await sendToDLQ(msg, (err instanceof Error ? err.toString() : String(err)));
    } finally {
        // ✅ Always commit offset (no retries ever)
        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (Number(message.offset) + 1).toString(),
          },
        ]);
      }
    },
  });

  console.log("✅ Kafka Consumer connected (Inventory Service)");
}