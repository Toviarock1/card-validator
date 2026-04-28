import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    // Output: [2023-10-27T...] POST /api/v1/validate 200 - 15ms
    console.log(
      `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
    );
  });

  next();
};
