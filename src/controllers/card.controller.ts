import { Request, Response, NextFunction } from "express";
import { cardService } from "../services/card.service";
import { HttpStatus } from "../constants/httpCodes";
import createResponse from "../utils/response";

export class CardController {
  public handleValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { cardNumber } = req.body;
      const isValid = cardService.validateCardNumber(cardNumber);
      const network = cardService.getCardType(cardNumber);

      return res.status(HttpStatus.OK).json(
        createResponse({
          success: true,
          status: HttpStatus.OK,
          message: isValid ? "Valid card number" : "Invalid card number",
          data: {
            isValid,
            network,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

export const cardController = new CardController();
