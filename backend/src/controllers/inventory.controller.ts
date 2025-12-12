import { Request, Response } from "express";
import {
  purchaseSweetService,
  restockSweetService,
} from "../services/inventory.service";

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweetId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    const updatedSweet = await purchaseSweetService(sweetId, quantity);

    return res.status(200).json({
      success: true,
      message: "Purchase successful",
      sweet: updatedSweet,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const sweetId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    const updatedSweet = await restockSweetService(sweetId, quantity);

    return res.status(200).json({
      success: true,
      message: "Sweet restocked successfully",
      sweet: updatedSweet,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
