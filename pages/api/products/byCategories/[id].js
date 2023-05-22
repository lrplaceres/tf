import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    default:
      return await getProductByCategory(req, res);
  }
}

const getProductByCategory = async (req, res) => {
    try {
      const { id } = req.query;
      const [result] = await pool
        .promise()
        .query("SELECT * FROM products  WHERE category = ? AND enabled = 1 ", [id]);
      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}