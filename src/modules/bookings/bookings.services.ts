import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleQuery = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleQuery.rows.length === 0) {
    return { success: false, message: "Vehicle not found!" };
  }

  const vehicle = vehicleQuery.rows[0];

  if (vehicle.availability_status === "booked") {
    return { success: false, message: "Vehicle not available!" };
  }

  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (isNaN(days) || days <= 0) {
    return { success: false, message: "Invalid rental time!" };
  }

  const total_price = days * vehicle.daily_rent_price;

  const bookingResult = await pool.query(
    `
    INSERT INTO bookings 
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES 
      ($1, $2, $3, $4, $5, 'active')
    RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return {
    success: true,
    data: bookingResult.rows[0],
  };
};

const getAllBookings = async () => {
  return await pool.query(`SELECT * FROM bookings`);
};

const getBookingsByCustomer = async (customerId: string) => {
  return await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [
    customerId,
  ]);
};

const putBooking = async (bookingId: string, role: string) => {
  const bookingQuery = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [bookingId]
  );

  if (bookingQuery.rows.length === 0) {
    return { success: false, message: "Booking not found!" };
  }

  const booking = bookingQuery.rows[0];
  const vehicle_id = booking.vehicle_id;

  const now = new Date();
  const start = new Date(booking.rent_start_date);

  if (role === "customer") {
    if (now >= start) {
      return {
        success: false,
        message: "You cannot cancel after rental start date!",
      };
    }

    const updated = await pool.query(
      `UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [vehicle_id]
    );

    return {
      success: true,
      message: "Booking cancelled successfully!",
      data: updated.rows[0],
    };
  }

  if (role === "admin") {
    const updated = await pool.query(
      `UPDATE bookings SET status='returned' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [vehicle_id]
    );

    return {
      success: true,
      message: "Booking returned!",
      data: updated.rows[0],
    };
  }

  return { success: false, message: "Unauthorized action!" };
};

export const bookingsServices = {
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  putBooking,
};
