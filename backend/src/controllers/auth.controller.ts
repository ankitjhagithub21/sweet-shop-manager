import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = await req.body;

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res
        .status(409)
        .json({ message: "Email already exists.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser);

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    res.cookie("auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milisecond
    }).status(201).json({
      message: "User registered successfully",
      success: true,
      user: userResponse,
    });
    
  } catch (error) {
    res.status(500).json({ error: "Internal server error.", success: false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal server error.", success: false });
  }
};
