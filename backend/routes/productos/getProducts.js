import Producto from "../../models/productoModel.js";

export const getProducts = async (req, res) => {
  try {
    const productos = await Producto.obtenerTodos();
    console.log(productos);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
