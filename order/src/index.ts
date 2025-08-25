import { createServer } from "server"; // shared package
import orderRoutes from "./routes/OrderRoutes";
import { initProducer } from "./kafka/producer";

const app = createServer(orderRoutes, "Order");

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await initProducer();
  console.log(`📦 Order service running on port ${PORT}`);
});
