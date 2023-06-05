import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await addNote(req, res);
  }
}

const addNote = async (req, res) => {
  try {
    const { uid, name, status, creator } = req.body;

    const [result] = await pool.promise().query("INSERT INTO notes SET ?", {
      uid,
      name,
      status,
      creator,
    });
    return res.status(200).json({ name });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

