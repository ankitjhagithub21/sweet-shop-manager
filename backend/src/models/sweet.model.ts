import mongoose, { Document, Schema } from "mongoose";
import { ISweet } from "../interfaces/sweet.schema";


const sweetSchema = new Schema<ISweet>(
  {
    name: {
      type: String,
      trim: true,
      required:true
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required:true
    },

    price: {
      type: Number,
      required:true
    },

    stock: {
      type: Number,
      required:true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required:true
    },

  },
  { versionKey:false }
);


export const Sweet = mongoose.model<ISweet>("Sweet", sweetSchema);
