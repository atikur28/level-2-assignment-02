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
  if (role) {
    return pool.query(
      `
      UPDATE users SET 
        name=$1, 
        email=$2,
        phone=$3, 
        role=$4
      WHERE id=$5 RETURNING *`,
      [name, email, phone, role, userId]
    );
  } else {
    return pool.query(
      `
      UPDATE users SET 
        name=$1, 
        email=$2,
        phone=$3
      WHERE id=$4 RETURNING *`,
      [name, email, phone, userId]
    );
  }
};

const deleteUser = async (id: string) => {
  const activeBookingCheck = await pool.query(
    `SELECT * FROM bookings 
     WHERE customer_id = $1 AND status = 'active'`,
    [id]
  );

  if (activeBookingCheck.rows.length > 0) {
    return {
      success: false,
      message: "User cannot be deleted because he/she has active bookings!",
      data: null,
    };
  }

  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);

  return {
    success: true,
    message: "User deleted successfully!",
    data: result,
  };
};

export const usersServices = {
  getUsers,
  getUser,
  putUser,
  deleteUser,
};
