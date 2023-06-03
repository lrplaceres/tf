import { pool } from "@/config/db";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    switch (req.method) {
      case "POST":
        return await getUser(req, res);
    }
  }

  res.status(401).json({ message: "403" });
  return;
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
