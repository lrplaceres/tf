import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {  
    default:
      return await getCategories(req, res);
  }
}

const getCategories = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT category as name FROM products WHERE enabled = 1 GROUP BY category ORDER BY name ASC");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};