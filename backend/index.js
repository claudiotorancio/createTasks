import express from "express";
import dotenv from "dotenv";
import router from "../api/router.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

// Middleware para servir el frontend desde la carpeta "dist"
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Rutas de productos
app.use("/", router);

// Ruta por defecto para manejar el frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Configurar el puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
