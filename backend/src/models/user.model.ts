import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.schema";


const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required:true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required:true,
      select:false
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {versionKey:false}
);


export const User = mongoose.model<IUser>("User", userSchema);
