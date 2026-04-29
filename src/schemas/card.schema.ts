import { z } from "zod";

export const cardSchema = z.object({
  cardNumber: z
    .string({
      message: "cardNumber is required must be string",
    })
    .min(13, "Card number is too short")
    .max(19, "Card number is too long")
    .regex(/^\d+$/, "Card number must contain only digits"),
});
