import jwt from "jsonwebtoken"
import { ENV } from "../config/env";
import { IUser } from "../interfaces/user.schema";

export const generateToken = (user:IUser) => {
     return  jwt.sign(
      { userId:user._id },
      ENV.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
}