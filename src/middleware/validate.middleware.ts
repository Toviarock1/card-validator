import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpStatus } from "../constants/httpCodes";
import createResponse from "../utils/response";
import { cardSchema } from "../schemas/card.schema";

export const validateCardInput = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Parse the body against the schema
    cardSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Extract the first error message for a clean response
      const errorMessage = error.issues[0]?.message;

      return res.status(HttpStatus.BAD_REQUEST).json(
        createResponse({
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        }),
      );
    }
    next(error);
  }
};
