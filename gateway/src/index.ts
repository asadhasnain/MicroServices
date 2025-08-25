// gateway/index.ts
import express, { Request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/order",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: (path) => {
     const rewritten = "/api/order" + path; // prepend our API path
      return rewritten;
    },
  })
);

app.use(
  "/inventory",
  createProxyMiddleware({
    target: "http://localhost:3002", // Inventory Service
    changeOrigin: true,
    pathRewrite: (path) => {
     const rewritten = "/api/inventory" + path; // prepend our API path
      return rewritten;
    },
}));

// Health check
app.get("/health", (_, res) => res.json({ status: "API Gateway is running" }));

app.listen(3000, () => {
  console.log("API Gateway running on http://localhost:3000");
});
