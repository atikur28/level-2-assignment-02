import { Router } from "express";
import auth from "../../middleware/auth";
import { vehiclesControllers } from "./vehicles.controllers";

const router = Router();

router.post("/", auth("admin"), vehiclesControllers.createVehicle);

router.get("/", vehiclesControllers.getVehicles);

router.get("/:vehicleId", vehiclesControllers.getVehicle);

router.put("/:vehicleId", auth("admin"), vehiclesControllers.putVehicle);

router.delete("/:vehicleId", auth("admin"), vehiclesControllers.deleteVehicle);

export const vehiclesRoutes = router;
