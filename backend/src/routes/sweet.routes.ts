import { Router } from "express";
import {
  createSweetController,
  getAllSweetsController,
  searchSweetsController,
  updateSweetController,
  deleteSweetController,
} from "../controllers/sweet.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import upload from "../config/multer";

const router = Router();

// User routes
router.get("/", authMiddleware, getAllSweetsController);
router.get("/search", authMiddleware, searchSweetsController);

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, upload.single('image'), createSweetController);
router.put("/:id", authMiddleware, adminMiddleware,upload.single('image') , updateSweetController);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweetController);

export default router;
