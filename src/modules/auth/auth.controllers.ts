import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signup(req.body);

    const user = result.rows[0];

    if (user.password) {
      delete user.password;
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.signin(email, password);

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    let { token, user } = result;

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1] as string;
    }

    if (user.password) {
      delete user.password;
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  signup,
  signin,
};
