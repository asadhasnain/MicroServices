import { createServer } from "server"; // shared package
import inventoryRoutes from "./routes/InventoryRoutes";
import { initConsumer } from "./kafka/consumer";
import { initProducer } from "./kafka/producer";

const app = createServer(inventoryRoutes, "Inventory");

const PORT = process.env.PORT || 3002;
app.listen(PORT, async () => {
  await initConsumer();
  await initProducer();
  console.log(`📦 Inventory service running on port ${PORT}`);
});
