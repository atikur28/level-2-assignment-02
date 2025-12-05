import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBooking(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user!;
    const userId = loggedInUser.id;
    const role = loggedInUser.role;

    let result;

    if (role === "admin") {
      result = await bookingsServices.getAllBookings();
    } else {
      result = await bookingsServices.getBookingsByCustomer(userId);
    }

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
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

const putBooking = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user!;
    const role = loggedInUser.role;

    const result = await bookingsServices.putBooking(
      req.params.bookingId as string,
      role
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const bookingsControllers = {
  createBooking,
  getBookings,
  putBooking,
};
