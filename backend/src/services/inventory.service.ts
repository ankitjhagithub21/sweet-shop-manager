import { Sweet } from "../models/sweet.model";

export const purchaseSweetService = async (sweetId: string, quantity: number) => {
  const sweet = await Sweet.findById(sweetId);

  if (!sweet) {
    throw new Error("Sweet not found.");
  }

  if (sweet.quantity < quantity) {
    throw new Error("Not enough stock available.");
  }

  sweet.quantity -= quantity;
  await sweet.save();

  return sweet;
};

export const restockSweetService = async (sweetId: string, quantity: number) => {
  const sweet = await Sweet.findById(sweetId);

  if (!sweet) {
    throw new Error("Sweet not found.");
  }

  sweet.quantity += quantity;
  await sweet.save();

  return sweet;
};
