import mongoose, { Document, Schema } from "mongoose";


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
  name: string;
  description?: string;
  category: SweetCategory;
  price: number;
  stock: number;
  imageUrl?: string;
  createdBy: Schema.Types.ObjectId;
}


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
