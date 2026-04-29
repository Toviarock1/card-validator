import { Router } from "express";
import { cardController, CardController } from "../controllers/card.controller";
import { validateCardInput } from "../middleware/validate.middleware";

const router = Router();

router.post("/validate", validateCardInput, cardController.handleValidation);

export default router;
