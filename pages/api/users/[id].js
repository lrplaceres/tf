import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return await deleteUser(req, res);
    case "PUT":
      return await updateUser(req, res);
    case "POST":
      return await changePassword(req, res);
    default:
      return await getUser(req, res);
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query("SELECT uid,username,role,name,email,enabled FROM users  WHERE uid = ?", [
        id,
      ]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.promise().query("DELETE FROM users WHERE uid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.query;
  const { name, email, role,enabled } = req.body;
  try {
    await pool
      .promise()
      .query("UPDATE users SET name = ?, email = ?, role = ?, enabled = ? WHERE uid = ?", [
        name,
        email,
        role,
        enabled,
        id,
      ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const changePassword = async (req, res) => {
  const { id } = req.query;
  const { passw } = req.body;
  try {
    await pool
      .promise()
      .query("UPDATE users SET password = ? WHERE uid = ?", [
        passw,
        id,
      ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}