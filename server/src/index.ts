import express, { Application } from "express";
import bodyParser from "body-parser";

export function createServer(routes: any, serviceName: string): Application {
  const app: Application = express();

  // Middlewares
  app.use(bodyParser.json());

  // Mount service-specific routes
  app.use(`/api/${serviceName.toLowerCase()}`, routes);

  // Default health check
  app.get("/", (req, res) => res.send(`${serviceName} service is running.`));

  return app;
}
