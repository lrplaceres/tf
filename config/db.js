import { createPool } from "mysql2";

const pool = createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  port: 3306,
  database: "tf1",
});

export { pool };