import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  return result;
};

const getVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);

  return result;
};

const putVehicle = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: number,
  availability_status: string,
  vehicleId: string
) => {
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ]
  );

  return result;
};

const deleteVehicle = async (id: string) => {
  const activeBookingCheck = await pool.query(
    `SELECT * FROM bookings 
     WHERE vehicle_id = $1 AND status = 'active'`,
    [id]
  );

  if (activeBookingCheck.rows.length > 0) {
    console.log("Vehicle cannot be deleted because it has active bookings!");
  }

  const result = await pool.query(
    `DELETE FROM vehicles WHERE id=$1 RETURNING *`,
    [id]
  );

  return result;
};

export const vehiclesServices = {
  createVehicle,
  getVehicles,
  getVehicle,
  putVehicle,
  deleteVehicle,
};
