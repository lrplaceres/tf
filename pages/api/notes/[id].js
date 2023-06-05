import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await notesUid(req, res);
  }
}

const notesUid = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query(
        "SELECT * FROM notes  WHERE uid = ? AND status = 'new' ORDER BY date_open DESC",
        [id]
      );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};