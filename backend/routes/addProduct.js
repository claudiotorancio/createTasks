import Producto from "../models/productoModel.js";
import db from "../db.js";

export const addProducts = async (req, res) => {
  try {
    const productos = await Producto.obtenerTodos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
