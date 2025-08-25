import { Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: ["localhost:9094"],
});

export const producer: Producer = kafka.producer();

export async function initProducer() {
  await producer.connect();
  console.log("✅ Kafka Producer connected (Inventory Service)");
}

// ✅ Send DLQ message helper
export async function sendToDLQ(msg: any, error: string) {

try{
  await producer.send({
    topic: "inventory.dlq",
    messages: [
      {
        key: "InventoryDLQ",
        value: JSON.stringify({
          msg,
          error,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });
}
catch(error)
{
    console.log("❌ Error sending message to DLQ:", error);
}

  console.warn("⚠️ Sent message to DLQ:", { msg });
}

export async function sendOrderStatus(orderId: string, status: string) {
  await producer.send({
    topic: "order-status",
    messages: [
      {
        key: orderId,
        value: JSON.stringify({ orderId, status }),
      },
    ],
  });
  console.log(`📤 Sent order status update: { orderId: ${orderId}, status: ${status} }`);
}