import { Request, Response } from "express";
import { usersServices } from "./users.services";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getUser(req.params.userId as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const putUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }

  try {
    const { name, email, phone, role } = req.body;

    const userId = req.params.userId;
    const loggedInUser = req.user;

    if (
      loggedInUser.role === "customer" &&
      loggedInUser.id.toString() != userId
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!",
      });
    }

    let newRole = undefined;
    if (loggedInUser.role === "admin") {
      newRole = role;
    }

    const result = await usersServices.putUser(
      name,
      email,
      newRole,
      phone,
      userId as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const user = result.rows[0];

    if (user.password) {
      delete user.password;
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.deleteUser(req.params.userId as string);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    const deletedUser = result.data!;

    if (deletedUser.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const userControllers = {
  getUsers,
  getUser,
  putUser,
  deleteUser,
};
