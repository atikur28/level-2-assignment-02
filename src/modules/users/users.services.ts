import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

const getUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

  return result;
};

const putUser = async (
  name: string,
  email: string,
  role: string,
  phone: string,
  userId: string
) => {
  let query;
  let params;

  if (role) {
    query = `
      UPDATE users SET 
        name=$1, 
        email=$2,
        phone=$3, 
        role=$4
      WHERE id=$5 RETURNING *`;
    params = [name, email, phone, role, userId];
  } else {
    query = `
      UPDATE users SET 
        name=$1, 
        email=$2,
        phone=$3
      WHERE id=$4 RETURNING *`;
    params = [name, email, phone, userId];
  }

  return pool.query(query, params);
};

const deleteUser = async (id: string) => {
  const activeBookingCheck = await pool.query(
    `SELECT * FROM bookings 
     WHERE customer_id = $1 AND status = 'active'`,
    [id]
  );

  if (activeBookingCheck.rows.length > 0) {
    console.log("User cannot be deleted because he/she has active bookings!");
  }

  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);

  return result;
};

export const usersServices = {
  getUsers,
  getUser,
  putUser,
  deleteUser,
};
