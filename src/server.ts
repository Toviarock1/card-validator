import express from "express";
import setupMiddleware from "./startup/middleware";
import setupRoutes from "./startup/routes";

const app = express();

setupMiddleware(app);
setupRoutes(app);

export default app;
