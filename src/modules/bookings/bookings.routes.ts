import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingsControllers } from "./bookings.controllers";

const router = Router();

router.post("/", auth("admin", "customer"), bookingsControllers.createBooking);

router.get("/", auth("admin", "customer"), bookingsControllers.getBookings);

router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingsControllers.putBooking
);

export const bookingsRoutes = router;
