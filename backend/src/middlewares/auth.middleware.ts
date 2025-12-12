import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { User } from "../models/user.model";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.auth;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. No token found." });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as DecodedToken;

    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
