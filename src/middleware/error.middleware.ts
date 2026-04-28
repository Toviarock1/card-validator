import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../constants/httpCodes";
import createResponse from "../utils/response";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[Error] ${req.method} ${req.path}:`, err.message || err);

  const status =
    err.status || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "An unexpected server error occured";

  const isDevelopment = process.env.NODE_ENV === "development";

  return res.status(status).json(
    createResponse({
      success: false,
      status,
      message,
      data: isDevelopment ? { stack: err.stack } : {},
    }),
  );
};
