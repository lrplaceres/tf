import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await addPedido(req, res);
    case "PUT":
      return await notesUid(req, res);
    case "DELETE":
      return await notesUid(req, res);
    default:
      return await notesUid(req, res);
  }
}

const addPedido = async (req, res) => {
  try {
    const { uid, note, password, name, price, cantidad } = req.body;

    let exist = await countByUser(username);
    if (exist[0].cont == 0) {
      const [result] = await pool.promise().query("INSERT INTO pedidos SET ?", {
        uid, note, password, name, price, cantidad
      });
      return res.status(200).json({ username, username });
    }
    return res.status(304).json({ data: "Usuario no disponible" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};