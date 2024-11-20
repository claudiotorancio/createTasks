import mysql from "mysql2/promise";

let pool;

const createConnectionPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Nueva conexión a la base de datos creada.");
  } else {
    console.log("Usando conexión existente de la caché.");
  }
  return pool;
};

const db = createConnectionPool();

export default db;
