import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      break;
    case "PUT":
      break;
    case "POST":
      break;
    default:
      return await getUser(req, res);
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query("SELECT uid,username,role,name,email FROM users  WHERE uid = ?", [
        id,
      ]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: metodo PUT para update, DELETE y POST para cambiar password