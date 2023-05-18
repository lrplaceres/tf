import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await addUser(req, res);
    default:
      return await getAllUsers(req, res);
  }
}

const getAllUsers = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT uid,username,role,name,email FROM users ORDER BY name ASC"
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { uid, username, password, role, name, email } = req.body;

    let exist = await countByUser(username);
    if (exist[0].cont == 0) {
      //TODO: incluir campo enabled
      const [result] = await pool.promise().query("INSERT INTO users SET ?", {
        uid,
        username,
        password,
        role,
        name,
        email,
      });
      return res.status(200).json({ username, username });
    }
    return res.status(304).json({ data: "Usuario no disponible" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const countByUser = async (username) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT COUNT(username) as cont FROM users WHERE username = ?", [
        username,
      ]);

    return result;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
