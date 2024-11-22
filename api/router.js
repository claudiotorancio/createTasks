import { Router } from "express";
import Producto from "../backend/models/productoModel.js";

const router = Router();

// Obtener todos los productos
router.get("/api/getProducts", async (req, res) => {
  try {
    const productos = await Producto.obtenerTodos();
    console.log(productos);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Agregar un nuevo producto
router.post("/api/addProduct", async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const producto = await Producto.agregar(nombre, precio);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
});

export default router;
