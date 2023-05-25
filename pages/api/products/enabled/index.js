import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {   
    default:
      return await getAllProductsEnabled(req, res);
  }
}

const getAllProductsEnabled = async (req, res) => {
    try {
      const [result] = await pool
        .promise()
        .query(
          "SELECT uid as id,name,price,category FROM products WHERE enabled = 1 ORDER BY category ASC, name ASC"
        );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };