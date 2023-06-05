import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await notesByUser(req, res);
  }
}

const notesByUser = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query(
        "SELECT * FROM notes  WHERE creator = ? AND status = 'new' ORDER BY date_open DESC",
        [id]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
