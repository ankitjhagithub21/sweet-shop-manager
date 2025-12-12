import { Router } from "express";
import {
  purchaseSweetController,
  restockSweetController,
} from "../controllers/inventory.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// Purchase sweet (USER + ADMIN)
router.post("/:id/purchase", authMiddleware, purchaseSweetController);

// Restock sweet (ADMIN ONLY)
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweetController);

export default router;
