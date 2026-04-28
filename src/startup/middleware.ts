import express, { Express } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { requestLogger } from "../middleware/logger.middleware";

export default function (app: Express) {
  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin: "*",
    }),
  );
  app.use(express.json());
  app.use(requestLogger);
}
