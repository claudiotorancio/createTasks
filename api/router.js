import { Router } from "express";
import db from "../backend/db.js";

const router = Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO productos (nombre, precio) VALUES (?, ?)",
      [nombre, precio]
    );
    res.json({ id: result.insertId, nombre, precio });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
});

export default router;
