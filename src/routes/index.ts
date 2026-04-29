import { Router } from "express";
import cardRoutes from "./card.routes";

const router = Router();

router.use("/card", cardRoutes);

export default router;
