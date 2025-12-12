import { Request, Response } from "express";
import {
  createSweetService,
  getAllSweetsService,
  searchSweetService,
  updateSweetService,
  deleteSweetService,
} from "../services/sweet.service";
import uploadImage from "../utils/uploadImage";

export const createSweet = async (req: Request, res: Response) => {
  try {

    
    const {name, category, price, quantity} = await req.body;

    if(!name || !category || !price || !quantity){
       return res.status(400).json({message:"All fields are required.", success:false})
    }

    if(!req.file){
       return res.status(400).json({message:"Please upload sweet image.", success:false})
    }

    const image = await uploadImage(req.file)

    const newSweet = await createSweetService({
      ...req.body,
      image,
      createdBy:req.user?._id
    });

    return res.status(201).json({
      success: true,
      message: "Sweet added successfully",
      sweet: newSweet,
    });
    
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await getAllSweetsService();

    return res.status(200).json({
      success: true,
      sweets,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const results = await searchSweetService(req.query);

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const updatedSweet = await updateSweetService(req.params.id, req.body);

    if (!updatedSweet) {
      return res
        .status(404)
        .json({ success: false, message: "Sweet not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Sweet updated successfully",
      sweet: updatedSweet,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteSweetService(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Sweet not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Sweet deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
