import { NextFunction, Request, Response } from "express";
import validator from "validator";

export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  }

  if (name.trim().length < 3) {
    return res
      .status(400)
      .json({
        message: "Name should be atleast 3 characters long.",
        success: false,
      });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please enter valid email address.", success: false });
  }

  // Check for spaces
  if (/\s/.test(password)) {
    return res.status(400).json({
      message: "Password cannot contain spaces.",
      success: false,
    });
  }

  const isValidPassword = validator.isStrongPassword(password, {
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });

  if (!isValidPassword) {
    return res
      .status(400)
      .json({ message: "Please enter strong password.", success: false });
  }

  next();
}
