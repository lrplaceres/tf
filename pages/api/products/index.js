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
    const { uid, name, photo, description, price, cost, category, enabled } =
      req.body;

    const [result] = await pool.promise().query("INSERT INTO products SET ?", {
      uid,
      name,
      photo,
      description,
      price,
      cost,
      category,
      enabled,
    });
    return res.status(200).json({ name });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
