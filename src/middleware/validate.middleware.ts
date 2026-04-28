import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { HttpStatus } from "../constants/httpCodes";
import createResponse from "../utils/response";

// Define the schema: cardNumber must be a string of digits, 13-19 chars long
const cardSchema = z.object({
  cardNumber: z
    .string({
      message: "cardNumber is required",
    })
    .min(13, "Card number is too short")
    .max(19, "Card number is too long")
    .regex(/^\d+$/, "Card number must contain only digits"),
});

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
