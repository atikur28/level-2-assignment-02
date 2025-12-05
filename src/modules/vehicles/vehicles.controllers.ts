import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicle(req.body);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehicles();

    return res.status(200).json({
      success: true,
      message: "Vehicles data retrieved successfully!",
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

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehicle(
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle found successfully!",
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

const putVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await vehiclesServices.putVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully!",
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

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.deleteVehicle(
      req.params.vehicleId as string
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully!",
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

export const vehiclesControllers = {
  createVehicle,
  getVehicles,
  getVehicle,
  putVehicle,
  deleteVehicle,
};
