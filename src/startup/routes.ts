import { Express, Request, Response, NextFunction } from "express";
import createResponse from "../utils/response";
import { HttpStatus } from "../constants/httpCodes";
import router from "./../routes";
import { errorHandler } from "./../middleware/error.middleware";

export default function setupRoutes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.redirect("/health");
  });

  app.get("/health", (req: Request, res: Response) => {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      timeStamp: new Date().toISOString(),
    });
  });

  app.use("/api/v1", router);

  // Not found
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatus.NOT_FOUND).json(
      createResponse({
        success: false,
        status: HttpStatus.NOT_FOUND,
        message: `Route not found - ${req.method} ${req.originalUrl}`,
      }),
    );
  });
  // error handler
  app.use(errorHandler);
}
