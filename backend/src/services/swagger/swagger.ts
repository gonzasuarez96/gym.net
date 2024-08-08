import { config } from "../../config";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(config.docs);

// Function to setup our docs
export const swaggerDocs = (app: any, port: any) => {
  // Route-Handler to visit our docs
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/docs.json", (_req: any, res: any) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Version 1 Docs are available on http://localhost:${port}/docs`);
};
