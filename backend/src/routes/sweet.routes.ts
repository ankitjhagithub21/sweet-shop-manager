import { Router } from "express";
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from "../controllers/sweet.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import upload from "../config/multer";

const router = Router();

// Public or User routes
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, upload.single('image'), createSweet);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

export default router;
