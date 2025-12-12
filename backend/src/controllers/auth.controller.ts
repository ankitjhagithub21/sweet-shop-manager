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
        .json({ message: "Please use different email.", success: false });
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
      role:newUser.role
    };

    res
      .cookie("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milisecond
      })
      .status(201)
      .json({
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
    const { email, password } = await req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ message: "Wrong email or password.", success: false });
    }

  
    const token = generateToken(user);

    res
      .cookie("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milisecond
      })
      .status(201)
      .json({
        message: "User registered successfully",
        success: true,
        user: {
          _id:user._id, 
          name:user.name,
          email:user.email,
          role:user.role
        },
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error.", success: false });
  }
};


