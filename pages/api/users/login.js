import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await getUser(req, res);
  }
}

const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [result] = await pool
      .promise()
      .query(
        "SELECT uid,username,role, name, email FROM users  WHERE username = ? and password = ? and enabled = 1 limit 1",
        [username, password]
      );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
