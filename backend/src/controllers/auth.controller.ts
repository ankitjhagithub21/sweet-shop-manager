import { registerService, loginService } from "../services/auth.service";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
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
    res.status(400).json({ success: false, message: error.message || "Registration failed." });
  }
};

export const login = async (req: Request, res: Response) => {
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
