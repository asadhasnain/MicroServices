import { Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: ["localhost:9092"],
});

export const producer: Producer = kafka.producer();

export async function initProducer() {
  await producer.connect();
  console.log("✅ Kafka Producer connected (Inventory Service)");
}

// ✅ Send DLQ message helper
export async function sendToDLQ(order: any, error: string) {

try{
  await producer.send({
    topic: "inventory.dlq",
    messages: [
      {
        key: "InventoryDLQ",
        value: JSON.stringify({
          order,
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

  console.warn("⚠️ Sent message to DLQ:", { order });
}
