import { ISweet } from "../interfaces/sweet.schema";
import { Sweet } from "../models/sweet.model";



interface UpdateSweetInput {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  image?:string;
}

export const createSweetService = async (data: ISweet) => {
  const newSweet = await Sweet.create(data);
  return newSweet;
};

export const getAllSweetsService = async () => {
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  return sweets;
};

export const searchSweetService = async (query: any) => {
  const { name, category, minPrice, maxPrice } = query;

  const filter: any = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const results = await Sweet.find(filter);
  return results;
};

export const updateSweetService = async (
  id: string,
  data: UpdateSweetInput
) => {
  const updated = await Sweet.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
};

export const deleteSweetService = async (id: string) => {
  const deleted = await Sweet.findByIdAndDelete(id);
  return deleted;
};
