import express, { urlencoded } from "express";
import dotenv from "dotenv";
import router from "../api/router.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware para manejar JSON
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Middleware para servir el frontend desde la carpeta "dist"
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Rutas de productos
app.use("/", router);

// Ruta por defecto para manejar el frontend
app.get("*", (req, res) => {
  const route = req.path;

  if (route === "/tasks") {
    // Devuelve una respuesta para esta ruta específica
    res.json({ message: "Estás en /tasks" });
  } else {
    // Devuelve el index.html para cualquier otra ruta
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
});

// Configurar el puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
