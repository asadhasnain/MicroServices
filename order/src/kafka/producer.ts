import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9094"],
});



export const producer = kafka.producer();

export async function initProducer() {
  await producer.connect();
  console.log("✅ Kafka Producer connected (Order Service)");
}

export async function publishOrderCreatedEvent(order: any) {
  await producer.send({
    topic: "orders",
    messages: [
        {
          key: order.id,
          value: JSON.stringify({
            action: "update",
            data: { id: order.productId, quantity: order.quantity },
            correlationId: "order-1234",
          }),
      },
    ],
  });
  console.log(`📢 OrderCreated event published: ${order.id}`);
}
