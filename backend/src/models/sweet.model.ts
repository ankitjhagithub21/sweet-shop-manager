import mongoose, { Schema } from "mongoose";
import { ISweet } from "../interfaces/sweet.schema";


const sweetSchema = new Schema<ISweet>(
  {
    name: {
      type: String,
      trim: true,
      required:true
    },

    category: {
      type: String,
      required:true
    },

    price: {
      type: Number,
      required:true
    },

    image: {
      type: String,
      required:true
    },

    quantity: {
      type: Number,
      required:true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required:true,
      select:false
    },

  },
  { versionKey:false }
);


export const Sweet = mongoose.model<ISweet>("Sweet", sweetSchema);
