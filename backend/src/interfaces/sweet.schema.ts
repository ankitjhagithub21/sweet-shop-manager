import { Schema } from "mongoose";

export interface ISweet {
  _id?:Schema.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  createdBy: Schema.Types.ObjectId;
}


