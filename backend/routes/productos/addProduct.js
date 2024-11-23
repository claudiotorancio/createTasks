import Producto from "../../models/productoModel.js";

export const addProducts = async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const producto = await Producto.agregar(nombre, precio);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
};
