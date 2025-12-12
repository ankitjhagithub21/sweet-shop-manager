import { Schema } from "mongoose";

export enum SweetCategory {
  CHOCOLATE = 'chocolate',
  CANDY = 'candy',
  CAKE = 'cake',
  COOKIE = 'cookie',
  PASTRY = 'pastry',
  ICE_CREAM = 'ice_cream',
  TRADITIONAL = 'traditional',
  SUGAR_FREE = 'sugar_free',
  VEGAN = 'vegan',
  OTHER = 'other'
}

export interface ISweet {
  _id?:Schema.Types.ObjectId;
  name: string;
  description?: string;
  category: SweetCategory;
  price: number;
  stock: number;
  image: string;
  createdBy: Schema.Types.ObjectId;
}
