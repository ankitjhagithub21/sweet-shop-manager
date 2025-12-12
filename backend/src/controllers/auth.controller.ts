import { registerService, loginService, getUserService } from "../services/auth.service";
import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await registerService(req.body);

    res
      .cookie("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({ message: "User registered", success: true, user });
  } catch (error: any) {
    res
      .status(400)
      .json({
        success: false,
        message: error.message || "Registration failed.",
      });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginService({ email, password });

    return res
      .cookie("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful",
        success: true,
        user,
      });
  } catch (error: any) {
    return res
      .status(400)
      .json({ success: false, message: error.message || "Login failed" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  return res
    .clearCookie("auth", {
      maxAge: 0,
    })
    .status(200)
    .json({
      message: "Logout successful",
      success: true,
    });
};


export const getUserController = async (req: Request, res: Response) => {
  try {
   
      const user = await getUserService(req.user?._id)
      res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(400)
      .json({ success: false, message: error.message || "Login failed" });
  }
};


