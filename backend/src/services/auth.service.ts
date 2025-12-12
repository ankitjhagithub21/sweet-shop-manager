import bcrypt from "bcryptjs";
import { User} from "../models/user.model";

import { generateToken } from "../utils/jwt";
import { IUser } from "../interfaces/user.schema";
import { Schema, Types } from "mongoose";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const registerService = async ({
  name,
  email,
  password,
}: RegisterInput) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists. Please use a different email.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser: IUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT
  const token = generateToken(newUser);

  // Return cleaned user object
  return {
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  };
};

export const loginService = async ({ email, password }: LoginInput) => {
  // Find user
  const user: IUser | null = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User not found.");
  }

  // Compare password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT
  const token = generateToken(user);

  // Return cleaned user data
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};


export const getUserService = async (userId:any) => {
  // Find user
  const user: IUser | null = await User.findById(userId)

  if (!user) {
    throw new Error("User not found.");
  }

  // Return cleaned user data
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  };
};
