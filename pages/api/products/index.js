import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await addProduct(req, res);
    default:
      return await getAllProducts(req, res);
  }
}

const addProduct = async (req, res) => {
  try {
    const { uid, name, description, price, category, enabled } = req.body;

    const [result] = await pool.promise().query("INSERT INTO products SET ?", {
      uid,
      name,
      description,
      price,
      category,
      enabled,
    });
    return res.status(200).json({ name });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT uid as id,name,price,category FROM products ORDER BY category ASC, name ASC"
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
